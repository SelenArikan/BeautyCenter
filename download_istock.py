import urllib.request
import re

print("Starting download script...")
url = "https://www.istockphoto.com/tr/foto%C4%9Fraf/kal%C4%B1c%C4%B1-makyaj-prosed%C3%BCr%C3%BC-gen%C3%A7-k%C4%B1z-%C3%BCzerinde-uygulayarak-d%C3%B6vme-salonunda-dudak-gm1274094080-375632264"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
try:
    html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8', errors='ignore')
    match = re.search(r'property="og:image"\s+content="([^"]+)"', html)
    if match:
        img_url = match.group(1).replace('&amp;', '&')
        print("Found image URL:", img_url)
        # Download the image
        img_req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
        img_data = urllib.request.urlopen(img_req, timeout=10).read()
        with open("c:\\Users\\Monster\\OneDrive\\Masaüstü\\longosphere\\public\\assets\\kalici-dudak-istock.jpg", "wb") as f:
            f.write(img_data)
        print("Image successfully downloaded to public/assets/kalici-dudak-istock.jpg")
    else:
        print("Could not parse image URL from HTML")
except Exception as e:
    print("Error:", e)
