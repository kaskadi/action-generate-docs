module.exports = str => {
  const camelCasedStr = str.toLowerCase().replace(/([-_][a-z])/g, group => group.toUpperCase().replace('-', '').replace('_', ''))
  return camelCasedStr.charAt(0).toUpperCase() + camelCasedStr.slice(1)
}
