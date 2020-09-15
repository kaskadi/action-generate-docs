module.exports = (file, key, value) => {
  const regExp = new RegExp(`{{>${key}}}`, 'g')
  return file.replace(regExp, value)
}
