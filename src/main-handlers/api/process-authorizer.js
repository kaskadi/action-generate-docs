module.exports = authorizer => {
  if (!authorizer) {
    return {}
  }
  const type = getAuthorizerType(authorizer)
  return {
    type,
    ...getAuthorizerData(type, authorizer)
  }
}

function getAuthorizerData (type, authorizer) {
  switch (type) {
    case 'Lambda':
      return {
        identitySource: authorizer.identitySource
          ? `<ul>\n${authorizer.identitySource.split(', ').map(source => `<li>${source}</li>`).join('\n')}\n</ul>`
          : 'method.request.header.Authorization',
        identityValidationExpression: authorizer.identityValidationExpression || ''
      }
    case 'Cognito':
      return {
        identitySource: '<ul>\n<li>method.request.header.Authorization</li>\n</ul>'
      }
    case 'IAM':
    default:
      return {}
  }
}

function getAuthorizerType (authorizer) {
  if (typeof authorizer === 'string') return authorizer === 'aws_iam' ? 'IAM' : 'Lambda'
  const { type } = authorizer
  switch (type) {
    case 'aws_iam':
      return 'IAM'
    case 'token':
    case 'request':
      return 'Lambda'
    case 'COGNITO_USER_POOLS':
      return 'Cognito'
    default:
      break
  }
  const { name, arn } = authorizer
  if (name && !arn) return 'Lambda'
  const { lambda } = require('../../helpers/sls-utils/regexps.js')
  if (arn.match(lambda)) {
    return 'Lambda'
  } else {
    return 'Cognito'
  }
}
