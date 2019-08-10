const execa = require('execa')

/**
 *
 * @param api
 * @param force
 * @returns {Promise<void>}
 */
const upgrade = async (api, force = '') => {
  const notifyUpgrade = execa(
    'quasar', ['upgrade', force],
    {
      cwd: api.resolve.app('.')
    }
  )
  let { stdout } = await notifyUpgrade
  return stdout
}

let stdout

module.exports = function (api) {
  api.beforeDev(async (api, { quasarConf }) => {
    switch (api.prompts.upgrade) {
      case 'noUpgrade':
        break
      case 'notifyUpgrade':
        stdout = upgrade(api)
        setTimeout(function () {}, 2000)
        break
      case 'forceUpgrade':
        stdout = await upgrade(api, '-i')
        console.log(stdout)
        if(!stdout.includes('Congrats!')) {
          console.log(`
 Quasar Dependencies Have Been Updated by the ✨ WIZARD ✨.
 Please rerun last command to make sure you are using the latest dependencies.
           `)
          process.exit(0)
        }
        break
      default: // maybe they modified the extension data
        break
    }
  })
}
