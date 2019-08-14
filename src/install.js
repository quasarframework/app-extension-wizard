const { cliVersion, install } = require('./utils')
const addOrInvoke = process.argv.indexOf('invoke') > -1 ? 'invoke' : 'add'
let list

module.exports = async (api) => {
  cliVersion('^1.0.0')
  if (api.prompts.collectionList) list = api.prompts.collectionList
  else if (api.prompts.officialCatalog) list = api.prompts.officialCatalog
  else if (api.prompts.completeCatalog) list = api.prompts.completeCatalog
  else if (api.prompts.searchCatalog) list = api.prompts.searchCatalog
  else {
    console.log('No App Extensions to install.')
    return
  }
  const cwd = api.resolve.app('.')
  for (const ext of list) {
    if (!api.hasExtension(ext)) {
      try {
        const code = await install(addOrInvoke, ext, cwd)
        if (code.exitCode !== 0) {
          console.error(` Extension ${ext} failed to install.`)
          if (addOrInvoke === 'invoke') console.log('Extra debug:\n', code)
          process.exit(1)
        } else {
          console.log(` ${ext} installed.`)
        }
      } catch (e) {
        console.error(` Extension ${ext} failed to install:`, e)
      }
    } else {
      console.log(` ${ext} already installed. Skipping.`)
    }
  }
  api.onExitLog(`
  Thanks for using @quasar/wizard
  Please consider contributing to Quasar: https://donate.quasar.dev
  `)
}
