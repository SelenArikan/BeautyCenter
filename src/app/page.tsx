'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram, Facebook, Twitter, MapPin, Phone, Mail, ChevronDown, ChevronUp, ArrowRight, User, Coffee, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { serviceCategories, RANDEVU_URL } from '@/data/services';

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

// Star Rating Component
const StarRating = ({ rating, size = 16 }: { rating: number; size?: number }) => {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    width={size}
                    height={size}
                    viewBox="0 0 24 24"
                    fill={star <= rating ? '#FBBC05' : '#E5E7EB'}
                >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            ))}
        </div>
    );
};

// Google Reviews Data Hook
interface GoogleReview {
    author_name: string;
    rating: number;
    text: string;
    time: number;
    profile_photo_url: string;
    relative_time_description: string;
}

interface GoogleReviewsData {
    rating: number;
    totalReviews: number;
    reviews: GoogleReview[];
}

const useGoogleReviews = () => {
    const [data, setData] = useState<GoogleReviewsData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/reviews')
            .then(res => res.json())
            .then(d => { setData(d); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    return { data, loading };
};

// Google Reviews Summary Component
const GoogleReviewsSummary = () => {
    const { data, loading } = useGoogleReviews();

    if (loading) {
        return (
            <div className="flex items-center justify-center gap-6 animate-pulse">
                <div className="w-20 h-20 bg-gray-200 rounded-2xl"></div>
                <div className="space-y-2">
                    <div className="w-32 h-6 bg-gray-200 rounded"></div>
                    <div className="w-24 h-4 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-4">
                <span className="text-5xl font-bold text-[#2C3E50]">{data.rating}</span>
                <div className="flex flex-col items-start">
                    <StarRating rating={Math.round(data.rating)} size={22} />
                    <span className="text-[#5D6D7E] text-sm font-light mt-1">
                        {data.totalReviews} değerlendirme
                    </span>
                </div>
            </div>
        </div>
    );
};

// Google Reviews Cards Component
const GoogleReviewsCards = () => {
    const { data, loading } = useGoogleReviews();

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-[#F5F5F0] rounded-2xl p-6 animate-pulse">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                            <div className="space-y-2">
                                <div className="w-24 h-4 bg-gray-200 rounded"></div>
                                <div className="w-16 h-3 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="w-full h-3 bg-gray-200 rounded"></div>
                            <div className="w-3/4 h-3 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!data || data.reviews.length === 0) return null;

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const colors = ['#A65E6E', '#4285F4', '#34A853', '#EA4335', '#FBBC05'];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.reviews.map((review, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="bg-[#F5F5F0] rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
                >
                    {/* Author */}
                    <div className="flex items-center gap-3 mb-4">
                        {review.profile_photo_url ? (
                            <img
                                src={review.profile_photo_url}
                                alt={review.author_name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                        ) : (
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
                                style={{ backgroundColor: colors[index % colors.length] }}
                            >
                                {getInitials(review.author_name)}
                            </div>
                        )}
                        <div>
                            <h4 className="font-semibold text-[#2C3E50] text-sm">{review.author_name}</h4>
                            <span className="text-[#5D6D7E] text-xs font-light">{review.relative_time_description}</span>
                        </div>
                        <div className="ml-auto">
                            <svg viewBox="0 0 24 24" width="20" height="20" className="opacity-40">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                        </div>
                    </div>

                    {/* Stars */}
                    <div className="mb-3">
                        <StarRating rating={review.rating} size={14} />
                    </div>

                    {/* Review Text */}
                    <p className="text-[#5D6D7E] text-sm leading-relaxed font-light line-clamp-4">
                        {review.text}
                    </p>
                </motion.div>
            ))}
        </div>
    );
};

export default function LongospherePage() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeService, setActiveService] = useState<string | null>(null);
    const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    const navLinks = [
        { name: 'Hizmetlerimiz', href: '#services', hasDropdown: true },
        { name: 'Blog', href: '/blog' },
        { name: 'İletişim', href: 'https://wa.me/905385296388' },
    ];

    const handleDropdownEnter = () => {
        if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
        setIsServicesDropdownOpen(true);
    };

    const handleDropdownLeave = () => {
        dropdownTimeoutRef.current = setTimeout(() => {
            setIsServicesDropdownOpen(false);
        }, 200);
    };

    return (
        <div className="min-h-screen bg-[#F5F5F0] text-[#2C3E50] font-sans selection:bg-[#F6D4DB] selection:text-[#2C3E50] overflow-x-hidden pb-[72px] lg:pb-0">

            {/* Mobile Bottom Navbar */}
            {!isMobileMenuOpen && (
                <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
                    <div className="bg-[#A65E6E] flex items-stretch shadow-[0_-2px_20px_rgba(0,0,0,0.15)]">
                        <a
                            href={RANDEVU_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex flex-col items-center justify-center gap-1.5 py-3.5 text-white hover:bg-white/10 active:bg-white/20 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                            <span className="text-[10px] font-semibold tracking-wide">Randevu Al</span>
                        </a>
                        <a
                            href="https://www.instagram.com/loveyourselfbyanastasiya/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex flex-col items-center justify-center gap-1.5 py-3.5 text-white hover:bg-white/10 active:bg-white/20 transition-colors"
                        >
                            <Instagram size={22} />
                            <span className="text-[10px] font-semibold tracking-wide">Instagram</span>
                        </a>
                        <a
                            href="https://wa.me/905385296388"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex flex-col items-center justify-center gap-1.5 py-3.5 text-white hover:bg-white/10 active:bg-white/20 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            <span className="text-[10px] font-semibold tracking-wide">WhatsApp</span>
                        </a>
                    </div>
                </div>
            )}

            {/* Navbar */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
                    }`}
            >
                <Container className="flex items-center justify-between">
                    <Link href="/longosphere" className="relative z-[60] group text-center">
                        <span className={`block text-xl md:text-2xl font-bold tracking-widest uppercase transition-colors duration-300 ${isMobileMenuOpen ? 'text-[#2C3E50]' : isScrolled ? 'text-[#2C3E50]' : 'text-[#2C3E50]'}`}>
                            Love Yourself
                        </span>
                        <span className={`block text-[10px] tracking-[0.3em] font-light text-center transition-colors duration-300 ${isScrolled ? 'text-[#2C3E50]/70' : 'text-[#2C3E50]/80'}`}>
                            BY ANASTASIYA
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            link.hasDropdown ? (
                                <div
                                    key={link.name}
                                    className="relative"
                                    ref={dropdownRef}
                                    onMouseEnter={handleDropdownEnter}
                                    onMouseLeave={handleDropdownLeave}
                                >
                                    <Link
                                        href={link.href}
                                        className={`text-sm font-medium uppercase tracking-wide hover:text-[#A65E6E] transition-colors duration-300 flex items-center gap-1 ${isScrolled ? 'text-[#2C3E50]' : 'text-[#2C3E50]'}`}
                                    >
                                        {link.name}
                                        <ChevronDown size={14} className={`transition-transform duration-200 ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
                                    </Link>

                                    {/* Dropdown Menu */}
                                    <AnimatePresence>
                                        {isServicesDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full left-0 mt-4 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden min-w-[280px] z-50"
                                            >
                                                <div className="p-2">
                                                    {serviceCategories.map((cat, ci) => (
                                                        <div key={ci}>
                                                            <div className="px-4 py-2 text-xs font-bold text-[#A65E6E] uppercase tracking-widest">
                                                                {cat.title}
                                                            </div>
                                                            {cat.services.map((srv, si) => (
                                                                <Link
                                                                    key={si}
                                                                    href={`/hizmet/${srv.slug}`}
                                                                    className="block px-4 py-2.5 text-sm text-[#2C3E50] hover:bg-[#F6D4DB]/30 hover:text-[#A65E6E] rounded-lg transition-colors font-medium"
                                                                    onClick={() => setIsServicesDropdownOpen(false)}
                                                                >
                                                                    {srv.name}
                                                                </Link>
                                                            ))}
                                                            {ci < serviceCategories.length - 1 && (
                                                                <div className="my-1 border-t border-gray-100" />
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : link.href.startsWith('http') ? (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`text-sm font-medium uppercase tracking-wide hover:text-[#A65E6E] transition-colors duration-300 ${isScrolled ? 'text-[#2C3E50]' : 'text-[#2C3E50]'}`}
                                >
                                    {link.name}
                                </a>
                            ) : (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`text-sm font-medium uppercase tracking-wide hover:text-[#A65E6E] transition-colors duration-300 ${isScrolled ? 'text-[#2C3E50]' : 'text-[#2C3E50]'}`}
                                >
                                    {link.name}
                                </Link>
                            )
                        ))}
                        <a href={RANDEVU_URL} target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-[#A65E6E] hover:bg-[#8E4D5B] text-white text-sm font-semibold uppercase tracking-wide rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                            Randevu Al
                        </a>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden relative z-[60] text-[#A65E6E]"
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
                            className="fixed inset-0 bg-[#F6D4DB] z-[55] flex flex-col items-center justify-center p-8 space-y-6"
                        >
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + index * 0.1 }}
                                    className="w-full text-center"
                                >
                                    {link.hasDropdown ? (
                                        <div>
                                            <button
                                                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                                                className="text-[#2C3E50] text-2xl font-light tracking-wide hover:text-[#A65E6E] transition-colors inline-flex items-center gap-2"
                                            >
                                                {link.name}
                                                <ChevronDown size={20} className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                                            </button>
                                            <AnimatePresence>
                                                {mobileServicesOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="mt-3 space-y-1">
                                                            {serviceCategories.map((cat, ci) => (
                                                                <div key={ci}>
                                                                    <div className="text-xs font-bold text-[#A65E6E] uppercase tracking-widest py-2">
                                                                        {cat.title}
                                                                    </div>
                                                                    {cat.services.map((srv, si) => (
                                                                        <Link
                                                                            key={si}
                                                                            href={`/hizmet/${srv.slug}`}
                                                                            className="block py-1.5 text-[#2C3E50] text-base font-light hover:text-[#A65E6E] transition-colors"
                                                                            onClick={() => { setIsMobileMenuOpen(false); setMobileServicesOpen(false); }}
                                                                        >
                                                                            {srv.name}
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ) : link.href.startsWith('http') ? (
                                        <a
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#2C3E50] text-2xl font-light tracking-wide hover:text-[#A65E6E] transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {link.name}
                                        </a>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className="text-[#2C3E50] text-2xl font-light tracking-wide hover:text-[#A65E6E] transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </motion.div>
                            ))}
                            <motion.a
                                href={RANDEVU_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="mt-8 px-8 py-3 bg-[#A65E6E] text-white text-lg font-medium rounded-full"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Randevu Al
                            </motion.a>
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

                    <div className="space-y-24">
                        {serviceCategories.map((category, catIndex) => {
                            // Find the active service for this category
                            const activeInCategory = category.services.findIndex(
                                (_, sIndex) => activeService === `${catIndex}-${sIndex}`
                            );
                            const selectedService = activeInCategory >= 0 ? category.services[activeInCategory] : null;

                            return (
                                <FadeIn key={catIndex} delay={catIndex * 0.15}>
                                    <div>
                                        {/* Category Title */}
                                        <h2 className="text-4xl md:text-5xl font-bold text-[#2C3E50] mb-4 tracking-tight uppercase" style={{ fontFamily: "'Georgia', serif" }}>
                                            {category.title}
                                        </h2>
                                        <p className="text-[#5D6D7E] text-base md:text-lg font-light mb-10 max-w-lg">
                                            {category.desc}
                                        </p>

                                        {/* Service Pill Buttons */}
                                        <div className="flex flex-col gap-3 mb-10">
                                            {category.services.map((service, sIndex) => {
                                                const serviceKey = `${catIndex}-${sIndex}`;
                                                const isActive = activeService === serviceKey;
                                                return (
                                                    <button
                                                        key={sIndex}
                                                        onClick={() => setActiveService(isActive ? null : serviceKey)}
                                                        className={`flex items-center gap-3 w-fit px-6 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${isActive
                                                            ? 'bg-[#2C3E50] text-white shadow-lg'
                                                            : 'bg-[#A65E6E]/15 text-[#2C3E50] hover:bg-[#A65E6E] hover:text-white'
                                                            }`}
                                                    >
                                                        <Sparkles size={16} />
                                                        {service.name}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* Selected Service Detail or Default Category Image */}
                                        <AnimatePresence mode="wait">
                                            {selectedService ? (
                                                <motion.div
                                                    key={activeService}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                                                >
                                                    {/* Service Detail Card */}
                                                    <div className="bg-[#F5F5F0] rounded-2xl overflow-hidden shadow-xl">
                                                        <div className="grid grid-cols-1 md:grid-cols-2">
                                                            <div className="p-8 md:p-12 flex flex-col justify-center">
                                                                <h3 className="text-2xl md:text-3xl font-bold text-[#2C3E50] mb-4">
                                                                    {selectedService.name}
                                                                </h3>
                                                                <p className="text-[#5D6D7E] text-base leading-relaxed mb-6 font-light">
                                                                    {selectedService.details}
                                                                </p>
                                                                <div className="flex items-center gap-2 text-[#A65E6E] font-semibold text-sm mb-6">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                        <circle cx="12" cy="12" r="10" />
                                                                        <polyline points="12 6 12 12 16 14" />
                                                                    </svg>
                                                                    {selectedService.duration}
                                                                </div>
                                                                <Link href={`/hizmet/${selectedService.slug}`} className="w-fit px-6 py-3 bg-[#A65E6E] hover:bg-[#8E4D5B] text-white text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-300 transform hover:-translate-y-0.5 shadow-md inline-block">
                                                                    Şimdi Keşfet
                                                                </Link>
                                                            </div>
                                                            <div className="h-64 md:h-auto">
                                                                <img
                                                                    src={selectedService.image}
                                                                    alt={selectedService.name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="default-image"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <div className="rounded-2xl overflow-hidden shadow-xl">
                                                        <img
                                                            src={category.image}
                                                            alt={category.title}
                                                            className="w-full h-72 md:h-96 object-cover"
                                                        />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </FadeIn>
                            );
                        })}
                    </div>
                </Container>
            </Section>

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

            {/* Blog Section */}
            <Section className="bg-[#F5F5F0]" id="blog">
                <Container>
                    <div className="text-center mb-16">
                        <FadeIn>
                            <h3 className="text-[#A65E6E] font-bold text-sm tracking-[0.2em] uppercase mb-4">Blog</h3>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#2C3E50] mb-6">Güzellik Rehberi</h2>
                            <div className="w-24 h-1 bg-[#A65E6E] mx-auto rounded-full mb-6"></div>
                            <p className="max-w-lg mx-auto text-[#5D6D7E] text-lg font-light">
                                Bakım ipuçları, güzellik trendleri ve uzman önerileriyle kendinize en iyi şekilde bakın.
                            </p>
                        </FadeIn>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Kışın Cildinizi Korumak İçin 5 Altın Kural",
                                excerpt: "Soğuk havalarda cildinizin kurumasını önlemek ve sağlıklı bir görünüm elde etmek için uzman önerileri.",
                                image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=2070&auto=format&fit=crop",
                                date: "15 Şubat 2026",
                                category: "Cilt Bakımı"
                            },
                            {
                                title: "Doğal Maske Tarifleri ile Evde Spa Keyfi",
                                excerpt: "Mutfağınızdaki malzemelerle hazırlayabileceğiniz etkili ve doğal yüz maskesi tarifleri.",
                                image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop",
                                date: "8 Şubat 2026",
                                category: "Güzellik"
                            },
                            {
                                title: "2026 İlkbahar Tırnak Trendleri",
                                excerpt: "Bu sezonun en popüler tırnak renkleri, desenleri ve nail art trendleri hakkında bilmeniz gerekenler.",
                                image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2070&auto=format&fit=crop",
                                date: "1 Şubat 2026",
                                category: "Tırnaklar"
                            }
                        ].map((post, index) => (
                            <FadeIn key={index} delay={index * 0.2}>
                                <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-[#A65E6E] text-white text-xs font-bold uppercase tracking-wider rounded-full">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <span className="text-[#A65E6E] text-xs font-medium tracking-wide">
                                            {post.date}
                                        </span>
                                        <h3 className="text-xl font-bold text-[#2C3E50] mt-2 mb-3 group-hover:text-[#A65E6E] transition-colors leading-snug">
                                            {post.title}
                                        </h3>
                                        <p className="text-[#5D6D7E] text-sm leading-relaxed font-light mb-4">
                                            {post.excerpt}
                                        </p>
                                        <span className="inline-flex items-center gap-2 text-[#A65E6E] text-sm font-semibold uppercase tracking-wide group-hover:gap-3 transition-all">
                                            Devamını Oku <ArrowRight size={14} />
                                        </span>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Google Reviews Section */}
            <Section className="bg-white" id="reviews">
                <Container>
                    <div className="text-center mb-16">
                        <FadeIn>
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <svg viewBox="0 0 24 24" width="28" height="28">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                <h3 className="text-[#A65E6E] font-bold text-sm tracking-[0.2em] uppercase">Google Yorumları</h3>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#2C3E50] mb-6">Misafirlerimiz Ne Diyor?</h2>
                            <div className="w-24 h-1 bg-[#A65E6E] mx-auto rounded-full mb-8"></div>
                        </FadeIn>

                        {/* Rating Summary */}
                        <FadeIn delay={0.2}>
                            <GoogleReviewsSummary />
                        </FadeIn>
                    </div>

                    {/* Reviews Cards */}
                    <FadeIn delay={0.3}>
                        <GoogleReviewsCards />
                    </FadeIn>

                    {/* Google Review CTA */}
                    <FadeIn delay={0.4}>
                        <div className="text-center mt-12">
                            <a
                                href="https://www.google.com/maps/search/Love+Yourself+by+Anastasiya+B%C3%BCy%C3%BCk%C3%A7ekmece"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-8 py-3 bg-[#A65E6E] hover:bg-[#8E4D5B] text-white text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg"
                            >
                                Yorum Bırakın
                                <ArrowRight size={16} />
                            </a>
                        </div>
                    </FadeIn>
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
                                <a href="https://www.instagram.com/loveyourselfbyanastasiya/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#2C3E50]/5 hover:bg-[#A65E6E] flex items-center justify-center transition-colors duration-300 text-[#2C3E50] hover:text-white">
                                    <Instagram size={18} />
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
                                    <span className="text-[#2C3E50]/70 text-sm font-light">Güzelce Mah. Geçit Cd. No:9 D:3D, 34530 Büyükçekmece/İstanbul</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Phone size={20} className="text-[#A65E6E]" />
                                    <a href="https://wa.me/905385296388" target="_blank" rel="noopener noreferrer" className="text-[#2C3E50]/70 text-sm font-light hover:text-[#A65E6E] transition-colors">+90 538 529 63 88</a>
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
