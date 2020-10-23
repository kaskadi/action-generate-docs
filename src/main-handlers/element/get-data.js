module.exports = ({ fs }) => {
  const pjson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  // TODO: below is my original approach for the code. This works only in Node 14+ and Node 14 will move to LTS on 27.10.2020 with Node 12 going to maintenance on 30.11.2020. This means we won't be using this syntax for now but may want to enable node14 in the action at some point in the future
  // const uploadData = pjson?.kaskadi?.['s3-push']?.files
  const uploadData = pjson.kaskadi
    ? pjson.kaskadi['s3-push']
      ? pjson.kaskadi['s3-push'].files
      : undefined
    : undefined
  const path = uploadData
    ? uploadData
      .filter(data => data.dest.includes(pjson.main))[0]
      .dest
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
