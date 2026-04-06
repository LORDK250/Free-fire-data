const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Scrapes Free Fire leaks from a target URL
  * @param {string} url - The page to scrape
   */
   async function getFreeFireLeaks(url) {
       try {
               // 1. Fetch the HTML from the website
                       const { data } = await axios.get(url, {
                                   headers: {
                                                   'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                                                               }
                                                                       });

                                                                               // 2. Load the HTML into Cheerio
                                                                                       const $ = cheerio.load(data);
                                                                                               const leaks = [];

                                                                                                       // 3. Extract key points (You'll need to update the selector '.leak-title' 
                                                                                                               // to match the actual CSS class of the website you are scraping)
                                                                                                                       $('.leak-title, h2, article p').each((index, element) => {
                                                                                                                                   const text = $(element).text().trim();
                                                                                                                                               if (text.length > 10) { // Filter out tiny/useless text
                                                                                                                                                               leaks.push(text);
                                                                                                                                                                           }
                                                                                                                                                                                   });

                                                                                                                                                                                           return leaks;

                                                                                                                                                                                               } catch (error) {
                                                                                                                                                                                                       console.error("Scraping failed:", error.message);
                                                                                                                                                                                                               return [];
                                                                                                                                                                                                                   }
                                                                                                                                                                                                                   }

                                                                                                                                                                                                                   // Export the function so index.js can use it
                                                                                                                                                                                                                   module.exports = { getFreeFireLeaks };
                                                                                                                                                                                                                   
