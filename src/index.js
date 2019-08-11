const { cliVersion, upgrade, spinner } = require('./utils')

let stdout

module.exports = function (api) {
  cliVersion('^1.0.0')
  const cwd = api.resolve.app('.')
  api.beforeDev(async (api, { quasarConf }) => {
    switch (api.prompts.upgrade) {
      case 'noUpgrade':
        break
      case 'notifyUpgrade':
        process.stdout.write('  [WIZARD] Checking if Upgrades needed. \r')
        const spinnerInterval = spinner()
        stdout = await upgrade(cwd)
        if(stdout) clearInterval(spinnerInterval)
        console.log(stdout)
        setTimeout(function () {}, 500)
        break
      case 'forceUpgrade':
        process.stdout.write('  [WIZARD] Checking if Upgrades needed. \r')
        const spinnerInterval2 = spinner()
        stdout = await upgrade(cwd, '-i')
        if(stdout) clearInterval(spinnerInterval2)
        console.log(stdout)
        if(!stdout.includes('Congrats!')) {
          console.log(`
 Quasar Dependencies Have Been Updated by the  WIZARD ✨
 Please the dev server to use the latest dependencies.
           `)
          process.exit(0)
        }
        break
      default: // maybe they modified the extension data
        break
    }
  })
}
