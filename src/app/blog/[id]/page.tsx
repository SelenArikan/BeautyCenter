'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, Calendar, Clock, ChevronRight, Share2, Link2, Mail } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { RANDEVU_URL, serviceCategories } from '@/data/services';

const blogPosts = [
    {
        id: 1,
        title: "Mevsimsel Cilt Bakımı: Işıltınızı Koruyun",
        subtitle: "Güzellik Sırları",
        excerpt: "Yaz sonrası cildinizi yenilemek ve kışın sert etkilerine hazırlamak için profesyonel sırlarımızı keşfedin.",
        intro: "Mevsim geçişleri, cildimizin en çok hassaslaştığı ve neme ihtiyaç duyduğu dönemlerdir. Sıcaklık dalgalanmaları ve nem oranındaki ani değişimler, cildin koruyucu bariyerini zayıflatarak kuruluğa, kızarıklığa ve cansız bir görünüme yol açabilir.",
        sections: [
            {
                title: "Günlük Bakım Rutini Neden Önemli?",
                content: "Hava sıcaklıkları düştükçe, cildimizdeki doğal yağ üretimi azalmaya başlar. Yazdan kalma güneş hasarlarıyla birleşen bu durum, cildin yenilenme sürecini yavaşlatır. Doğru bir rutinle cildinizi kışa hazırlamak, yaşlanma belirtilerini geciktirmenin en etkili yoludur.",
                checklist: [
                    { bold: "Nazik Temizleme:", text: "Cildinizi kurutmayan, yağ bazlı veya nazik köpük temizleyicilere geçiş yapın." },
                    { bold: "Yoğun Nemlendirme:", text: "Hyaluronik asit ve seramid içeren serumlarla cildinizi içeriden besleyin." },
                    { bold: "Güneş Koruması:", text: "Bulutlu havalarda bile UV ışınlarının etkili olduğunu unutmayın ve SPF kullanımına devam edin." }
                ]
            },
            {
                title: "Profesyonel Dokunuşun Gücü",
                content: "Evdeki rutinleriniz ne kadar iyi olursa olsun, profesyonel bir bakımın yerini tutamaz. Derinlemesine gözenek temizliği ve uzmanlar tarafından uygulanan yoğun maskeler, cildinizin alt katmanlarına kadar nüfuz ederek gerçek bir iyileşme sağlar. Anastasiya ekibi olarak biz, her mevsim geçişinde kişiye özel analizlerle cildinizin neye ihtiyacı olduğunu belirliyoruz."
            }
        ],
        quote: "Cilt bakımı bir lüks değil, kendinize olan saygınızın en güzel yansımasıdır.",
        secondaryImage: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=2070&auto=format&fit=crop",
        secondaryCaption: "Doğru ürün seçimi, mevsimsel geçişlerin anahtarıdır.",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop",
        category: "Cilt Bakımı",
        tags: ["#CiltBakımı", "#Güzellik", "#BakımRehberi"],
        date: "15 Şubat 2026",
        readTime: "6 Dakika Okuma",
        relatedServices: ["medikal-cilt-bakimi", "hydrafacial"]
    },
    {
        id: 2,
        title: "Minimalist Zarafet: 2026 Nail Art Trendleri",
        subtitle: "Trend Analizi",
        excerpt: "Sadelik ve şıklığın buluştuğu yeni sezon tırnak tasarımları ile tanışın.",
        intro: "2026 yılında nail art dünyasında minimalist ve zarif tasarımlar ön plana çıkıyor. Abartılı ve karmaşık desenlerin yerini, ince detaylar ve sofistike renk paletleri alıyor. İşte bu sezonun dikkat çeken trendleri.",
        sections: [
            {
                title: "Glazed Donut & Micro French",
                content: "Chrome efektli, yumuşak parıltılı Glazed Donut tırnaklar bu sezonun da tartışmasız favorisi. Özellikle nude tonlarıyla uygulandığında son derece şık bir sonuç ortaya çıkıyor. Micro French ise klasik French manikürün ultra ince versiyonu olarak karşımıza çıkıyor.",
                checklist: [
                    { bold: "Glazed Donut:", text: "Chrome efektli, yumuşak parıltılı tırnaklar için nude tonları tercih edin." },
                    { bold: "Micro French:", text: "Tırnak ucundaki ultra ince beyaz çizgi ile modern ve zarif bir görünüm elde edin." },
                    { bold: "Botanical Art:", text: "Küçük çiçek ve yaprak motifleriyle doğadan ilham alın." },
                    { bold: "Metalik Aksan:", text: "Altın ve gümüş ince çizgiler ile lüks bir dokunuş katın." }
                ]
            },
            {
                title: "Kişiselleştirme Trendi",
                content: "Bu sezonun en belirgin özelliklerinden biri de kişiselleştirme. Her parmakta farklı bir motif veya her elde farklı bir renk paleti kullanmak, bireyselliği ön plana çıkarıyor. Love Yourself stüdyomuzda uzman nail art sanatçılarımız, size özel tasarımlar oluşturur."
            }
        ],
        quote: "Tırnaklarınız, tarzınızın küçük ama güçlü bir yansımasıdır.",
        secondaryImage: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2070&auto=format&fit=crop",
        secondaryCaption: "Minimalist tasarımlar, bu sezonun en büyük trendi.",
        image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2070&auto=format&fit=crop",
        category: "Nail Art",
        tags: ["#NailArt", "#Trendler", "#Manikür"],
        date: "8 Şubat 2026",
        readTime: "4 Dakika Okuma",
        relatedServices: ["protez-tirnak", "manikur-pedikur"]
    },
    {
        id: 3,
        title: "Cilt Yenileme Rehberi: Hangi Bakım Size Uygun?",
        subtitle: "Uzman Rehberi",
        excerpt: "Hydrafacial'dan klasik bakıma, cildinizin ihtiyacı olan doğru yöntemi belirliyoruz.",
        intro: "Her cildin ihtiyaçları farklıdır ve doğru bakım yöntemini seçmek, etkili sonuçlar almanın ilk adımıdır. Peki hangi yöntem sizin için en uygun? İşte kapsamlı rehberimiz.",
        sections: [
            {
                title: "Popüler Cilt Bakım Yöntemleri",
                content: "Günümüzde birçok farklı cilt bakım yöntemi mevcuttur. Her birinin kendine özgü avantajları ve en uygun olduğu cilt tipleri vardır.",
                checklist: [
                    { bold: "Hydrafacial:", text: "Tüm cilt tiplerine uygun, anında parlaklık ve nem sağlayan 30-45 dakikalık ağrısız uygulama." },
                    { bold: "Kimyasal Peeling:", text: "Leke ve ton eşitsizliği için ideal. 2-3 günlük iyileşme süreci gerektirir." },
                    { bold: "Medikal Cilt Bakımı:", text: "Kapsamlı cilt analizi ile başlar, kişiye özel protokol hazırlanır." }
                ]
            },
            {
                title: "Doğru Bakımı Nasıl Seçersiniz?",
                content: "Cilt tipiniz, yaşınız ve cildinizin mevcut durumu, en uygun bakım yöntemini belirleyen faktörlerdir. Love Yourself stüdyomuzda uzmanlarımız, ücretsiz cilt analizi ile size en uygun bakım programını belirler. Her cildin hikayesi farklıdır ve biz bu hikayeyi dinleyerek en doğru bakımı sunmayı amaçlıyoruz."
            }
        ],
        quote: "Güzellik bakımı değil, kendinize yatırımdır.",
        secondaryImage: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2070&auto=format&fit=crop",
        secondaryCaption: "Profesyonel bakım, cildinizin gerçek potansiyelini ortaya çıkarır.",
        image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2070&auto=format&fit=crop",
        category: "Cilt Bakımı",
        tags: ["#CiltBakımı", "#Hydrafacial", "#Peeling"],
        date: "1 Şubat 2026",
        readTime: "6 Dakika Okuma",
        relatedServices: ["medikal-cilt-bakimi", "hydrafacial"]
    },
    {
        id: 4,
        title: "Medikal Manikürün Sağlık İçin Avantajları",
        subtitle: "Sağlık & Bakım",
        excerpt: "Sadece estetik değil, tırnak sağlığınız için neden medikal manikür tercih etmelisiniz?",
        intro: "Medikal manikür, standart manikürden çok daha fazlasıdır. Tırnak sağlığınızı korurken estetik açıdan da mükemmel sonuçlar sunar. Peki medikal manikür nedir ve neden tercih etmelisiniz?",
        sections: [
            {
                title: "Medikal Manikür Neden Farklı?",
                content: "Steril aletler ve medikal ürünler kullanılarak yapılan medikal manikür, tırnak ve tırnak eti sağlığını ön planda tutar. Standart manikürden farklı olarak, sağlık odaklı bir yaklaşım benimser.",
                checklist: [
                    { bold: "Hijyen:", text: "Steril ortamda tek kullanımlık aletlerle yapılan işlem, mantar ve enfeksiyon riskini minimuma indirir." },
                    { bold: "Tedavi:", text: "Tırnak eti sorunları ve batık tırnak problemlerine çözüm sunar." },
                    { bold: "Güçlendirme:", text: "Tırnakları güçlendirir ve sağlıklı büyümesini destekler." }
                ]
            },
            {
                title: "Kimler İçin Önerilir?",
                content: "Diyabet hastaları, tırnak mantarı sorunu yaşayanlar, hassas tırnak etine sahip kişiler ve tırnak sağlığına önem veren herkes medikal manikürden fayda görebilir. Love Yourself stüdyomuzda medikal manikür, deneyimli uzmanlarımız tarafından en yüksek hijyen standartlarında uygulanır."
            }
        ],
        quote: "Sağlıklı tırnaklar, güzel bir manikürün temelidir.",
        secondaryImage: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=2070&auto=format&fit=crop",
        secondaryCaption: "Medikal manikür, estetik ve sağlığı bir arada sunar.",
        image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=2070&auto=format&fit=crop",
        category: "Medikal Manikür",
        tags: ["#MedikalManikür", "#TırnakBakımı", "#Sağlık"],
        date: "25 Ocak 2026",
        readTime: "4 Dakika Okuma",
        relatedServices: ["protez-tirnak", "manikur-pedikur"]
    },
    {
        id: 5,
        title: "İpek Kirpik Bakım Rehberi: Uzun Ömürlü Kirpikler",
        subtitle: "Bakım İpuçları",
        excerpt: "İpek kirpiklerinizin daha uzun süre kalması ve sağlıklı görünmesi için uzman önerileri.",
        intro: "İpek kirpik uygulaması sonrası doğru bakım, kirpiklerinizin ömrünü önemli ölçüde uzatır. İşte kirpiklerinizin uzun süre güzel kalması için dikkat etmeniz gerekenler.",
        sections: [
            {
                title: "İlk 24 Saat ve Günlük Bakım",
                content: "İlk 24 saat kritik öneme sahiptir. Bu süre zarfında kirpiklerinizi ıslatmamalı, buhar ve sauna ortamlarından kaçınmalısınız.",
                checklist: [
                    { bold: "İlk Gün:", text: "Kirpiklerinizi ıslatmayın, buhar ve saunadan kaçının, göz makyajı yapmayın." },
                    { bold: "Günlük Bakım:", text: "Yağlı temizleyicilerden kaçının, kirpik fırçası ile günde 1-2 kez tarayın." },
                    { bold: "Dolgu:", text: "2-3 haftada bir dolgu yaptırarak kirpiklerinizi her zaman dolgun tutun." }
                ]
            },
            {
                title: "Uzman Uygulamasının Önemi",
                content: "Kaliteli malzeme ve uzman uygulama, kirpiklerinizin hem doğal hem de etkileyici görünmesini sağlar. Love Yourself stüdyomuzda premium kalite kirpikler ve uzman uygulamacılarımızla klasik, hacim ve mega hacim seçenekleri sunuyoruz."
            }
        ],
        quote: "Güzel kirpikler, bakımlı gözlerin en doğal çerçevesidir.",
        secondaryImage: "https://images.unsplash.com/photo-1583001809873-a128495da465?q=80&w=2070&auto=format&fit=crop",
        secondaryCaption: "Profesyonel uygulama ile doğal ve etkileyici kirpikler.",
        image: "https://images.unsplash.com/photo-1583001809873-a128495da465?q=80&w=2070&auto=format&fit=crop",
        category: "Wellness",
        tags: ["#İpekKirpik", "#KirpikBakımı", "#Güzellik"],
        date: "18 Ocak 2026",
        readTime: "5 Dakika Okuma",
        relatedServices: ["ipek-kirpik", "kirpik-lifting"]
    },
    {
        id: 6,
        title: "Kalıcı Makyaj: Doğal Güzelliğinizi Vurgulayın",
        subtitle: "Kalıcı Güzellik",
        excerpt: "Kalıcı makyaj hakkında bilmeniz gereken her şey: teknikler, bakım ve beklentiler.",
        intro: "Kalıcı makyaj, günlük makyaj rutininizi kısaltırken doğal güzelliğinizi vurgular. Sabah saatlerinde kazandığınız zaman ve her an bakımlı görünme rahatlığı, kalıcı makyajın en büyük avantajlarıdır.",
        sections: [
            {
                title: "Kalıcı Makyaj Teknikleri",
                content: "Her uygulama alanı için farklı teknikler mevcuttur. Yüz yapınıza ve isteklerinize göre en uygun teknik belirlenir.",
                checklist: [
                    { bold: "Kalıcı Dudak:", text: "Aquarelle tekniği ile dudaklarınızın doğal rengini ve şeklini vurgular." },
                    { bold: "Microblading:", text: "Kıl kıl tekniği ile doğal görünümlü, dolgun kaşlar elde edin." },
                    { bold: "Kalıcı Eyeliner:", text: "İnce veya kalın çizgi seçenekleriyle gözlerinize derinlik katın." }
                ]
            },
            {
                title: "İşlem Sonrası Bakım",
                content: "İlk hafta işlem bölgesini ıslatmamalı, kabuklanma sürecinde koparma yapmamalısınız. Güneşten koruma şarttır. 4-6 hafta sonra yapılacak rötuş seansı ile sonuç mükemmelleştirilir. Anastasiya'nın uzman dokunuşlarıyla en doğal sonuçları elde edin."
            }
        ],
        quote: "Kalıcı makyaj, her sabah aynaya baktığınızda gülümsemenizi sağlar.",
        secondaryImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2069&auto=format&fit=crop",
        secondaryCaption: "Doğal görünüm, kalıcı makyajın altın kuralıdır.",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2069&auto=format&fit=crop",
        category: "Wellness",
        tags: ["#KalıcıMakyaj", "#Microblading", "#Güzellik"],
        date: "10 Ocak 2026",
        readTime: "5 Dakika Okuma",
        relatedServices: ["kalici-dudak", "kalici-kas"]
    }
];

function getRelatedServiceData(slugs: string[]) {
    const results: { name: string; slug: string; image: string; details: string }[] = [];
    for (const cat of serviceCategories) {
        for (const srv of cat.services) {
            if (slugs.includes(srv.slug)) {
                results.push({ name: srv.name, slug: srv.slug, image: srv.image, details: srv.details });
            }
        }
    }
    return results;
}

export default function BlogDetailPage() {
    const params = useParams();
    const id = parseInt(params.id as string);
    const postIndex = blogPosts.findIndex(p => p.id === id);
    const post = postIndex >= 0 ? blogPosts[postIndex] : null;
    const [email, setEmail] = useState("");

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F5F5F0]">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-[#2C3E50] mb-4">Yazı Bulunamadı</h1>
                    <Link href="/blog" className="text-[#A65E6E] font-semibold hover:underline">
                        Blog&apos;a Dön
                    </Link>
                </div>
            </div>
        );
    }

    const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
    const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;
    const relatedServices = getRelatedServiceData(post.relatedServices);

    return (
        <div className="min-h-screen bg-[#F5F5F0] text-[#2C3E50] antialiased" style={{ fontFamily: "'Georgia', 'Newsreader', serif" }}>

            {/* Top Navigation */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#A65E6E]/10">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 relative z-[60] group">
                        <img src="/assets/logo/logo.svg" alt="Love Yourself By Anastasiya" className="h-10 md:h-12 w-auto transition-transform duration-300 hover:scale-105" />
                    </Link>
                    <nav className="hidden md:flex items-center gap-10">
                        <Link href="/" className="text-sm font-medium hover:text-[#A65E6E] transition-colors">Ana Sayfa</Link>
                        <Link href="/#services" className="text-sm font-medium hover:text-[#A65E6E] transition-colors">Hizmetler</Link>
                        <Link href="/blog" className="text-sm font-medium text-[#A65E6E] underline underline-offset-8">Blog</Link>
                        <a href="https://wa.me/905385296388" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-[#A65E6E] transition-colors">İletişim</a>
                    </nav>
                    <a href={RANDEVU_URL} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-block bg-[#A65E6E] text-white px-8 py-3 rounded-full text-sm font-bold tracking-wider hover:bg-[#8E4D5B] transition-all shadow-lg shadow-[#A65E6E]/20">
                        RANDEVU AL
                    </a>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-12">

                {/* Breadcrumbs */}
                <motion.nav
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-sm text-[#5D6D7E] mb-8"
                >
                    <Link href="/" className="hover:text-[#A65E6E] transition-colors">Ana Sayfa</Link>
                    <ChevronRight size={12} />
                    <Link href="/blog" className="hover:text-[#A65E6E] transition-colors">Blog</Link>
                    <ChevronRight size={12} />
                    <span className="text-[#2C3E50]">{post.category}</span>
                </motion.nav>

                {/* Article Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center max-w-3xl mx-auto"
                >
                    <div className="inline-block px-4 py-1 bg-[#A65E6E]/10 text-[#A65E6E] text-xs font-bold rounded-full mb-6 uppercase tracking-widest">
                        {post.subtitle}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-8">{post.title}</h1>
                    <div className="flex items-center justify-center gap-6 text-sm italic text-[#5D6D7E]">
                        <div className="flex items-center gap-2">
                            <Calendar size={14} />
                            <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={14} />
                            <span>{post.readTime}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden mb-16 shadow-2xl"
                >
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Article Content */}
                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="lg:col-span-8 text-lg leading-relaxed text-[#5D6D7E]"
                    >
                        {/* Intro with Drop Cap */}
                        <p className="mb-8 italic text-xl leading-relaxed" style={{ textIndent: 0 }}>
                            <span className="text-7xl font-bold text-[#A65E6E] mr-3 float-left leading-[0.8] mt-1">
                                {post.intro.charAt(0)}
                            </span>
                            {post.intro.slice(1)}
                        </p>

                        {/* Sections */}
                        {post.sections.map((section, i) => (
                            <div key={i}>
                                <h2 className="text-2xl md:text-3xl font-bold text-[#2C3E50] mt-12 mb-6">{section.title}</h2>
                                <p className="mb-6">{section.content}</p>

                                {section.checklist && (
                                    <ul className="space-y-4 mb-8 list-none">
                                        {section.checklist.map((item, j) => (
                                            <li key={j} className="flex gap-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A65E6E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 flex-shrink-0">
                                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                                                </svg>
                                                <span><strong className="text-[#2C3E50]">{item.bold}</strong> {item.text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {/* Insert secondary image after first section */}
                                {i === 0 && (
                                    <figure className="my-12">
                                        <img
                                            src={post.secondaryImage}
                                            alt={post.secondaryCaption}
                                            className="rounded-2xl w-full h-[400px] object-cover shadow-lg mb-4"
                                        />
                                        <figcaption className="text-sm text-center italic text-[#5D6D7E]/70">{post.secondaryCaption}</figcaption>
                                    </figure>
                                )}
                            </div>
                        ))}

                        {/* Quote */}
                        <blockquote className="border-l-4 border-[#A65E6E] pl-8 my-10 py-2 italic text-2xl font-light text-[#2C3E50]">
                            &ldquo;{post.quote}&rdquo;
                        </blockquote>

                        {/* Share Section */}
                        <div className="mt-16 pt-8 border-t border-[#2C3E50]/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-bold uppercase tracking-widest text-[#5D6D7E]/50">Paylaş</span>
                                <div className="flex gap-3">
                                    <button className="w-10 h-10 rounded-full bg-white border border-[#2C3E50]/10 flex items-center justify-center text-[#5D6D7E] hover:text-[#A65E6E] hover:border-[#A65E6E] transition-all shadow-sm">
                                        <Share2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => navigator.clipboard?.writeText(window.location.href)}
                                        className="w-10 h-10 rounded-full bg-white border border-[#2C3E50]/10 flex items-center justify-center text-[#5D6D7E] hover:text-[#A65E6E] hover:border-[#A65E6E] transition-all shadow-sm"
                                    >
                                        <Link2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                {post.tags.map((tag, i) => (
                                    <span key={i} className="px-3 py-1 bg-[#F5F5F0] border border-[#2C3E50]/5 rounded-full text-xs font-medium text-[#5D6D7E]">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4">
                        <div className="sticky top-32 space-y-8">

                            {/* Related Services */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="bg-white border border-[#A65E6E]/10 rounded-2xl p-8 shadow-sm"
                            >
                                <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Sparkles size={18} className="text-[#A65E6E]" />
                                    İlgili Hizmetler
                                </h4>
                                <div className="space-y-6">
                                    {relatedServices.map((srv, i) => (
                                        <div key={i} className="group">
                                            <div className="relative h-40 rounded-xl overflow-hidden mb-3">
                                                <img src={srv.image} alt={srv.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            </div>
                                            <h5 className="font-bold text-lg mb-2">{srv.name}</h5>
                                            <p className="text-sm text-[#5D6D7E] mb-4 line-clamp-2">{srv.details}</p>
                                            <Link
                                                href={`/hizmet/${srv.slug}`}
                                                className="block w-full py-2 border border-[#A65E6E] text-[#A65E6E] rounded-full text-sm font-bold text-center hover:bg-[#A65E6E] hover:text-white transition-all"
                                            >
                                                DETAYLI BİLGİ
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Newsletter */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                                className="bg-[#A65E6E]/5 rounded-2xl p-8 border border-[#A65E6E]/20"
                            >
                                <h4 className="text-xl font-bold mb-3">Güzellikten Haberdar Olun</h4>
                                <p className="text-sm text-[#5D6D7E] mb-6">En yeni bakım trendleri ve size özel teklifler için bültenimize abone olun.</p>
                                <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                                    <input
                                        className="w-full px-4 py-3 rounded-xl border border-[#2C3E50]/10 focus:ring-2 focus:ring-[#A65E6E] focus:border-[#A65E6E] text-sm outline-none transition-all"
                                        placeholder="E-posta adresiniz"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <button className="w-full py-3 bg-[#A65E6E] text-white rounded-xl font-bold text-sm tracking-wide hover:bg-[#8E4D5B] transition-all">
                                        ABONE OL
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                    </aside>
                </div>

                {/* Next/Previous Article Navigation */}
                <section className="mt-24 pt-12 border-t border-[#2C3E50]/10">
                    <div className="flex flex-col md:flex-row gap-12 items-center justify-between">
                        {prevPost ? (
                            <Link href={`/blog/${prevPost.id}`} className="group flex items-center gap-6 max-w-sm">
                                <ArrowLeft size={32} className="text-[#5D6D7E]/30 group-hover:text-[#A65E6E] transition-colors flex-shrink-0" />
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#5D6D7E]/50">Önceki Yazı</span>
                                    <h4 className="font-bold text-lg leading-tight group-hover:text-[#A65E6E] transition-colors">{prevPost.title}</h4>
                                </div>
                            </Link>
                        ) : <div />}

                        {nextPost ? (
                            <Link href={`/blog/${nextPost.id}`} className="group flex items-center gap-6 max-w-sm text-right">
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#5D6D7E]/50">Sonraki Yazı</span>
                                    <h4 className="font-bold text-lg leading-tight group-hover:text-[#A65E6E] transition-colors">{nextPost.title}</h4>
                                </div>
                                <ArrowRight size={32} className="text-[#5D6D7E]/30 group-hover:text-[#A65E6E] transition-colors flex-shrink-0" />
                            </Link>
                        ) : <div />}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-[#A65E6E]/10 py-16 mt-20">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="flex justify-center mb-6">
                        <img src="/assets/logo/logo.svg" alt="Love Yourself By Anastasiya" className="h-16 md:h-20 w-auto transition-transform duration-300 hover:scale-105" />
                    </div>
                    <p className="text-[#5D6D7E] max-w-md mx-auto mb-8 text-sm italic">
                        &ldquo;Kendinizi sevmeniz için buradayız. Her gün bir yeni başlangıç, her bakım bir öz sevgi eylemidir.&rdquo;
                    </p>
                    <div className="flex justify-center gap-8 text-sm font-medium mb-12">
                        <a href="https://www.instagram.com/loveyourselfbyanastasiya/" target="_blank" rel="noopener noreferrer" className="hover:text-[#A65E6E] transition-colors">Instagram</a>
                        <a href="https://wa.me/905385296388" target="_blank" rel="noopener noreferrer" className="hover:text-[#A65E6E] transition-colors">WhatsApp</a>
                    </div>
                    <p className="text-xs text-[#5D6D7E]/40">© 2026 Love Yourself by Anastasiya. Tüm hakları saklıdır.</p>
                </div>
            </footer>
        </div>
    );
}
