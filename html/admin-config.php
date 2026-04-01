<?php
// Admin configuration
session_start();

// Admin credentials - change these!
define('ADMIN_USERNAME', 'admin');
define('ADMIN_PASSWORD_HASH', password_hash('loveyourself2026', PASSWORD_DEFAULT));

// JSON data path
define('BLOG_JSON_PATH', __DIR__ . '/data/blogs.json');

// Check if user is logged in
function isAdminLoggedIn() {
    return isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;
}

// Verify admin credentials
function verifyAdmin($username, $password) {
    // For simplicity, check against hardcoded credentials
    // Password: loveyourself2026
    return $username === ADMIN_USERNAME && 
           ($password === 'loveyourself2026');
}

// Read blog data from JSON
function readBlogData() {
    if (!file_exists(BLOG_JSON_PATH)) {
        return ['categories' => ['Tümü'], 'posts' => []];
    }
    $data = json_decode(file_get_contents(BLOG_JSON_PATH), true);
    return $data ?: ['categories' => ['Tümü'], 'posts' => []];
}

// Write blog data to JSON
function writeBlogData($data) {
    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    return file_put_contents(BLOG_JSON_PATH, $json);
}

// Get next available ID
function getNextId($posts) {
    $maxId = 0;
    foreach ($posts as $post) {
        if ($post['id'] > $maxId) {
            $maxId = $post['id'];
        }
    }
    return $maxId + 1;
}
?>
