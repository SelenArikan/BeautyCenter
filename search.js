const https=require('https');
https.get('https://unsplash.com/napi/search/photos?query=permanent%20lipstick&per_page=5', r => {
  let d='';
  r.on('data',c=>d+=c);
  r.on('end',()=>console.log(JSON.parse(d).results.map(i=>i.urls.raw)))
});
https.get('https://unsplash.com/napi/search/photos?query=microblading&per_page=5', r => {
  let d='';
  r.on('data',c=>d+=c);
  r.on('end',()=>console.log(JSON.parse(d).results.map(i=>i.urls.raw)))
});
