const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin())

const product_url = "https://www.finishline.com/store/product/mens-nike-air-max-97-casual-shoes/prod2770629?styleId=921826&colorId=101"


async function givePage(){
    const browser = await puppeteer.launch({headless: false, slowMo: 200}) // false to see everything and true to hide (true is faster)
    const page = await browser.newPage(); 
    return page;
}

var realAddress = '7839 Amawalk Circle'
async function purchase(page){
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36');
    await page.goto(product_url);

    await page.waitFor(8000);
    await page.click("button[data-size='12.0']", btn => btn.click());
    await page.waitForNavigation();
    await page.click('#buttonAddToCart', btn => btn.click());

    await page.waitFor(3000);

    await page.click("a[class='button expanded mb-2 js-cart-proceed-btn']", btn => btn.click());

    await page.waitFor(3000);
    await page.type("input[id='firstName']", 'Ishaan');
    await page.type('#shippingLastName', 'Goswami');
    await page.type('#shippingAdress1', realAddress);
    await page.type('#shippingCity', 'Johns Creek');
    await page.select('#shippingState', 'GA');
    await page.type('#shippingZip', '30097');
    await page.type('#shippingPhone', '6785161756');
    await page.type('#email', 'ishaangoswami16@gmail.com');

    await page.waitFor(3000);
    await page.click('#shippingContinueButton', btn => btn.click());

    await page.waitFor(5000);

    await page.type('#billingCardNumber', );
    await page.waitFor(200);
    await page.select('#billingExpirationMonth', );
    await page.waitFor(200);
    await page.select('#billingExpirationYear', );
    await page.waitFor(200);
    await page.type('#billingSecurityCode', );
    await page.waitFor(200);
    
    try {
        await page.click('#billingContinueButton', btn => btn.click());
    } catch(ex) {
        await page.click("button[id='billingContinueButton']", btn => btn.click());
    }

    await page.waitFor(2000);
    await page.click("button[id='submitOrder']", btn => btn.click());
}


async function checkout(){
    var page = await givePage();
    await purchase(page);
}

checkout();