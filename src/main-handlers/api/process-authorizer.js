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

// authorizer type retrieval helpers
function getAuthorizerType (authorizer) {
  if (typeof authorizer === 'string') return authorizer === 'aws_iam' ? 'IAM' : 'Lambda'
  const authType = analyzeTypeField(authorizer)
  if (authType.length > 0) return authType
  const { name, arn } = authorizer
  if (name && !arn) return 'Lambda'
  return analyzeArn(arn)
}

function analyzeTypeField ({ type }) {
  switch (type) {
    case 'aws_iam':
      return 'IAM'
    case 'token':
    case 'request':
      return 'Lambda'
    case 'COGNITO_USER_POOLS':
      return 'Cognito'
    default:
      return ''
  }
}

function analyzeArn (arn) {
  const { lambda } = require('../../helpers/sls-utils/regexps.js')
  if (typeof arn === 'string' && arn.match(lambda)) {
    return 'Lambda'
  }
  return 'Cognito'
}
