const execa = require('execa')

module.exports = function (api) {
  api.beforeDev((api, { quasarConf }) => {
    switch (api.prompts.upgrade) {
      case 'noUpgrade':
        break
      case 'notifyUpgrade':
        execa.commandSync(
          'quasar upgrade',
          {
            stdio: 'inherit',
            cwd: api.resolve.app('.')
          }
        )
        setTimeout(function () {}, 2000)
        break
      case 'forceUpgrade':
        execa.commandSync(
          'quasar upgrade -i',
          {
            stdio: 'inherit',
            cwd: api.resolve.app('.')
          }
        )
        break
      default: // maybe they modified the extension data
        break
    }
  })
}
