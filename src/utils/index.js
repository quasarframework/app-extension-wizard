const axios = require('axios')
const semver = require('semver')
const execa = require('execa')

/**
 * @name getListing
 * @description will poll NPM and filter results
 * @param {string} type - either 'official', 'unofficial' or 'all' (default = 'all')
 * @param {string} search - search term (optional)
 * @returns {array}
 */
const getListing = async (type = 'all', search = '') => {
  let q
  if (search !== '') {
    q = encodeURI('quasar-app-extension ' + search)
  } else {
    q = encodeURI('quasar-app-extension')
  }

  this.results = []
  const request = axios.get(`https://api.npms.io/v2/search?q=${q}&size=250`) // max 250
  return request.then((res) => {
    res.data.results.forEach((item) => {
      if (item.package.name !== '@quasar/quasar-app-extension-wizard') {
        if (item.package.scope === 'quasar' && (type === 'official' || type === 'all')) {
          this.extId = item.package.name.replace('quasar-app-extension-', '')
          this.results.push({name: `${this.extId} v${item.package.version} - ${item.package.description}`, value: this.extId})
        } else if (type === 'unofficial' || type === 'all') {
          this.extId = item.package.name.replace('quasar-app-extension-', '')
          this.results.push({name: `${this.extId} v${item.package.version} - ${item.package.description}`, value: this.extId})
        }
      }
    })
    return this.results.sort(function(a, b) {
      return a.name.localeCompare(b.name)
    })
  })
}

/**
 * @name collections
 * @description - Get the latest list of collections from the CDN
 * @returns {Promise<Promise<AxiosResponse<any>>>}
 */
const collections = async () => {
  const request = axios.get(`https://cdn.quasar.dev/lists/wizard/collections.json`)
  return request.then((res) => {
    return res.data
  }).catch(err => console.log(err))
}

/**
 * @name cliVersion
 * @description - Guard to guarantee that the Quasar Cli
 * is at least a specific version, if not - exit process.
 * @param semverCondition
 */
const cliVersion = (semverCondition) => {
  const v = process.env.QUASAR_CLI_VERSION
  if (!semver.satisfies(v, semverCondition)) {
    console.log(` @quasar/cli is out of date (installed: ${v}) 
 In order to use the Wizard, please upgrade to at least: ${semverCondition}
 
 $ npm i -g @quasar/cli
 or
 $ yarn global add @quasar/cli
    `)
    process.exit(1)
  }
}

/**
 *
 * @param {object} cwd - cwd
 * @param force
 * @returns {Promise<void>}
 */
const upgrade = async (cwd, force = '') => {
  const notifyUpgrade = execa(
    'quasar', ['upgrade', force],
    {
      cwd: cwd
    }
  )
  let { stdout } = await notifyUpgrade
  return stdout
}

/**
 *
 * @param addOrInvoke
 * @param ext
 * @param cwd
 * @returns {Promise<execa.ExecaChildProcess>}
 */
const install = async (addOrInvoke, ext, cwd) => {
  return execa(
    'quasar',
    [
      'ext',
      'add', // addOrInvoke,
      ext
    ],
    {
      stdio: 'inherit',
      cwd: cwd,
      preferLocal: true
    }
  )
}

/**
 * Create a spinner on the command line
 *
 * @example
 *
 *     const spinnerInterval = spinner()
 *     // later
 *     clearInterval(spinnerInterval)
 * @returns {function} - the interval object
 */
const spinner = function () {
  return setInterval(()=> {
    process.stdout.write('/ \r')
    setTimeout(()=>{
      process.stdout.write('- \r')
      setTimeout(()=>{
        process.stdout.write('\\ \r')
        setTimeout(()=>{
          process.stdout.write('| \r')
        }, 100)
      }, 100)
    }, 100)
  },500)
}

exports.getListing = getListing
exports.collections = collections
exports.cliVersion = cliVersion
exports.upgrade = upgrade
exports.install = install
exports.spinner = spinner
