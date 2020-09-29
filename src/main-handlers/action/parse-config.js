const YAML = require('yaml')
const { genInputsTable, genOutputsTable, genEnvTable } = require('./gen-tables.js')
const genParams = require('./gen-params.js')

module.exports = fs => {
  const { name, description, inputs, outputs, env } = YAML.parse(fs.readFileSync('action.yml', 'utf8'))
  return {
    name,
    description,
    inputs: inputs ? genInputsTable(inputs) : '',
    outputs: outputs ? genOutputsTable(outputs) : '',
    env: env ? genEnvTable(env) : '',
    params: genParams(inputs, env)
  }
}
