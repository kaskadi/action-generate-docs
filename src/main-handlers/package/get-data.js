module.exports = ({ fs }) => {
  const pjson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  return {
    flags: pjson.bin ? '-g ' : '',
    'repo-name': pjson.name
  }
}
