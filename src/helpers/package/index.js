const jsdoc2md = require('jsdoc-to-markdown')
const fs = require('fs')
const path = require('path')

module.exports = templatePath => {
  console.log('INFO: generating documentation from provided template and all JS files in repository...')
  const absTemplatePath = path.resolve(process.cwd(), templatePath || '')
  const opts = {
    files: '**.js',
    ...(templatePath && fs.existsSync(absTemplatePath)) && { template: fs.readFileSync(absTemplatePath, 'utf8') },
    'example-lang': 'js',
    'no-cache': true
  }
  const docs = jsdoc2md.renderSync(opts).trim()
  fs.writeFileSync('README.md', docs, 'utf8')
}
