const camelToSentence = require('../../helpers/camel-to-sentence.js')

module.exports = ({ table }, authorizerData) => {
  if (Object.keys(authorizerData).length === 0) {
    return ''
  }
  const data = { ...authorizerData }
  if (data.identitySource) {
    data.identitySource = `<ul>\n${data.identitySource.split(', ').map(source => `<li>${source}</li>`).join('\n')}\n</ul>`
  }
  return table(
    Object.entries(data)
      .map(entry => {
        let key = camelToSentence(entry[0])
        key = key.charAt(0).toUpperCase() + key.slice(1)
        return [key, entry[1]]
      }),
    {
      align: Object.keys(data)
        .map(key => key === 'identitySource' ? 'l' : 'c')
    }
  )
}
