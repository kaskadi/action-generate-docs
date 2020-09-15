module.exports = ({ replaceInFile, fs, path }, templatePath, main) => {
  const absTemplatePath = path.join(process.cwd(), templatePath)
  if (!fs.existsSync(absTemplatePath)) {
    return main
  }
  return replaceInFile(fs.readFileSync(absTemplatePath, 'utf8'), 'main', main)
}
