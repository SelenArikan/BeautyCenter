<?php
require_once 'data.php';

$slug = $_GET['slug'] ?? '';
$foundService = null;
$foundCategory = null;

foreach ($serviceCategories as $category) {
    foreach ($category['services'] as $service) {
        if ($service['slug'] === $slug) {
            $foundService = $service;
            $foundCategory = $category;
            break 2;
        }
    }
}

$pageTitle = $foundService ? $foundService['name'] . ' - Love Yourself By Anastasiya' : 'Hizmet Bulunamadı - Love Yourself By Anastasiya';

require_once 'header.php';

if (!$foundService) {
    echo '<div class="min-h-screen flex items-center justify-center bg-[#F5F5F0]">
            <div class="text-center">
                <h1 class="text-4xl font-bold text-[#2C3E50] mb-4">Hizmet Bulunamadı</h1>
                <a href="/" class="text-[#A65E6E] font-semibold hover:underline">Ana Sayfaya Dön</a>
            </div>
          </div>';
    require_once 'footer.php';
    exit;
}
?>

<div class="pt-0 bg-[#F5F5F0] text-[#2C3E50] font-sans selection:bg-[#F6D4DB] selection:text-[#2C3E50]">
    <!-- Hero Banner -->
    <div class="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
        <img src="<?= htmlspecialchars($foundService['heroImage'] ?? $foundService['image']) ?>"
            alt="<?= htmlspecialchars($foundService['name']) ?>" class="absolute inset-0 w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>

        <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-4 mt-16">
            <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight fade-in-up">
                <?= htmlspecialchars($foundService['name']) ?>
            </h1>
            <div class="flex items-center gap-2 text-white/80 text-sm md:text-base fade-in-up"
                style="transition-delay: 0.2s">
                <a href="/" class="hover:text-[#A65E6E] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                </a>
                <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
                <a href="/#services" class="hover:text-[#A65E6E] transition-colors">
                    <?= htmlspecialchars($foundCategory['title']) ?>
                </a>
                <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
                <span class="text-white">
                    <?= htmlspecialchars($foundService['name']) ?>
                </span>
            </div>
        </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 md:px-8 max-w-7xl py-16 md:py-24">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">

            <!-- Left: Main Content -->
            <div class="lg:col-span-2 fade-in-up" style="transition-delay: 0.3s">
                <!-- Service Image -->
                <div class="rounded-2xl overflow-hidden shadow-2xl mb-10">
                    <img src="<?= htmlspecialchars($foundService['image']) ?>"
                        alt="<?= htmlspecialchars($foundService['name']) ?>"
                        class="w-full h-[300px] md:h-[450px] object-cover" />
                </div>

                <!-- Service Title & Description -->
                <h2 class="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-6">
                    <?= htmlspecialchars($foundService['name']) ?>
                </h2>
                <p class="text-[#5D6D7E] text-lg leading-relaxed font-light mb-8 whitespace-pre-line">
                    <?= htmlspecialchars($foundService['longDetails']) ?>
                </p>

                <!-- Features Grid -->
                <?php if (!empty($foundService['features'])): ?>
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                        <?php foreach ($foundService['features'] as $feature): ?>
                            <div class="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                                <div
                                    class="w-8 h-8 bg-[#A65E6E]/10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <i data-lucide="sparkles" class="w-4 h-4 text-[#A65E6E]"></i>
                                </div>
                                <span class="text-sm font-medium text-[#2C3E50]">
                                    <?= htmlspecialchars($feature) ?>
                                </span>
                            </div>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
            </div>

            <!-- Right: Sidebar -->
            <div class="fade-in-right" style="transition-delay: 0.5s">
                <div class="sticky top-28">
                    <!-- Reservation Card -->
                    <div class="bg-white rounded-2xl shadow-xl p-8 mb-8">
                        <div class="flex items-center gap-3 mb-6">
                            <div class="w-12 h-12 bg-[#A65E6E] rounded-full flex items-center justify-center">
                                <i data-lucide="clock" class="w-5 h-5 text-white"></i>
                            </div>
                            <div>
                                <span class="block text-sm text-[#5D6D7E] font-light">Süre</span>
                                <span class="block text-lg font-bold text-[#2C3E50]">
                                    <?= htmlspecialchars($foundService['duration']) ?>
                                </span>
                            </div>
                        </div>
                        <a href="<?= htmlspecialchars($RANDEVU_URL) ?>" target="_blank" rel="noopener noreferrer"
                            class="block w-full py-4 bg-[#A65E6E] hover:bg-[#8E4D5B] text-white text-center text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg">
                            Randevu Al
                        </a>
                    </div>

                    <!-- Reservation Note -->
                    <div class="bg-[#F6D4DB]/30 rounded-2xl p-6 mb-8">
                        <h4 class="font-bold text-[#2C3E50] mb-2">Randevudan Önce;</h4>
                        <ul class="text-[#5D6D7E] text-sm font-light space-y-2">
                            <li>• Randevunuza 10 dakika önce gelmenizi rica ederiz.</li>
                            <li>• İptal ve değişiklik için en az 24 saat öncesinden bilgilendiriniz.</li>
                            <li>• Alerjik reaksiyon bilgilerinizi paylaşmayı unutmayınız.</li>
                        </ul>
                    </div>

                    <!-- Other Services -->
                    <div class="bg-white rounded-2xl shadow-xl p-6">
                        <h4 class="font-bold text-[#2C3E50] mb-4 text-lg">Diğer Hizmetlerimiz</h4>
                        <div class="space-y-2">
                            <?php
                            $otherCount = 0;
                            foreach ($foundCategory['services'] as $s):
                                if ($s['slug'] === $foundService['slug'])
                                    continue;
                                if ($otherCount >= 4)
                                    break;
                                $otherCount++;
                                ?>
                                <a href="hizmet.php?slug=<?= htmlspecialchars($s['slug']) ?>"
                                    class="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F5F5F0] transition-colors group">
                                    <img src="<?= htmlspecialchars($s['image']) ?>"
                                        alt="<?= htmlspecialchars($s['name']) ?>"
                                        class="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                                    <div class="flex-1">
                                        <span
                                            class="block text-sm font-semibold text-[#2C3E50] group-hover:text-[#A65E6E] transition-colors">
                                            <?= htmlspecialchars($s['name']) ?>
                                        </span>
                                        <span class="block text-xs text-[#5D6D7E]">
                                            <?= htmlspecialchars($s['duration']) ?>
                                        </span>
                                    </div>
                                    <i data-lucide="arrow-right"
                                        class="w-4 h-4 text-[#A65E6E] opacity-0 group-hover:opacity-100 transition-opacity"></i>
                                </a>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer Link -->
    <div class="bg-[#A65E6E] py-6 text-center">
        <a href="/"
            class="inline-block text-white font-semibold uppercase tracking-widest text-sm hover:text-white/80 transition-colors">
            &larr; Ana Sayfaya Dön
        </a>
    </div>
</div>

<script>
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    document.addEventListener("DOMContentLoaded", () => {
        setTimeout(() => {
            document.querySelectorAll('.fade-in-up, .fade-in-right, .fade-in-left').forEach(el => el.classList.add('visible'));
        }, 100);
    });
</script>

<?php require_once 'footer.php'; ?>