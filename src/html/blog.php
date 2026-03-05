<?php require_once 'header.php'; ?>
<?php require_once 'blog-data.php'; ?>
<?php
// Get active category from URL parameter, default to "Tümü"
$activeCategory = isset($_GET['category']) ? $_GET['category'] : "Tümü";

// Filter posts
$filteredPosts = $activeCategory === "Tümü"
    ? $blogPosts
    : array_filter($blogPosts, function ($p) use ($activeCategory) {
        return $p['category'] === $activeCategory; });

// Get featured post and regular posts
$featuredPost = null;
foreach ($blogPosts as $p) {
    if (isset($p['featured']) && $p['featured']) {
        $featuredPost = $p;
        break;
    }
}

$regularPosts = array_filter($filteredPosts, function ($p) use ($featuredPost, $activeCategory) {
    return !isset($p['featured']) || !$p['featured'] || $activeCategory !== "Tümü";
});
?>

<div class="min-h-screen bg-[#F5F5F0] text-[#2C3E50] font-georgia mt-24">
    <main class="container mx-auto px-4 md:px-8 max-w-7xl py-12">

        <!-- Page Title -->
        <div class="mb-12 text-center md:text-left transition-all duration-700 ease-out translate-y-0 opacity-100"
            x-data="{ loaded: false }" x-init="setTimeout(() => loaded = true, 100)"
            :class="loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'">
            <h2 class="text-4xl md:text-6xl font-bold text-[#2C3E50] mb-4">Güzellik Blogu</h2>
            <p class="text-lg text-[#5D6D7E] max-w-2xl">
                En yeni güzellik trendleri, profesyonel cilt bakım ipuçları ve kendinize ayıracağınız o özel zaman için
                ilham verici rehberler.
            </p>
        </div>

        <!-- Featured Post -->
        <?php if ($featuredPost && $activeCategory === "Tümü"): ?>
            <section class="mb-20 transition-all duration-700 delay-100 ease-out translate-y-0 opacity-100"
                x-data="{ loaded: false }" x-init="setTimeout(() => loaded = true, 200)"
                :class="loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'">
                <div
                    class="relative group overflow-hidden rounded-2xl bg-white shadow-xl flex flex-col lg:flex-row items-center border border-[#A65E6E]/5">
                    <div class="w-full lg:w-3/5 h-[400px] lg:h-[550px] overflow-hidden">
                        <img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            src="<?= htmlspecialchars($featuredPost['image']) ?>"
                            alt="<?= htmlspecialchars($featuredPost['title']) ?>" />
                    </div>
                    <div class="w-full lg:w-2/5 p-8 lg:p-14 flex flex-col justify-center gap-6">
                        <span class="text-[#A65E6E] font-bold tracking-[0.2em] text-xs uppercase">Öne Çıkan Yazı</span>
                        <h3 class="text-3xl md:text-4xl font-bold leading-tight">
                            <?= htmlspecialchars($featuredPost['title']) ?>
                        </h3>
                        <p class="text-[#5D6D7E] text-lg leading-relaxed">
                            <?= htmlspecialchars($featuredPost['excerpt']) ?>
                        </p>
                        <div>
                            <a href="blog-detay.php?id=<?= $featuredPost['id'] ?>"
                                class="inline-block bg-[#A65E6E] text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:shadow-xl hover:-translate-y-1 transition-all">
                                Devamını Oku
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        <?php endif; ?>

        <!-- Category Filter -->
        <div class="mb-12 border-b border-[#A65E6E]/10 flex flex-wrap gap-6 md:gap-12 pb-4 overflow-x-auto transition-all duration-700 delay-200 ease-out opacity-100"
            x-data="{ loaded: false }" x-init="setTimeout(() => loaded = true, 300)"
            :class="loaded ? 'opacity-100' : 'opacity-0'">
            <?php foreach ($blogCategories as $cat): ?>
                <a href="?category=<?= urlencode($cat) ?>"
                    class="text-sm font-bold uppercase tracking-widest pb-4 transition-colors whitespace-nowrap <?= $activeCategory === $cat ? 'border-b-2 border-[#A65E6E] text-[#A65E6E]' : 'text-[#5D6D7E]/60 hover:text-[#A65E6E]' ?>">
                    <?= htmlspecialchars($cat) ?>
                </a>
            <?php endforeach; ?>
        </div>

        <!-- Blog Posts Grid -->
        <section class="mb-24">
            <h4 class="text-2xl font-bold mb-8 flex items-center gap-3">
                Son Yazılar
                <span class="h-px bg-[#A65E6E]/20 grow"></span>
            </h4>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <?php $delayCount = 0; ?>
                <?php foreach ($regularPosts as $post): ?>
                    <article
                        class="flex flex-col gap-5 group transition-all duration-500 ease-out translate-y-0 opacity-100"
                        x-data="{ loaded: false }"
                        x-init="setTimeout(() => loaded = true, <?= 400 + ($delayCount * 100) ?>)"
                        :class="loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'">
                        <div class="aspect-[4/5] overflow-hidden rounded-2xl bg-gray-200">
                            <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                src="<?= htmlspecialchars($post['image']) ?>"
                                alt="<?= htmlspecialchars($post['title']) ?>" />
                        </div>
                        <div class="flex flex-col gap-3">
                            <div class="flex items-center justify-between">
                                <span class="text-[#A65E6E] text-[10px] font-bold uppercase tracking-widest">
                                    <?= htmlspecialchars($post['category']) ?>
                                </span>
                                <span class="text-[#5D6D7E]/50 text-xs">
                                    <?= htmlspecialchars($post['date']) ?>
                                </span>
                            </div>
                            <h5 class="text-2xl font-bold leading-snug group-hover:text-[#A65E6E] transition-colors">
                                <?= htmlspecialchars($post['title']) ?>
                            </h5>
                            <p class="text-[#5D6D7E] line-clamp-2">
                                <?= htmlspecialchars($post['excerpt']) ?>
                            </p>
                            <a href="blog-detay.php?id=<?= $post['id'] ?>"
                                class="inline-flex items-center gap-2 text-[#A65E6E] text-xs font-bold uppercase tracking-widest mt-2 hover:gap-3 transition-all">
                                Devamını Oku
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </article>
                    <?php $delayCount++; ?>
                <?php endforeach; ?>
            </div>

            <?php if (empty($regularPosts)): ?>
                <div class="text-center py-20 text-[#5D6D7E]">
                    <p class="text-lg">Bu kategoride henüz yazı bulunmuyor.</p>
                </div>
            <?php endif; ?>
        </section>

        <!-- Newsletter -->
        <section
            class="bg-[#A65E6E]/5 rounded-2xl p-8 md:p-16 flex flex-col items-center text-center gap-8 border border-[#A65E6E]/10 mb-12">
            <div class="max-w-xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none"
                    stroke="#A65E6E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="mx-auto mb-4">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <h2 class="text-3xl md:text-4xl font-bold mb-4">Güzellik İpuçlarını Kaçırmayın</h2>
                <p class="text-[#5D6D7E]">Haftalık bültenimize abone olun, yeni trendler ve özel kampanyalardan ilk siz
                    haberdar olun.</p>
            </div>
            <form class="w-full max-w-md flex flex-col md:flex-row gap-4" onsubmit="event.preventDefault();">
                <input
                    class="flex-grow bg-white border-none rounded-full px-6 py-4 focus:ring-2 focus:ring-[#A65E6E] transition-all text-sm outline-none"
                    placeholder="E-posta adresiniz" type="email" required />
                <button
                    class="bg-[#A65E6E] text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#8E4D5B] transition-all whitespace-nowrap"
                    type="submit">
                    ABONE OL
                </button>
            </form>
            <p class="text-[10px] text-[#5D6D7E]/60 uppercase tracking-widest">Verileriniz KVKK kapsamında
                korunmaktadır.</p>
        </section>
    </main>
</div>

<?php require_once 'footer.php'; ?>