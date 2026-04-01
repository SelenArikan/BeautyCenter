<?php

// Blog data - reads from JSON file
$blogJsonPath = __DIR__ . '/data/blogs.json';
$blogJsonData = json_decode(file_get_contents($blogJsonPath), true);

$blogCategories = $blogJsonData['categories'] ?? ["Tümü"];
$blogPosts = $blogJsonData['posts'] ?? [];
?>