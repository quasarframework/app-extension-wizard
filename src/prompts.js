const { getListing, collections, cliVersion } = require('./utils')

module.exports = function () {
  cliVersion('^1.0.0')
  console.log(`PROJECT Repo and documentation:
https://github.com/quasarframework/app-extension-wizard

 ------------------------------  WIZARD  -------------------------------✨ 
|  This Wizard AE will help you install collections of app extensions,   |
|  discover all published app extensions, and keep your entire quasar    | 
|  environment (including @quasar/app) up to date with stable releases.  |
 ------------------------------------------------------------------------
`)
  return [
    {
      name: 'upgrade',
      message: ' Choose Upgrade Strategy ',
      type: 'list',
      default: 'noUpgrade',
      choices: [
        {
          name: 'Never upgrade during dev [skip upgrade]',
          value: 'noUpgrade',
        },
        {
          name: 'Notify about upgrades during dev [quasar upgrade]',
          value: 'notifyUpgrade',
        },
        {
          name: 'Force upgrades during dev [quasar upgrade -i]',
          value: 'forceUpgrade',
        }
      ],
    },
    {
      name: 'wizardType',
      message: ' Choose Wizard Methodology',
      type: 'list',
      default: 'none',
      choices: [
        {
          name: 'Exit now, I just want upgrades',
          value: 'none',
        },
        {
          name: 'Choose from Collections',
          value: 'collections',
        },
        {
          name: 'Pick from Official Catalog',
          value: 'officialCatalog',
        },
        {
          name: 'Pick from all Known App Extensions',
          value: 'completeCatalog',
        },
        {
          name: 'Search for App Extensions',
          value: 'search'
        }
      ],
    },
    {
      name: 'collections',
      type: 'list',
      when:  function (input) {
        if (input.wizardType === 'collections') return true
      },
      message: ' Choose a Collection of App Extensions',
      choices (input) {
        return new Promise((resolve, reject) => {
          collections(null, 'categories').then(res => {
            input.global = res
            const result = Object.keys(input.global).map(ae => {
              return {
                name: ae
              }
            })
            resolve(result)
          })
        })
      }
    },
    {
      name: 'collectionList',
      type: 'checkbox',
      pageSize: 10,
      when: function (input) {
        if (input.collections) return true
      },
      message: ' Confirm the Collection Components',
      choices (input) {
        return new Promise((resolve, reject) => {
          const result = input.global[input.collections].map(ae => {
            return {
              name: ae,
              checked: true
            }
          })
          resolve(result)
        })
      }
    },
    {
      name: 'officialCatalog',
      type: 'checkbox',
      pageSize: 10,
      when:  function (input) {
        if (input.wizardType === 'officialCatalog') return true
      },
      message: ' Choose from the following Official App Extensions',
      choices () {
        return new Promise((resolve, reject) => {
          getListing('official').then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        })
      }
    },
    {
      name: 'completeCatalog',
      type: 'checkbox',
      pageSize: 10,
      when:  function (input) {
        if (input.wizardType === 'completeCatalog') return true
      },
      message: ' Choose from all known App Extensions. Please note:\n Quasar is not responsible for the quality or security of third party App Extensions.',
      choices () {
        return new Promise((resolve, reject) => {
          getListing().then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        })
      }
    },
    {
      name: 'searchTerm',
      type: 'input',
      when:  function (input) {
        if (input.wizardType === 'search') return true
      },
      message: 'Enter search term >'
    },
    {
      name: 'searchCatalog',
      type: 'checkbox',
      pageSize: 20,
      when:  function (input) {
        if (input.wizardType === 'search') return true
      },
      message: 'Choose from the following search results: ',
      choices (input) {
        return new Promise((resolve, reject) => {
          getListing('all', input.searchTerm).then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        })
      }
    }
  ]
}
