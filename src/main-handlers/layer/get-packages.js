module.exports = ({ fs, path }, meta) => {
  const { layers } = meta
  return Object.values(layers).map(layer => {
    const dependencies = getDeps(fs, path, layer.path)
    return {
      description: '', // default description if none provided
      ...layer,
      dependencies: dependencies.length > 0 ? buildDepList(dependencies) : 'No NPM packages or local utilities found for this layer.'
    }
  })
}

function buildDepList (dependencies) {
  const formatDep = dependency => dependency.type === 'npm'
    ? `- \`${dependency.name}\`, version: \`${dependency.version}\` ([see on NPM](https://www.npmjs.com/package/${dependency.name}))`
    : `- \`${dependency.name}\` (local utility)`
  return dependencies.map(formatDep).join('\n')
}

function getDeps (fs, path, layerPath) {
  const cwd = process.cwd()
  process.chdir(path.join(cwd, `${layerPath}/nodejs`))
  const npmDeps = getNpmDeps(0)
  const localDeps = getLocalDeps(fs)
  process.chdir(cwd)
  return [...npmDeps, ...localDeps]
}

function getLocalDeps (fs) {
  if (!fs.existsSync('node_modules')) {
    return []
  }
  const fullNpmDeps = [...new Set(getNpmDeps().map(dep => dep.name.split('/')[0]))]
  return fs.readdirSync('node_modules', { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(module => module !== '.bin' && !fullNpmDeps.includes(module))
    .map(module => {
      return {
        name: module,
        type: 'local'
      }
    })
}

function getNpmDeps (depth) {
  const { spawnSync } = require('child_process')
  let args = ['ls', '--json=true', '--prod=true']
  args = !depth ? [...args, `--depth=${depth}`] : args
  return extractDeps(JSON.parse(spawnSync('npm', args).stdout).dependencies)
}

function extractDeps (deps) {
  let npmDeps = []
  for (const dep in deps) {
    npmDeps = [
      ...npmDeps,
      {
        name: dep,
        version: deps[dep].version,
        type: 'npm'
      }
    ]
    if (deps[dep].dependencies) {
      npmDeps = [...npmDeps, ...extractDeps(deps[dep].dependencies)]
    }
  }
  return npmDeps
}
