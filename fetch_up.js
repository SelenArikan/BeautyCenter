const https = require('https');
const fs = require('fs');

const url = 'https://unsplash.com/photos/make-up-beautician-hands-doing-eyebrow-tattoo-on-woman-facepermanent-brow-makeup-in-beauty-salon-closeup-of-specialist-doing-eyebrow-tattooing-for-female-cosmetology-treatment-high-resolution-nZmo2C-g46Q';

https.get(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/property="og:image" content="([^"]+)"/);
    if (match) {
      console.log("MATCH:" + match[1]);
      fs.writeFileSync('c:\\Users\\Monster\\OneDrive\\Masaüstü\\longosphere\\unsplash_url.txt', match[1].replace(/&amp;/g, '&'));
    } else {
      console.log("NO MATCH! Status: " + res.statusCode);
      fs.writeFileSync('c:\\Users\\Monster\\OneDrive\\Masaüstü\\longosphere\\unsplash_url.txt', 'NO MATCH');
    }
  });
}).on('error', e => console.error(e));
