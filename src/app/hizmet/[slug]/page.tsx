'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, ChevronLeft, Clock, Sparkles, Camera, X } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getServiceBySlug, serviceCategories, RANDEVU_URL } from '@/data/services';

export default function ServiceDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const result = getServiceBySlug(slug);

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const openLightbox = useCallback((index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    }, []);

    const closeLightbox = useCallback(() => {
        setLightboxOpen(false);
    }, []);

    const goNext = useCallback(() => {
        if (!result) return;
        setLightboxIndex((prev) => (prev + 1) % result.service.gallery.length);
    }, [result]);

    const goPrev = useCallback(() => {
        if (!result) return;
        setLightboxIndex((prev) => (prev - 1 + result.service.gallery.length) % result.service.gallery.length);
    }, [result]);

    useEffect(() => {
        if (!lightboxOpen) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') goNext();
            if (e.key === 'ArrowLeft') goPrev();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [lightboxOpen, closeLightbox, goNext, goPrev]);

    // Prevent body scroll when lightbox is open
    useEffect(() => {
        if (lightboxOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [lightboxOpen]);

    if (!result) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#ffffff]">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-[#000000] mb-4">Hizmet Bulunamadı</h1>
                    <Link href="/" className="text-[#ec4cc7] font-semibold hover:underline">
                        Ana Sayfaya Dön
                    </Link>
                </div>
            </div>
        );
    }

    const { service, category } = result;

    return (
        <div className="min-h-screen bg-[#ffffff] text-[#000000] font-sans selection:bg-[#f9def1] selection:text-[#000000]">

            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center"
                        onClick={closeLightbox}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-6 right-6 z-[110] w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 group"
                        >
                            <X size={24} className="text-white group-hover:rotate-90 transition-transform duration-300" />
                        </button>

                        {/* Previous Button */}
                        <button
                            onClick={(e) => { e.stopPropagation(); goPrev(); }}
                            className="absolute left-4 md:left-8 z-[110] w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 group"
                        >
                            <ChevronLeft size={28} className="text-white group-hover:-translate-x-0.5 transition-transform" />
                        </button>

                        {/* Next Button */}
                        <button
                            onClick={(e) => { e.stopPropagation(); goNext(); }}
                            className="absolute right-4 md:right-8 z-[110] w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 group"
                        >
                            <ChevronRight size={28} className="text-white group-hover:translate-x-0.5 transition-transform" />
                        </button>

                        {/* Image */}
                        <motion.img
                            key={lightboxIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            src={service.gallery[lightboxIndex]}
                            alt={`${service.name} - ${lightboxIndex + 1}`}
                            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* Counter */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[110] px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                            <span className="text-white/80 text-sm font-medium">
                                {lightboxIndex + 1} / {service.gallery.length}
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Banner */}
            <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
                <img
                    src={service.heroImage}
                    alt={service.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

                {/* Top Navigation */}
                <div className="absolute top-0 left-0 right-0 z-10 p-6 md:p-8">
                    <div className="container mx-auto max-w-7xl flex items-center justify-between">
                        <Link href="/" className="group flex items-center justify-center relative z-[60]">
                            <img src="/assets/logo/logo.png" alt="Love Yourself By Anastasiya" className="h-10 md:h-12 w-auto transition-transform duration-300 hover:scale-105" />
                        </Link>
                        <Link
                            href="/?showroom=true"
                            className="px-6 py-2 bg-[#ec4cc7] hover:bg-[#8E4D5B] text-white text-sm font-semibold uppercase tracking-wide rounded-full transition-all duration-300"
                        >
                            Tüm Hizmetler
                        </Link>
                    </div>
                </div>

                {/* Hero Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight"
                    >
                        {service.name}
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex items-center gap-2 text-white/80 text-sm md:text-base"
                    >
                        <Link href="/" className="hover:text-[#ec4cc7] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                        </Link>
                        <ChevronRight size={14} />
                        <Link href="/?showroom=true" className="hover:text-[#ec4cc7] transition-colors">{category.title}</Link>
                        <ChevronRight size={14} />
                        <span className="text-white">{service.name}</span>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 md:px-8 max-w-7xl py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left: Main Content */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            {/* Service Image */}
                            <div className="rounded-2xl overflow-hidden shadow-2xl mb-10">
                                <img
                                    src={service.image}
                                    alt={service.name}
                                    className="w-full h-[300px] md:h-[450px] object-cover"
                                />
                            </div>

                            {/* Service Title & Description */}
                            <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mb-6">
                                {service.name}
                            </h2>
                            <p className="text-[#5D6D7E] text-lg leading-relaxed font-light mb-8">
                                {service.longDetails}
                            </p>

                            {/* Features Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                                {service.features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                                        <div className="w-8 h-8 bg-[#ec4cc7]/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Sparkles size={14} className="text-[#ec4cc7]" />
                                        </div>
                                        <span className="text-sm font-medium text-[#000000]">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Gallery Section */}
                            {service.gallery && service.gallery.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    className="mb-10"
                                >
                                    {/* Gallery Header */}
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-gradient-to-br from-[#ec4cc7] to-[#D4A0A8] rounded-full flex items-center justify-center shadow-md">
                                            <Camera size={18} className="text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl md:text-3xl font-bold text-[#000000]">Galeri</h3>
                                            <p className="text-sm text-[#5D6D7E] font-light">Uygulama görsellerimiz</p>
                                        </div>
                                    </div>

                                    {/* Gallery Grid */}
                                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                                        {service.gallery.map((img, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                                                className={`relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg ${i === 0 ? 'row-span-2 h-[300px] md:h-[420px]' : 'h-[145px] md:h-[200px]'
                                                    }`}
                                                onClick={() => openLightbox(i)}
                                            >
                                                <img
                                                    src={img}
                                                    alt={`${service.name} - Görsel ${i + 1}`}
                                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                                />
                                                {/* Hover Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                                                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <circle cx="11" cy="11" r="8" />
                                                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                                            <line x1="11" y1="8" x2="11" y2="14" />
                                                            <line x1="8" y1="11" x2="14" y2="11" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                {/* Image Number Badge */}
                                                <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/40 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <span className="text-white text-xs font-medium">{i + 1}/{service.gallery.length}</span>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>

                    {/* Right: Sidebar */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="sticky top-8"
                        >
                            {/* Reservation Card */}
                            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-[#ec4cc7] rounded-full flex items-center justify-center">
                                        <Clock size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <span className="block text-sm text-[#5D6D7E] font-light">Süre</span>
                                        <span className="block text-lg font-bold text-[#000000]">{service.duration}</span>
                                    </div>
                                </div>
                                <a
                                    href={service.appointmentLink || RANDEVU_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full py-4 bg-[#ec4cc7] hover:bg-[#8E4D5B] text-white text-center text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg"
                                >
                                    Randevu Al
                                </a>
                            </div>

                            {/* Reservation Note */}
                            <div className="bg-[#f9def1]/30 rounded-2xl p-6 mb-8">
                                <h4 className="font-bold text-[#000000] mb-2">Randevudan Önce;</h4>
                                <ul className="text-[#5D6D7E] text-sm font-light space-y-2">
                                    <li>• Randevunuza 10 dakika önce gelmenizi rica ederiz.</li>
                                    <li>• İptal ve değişiklik için en az 24 saat öncesinden bilgilendiriniz.</li>
                                    <li>• Alerjik reaksiyon bilgilerinizi paylaşmayı unutmayınız.</li>
                                </ul>
                            </div>

                            {/* Other Services */}
                            <div className="bg-white rounded-2xl shadow-xl p-6">
                                <h4 className="font-bold text-[#000000] mb-4 text-lg">Diğer Hizmetlerimiz</h4>
                                <div className="space-y-2">
                                    {category.services
                                        .filter(s => s.slug !== service.slug)
                                        .slice(0, 4)
                                        .map((s, i) => (
                                            <Link
                                                key={i}
                                                href={`/hizmet/${s.slug}`}
                                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#ffffff] transition-colors group"
                                            >
                                                <img
                                                    src={s.image}
                                                    alt={s.name}
                                                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                                                />
                                                <div className="flex-1">
                                                    <span className="block text-sm font-semibold text-[#000000] group-hover:text-[#ec4cc7] transition-colors">
                                                        {s.name}
                                                    </span>
                                                    <span className="block text-xs text-[#5D6D7E]">{s.duration}</span>
                                                </div>
                                                <ArrowRight size={14} className="text-[#ec4cc7] opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Link>
                                        ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Footer Link */}
            <div className="bg-[#ec4cc7] py-6 text-center">
                <Link href="/" className="text-white font-semibold uppercase tracking-widest text-sm hover:text-white/80 transition-colors">
                    ← Ana Sayfaya Dön
                </Link>
            </div>
        </div>
    );
}
