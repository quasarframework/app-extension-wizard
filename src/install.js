const execa = require('execa')
const addOrInvoke = process.argv.indexOf('invoke') > -1 ? 'invoke' : 'add'
// const addOrInvoke = 'add'
let list
module.exports = async (api) => {
  if (api.prompts.collectionList) list = api.prompts.collectionList
  else if (api.prompts.officialCatalog) list = api.prompts.officialCatalog
  else if (api.prompts.completeCatalog) list = api.prompts.completeCatalog
  else if (api.prompts.searchCatalog) list = api.prompts.searchCatalog
  else {
    console.log('No App Extensions to install.')
    return
  }
  for (const ext of list) {
    try {
      const code = await execa(
        'quasar',
        [
          'ext',
          addOrInvoke,
          ext
        ],
        {
          stdio: 'inherit',
          cwd: api.resolve.app('.'),
          preferLocal: true
        }
      )
      if (code.exitCode !== 0) {
        console.error(`Extension ${ext} failed to install.`)
        if (addOrInvoke === 'invoke') console.log('Extra debug:\n', code)
        process.exit(1)
      }
    } catch (e) {
      console.error(`Extension ${ext} failed to install:`, e)
    }
  }
}
