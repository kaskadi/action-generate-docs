module.exports = ({ fs }, layers) => {
  return layers.map(layer => {
    const dependencies = getDeps(fs, layer.path)
    return {
      ...layer,
      dependencies: dependencies.length > 0 ? buildDepList(dependencies) : 'No NPM packages installed...'
    }
  })
}

function buildDepList (dependencies) {
  return dependencies.map(dependency => `- \`${dependency}\` ([see on NPM](https://www.npmjs.com/package/${dependency}))`).join('\n')
}

function getDeps (fs, layerPath) {
  const { dependencies } = JSON.parse(fs.readFileSync(`${layerPath}/nodejs/package.json`, 'utf8'))
  return dependencies ? Object.keys(dependencies) : []
}
