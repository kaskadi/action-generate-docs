module.exports = (inputs, env) => {
  const inputsConfig = inputs ? addHeader('with', genParams(inputs)) : ''
  const envConfig = env ? addHeader('env', genParams(env)) : ''
  return [inputsConfig, envConfig].filter(config => config.length > 0).join('\n')
}

function addHeader (header, config) {
  return `      ${header}:\n${config}`
}

function genParams (params) {
  return Object.entries(params).map(entry => {
    const key = entry[0]
    const value = entry[1].value || `{${key.replace(/ /g, '_').toUpperCase()}-VALUE}`
    return `        ${key}: ${value}`
  }).join('\n')
}
