'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram, Facebook, Twitter, MapPin, Phone, Mail, ChevronDown, ArrowRight, User, Coffee } from 'lucide-react';
import Link from 'next/link';

// Custom components
const Section = ({ children, className = "", id }: { children: React.ReactNode, className?: string, id?: string }) => (
    <section id={id} className={`py-20 md:py-32 ${className}`}>
        {children}
    </section>
);

const Container = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`container mx-auto px-4 md:px-8 max-w-7xl ${className}`}>
        {children}
    </div>
);

const FadeIn = ({ children, delay = 0, direction = 'up' }: { children: React.ReactNode, delay?: number, direction?: 'up' | 'down' | 'left' | 'right' }) => {
    const directions = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { x: 40, y: 0 },
        right: { x: -40, y: 0 }
    };

    return (
        <motion.div
            initial={{ opacity: 0, ...directions[direction] }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
            {children}
        </motion.div>
    );
};

export default function LongospherePage() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();
    const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
    const heroY = useTransform(scrollY, [0, 500], [0, 200]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Hizmetlerimiz', href: '#services' },
        { name: 'Kozmetik', href: '#cosmetics' },
        { name: 'Bakım', href: '#care' },
        { name: 'Mağaza', href: '#shop' },
        { name: 'Randevu', href: '#appointment' },
        { name: 'Blog', href: '#blog' },
        { name: 'İletişim', href: '#contact' },
    ];

    return (
        <div className="min-h-screen bg-[#F5F5F0] text-[#2C3E50] font-sans selection:bg-[#F6D4DB] selection:text-[#2C3E50] overflow-x-hidden">

            {/* Navbar */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
                    }`}
            >
                <Container className="flex items-center justify-between">
                    <Link href="/longosphere" className="relative z-50 group text-center">
                        <span className={`block text-xl md:text-2xl font-bold tracking-widest uppercase transition-colors duration-300 ${isScrolled ? 'text-[#2C3E50]' : 'text-[#2C3E50]'}`}>
                            Love Yourself
                        </span>
                        <span className={`block text-[10px] tracking-[0.3em] font-light text-center transition-colors duration-300 ${isScrolled ? 'text-[#2C3E50]/70' : 'text-[#2C3E50]/80'}`}>
                            BY ANASTASIYA
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-medium uppercase tracking-wide hover:text-[#A65E6E] transition-colors duration-300 ${isScrolled ? 'text-[#2C3E50]' : 'text-[#2C3E50]'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button className="px-6 py-2 bg-[#A65E6E] hover:bg-[#8E4D5B] text-white text-sm font-semibold uppercase tracking-wide rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                            Randevu Al
                        </button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden relative z-50 text-[#A65E6E]"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} color={isScrolled ? '#2C3E50' : '#2C3E50'} />}
                    </button>
                </Container>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: "tween", duration: 0.4 }}
                            className="fixed inset-0 bg-[#F6D4DB] z-40 flex flex-col items-center justify-center p-8 space-y-6"
                        >
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + index * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        className="text-[#2C3E50] text-2xl font-light tracking-wide hover:text-[#A65E6E] transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="mt-8 px-8 py-3 bg-[#A65E6E] text-white text-lg font-medium rounded-full"
                            >
                                Randevu Al
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Hero Section */}
            <div className="relative h-screen w-full overflow-hidden bg-[#F6D4DB]">
                <motion.div
                    style={{ opacity: heroOpacity, y: heroY }}
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                >
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ objectPosition: 'center center' }}
                        poster="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop"
                    >
                        <source src="/hero-bg.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-white/40 md:bg-white/30" /> {/* Overlay - Lightened */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/20" />
                </motion.div>

                <Container className="relative h-full flex flex-col justify-center items-center text-center text-[#2C3E50] pt-20">
                    <FadeIn delay={0.2} direction="down">
                        <h2 className="text-lg md:text-xl font-bold tracking-[0.4em] uppercase mb-4 text-[#A65E6E]">
                            Güzelliğin Yeni Adresi
                        </h2>
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-tight text-[#2C3E50]">
                            Kendini <br className="hidden md:block" />
                            <span className="italic font-serif font-light text-[#A65E6E]">Yeniden</span> Keşfet
                        </h1>
                    </FadeIn>
                    <FadeIn delay={0.6}>
                        <p className="max-w-xl mx-auto text-lg md:text-xl text-[#2C3E50]/90 font-light leading-relaxed mb-12">
                            Uzman dokunuşlar, premium ürünler ve kişiye özel bakım ritüelleriyle ışıltınızı ortaya çıkarın.
                        </p>
                    </FadeIn>
                    <FadeIn delay={0.8}>
                        <div className="flex flex-col md:flex-row gap-4 items-center">
                            <button className="px-8 py-4 bg-[#A65E6E] hover:bg-[#8E4D5B] text-white text-sm font-bold uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
                                Keşfetmeye Başla
                            </button>
                            <button className="px-8 py-4 bg-transparent border border-[#2C3E50]/30 hover:bg-white/40 text-[#2C3E50] text-sm font-bold uppercase tracking-widest transition-all duration-300 backdrop-blur-sm">
                                Tanıtım Filmi
                            </button>
                        </div>
                    </FadeIn>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
                    >
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#2C3E50]/60">Aşağı Kaydır</span>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        >
                            <ChevronDown className="text-[#2C3E50]/80" />
                        </motion.div>
                    </motion.div>
                </Container>
            </div>

            {/* Intro Section */}
            <Section className="bg-[#F5F5F0]">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <FadeIn direction="right">
                            <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop"
                                    alt="Beauty Center"
                                    className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/70 to-transparent">
                                    <div className="flex items-center gap-2 text-[#A65E6E]">
                                        <User size={20} />
                                        <span className="text-sm uppercase tracking-widest font-semibold">Uzman Kadro</span>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                        <FadeIn direction="left">
                            <div>
                                <h3 className="text-[#A65E6E] font-bold text-sm tracking-[0.2em] uppercase mb-4">
                                    Love Yourself Güzellik
                                </h3>
                                <h2 className="text-4xl md:text-5xl font-bold text-[#2C3E50] mb-8 leading-tight">
                                    Estetik ve Bakımın <br />
                                    <span className="font-serif italic font-normal text-[#A65E6E]">Buluştuğu Nokta</span>
                                </h2>
                                <p className="text-[#5D6D7E] text-lg leading-relaxed mb-6 font-light">
                                    Modern teknolojiyi geleneksel bakım ritüelleriyle birleştiren merkezimizde, cildinizin ihtiyaç duyduğu tüm bakımları sunuyoruz.
                                    Love Yourself, güzelliğinize değer katan dokunuşlarla sizi şımartmaya hazır.
                                </p>
                                <p className="text-[#5D6D7E] text-lg leading-relaxed mb-10 font-light">
                                    Dünyaca ünlü markaların ürünleri ve sertifikalı uzmanlarımızla, kendinizi özel hissedeceğiniz
                                    bir deneyim sizi bekliyor.
                                </p>
                                <Link href="#services" className="inline-flex items-center gap-2 text-[#2C3E50] font-semibold uppercase tracking-widest border-b-2 border-[#A65E6E] pb-1 hover:text-[#A65E6E] transition-colors">
                                    Hizmetleri İncele <ArrowRight size={16} />
                                </Link>
                            </div>
                        </FadeIn>
                    </div>
                </Container>
            </Section>

            {/* Services Section */}
            <Section className="bg-white" id="services">
                <Container>
                    <div className="text-center mb-16">
                        <FadeIn>
                            <h3 className="text-[#A65E6E] font-bold text-sm tracking-[0.2em] uppercase mb-4">Özel Bakım</h3>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#2C3E50] mb-6">Hizmetlerimiz</h2>
                            <div className="w-24 h-1 bg-[#A65E6E] mx-auto rounded-full"></div>
                        </FadeIn>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Cilt Bakımı",
                                desc: "Profesyonel cilt bakımı ile ışıltınızı geri kazanın.",
                                image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2070&auto=format&fit=crop",
                                features: ["45 Dakika", "Özel Maskeler", "Derinlemesine Temizlik"]
                            },
                            {
                                title: "Masaj Terapisi",
                                desc: "Günün yorgunluğunu atmak için rahatlatıcı masaj.",
                                image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2070&auto=format&fit=crop",
                                features: ["60 Dakika", "Aromaterapi", "Sıcak Taş"]
                            },
                            {
                                title: "El & Ayak Bakımı",
                                desc: "Kusursuz manikür ve pedikür deneyimi.",
                                image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=2070&auto=format&fit=crop",
                                features: ["Semi-Permanent", "Nail Art", "Spa Pedikür"]
                            }
                        ].map((item, index) => (
                            <FadeIn key={index} delay={index * 0.2}>
                                <div className="group bg-[#F5F5F0] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                            <button className="text-white text-sm font-bold uppercase tracking-widest flex items-center gap-2">Detayları Gör <ArrowRight size={14} /></button>
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <h3 className="text-2xl font-bold text-[#2C3E50] mb-3 group-hover:text-[#A65E6E] transition-colors">{item.title}</h3>
                                        <p className="text-[#5D6D7E] text-sm leading-relaxed mb-6 font-light">{item.desc}</p>
                                        <div className="flex items-center gap-4 border-t border-gray-200 pt-4">
                                            {item.features.map((feature, i) => (
                                                <span key={i} className="text-xs font-medium text-[#2C3E50]/70 bg-white px-3 py-1 rounded-full shadow-sm">{feature}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Featured Experience - Parallax */}
            <section className="relative py-32 bg-[#F6D4DB] overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/soft-wallpaper.png')] mix-blend-overlay"></div>
                <Container className="relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <FadeIn direction="right">
                            <div className="space-y-8">
                                <h3 className="text-[#A65E6E] font-bold text-sm tracking-[0.2em] uppercase">Size Özel</h3>
                                <h2 className="text-4xl md:text-6xl font-bold text-[#2C3E50] leading-tight">
                                    Ruhunuzu ve Bedeninizi <br />
                                    <span className="font-serif italic font-light text-[#A65E6E]">Dinlendirin</span>
                                </h2>
                                <p className="text-[#2C3E50]/80 text-lg font-light leading-relaxed">
                                    Love Yourself'de sadece bakım yaptırmıyor, yenileniyorsunuz. Aromaterapi masajları, cilt yenileme seansları,
                                    detoks programları ve makyaj atölyeleri ile kendinize tam bir iyilik yapın.
                                </p>
                                <div className="grid grid-cols-2 gap-8 pt-4">
                                    <div className="flex flex-col gap-2">
                                        <div className="w-12 h-12 bg-[#A65E6E] rounded-full flex items-center justify-center text-white mb-2">
                                            <Coffee />
                                        </div>
                                        <h4 className="text-[#2C3E50] font-bold text-lg">Detoks Bar</h4>
                                        <p className="text-[#2C3E50]/60 text-sm font-light">Sağlıklı içecekler ve atıştırmalıklar.</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="w-12 h-12 bg-[#A65E6E] rounded-full flex items-center justify-center text-white mb-2">
                                            <User />
                                        </div>
                                        <h4 className="text-[#2C3E50] font-bold text-lg">VIP Odalar</h4>
                                        <p className="text-[#2C3E50]/60 text-sm font-light">Size özel hazırlanmış bakım alanları.</p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                        <FadeIn direction="left" delay={0.2}>
                            <div className="relative">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A373] rounded-full opacity-20 blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <img src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=2070&auto=format&fit=crop" className="rounded-2xl shadow-2xl mt-12 transform hover:-translate-y-2 transition-transform duration-500" alt="Makeup" />
                                    <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070&auto=format&fit=crop" className="rounded-2xl shadow-2xl mb-12 transform hover:-translate-y-2 transition-transform duration-500" alt="Spa" />
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </Container>
            </section>

            {/* Shop Section */}
            <Section className="bg-[#F5F5F0]" id="shop">
                <Container>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                        <FadeIn>
                            <h3 className="text-[#A65E6E] font-bold text-sm tracking-[0.2em] uppercase mb-2">Mağaza</h3>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#2C3E50]">Güzellik Köşesi</h2>
                        </FadeIn>
                        <FadeIn delay={0.2}>
                            <p className="max-w-md text-[#5D6D7E] text-lg font-light">
                                En sevdiğiniz bakım ürünlerini keşfedebileceğiniz, uzmanlardan tavsiye alabileceğiniz özel mağazamız.
                            </p>
                        </FadeIn>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { name: 'Cilt Bakım', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop' },
                            { name: 'Makyaj', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=2070&auto=format&fit=crop' },
                            { name: 'Parfüm', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=2070&auto=format&fit=crop' },
                            { name: 'Vücut Bakım', image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2070&auto=format&fit=crop' }
                        ].map((item, i) => (
                            <FadeIn key={i} delay={i * 0.1}>
                                <div className="group relative h-80 rounded-xl overflow-hidden cursor-pointer">
                                    <img
                                        src={item.image}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                        alt={item.name}
                                    />
                                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300 flex flex-col items-center justify-center p-4 text-center">
                                        <h4 className="text-white text-xl font-bold tracking-wider uppercase border-2 border-white/30 px-6 py-3 bg-black/20 backdrop-blur-sm group-hover:bg-white group-hover:text-[#2C3E50] transition-all duration-300">
                                            {item.name}
                                        </h4>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Footer */}
            <footer className="bg-[#F6D4DB] text-[#2C3E50] pt-20 pb-10 border-t border-[#2C3E50]/10">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        <div className="space-y-6">
                            <Link href="/longosphere" className="block text-center md:text-left">
                                <span className="text-2xl font-bold tracking-widest uppercase text-[#2C3E50]">Love Yourself</span>
                                <span className="block text-[10px] tracking-[0.3em] font-light text-[#2C3E50]/60">BY ANASTASIYA</span>
                            </Link>
                            <p className="text-[#2C3E50]/70 text-sm font-light leading-relaxed">
                                Şehrin kalbinde, stresten uzak, kendinizle baş başa kalacağınız özel bir kaçış noktası.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-[#2C3E50]/5 hover:bg-[#A65E6E] flex items-center justify-center transition-colors duration-300 text-[#2C3E50] hover:text-white">
                                    <Instagram size={18} />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-[#2C3E50]/5 hover:bg-[#A65E6E] flex items-center justify-center transition-colors duration-300 text-[#2C3E50] hover:text-white">
                                    <Facebook size={18} />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-[#2C3E50]/5 hover:bg-[#A65E6E] flex items-center justify-center transition-colors duration-300 text-[#2C3E50] hover:text-white">
                                    <Twitter size={18} />
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-bold mb-6 text-[#A65E6E]">Hızlı Menü</h4>
                            <ul className="space-y-3">
                                {navLinks.slice(0, 4).map(link => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-[#2C3E50]/70 hover:text-[#2C3E50] text-sm transition-colors flex items-center gap-2">
                                            <ArrowRight size={12} className="text-[#A65E6E]" /> {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-bold mb-6 text-[#A65E6E]">Bilgilendirme</h4>
                            <ul className="space-y-3">
                                <li><Link href="#" className="text-[#2C3E50]/70 hover:text-[#2C3E50] text-sm transition-colors">KVKK Aydınlatma Metni</Link></li>
                                <li><Link href="#" className="text-[#2C3E50]/70 hover:text-[#2C3E50] text-sm transition-colors">Gizlilik Politikası</Link></li>
                                <li><Link href="#" className="text-[#2C3E50]/70 hover:text-[#2C3E50] text-sm transition-colors">Çerez Politikası</Link></li>
                                <li><Link href="#" className="text-[#2C3E50]/70 hover:text-[#2C3E50] text-sm transition-colors">Mesafeli Satış Sözleşmesi</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-bold mb-6 text-[#A65E6E]">İletişim</h4>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <MapPin size={20} className="text-[#A65E6E] mt-1 shrink-0" />
                                    <span className="text-[#2C3E50]/70 text-sm font-light">Bağdat Caddesi No:123, Kadıköy/İstanbul</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Phone size={20} className="text-[#A65E6E]" />
                                    <span className="text-[#2C3E50]/70 text-sm font-light">+90 444 1 234</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Mail size={20} className="text-[#A65E6E]" />
                                    <span className="text-[#2C3E50]/70 text-sm font-light">info@loveyourself.com</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-[#2C3E50]/10 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-[#2C3E50]/40 text-xs font-light">
                            &copy; {new Date().getFullYear()} Love Yourself By Anastasiya. Tüm hakları saklıdır.
                        </p>
                        <div className="flex gap-6">
                            <span className="text-[#2C3E50]/40 text-xs font-light tracking-widest uppercase">Designed by Antigravity</span>
                        </div>
                    </div>
                </Container>
            </footer>
        </div>
    );
}
