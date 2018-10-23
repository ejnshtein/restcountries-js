# Restcountries-js

This is a Javascript wrapper around API provided by [Restcountries](https://restcountries.eu).  

## Installation

    npm i restcoutries-js

## Example in Node.js

```js
    const restcountries = require('restcoutries-js')
    restcountries().all()
        .then(data => {
            console.log(data)
        })
```

## Async/Await

```js
    const restcountries = require('restcoutries-js')
    (async () => {
        const allCountries = await restcountries().all()
        console.lg(allCountries)
    })()
```

## Webpack 4.0

```js
    import restcountries from 'restcoutries-js'
    restcoutries().all().then(data => {
        console.log(data)
    })
```

## Webrowser

```html
    <script src="/node_modules/restcountries-js/dist/restcountries.min.js"></script>
    <script>
        restcoutries().all().then(data => {
            console.log(data)
        })
    </script>
```

## restcountries-js API

You can use your own API server, but it will work only with clone of [this](https://github.com/apilayer/restcountries). This wrapper uses https://restcountries.eu endpoint as default.

#### restcountries(baseUrl)

```js
    restcountries('http://my.path.to/api').all()
        .then(data => {
            console.log(data)
        })
```

### restcountries method aliases

#### restcountries.all([extra])
#### restcountries.name(name[, fullText[, extra]])
#### restcountries.code(code[, extra])
#### restcountries.codes(codes[, extra])
#### restcountries.currency(currency[, extra])
#### restcountries.capital(capital[, extra])
#### restcountries.callingCode(callingCode[, extra])
#### restcountries.region(region[, extra])
#### restcountries.regionalBloc(regionalBloc[, extra])

These methods full description availble here: https://github.com/apilayer/restcountries

## Contact

[Telegram](https://t.me/ejnshtein) or by [email](mailto:ejnshtein@dsgstng.com)