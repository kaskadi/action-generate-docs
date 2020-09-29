module.exports = str => {
  const sentenceCasedStr = str.replace(/([a-z])([A-Z])/g, '$1 $2')
  return sentenceCasedStr.charAt(0).toUpperCase() + sentenceCasedStr.slice(1)
}
