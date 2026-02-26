'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Clock, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getServiceBySlug, serviceCategories, RANDEVU_URL } from '@/data/services';

export default function ServiceDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const result = getServiceBySlug(slug);

    if (!result) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F5F5F0]">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-[#2C3E50] mb-4">Hizmet Bulunamadı</h1>
                    <Link href="/" className="text-[#A65E6E] font-semibold hover:underline">
                        Ana Sayfaya Dön
                    </Link>
                </div>
            </div>
        );
    }

    const { service, category } = result;

    return (
        <div className="min-h-screen bg-[#F5F5F0] text-[#2C3E50] font-sans selection:bg-[#F6D4DB] selection:text-[#2C3E50]">

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
                        <Link href="/" className="group text-center">
                            <span className="block text-xl md:text-2xl font-bold tracking-widest uppercase text-white">
                                Love Yourself
                            </span>
                            <span className="block text-[10px] tracking-[0.3em] font-light text-white/70">
                                BY ANASTASIYA
                            </span>
                        </Link>
                        <Link
                            href="/?showroom=true"
                            className="px-6 py-2 bg-[#A65E6E] hover:bg-[#8E4D5B] text-white text-sm font-semibold uppercase tracking-wide rounded-full transition-all duration-300"
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
                        <Link href="/" className="hover:text-[#A65E6E] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                        </Link>
                        <ChevronRight size={14} />
                        <Link href="/?showroom=true" className="hover:text-[#A65E6E] transition-colors">{category.title}</Link>
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
                            <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-6">
                                {service.name}
                            </h2>
                            <p className="text-[#5D6D7E] text-lg leading-relaxed font-light mb-8">
                                {service.longDetails}
                            </p>

                            {/* Features Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                                {service.features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                                        <div className="w-8 h-8 bg-[#A65E6E]/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Sparkles size={14} className="text-[#A65E6E]" />
                                        </div>
                                        <span className="text-sm font-medium text-[#2C3E50]">{feature}</span>
                                    </div>
                                ))}
                            </div>
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
                                    <div className="w-12 h-12 bg-[#A65E6E] rounded-full flex items-center justify-center">
                                        <Clock size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <span className="block text-sm text-[#5D6D7E] font-light">Süre</span>
                                        <span className="block text-lg font-bold text-[#2C3E50]">{service.duration}</span>
                                    </div>
                                </div>
                                <a
                                    href={RANDEVU_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full py-4 bg-[#A65E6E] hover:bg-[#8E4D5B] text-white text-center text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg"
                                >
                                    Randevu Al
                                </a>
                            </div>

                            {/* Reservation Note */}
                            <div className="bg-[#F6D4DB]/30 rounded-2xl p-6 mb-8">
                                <h4 className="font-bold text-[#2C3E50] mb-2">Randevudan Önce;</h4>
                                <ul className="text-[#5D6D7E] text-sm font-light space-y-2">
                                    <li>• Randevunuza 10 dakika önce gelmenizi rica ederiz.</li>
                                    <li>• İptal ve değişiklik için en az 24 saat öncesinden bilgilendiriniz.</li>
                                    <li>• Alerjik reaksiyon bilgilerinizi paylaşmayı unutmayınız.</li>
                                </ul>
                            </div>

                            {/* Other Services */}
                            <div className="bg-white rounded-2xl shadow-xl p-6">
                                <h4 className="font-bold text-[#2C3E50] mb-4 text-lg">Diğer Hizmetlerimiz</h4>
                                <div className="space-y-2">
                                    {category.services
                                        .filter(s => s.slug !== service.slug)
                                        .slice(0, 4)
                                        .map((s, i) => (
                                            <Link
                                                key={i}
                                                href={`/hizmet/${s.slug}`}
                                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F5F5F0] transition-colors group"
                                            >
                                                <img
                                                    src={s.image}
                                                    alt={s.name}
                                                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                                                />
                                                <div className="flex-1">
                                                    <span className="block text-sm font-semibold text-[#2C3E50] group-hover:text-[#A65E6E] transition-colors">
                                                        {s.name}
                                                    </span>
                                                    <span className="block text-xs text-[#5D6D7E]">{s.duration}</span>
                                                </div>
                                                <ArrowRight size={14} className="text-[#A65E6E] opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Link>
                                        ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Footer Link */}
            <div className="bg-[#A65E6E] py-6 text-center">
                <Link href="/" className="text-white font-semibold uppercase tracking-widest text-sm hover:text-white/80 transition-colors">
                    ← Ana Sayfaya Dön
                </Link>
            </div>
        </div>
    );
}
