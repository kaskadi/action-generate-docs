const { spawnSync } = require('child_process')

module.exports = () => {
  console.log('INFO: commiting and pushing new documentation...')
  spawnSync('git', ['add', 'README.md'], { stdio: 'inherit' })
  const gpgSign = spawnSync('git', ['config', 'commit.gpgSign']).stdout
  let commitParams = ['commit', '-m', 'Generated documentation']
  commitParams = gpgSign.length > 0 ? addFlag(commitParams, '-S') : commitParams
  spawnSync('git', commitParams, { stdio: 'inherit' })
  spawnSync('git', ['push'], { stdio: 'inherit' })
  console.log('SUCCESS: commited and pushed new documentation!')
}

function addFlag (args, flag) {
  return [...args.slice(0, 1), flag, ...args.slice(1)]
}
