<!DOCTYPE html>
<html lang="tr" class="scroll-smooth">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Love Yourself By Anastasiya</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#A65E6E',
                        secondary: '#2C3E50',
                        light: '#F5F5F0',
                    }
                }
            }
        }
    </script>
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Georgia&display=swap"
        rel="stylesheet">
    <!-- Alpine.js for interactivity -->
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <!-- Icons (Lucide) -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }

        .font-serif {
            font-family: 'Georgia', serif;
        }

        /* Entrance Animations */
        .fade-in-up {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.8s cubic-bezier(0.21, 0.47, 0.32, 0.98), transform 0.8s cubic-bezier(0.21, 0.47, 0.32, 0.98);
        }

        .fade-in-up.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .fade-in-left {
            opacity: 0;
            transform: translateX(-40px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .fade-in-left.visible {
            opacity: 1;
            transform: translateX(0);
        }

        .fade-in-right {
            opacity: 0;
            transform: translateX(40px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .fade-in-right.visible {
            opacity: 1;
            transform: translateX(0);
        }

        /* Mobile menu body lock */
        body.menu-open {
            overflow: hidden;
        }
    </style>
</head>

<body class="min-h-screen bg-[#F5F5F0] text-[#2C3E50] pb-[72px] lg:pb-0"
    x-data="{ isMobileMenuOpen: false, isScrolled: false, mobileServicesOpen: false, isServicesDropdownOpen: false, isShowroomOpen: false }"
    @scroll.window="isScrolled = (window.pageYOffset > 50)" :class="{'menu-open': isMobileMenuOpen || isShowroomOpen}">

    <?php include 'data.php'; ?>

    <!-- Mobile Bottom Navbar -->
    <div x-show="!isMobileMenuOpen" class="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
        <div class="bg-[#A65E6E] flex items-stretch shadow-[0_-2px_20px_rgba(0,0,0,0.15)]">
            <a href="<?= $RANDEVU_URL ?>" target="_blank" rel="noopener noreferrer"
                class="flex-1 flex flex-col items-center justify-center gap-1.5 py-3.5 text-white hover:bg-white/10 active:bg-white/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span class="text-[10px] font-semibold tracking-wide">Randevu Al</span>
            </a>
            <a href="https://www.instagram.com/loveyourselfbyanastasiya/" target="_blank" rel="noopener noreferrer"
                class="flex-1 flex flex-col items-center justify-center gap-1.5 py-3.5 text-white hover:bg-white/10 active:bg-white/20 transition-colors">
                <i data-lucide="instagram" width="22" height="22"></i>
                <span class="text-[10px] font-semibold tracking-wide">Instagram</span>
            </a>
            <a href="https://wa.me/905385296388" target="_blank" rel="noopener noreferrer"
                class="flex-1 flex flex-col items-center justify-center gap-1.5 py-3.5 text-white hover:bg-white/10 active:bg-white/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path
                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span class="text-[10px] font-semibold tracking-wide">WhatsApp</span>
            </a>
        </div>
    </div>

    <!-- Navbar -->
    <header :class="isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'"
        class="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
        <div class="container mx-auto px-4 md:px-8 max-w-7xl flex items-center justify-between">
            <a href="/" class="relative z-[60] group text-center">
                <span
                    class="block text-xl md:text-2xl font-bold tracking-widest uppercase text-[#2C3E50] transition-colors duration-300">
                    Love Yourself
                </span>
                <span :class="isScrolled ? 'text-[#2C3E50]/70' : 'text-[#2C3E50]/80'"
                    class="block text-[10px] tracking-[0.3em] font-light text-center transition-colors duration-300">
                    BY ANASTASIYA
                </span>
            </a>

            <!-- Desktop Nav -->
            <nav class="hidden lg:flex items-center gap-8">
                <div class="relative" @mouseenter="isServicesDropdownOpen = true"
                    @mouseleave="isServicesDropdownOpen = false">
                    <a href="#services"
                        class="text-[#2C3E50] text-sm font-medium uppercase tracking-wide hover:text-[#A65E6E] transition-colors duration-300 flex items-center gap-1">
                        Hizmetlerimiz
                        <i data-lucide="chevron-down" class="w-4 h-4 transition-transform duration-200"
                            :class="isServicesDropdownOpen ? 'rotate-180' : ''"></i>
                    </a>

                    <!-- Dropdown -->
                    <div x-show="isServicesDropdownOpen" x-transition.opacity.duration.200ms style="display: none;"
                        class="absolute top-full left-0 mt-4 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden min-w-[280px] z-50">
                        <div class="p-2">
                            <?php foreach ($serviceCategories as $i => $cat): ?>
                                <div>
                                    <div class="px-4 py-2 text-xs font-bold text-[#A65E6E] uppercase tracking-widest">
                                        <?= htmlspecialchars($cat['title']) ?>
                                    </div>
                                    <?php foreach ($cat['services'] as $srv): ?>
                                        <a href="hizmet.php?slug=<?= $srv['slug'] ?>"
                                            class="block px-4 py-2.5 text-sm text-[#2C3E50] hover:bg-[#F6D4DB]/30 hover:text-[#A65E6E] rounded-lg transition-colors font-medium">
                                            <?= htmlspecialchars($srv['name']) ?>
                                        </a>
                                    <?php endforeach; ?>
                                    <?php if ($i < count($serviceCategories) - 1): ?>
                                        <div class="my-1 border-t border-gray-100"></div>
                                    <?php endif; ?>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </div>
                <a href="#blog"
                    class="text-[#2C3E50] text-sm font-medium uppercase tracking-wide hover:text-[#A65E6E] transition-colors duration-300">Blog</a>
                <a href="https://wa.me/905385296388" target="_blank"
                    class="text-[#2C3E50] text-sm font-medium uppercase tracking-wide hover:text-[#A65E6E] transition-colors duration-300">İletişim</a>
                <a href="<?= $RANDEVU_URL ?>" target="_blank" rel="noopener noreferrer"
                    class="px-6 py-2 bg-[#A65E6E] hover:bg-[#8E4D5B] text-white text-sm font-semibold uppercase tracking-wide rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Randevu Al
                </a>
            </nav>

            <!-- Mobile Menu Button -->
            <button class="lg:hidden relative z-[60] text-[#A65E6E]" @click="isMobileMenuOpen = !isMobileMenuOpen">
                <template x-if="isMobileMenuOpen">
                    <i data-lucide="x" class="w-8 h-8 text-[#A65E6E]"></i>
                </template>
                <template x-if="!isMobileMenuOpen">
                    <i data-lucide="menu" class="w-8 h-8 text-[#2C3E50]"></i>
                </template>
            </button>
        </div>

        <!-- Mobile Menu Overlay -->
        <div x-show="isMobileMenuOpen" x-transition.opacity style="display: none;"
            class="fixed inset-0 bg-[#F6D4DB] z-[55] flex flex-col items-center justify-center p-8 pt-24 space-y-6 overflow-y-auto min-h-screen">
            <div class="w-full text-center">
                <button @click="mobileServicesOpen = !mobileServicesOpen"
                    class="text-[#2C3E50] text-2xl font-light tracking-wide hover:text-[#A65E6E] transition-colors inline-flex items-center gap-2">
                    Hizmetlerimiz
                    <i data-lucide="chevron-down" class="w-5 h-5 transition-transform duration-200"
                        :class="mobileServicesOpen ? 'rotate-180' : ''"></i>
                </button>
                <div x-show="mobileServicesOpen" x-transition class="overflow-hidden mt-3 space-y-1"
                    style="display: none;">
                    <?php foreach ($serviceCategories as $cat): ?>
                        <div>
                            <div class="text-xs font-bold text-[#A65E6E] uppercase tracking-widest py-2">
                                <?= htmlspecialchars($cat['title']) ?>
                            </div>
                            <?php foreach ($cat['services'] as $srv): ?>
                                <a href="hizmet.php?slug=<?= $srv['slug'] ?>" @click="isMobileMenuOpen = false"
                                    class="block py-1.5 text-[#2C3E50] text-base font-light hover:text-[#A65E6E] transition-colors">
                                    <?= htmlspecialchars($srv['name']) ?>
                                </a>
                            <?php endforeach; ?>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
            <div class="w-full text-center">
                <a href="#blog" @click="isMobileMenuOpen = false"
                    class="text-[#2C3E50] text-2xl font-light tracking-wide hover:text-[#A65E6E] transition-colors">Blog</a>
            </div>
            <div class="w-full text-center">
                <a href="https://wa.me/905385296388" @click="isMobileMenuOpen = false" target="_blank"
                    class="text-[#2C3E50] text-2xl font-light tracking-wide hover:text-[#A65E6E] transition-colors">İletişim</a>
            </div>
            <a href="<?= $RANDEVU_URL ?>" target="_blank"
                class="mt-8 px-8 py-3 bg-[#A65E6E] text-white text-lg font-medium rounded-full"
                @click="isMobileMenuOpen = false">
                Randevu Al
            </a>
        </div>
    </header>