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
  if (type === 'IAM') {
    return {}
  }
  let identitySource = 'method.request.header.Authorization'
  if (type === 'Cognito') {
    return { identitySource }
  }
  const identityValidationExpression = authorizer.identityValidationExpression || ''
  if (typeof authorizer !== 'string' && authorizer.identitySource) {
    identitySource = authorizer.identitySource
  }
  return { identitySource, identityValidationExpression }
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
  if (typeof arn === 'string' && arn.match(lambda)) {
    return 'Lambda'
  } else {
    return 'Cognito'
  }
}
