module.exports = () => {
  const { bin, name } = require(`${process.cwd()}/package.json`)
  return {
    flags: bin ? '-g ' : '',
    'repo-name': name
  }
}
