module.exports = ({ fs }) => {
  const pjson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  const uploadData = pjson?.kaskadi?.['s3-push']?.files
  const path = uploadData
    ? uploadData.filter(data => data.dest.includes(pjson.main))[0]
    : ''
  const paths = {
    masterPath: transformPath(path),
    releasePath: transformPath(path, 'release/v1.0.0')
  }
  return {
    instructions: `${getElementInstructions(path)}\n\n${getBrowserInstructions(paths)}`
  }
}

function getElementInstructions ({ masterPath, releasePath }) {
  return `In another element:
\`\`\`js
// using the latest version
import '${masterPath}'
// using a specific version (here v1)
import '${releasePath}'
\`\`\``
}

function getBrowserInstructions ({ masterPath, releasePath }) {
  return `In the browser:
\`\`\`html
<!-- using the latest version -->
<script type="module" src="${masterPath}"></script>
<!-- using the latest version -->
<script type="module" src="${releasePath}"></script>
\`\`\``
}

function transformPath (path, releasePath = '') {
  return `https://cdn.klimapartner.net/${path.replace('{branch}', releasePath)}`
}
