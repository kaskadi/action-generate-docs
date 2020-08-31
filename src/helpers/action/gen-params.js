module.exports = (inputs, env) => {
  const inputsConfig = inputs ? addHeader('with', genParams(inputs)) : ''
  const envConfig = env ? addHeader('env', genParams(env)) : ''
  return [inputsConfig, envConfig].filter(config => config.length > 0).join('\n')
}

function addHeader (header, config) {
  return `      ${header}:\n${config}`
}

function genParams (params) {
  return Object.keys(params).map(key => `        ${key}: {${key.replace(/ /g, '_').toUpperCase()}-VALUE}`).join('\n')
}
