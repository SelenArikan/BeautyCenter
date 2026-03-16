<?php
$pageTitle = 'Kalıcı Makyaj Bilgilendirme - Love Yourself By Anastasiya';
require_once 'header.php';
?>

<div class="pt-0 bg-[#ffffff] text-[#000000] font-sans selection:bg-[#f9def1] selection:text-[#000000]">

    <!-- Hero Banner -->
    <div class="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
        <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2069&auto=format&fit=crop"
            alt="Kalıcı Makyaj Bilgilendirme"
            class="absolute inset-0 w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>

        <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-4 mt-16">
            <span class="inline-block mb-4 px-4 py-1.5 bg-[#ec4cc7]/30 backdrop-blur-sm border border-[#ec4cc7]/50 text-[#ec4cc7] text-xs font-semibold uppercase tracking-[0.2em] rounded-full fade-in-up">
                Uygulama Öncesi
            </span>
            <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight fade-in-up" style="transition-delay:0.1s">
                Kalıcı Makyaj
            </h1>
            <p class="text-white/80 text-lg md:text-xl font-light fade-in-up" style="transition-delay:0.2s">
                Bilgilendirme &amp; Konsültasyon
            </p>
            <div class="flex items-center gap-2 text-white/60 text-sm mt-4 fade-in-up" style="transition-delay:0.3s">
                <a href="/" class="hover:text-[#ec4cc7] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                </a>
                <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
                <a href="/#services" class="hover:text-[#ec4cc7] transition-colors">Kalıcı Makyaj</a>
                <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
                <span class="text-white">Bilgilendirme</span>
            </div>
        </div>
    </div>

    <!-- Intro Band -->
    <div class="bg-[#ec4cc7] py-5 text-center fade-in-up">
        <p class="text-white text-sm md:text-base font-medium tracking-wide px-4">
            Aşağıdaki bilgilendirmeler, uygulamanızdan önce dikkatle okunması gereken önemli bilgilerdir.
        </p>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 md:px-8 max-w-5xl py-16 md:py-24">

        <!-- Section 1: Bilgilendirme Maddeleri -->
        <div class="mb-20 fade-in-up" style="transition-delay:0.1s">
            <div class="flex items-center gap-4 mb-10">
                <div class="w-12 h-12 bg-[#ec4cc7] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <i data-lucide="file-text" class="w-5 h-5 text-white"></i>
                </div>
                <div>
                    <h2 class="text-2xl md:text-3xl font-bold text-[#000000]">Bilgilendirme Maddeleri</h2>
                    <p class="text-[#5D6D7E] text-sm font-light mt-0.5">Uygulama öncesi okumanız gereken bilgiler</p>
                </div>
            </div>

            <div class="space-y-4">

                <!-- Madde 1 -->
                <div class="flex gap-4 p-5 md:p-6 bg-white rounded-2xl shadow-sm border border-[#f9def1] hover:shadow-md transition-shadow group fade-in-up" style="transition-delay:0.1s">
                    <div class="w-10 h-10 bg-[#f9def1] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#ec4cc7] transition-colors">
                        <span class="text-[#ec4cc7] font-bold text-sm group-hover:text-white transition-colors">1</span>
                    </div>
                    <div class="flex-1">
                        <p class="text-[#000000] text-sm md:text-base leading-relaxed font-light">
                            Uygulanacak yöntem tarafıma <strong class="font-semibold text-[#ec4cc7]">Love Yourself by Anastasiya</strong> tarafından izah edildi. İşlem sırasında ve sonrasında çıkabilecek riskler ve komplikasyonlar konusunda bilgilendirildim.
                        </p>
                    </div>
                </div>

                <!-- Madde 2 -->
                <div class="flex gap-4 p-5 md:p-6 bg-white rounded-2xl shadow-sm border border-[#f9def1] hover:shadow-md transition-shadow group fade-in-up" style="transition-delay:0.15s">
                    <div class="w-10 h-10 bg-[#f9def1] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#ec4cc7] transition-colors">
                        <span class="text-[#ec4cc7] font-bold text-sm group-hover:text-white transition-colors">2</span>
                    </div>
                    <div class="flex-1">
                        <p class="text-[#000000] text-sm md:text-base leading-relaxed font-light">
                            Uygulama sırasında biraz <strong class="font-semibold">acı duyabileceğimi</strong> öğrendim. Her bireyin farklı acı eşiği olduğunu öğrendim. Hissedilen acı, ağrı eşiğine göre olacaktır.
                        </p>
                    </div>
                </div>

                <!-- Madde 3 -->
                <div class="flex gap-4 p-5 md:p-6 bg-white rounded-2xl shadow-sm border border-[#f9def1] hover:shadow-md transition-shadow group fade-in-up" style="transition-delay:0.2s">
                    <div class="w-10 h-10 bg-[#f9def1] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#ec4cc7] transition-colors">
                        <span class="text-[#ec4cc7] font-bold text-sm group-hover:text-white transition-colors">3</span>
                    </div>
                    <div class="flex-1">
                        <p class="text-[#000000] text-sm md:text-base leading-relaxed font-light">
                            Ender de olsa <strong class="font-semibold">şişme, az miktarda kanama, kızarıklık, hassasiyet</strong> ve çok ender olmakla birlikte <strong class="font-semibold">morarma</strong> gibi diğer ters etkiler konusunda bilgilendirildim.
                        </p>
                    </div>
                </div>

                <!-- Madde 4 -->
                <div class="flex gap-4 p-5 md:p-6 bg-white rounded-2xl shadow-sm border border-[#f9def1] hover:shadow-md transition-shadow group fade-in-up" style="transition-delay:0.25s">
                    <div class="w-10 h-10 bg-[#f9def1] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#ec4cc7] transition-colors">
                        <span class="text-[#ec4cc7] font-bold text-sm group-hover:text-white transition-colors">4</span>
                    </div>
                    <div class="flex-1">
                        <p class="text-[#000000] text-sm md:text-base leading-relaxed font-light">
                            Renkte bir miktar <strong class="font-semibold">solma olabileceğini</strong> öğrendim. Cilt ne kadar yağlı ise, solma o denli fazla olur. Rengin ne kadar kalacağına dair herhangi bir garanti verilmemiştir.
                        </p>
                    </div>
                </div>

                <!-- Madde 5 -->
                <div class="flex gap-4 p-5 md:p-6 bg-[#f9def1]/20 rounded-2xl shadow-sm border border-[#ec4cc7]/20 hover:shadow-md transition-shadow group fade-in-up" style="transition-delay:0.3s">
                    <div class="w-10 h-10 bg-[#ec4cc7] rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                        <span class="text-white font-bold text-sm">5</span>
                    </div>
                    <div class="flex-1">
                        <p class="text-[#000000] text-sm md:text-base leading-relaxed font-light">
                            Kalıcı makyaj bir <strong class="font-semibold text-[#ec4cc7]">süreçtir</strong>. Rötuş uygulaması gerektirebilir. Renk rötuş uygulamalarının sayısı konusunda garanti verilmemiştir.
                        </p>
                        <div class="mt-3 flex flex-wrap gap-2">
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ec4cc7]/10 text-[#ec4cc7] text-xs font-semibold rounded-full">
                                <i data-lucide="check-circle" class="w-3 h-3"></i>
                                İlk rötuş ücretsiz
                            </span>
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-[#5D6D7E]/10 text-[#5D6D7E] text-xs font-semibold rounded-full">
                                <i data-lucide="info" class="w-3 h-3"></i>
                                Sonraki rötuşlar ücretlidir
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Madde 6 -->
                <div class="flex gap-4 p-5 md:p-6 bg-white rounded-2xl shadow-sm border border-[#f9def1] hover:shadow-md transition-shadow group fade-in-up" style="transition-delay:0.35s">
                    <div class="w-10 h-10 bg-[#f9def1] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#ec4cc7] transition-colors">
                        <span class="text-[#ec4cc7] font-bold text-sm group-hover:text-white transition-colors">6</span>
                    </div>
                    <div class="flex-1">
                        <p class="text-[#000000] text-sm md:text-base leading-relaxed font-light">
                            <strong class="font-semibold">Kaşların şekli, rengi ve konumu</strong> konusunda her türlü sorumluluk danışan tarafından üstlenilmektedir.
                        </p>
                    </div>
                </div>

                <!-- Madde 7 -->
                <div class="flex gap-4 p-5 md:p-6 bg-[#fff3e0]/50 rounded-2xl shadow-sm border border-orange-200 hover:shadow-md transition-shadow group fade-in-up" style="transition-delay:0.4s">
                    <div class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-orange-400 transition-colors">
                        <span class="text-orange-500 font-bold text-sm group-hover:text-white transition-colors">7</span>
                    </div>
                    <div class="flex-1">
                        <div class="flex items-start gap-2">
                            <i data-lucide="alert-triangle" class="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5"></i>
                            <p class="text-[#000000] text-sm md:text-base leading-relaxed font-light">
                                <strong class="font-semibold">Eyeliner işleminden sonra 8 saat araç kullanılmaması</strong> gerektiği bilgilendirilmiştir.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Madde 8 -->
                <div class="flex gap-4 p-5 md:p-6 bg-white rounded-2xl shadow-sm border border-[#f9def1] hover:shadow-md transition-shadow group fade-in-up" style="transition-delay:0.45s">
                    <div class="w-10 h-10 bg-[#f9def1] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#ec4cc7] transition-colors">
                        <span class="text-[#ec4cc7] font-bold text-sm group-hover:text-white transition-colors">8</span>
                    </div>
                    <div class="flex-1">
                        <p class="text-[#000000] text-sm md:text-base leading-relaxed font-light">
                            İşlem tamamlandıktan sonra <strong class="font-semibold">evde yapılacak bakım</strong> konusunda gerekli bilgiler verilmiştir. Tüm bakım talimatlarına uymak önemlidir.
                        </p>
                    </div>
                </div>

                <!-- Madde 9 -->
                <div class="flex gap-4 p-5 md:p-6 bg-white rounded-2xl shadow-sm border border-[#f9def1] hover:shadow-md transition-shadow group fade-in-up" style="transition-delay:0.5s">
                    <div class="w-10 h-10 bg-[#f9def1] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#ec4cc7] transition-colors">
                        <span class="text-[#ec4cc7] font-bold text-sm group-hover:text-white transition-colors">9</span>
                    </div>
                    <div class="flex-1">
                        <p class="text-[#000000] text-sm md:text-base leading-relaxed font-light">
                            Nadir olmakla birlikte <strong class="font-semibold">ikincil enfeksiyon</strong> görülebileceği öğrenilmiştir. Bunu önlemek için tüm ev bakım direktiflerine uyulması gerekmektedir.
                        </p>
                    </div>
                </div>

                <!-- Madde 10 -->
                <div class="flex gap-4 p-5 md:p-6 bg-[#f9def1]/30 rounded-2xl shadow-sm border border-[#ec4cc7]/20 hover:shadow-md transition-shadow group fade-in-up" style="transition-delay:0.55s">
                    <div class="w-10 h-10 bg-[#ec4cc7] rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                        <span class="text-white font-bold text-sm">10</span>
                    </div>
                    <div class="flex-1">
                        <p class="text-[#000000] text-sm md:text-base leading-relaxed font-light mb-3">
                            İlk işlem uygulandığı gün itibarıyla <strong class="font-semibold text-[#ec4cc7]">30 GÜN içerisinde</strong> bir rötuş ücretsiz yapılmaktadır. Sonrasında <strong class="font-semibold">90 ila 180 gün arasında</strong> bir adet tazeleme ücret karşılığında yaptırma hakkı bulunmaktadır.
                        </p>
                        <div class="grid grid-cols-2 gap-2">
                            <div class="bg-white rounded-xl p-3 text-center border border-[#f9def1]">
                                <span class="block text-[#ec4cc7] font-bold text-lg">30 Gün</span>
                                <span class="block text-[#5D6D7E] text-xs font-light">Ücretsiz rötuş</span>
                            </div>
                            <div class="bg-white rounded-xl p-3 text-center border border-[#f9def1]">
                                <span class="block text-[#000000] font-bold text-lg">90–180 Gün</span>
                                <span class="block text-[#5D6D7E] text-xs font-light">Ücretli tazeleme</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Madde 11 -->
                <div class="flex gap-4 p-5 md:p-6 bg-white rounded-2xl shadow-sm border border-[#f9def1] hover:shadow-md transition-shadow group fade-in-up" style="transition-delay:0.6s">
                    <div class="w-10 h-10 bg-[#f9def1] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#ec4cc7] transition-colors">
                        <span class="text-[#ec4cc7] font-bold text-sm group-hover:text-white transition-colors">11</span>
                    </div>
                    <div class="flex-1">
                        <p class="text-[#000000] text-sm md:text-base leading-relaxed font-light">
                            <strong class="font-semibold">Yüz, kaş ve dudak fotoğraflarının</strong> işlem öncesi ve sonrası çekilmesine, sosyal medyada reklam amaçlı olarak kullanılmasına izin verildiğinde <strong class="font-semibold text-[#ec4cc7]">Love Yourself by Anastasiya</strong> ve işlem yapan uzman yetkilendirilmiş olmaktadır.
                        </p>
                    </div>
                </div>

            </div>
        </div>

        <!-- Divider -->
        <div class="relative my-16 fade-in-up">
            <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-[#f9def1]"></div>
            </div>
            <div class="relative flex justify-center">
                <span class="px-6 py-2 bg-white text-[#ec4cc7] text-xs font-bold uppercase tracking-[0.25em] rounded-full border border-[#f9def1]">
                    Sağlık Sorgulaması
                </span>
            </div>
        </div>

        <!-- Section 2: Sağlık Soruları -->
        <div class="mb-20 fade-in-up" style="transition-delay:0.1s">
            <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 bg-[#000000] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <i data-lucide="heart-pulse" class="w-5 h-5 text-white"></i>
                </div>
                <div>
                    <h2 class="text-2xl md:text-3xl font-bold text-[#000000]">Sağlık Soruları</h2>
                    <p class="text-[#5D6D7E] text-sm font-light mt-0.5">Uygulamadan önce belirtilmesi gereken durumlar</p>
                </div>
            </div>
            <p class="text-[#5D6D7E] text-sm font-light mb-8 pl-16">
                Aşağıdaki durumlardan herhangi birine sahipseniz, uygulamadan önce uzmanınızı mutlaka bilgilendirmeniz gerekmektedir.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

                <!-- A: Dermotografi -->
                <div class="p-5 bg-white rounded-2xl border border-[#f9def1] shadow-sm hover:shadow-md transition-shadow fade-in-up" style="transition-delay:0.1s">
                    <div class="flex items-start gap-3">
                        <span class="w-8 h-8 bg-[#ec4cc7]/10 rounded-full flex items-center justify-center flex-shrink-0 text-[#ec4cc7] font-bold text-xs">A</span>
                        <div>
                            <h4 class="font-bold text-[#000000] text-sm mb-1">Dermotografi</h4>
                            <p class="text-[#5D6D7E] text-xs font-light leading-relaxed">
                                Cilt travmasına reaksiyon gösteren bir durumunuz var mı? (Cilt çizildiğinde kabarma veya şişme oluyor mu?)
                            </p>
                        </div>
                    </div>
                </div>

                <!-- B: İlaç Kullanımı -->
                <div class="p-5 bg-white rounded-2xl border border-[#f9def1] shadow-sm hover:shadow-md transition-shadow fade-in-up" style="transition-delay:0.15s">
                    <div class="flex items-start gap-3">
                        <span class="w-8 h-8 bg-[#ec4cc7]/10 rounded-full flex items-center justify-center flex-shrink-0 text-[#ec4cc7] font-bold text-xs">B</span>
                        <div>
                            <h4 class="font-bold text-[#000000] text-sm mb-1">Sürekli İlaç Kullanımı</h4>
                            <p class="text-[#5D6D7E] text-xs font-light leading-relaxed">
                                Düzenli olarak kullandığınız bir ilaç var mı? Varsa lütfen belirtiniz.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- C: Gebelik -->
                <div class="p-5 bg-[#fff8e1]/60 rounded-2xl border border-yellow-200 shadow-sm hover:shadow-md transition-shadow fade-in-up" style="transition-delay:0.2s">
                    <div class="flex items-start gap-3">
                        <span class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 text-yellow-700 font-bold text-xs">C</span>
                        <div>
                            <h4 class="font-bold text-[#000000] text-sm mb-1">Gebelik</h4>
                            <p class="text-[#5D6D7E] text-xs font-light leading-relaxed">
                                Hamile misiniz? Gebelik sırasında hormonlar değiştiğinden pigmentsel değişiklikler görülebilir. <strong class="text-yellow-700">Gebelik sona erene kadar uygulama yapılmaması önerilir.</strong>
                            </p>
                        </div>
                    </div>
                </div>

                <!-- D: Alkol -->
                <div class="p-5 bg-[#fff8e1]/60 rounded-2xl border border-yellow-200 shadow-sm hover:shadow-md transition-shadow fade-in-up" style="transition-delay:0.25s">
                    <div class="flex items-start gap-3">
                        <span class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 text-yellow-700 font-bold text-xs">D</span>
                        <div>
                            <h4 class="font-bold text-[#000000] text-sm mb-1">Alkol</h4>
                            <p class="text-[#5D6D7E] text-xs font-light leading-relaxed">
                                Son <strong class="text-yellow-700">24 saat içinde alkol</strong> kullandınız mı? Alkol kan sulandırıcı etkisiyle işlem kalitesini olumsuz etkileyebilir.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- E: Diyabet -->
                <div class="p-5 bg-[#fef2f2]/60 rounded-2xl border border-red-100 shadow-sm hover:shadow-md transition-shadow fade-in-up" style="transition-delay:0.3s">
                    <div class="flex items-start gap-3">
                        <span class="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0 text-red-600 font-bold text-xs">E</span>
                        <div>
                            <h4 class="font-bold text-[#000000] text-sm mb-1">Diyabet</h4>
                            <p class="text-[#5D6D7E] text-xs font-light leading-relaxed">
                                Diyabet hastalığınız var mı? Diyabet hastalarının iyileşme süreci daha uzun olabilir. <strong class="text-red-600">Uygulamadan önce doktorunuza danışınız.</strong>
                            </p>
                        </div>
                    </div>
                </div>

                <!-- F: Epilepsi -->
                <div class="p-5 bg-[#fef2f2]/60 rounded-2xl border border-red-100 shadow-sm hover:shadow-md transition-shadow fade-in-up" style="transition-delay:0.35s">
                    <div class="flex items-start gap-3">
                        <span class="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0 text-red-600 font-bold text-xs">F</span>
                        <div>
                            <h4 class="font-bold text-[#000000] text-sm mb-1">Epilepsi (Sara)</h4>
                            <p class="text-[#5D6D7E] text-xs font-light leading-relaxed">
                                Epilepsi (sara) hastası mısınız? Bu durumda uygulama öncesinde mutlaka bildirilmesi gerekmektedir.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- G: Hemofili - full width -->
                <div class="p-5 bg-[#fef2f2]/60 rounded-2xl border border-red-100 shadow-sm hover:shadow-md transition-shadow md:col-span-2 fade-in-up" style="transition-delay:0.4s">
                    <div class="flex items-start gap-3">
                        <span class="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0 text-red-600 font-bold text-xs">G</span>
                        <div>
                            <h4 class="font-bold text-[#000000] text-sm mb-1">Hemofili</h4>
                            <p class="text-[#5D6D7E] text-xs font-light leading-relaxed">
                                Hemofili (kanın pıhtılaşmaması) hastası mısınız? Bu durum uygulamanın gerçekleştirilip gerçekleştirilemeyeceğini doğrudan etkiler. Uygulama öncesinde mutlaka bildiriniz.
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            <!-- Disclaimer -->
            <div class="mt-6 p-5 bg-[#000000] rounded-2xl fade-in-up" style="transition-delay:0.5s">
                <div class="flex items-start gap-3">
                    <i data-lucide="shield-check" class="w-5 h-5 text-[#ec4cc7] flex-shrink-0 mt-0.5"></i>
                    <p class="text-white/80 text-sm font-light leading-relaxed">
                        Yukarıdaki koşullardan herhangi birine sahip olmanız durumunda, uygulamayı yaptırmamanız tavsiye edilmiştir. Verilen tüm bilgilerin doğruluğundan ve sorumluluktan danışan kişi sorumludur.
                    </p>
                </div>
            </div>
        </div>

        <!-- CTA Section -->
        <div class="text-center fade-in-up" style="transition-delay:0.1s">
            <div class="inline-block bg-gradient-to-br from-[#f9def1] to-white rounded-3xl p-10 md:p-14 shadow-xl border border-[#ec4cc7]/20 max-w-2xl mx-auto">
                <div class="w-16 h-16 bg-[#ec4cc7] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <i data-lucide="calendar-check" class="w-7 h-7 text-white"></i>
                </div>
                <h3 class="text-2xl md:text-3xl font-bold text-[#000000] mb-3">Randevunuzu Alın</h3>
                <p class="text-[#5D6D7E] font-light mb-8 leading-relaxed">
                    Bu bilgileri okuduysanız ve hazırsanız, profesyonel ekibimizle buluşmak için hemen randevu alabilirsiniz.
                </p>
                <div class="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href="<?= htmlspecialchars($RANDEVU_URL) ?>" target="_blank" rel="noopener noreferrer"
                        class="inline-flex items-center gap-2 px-8 py-4 bg-[#ec4cc7] hover:bg-[#8E4D5B] text-white text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg">
                        <i data-lucide="calendar" class="w-4 h-4"></i>
                        Randevu Al
                    </a>
                    <a href="https://wa.me/905385296388" target="_blank" rel="noopener noreferrer"
                        class="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-[#f9def1] text-[#000000] text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-300 transform hover:-translate-y-0.5 shadow border border-[#f9def1]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#25D366" class="flex-shrink-0">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        WhatsApp ile Sor
                    </a>
                </div>
            </div>
        </div>

    </div>

    <!-- Back Banner -->
    <div class="bg-[#ec4cc7] py-6 text-center">
        <a href="/" class="inline-block text-white font-semibold uppercase tracking-widest text-sm hover:text-white/80 transition-colors">
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
