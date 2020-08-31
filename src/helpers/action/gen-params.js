module.exports = (inputs, env) => {
  const inputsConfig = inputs ? addHeader('with', genParams(inputs)) : ''
  const envConfig = env ? addHeader('env', genParams(env)) : ''
  return `${inputsConfig}\n${envConfig}`
}

function addHeader (header, config) {
  return `\n\t\t\t${header}:\n${config}`
}

function genParams (params) {
  return Object.keys(params).map(key => `\t\t\t\t${key}: {${key.replace(/ /g, '_').toUpperCase()}-VALUE}`).join('\n')
}
