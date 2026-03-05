<?php
require_once 'header.php';
require_once 'blog-data.php';

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;
$postIndex = -1;

foreach ($blogPosts as $index => $p) {
    if ($p['id'] === $id) {
        $postIndex = $index;
        break;
    }
}

$post = $postIndex >= 0 ? $blogPosts[$postIndex] : null;

if (!$post) {
    echo '<div class="min-h-screen flex items-center justify-center bg-[#F5F5F0]">
            <div class="text-center">
                <h1 class="text-4xl font-bold text-[#2C3E50] mb-4">Yazı Bulunamadı</h1>
                <a href="blog.php" class="text-[#A65E6E] font-semibold hover:underline">Blog\'a Dön</a>
            </div>
          </div>';
    require_once 'footer.php';
    exit;
}

$prevPost = $postIndex > 0 ? $blogPosts[$postIndex - 1] : null;
$nextPost = $postIndex < count($blogPosts) - 1 ? $blogPosts[$postIndex + 1] : null;

// Find related services from data.php (already included via header.php -> data.php)
$relatedServices = [];
if (isset($post['relatedServices'])) {
    foreach ($serviceCategories as $cat) {
        foreach ($cat['services'] as $srv) {
            if (in_array($srv['slug'], $post['relatedServices'])) {
                $relatedServices[] = [
                    'name' => $srv['name'],
                    'slug' => $srv['slug'],
                    'image' => $srv['image'],
                    'details' => $srv['details']
                ];
            }
        }
    }
}
?>

<div class="min-h-screen bg-[#F5F5F0] text-[#2C3E50] antialiased mt-24" style="font-family: 'Georgia', serif;">
    <main class="max-w-5xl mx-auto px-6 py-12">

        <!-- Breadcrumbs -->
        <nav class="flex items-center gap-2 text-sm text-[#5D6D7E] mb-8">
            <a href="/" class="hover:text-[#A65E6E] transition-colors">Ana Sayfa</a>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m9 18 6-6-6-6" />
            </svg>
            <a href="blog.php" class="hover:text-[#A65E6E] transition-colors">Blog</a>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m9 18 6-6-6-6" />
            </svg>
            <span class="text-[#2C3E50]">
                <?= htmlspecialchars($post['category']) ?>
            </span>
        </nav>

        <!-- Article Header -->
        <div class="mb-12 text-center max-w-3xl mx-auto">
            <div
                class="inline-block px-4 py-1 bg-[#A65E6E]/10 text-[#A65E6E] text-xs font-bold rounded-full mb-6 uppercase tracking-widest">
                <?= htmlspecialchars($post['subtitle']) ?>
            </div>
            <h1 class="text-4xl md:text-6xl font-semibold leading-tight mb-8">
                <?= htmlspecialchars($post['title']) ?>
            </h1>
            <div class="flex items-center justify-center gap-6 text-sm italic text-[#5D6D7E]">
                <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                        <line x1="16" x2="16" y1="2" y2="6" />
                        <line x1="8" x2="8" y1="2" y2="6" />
                        <line x1="3" x2="21" y1="10" y2="10" />
                    </svg>
                    <span>
                        <?= htmlspecialchars($post['date']) ?>
                    </span>
                </div>
                <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>
                        <?= htmlspecialchars($post['readTime']) ?>
                    </span>
                </div>
            </div>
        </div>

        <!-- Hero Image -->
        <div class="relative w-full aspect-[21/9] rounded-2xl overflow-hidden mb-16 shadow-2xl">
            <img src="<?= htmlspecialchars($post['image']) ?>" alt="<?= htmlspecialchars($post['title']) ?>"
                class="w-full h-full object-cover" />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">

            <!-- Article Content -->
            <article class="lg:col-span-8 text-lg leading-relaxed text-[#5D6D7E]">
                <!-- Intro with Drop Cap -->
                <p class="mb-8 italic text-xl leading-relaxed" style="text-indent: 0;">
                    <span class="text-7xl font-bold text-[#A65E6E] mr-3 float-left mb-[-20px] mt-1 leading-[0.8]">
                        <?= mb_substr($post['intro'], 0, 1) ?>
                    </span>
                    <?= mb_substr($post['intro'], 1) ?>
                </p>

                <!-- Sections -->
                <?php foreach ($post['sections'] as $i => $section): ?>
                    <div>
                        <h2 class="text-2xl md:text-3xl font-bold text-[#2C3E50] mt-12 mb-6">
                            <?= htmlspecialchars($section['title']) ?>
                        </h2>
                        <p class="mb-6">
                            <?= htmlspecialchars($section['content']) ?>
                        </p>

                        <?php if (isset($section['checklist'])): ?>
                            <ul class="space-y-4 mb-8 list-none pl-0">
                                <?php foreach ($section['checklist'] as $item): ?>
                                    <li class="flex gap-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                            fill="none" stroke="#A65E6E" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" class="mt-1 flex-shrink-0">
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                            <polyline points="22 4 12 14.01 9 11.01" />
                                        </svg>
                                        <span><strong class="text-[#2C3E50]">
                                                <?= htmlspecialchars($item['bold']) ?>
                                            </strong>
                                            <?= htmlspecialchars($item['text']) ?>
                                        </span>
                                    </li>
                                <?php endforeach; ?>
                            </ul>
                        <?php endif; ?>

                        <!-- Insert secondary image after first section -->
                        <?php if ($i === 0 && isset($post['secondaryImage'])): ?>
                            <figure class="my-12">
                                <img src="<?= htmlspecialchars($post['secondaryImage']) ?>"
                                    alt="<?= htmlspecialchars($post['secondaryCaption'] ?? '') ?>"
                                    class="rounded-2xl w-full h-[400px] object-cover shadow-lg mb-4" />
                                <figcaption class="text-sm text-center italic text-[#5D6D7E]/70">
                                    <?= htmlspecialchars($post['secondaryCaption'] ?? '') ?>
                                </figcaption>
                            </figure>
                        <?php endif; ?>
                    </div>
                <?php endforeach; ?>

                <!-- Quote -->
                <blockquote
                    class="border-l-4 border-[#A65E6E] pl-8 my-10 py-2 italic text-2xl font-light text-[#2C3E50]">
                    &ldquo;
                    <?= htmlspecialchars($post['quote']) ?>&rdquo;
                </blockquote>

                <!-- Share Section -->
                <div
                    class="mt-16 pt-8 border-t border-[#2C3E50]/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div class="flex items-center gap-4">
                        <span class="text-sm font-bold uppercase tracking-widest text-[#5D6D7E]/50">Paylaş</span>
                        <div class="flex gap-3">
                            <button
                                class="w-10 h-10 rounded-full bg-white border border-[#2C3E50]/10 flex items-center justify-center text-[#5D6D7E] hover:text-[#A65E6E] hover:border-[#A65E6E] transition-all shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <circle cx="18" cy="5" r="3" />
                                    <circle cx="6" cy="12" r="3" />
                                    <circle cx="18" cy="19" r="3" />
                                    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                                    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                                </svg>
                            </button>
                            <button
                                onclick="navigator.clipboard.writeText(window.location.href); alert('Bağlantı kopyalandı!');"
                                class="w-10 h-10 rounded-full bg-white border border-[#2C3E50]/10 flex items-center justify-center text-[#5D6D7E] hover:text-[#A65E6E] hover:border-[#A65E6E] transition-all shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="flex gap-2 flex-wrap">
                        <?php foreach ($post['tags'] as $tag): ?>
                            <span
                                class="px-3 py-1 bg-[#F5F5F0] border border-[#2C3E50]/5 rounded-full text-xs font-medium text-[#5D6D7E]">
                                <?= htmlspecialchars($tag) ?>
                            </span>
                        <?php endforeach; ?>
                    </div>
                </div>
            </article>

            <!-- Sidebar -->
            <aside class="lg:col-span-4">
                <div class="sticky top-32 space-y-8">

                    <!-- Related Services -->
                    <div class="bg-white border border-[#A65E6E]/10 rounded-2xl p-8 shadow-sm">
                        <h4 class="text-xl font-bold mb-6 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="#A65E6E" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path
                                    d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                            </svg>
                            İlgili Hizmetler
                        </h4>
                        <div class="space-y-6">
                            <?php foreach ($relatedServices as $srv): ?>
                                <div class="group">
                                    <div class="relative h-40 rounded-xl overflow-hidden mb-3">
                                        <img src="<?= htmlspecialchars($srv['image']) ?>"
                                            alt="<?= htmlspecialchars($srv['name']) ?>"
                                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <h5 class="font-bold text-lg mb-2">
                                        <?= htmlspecialchars($srv['name']) ?>
                                    </h5>
                                    <p class="text-sm text-[#5D6D7E] mb-4 line-clamp-2">
                                        <?= htmlspecialchars($srv['details']) ?>
                                    </p>
                                    <a href="hizmet.php?slug=<?= $srv['slug'] ?>"
                                        class="block w-full py-2 border border-[#A65E6E] text-[#A65E6E] rounded-full text-sm font-bold text-center hover:bg-[#A65E6E] hover:text-white transition-all">
                                        DETAYLI BİLGİ
                                    </a>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>

                    <!-- Newsletter -->
                    <div class="bg-[#A65E6E]/5 rounded-2xl p-8 border border-[#A65E6E]/20">
                        <h4 class="text-xl font-bold mb-3">Güzellikten Haberdar Olun</h4>
                        <p class="text-sm text-[#5D6D7E] mb-6">En yeni bakım trendleri ve size özel teklifler için
                            bültenimize abone olun.</p>
                        <form class="space-y-3" onsubmit="event.preventDefault();">
                            <input
                                class="w-full px-4 py-3 rounded-xl border border-[#2C3E50]/10 focus:ring-2 focus:ring-[#A65E6E] focus:border-[#A65E6E] text-sm outline-none transition-all"
                                placeholder="E-posta adresiniz" type="email" required />
                            <button
                                class="w-full py-3 bg-[#A65E6E] text-white rounded-xl font-bold text-sm tracking-wide hover:bg-[#8E4D5B] transition-all">
                                ABONE OL
                            </button>
                        </form>
                    </div>
                </div>
            </aside>
        </div>

        <!-- Next/Previous Article Navigation -->
        <section class="mt-24 pt-12 border-t border-[#2C3E50]/10">
            <div class="flex flex-col md:flex-row gap-12 items-center justify-between">
                <?php if ($prevPost): ?>
                    <a href="blog-detay.php?id=<?= $prevPost['id'] ?>" class="group flex items-center gap-6 max-w-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="text-[#5D6D7E]/30 group-hover:text-[#A65E6E] transition-colors flex-shrink-0">
                            <path d="m12 19-7-7 7-7" />
                            <path d="M19 12H5" />
                        </svg>
                        <div>
                            <span class="text-xs font-bold uppercase tracking-widest text-[#5D6D7E]/50">Önceki Yazı</span>
                            <h4 class="font-bold text-lg leading-tight group-hover:text-[#A65E6E] transition-colors">
                                <?= htmlspecialchars($prevPost['title']) ?>
                            </h4>
                        </div>
                    </a>
                <?php else: ?>
                    <div></div>
                <?php endif; ?>

                <?php if ($nextPost): ?>
                    <a href="blog-detay.php?id=<?= $nextPost['id'] ?>"
                        class="group flex items-center gap-6 max-w-sm text-right">
                        <div>
                            <span class="text-xs font-bold uppercase tracking-widest text-[#5D6D7E]/50">Sonraki Yazı</span>
                            <h4 class="font-bold text-lg leading-tight group-hover:text-[#A65E6E] transition-colors">
                                <?= htmlspecialchars($nextPost['title']) ?>
                            </h4>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="text-[#5D6D7E]/30 group-hover:text-[#A65E6E] transition-colors flex-shrink-0">
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </a>
                <?php else: ?>
                    <div></div>
                <?php endif; ?>
            </div>
        </section>
    </main>
</div>

<?php require_once 'footer.php'; ?>