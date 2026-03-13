$url = 'https://www.istockphoto.com/photo/permanent-makeup-procedure-applying-on-young-girl-lip-in-tattoo-salon-gm1274094080-375632264'
$response = Invoke-WebRequest -Uri $url -UseBasicParsing
$html = $response.Content
if ($html -match '<meta\s+property="og:image"\s+content="([^"]+)"') {
    $matches[1] | Out-File -FilePath .\out.txt
} else {
    "Not Found" | Out-File -FilePath .\out.txt
}
