const puppeteer = require('puppeteer');

async function scrapeInstagram(username) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    // Go to the Instagram profile page
    await page.goto(`https://www.instagram.com/${username}/`);
  
    // Wait for the page to load completely
    await page.waitForSelector('main');
  
    // Click on the "Following" link
    await page.click('a[href="/your_username/following/"]');
  
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