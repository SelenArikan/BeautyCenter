import urllib.request
import re

url = "https://www.istockphoto.com/tr/foto%C4%9Fraf/kal%C4%B1c%C4%B1-makyaj-prosed%C3%BCr%C3%BC-gen%C3%A7-k%C4%B1z-%C3%BCzerinde-uygulayarak-d%C3%B6vme-salonunda-dudak-gm1274094080-375632264"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    match = re.search(r'"contentUrl":"([^"]+)"', html)
    if match:
        print(match.group(1))
    else:
        print("No image found, using fallback URL format")
        # Find any media.istockphoto.com url
        matches = re.findall(r'https://media\.istockphoto\.com/[^"\']+', html)
        for m in set(matches):
            if "1274094080" in m or "quality=" in m:
                print(m)
except Exception as e:
    print(e)
