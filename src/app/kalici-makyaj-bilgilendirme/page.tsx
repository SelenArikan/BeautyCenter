'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    FileText, HeartPulse, ShieldCheck, AlertTriangle,
    CheckCircle, Info, CalendarCheck, Calendar, ChevronRight
} from 'lucide-react';
import { RANDEVU_URL } from '@/data/services';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] },
    }),
};

const infoItems = [
    {
        no: 1,
        highlight: false,
        content: (
            <>
                Uygulanacak yöntem tarafıma{' '}
                <strong className="font-semibold text-[#ec4cc7]">Love Yourself by Anastasiya</strong>{' '}
                tarafından izah edildi. İşlem sırasında ve sonrasında çıkabilecek riskler ve komplikasyonlar konusunda bilgilendirildim.
            </>
        ),
    },
    {
        no: 2,
        highlight: false,
        content: (
            <>
                Uygulama sırasında biraz <strong className="font-semibold">acı duyabileceğimi</strong> öğrendim. Her bireyin farklı acı eşiği olduğunu öğrendim. Hissedilen acı, ağrı eşiğine göre olacaktır.
            </>
        ),
    },
    {
        no: 3,
        highlight: false,
        content: (
            <>
                Ender de olsa <strong className="font-semibold">şişme, az miktarda kanama, kızarıklık, hassasiyet</strong> ve çok ender olmakla birlikte <strong className="font-semibold">morarma</strong> gibi diğer ters etkiler konusunda bilgilendirildim.
            </>
        ),
    },
    {
        no: 4,
        highlight: false,
        content: (
            <>
                Renkte bir miktar <strong className="font-semibold">solma olabileceğini</strong> öğrendim. Cilt ne kadar yağlı ise, solma o denli fazla olur. Rengin ne kadar kalacağına dair herhangi bir garanti verilmemiştir.
            </>
        ),
    },
    {
        no: 5,
        highlight: true,
        content: (
            <>
                <p className="text-sm md:text-base leading-relaxed font-light text-[#000000] mb-3">
                    Kalıcı makyaj bir <strong className="font-semibold text-[#ec4cc7]">süreçtir</strong>. Rötuş uygulaması gerektirebilir. Renk rötuş uygulamalarının sayısı konusunda garanti verilmemiştir.
                </p>
                <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ec4cc7]/10 text-[#ec4cc7] text-xs font-semibold rounded-full">
                        <CheckCircle size={12} /> İlk rötuş ücretsiz
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#5D6D7E]/10 text-[#5D6D7E] text-xs font-semibold rounded-full">
                        <Info size={12} /> Sonraki rötuşlar ücretlidir
                    </span>
                </div>
            </>
        ),
    },
    {
        no: 6,
        highlight: false,
        content: (
            <>
                <strong className="font-semibold">Kaşların şekli, rengi ve konumu</strong> konusunda her türlü sorumluluk danışan tarafından üstlenilmektedir.
            </>
        ),
    },
    {
        no: 7,
        highlight: false,
        warning: true,
        content: (
            <div className="flex items-start gap-2">
                <AlertTriangle size={16} className="text-orange-500 flex-shrink-0 mt-0.5" />
                <span>
                    <strong className="font-semibold">Eyeliner işleminden sonra 8 saat araç kullanılmaması</strong> gerektiği bilgilendirilmiştir.
                </span>
            </div>
        ),
    },
    {
        no: 8,
        highlight: false,
        content: (
            <>
                İşlem tamamlandıktan sonra <strong className="font-semibold">evde yapılacak bakım</strong> konusunda gerekli bilgiler verilmiştir. Tüm bakım talimatlarına uymak önemlidir.
            </>
        ),
    },
    {
        no: 9,
        highlight: false,
        content: (
            <>
                Nadir olmakla birlikte <strong className="font-semibold">ikincil enfeksiyon</strong> görülebileceği öğrenilmiştir. Bunu önlemek için tüm ev bakım direktiflerine uyulması gerekmektedir.
            </>
        ),
    },
    {
        no: 10,
        highlight: true,
        content: (
            <>
                <p className="text-sm md:text-base leading-relaxed font-light text-[#000000] mb-3">
                    İlk işlem uygulandığı gün itibarıyla <strong className="font-semibold text-[#ec4cc7]">30 GÜN içerisinde</strong> bir rötuş ücretsiz yapılmaktadır. Sonrasında <strong className="font-semibold">90 ila 180 gün arasında</strong> bir adet tazeleme ücret karşılığında yaptırma hakkı bulunmaktadır.
                </p>
                <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white rounded-xl p-3 text-center border border-[#f9def1]">
                        <span className="block text-[#ec4cc7] font-bold text-lg">30 Gün</span>
                        <span className="block text-[#5D6D7E] text-xs font-light">Ücretsiz rötuş</span>
                    </div>
                    <div className="bg-white rounded-xl p-3 text-center border border-[#f9def1]">
                        <span className="block text-[#000000] font-bold text-lg">90–180 Gün</span>
                        <span className="block text-[#5D6D7E] text-xs font-light">Ücretli tazeleme</span>
                    </div>
                </div>
            </>
        ),
    },
    {
        no: 11,
        highlight: false,
        content: (
            <>
                <strong className="font-semibold">Yüz, kaş ve dudak fotoğraflarının</strong> işlem öncesi ve sonrası çekilmesine, sosyal medyada reklam amaçlı olarak kullanılmasına izin verildiğinde{' '}
                <strong className="font-semibold text-[#ec4cc7]">Love Yourself by Anastasiya</strong> ve işlem yapan uzman yetkilendirilmiş olmaktadır.
            </>
        ),
    },
];

const healthItems = [
    {
        code: 'A',
        variant: 'pink' as const,
        title: 'Dermotografi',
        desc: 'Cilt travmasına reaksiyon gösteren bir durumunuz var mı? (Cilt çizildiğinde kabarma veya şişme oluyor mu?)',
    },
    {
        code: 'B',
        variant: 'pink' as const,
        title: 'Sürekli İlaç Kullanımı',
        desc: 'Düzenli olarak kullandığınız bir ilaç var mı? Varsa lütfen belirtiniz.',
    },
    {
        code: 'C',
        variant: 'yellow' as const,
        title: 'Gebelik',
        desc: 'Hamile misiniz? Gebelik sırasında hormonlar değiştiğinden pigmentsel değişiklikler görülebilir.',
        warning: 'Gebelik sona erene kadar uygulama yapılmaması önerilir.',
    },
    {
        code: 'D',
        variant: 'yellow' as const,
        title: 'Alkol',
        desc: 'Son 24 saat içinde alkol kullandınız mı?',
        warning: 'Alkol kan sulandırıcı etkisiyle işlem kalitesini olumsuz etkileyebilir.',
    },
    {
        code: 'E',
        variant: 'red' as const,
        title: 'Diyabet',
        desc: 'Diyabet hastalığınız var mı? Diyabet hastalarının iyileşme süreci daha uzun olabilir.',
        warning: 'Uygulamadan önce doktorunuza danışınız.',
    },
    {
        code: 'F',
        variant: 'red' as const,
        title: 'Epilepsi (Sara)',
        desc: 'Epilepsi (sara) hastası mısınız? Bu durumda uygulama öncesinde mutlaka bildirilmesi gerekmektedir.',
    },
    {
        code: 'G',
        variant: 'red' as const,
        title: 'Hemofili',
        desc: 'Hemofili (kanın pıhtılaşmaması) hastası mısınız? Bu durum uygulamanın gerçekleştirilip gerçekleştirilemeyeceğini doğrudan etkiler.',
        warning: 'Uygulama öncesinde mutlaka bildiriniz.',
        fullWidth: true,
    },
];

const variantStyles = {
    pink: {
        card: 'bg-white border-[#f9def1]',
        badge: 'bg-[#ec4cc7]/10 text-[#ec4cc7]',
    },
    yellow: {
        card: 'bg-[#fff8e1]/60 border-yellow-200',
        badge: 'bg-yellow-100 text-yellow-700',
    },
    red: {
        card: 'bg-[#fef2f2]/60 border-red-100',
        badge: 'bg-red-50 text-red-600',
    },
};

export default function KaliciMakyajBilgilendirmePage() {
    return (
        <div className="min-h-screen bg-[#ffffff] text-[#000000] font-sans selection:bg-[#f9def1] selection:text-[#000000]">

            {/* Hero Banner */}
            <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
                <img
                    src="/assets/ciltbakimi/DSC07647.jpg"
                    alt="Kalıcı Makyaj Bilgilendirme"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-block mb-4 px-4 py-1.5 bg-[#ec4cc7]/30 backdrop-blur-sm border border-[#ec4cc7]/50 text-[#ec4cc7] text-xs font-semibold uppercase tracking-[0.2em] rounded-full"
                    >
                        Uygulama Öncesi
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight"
                    >
                        Kalıcı Makyaj
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-white/80 text-lg md:text-xl font-light"
                    >
                        Bilgilendirme &amp; Konsültasyon
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="flex items-center gap-2 text-white/60 text-sm mt-4"
                    >
                        <Link href="/" className="hover:text-[#ec4cc7] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                        </Link>
                        <ChevronRight size={14} />
                        <span className="text-white/60">Kalıcı Makyaj</span>
                        <ChevronRight size={14} />
                        <span className="text-white">Bilgilendirme</span>
                    </motion.div>
                </div>
            </div>

            {/* Intro Band */}
            <div className="bg-[#ec4cc7] py-5 text-center">
                <p className="text-white text-sm md:text-base font-medium tracking-wide px-4">
                    Aşağıdaki bilgilendirmeler, uygulamanızdan önce dikkatle okunması gereken önemli bilgilerdir.
                </p>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 md:px-8 max-w-5xl py-16 md:py-24">

                {/* Section 1: Bilgilendirme Maddeleri */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    className="mb-20"
                >
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-[#ec4cc7] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                            <FileText size={20} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-[#000000]">Bilgilendirme Maddeleri</h2>
                            <p className="text-[#5D6D7E] text-sm font-light mt-0.5">Uygulama öncesi okumanız gereken bilgiler</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {infoItems.map((item, idx) => (
                            <motion.div
                                key={item.no}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                custom={idx * 0.05}
                                viewport={{ once: true, margin: '-40px' }}
                                className={`flex gap-4 p-5 md:p-6 rounded-2xl shadow-sm border transition-shadow hover:shadow-md ${item.warning
                                    ? 'bg-[#fff3e0]/50 border-orange-200'
                                    : item.highlight
                                        ? 'bg-[#f9def1]/20 border-[#ec4cc7]/20'
                                        : 'bg-white border-[#f9def1]'
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${item.warning
                                    ? 'bg-orange-100'
                                    : item.highlight
                                        ? 'bg-[#ec4cc7] shadow-md'
                                        : 'bg-[#f9def1]'
                                    }`}>
                                    <span className={`font-bold text-sm ${item.warning ? 'text-orange-500' : item.highlight ? 'text-white' : 'text-[#ec4cc7]'}`}>
                                        {item.no}
                                    </span>
                                </div>
                                <div className="flex-1 text-sm md:text-base leading-relaxed font-light text-[#000000]">
                                    {item.content}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Divider */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative my-16"
                >
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-[#f9def1]" />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="px-6 py-2 bg-white text-[#ec4cc7] text-xs font-bold uppercase tracking-[0.25em] rounded-full border border-[#f9def1]">
                            Sağlık Sorgulaması
                        </span>
                    </div>
                </motion.div>

                {/* Section 2: Sağlık Soruları */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    className="mb-20"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-[#000000] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                            <HeartPulse size={20} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-[#000000]">Sağlık Soruları</h2>
                            <p className="text-[#5D6D7E] text-sm font-light mt-0.5">Uygulamadan önce belirtilmesi gereken durumlar</p>
                        </div>
                    </div>
                    <p className="text-[#5D6D7E] text-sm font-light mb-8 pl-16">
                        Aşağıdaki durumlardan herhangi birine sahipseniz, uygulamadan önce uzmanınızı mutlaka bilgilendirmeniz gerekmektedir.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {healthItems.map((item, idx) => {
                            const styles = variantStyles[item.variant];
                            return (
                                <motion.div
                                    key={item.code}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    custom={idx * 0.06}
                                    viewport={{ once: true, margin: '-40px' }}
                                    className={`p-5 rounded-2xl border shadow-sm hover:shadow-md transition-shadow ${styles.card} ${item.fullWidth ? 'md:col-span-2' : ''}`}
                                >
                                    <div className="flex items-start gap-3">
                                        <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs ${styles.badge}`}>
                                            {item.code}
                                        </span>
                                        <div>
                                            <h4 className="font-bold text-[#000000] text-sm mb-1">{item.title}</h4>
                                            <p className="text-[#5D6D7E] text-xs font-light leading-relaxed">{item.desc}</p>
                                            {item.warning && (
                                                <p className={`text-xs font-semibold mt-1.5 ${item.variant === 'yellow' ? 'text-yellow-700' : 'text-red-600'}`}>
                                                    {item.warning}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Disclaimer */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        custom={0.4}
                        viewport={{ once: true }}
                        className="mt-6 p-5 bg-[#000000] rounded-2xl"
                    >
                        <div className="flex items-start gap-3">
                            <ShieldCheck size={20} className="text-[#ec4cc7] flex-shrink-0 mt-0.5" />
                            <p className="text-white/80 text-sm font-light leading-relaxed">
                                Yukarıdaki koşullardan herhangi birine sahip olmanız durumunda, uygulamayı yaptırmamanız tavsiye edilmiştir. Verilen tüm bilgilerin doğruluğundan ve sorumluluktan danışan kişi sorumludur.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <div className="inline-block bg-gradient-to-br from-[#f9def1] to-white rounded-3xl p-10 md:p-14 shadow-xl border border-[#ec4cc7]/20 max-w-2xl mx-auto">
                        <div className="w-16 h-16 bg-[#ec4cc7] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <CalendarCheck size={28} className="text-white" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-[#000000] mb-3">Randevunuzu Alın</h3>
                        <p className="text-[#5D6D7E] font-light mb-8 leading-relaxed">
                            Bu bilgileri okuduysanız ve hazırsanız, profesyonel ekibimizle buluşmak için hemen randevu alabilirsiniz.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <a
                                href={RANDEVU_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-[#ec4cc7] hover:bg-[#8E4D5B] text-white text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg"
                            >
                                <Calendar size={16} />
                                Randevu Al
                            </a>
                            <a
                                href="https://wa.me/905385296388"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-[#f9def1] text-[#000000] text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-300 transform hover:-translate-y-0.5 shadow border border-[#f9def1]"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#25D366" className="flex-shrink-0">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                WhatsApp ile Sor
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Back Banner */}
            <div className="bg-[#ec4cc7] py-6 text-center">
                <Link href="/" className="text-white font-semibold uppercase tracking-widest text-sm hover:text-white/80 transition-colors">
                    ← Ana Sayfaya Dön
                </Link>
            </div>
        </div>
    );
}
