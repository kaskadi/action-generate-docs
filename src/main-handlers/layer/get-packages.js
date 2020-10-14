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
  const npmDeps = getNpmDeps({ depth: 0 })
  const localDeps = getLocalDeps(fs)
  process.chdir(cwd)
  return [...npmDeps, ...localDeps]
}

function getLocalDeps (fs) {
  if (!fs.existsSync('node_modules')) {
    return []
  }
  const fullNpmDeps = removeDuplicateDeps([
    ...getNpmDeps(),
    ...getNpmDeps({ type: 'dev' })
  ])
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

function removeDuplicateDeps (deps) {
  return [...new Set(deps.map(dep => dep.name.split('/')[0]))]
}

function getNpmDeps (opts) {
  const { spawnSync } = require('child_process')
  const defaults = { type: 'prod' }
  opts = { ...defaults, ...opts }
  const { depth, type } = opts
  let args = ['ls', '--json=true', `--${type}=true`]
  args = typeof depth !== 'undefined' ? [...args, `--depth=${depth}`] : args // we check here for undefined via typeof because !depth when depth === 0 would result into true (0 coerce to false)
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
