module.exports = str => {
  const sentenceCasedStr = str.replace(/([a-z])([A-Z])/g, '$1 $2')
  return sentenceCasedStr
    .split(' ')
    .map(fragment => fragment.toLowerCase())
    .join(' ')
}
