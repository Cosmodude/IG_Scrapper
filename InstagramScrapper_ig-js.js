const puppeteer = require('puppeteer');
const fs = require('fs');

//**

console.log(process.argv);

const g_sLogin = 'blockchainma';
const g_sCookieFile = g_sLogin + '.txt';
const g_sPassword = '2023Instagram!';

//**

const g_sStartUrl = 'https://www.instagram.com/direct/inbox/';
const g_sLoginPage = 'accounts/login';

//**


async function auth(username) {

    const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  if (fs.existsSync(g_sCookieFile)) {
    let sCookie = fs.readFileSync(g_sCookieFile, 'utf8');
    let aCookie = JSON.parse(sCookie);

    await page.setCookie(...aCookie);
  }

  const response = await page.goto(g_sStartUrl);
  await response;

  if (response.url().indexOf(g_sLoginPage) != -1) {
    console.log('login ...');
      await page.waitForSelector('input[name="username"]');
    await page.focus('input[name="username"]');
    await page.keyboard.type(g_sLogin);
    await page.focus('input[name="password"]');
    await page.keyboard.type(g_sPassword);
      await page.click('button[type="submit"]');
    await new Promise((r) => setTimeout(r, 2000));
      //await page.click('button:has-text("Not today")');
      await page.click
  }

    await new Promise((r) => setTimeout(r, 3000));
    await page.waitForSelector('button');
    //await page.waitForSelector('button[text="Не сейчас"]');
    //await page.click('button:has-text("Не сейчас")');
    await page.click('button');

  let aCookie = await page.cookies();
  fs.writeFileSync(g_sCookieFile, JSON.stringify(aCookie));

  console.log('loged in !');
  //await browser.close();

  //return JSON.stringify(aCookie);

//async function scrapeInstagram(username) {
  
    // Go to the Instagram profile page
  await page.goto(`https://www.instagram.com/${username}/`);
  console.log('User Page opened !');

    // Wait for the page to load completely
  await page.waitForSelector('main');
    
    // Click on the "Following" link
  await page.click(`a[href="/${username}/following/"]`);
  console.log('Following Page opened!');
  await page.waitForSelector('main');
  await new Promise((r) => setTimeout(r, 2000));
  //await page.mouse.move(1000,1000);
  //await autoScroll(page);
    //.then(page.waitForNavigation(2000))
    //.then(autoScroll(page));
    //await page.click('span[href="/${username}/подписок/"]");
  await page.waitForSelector('div[role="dialog"]'); // whole 
  await page.waitForSelector('div[class="_aano"]');  // scroll in this area
  //const scrollbox = await page.waitForSelector('div[class="_aano"]');
  //console.log('Following Page opened!');
  //await page.focus('div[class="_aano"]')
  //.then(await autoScroll(popup));
  //console.log('Scrollbox chosen!');
  await autoScroll(page);
/*
  //const dialog = await page.waitForSelector('div[role="dialog"]');
  //autoScroll(dialog);
  //await page.waitForSelector('div ul');// container (div) + list (ul)
  console.log("we are here!");

  //await autoScroll(f_page);
  
  
    // Extract the usernames from the following list
    const followingList = await page.evaluate(() => {
        // get li s 
        const list = Array.from(
            document.querySelectorAll('div[role="dialog"] ul li')  // li element of list
        );
            // get names of 
        return list.map((element) => {
            const usernameElement = element.querySelector('a');
            return usernameElement ? usernameElement.textContent : null;
        });
    });
*/

}
//**
async function autoScroll(page) {
  console.log('Scrolling...');
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
  console.log('Scrolling finished!');
}

console.log(auth("anddudeabides"));