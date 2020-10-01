module.exports = ({ fs, path }, meta) => {
  const { layers } = meta
  return Object.values(layers).map(layer => {
    const dependencies = getDeps(fs, path, layer.path)
    return {
      ...layer,
      dependencies: dependencies.length > 0 ? buildDepList(dependencies) : 'No NPM packages or local utilities found for this layer...'
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
  const pjson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  const dependencies = pjson.dependencies || {}
  const npmDeps = Object.entries(dependencies).map(getNpmDepData)
  const localDeps = getLocalDeps(fs, pjson)
  process.chdir(cwd)
  return [...npmDeps, ...localDeps]
}

function getNpmDepData (dep) {
  return {
    name: dep[0],
    version: dep[1],
    type: 'npm'
  }
}

function getLocalDeps (fs, pjson) {
  const { spawnSync } = require('child_process')
  const tempPjson = { ...pjson }
  delete tempPjson.dependencies
  fs.writeFileSync('package.json', JSON.stringify(tempPjson, null, 2), 'utf8')
  spawnSync('npm', ['i', '--only=prod'])
  fs.writeFileSync('package.json', JSON.stringify(pjson, null, 2), 'utf8')
  if (!fs.existsSync('node_modules')) {
    return []
  }
  return fs.readdirSync('node_modules', { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(module => module !== '.bin')
    .map(module => {
      return {
        name: module,
        type: 'local'
      }
    })
}
