module.exports = ({ fs, table }, main) => {
  if (!fs.existsSync(main)) {
    return `No file is matching the main file (\`${main}\`) provided in \`package.json\`...`
  }
  return buildStylesDocs(table, getCustomVars(fs, main))
}

function getCustomVars (fs, main) {
  const { readFileSync } = fs
  const elem = readFileSync(main, 'utf8')
  const customVars = findCustomVars(elem)
  return filterCustomVars(customVars)
}

function findCustomVars (elem) {
  const customVarsRegex = new RegExp(/(--.[^:,)]+)(?:(:)(.[^;)]+))?/, 'g')
  // Regexp explanation:
  // - (--.[^:,)]+): have a capture group which matches a custom property (-- followed by any characters except colon and comma)
  // - (?:(:)(.[^;)]+))?: we match up to 1 time a group consisting of a colon followed by anything which is not a semi-colon or a closing round bracket. The only part captured from this match is everything after the colon
  const matches = Array.from(elem.matchAll(customVarsRegex)) // we use here matchAll because we do a global match and unfortunately .match() doesn't return the individual capture groups. .matchAll() returns an iteratble, so we have to turn it into an Array
  return matches.map(match => {
    const name = match[1]
    const value = match[3]
    return {
      name: name.trim(),
      ...(value && { default: value.trim() })
    }
  })
}

function filterCustomVars (customVars) {
  const uniqueVars = [...new Set(customVars.map(variable => variable.name))]
  return uniqueVars.map(variable => {
    const matchingVars = customVars.filter(customVariable => customVariable.name === variable)
    const matchingVarsWithDefault = matchingVars.filter(customVariable => customVariable.default)
    return matchingVarsWithDefault.length > 0 ? matchingVarsWithDefault[0] : matchingVars[0] // we grab here only the first variable with default found (if there is one) because defining multiple default is bad practice
  })
}

function buildStylesDocs (table, cssVars) {
  if (cssVars.length === 0) {
    return 'No custom CSS properties found in this element.'
  }
  const cssVarsTable = table([
    ['CSS property name', 'Default'],
    ...cssVars.map(variable => [variable.name, variable.default ? `\`${variable.default}\`` : ''])
  ]
  , { align: ['l', 'c'] })
  return `The following custom CSS properties are available for this element:\n\n${cssVarsTable}`
}
