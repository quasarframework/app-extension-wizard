const axios = require('axios')

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

const collections = {
  obytePure: [
    '@quasar/obyte',
    '@quasar/testing',
    '@quasar/icon-genie'
  ],
  protools: [
    '@quasar/icon-genie',
    '@quasar/testing',
    '@quasar/typescript',
    '@quasar/qenv',
    '@quasar/feathersjs',
    'qautomate'
  ],
  adminGui: [
    '@quasar/icon-genie',
    '@quasar/qcalendar',
    '@quasar/qmarkdown',
    '@quasar/qmediaplayer',
    '@quasar/qpdfviewer',
    '@quasar/qplaceholder',
    '@quasar/qribbon',
    '@quasar/qwindow',
    '@quasar/qzoom',
  ],
  kitchensink: [
    '@quasar/icon-genie'
  ]
}

exports.getListing = getListing
exports.collections = collections
