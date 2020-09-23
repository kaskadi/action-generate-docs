// used for building list from layers and lambda functions metadata
module.exports = (arr, docType) => {
  return arr.length > 0 ? arr.map(data => `- [${data.name}](#${data.name})`).join('\n') : `No ${docType} defined in the configuration file...`
}
