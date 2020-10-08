const { spawnSync } = require('child_process')

module.exports = () => {
  console.log('INFO: commiting and pushing new documentation...')
  spawnGit(['add', 'README.md'])
  spawnGit(getCommitArgs())
  spawnGit(['push'])
  console.log('SUCCESS: commited and pushed new documentation!')
}

function spawnGit (args) {
  spawnSync('git', args, { stdio: 'inherit' })
}

function getCommitArgs () {
  const gpgSign = spawnSync('git', ['config', 'commit.gpgSign']).stdout
  const commitArgs = ['commit', '-m', 'Generated documentation']
  return gpgSign.length > 0 ? addFlag(commitArgs, '-S') : commitArgs
}

function addFlag (args, flag) {
  return [...args.slice(0, 1), flag, ...args.slice(1)]
}
