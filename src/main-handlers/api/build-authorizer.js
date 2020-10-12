const camelToSentence = require('../../helpers/camel-to-sentence.js')

module.exports = ({ table }, authorizerData) => {
  if (Object.keys(authorizerData).length === 0) {
    return ''
  }
  let data = { ...authorizerData }
  if (data.identitySource) {
    data = {
      ...data,
      identitySource: `<ul>${data.identitySource.split(', ').map(source => `<li>${source}</li>`).join('')}</ul>`
    }
  }
  return table([
    Object.keys(data)
      .filter(key => key.length > 0)
      .map(key => {
        key = camelToSentence(key)
        return key.charAt(0).toUpperCase() + key.slice(1)
      }),
    Object.values(data)
  ],
  {
    align: Object.keys(data)
      .map(key => key === 'identitySource' ? 'l' : 'c')
  }
  )
}
