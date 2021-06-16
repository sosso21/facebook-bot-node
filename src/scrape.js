const  puppeteer = require('puppeteer')
const  login = require('./login.js')
 
 module.exports =async (show) =>{
    const browser = await puppeteer.launch({
        headless: ! show,
        args: [
            '--disable-notifications'
        ]
    })
    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(1000000);


    await login(page)
    
 
 
    // browser.close()
    console.log('browser ---- c regl:')
}
