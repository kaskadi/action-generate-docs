const table = require('markdown-table')

function genInputsTable (inputs) {
  const mdTable = table([
    ['Input', 'Required', 'Default', 'Description'],
    ...Object.entries(inputs).map(entry => {
      const value = entry[1]
      return [`\`${entry[0]}\``, `\`${!!value.required}\``, value.default ? `\`${value.default}\`` : '', value.description]
    })
  ],
  { align: ['c', 'c', 'c', 'l'] })
  return addHeader('Inputs', mdTable)
}

function genOutputsTable (outputs) {
  const mdTable = table([
    ['Output', 'Description'],
    ...Object.entries(outputs).map(entry => [`\`${entry[0]}\``, entry[1].description])
  ],
  { align: ['c', 'l'] })
  return addHeader('Outputs', mdTable)
}

function genEnvTable (env) {
  const mdTable = table([
    ['Variable', 'Required', 'Description'],
    ...Object.entries(env).map(entry => {
      const value = entry[1]
      return [`\`${entry[0]}\``, `\`${!!value.required}\``, value.description]
    })
  ],
  { align: ['c', 'c', 'l'] })
  return addHeader('Environment variables', mdTable)
}

function addHeader (header, table) {
  return `\n**${header}:**\n${table}\n`
}

module.exports = {
  genInputsTable,
  genOutputsTable,
  genEnvTable
}
