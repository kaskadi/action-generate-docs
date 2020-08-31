const { spawnSync } = require('child_process')

module.exports = test => {
  console.log('INFO: commiting and pushing new documentation...')
  const gpgSign = spawnSync('git', ['config', 'commit.gpgSign']).stdout
  let commitParams = ['commit', '-am', 'Generated documentation']
  commitParams = gpgSign.length > 0 ? addFlag(commitParams, '-S') : commitParams
  commitParams = test ? addFlag(commitParams, '--dry-run') : commitParams
  spawnSync('git', commitParams, { stdio: 'inherit' })
  let pushParams = ['push']
  pushParams = test ? addFlag(pushParams, '--dry-run') : pushParams
  spawnSync('git', pushParams, { stdio: 'inherit' })
  console.log('SUCCESS: commited and pushed new documentation!')
}

function addFlag (args, flag) {
  return [...args.slice(0, 1), flag, ...args.slice(1)]
}
