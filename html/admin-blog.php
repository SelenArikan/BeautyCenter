<?php
require_once 'admin-config.php';

// Must be logged in
if (!isAdminLoggedIn()) {
    header('Location: admin-login.php');
    exit;
}

// Handle API actions via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    $data = readBlogData();

    header('Content-Type: application/json; charset=utf-8');

    try {
        switch ($action) {
            case 'delete':
                $id = intval($_POST['id'] ?? 0);
                $data['posts'] = array_values(array_filter($data['posts'], fn($p) => $p['id'] !== $id));
                writeBlogData($data);
                echo json_encode(['success' => true, 'message' => 'Blog yazısı silindi.']);
                break;

            case 'toggle_featured':
                $id = intval($_POST['id'] ?? 0);
                foreach ($data['posts'] as &$post) {
                    if ($post['id'] === $id) {
                        $post['featured'] = !($post['featured'] ?? false);
                    } else {
                        // Only one post can be featured
                        if (!($post['featured'] ?? false)) continue;
                        $post['featured'] = false;
                    }
                }
                unset($post);
                writeBlogData($data);
                echo json_encode(['success' => true, 'message' => 'Öne çıkan yazı güncellendi.']);
                break;

            case 'save':
                $postData = [
                    'title' => $_POST['title'] ?? '',
                    'subtitle' => $_POST['subtitle'] ?? '',
                    'excerpt' => $_POST['excerpt'] ?? '',
                    'intro' => $_POST['intro'] ?? '',
                    'quote' => $_POST['quote'] ?? '',
                    'image' => $_POST['image'] ?? '',
                    'secondaryImage' => $_POST['secondaryImage'] ?? '',
                    'secondaryCaption' => $_POST['secondaryCaption'] ?? '',
                    'category' => $_POST['category'] ?? '',
                    'date' => $_POST['date'] ?? date('d F Y'),
                    'readTime' => $_POST['readTime'] ?? '5 Dakika Okuma',
                    'featured' => isset($_POST['featured']) && $_POST['featured'] === 'on',
                    'tags' => array_map('trim', explode(',', $_POST['tags'] ?? '')),
                    'relatedServices' => array_map('trim', explode(',', $_POST['relatedServices'] ?? '')),
                    'sections' => [],
                ];

                // Parse sections
                $sectionTitles = $_POST['section_title'] ?? [];
                $sectionContents = $_POST['section_content'] ?? [];
                $sectionChecklists = $_POST['section_checklist'] ?? [];

                for ($i = 0; $i < count($sectionTitles); $i++) {
                    if (empty(trim($sectionTitles[$i]))) continue;
                    $section = [
                        'title' => $sectionTitles[$i],
                        'content' => $sectionContents[$i] ?? '',
                    ];
                    // Parse checklist for this section
                    if (!empty($sectionChecklists[$i])) {
                        $lines = array_filter(array_map('trim', explode("\n", $sectionChecklists[$i])));
                        $checklist = [];
                        foreach ($lines as $line) {
                            $parts = explode('|', $line, 2);
                            if (count($parts) === 2) {
                                $checklist[] = ['bold' => trim($parts[0]), 'text' => trim($parts[1])];
                            } else {
                                $checklist[] = ['bold' => '', 'text' => trim($line)];
                            }
                        }
                        if (!empty($checklist)) {
                            $section['checklist'] = $checklist;
                        }
                    }
                    $postData['sections'][] = $section;
                }

                $editId = intval($_POST['edit_id'] ?? 0);
                if ($editId > 0) {
                    // Update existing
                    foreach ($data['posts'] as &$post) {
                        if ($post['id'] === $editId) {
                            $postData['id'] = $editId;
                            $post = $postData;
                            break;
                        }
                    }
                    unset($post);
                    $msg = 'Blog yazısı güncellendi.';
                } else {
                    // Create new
                    $postData['id'] = getNextId($data['posts']);
                    $data['posts'][] = $postData;
                    $msg = 'Yeni blog yazısı eklendi.';
                }

                // If this post is featured, unfeatured others
                if ($postData['featured']) {
                    foreach ($data['posts'] as &$post) {
                        if ($post['id'] !== ($postData['id'] ?? 0)) {
                            $post['featured'] = false;
                        }
                    }
                    unset($post);
                }

                // Add new category if it doesn't exist
                if (!empty($postData['category']) && !in_array($postData['category'], $data['categories'])) {
                    $data['categories'][] = $postData['category'];
                }

                writeBlogData($data);
                echo json_encode(['success' => true, 'message' => $msg]);
                break;

            case 'add_category':
                $newCat = trim($_POST['category_name'] ?? '');
                if (!empty($newCat) && !in_array($newCat, $data['categories'])) {
                    $data['categories'][] = $newCat;
                    writeBlogData($data);
                    echo json_encode(['success' => true, 'message' => 'Kategori eklendi.']);
                } else {
                    echo json_encode(['success' => false, 'message' => 'Kategori zaten mevcut veya boş.']);
                }
                break;

            case 'delete_category':
                $catName = trim($_POST['category_name'] ?? '');
                if ($catName !== 'Tümü') {
                    $data['categories'] = array_values(array_filter($data['categories'], fn($c) => $c !== $catName));
                    writeBlogData($data);
                    echo json_encode(['success' => true, 'message' => 'Kategori silindi.']);
                } else {
                    echo json_encode(['success' => false, 'message' => '"Tümü" kategorisi silinemez.']);
                }
                break;

            default:
                echo json_encode(['success' => false, 'message' => 'Geçersiz işlem.']);
        }
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Hata: ' . $e->getMessage()]);
    }
    exit;
}

// GET: Render dashboard
$data = readBlogData();
$posts = $data['posts'];
$categories = $data['categories'];

// Get post for editing
$editPost = null;
if (isset($_GET['edit'])) {
    $editId = intval($_GET['edit']);
    foreach ($posts as $p) {
        if ($p['id'] === $editId) {
            $editPost = $p;
            break;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Yönetimi - Love Yourself</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Gowun Batang', serif; }
        .sidebar-active { background: linear-gradient(90deg, #ec4cc7, #f472d0); color: white; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .slide-in { animation: slideIn 0.4s ease-out; }
        .toast { animation: slideIn 0.3s ease-out; }
        textarea { resize: vertical; }
    </style>
</head>
<body class="bg-gray-50 min-h-screen">

<!-- Top Bar -->
<header class="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-screen-2xl mx-auto px-6 py-3 flex items-center justify-between">
        <div class="flex items-center gap-4">
            <a href="/">
                <img src="/public/assets/logo/logo.png" alt="Logo" class="h-10" />
            </a>
            <div class="h-6 w-px bg-gray-200"></div>
            <h1 class="text-sm font-bold text-[#000000] uppercase tracking-widest">Blog Yönetimi</h1>
        </div>
        <div class="flex items-center gap-4">
            <span class="text-xs text-[#5D6D7E]">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline mr-1 opacity-50"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <?= htmlspecialchars($_SESSION['admin_user'] ?? 'Admin') ?>
            </span>
            <a href="admin-logout.php"
                class="px-4 py-2 bg-gray-100 hover:bg-red-50 text-[#5D6D7E] hover:text-red-500 rounded-lg text-xs font-bold uppercase tracking-wide transition-all">
                Çıkış
            </a>
        </div>
    </div>
</header>

<!-- Toast notification -->
<div id="toast" class="fixed top-20 right-6 z-[100] hidden">
    <div class="bg-white border border-green-200 text-green-700 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 toast">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <span id="toast-text" class="text-sm font-medium"></span>
    </div>
</div>

<!-- Delete Confirmation Modal -->
<div id="delete-modal" class="fixed inset-0 z-[200] hidden">
    <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" onclick="closeDeleteModal()"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        <div class="text-center">
            <div class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </div>
            <h3 class="text-xl font-bold text-[#000000] mb-2">Yazıyı Sil</h3>
            <p class="text-sm text-[#5D6D7E] mb-1">Bu yazıyı silmek istediğinize emin misiniz?</p>
            <p id="delete-modal-title" class="text-sm font-bold text-[#000000] mb-6"></p>
            <div class="flex gap-3 justify-center">
                <button onclick="closeDeleteModal()" class="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-[#5D6D7E] rounded-xl text-sm font-bold transition-all">İptal</button>
                <button onclick="confirmDelete()" class="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-bold transition-all shadow-lg">Evet, Sil</button>
            </div>
        </div>
    </div>
</div>

<div class="max-w-screen-2xl mx-auto px-6 py-8">
    <!-- Tabs -->
    <div class="flex gap-2 mb-8 border-b border-gray-200 pb-4">
        <button onclick="showTab('posts')" id="tab-posts"
            class="px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wide transition-all bg-[#ec4cc7] text-white shadow-md">
            📝 Blog Yazıları
        </button>
        <button onclick="showTab('editor')" id="tab-editor"
            class="px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wide transition-all bg-gray-100 text-[#5D6D7E] hover:bg-gray-200">
            ✏️ <?= $editPost ? 'Yazıyı Düzenle' : 'Yeni Yazı Ekle' ?>
        </button>
        <button onclick="showTab('categories')" id="tab-categories"
            class="px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wide transition-all bg-gray-100 text-[#5D6D7E] hover:bg-gray-200">
            🏷️ Kategoriler
        </button>
    </div>

    <!-- ============ TAB: POSTS LIST ============ -->
    <div id="panel-posts" class="slide-in">
        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div class="text-3xl font-bold text-[#000000]"><?= count($posts) ?></div>
                <div class="text-xs text-[#5D6D7E] uppercase tracking-widest mt-1">Toplam Yazı</div>
            </div>
            <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div class="text-3xl font-bold text-[#ec4cc7]"><?= count($categories) - 1 ?></div>
                <div class="text-xs text-[#5D6D7E] uppercase tracking-widest mt-1">Kategori</div>
            </div>
            <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div class="text-3xl font-bold text-green-600"><?= count(array_filter($posts, fn($p) => $p['featured'] ?? false)) ?></div>
                <div class="text-xs text-[#5D6D7E] uppercase tracking-widest mt-1">Öne Çıkan</div>
            </div>
            <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-center">
                <button onclick="showTab('editor')"
                    class="w-full py-3 bg-[#ec4cc7] hover:bg-[#d43db1] text-white rounded-xl text-sm font-bold uppercase tracking-widest transition-all shadow-md hover:shadow-lg">
                    + Yeni Yazı Ekle
                </button>
            </div>
        </div>

        <!-- Posts Table -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr class="bg-gray-50 border-b border-gray-100">
                            <th class="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-[#5D6D7E]">Görsel</th>
                            <th class="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-[#5D6D7E]">Başlık</th>
                            <th class="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-[#5D6D7E]">Kategori</th>
                            <th class="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-[#5D6D7E]">Tarih</th>
                            <th class="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-[#5D6D7E]">Öne Çıkan</th>
                            <th class="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-widest text-[#5D6D7E]">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($posts as $post): ?>
                        <tr class="border-b border-gray-50 hover:bg-[#f9def1]/10 transition-colors" id="post-row-<?= $post['id'] ?>">
                            <td class="px-6 py-4">
                                <img src="<?= htmlspecialchars($post['image']) ?>" alt="" class="w-16 h-12 object-cover rounded-lg shadow-sm" />
                            </td>
                            <td class="px-6 py-4">
                                <div class="font-bold text-sm text-[#000000] leading-snug max-w-xs"><?= htmlspecialchars($post['title']) ?></div>
                                <div class="text-xs text-[#5D6D7E] mt-1 line-clamp-1"><?= htmlspecialchars($post['excerpt']) ?></div>
                            </td>
                            <td class="px-6 py-4">
                                <span class="px-3 py-1 bg-[#ec4cc7]/10 text-[#ec4cc7] text-[10px] font-bold rounded-full uppercase tracking-wide">
                                    <?= htmlspecialchars($post['category']) ?>
                                </span>
                            </td>
                            <td class="px-6 py-4 text-xs text-[#5D6D7E]"><?= htmlspecialchars($post['date']) ?></td>
                            <td class="px-6 py-4">
                                <button onclick="toggleFeatured(<?= $post['id'] ?>)"
                                    class="w-8 h-8 rounded-full flex items-center justify-center transition-all <?= ($post['featured'] ?? false) ? 'bg-[#ec4cc7] text-white shadow-md' : 'bg-gray-100 text-gray-400 hover:bg-gray-200' ?>">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="<?= ($post['featured'] ?? false) ? 'currentColor' : 'none' ?>"
                                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                    </svg>
                                </button>
                            </td>
                            <td class="px-6 py-4 text-right">
                                <div class="flex items-center gap-2 justify-end">
                                    <a href="blog-detay.php?id=<?= $post['id'] ?>" target="_blank"
                                        class="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 flex items-center justify-center transition-all" title="Önizle">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                                    </a>
                                    <a href="admin-blog.php?edit=<?= $post['id'] ?>"
                                        class="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 hover:bg-amber-100 flex items-center justify-center transition-all" title="Düzenle">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                                    </a>
                                    <button class="btn-delete w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-all" data-id="<?= $post['id'] ?>" data-title="<?= htmlspecialchars($post['title'], ENT_QUOTES, 'UTF-8') ?>" title="Sil">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                        <?php if (empty($posts)): ?>
                        <tr>
                            <td colspan="6" class="px-6 py-16 text-center text-[#5D6D7E]">
                                <p class="text-lg mb-2">Henüz blog yazısı yok.</p>
                                <button onclick="showTab('editor')" class="text-[#ec4cc7] font-bold text-sm">+ Yeni yazı ekleyin</button>
                            </td>
                        </tr>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- ============ TAB: EDITOR ============ -->
    <div id="panel-editor" class="hidden slide-in">
        <form id="post-form" class="space-y-6">
            <input type="hidden" name="action" value="save" />
            <input type="hidden" name="edit_id" value="<?= $editPost ? $editPost['id'] : 0 ?>" />

            <!-- Row 1: Title & Subtitle -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="lg:col-span-2">
                    <label class="block text-xs font-bold uppercase tracking-widest text-[#5D6D7E] mb-2">Başlık *</label>
                    <input type="text" name="title" required
                        value="<?= htmlspecialchars($editPost['title'] ?? '') ?>"
                        class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ec4cc7]/30 focus:border-[#ec4cc7] outline-none transition-all"
                        placeholder="Blog yazısının başlığı" />
                </div>
                <div>
                    <label class="block text-xs font-bold uppercase tracking-widest text-[#5D6D7E] mb-2">Alt Başlık</label>
                    <input type="text" name="subtitle"
                        value="<?= htmlspecialchars($editPost['subtitle'] ?? '') ?>"
                        class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ec4cc7]/30 focus:border-[#ec4cc7] outline-none transition-all"
                        placeholder="Örn: Güzellik Sırları" />
                </div>
            </div>

            <!-- Row 2: Category, Date, Read Time -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label class="block text-xs font-bold uppercase tracking-widest text-[#5D6D7E] mb-2">Kategori *</label>
                    <select name="category" required
                        class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ec4cc7]/30 focus:border-[#ec4cc7] outline-none transition-all">
                        <?php foreach ($categories as $cat): ?>
                            <?php if ($cat === 'Tümü') continue; ?>
                            <option value="<?= htmlspecialchars($cat) ?>" <?= ($editPost['category'] ?? '') === $cat ? 'selected' : '' ?>>
                                <?= htmlspecialchars($cat) ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold uppercase tracking-widest text-[#5D6D7E] mb-2">Tarih</label>
                    <input type="text" name="date"
                        value="<?= htmlspecialchars($editPost['date'] ?? date('d F Y')) ?>"
                        class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ec4cc7]/30 focus:border-[#ec4cc7] outline-none transition-all"
                        placeholder="15 Şubat 2026" />
                </div>
                <div>
                    <label class="block text-xs font-bold uppercase tracking-widest text-[#5D6D7E] mb-2">Okuma Süresi</label>
                    <input type="text" name="readTime"
                        value="<?= htmlspecialchars($editPost['readTime'] ?? '5 Dakika Okuma') ?>"
                        class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ec4cc7]/30 focus:border-[#ec4cc7] outline-none transition-all"
                        placeholder="5 Dakika Okuma" />
                </div>
            </div>

            <!-- Excerpt -->
            <div>
                <label class="block text-xs font-bold uppercase tracking-widest text-[#5D6D7E] mb-2">Kısa Açıklama *</label>
                <textarea name="excerpt" required rows="2"
                    class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ec4cc7]/30 focus:border-[#ec4cc7] outline-none transition-all"
                    placeholder="Blog kartında görünecek kısa açıklama"><?= htmlspecialchars($editPost['excerpt'] ?? '') ?></textarea>
            </div>

            <!-- Intro -->
            <div>
                <label class="block text-xs font-bold uppercase tracking-widest text-[#5D6D7E] mb-2">Giriş Paragrafı *</label>
                <textarea name="intro" required rows="3"
                    class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ec4cc7]/30 focus:border-[#ec4cc7] outline-none transition-all"
                    placeholder="Yazının girişinde kullanılacak paragraf (ilk harf büyük gösterilir)"><?= htmlspecialchars($editPost['intro'] ?? '') ?></textarea>
            </div>

            <!-- Images -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-xs font-bold uppercase tracking-widest text-[#5D6D7E] mb-2">Ana Görsel URL *</label>
                    <input type="url" name="image" required
                        value="<?= htmlspecialchars($editPost['image'] ?? '') ?>"
                        class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ec4cc7]/30 focus:border-[#ec4cc7] outline-none transition-all"
                        placeholder="https://..." />
                </div>
                <div>
                    <label class="block text-xs font-bold uppercase tracking-widest text-[#5D6D7E] mb-2">İkincil Görsel URL</label>
                    <input type="url" name="secondaryImage"
                        value="<?= htmlspecialchars($editPost['secondaryImage'] ?? '') ?>"
                        class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ec4cc7]/30 focus:border-[#ec4cc7] outline-none transition-all"
                        placeholder="https://..." />
                </div>
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-widest text-[#5D6D7E] mb-2">İkincil Görsel Açıklaması</label>
                <input type="text" name="secondaryCaption"
                    value="<?= htmlspecialchars($editPost['secondaryCaption'] ?? '') ?>"
                    class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ec4cc7]/30 focus:border-[#ec4cc7] outline-none transition-all"
                    placeholder="Görsel alt yazısı" />
            </div>

            <!-- Quote -->
            <div>
                <label class="block text-xs font-bold uppercase tracking-widest text-[#5D6D7E] mb-2">Alıntı</label>
                <input type="text" name="quote"
                    value="<?= htmlspecialchars($editPost['quote'] ?? '') ?>"
                    class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ec4cc7]/30 focus:border-[#ec4cc7] outline-none transition-all italic"
                    placeholder="Yazı içinde vurgulanacak güzel bir cümle" />
            </div>

            <!-- Tags & Related Services -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-xs font-bold uppercase tracking-widest text-[#5D6D7E] mb-2">Etiketler (virgülle)</label>
                    <input type="text" name="tags"
                        value="<?= htmlspecialchars(implode(', ', $editPost['tags'] ?? [])) ?>"
                        class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ec4cc7]/30 focus:border-[#ec4cc7] outline-none transition-all"
                        placeholder="#CiltBakımı, #Güzellik" />
                </div>
                <div>
                    <label class="block text-xs font-bold uppercase tracking-widest text-[#5D6D7E] mb-2">İlgili Hizmetler (slug, virgülle)</label>
                    <input type="text" name="relatedServices"
                        value="<?= htmlspecialchars(implode(', ', $editPost['relatedServices'] ?? [])) ?>"
                        class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ec4cc7]/30 focus:border-[#ec4cc7] outline-none transition-all"
                        placeholder="medikal-cilt-bakimi, hydrafacial" />
                </div>
            </div>

            <!-- Featured checkbox -->
            <div class="flex items-center gap-3">
                <input type="checkbox" name="featured" id="featured-check"
                    <?= ($editPost['featured'] ?? false) ? 'checked' : '' ?>
                    class="w-5 h-5 rounded border-gray-300 text-[#ec4cc7] focus:ring-[#ec4cc7]" />
                <label for="featured-check" class="text-sm font-medium text-[#000000]">Öne çıkan yazı olarak ayarla</label>
            </div>

            <!-- Sections -->
            <div>
                <div class="flex items-center justify-between mb-4">
                    <label class="text-xs font-bold uppercase tracking-widest text-[#5D6D7E]">İçerik Bölümleri</label>
                    <button type="button" onclick="addSection()"
                        class="px-4 py-2 bg-[#ec4cc7]/10 text-[#ec4cc7] rounded-lg text-xs font-bold hover:bg-[#ec4cc7]/20 transition-all">
                        + Bölüm Ekle
                    </button>
                </div>
                <div id="sections-container" class="space-y-6">
                    <?php if ($editPost && !empty($editPost['sections'])): ?>
                        <?php foreach ($editPost['sections'] as $si => $section): ?>
                        <div class="section-block bg-white border border-gray-200 rounded-xl p-6 relative">
                            <button type="button" onclick="this.parentElement.remove()"
                                class="absolute top-3 right-3 w-7 h-7 rounded-full bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-all text-xs">✕</button>
                            <div class="grid grid-cols-1 gap-4">
                                <div>
                                    <label class="block text-xs font-bold text-[#5D6D7E] mb-1">Bölüm Başlığı</label>
                                    <input type="text" name="section_title[]" value="<?= htmlspecialchars($section['title']) ?>"
                                        class="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#ec4cc7]/30" />
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-[#5D6D7E] mb-1">İçerik</label>
                                    <textarea name="section_content[]" rows="4"
                                        class="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#ec4cc7]/30"><?= htmlspecialchars($section['content'] ?? '') ?></textarea>
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-[#5D6D7E] mb-1">Kontrol Listesi <span class="font-normal opacity-60">(her satır: Kalın metin|Açıklama)</span></label>
                                    <textarea name="section_checklist[]" rows="3"
                                        class="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#ec4cc7]/30" placeholder="Nazik Temizleme:|Cildinizi kurutmayan temizleyiciler kullanın"><?php
                                        if (isset($section['checklist'])) {
                                            foreach ($section['checklist'] as $item) {
                                                echo htmlspecialchars($item['bold'] . '|' . $item['text']) . "\n";
                                            }
                                        }
                                    ?></textarea>
                                </div>
                            </div>
                        </div>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </div>
            </div>

            <!-- Submit -->
            <div class="flex items-center gap-4 pt-4 border-t border-gray-200">
                <button type="submit"
                    class="px-8 py-4 bg-[#ec4cc7] hover:bg-[#d43db1] text-white font-bold text-sm uppercase tracking-widest rounded-xl transition-all shadow-lg hover:shadow-xl">
                    <?= $editPost ? '💾 Güncelle' : '📝 Yayınla' ?>
                </button>
                <?php if ($editPost): ?>
                    <a href="admin-blog.php"
                        class="px-6 py-4 bg-gray-100 text-[#5D6D7E] font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-all">
                        İptal
                    </a>
                <?php endif; ?>
            </div>
        </form>
    </div>

    <!-- ============ TAB: CATEGORIES ============ -->
    <div id="panel-categories" class="hidden slide-in">
        <div class="max-w-xl">
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
                <h3 class="text-lg font-bold mb-4">Yeni Kategori Ekle</h3>
                <form id="category-form" class="flex gap-3">
                    <input type="text" id="new-category-name" required
                        class="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#ec4cc7]/30"
                        placeholder="Yeni kategori adı" />
                    <button type="submit"
                        class="px-6 py-3 bg-[#ec4cc7] hover:bg-[#d43db1] text-white rounded-xl text-sm font-bold transition-all">
                        Ekle
                    </button>
                </form>
            </div>

            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div class="px-6 py-4 bg-gray-50 border-b border-gray-100">
                    <h3 class="text-sm font-bold uppercase tracking-widest text-[#5D6D7E]">Mevcut Kategoriler</h3>
                </div>
                <ul id="categories-list">
                    <?php foreach ($categories as $cat): ?>
                    <li class="px-6 py-4 border-b border-gray-50 flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <span class="text-sm font-medium"><?= htmlspecialchars($cat) ?></span>
                        <?php if ($cat !== 'Tümü'): ?>
                        <button onclick="deleteCategory('<?= htmlspecialchars(addslashes($cat)) ?>')"
                            class="text-red-400 hover:text-red-600 text-xs font-bold transition-colors">SİL</button>
                        <?php else: ?>
                        <span class="text-[10px] text-[#5D6D7E]/50 uppercase tracking-widest">Varsayılan</span>
                        <?php endif; ?>
                    </li>
                    <?php endforeach; ?>
                </ul>
            </div>
        </div>
    </div>

</div>

<script>
// Tab switching
function showTab(tab) {
    ['posts', 'editor', 'categories'].forEach(t => {
        document.getElementById('panel-' + t).classList.toggle('hidden', t !== tab);
        const btn = document.getElementById('tab-' + t);
        if (t === tab) {
            btn.className = 'px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wide transition-all bg-[#ec4cc7] text-white shadow-md';
        } else {
            btn.className = 'px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wide transition-all bg-gray-100 text-[#5D6D7E] hover:bg-gray-200';
        }
    });
}

// Show toast
function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-text').textContent = msg;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
}

// AJAX helper
async function apiCall(formData) {
    try {
        const res = await fetch('admin-blog.php', { method: 'POST', body: formData });
        const text = await res.text();
        try {
            return JSON.parse(text);
        } catch(e) {
            console.error('JSON parse hatasi:', text);
            return { success: false, message: 'Sunucu hatasi. Tekrar deneyin.' };
        }
    } catch(e) {
        console.error('Fetch hatasi:', e);
        return { success: false, message: 'Baglanti hatasi.' };
    }
}

// Delete modal state
var pendingDeleteId = null;

function openDeleteModal(id, title) {
    pendingDeleteId = id;
    document.getElementById('delete-modal-title').textContent = '"' + title + '"';
    document.getElementById('delete-modal').classList.remove('hidden');
}

function closeDeleteModal() {
    pendingDeleteId = null;
    document.getElementById('delete-modal').classList.add('hidden');
}

async function confirmDelete() {
    if (!pendingDeleteId) return;
    var id = pendingDeleteId;
    closeDeleteModal();

    var fd = new FormData();
    fd.append('action', 'delete');
    fd.append('id', id);

    var result = await apiCall(fd);
    if (result.success) {
        var row = document.getElementById('post-row-' + id);
        if (row) {
            row.style.transition = 'opacity 0.3s, transform 0.3s';
            row.style.opacity = '0';
            row.style.transform = 'translateX(20px)';
            setTimeout(function() { row.remove(); }, 300);
        }
        showToast(result.message);
    } else {
        showToast('Hata: ' + (result.message || 'Bilinmeyen hata'));
    }
}

// Bind all delete buttons
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e) {
        var btn = e.target.closest('.btn-delete');
        if (btn) {
            e.preventDefault();
            var id = parseInt(btn.getAttribute('data-id'));
            var title = btn.getAttribute('data-title');
            openDeleteModal(id, title);
        }
    });
});

// Toggle featured
async function toggleFeatured(id) {
    const fd = new FormData();
    fd.append('action', 'toggle_featured');
    fd.append('id', id);
    const result = await apiCall(fd);
    if (result.success) {
        showToast(result.message);
        setTimeout(() => location.reload(), 500);
    }
}

// Add section
function addSection() {
    const container = document.getElementById('sections-container');
    const div = document.createElement('div');
    div.className = 'section-block bg-white border border-gray-200 rounded-xl p-6 relative slide-in';
    div.innerHTML = `
        <button type="button" onclick="this.parentElement.remove()"
            class="absolute top-3 right-3 w-7 h-7 rounded-full bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-all text-xs">✕</button>
        <div class="grid grid-cols-1 gap-4">
            <div>
                <label class="block text-xs font-bold text-[#5D6D7E] mb-1">Bölüm Başlığı</label>
                <input type="text" name="section_title[]"
                    class="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#ec4cc7]/30" />
            </div>
            <div>
                <label class="block text-xs font-bold text-[#5D6D7E] mb-1">İçerik</label>
                <textarea name="section_content[]" rows="4"
                    class="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#ec4cc7]/30"></textarea>
            </div>
            <div>
                <label class="block text-xs font-bold text-[#5D6D7E] mb-1">Kontrol Listesi <span class="font-normal opacity-60">(her satır: Kalın metin|Açıklama)</span></label>
                <textarea name="section_checklist[]" rows="3"
                    class="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#ec4cc7]/30"
                    placeholder="Nazik Temizleme:|Cildinizi kurutmayan temizleyiciler kullanın"></textarea>
            </div>
        </div>
    `;
    container.appendChild(div);
}

// Form submit
document.getElementById('post-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const fd = new FormData(this);
    const result = await apiCall(fd);
    if (result.success) {
        showToast(result.message);
        setTimeout(() => { window.location.href = 'admin-blog.php'; }, 800);
    } else {
        alert('Hata: ' + result.message);
    }
});

// Category form
document.getElementById('category-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const fd = new FormData();
    fd.append('action', 'add_category');
    fd.append('category_name', document.getElementById('new-category-name').value);
    const result = await apiCall(fd);
    if (result.success) {
        showToast(result.message);
        setTimeout(() => location.reload(), 500);
    } else {
        alert(result.message);
    }
});

// Delete category
async function deleteCategory(name) {
    if (!confirm('"' + name + '" kategorisini silmek istiyor musunuz?')) return;
    const fd = new FormData();
    fd.append('action', 'delete_category');
    fd.append('category_name', name);
    const result = await apiCall(fd);
    if (result.success) {
        showToast(result.message);
        setTimeout(() => location.reload(), 500);
    }
}

// Auto-show editor tab if editing
<?php if ($editPost): ?>
showTab('editor');
<?php endif; ?>
</script>

</body>
</html>
