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
    console.log('Page opened !');

    // Wait for the page to load completely
    await page.waitForSelector('main');
    
    // Click on the "Following" link
    await page.click(`a[href="/${username}/following/"]`);
    //await page.click('span[href="/${username}/подписок/"]");
  
    // Wait for the following list to load
    await page.waitForSelector('div[role="dialog"] ul'); // container (div) + list (ul)
  
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


}
//**

console.log(auth("anddudeabides"));