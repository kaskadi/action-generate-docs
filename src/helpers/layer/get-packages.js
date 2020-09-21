module.exports = (layerPath, fs) => {
  const { dependencies } = JSON.parse(fs.readFileSync(`${layerPath}/nodejs/package.json`, 'utf8'))
  return dependencies ? buildDepList(dependencies) : ''
}

function buildDepList (dependencies) {
  dependencies = Object.keys(dependencies)
  return dependencies.map(dependency => `- \`${dependency}\` ([see on NPM](https://www.npmjs.com/package/${dependency}))`).join('\n')
}
