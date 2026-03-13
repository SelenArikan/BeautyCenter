import urllib.request
import re
url = "https://unsplash.com/photos/make-up-beautician-hands-doing-eyebrow-tattoo-on-woman-facepermanent-brow-makeup-in-beauty-salon-closeup-of-specialist-doing-eyebrow-tattooing-for-female-cosmetology-treatment-high-resolution-nZmo2C-g46Q"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8')
    match = re.search(r'property="og:image"\s+content="([^"]+)"', html)
    if match:
        img_url = match.group(1).replace('&amp;', '&')
        print("IMG_URL=" + img_url)
        # Download it
        with open("c:\\Users\\Monster\\OneDrive\\Masaüstü\\longosphere\\public\\assets\\kalici_kas.jpg", "wb") as f:
            f.write(urllib.request.urlopen(urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})).read())
        print("Downloaded kalici_kas.jpg")
    else:
        print("No match")
except Exception as e:
    print("Error:", e)
