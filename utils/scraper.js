const puppeteer = require('puppeteer')

const scrapeSQB = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page = await browser.newPage()
    await page.goto('https://sqb.uz/uz/')

    const scrapedData = await page.evaluate(() =>
        Array.from(document.querySelectorAll('#pills-tabContent tbody tr'))
        .map(row => ({
            currency: row.cells[0].innerText,
            mb: row.cells[1].innerText,
            buy: row.cells[2].innerText,
            sell: row.cells[3].innerText
        }))
    )

    await browser.close()
    return scrapedData
}

const scrapeTenge = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page = await browser.newPage()
    await page.goto('https://tengebank.uz/uz')

    const scrapedData = await page.evaluate(() =>
        Array.from(document.querySelectorAll('#_js_currency_widget .currency__columns .currency__column'))
        .map(column => ({
            currency: column.getElementsByClassName('currency__title')[0]
                .getElementsByTagName('strong')[0].innerText,
            buy: column.querySelectorAll('.currency__group .up')[0].innerText,
            sell: column.querySelectorAll('.currency__group .down')[0].innerText,
        }))
    )

    await browser.close()
    return scrapedData
}

module.exports.scrapeSQB = scrapeSQB
module.exports.scrapeTenge = scrapeTenge