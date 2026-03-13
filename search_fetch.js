(async () => {
    try {
        const res1 = await fetch('https://unsplash.com/napi/search/photos?query=eyebrows&per_page=5');
        const data1 = await res1.json();
        console.log("EYEBROWS:", data1.results.map(r => r.id + ' -> https://images.unsplash.com/photo-' + r.id + '?auto=format&fit=crop&q=80&w=1080'));
        
        const res2 = await fetch('https://unsplash.com/napi/search/photos?query=lip+gloss&per_page=5');
        const data2 = await res2.json();
        console.log("LIPS:", data2.results.map(r => r.id + ' -> https://images.unsplash.com/photo-' + r.id + '?auto=format&fit=crop&q=80&w=1080'));
    } catch (e) {
        console.error(e);
    }
})();
