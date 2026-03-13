const https = require('https');
const fs = require('fs');
const url = "https://www.istockphoto.com/tr/foto%C4%9Fraf/kal%C4%B1c%C4%B1-makyaj-prosed%C3%BCr%C3%BC-gen%C3%A7-k%C4%B1z-%C3%BCzerinde-uygulayarak-d%C3%B6vme-salonunda-dudak-gm1274094080-375632264";

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    let data = '';
    res.on('data', chunk => { data += chunk; });
    res.on('end', () => {
        const match = data.match(/property="og:image" content="(.*?)"/);
        if (match) {
            fs.writeFileSync('c:\\Users\\Monster\\OneDrive\\Masaüstü\\longosphere\\istock_result.txt', match[1]);
        } else {
            const mediaMatch = data.match(/https:\/\/media\.istockphoto\.com\/[^\/]+\/[^"']+/g);
            if(mediaMatch) {
               fs.writeFileSync('c:\\Users\\Monster\\OneDrive\\Masaüstü\\longosphere\\istock_result.txt', mediaMatch.join('\n'));
            } else {
               fs.writeFileSync('c:\\Users\\Monster\\OneDrive\\Masaüstü\\longosphere\\istock_result.txt', "NO MATCH");
            }
        }
    });
}).on('error', (err) => {
    fs.writeFileSync('c:\\Users\\Monster\\OneDrive\\Masaüstü\\longosphere\\istock_result.txt', err.toString());
});
