module.exports = (modules) => {
  const { main, kaskadi } = require(`${process.cwd()}/package.json`)
  // TODO: below is my original approach for the code. This works only in Node 14+ and Node 14 will move to LTS on 27.10.2020 with Node 12 going to maintenance on 30.11.2020. This means we won't be using this syntax for now but may want to enable node14 in the action at some point in the future
  // const files = kaskadi?.['s3-push']?.files || []
  const files = kaskadi
    ? kaskadi['s3-push']
      ? kaskadi['s3-push'].files || []
      : []
    : []
  const matchingFiles = files.filter(file => file.dest.includes(main))
  const baseData = {
    'custom-styles': require('./get-styles.js')(modules, main)
  }
  if (matchingFiles.length === 0) {
    return {
      ...baseData,
      instructions: '**Usage instructions unavailable:** none of the published files were matching the _main_ file provided in [`package.json`](./package.json). You may want to have a look at the definition of `kaskadi.s3-push.files` custom field definition in [`package.json`](./package.json).'
    }
  }
  const path = matchingFiles[0].dest
  const paths = {
    masterPath: transformPath(path),
    releasePath: transformPath(path, 'release/v1.0.0/')
  }
  return {
    ...baseData,
    instructions: `${getElementInstructions(paths)}\n\n${getBrowserInstructions(paths)}`
  }
}

function getElementInstructions ({ masterPath, releasePath }) {
  return `In another element:
\`\`\`js
// using the latest version
import '${masterPath}'
// using a specific version
import '${releasePath}'
\`\`\``
}

function getBrowserInstructions ({ masterPath, releasePath }) {
  return `In the browser:
\`\`\`html
<!-- using the latest version -->
<script type="module" src="${masterPath}"></script>
<!-- using a specific version -->
<script type="module" src="${releasePath}"></script>
\`\`\``
}

function transformPath (path, releasePath = '') {
  return `https://cdn.klimapartner.net/${path.replace('{branch}', releasePath)}`
}
