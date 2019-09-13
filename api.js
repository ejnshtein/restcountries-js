const axios = require('axios').default

const fixExtra = extra => {
  if (extra && extra.fields) {
    switch (typeof extra.fields) {
      case 'object':
        if (Array.isArray(extra.fields)) {
          extra.fields = extra.fields.join(';').toLowerCase()
        } else {
          throw 'Unsupported data type'
        }
        break
      case 'boolean':
      case 'function':
      case 'number':
      case 'symbol':
      case 'undefined':
        throw 'Unsupported data type'
        break
    }
  }
  return extra
}

/**
 * @param {String} baseURL Base url of api, by default will be used 'https://restcountries.eu/rest/v2'
 */
module.exports = baseURL => {
  const api = axios.create({
    baseURL: baseURL ? baseURL : 'https://restcountries.eu/rest/v2',
    validateStatus: status => status === 200
  })
  return {

    /**
     * @desc Get all countries data
     * @param {Object} [extra]
     * @param {String|String[]} extra.fields You can filter the output of your request to include only the specified fields.
     *
     * `https://restcountries.eu/rest/v2/all?fields=name;capital;currencies`
     */
    async all (extra = {}) {
      return api.get('/all', { params: Object.assign({}, fixExtra(extra)) }).then(_ => _.data)
    },

    /**
     * @desc Search by country name. It can be the native name or partial name
     *
     * `https://restcountries.eu/rest/v2/name/{name}`
     * `https://restcountries.eu/rest/v2/name/eesti`
     * `https://restcountries.eu/rest/v2/name/united`
     * @param {String} name Country name
     * @param {Boolean} [fullText=false] Search by country full name?
     * @param {Object} [extra]
     * @param {String|String[]} extra.fields You can filter the output of your request to include only the specified fields.
     *
     * `https://restcountries.eu/rest/v2/name/{name}?fields=name;capital;currencies`
     */
    async name (name, fullText = false, extra = {}) {
      return api
        .get(`/name/${name}`, { params: Object.assign({}, fullText ? { fullText } : {}, fixExtra(extra)) })
        .then(_ => _.data)
    },

    /**
     * @desc Search by ISO 3166-1 2-letter or 3-letter country code
     *
     * `https://restcountries.eu/rest/v2/alpha/{code}`
     * `https://restcountries.eu/rest/v2/alpha/co`
     * `https://restcountries.eu/rest/v2/alpha/col`
     *
     * @param {String} code ISO 3166-1 country code
     * @param {Object} [extra]
     * @param {String|String[]} extra.fields You can filter the output of your request to include only the specified fields.
     *
     * `https://restcountries.eu/rest/v2/alpha/{code}?fields=name;capital;currencies`
     */
    async code (code, extra = {}) {
      return api
        .get(`/alpha/${code.toLowerCase()}`, { params: Object.assign({}, fixExtra(extra)) })
        .then(_ => _.data)
    },

    /**
     * @desc Search by list of ISO 3166-1 2-letter or 3-letter country codes
     *
     * `https://restcountries.eu/rest/v2/alpha?codes={code};{code};{code}`
     * `https://restcountries.eu/rest/v2/alpha?codes=col;no;ee`
     *
     * @param {String|String[]} codes ISO 3166-1 country codes (for string, use ';' as separator)
     * @param {Object} [extra]
     * @param {String|String[]} extra.fields You can filter the output of your request to include only the specified fields.
     *
     * `https://restcountries.eu/rest/v2/alpha?codes={code};{code};{code}&fields=name;capital;currencies`
     */
    async codes (codes, extra = {}) {
      let actualCodes
      switch (typeof codes) {
        case 'object':
          if (Array.isArray(codes)) {
            actualCodes = codes.join(';')
          } else {
            throw 'Unsupported data type'
          }
          break
        case 'string':
          actualCodes = codes
          break
        default:
          throw 'Unsupported data type'
          break
      }
      return api
        .get('/alpha', { params: Object.assign({}, { codes: actualCodes.toLowerCase() }, fixExtra(extra)) })
        .then(_ => _.data)
    },

    /**
     * @desc Search by ISO 4217 currency code
     *
     * `https://restcountries.eu/rest/v2/currency/{currency}`
     * `https://restcountries.eu/rest/v2/currency/cop`
     *
     * @param {String} currency ISO 4217 currency code
     * @param {Object} [extra]
     * @param {String|String[]} extra.fields You can filter the output of your request to include only the specified fields.
     *
     * `https://restcountries.eu/rest/v2/currency/{currency}?fields=name;capital;currencies`
     */
    async currency (currency, extra = {}) {
      return api
        .get(`/currency/${currency.toLowerCase()}`, { params: Object.assign({}, fixExtra(extra)) })
        .then(_ => _.data)
    },

    /**
     * @desc Search by ISO 639-1 language code
     *
     * `https://restcountries.eu/rest/v2/lang/{et}`
     * `https://restcountries.eu/rest/v2/lang/es`
     *
     * @param {String} language ISO 639-1 language code
     * @param {Object} [extra]
     * @param {String|String[]} extra.fields You can filter the output of your request to include only the specified fields.
     *
     * `https://restcountries.eu/rest/v2/lang/{language}?fields=name;capital;currencies`
     */
    async language (language, extra = {}) {
      return api
        .get(`/lang/${language.toLowerCase()}`, { params: Object.assign({}, fixExtra(extra)) })
        .then(_ => _.data)
    },

    /**
     * @desc Search by capital city
     *
     * `https://restcountries.eu/rest/v2/capital/{capital}`
     * `https://restcountries.eu/rest/v2/capital/tallinn`
     *
     * @param {String} capital Capital city
     * @param {Object} [extra]
     * @param {String|String[]} extra.fields You can filter the output of your request to include only the specified fields.
     *
     * `https://restcountries.eu/rest/v2/capital/{capital}?fields=name;capital;currencies`
     */
    async capital (capital, extra = {}) {
      return api
        .get(`/capital/${capital.toLowerCase()}`, { params: Object.assign({}, fixExtra(extra)) })
        .then(_ => _.data)
    },

    /**
     * @desc Search by calling code
     *
     * `https://restcountries.eu/rest/v2/callingcode/{callingcode}`
     * `https://restcountries.eu/rest/v2/callingcode/372`
     *
     * @param {String|Number} callingCode
     * @param {Object} [extra]
     * @param {String|String[]} extra.fields You can filter the output of your request to include only the specified fields.
     *
     * `https://restcountries.eu/rest/v2/callingcode/{callingcode}?fields=name;capital;currencies`
     */
    async callingCode (callingCode, extra = {}) {
      return api
        .get(`/callingcode/${callingCode}`, { params: Object.assign({}, fixExtra(extra)) })
        .then(_ => _.data)
    },

    /**
     * @desc Search by region: Africa, Americas, Asia, Europe, Oceania
     *
     * `https://restcountries.eu/rest/v2/region/{region}`
     * `https://restcountries.eu/rest/v2/region/europe`
     *
     * @param {String} region africa, americas, asia, europe, oceania
     * @param {Object} [extra]
     * @param {String|String[]} extra.fields You can filter the output of your request to include only the specified fields.
     *
     * `https://restcountries.eu/rest/v2/region/{region}?fields=name;capital;currencies`
     */
    async region (region, extra = {}) {
      return api
        .get(`/region/${region.toLowerCase()}`, { params: Object.assign({}, fixExtra(extra)) })
        .then(_ => _.data)
    },

    /**
     * @desc Search by regional bloc:
     *
     * - EU (European Union)
     * - EFTA (European Free Trade Association)
     * - CARICOM (Caribbean Community)
     * - PA (Pacific Alliance)
     * - AU (African Union)
     * - USAN (Union of South American Nations)
     * - EEU (Eurasian Economic Union)
     * - AL (Arab League)
     * - ASEAN (Association of Southeast Asian Nations)
     * - CAIS (Central American Integration System)
     * - CEFTA (Central European Free Trade Agreement)
     * - NAFTA (North American Free Trade Agreement)
     * - SAARC (South Asian Association for Regional Cooperation)
     *
     * `https://restcountries.eu/rest/v2/regionalbloc/{regionalbloc}`
     * `https://restcountries.eu/rest/v2/regionalbloc/eu`
     *
     * @param {String} regionalBloc
     * @param {Object} [extra]
     * @param {String|String[]} extra.fields You can filter the output of your request to include only the specified fields.
     *
     * `https://restcountries.eu/rest/v2/regionalbloc/{regionalbloc}?fields=name;capital;currencies`
     */
    async regionalBloc (regionalBloc, extra = {}) {
      return api
        .get(`/regionalbloc/${regionalBloc.toLowerCase()}`, { params: Object.assign({}, fixExtra(extra)) })
        .then(_ => _.data)
    }
  }
}
