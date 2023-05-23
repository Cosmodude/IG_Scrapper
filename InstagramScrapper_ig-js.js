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

    await new Promise((r) => setTimeout(r, 1000));
    await page.waitForSelector('button');
    await page.click('button');

  //let aCookie = await page.cookies();
  //fs.writeFileSync(g_sCookieFile, JSON.stringify(aCookie));

  console.log('loged in !');
//async function scrapeInstagram(username) {
  
    // Go to the Instagram profile page
  await page.goto(`https://www.instagram.com/${username}/`);
  console.log('User Page opened !');

    // Wait for the page to load completely
  await page.waitForSelector('main');
    
    // Click on the "Following" link
  await page.click(`a[href="/${username}/followers/"]`); //followers/following
  await page.waitForSelector('main');
  await new Promise((r) => setTimeout(r, 1000));
  console.log('Following Page opened!');
  //await page.mouse.move(1000,1000);

  

  await page.waitForSelector('div[role="dialog"]'); // whole 
  const box_el = await page.waitForSelector('div[class="_aano"]'); // scroll in this area
  const box = await box_el.boundingBox();
  await console.log(box);
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await new Promise((r) => setTimeout(r, 500));
  const regex = /^\/.*\/$/;
  //if(regex.test(await page.waitForSelector(`a[href]`)))
  console.log("Getting following list!");
  
  for (let i = 0; i < 1; i++){
    await page.mouse.wheel({ deltaY: 1000 });
    await new Promise((r) => setTimeout(r, 2000));
  };

  const followingList = await getFollowingList(page);
  console.log(followingList);

  //autoScroll(dialog);
  //await page.waitForSelector('div ul');// container (div) + list (ul)
  console.log("we are here!");
}
//**

const getFollowingList = async (page) => {
  // Extract the usernames from the following list
  await page.waitForSelector('div[class="_aano"]');
  console.log("Getting handles");

  const raw_hrefs = await page.$$eval('a[href]', as => as.map((a) => {
    const usernameElement = a.getAttribute('href');
  return usernameElement;
  })
  );
  console.log("Got them!!!!");
  console.log("Now filter!!!!");
  const nd_hrefs = raw_hrefs.filter((href, index) => {
    return raw_hrefs.indexOf(href) === index;
});
  console.log(nd_hrefs);
  const filtered = nd_hrefs.filter((a) => a === "/*/");
  console.log(filtered);
  return filtered;
};

res=auth("anddudeabides")
console.log(res);