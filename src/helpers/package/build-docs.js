module.exports = ({ replaceInFile, fs, path }, templatePath, main) => {
  if (!fs.existsSync(templatePath) || !templatePath) {
    return main
  }
  return replaceInFile(fs.readFileSync(templatePath, 'utf8'), 'main', main)
}
