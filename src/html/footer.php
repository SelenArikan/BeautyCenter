<!-- Footer -->
<footer class="bg-[#f9def1] text-[#000000] pt-20 pb-10 border-t border-[#000000]/10">
    <div class="container mx-auto px-4 md:px-8 max-w-7xl">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div class="space-y-6">
                <a href="/" class="block text-center md:text-left">
                    <img src="/public/assets/logo/logo.png" alt="Love Yourself By Anastasiya"
                        class="h-12 w-auto mx-auto md:mx-0 transition-transform duration-300 hover:scale-105" />
                </a>
                <p class="text-[#000000]/70 text-sm font-light leading-relaxed">
                    Şehrin kalbinde, stresten uzak, kendinizle baş başa kalacağınız özel bir kaçış noktası.
                </p>
                <div class="flex gap-4">
                    <a href="https://www.instagram.com/loveyourselfbyanastasiya/" target="_blank"
                        rel="noopener noreferrer"
                        class="w-10 h-10 rounded-full bg-[#000000]/5 hover:bg-[#ec4cc7] flex items-center justify-center transition-colors duration-300 text-[#000000] hover:text-white">
                        <i data-lucide="instagram" class="w-5 h-5"></i>
                    </a>
                </div>
            </div>

            <div>
                <h4 class="text-lg font-bold mb-6 text-[#ec4cc7]">Hızlı Menü</h4>
                <ul class="space-y-3">
                    <li><a href="#services"
                            class="text-[#000000]/70 hover:text-[#000000] text-sm transition-colors flex items-center gap-2"><i
                                data-lucide="arrow-right" class="w-3 h-3 text-[#ec4cc7]"></i> Hizmetlerimiz</a></li>
                    <li><a href="#blog"
                            class="text-[#000000]/70 hover:text-[#000000] text-sm transition-colors flex items-center gap-2"><i
                                data-lucide="arrow-right" class="w-3 h-3 text-[#ec4cc7]"></i> Blog</a></li>
                    <li><a href="https://wa.me/905385296388"
                            class="text-[#000000]/70 hover:text-[#000000] text-sm transition-colors flex items-center gap-2"><i
                                data-lucide="arrow-right" class="w-3 h-3 text-[#ec4cc7]"></i> İletişim</a></li>
                </ul>
            </div>

            <div>
                <h4 class="text-lg font-bold mb-6 text-[#ec4cc7]">Bilgilendirme</h4>
                <ul class="space-y-3">
                    <li><a href="#" class="text-[#000000]/70 hover:text-[#000000] text-sm transition-colors">KVKK
                            Aydınlatma Metni</a></li>
                    <li><a href="#" class="text-[#000000]/70 hover:text-[#000000] text-sm transition-colors">Gizlilik
                            Politikası</a></li>
                    <li><a href="#" class="text-[#000000]/70 hover:text-[#000000] text-sm transition-colors">Çerez
                            Politikası</a></li>
                    <li><a href="#" class="text-[#000000]/70 hover:text-[#000000] text-sm transition-colors">Mesafeli
                            Satış Sözleşmesi</a></li>
                </ul>
            </div>

            <div>
                <h4 class="text-lg font-bold mb-6 text-[#ec4cc7]">İletişim</h4>
                <ul class="space-y-4">
                    <li class="flex items-start gap-3">
                        <i data-lucide="map-pin" class="w-5 h-5 text-[#ec4cc7] mt-1 shrink-0"></i>
                        <span class="text-[#000000]/70 text-sm font-light">Güzelce Mah. Geçit Cd. No:9 D:3D, 34530
                            Büyükçekmece/İstanbul</span>
                    </li>
                    <li class="flex items-center gap-3">
                        <i data-lucide="phone" class="w-5 h-5 text-[#ec4cc7]"></i>
                        <a href="https://wa.me/905385296388" target="_blank" rel="noopener noreferrer"
                            class="text-[#000000]/70 text-sm font-light hover:text-[#ec4cc7] transition-colors">+90 538
                            529 63 88</a>
                    </li>
                    <li class="flex items-center gap-3">
                        <i data-lucide="mail" class="w-5 h-5 text-[#ec4cc7]"></i>
                        <span class="text-[#000000]/70 text-sm font-light">info@loveyourself.com.tr</span>
                    </li>
                </ul>
            </div>
        </div>

        <div class="pt-8 border-t border-[#000000]/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-[#000000]/40 text-xs font-light">
                &copy;
                <?= date('Y') ?> Love Yourself By Anastasiya. Tüm hakları saklıdır.
            </p>
            <div class="flex gap-6">

            </div>
        </div>
    </div>
</footer>

<!-- Showroom Modal -->
<div x-show="isShowroomOpen" x-transition.opacity style="display: none;"
    class="fixed inset-0 z-[100] bg-white overflow-y-auto">
    <div class="min-h-screen pb-20">
        <!-- Header -->
        <div
            class="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-100 py-6 px-4 md:px-8 flex justify-between items-center shadow-sm">
            <h2 class="text-xl md:text-2xl font-bold tracking-widest uppercase text-[#000000]">Tüm Hizmetlerimiz</h2>
            <button @click="isShowroomOpen = false"
                class="p-2 text-[#5D6D7E] hover:text-[#ec4cc7] transition-colors rounded-full hover:bg-[#ffffff]">
                <i data-lucide="x" class="w-7 h-7"></i>
            </button>
        </div>

        <!-- Showroom Grid -->
        <div class="container mx-auto px-4 md:px-8 mt-12 max-w-7xl">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <?php foreach ($serviceCategories as $cat): ?>
                    <?php foreach ($cat['services'] as $service): ?>
                        <div
                            class="group cursor-pointer bg-[#ffffff] rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full fade-in-up">
                            <div class="relative h-64 overflow-hidden shrink-0">
                                <img src="<?= htmlspecialchars($service['image']) ?>"
                                    alt="<?= htmlspecialchars($service['name']) ?>"
                                    class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                <div
                                    class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                </div>
                            </div>
                            <div class="p-6 flex flex-col flex-grow">
                                <span class="text-xs font-bold text-[#ec4cc7] uppercase tracking-wider mb-2 block">
                                    <?= htmlspecialchars($cat['title']) ?>
                                </span>
                                <h3 class="text-xl font-bold text-[#000000] mb-3">
                                    <?= htmlspecialchars($service['name']) ?>
                                </h3>
                                <p class="text-[#5D6D7E] text-sm font-light line-clamp-3 mb-6 flex-grow">
                                    <?= htmlspecialchars($service['details']) ?>
                                </p>
                                <div class="flex items-center justify-between mt-auto pt-4 border-t border-[#000000]/10">
                                    <span
                                        class="text-xs font-semibold text-[#000000] border border-[#000000]/20 px-3 py-1 rounded-full">
                                        <?= htmlspecialchars($service['duration']) ?>
                                    </span>
                                    <a href="hizmet.php?slug=<?= htmlspecialchars($service['slug']) ?>"
                                        @click="isShowroomOpen = false"
                                        class="text-[#ec4cc7] font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Keşfet <i data-lucide="arrow-right" class="w-3 h-3"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</div>

<script>
    // Initialize Lucide icons
    lucide.createIcons();

    // Intersection Observer for scroll animations
    document.addEventListener("DOMContentLoaded", () => {
        const observerOptions = {
            root: null,
            rootMargin: '-50px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
            observer.observe(el);
        });
    });
</script>
</body>

</html>