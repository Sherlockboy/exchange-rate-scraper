const express = require('express')

const scraper = require('./utils/scraper')
const app = express()
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    const sqbCurrencyRates = new Promise((resolve, reject) => {
        scraper
            .scrapeSQB()
            .then(data => {
                resolve(data)
            })
            .catch(err => reject('SQB Exchange Rate scrape failed'))
    })

    const tengeCurrencyRates = new Promise((resolve, reject) => {
        scraper
            .scrapeTenge()
            .then(data => {
                resolve(data)
            })
            .catch(err => reject('Tenge Exchange Rate scrape failed'))
    })

    Promise.all([sqbCurrencyRates, tengeCurrencyRates])
        .then(data => {
            res.json({
                data: {
                    sqb: data[0],
                    tenge: data[1]
                }
            })
        })
        .catch(err => res.status(500).send(err))
})

app.listen(PORT, () => console.log('Server started!'))