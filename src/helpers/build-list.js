// used for building list from layers and lambda functions metadata
module.exports = (arr) => {
  return arr.map(data => `- [${data.name}](#${data.name})`).join('\n')
}
