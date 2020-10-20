module.exports = ({ fs, replaceInFile }, data, partialPath, templatePath) => {
  let main = fs.readFileSync(partialPath, 'utf8')
  for (const key in data) {
    main = replaceInFile(main, key, data[key])
  }
  if (!fs.existsSync(templatePath) || !templatePath) {
    return main
  }
  return replaceInFile(fs.readFileSync(templatePath, 'utf8'), 'main', main)
}
