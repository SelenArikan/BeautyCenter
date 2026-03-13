<?php include 'header.php'; ?>

<main class="pt-28 pb-20 bg-[#F5F5F0]">
    <div class="container mx-auto px-4 md:px-8 max-w-4xl">
        
        <!-- Breadcrumb -->
        <div class="flex items-center gap-2 mb-8 text-sm text-[#2C3E50]/60">
            <a href="index.php" class="hover:text-[#A65E6E] transition-colors flex items-center gap-1">
                <i data-lucide="home" class="w-3.5 h-3.5"></i> Anasayfa
            </a>
            <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
            <span class="text-[#A65E6E] font-medium">Sıkça Sorulan Sorular</span>
        </div>

        <!-- Header -->
        <div class="text-center mb-16 fade-in-up" x-data="{ shown: false }" x-init="setTimeout(() => shown = true, 100)" :class="shown ? 'visible' : ''">
            <h1 class="text-4xl md:text-5xl font-bold mb-6 text-[#2C3E50]">Size Nasıl Yardımcı Olabiliriz?</h1>
            <p class="text-lg text-[#5D6D7E] max-w-2xl mx-auto font-light">
                Hizmetlerimiz, uygulamalarımız ve merak ettiğiniz diğer tüm detaylar hakkında en sık karşılaştığımız soruların cevaplarını burada bulabilirsiniz.
            </p>
        </div>

        <!-- FAQ Accordion -->
        <div class="space-y-4" x-data="{ active: null }">
            <?php
            $faqs = [
                [
                    "q" => "Lazer epilasyon işlemi acı verir mi?",
                    "a" => "Son teknoloji buz başlıklı lazer epilasyon cihazlarımız sayesinde işlem sırasında cilt yüzeyi soğutulduğu için acı veya sızı hissetmezsiniz. Danışanlarımıza son derece konforlu bir epilasyon deneyimi sunuyoruz."
                ],
                [
                    "q" => "Cilt bakımı işlemlerini ne sıklıkla yaptırmalıyım?",
                    "a" => "Cildin yenilenme döngüsü ortalama 28 gündür. Bu nedenle sağlıklı, canlı ve parlak bir cilt görünümünü korumak için ayda bir kez profesyonel cilt bakımı (örneğin Hydrafacial) yaptırmanızı öneriyoruz."
                ],
                [
                    "q" => "Güzellik merkeziniz hangi gün ve saatlerde açık?",
                    "a" => "Merkezimiz haftanın 6 günü, Pazartesi'den Cumartesi'ye kadar 09:00 - 19:30 saatleri arasında siz değerli misafirlerimize hizmet vermektedir. Pazar günleri merkezimiz kapalıdır."
                ],
                [
                    "q" => "Bölgesel incelme uygulamaları kaç seansta etki gösterir?",
                    "a" => "Bölgesel incelme (G5 masajı, lenf drenaj, heykeltıraş vb.) işlemlerinde etki kişiden kişiye farklılık gösterse de genellikle 3. seanstan itibaren gözle görülür sonuçlar alınmaya başlanır. Tam bir etki için uzmanlarımızın önereceği seans paketini (genelde 8-10 seans) tamamlamanızı tavsiye ederiz."
                ],
                [
                    "q" => "Kalıcı makyaj uygulamalarının kalıcılık süresi nedir?",
                    "a" => "Microblading, dudak renklendirme veya dipliner gibi kalıcı makyaj uygulamalarımızda cilt yapısına ve çevresel faktörlere bağlı olarak kalıcılık süresi ortalama 1 ile 3 yıl arasında değişmektedir. Renk uzmanlarımız size en uygun pigmenti seçerek doğal bir görünüm sağlar."
                ],
                [
                    "q" => "Randevu aldım fakat iptal etmek istiyorum, ne yapmalıyım?",
                    "a" => "Planlarınızda değişiklik olursa randevu iptali veya erteleme işlemleri için randevu saatinden en az 24 saat önce iletişim numaralarımızdan (WhatsApp veya direkt arama ile) bize ulaşmanız yeterlidir."
                ]
            ];
            
            foreach($faqs as $index => $faq): 
            ?>
            <div 
                class="bg-white rounded-2xl border transition-all duration-300 fade-in-up" 
                x-data="{ shown: false }" 
                x-init="setTimeout(() => shown = true, <?= $index * 100 + 200 ?>)" 
                :class="active === <?= $index ?> ? (shown ? 'visible border-[#A65E6E] shadow-md' : '') : (shown ? 'visible border-gray-100 shadow-sm hover:border-gray-200' : '')"
            >
                <button 
                    @click="active = active === <?= $index ?> ? null : <?= $index ?>" 
                    class="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                    <span class="text-lg font-medium transition-colors duration-300" :class="active === <?= $index ?> ? 'text-[#A65E6E]' : 'text-[#2C3E50]'">
                        <?= $faq['q'] ?>
                    </span>
                    <div class="ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 flex-shrink-0" :class="active === <?= $index ?> ? 'bg-[#F6D4DB] text-[#A65E6E]' : 'bg-gray-50 text-gray-400'">
                        <i data-lucide="chevron-down" class="w-5 h-5 transition-transform duration-300" :class="active === <?= $index ?> ? 'rotate-180' : ''"></i>
                    </div>
                </button>
                
                <div 
                    x-show="active === <?= $index ?>" 
                    x-collapse 
                    style="display: none;"
                >
                    <div class="px-6 pb-6 text-[#5D6D7E] leading-relaxed font-light">
                        <?= $faq['a'] ?>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>

        <!-- Extra Contact Info -->
        <div class="mt-16 bg-[#F6D4DB] p-8 rounded-3xl text-center fade-in-up" x-data="{ shown: false }" x-init="setTimeout(() => shown = true, 800)" :class="shown ? 'visible' : ''">
            <h3 class="text-xl font-bold text-[#2C3E50] mb-3">Aradığınız cevabı bulamadınız mı?</h3>
            <p class="text-[#5D6D7E] mb-6">Uzman ekibimiz size yardımcı olmaktan memnuniyet duyacaktır.</p>
            <a 
                href="https://wa.me/905385296388" 
                target="_blank" 
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-8 py-3 bg-[#A65E6E] hover:bg-[#8E4D5B] text-white font-semibold rounded-full transition-all transform hover:-translate-y-1 shadow-md"
            >
                Bizimle İletişime Geçin
            </a>
        </div>
    </div>
</main>

<!-- Alpine Collapse Plugin -->
<script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/collapse@3.x.x/dist/cdn.min.js"></script>

<!-- Initialize Lucide Icons again for newly injected icons if needed -->
<script>
    document.addEventListener('DOMContentLoaded', () => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    });
</script>

<?php include 'footer.php'; ?>
