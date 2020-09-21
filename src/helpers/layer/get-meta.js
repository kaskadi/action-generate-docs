const YAML = require('yaml')

module.exports = (fs) => {
  const { name, description } = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  const layerName = snakeToCamel(name)
  const sls = YAML.parse(fs.readFileSync('serverless.yml', 'utf8'))
  const layerPath = sls.layers[layerName].path
  return {
    description: description.length > 0 ? description : 'No description found in package.json...',
    layerPath
  }
}

function snakeToCamel (str) {
  const camelCasedStr = str.toLowerCase().replace(/([-_][a-z])/g, group => group.toUpperCase().replace('-', '').replace('_', ''))
  return camelCasedStr.charAt(0).toUpperCase() + camelCasedStr.slice(1)
}
