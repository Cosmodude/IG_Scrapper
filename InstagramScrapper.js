const puppeteer = require('puppeteer');
const fs = require('fs');

console.log(process.argv);

const g_sLogin = 'blockchainma';
const g_sCookieFile = g_sLogin + '.txt';
const g_sPassword = '2023Instagram!';


const g_sLogin1 = 'jfkfdkgil';
const g_sCookieFile1 = g_sLogin1 + '.txt';
const g_sPassword1 = '2022jfkfdkgil!';

const g_sStartUrl = 'https://www.instagram.com/direct/inbox/';
const g_sLoginPage = 'accounts/login';


async function getFollowing(username, n) {
  
  console.log("");
  console.log("Following!!!");
    const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  if (fs.existsSync(g_sCookieFile)) {
    let sCookie = fs.readFileSync(g_sCookieFile, 'utf8');
    let aCookie = JSON.parse(sCookie);

    await page.setCookie(...aCookie);
  }

  const response = await page.goto(g_sStartUrl);
  await response;
  console.log('login...');
  if (response.url().indexOf(g_sLoginPage) != -1) {
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
    console.log('loged in !');

    // Go to the Instagram profile page
  await page.goto(`https://www.instagram.com/${username}/`);
  console.log('User Page opened !');

    // Wait for the page to load completely
  await page.waitForSelector('main');
    
    // Click on the "Following" link
  await page.click(`a[href="/${username}/following/"]`); //followers/following
  await page.waitForSelector('main');
  await new Promise((r) => setTimeout(r, 1000));
  console.log('Following Page opened!');

  await page.waitForSelector('div[role="dialog"]'); // whole 
  const box_el = await page.waitForSelector('div[class="_aano"]'); // scroll in this area
  const box = await box_el.boundingBox();
  //await console.log(box);
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await new Promise((r) => setTimeout(r, 500));
  //if(regex.test(await page.waitForSelector(`a[href]`)))
  console.log("Getting following list...");
  
  for (let i = 0; i < n; i++){
    await page.mouse.wheel({ deltaY: 1000 });
    await new Promise((r) => setTimeout(r, 2000));
  };

  const followingList = await getList(page);
  console.log("Done with following!", followingList.length, followingList);

  await browser.close();

  return followingList;
}

async function getFollowers(username, n) {

  console.log("");
  console.log("Followers!!!");
  
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  if (fs.existsSync(g_sCookieFile1)) {
    let sCookie = fs.readFileSync(g_sCookieFile1, 'utf8');
    let aCookie = JSON.parse(sCookie);

    await page.setCookie(...aCookie);
  }

  const response = await page.goto(g_sStartUrl);
  await response;

  if (response.url().indexOf(g_sLoginPage) != -1) {
    console.log('login...');
    await page.waitForSelector('input[name="username"]');
    await page.focus('input[name="username"]');
    await page.keyboard.type(g_sLogin1);
    await page.focus('input[name="password"]');
    await page.keyboard.type(g_sPassword1);
    await page.click('button[type="submit"]');
    await new Promise((r) => setTimeout(r, 2000));
    await page.click;
  }

  await new Promise((r) => setTimeout(r, 1000));
  await page.waitForSelector('button');
  await page.click('button');
  await new Promise((r) => setTimeout(r, 1000));
  await page.waitForSelector('button');
  await page.click('button');
  console.log('loged in !');
  
  // Go to the Instagram profile page
  await page.goto(`https://www.instagram.com/${username}/`);
  console.log('User Page opened !');
  // Wait for the page to load completely
  await page.waitForSelector('main');
    
  // Click on the "Followers" link
  await page.click(`a[href="/${username}/followers/"]`); //followers/following
  await page.waitForSelector('main');
  await new Promise((r) => setTimeout(r, 1000));
  console.log('Followers Page opened!');

  await page.waitForSelector('div[role="dialog"]'); // whole 
  const box_el = await page.waitForSelector('div[class="_aano"]'); // scroll in this area
  const box = await box_el.boundingBox();
  //await console.log(box);
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await new Promise((r) => setTimeout(r, 500));
  //if(regex.test(await page.waitForSelector(`a[href]`)))
  console.log("Getting followers list...");

  for (let i = 0; i < n; i++){
    await page.mouse.wheel({ deltaY: 1000 });
    await new Promise((r) => setTimeout(r, 2000));
  };

  const followersList = await getList(page);
  console.log("Done with followers!", followersList.length, followersList);

  await browser.close();

  return followersList;
}


const getList = async (page) => {
  // Extract the usernames from the following list
  await page.waitForSelector('div[class="_aano"]');
  console.log("Getting handles");

  const raw_hrefs = await page.$$eval('a[href]', as => as.map((a) => {
    const usernameElement = a.getAttribute('href');
  return usernameElement;
  })
  );
  console.log("Got them!!!!");
  console.log("Now filtering...");
  const nd_hrefs = raw_hrefs.filter((href, index) => {  // deleting duplicates
    return raw_hrefs.indexOf(href) === index;
  });
  const regex = /^\/[^/]+\/$/;  // checking for slashes at the beggining and end and no slashes in the middle
  let filtered = nd_hrefs.filter((a) => regex.test(a));
  console.log(nd_hrefs.length, "filtered!")
  filtered = filtered.slice(2);
  return filtered;
};


async function main(username) {
/*
  // need to set the number of scrolls >= yourFollowersNumber/12 as a second argument 
  following = await getFollowing(username, 772/12);
  var file = fs.createWriteStream(`./${username}/following.txt`);
  file.on('error', function (err) {
    if (err) {
      console.error(err);
    }
  });
  following.forEach(function(v) { file.write(v + "\n"); });
  */
  followers = await getFollowers("_soir.ee", 30300/12);
  var file = fs.createWriteStream(`./${username}/followers.txt`);
  file.on('error', function (err) {
    if (err) {
      console.error(err);
    }
  });
  followers.forEach(function(v) { file.write(v + "\n"); });
  const notFollowers = following.filter(fol => !(followers.indexOf(fol)>=0));
  //res= await getFollowing("nftking3000",2)
  console.log("Not following user:", notFollowers);
  return notFollowers;
}

main("_soir.ee");
/*const button = document.getElementById("not");
const span = document.getElementById("notFollowers");
button.addEventListener("click", () => {
  span.textContent = main();
});
*/



