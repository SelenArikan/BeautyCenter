import urllib.request
import re

req1 = urllib.request.Request('https://html.duckduckgo.com/html/?q=site:unsplash.com/photos+makeup+lips', headers={'User-Agent': 'Mozilla/5.0'})
html1 = urllib.request.urlopen(req1).read().decode('utf-8', errors='ignore')
ids1 = re.findall(r'unsplash\.com/photos/([a-zA-Z0-9_-]+)', html1)

req2 = urllib.request.Request('https://html.duckduckgo.com/html/?q=site:unsplash.com/photos+eyebrow+microblading', headers={'User-Agent': 'Mozilla/5.0'})
html2 = urllib.request.urlopen(req2).read().decode('utf-8', errors='ignore')
ids2 = re.findall(r'unsplash\.com/photos/([a-zA-Z0-9_-]+)', html2)

print("LIPS:", ids1)
print("BROWS:", ids2)
