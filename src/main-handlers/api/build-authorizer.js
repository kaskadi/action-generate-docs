const camelToSentence = require('../../helpers/camel-to-sentence.js')

module.exports = ({ table }, authorizerData) => {
  if (Object.keys(authorizerData).length === 0) {
    return ''
  }
  let data = { ...authorizerData }
  data = Object.fromEntries(Object.entries(data).filter(entry => entry[1].length > 0))
  data = updateField('identitySource', idSource => `<ul>${idSource.split(', ').map(source => `<li>${source}</li>`).join('')}</ul>`, data)
  data = updateField('identityValidationExpression', idValidation => `\`${idValidation}\``, data)
  return table([
    Object.keys(data).map(key => {
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

function updateField (field, transform, obj) {
  const data = obj[field]
  if (!data) {
    return obj
  }
  return {
    ...obj,
    [field]: transform(data)
  }
}
