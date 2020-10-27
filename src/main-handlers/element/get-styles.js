module.exports = (fs, main) => {
  if (!fs.existsSync(main)) {
    return `No file is matching the main file (\`${main}\`) provided in \`package.json\`...`
  }
  return buildStylesDocs(getCustomVars(fs, main))
}

function getCustomVars (fs, main) {
  const { readFileSync } = fs
  const elem = readFileSync(main, 'utf8')
  const customVarsRegex = new RegExp(/var\((.[^,]+),{1}.+\){1}/, 'g') // with this regexp we match var(...,...) and capture the first parameter (everything before comma, comma excluded => .[^,]+ )
  const matches = Array.from(elem.matchAll(customVarsRegex)) // we use here matchAll because we do a global match and unfortunately .match() doesn't return the individual capture groups. .matchAll() returns an iteratble, so we have to turn it into an Array
  const customVars = matches.map(match => match[1].trim())
  return [...new Set(customVars)]
}

function buildStylesDocs (cssVars) {
  if (cssVars.length === 0) {
    return 'No custom CSS properties found in this element...'
  }
  const cssVarsList = cssVars.map(cssVar => `- \`${cssVar}\``).join('\n')
  return `The following custom CSS properties are available for this element:\n\n${cssVarsList}`
}
