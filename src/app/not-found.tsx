import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-[#2C3E50]">
            <h2 className="text-4xl font-bold mb-4">Sayfa Bulunamadı</h2>
            <p className="mb-4 text-lg">Aradığınız sayfaya ulaşılamıyor.</p>
            <Link href="/" className="px-6 py-3 bg-[#A65E6E] text-white rounded-full hover:bg-[#8E4D5B] transition-colors">
                Anasayfaya Dön
            </Link>
        </div>
    )
}
