<?php
require_once 'admin-config.php';

// Handle login
$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    if (verifyAdmin($username, $password)) {
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_user'] = $username;
        header('Location: admin-blog.php');
        exit;
    } else {
        $error = 'Kullanıcı adı veya şifre hatalı.';
    }
}

// If already logged in, redirect
if (isAdminLoggedIn()) {
    header('Location: admin-blog.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Giriş - Love Yourself</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Gowun Batang', serif; }
        .login-bg {
            background: linear-gradient(135deg, #f9def1 0%, #ffffff 50%, #fce4ec 100%);
        }
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        .float-anim { animation: float 3s ease-in-out infinite; }
        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
        .shimmer-border {
            background: linear-gradient(90deg, transparent, #ec4cc7, transparent);
            background-size: 200% 100%;
            animation: shimmer 3s infinite;
        }
    </style>
</head>
<body class="login-bg min-h-screen flex items-center justify-center p-4">

    <div class="w-full max-w-md">
        <!-- Logo -->
        <div class="text-center mb-8 float-anim">
            <a href="/">
                <img src="/public/assets/logo/logo.png" alt="Love Yourself By Anastasiya" class="h-24 mx-auto mb-4" />
            </a>
        </div>

        <!-- Login Card -->
        <div class="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
            <!-- Shimmer top border -->
            <div class="h-1 shimmer-border"></div>

            <div class="p-8 md:p-10">
                <!-- Header -->
                <div class="text-center mb-8">
                    <div class="inline-flex items-center justify-center w-16 h-16 bg-[#ec4cc7]/10 rounded-2xl mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ec4cc7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                    </div>
                    <h1 class="text-2xl font-bold text-[#000000] mb-2">Yönetim Paneli</h1>
                    <p class="text-sm text-[#5D6D7E]">Blog içeriklerinizi yönetmek için giriş yapın</p>
                </div>

                <!-- Error Message -->
                <?php if ($error): ?>
                    <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="12" x2="12" y1="8" y2="12"/>
                            <line x1="12" x2="12.01" y1="16" y2="16"/>
                        </svg>
                        <span class="text-sm text-red-600 font-medium"><?= htmlspecialchars($error) ?></span>
                    </div>
                <?php endif; ?>

                <!-- Form -->
                <form method="POST" class="space-y-5">
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-widest text-[#5D6D7E] mb-2">Kullanıcı Adı</label>
                        <div class="relative">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5D6D7E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-4 top-1/2 -translate-y-1/2 opacity-40">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                            </svg>
                            <input type="text" name="username" required autocomplete="username"
                                class="w-full pl-12 pr-4 py-3.5 bg-[#f9def1]/20 border border-[#ec4cc7]/15 rounded-xl text-sm focus:ring-2 focus:ring-[#ec4cc7]/30 focus:border-[#ec4cc7] outline-none transition-all placeholder:text-[#5D6D7E]/40"
                                placeholder="Kullanıcı adınızı girin" />
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase tracking-widest text-[#5D6D7E] mb-2">Şifre</label>
                        <div class="relative">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5D6D7E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-4 top-1/2 -translate-y-1/2 opacity-40">
                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                            <input type="password" name="password" required autocomplete="current-password"
                                class="w-full pl-12 pr-4 py-3.5 bg-[#f9def1]/20 border border-[#ec4cc7]/15 rounded-xl text-sm focus:ring-2 focus:ring-[#ec4cc7]/30 focus:border-[#ec4cc7] outline-none transition-all placeholder:text-[#5D6D7E]/40"
                                placeholder="Şifrenizi girin" />
                        </div>
                    </div>

                    <button type="submit"
                        class="w-full py-4 bg-[#ec4cc7] hover:bg-[#d43db1] text-white font-bold text-sm uppercase tracking-widest rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl">
                        Giriş Yap
                    </button>
                </form>
            </div>
        </div>

        <!-- Back link -->
        <div class="text-center mt-6">
            <a href="/" class="text-sm text-[#5D6D7E] hover:text-[#ec4cc7] transition-colors">
                ← Ana Sayfaya Dön
            </a>
        </div>
    </div>

</body>
</html>
