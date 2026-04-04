const puppeteer = require('puppeteer');

async function scrapeAllPlatforms() {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  
  // List of places to check - you can change the URLs to specific usernames later!
  const targets = [
    { name: 'Google', url: 'https://www.google.com/search?q=free+fire+leaks+2026' },
    { name: 'TikTok', url: 'https://www.tiktok.com/search?q=free%20fire%20leaks' },
    { name: 'YouTube', url: 'https://www.youtube.com/results?search_query=free+fire+new+update' },
    { name: 'Instagram', url: 'https://www.instagram.com/explore/tags/freefireleaks/' }
  ];

  for (const target of targets) {
    console.log(`Checking ${target.name}...`);
    try {
      await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      // This grabs the first bit of text it finds to see what's new
      const text = await page.evaluate(() => document.body.innerText.slice(0, 200));
      console.log(`[${target.name} Snippet]: ${text}...`);
    } catch (err) {
      console.log(`Could not load ${target.name}. Moving to next...`);
    }
  }

  await browser.close();
}

scrapeAllPlatforms();
