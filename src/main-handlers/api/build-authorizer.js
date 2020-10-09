const camelToSentence = require('../../helpers/camel-to-sentence.js')

module.exports = ({ table }, authorizerData) => {
  if (Object.keys(authorizerData).length === 0) {
    return ''
  }
  return table(
    Object.entries(authorizerData)
      .map(entry => {
        let key = camelToSentence(entry[0])
        key = key.charAt(0).toUpperCase() + key.slice(1)
        return [key, entry[1]]
      }),
    { align: Object.keys(authorizerData).map(() => 'c') }
  )
}
