'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Mail, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { RANDEVU_URL } from '@/data/services';

const blogPosts = [
    {
        id: 1,
        title: "Mevsimsel Cilt Bakımı: Işıltınızı Koruyun",
        excerpt: "Yaz sonrası cildinizi yenilemek ve kışın sert etkilerine hazırlamak için profesyonel sırlarımızı keşfedin. Işıltılı bir cilt, doğru zamanlamayla başlar.",
        content: `Mevsim geçişleri cildiniz için en zorlu dönemlerdir. Yaz boyunca güneşe maruz kalan cildiniz, sonbaharda nem kaybı ve kuruluk ile karşı karşıya kalır.

**Sonbahar Bakım Rutini:**
- Güneş sonrası onarıcı serumlar kullanın
- Haftalık eksfoliasyon ile ölü derilerden arının
- Hyaluronik asit içeren nemlendiricilere geçiş yapın
- SPF kullanmaya devam edin

**Kış Hazırlığı:**
Kışın soğuk hava ve kapalı mekânlardaki kuru hava, cildinizi dehidrate eder. Zengin içerikli nemlendiriciler ve koruyucu bariyerler kullanarak cildinizi koruyabilirsiniz.

Profesyonel Hydrafacial seansları ile mevsim geçişlerinde cildinizin ihtiyaç duyduğu derinlemesine bakımı sağlayabilirsiniz.`,
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop",
        category: "Cilt Bakımı",
        date: "15 Şubat 2026",
        featured: true
    },
    {
        id: 2,
        title: "Minimalist Zarafet: 2026 Nail Art Trendleri",
        excerpt: "Sadelik ve şıklığın buluştuğu yeni sezon tırnak tasarımları ile tanışın. Bu yılın en trend nail art stillerini keşfedin.",
        content: `2026 yılında nail art dünyasında minimalist ve zarif tasarımlar ön plana çıkıyor. İşte bu sezonun en popüler trendleri:

**1. Glazed Donut Tırnaklar**
Chrome efektli, yumuşak parıltılı tırnaklar bu sezonun da favorisi olmaya devam ediyor.

**2. Micro French**
Klasik French manikürün ultra ince versiyonu, zarif ve modern bir görünüm sunuyor.

**3. Botanical Art**
Doğadan ilham alan küçük çiçek ve yaprak motifleri, tırnaklarınıza sanatsal bir dokunuş katıyor.

**4. Metalik Aksan**
Altın ve gümüş ince çizgiler ile tırnaklarınıza lüks bir hava katın.

Love Yourself stüdyomuzda uzman nail art sanatçılarımız, hayalinizdeki tasarımları gerçeğe dönüştürür.`,
        image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2070&auto=format&fit=crop",
        category: "Nail Art",
        date: "8 Şubat 2026"
    },
    {
        id: 3,
        title: "Cilt Yenileme Rehberi: Hangi Bakım Size Uygun?",
        excerpt: "Hydrafacial'dan klasik bakıma, cildinizin ihtiyacı olan doğru yöntemi belirliyoruz.",
        content: `Her cildin ihtiyaçları farklıdır. Doğru bakım yöntemini seçmek, etkili sonuçlar almanın ilk adımıdır.

**Hydrafacial**
- Tüm cilt tiplerine uygun
- Anında parlaklık ve nem
- Ağrısız, kızarıklık bırakmaz
- 30-45 dakika sürer

**Kimyasal Peeling**
- Leke ve ton eşitsizliği için ideal
- İnce çizgileri azaltır
- 2-3 günlük iyileşme süreci
- Mevsimsel olarak uygulanmalı

**Medikal Cilt Bakımı**
- Kapsamlı cilt analizi ile başlar
- Kişiye özel protokol
- Derin temizlik + serum + maske
- Düzenli seanslarla kalıcı sonuç

Uzmanlarımız, ücretsiz cilt analizi ile size en uygun bakım programını belirler.`,
        image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2070&auto=format&fit=crop",
        category: "Cilt Bakımı",
        date: "1 Şubat 2026"
    },
    {
        id: 4,
        title: "Medikal Manikürün Sağlık İçin Avantajları",
        excerpt: "Sadece estetik değil, tırnak sağlığınız için neden medikal manikür tercih etmelisiniz?",
        content: `Medikal manikür, standart manikürden çok daha fazlasıdır. Tırnak sağlığınızı korurken estetik açıdan da mükemmel sonuçlar sunar.

**Medikal Manikür Nedir?**
Steril aletler ve medikal ürünler kullanılarak yapılan, tırnak ve tırnak eti sağlığını ön planda tutan manikür uygulamasıdır.

**Avantajları:**
- Mantar ve enfeksiyon riski minimuma iner
- Tırnak eti sorunlarını tedavi eder
- Batık tırnak problemlerini çözer
- Tırnakları güçlendirir
- Hijyenik ve güvenli ortamda uygulanır

**Kimler İçin Önerilir?**
- Diyabet hastaları
- Tırnak mantarı sorunu yaşayanlar
- Hassas tırnak etine sahip kişiler
- Tırnak sağlığına önem veren herkes`,
        image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=2070&auto=format&fit=crop",
        category: "Medikal Manikür",
        date: "25 Ocak 2026"
    },
    {
        id: 5,
        title: "İpek Kirpik Bakım Rehberi: Uzun Ömürlü Kirpikler",
        excerpt: "İpek kirpiklerinizin daha uzun süre kalması ve sağlıklı görünmesi için uzman önerileri.",
        content: `İpek kirpik uygulaması sonrası doğru bakım, kirpiklerinizin ömrünü önemli ölçüde uzatır.

**İlk 24 Saat:**
- Kirpiklerinizi ıslatmayın
- Buhar ve sauna'dan kaçının
- Göz makyajı yapmayın
- Kirpiklere dokunmayın

**Günlük Bakım:**
- Yağlı temizleyicilerden kaçının
- Kirpik fırçası ile günde 1-2 kez tarayın
- Yüzüstü yatmamaya özen gösterin
- Maskara kullanmayın

**Dolgu Zamanlaması:**
- 2-3 haftada bir dolgu yaptırın
- Dolgu seansı yaklaşık 45 dakika sürer
- Düzenli dolgu ile kirpikleriniz her zaman dolgun kalır

Stüdyomuzda premium kalite kirpikler ve uzman uygulamacılarımızla doğal ve etkileyici kirpiklere kavuşun.`,
        image: "https://images.unsplash.com/photo-1583001809873-a128495da465?q=80&w=2070&auto=format&fit=crop",
        category: "Wellness",
        date: "18 Ocak 2026"
    },
    {
        id: 6,
        title: "Kalıcı Makyaj: Doğal Güzelliğinizi Vurgulayın",
        excerpt: "Kalıcı makyaj hakkında bilmeniz gereken her şey: teknikler, bakım ve beklentiler.",
        content: `Kalıcı makyaj, günlük makyaj rutininizi kısaltırken doğal güzelliğinizi vurgular. İşte bilmeniz gerekenler:

**Kalıcı Dudak**
Dudaklarınızın doğal rengini ve şeklini vurgular. Aquarelle tekniği ile en doğal sonuçlar elde edilir.

**Kalıcı Kaş (Microblading)**
Kıl kıl tekniği ile doğal görünümlü, dolgun kaşlar. Ombre tekniği ile yumuşak geçişli kaş tasarımları.

**Kalıcı Eyeliner**
Gözlerinize derinlik katan ince veya kalın eyeliner seçenekleri.

**İşlem Sonrası Bakım:**
- İlk hafta işlem bölgesini ıslatmayın
- Kabuklanma sürecinde koparma yapmayın
- Güneşten koruyun
- 4-6 hafta sonra rötuş seansı

Anastasiya'nın uzman dokunuşlarıyla en doğal sonuçları elde edin.`,
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2069&auto=format&fit=crop",
        category: "Wellness",
        date: "10 Ocak 2026"
    }
];

const categories = ["Tümü", "Cilt Bakımı", "Nail Art", "Medikal Manikür", "Wellness"];

export default function BlogPage() {
    const [activeCategory, setActiveCategory] = useState("Tümü");
    const [email, setEmail] = useState("");

    const filteredPosts = activeCategory === "Tümü"
        ? blogPosts
        : blogPosts.filter(p => p.category === activeCategory);

    const featuredPost = blogPosts.find(p => p.featured);
    const regularPosts = filteredPosts.filter(p => !p.featured || activeCategory !== "Tümü");

    return (
        <div className="min-h-screen bg-[#F5F5F0] text-[#2C3E50]" style={{ fontFamily: "'Georgia', 'Newsreader', serif" }}>

            {/* Top Navigation */}
            <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#A65E6E]/10">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 relative z-[60] group">
                        <img src="/assets/logo/logo.svg" alt="Love Yourself By Anastasiya" className="h-10 md:h-12 w-auto transition-transform duration-300 hover:scale-105" />
                    </Link>
                    <nav className="hidden md:flex items-center gap-10">
                        <Link href="/" className="text-sm font-semibold hover:text-[#A65E6E] transition-colors uppercase tracking-wider">
                            Ana Sayfa
                        </Link>
                        <Link href="/#services" className="text-sm font-semibold hover:text-[#A65E6E] transition-colors uppercase tracking-wider">
                            Hizmetler
                        </Link>
                        <span className="text-sm font-semibold text-[#A65E6E] uppercase tracking-wider cursor-default">
                            Blog
                        </span>
                        <a href="https://wa.me/905385296388" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold hover:text-[#A65E6E] transition-colors uppercase tracking-wider">
                            İletişim
                        </a>
                    </nav>
                    <a
                        href={RANDEVU_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#A65E6E] text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#8E4D5B] transition-all shadow-lg shadow-[#A65E6E]/20"
                    >
                        RANDEVU AL
                    </a>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12">

                {/* Page Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center md:text-left"
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-[#2C3E50] mb-4">Güzellik Blogu</h2>
                    <p className="text-lg text-[#5D6D7E] max-w-2xl">
                        En yeni güzellik trendleri, profesyonel cilt bakım ipuçları ve kendinize ayıracağınız o özel zaman için ilham verici rehberler.
                    </p>
                </motion.div>

                {/* Featured Post */}
                {featuredPost && activeCategory === "Tümü" && (
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="mb-20"
                    >
                        <div className="relative group overflow-hidden rounded-2xl bg-white shadow-xl flex flex-col lg:flex-row items-center border border-[#A65E6E]/5">
                            <div className="w-full lg:w-3/5 h-[400px] lg:h-[550px] overflow-hidden">
                                <img
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    src={featuredPost.image}
                                    alt={featuredPost.title}
                                />
                            </div>
                            <div className="w-full lg:w-2/5 p-8 lg:p-14 flex flex-col justify-center gap-6">
                                <span className="text-[#A65E6E] font-bold tracking-[0.2em] text-xs uppercase">Öne Çıkan Yazı</span>
                                <h3 className="text-3xl md:text-4xl font-bold leading-tight">{featuredPost.title}</h3>
                                <p className="text-[#5D6D7E] text-lg leading-relaxed">
                                    {featuredPost.excerpt}
                                </p>
                                <div>
                                    <Link
                                        href={`/blog/${featuredPost.id}`}
                                        className="inline-block bg-[#A65E6E] text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:shadow-xl hover:-translate-y-1 transition-all"
                                    >
                                        Devamını Oku
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                )}

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-12 border-b border-[#A65E6E]/10 flex flex-wrap gap-6 md:gap-12 pb-4 overflow-x-auto"
                >
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`text-sm font-bold uppercase tracking-widest pb-4 transition-colors whitespace-nowrap ${activeCategory === cat
                                ? 'border-b-2 border-[#A65E6E] text-[#A65E6E]'
                                : 'text-[#5D6D7E]/60 hover:text-[#A65E6E]'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Blog Posts Grid */}
                <section className="mb-24">
                    <h4 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        Son Yazılar
                        <span className="h-px bg-[#A65E6E]/20 grow"></span>
                    </h4>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                        >
                            {regularPosts.map((post, index) => (
                                <motion.article
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="flex flex-col gap-5 group"
                                >
                                    <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gray-200">
                                        <img
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            src={post.image}
                                            alt={post.title}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[#A65E6E] text-[10px] font-bold uppercase tracking-widest">{post.category}</span>
                                            <span className="text-[#5D6D7E]/50 text-xs">{post.date}</span>
                                        </div>
                                        <h5 className="text-2xl font-bold leading-snug group-hover:text-[#A65E6E] transition-colors">
                                            {post.title}
                                        </h5>
                                        <p className="text-[#5D6D7E] line-clamp-2">{post.excerpt}</p>
                                        <Link
                                            href={`/blog/${post.id}`}
                                            className="inline-flex items-center gap-2 text-[#A65E6E] text-xs font-bold uppercase tracking-widest mt-2 hover:gap-3 transition-all"
                                        >
                                            Devamını Oku <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </motion.article>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {regularPosts.length === 0 && (
                        <div className="text-center py-20 text-[#5D6D7E]">
                            <p className="text-lg">Bu kategoride henüz yazı bulunmuyor.</p>
                        </div>
                    )}
                </section>

                {/* Newsletter */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-[#A65E6E]/5 rounded-2xl p-8 md:p-16 flex flex-col items-center text-center gap-8 border border-[#A65E6E]/10 mb-12"
                >
                    <div className="max-w-xl">
                        <Mail size={40} className="text-[#A65E6E] mx-auto mb-4" />
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Güzellik İpuçlarını Kaçırmayın</h2>
                        <p className="text-[#5D6D7E]">Haftalık bültenimize abone olun, yeni trendler ve özel kampanyalardan ilk siz haberdar olun.</p>
                    </div>
                    <form className="w-full max-w-md flex flex-col md:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                        <input
                            className="flex-grow bg-white border-none rounded-full px-6 py-4 focus:ring-2 focus:ring-[#A65E6E] transition-all text-sm outline-none"
                            placeholder="E-posta adresiniz"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            className="bg-[#A65E6E] text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#8E4D5B] transition-all whitespace-nowrap"
                            type="submit"
                        >
                            ABONE OL
                        </button>
                    </form>
                    <p className="text-[10px] text-[#5D6D7E]/60 uppercase tracking-widest">Verileriniz KVKK kapsamında korunmaktadır.</p>
                </motion.section>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-[#A65E6E]/10 py-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/assets/logo/logo.svg" alt="Love Yourself By Anastasiya" className="h-8 md:h-10 w-auto transition-transform duration-300 hover:scale-105" />
                    </Link>
                    <div className="flex gap-4">
                        <a href="https://www.instagram.com/loveyourselfbyanastasiya/" target="_blank" rel="noopener noreferrer" className="text-[#5D6D7E]/40 hover:text-[#A65E6E] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                        </a>
                        <a href="https://wa.me/905385296388" target="_blank" rel="noopener noreferrer" className="text-[#5D6D7E]/40 hover:text-[#A65E6E] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                        </a>
                    </div>
                    <p className="text-[#5D6D7E]/40 text-xs font-medium uppercase tracking-[0.2em]">© 2026 LOVE YOURSELF BY ANASTASIYA</p>
                </div>
            </footer>
        </div>
    );
}
