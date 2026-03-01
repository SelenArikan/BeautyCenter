<?php require_once 'header.php'; ?>

<!-- Hero Section -->
<div class="relative h-screen w-full overflow-hidden bg-[#F6D4DB]">
    <div class="absolute inset-0 bg-cover bg-center bg-no-repeat" style="transition: opacity 0.5s;">
        <video autoPlay loop muted playsInline class="absolute inset-0 w-full h-full object-cover"
            style="object-position: center center"
            poster="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop">
            <source src="/public/hero-bg.mp4" type="video/mp4" />
        </video>
        <div class="absolute inset-0 bg-white/40 md:bg-white/30"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/20"></div>
    </div>

    <div
        class="container relative z-10 mx-auto px-4 md:px-8 max-w-7xl h-full flex flex-col justify-center items-center text-center text-[#2C3E50] pt-20">
        <div class="fade-in-up">
            <h2 class="text-lg md:text-xl font-bold tracking-[0.4em] uppercase mb-4 text-[#A65E6E]">
                Güzelliğin Yeni Adresi
            </h2>
        </div>
        <div class="fade-in-up" style="transition-delay: 0.2s">
            <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-tight text-[#2C3E50]">
                Kendini <br class="hidden md:block" />
                <span class="italic font-serif font-light text-[#A65E6E]">Yeniden</span> Keşfet
            </h1>
        </div>
        <div class="fade-in-up" style="transition-delay: 0.4s">
            <p class="max-w-xl mx-auto text-lg md:text-xl text-[#2C3E50]/90 font-light leading-relaxed mb-12">
                Uzman dokunuşlar, premium ürünler ve kişiye özel bakım ritüelleriyle ışıltınızı ortaya çıkarın.
            </p>
        </div>

        <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 fade-in-up"
            style="transition-delay: 0.6s">
            <span class="text-[10px] uppercase tracking-[0.2em] text-[#2C3E50]/60">Aşağı Kaydır</span>
            <div class="animate-bounce mt-2">
                <i data-lucide="chevron-down" class="text-[#2C3E50]/80"></i>
            </div>
        </div>
    </div>
</div>

<!-- Services Section -->
<section class="py-20 md:py-32 bg-white" id="services" x-data="{ activeService: null }">
    <div class="container mx-auto px-4 md:px-8 max-w-7xl">
        <div class="text-center mb-16 fade-in-up">
            <h3 class="text-[#A65E6E] font-bold text-sm tracking-[0.2em] uppercase mb-4">Özel Bakım</h3>
            <h2 class="text-4xl md:text-5xl font-bold text-[#2C3E50] mb-6">Hizmetlerimiz</h2>
            <div class="w-24 h-1 bg-[#A65E6E] mx-auto rounded-full"></div>
        </div>

        <div class="space-y-24">
            <?php foreach ($serviceCategories as $catIndex => $category): ?>
                <div class="fade-in-up">
                    <h2 class="text-4xl md:text-5xl font-bold text-[#2C3E50] mb-4 tracking-tight uppercase font-serif">
                        <?= htmlspecialchars($category['title']) ?>
                    </h2>
                    <p class="text-[#5D6D7E] text-base md:text-lg font-light mb-10 max-w-lg">
                        <?= htmlspecialchars($category['desc']) ?>
                    </p>

                    <div class="flex flex-col gap-3 mb-10">
                        <?php foreach ($category['services'] as $sIndex => $service):
                            $serviceKey = "{$catIndex}-{$sIndex}";
                            ?>
                            <button
                                @click="activeService === '<?= $serviceKey ?>' ? activeService = null : activeService = '<?= $serviceKey ?>'"
                                :class="activeService === '<?= $serviceKey ?>' ? 'bg-[#2C3E50] text-white shadow-lg' : 'bg-[#A65E6E]/15 text-[#2C3E50] hover:bg-[#A65E6E] hover:text-white'"
                                class="flex items-center gap-3 w-fit px-6 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300">
                                <i data-lucide="sparkles" class="w-4 h-4"></i>
                                <?= htmlspecialchars($service['name']) ?>
                            </button>
                        <?php endforeach; ?>
                    </div>

                    <div class="relative overflow-hidden min-h-[400px]">
                        <div x-show="!['<?= implode("','", array_map(function ($k) use ($catIndex) {
                            return "$catIndex-$k";
                        }, array_keys($category['services']))) ?>'].includes(activeService)" x-collapse.duration.500ms>
                            <div class="rounded-2xl overflow-hidden shadow-xl">
                                <img src="<?= htmlspecialchars($category['image']) ?>"
                                    alt="<?= htmlspecialchars($category['title']) ?>"
                                    class="w-full h-72 md:h-96 object-cover" />
                            </div>
                        </div>

                        <?php foreach ($category['services'] as $sIndex => $service):
                            $serviceKey = "{$catIndex}-{$sIndex}";
                            ?>
                            <div x-show="activeService === '<?= $serviceKey ?>'" x-collapse.duration.500ms
                                style="display: none;">
                                <div class="bg-[#F5F5F0] rounded-2xl overflow-hidden shadow-xl mt-4">
                                    <div class="grid grid-cols-1 md:grid-cols-2">
                                        <div class="p-8 md:p-12 flex flex-col justify-center">
                                            <h3 class="text-2xl md:text-3xl font-bold text-[#2C3E50] mb-4">
                                                <?= htmlspecialchars($service['name']) ?>
                                            </h3>
                                            <p class="text-[#5D6D7E] text-base leading-relaxed mb-6 font-light">
                                                <?= htmlspecialchars($service['details']) ?>
                                            </p>
                                            <div class="flex items-center gap-2 text-[#A65E6E] font-semibold text-sm mb-6">
                                                <i data-lucide="clock" class="w-4 h-4"></i>
                                                <?= htmlspecialchars($service['duration']) ?>
                                            </div>
                                            <a href="hizmet.php?slug=<?= htmlspecialchars($service['slug']) ?>"
                                                class="w-fit px-6 py-3 bg-[#A65E6E] hover:bg-[#8E4D5B] text-white text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-300 transform hover:-translate-y-0.5 shadow-md inline-block">
                                                Şimdi Keşfet
                                            </a>
                                        </div>
                                        <div class="h-64 md:h-auto">
                                            <img src="<?= htmlspecialchars($service['image']) ?>"
                                                alt="<?= htmlspecialchars($service['name']) ?>"
                                                class="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

        <div class="mt-16 text-center text-[#2C3E50] fade-in-up">
            <button @click="isShowroomOpen = true"
                class="inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-[#A65E6E] text-[#A65E6E] hover:bg-[#A65E6E] hover:text-white text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-lg">
                Tüm Hizmetlerimiz
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
        </div>
    </div>
</section>

<!-- Intro Section -->
<section class="py-20 md:py-32 bg-[#F5F5F0]">
    <div class="container mx-auto px-4 md:px-8 max-w-7xl">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div class="fade-in-right relative group overflow-hidden rounded-2xl shadow-2xl">
                <img src="/public/assets/Masaj/_DSC5357.jpg" alt="Beauty Center"
                    class="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105" />
                <div class="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/70 to-transparent">
                    <div class="flex items-center gap-2 text-[#A65E6E]">
                        <i data-lucide="user" class="w-5 h-5"></i>
                        <span class="text-sm uppercase tracking-widest font-semibold">Uzman Kadro</span>
                    </div>
                </div>
            </div>
            <div class="fade-in-left">
                <h3 class="text-[#A65E6E] font-bold text-sm tracking-[0.2em] uppercase mb-4">
                    Love Yourself Güzellik
                </h3>
                <h2 class="text-4xl md:text-5xl font-bold text-[#2C3E50] mb-8 leading-tight">
                    Estetik ve Bakımın <br />
                    <span class="font-serif italic font-normal text-[#A65E6E]">Buluştuğu Nokta</span>
                </h2>
                <p class="text-[#5D6D7E] text-lg leading-relaxed mb-6 font-light">
                    Modern teknolojiyi geleneksel bakım ritüelleriyle birleştiren merkezimizde, cildinizin ihtiyaç
                    duyduğu tüm bakımları sunuyoruz.
                    Love Yourself, güzelliğinize değer katan dokunuşlarla sizi şımartmaya hazır.
                </p>
                <p class="text-[#5D6D7E] text-lg leading-relaxed mb-10 font-light">
                    Dünyaca ünlü markaların ürünleri ve sertifikalı uzmanlarımızla, kendinizi özel hissedeceğiniz
                    bir deneyim sizi bekliyor.
                </p>
                <a href="#services"
                    class="inline-flex items-center gap-2 text-[#2C3E50] font-semibold uppercase tracking-widest border-b-2 border-[#A65E6E] pb-1 hover:text-[#A65E6E] transition-colors">
                    Hizmetleri İncele <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Featured Experience -->
<section class="py-20 md:py-32 relative bg-[#F6D4DB] overflow-hidden">
    <div
        class="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/soft-wallpaper.png')] mix-blend-overlay">
    </div>
    <div class="container relative z-10 mx-auto px-4 md:px-8 max-w-7xl">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div class="space-y-8 fade-in-right">
                <h3 class="text-[#A65E6E] font-bold text-sm tracking-[0.2em] uppercase">Size Özel</h3>
                <h2 class="text-4xl md:text-6xl font-bold text-[#2C3E50] leading-tight">
                    Ruhunuzu ve Bedeninizi <br />
                    <span class="font-serif italic font-light text-[#A65E6E]">Dinlendirin</span>
                </h2>
                <p class="text-[#2C3E50]/80 text-lg font-light leading-relaxed">
                    Love Yourself'de sadece bakım yaptırmıyor, yenileniyorsunuz. Aromaterapi masajları, cilt yenileme
                    seansları,
                    detoks programları ve makyaj atölyeleri ile kendinize tam bir iyilik yapın.
                </p>
                <div class="grid grid-cols-2 gap-8 pt-4">
                    <div class="flex flex-col gap-2">
                        <div
                            class="w-12 h-12 bg-[#A65E6E] rounded-full flex items-center justify-center text-white mb-2">
                            <i data-lucide="coffee" class="w-6 h-6"></i>
                        </div>
                        <h4 class="text-[#2C3E50] font-bold text-lg">Detoks Bar</h4>
                        <p class="text-[#2C3E50]/60 text-sm font-light">Sağlıklı içecekler ve atıştırmalıklar.</p>
                    </div>
                    <div class="flex flex-col gap-2">
                        <div
                            class="w-12 h-12 bg-[#A65E6E] rounded-full flex items-center justify-center text-white mb-2">
                            <i data-lucide="user" class="w-6 h-6"></i>
                        </div>
                        <h4 class="text-[#2C3E50] font-bold text-lg">VIP Odalar</h4>
                        <p class="text-[#2C3E50]/60 text-sm font-light">Size özel hazırlanmış bakım alanları.</p>
                    </div>
                </div>
            </div>
            <div class="relative fade-in-left">
                <div
                    class="absolute top-0 right-0 w-64 h-64 bg-[#D4A373] rounded-full opacity-20 blur-3xl transform translate-x-1/4 -translate-y-1/4">
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <img src="/public/assets/Mekan/_DSC5227.jpg"
                        class="rounded-2xl shadow-2xl mt-12 transform hover:-translate-y-2 transition-transform duration-500"
                        alt="Makeup" />
                    <img src="/public/assets/Mekan/_DSC5211.jpg"
                        class="rounded-2xl shadow-2xl mb-12 transform hover:-translate-y-2 transition-transform duration-500"
                        alt="Spa" />
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Blog Section -->
<section class="py-20 md:py-32 bg-[#F5F5F0]" id="blog">
    <div class="container mx-auto px-4 md:px-8 max-w-7xl">
        <div class="text-center mb-16 fade-in-up">
            <h3 class="text-[#A65E6E] font-bold text-sm tracking-[0.2em] uppercase mb-4">Blog</h3>
            <h2 class="text-4xl md:text-5xl font-bold text-[#2C3E50] mb-6">Güzellik Rehberi</h2>
            <div class="w-24 h-1 bg-[#A65E6E] mx-auto rounded-full mb-6"></div>
            <p class="max-w-lg mx-auto text-[#5D6D7E] text-lg font-light">
                Bakım ipuçları, güzellik trendleri ve uzman önerileriyle kendinize en iyi şekilde bakın.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <?php
            $blogs = [
                [
                    "title" => "Kışın Cildinizi Korumak İçin 5 Altın Kural",
                    "excerpt" => "Soğuk havalarda cildinizin kurumasını önlemek ve sağlıklı bir görünüm elde etmek için uzman önerileri.",
                    "image" => "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=2070&auto=format&fit=crop",
                    "date" => "15 Şubat 2026",
                    "category" => "Cilt Bakımı"
                ],
                [
                    "title" => "Doğal Maske Tarifleri ile Evde Spa Keyfi",
                    "excerpt" => "Mutfağınızdaki malzemelerle hazırlayabileceğiniz etkili ve doğal yüz maskesi tarifleri.",
                    "image" => "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop",
                    "date" => "8 Şubat 2026",
                    "category" => "Güzellik"
                ],
                [
                    "title" => "2026 İlkbahar Tırnak Trendleri",
                    "excerpt" => "Bu sezonun en popüler tırnak renkleri, desenleri ve nail art trendleri hakkında bilmeniz gerekenler.",
                    "image" => "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2070&auto=format&fit=crop",
                    "date" => "1 Şubat 2026",
                    "category" => "Tırnaklar"
                ]
            ];
            foreach ($blogs as $index => $post):
                ?>
                <div class="fade-in-up" style="transition-delay: <?= $index * 0.2 ?>s">
                    <div
                        class="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
                        <div class="relative h-56 overflow-hidden">
                            <img src="<?= htmlspecialchars($post['image']) ?>" alt="<?= htmlspecialchars($post['title']) ?>"
                                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div class="absolute top-4 left-4">
                                <span
                                    class="px-3 py-1 bg-[#A65E6E] text-white text-xs font-bold uppercase tracking-wider rounded-full">
                                    <?= htmlspecialchars($post['category']) ?>
                                </span>
                            </div>
                        </div>
                        <div class="p-6">
                            <span class="text-[#A65E6E] text-xs font-medium tracking-wide">
                                <?= htmlspecialchars($post['date']) ?>
                            </span>
                            <h3
                                class="text-xl font-bold text-[#2C3E50] mt-2 mb-3 group-hover:text-[#A65E6E] transition-colors leading-snug">
                                <?= htmlspecialchars($post['title']) ?>
                            </h3>
                            <p class="text-[#5D6D7E] text-sm leading-relaxed font-light mb-4">
                                <?= htmlspecialchars($post['excerpt']) ?>
                            </p>
                            <span
                                class="inline-flex items-center gap-2 text-[#A65E6E] text-sm font-semibold uppercase tracking-wide group-hover:gap-3 transition-all">
                                Devamını Oku <i data-lucide="arrow-right" class="w-3 h-3"></i>
                            </span>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Google Reviews Section -->
<section class="py-20 md:py-32 bg-white" id="reviews">
    <div class="container mx-auto px-4 md:px-8 max-w-7xl">
        <div class="text-center mb-16 fade-in-up">
            <div class="flex items-center justify-center gap-3 mb-4">
                <svg viewBox="0 0 24 24" width="28" height="28">
                    <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                        fill="#4285F4" />
                    <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853" />
                    <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05" />
                    <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335" />
                </svg>
                <h3 class="text-[#A65E6E] font-bold text-sm tracking-[0.2em] uppercase">Google Yorumları</h3>
            </div>
            <h2 class="text-4xl md:text-5xl font-bold text-[#2C3E50] mb-6">Misafirlerimiz Ne Diyor?</h2>
            <div class="w-24 h-1 bg-[#A65E6E] mx-auto rounded-full mb-8"></div>
        </div>

        <!-- Static Reviews -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 fade-in-up">
            <?php
            $reviews = [
                ['name' => 'Ayşe Y.', 'rating' => 5, 'text' => 'Çok memnun kaldım, harika bir yer!', 'time' => '1 hafta önce'],
                ['name' => 'Elif B.', 'rating' => 5, 'text' => 'Personel çok ilgili, işlemler çok başarılı.', 'time' => '1 ay önce'],
                ['name' => 'Zeynep K.', 'rating' => 5, 'text' => 'Temiz ve profesyonel bir ortam. Kesinlikle tavsiye ederim.', 'time' => '2 ay önce'],
            ];
            $colors = ['#A65E6E', '#4285F4', '#34A853'];
            foreach ($reviews as $i => $review):
                ?>
                <div class="bg-[#F5F5F0] rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
                            style="background-color: <?= $colors[$i] ?>">
                            <?= substr($review['name'], 0, 1) ?>
                        </div>
                        <div>
                            <h4 class="font-semibold text-[#2C3E50] text-sm">
                                <?= htmlspecialchars($review['name']) ?>
                            </h4>
                            <span class="text-[#5D6D7E] text-xs font-light">
                                <?= htmlspecialchars($review['time']) ?>
                            </span>
                        </div>
                        <div class="ml-auto">
                            <svg viewBox="0 0 24 24" width="20" height="20" class="opacity-40">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                                    fill="#4285F4" />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853" />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05" />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335" />
                            </svg>
                        </div>
                    </div>
                    <div class="mb-3 flex items-center gap-0.5">
                        <?php for ($star = 1; $star <= 5; $star++): ?>
                            <svg width="14" height="14" viewBox="0 0 24 24"
                                fill="<?= $star <= $review['rating'] ? '#FBBC05' : '#E5E7EB' ?>">
                                <path
                                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        <?php endfor; ?>
                    </div>
                    <p class="text-[#5D6D7E] text-sm leading-relaxed font-light line-clamp-4">
                        <?= htmlspecialchars($review['text']) ?>
                    </p>
                </div>
            <?php endforeach; ?>
        </div>

        <div class="text-center mt-12 fade-in-up">
            <a href="https://www.google.com/maps/search/Love+Yourself+by+Anastasiya+B%C3%BCy%C3%BCk%C3%A7ekmece"
                target="_blank" rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-8 py-3 bg-[#A65E6E] hover:bg-[#8E4D5B] text-white text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg">
                Yorum Bırakın
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>
        </div>
    </div>
</section>

<?php require_once 'footer.php'; ?>