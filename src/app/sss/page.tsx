'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

const faqs = [
    {
        question: "Lazer epilasyon işlemi acı verir mi?",
        answer: "Son teknoloji buz başlıklı lazer epilasyon cihazlarımız sayesinde işlem sırasında cilt yüzeyi soğutulduğu için acı veya sızı hissetmezsiniz. Danışanlarımıza son derece konforlu bir epilasyon deneyimi sunuyoruz."
    },
    {
        question: "Cilt bakımı işlemlerini ne sıklıkla yaptırmalıyım?",
        answer: "Cildin yenilenme döngüsü ortalama 28 gündür. Bu nedenle sağlıklı, canlı ve parlak bir cilt görünümünü korumak için ayda bir kez profesyonel cilt bakımı (örneğin Hydrafacial) yaptırmanızı öneriyoruz."
    },
    {
        question: "Güzellik merkeziniz hangi gün ve saatlerde açık?",
        answer: "Merkezimiz haftanın 6 günü, Pazartesi'den Cumartesi'ye kadar 09:00 - 19:30 saatleri arasında siz değerli misafirlerimize hizmet vermektedir. Pazar günleri merkezimiz kapalıdır."
    },
    {
        question: "Bölgesel incelme uygulamaları kaç seansta etki gösterir?",
        answer: "Bölgesel incelme (G5 masajı, lenf drenaj, heykeltıraş vb.) işlemlerinde etki kişiden kişiye farklılık gösterse de genellikle 3. seanstan itibaren gözle görülür sonuçlar alınmaya başlanır. Tam bir etki için uzmanlarımızın önereceği seans paketini (genelde 8-10 seans) tamamlamanızı tavsiye ederiz."
    },
    {
        question: "Kalıcı makyaj uygulamalarının kalıcılık süresi nedir?",
        answer: "Microblading, dudak renklendirme veya dipliner gibi kalıcı makyaj uygulamalarımızda cilt yapısına ve çevresel faktörlere bağlı olarak kalıcılık süresi ortalama 1 ile 3 yıl arasında değişmektedir. Renk uzmanlarımız size en uygun pigmenti seçerek doğal bir görünüm sağlar."
    },
    {
        question: "Randevu aldım fakat iptal etmek istiyorum, ne yapmalıyım?",
        answer: "Planlarınızda değişiklik olursa randevu iptali veya erteleme işlemleri için randevu saatinden en az 24 saat önce iletişim numaralarımızdan (WhatsApp veya direkt arama ile) bize ulaşmanız yeterlidir."
    }
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-[#F5F5F0] text-[#2C3E50] font-sans pt-28 pb-20">
            <div className="container mx-auto px-4 md:px-8 max-w-4xl">
                
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-8 text-sm text-[#2C3E50]/60">
                    <Link href="/" className="hover:text-[#A65E6E] transition-colors flex items-center gap-1">
                        <Home size={14} /> Anasayfa
                    </Link>
                    <ChevronRight size={14} />
                    <span className="text-[#A65E6E] font-medium">Sıkça Sorulan Sorular</span>
                </div>

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#000000]">Size Nasıl Yardımcı Olabiliriz?</h1>
                        <p className="text-lg text-[#5D6D7E] max-w-2xl mx-auto font-light">
                            Hizmetlerimiz, uygulamalarımız ve merak ettiğiniz diğer tüm detaylar hakkında en sık karşılaştığımız soruların cevaplarını burada bulabilirsiniz.
                        </p>
                    </motion.div>
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className={`bg-white rounded-2xl border transition-all duration-300 ${isOpen ? 'border-[#ec4cc7] shadow-md' : 'border-gray-100 shadow-sm hover:border-gray-200'}`}
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full flex items-center justify-between p-6 text-left"
                                >
                                    <span className={`text-lg font-medium transition-colors duration-300 ${isOpen ? 'text-[#ec4cc7]' : 'text-[#000000]'}`}>
                                        {faq.question}
                                    </span>
                                    <div className={`ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-[#f9def1] text-[#ec4cc7]' : 'bg-gray-50 text-gray-400'}`}>
                                        <ChevronDown
                                            size={20}
                                            className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                        />
                                    </div>
                                </button>
                                
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 text-[#5D6D7E] leading-relaxed font-light">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Extra Contact Info */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="mt-16 bg-[#f9def1] p-8 rounded-3xl text-center"
                >
                    <h3 className="text-xl font-bold text-[#000000] mb-3">Aradığınız cevabı bulamadınız mı?</h3>
                    <p className="text-[#5D6D7E] mb-6">Uzman ekibimiz size yardımcı olmaktan memnuniyet duyacaktır.</p>
                    <a 
                        href="https://wa.me/905385296388" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-[#ec4cc7] hover:bg-[#d03eb0] text-white font-semibold rounded-full transition-all transform hover:-translate-y-1 shadow-md"
                    >
                        Bizimle İletişime Geçin
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
