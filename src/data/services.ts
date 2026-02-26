export interface Service {
    name: string;
    slug: string;
    details: string;
    longDetails: string;
    duration: string;
    image: string;
    heroImage: string;
    features: string[];
}

export interface ServiceCategory {
    title: string;
    slug: string;
    desc: string;
    image: string;
    services: Service[];
}

export const RANDEVU_URL = "https://www.kolayrandevu.com/isletme/loveyourself-by-anastasiya?website=1";

export const serviceCategories: ServiceCategory[] = [
    {
        title: "Cilt Bakımı & Medikal",
        slug: "cilt-bakimi-medikal",
        desc: "Profesyonel cilt analizi ve medikal bakım uygulamalarıyla cildinize özen gösterin",
        image: "/assets/ciltbakimi/cilt_bakimi.jpg",
        services: [
            {
                name: "Medikal Cilt Bakımı",
                slug: "medikal-cilt-bakimi",
                details: "Cildinizin ihtiyacına özel hazırlanan profesyonel medikal bakım seansları ile derinlemesine temizlik ve yenileme.",
                longDetails: "Medikal cilt bakımı, cildinizin ihtiyaçlarına göre özel olarak tasarlanmış profesyonel bir bakım programıdır. Uzman ekibimiz, cilt analizinden sonra size en uygun bakım protokolünü belirler. Hydrafacial, kimyasal peeling ve özel serum uygulamalarını içeren kapsamlı bir bakım deneyimi sunarız. Her seansta, cildinizin doğal parlaklığını ve sağlığını yeniden kazanmasını hedefliyoruz. Dünyaca ünlü medikal ürünler ve minimal invaziv tekniklerle cildiniz yenilenmiş hissedecek.",
                duration: "60 Dakika",
                image: "/assets/ciltbakimi/cilt_bakimi.jpg",
                heroImage: "/assets/ciltbakimi/DSC03380.jpg",
                features: ["Cilt Analizi", "Hydrafacial", "Kimyasal Peeling", "Özel Serumlar", "Anti-Aging"]
            },
            {
                name: "Hydrafacial",
                slug: "hydrafacial",
                details: "Derinlemesine temizlik, eksfoliasyon ve nemlendirme ile cildinize anında parlaklık kazandırın.",
                longDetails: "Hydrafacial, patentli teknolojisiyle cildinizi derinlemesine temizleyen, eksfoliye eden, arındıran ve nemlendiren devrim niteliğinde bir cilt bakım uygulamasıdır. Ağrısız ve kızarıklık bırakmayan bu işlem, tüm cilt tiplerine uygundur. Seans sonrasında cildiniz anında daha parlak, pürüzsüz ve nemli görünür. Gözenekler sıkılaşır, ince çizgiler azalır ve cilt tonu eşitlenir. Her mevsim güvenle yaptırabileceğiniz Hydrafacial ile cildiniz gözle görülür şekilde yenilenir.",
                duration: "45 Dakika",
                image: "/assets/ciltbakimi/DSC03384.jpg",
                heroImage: "/assets/ciltbakimi/cilt_bakimi.jpg",
                features: ["Derinlemesine Temizlik", "Eksfoliasyon", "Nemlendirme", "Anında Sonuç"]
            }
        ]
    },
    {
        title: "Kalıcı Makyaj",
        slug: "kalici-makyaj",
        desc: "Doğal görünümlü, uzun süre kalıcı profesyonel makyaj uygulamaları",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2069&auto=format&fit=crop",
        services: [
            {
                name: "Kalıcı Dudak",
                slug: "kalici-dudak",
                details: "Dudaklarınıza doğal ve dolgun bir görünüm kazandıran kalıcı dudak pigmentasyonu.",
                longDetails: "Kalıcı dudak uygulaması, dudaklarınızın doğal rengini ve şeklini vurgulayan profesyonel bir pigmentasyon işlemidir. Uzman ekibimiz, yüz yapınıza ve ten renginize en uygun tonu belirleyerek dudaklarınıza doğal, dolgun ve çekici bir görünüm kazandırır. Uygulamadan önce topikal anestezi ile konforunuz sağlanır. Sonuç, kalıcı bir güzellik sunar ve günlük makyaj ihtiyacınızı önemli ölçüde azaltır.",
                duration: "90 Dakika",
                image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2069&auto=format&fit=crop",
                heroImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2069&auto=format&fit=crop",
                features: ["Doğal Görünüm", "Kişiye Özel Renk", "Uzun Ömürlü", "Ağrısız"]
            },
            {
                name: "Kalıcı Kaş",
                slug: "kalici-kas",
                details: "Microblading ve ombre tekniğiyle kaşlarınıza doğal ve dolgun bir çerçeve.",
                longDetails: "Kalıcı kaş uygulaması, microblading ve ombre tekniklerinin uzman ellerle uygulanmasıyla kaşlarınıza mükemmel bir şekil ve dolgunluk kazandırır. Yüz yapınız ve istekleriniz doğrultusunda en uygun kaş tasarımı oluşturulur. Kıl kıl tekniği ile son derece doğal bir görünüm elde edilir. İşlem öncesi detaylı ölçüm ve tasarım yapılır, onayınız alındıktan sonra uygulamaya geçilir.",
                duration: "120 Dakika",
                image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop",
                heroImage: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop",
                features: ["Microblading", "Ombre Tekniği", "Doğal Kıl Kıl", "Yüz Analizi"]
            },
            {
                name: "Kalıcı Eyeliner",
                slug: "kalici-eyeliner",
                details: "Gözlerinize derinlik ve ifade katan kalıcı eyeliner uygulaması.",
                longDetails: "Kalıcı eyeliner, gözlerinize her an bakımlı ve çekici bir görünüm kazandırır. İnce çizgi, kalın çizgi veya kirpik dolgusu gibi farklı tekniklerle göz yapınıza en uygun stil belirlenir. Doğal veya dramatik sonuçlar elde edebileceğiniz bu uygulama ile her sabah makyaj derdinize son verin. İşlem, uzman pigmentasyon sanatçılarımız tarafından steril ortamda gerçekleştirilir.",
                duration: "60 Dakika",
                image: "https://images.unsplash.com/photo-1583001809873-a128495da465?q=80&w=2070&auto=format&fit=crop",
                heroImage: "https://images.unsplash.com/photo-1583001809873-a128495da465?q=80&w=2070&auto=format&fit=crop",
                features: ["İnce Çizgi", "Kirpik Dolgusu", "Doğal Görünüm", "Steril Ortam"]
            }
        ]
    },
    {
        title: "Kirpik & Kaş",
        slug: "kirpik-kas",
        desc: "Gözlerinize etkileyici bir çerçeve sunan profesyonel uygulamalar",
        image: "/assets/ipekkirpik/DSC07334.jpg",
        services: [
            {
                name: "İpek Kirpik",
                slug: "ipek-kirpik",
                details: "Doğal ve dolgun kirpiklere kavuşmanızı sağlayan profesyonel ipek kirpik uygulaması.",
                longDetails: "İpek kirpik uygulaması, kendi kirpiklerinizin üzerine tek tek veya hacim tekniğiyle uygulanan premium kalite sentetik kirpiklerdir. Doğal görünümlü, hafif ve konforlu olan ipek kirpikler, gözlerinize dramatik bir derinlik kazandırır. Klasik, hacim (volume) ve mega hacim seçenekleriyle istediğiniz yoğunluğu elde edebilirsiniz. Dolgu seanslarıyla kirpikleriniz her zaman bakımlı kalır. Uygulama göz sağlığına zarar vermez.",
                duration: "90 Dakika",
                image: "/assets/ipekkirpik/DSC07334.jpg",
                heroImage: "https://images.unsplash.com/photo-1583001809873-a128495da465?q=80&w=2070&auto=format&fit=crop",
                features: ["Klasik Teknik", "Volume Teknik", "Doğal Görünüm", "Hafif & Konforlu"]
            },
            {
                name: "Kirpik Lifting",
                slug: "kirpik-lifting",
                details: "Kendi doğal kirpiklerinizi kaldırıp kıvırarak etkileyici bir görünüm elde edin.",
                longDetails: "Kirpik lifting, kendi doğal kirpiklerinizi özel solüsyonlarla kaldırarak kalıcı bir kıvırma işlemidir. Kirpikleriniz daha uzun ve daha kıvrık görünür, gözleriniz daha açık ve canlı bir ifade kazanır. İşlem son derece güvenli ve kısa sürede uygulanır. Kirpik boyama ile birlikte yapıldığında, maskarasız bile muhteşem kirpiklere sahip olursunuz. Sonuç 6-8 hafta kadar devam eder.",
                duration: "45 Dakika",
                image: "/assets/ipekkirpik/DSC07338.jpg",
                heroImage: "/assets/ipekkirpik/DSC07338.jpg",
                features: ["Doğal Kıvrım", "Kirpik Boyama", "6-8 Hafta Kalıcı", "Güvenli"]
            }
        ]
    },
    {
        title: "Epilasyon",
        slug: "epilasyon",
        desc: "En son teknoloji ile kalıcı ve ağrısız tüy azaltma çözümleri",
        image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=2070&auto=format&fit=crop",
        services: [
            {
                name: "Lazer Epilasyon",
                slug: "lazer-epilasyon",
                details: "Son teknoloji lazer cihazlarıyla kalıcı ve ağrısız tüy azaltma uygulaması.",
                longDetails: "Lazer epilasyon, yüksek teknolojili lazer cihazlarımızla istenmeyen tüylerden kalıcı olarak kurtulmanızı sağlar. Tüm cilt tiplerine uygun cihaz seçeneklerimizle güvenli ve etkili sonuçlar elde edersiniz. Soğutma sistemi sayesinde işlem sırasında minimum rahatsızlık hissedersiniz. Yüz, koltuk altı, bikini, bacak ve tüm vücut bölgelerinde uygulanabilir. Seans programınız kişisel tüy yapınıza göre planlanır.",
                duration: "30-60 Dakika",
                image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=2070&auto=format&fit=crop",
                heroImage: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=2070&auto=format&fit=crop",
                features: ["Son Teknoloji", "Tüm Cilt Tipleri", "Soğutma Sistemi", "Kalıcı Sonuç"]
            },
            {
                name: "İğneli Epilasyon",
                slug: "igneli-epilasyon",
                details: "Kalıcı tüy yok etme garantisi sunan iğneli epilasyon uygulaması.",
                longDetails: "İğneli epilasyon, tüy kökünü tamamen yok eden ve kalıcı sonuç garantisi sunan en etkili epilasyon yöntemidir. Lazer epilasyonun yetersiz kaldığı açık renkli, ince veya beyaz tüylerde bile başarılı sonuçlar verir. Her bir tüy kökü tek tek işlenir ve bir daha çıkmayacak şekilde yok edilir. Deneyimli uzmanlarımız tarafından hijyenik koşullarda ve tek kullanımlık iğnelerle uygulanır.",
                duration: "30-60 Dakika",
                image: "https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=2070&auto=format&fit=crop",
                heroImage: "https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=2070&auto=format&fit=crop",
                features: ["%100 Kalıcı", "Tüm Tüy Renkleri", "Tek Kullanımlık İğne", "Uzman Uygulama"]
            }
        ]
    },
    {
        title: "Vücut Bakımı & Zayıflama",
        slug: "vucut-bakimi-zayiflama",
        desc: "Bölgesel zayıflama ve vücut şekillendirme programları",
        image: "/assets/Masaj/_DSC5325.jpg",
        services: [
            {
                name: "Bölgesel Zayıflama",
                slug: "bolgesel-zayiflama",
                details: "Lenfatik drenaj ve özel tekniklerle bölgesel yağ yakımı ve vücut şekillendirme.",
                longDetails: "Bölgesel zayıflama programımız, lenfatik drenaj masajı, kavitasyon ve radyofrekans gibi ileri teknoloji cihazlarla desteklenen kapsamlı bir vücut şekillendirme programıdır. Karın, basen, bacak ve kol bölgelerindeki inatçı yağ birikintilerini hedef alır. Kombo bölgesel şekillendirme paketlerimizle etkili sonuçlar elde edebilirsiniz. Her seans öncesi vücut analizi yapılır ve kişisel program oluşturulur.",
                duration: "60 Dakika",
                image: "/assets/zayiflama/_DSC0055.jpg",
                heroImage: "/assets/zayiflama/DSC0055.jpg",
                features: ["Lenfatik Drenaj", "Kavitasyon", "Radyofrekans", "Vücut Analizi"]
            },
            {
                name: "Medikal Masaj",
                slug: "medikal-masaj",
                details: "Terapötik masaj teknikleriyle kas ağrılarını giderin ve bedeninizi yenileyin.",
                longDetails: "Medikal masaj, terapötik amaçlı uygulanan profesyonel masaj tekniklerini içerir. Kas ağrıları, sırt ağrısı, boyun tutulması ve stres kaynaklı gerginliklere karşı etkili bir çözüm sunar. Uzman terapistlerimiz, ihtiyacınıza göre derin doku masajı, İsveç masajı veya lenfatik drenaj masajı uygular. Her seans sonrası kaslarınız gevşer, kan dolaşımınız hızlanır ve kendinizi yenilenmiş hissedersiniz.",
                duration: "50 Dakika",
                image: "/assets/Masaj/_DSC5331.jpg",
                heroImage: "/assets/Masaj/_DSC5331.jpg",
                features: ["Derin Doku", "Lenfatik Drenaj", "Stres Giderme", "Kan Dolaşımı"]
            }
        ]
    },
    {
        title: "Tırnak Bakımı",
        slug: "tirnak-bakimi",
        desc: "Kusursuz tırnak bakımı ve profesyonel protez tırnak uygulamaları",
        image: "/assets/Oje/DSC03024.jpg",
        services: [
            {
                name: "Protez Tırnak",
                slug: "protez-tirnak",
                details: "Doğal görünümlü, uzun ömürlü protez tırnak uygulamaları.",
                longDetails: "Protez tırnak uygulamamız, doğal görünümlü ve uzun ömürlü sonuçlar sunar. Akrilik, jel ve polyester gel seçenekleriyle istediğiniz uzunluk ve şekilde tırnaklar elde edebilirsiniz. Uzman teknikerlerimiz, en kaliteli malzemeleri kullanarak tırnaklarınızı güçlendirir ve estetik bir görünüm kazandırır. Düzenli dolgu seansları ile tırnaklarınız her zaman kusursuz kalır.",
                duration: "60 Dakika",
                image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2070&auto=format&fit=crop",
                heroImage: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2070&auto=format&fit=crop",
                features: ["Akrilik", "Jel", "Doğal Görünüm", "Uzun Ömürlü"]
            },
            {
                name: "Manikür & Pedikür",
                slug: "manikur-pedikur",
                details: "Ellerinize ve ayaklarınıza profesyonel bakım sunan özel manikür ve pedikür uygulamaları.",
                longDetails: "Manikür ve pedikür hizmetimizde, ellerinize ve ayaklarınıza kapsamlı bir bakım sunuyoruz. Tırnak şekillendirme, tırnak eti bakımı, el ve ayak masajı, peeling ve oje uygulaması içeren tam bir bakım deneyimi. Klasik, jel ve spa manikür-pedikür seçeneklerimizle elleriniz ve ayaklarınız bakımlı ve sağlıklı görünecek. Kullandığımız premium ürünlerle tırnaklarınız güçlü ve sağlıklı kalır.",
                duration: "45 Dakika",
                image: "/assets/Oje/DSC03032.jpg",
                heroImage: "/assets/Oje/DSC03032.jpg",
                features: ["Tırnak Şekillendirme", "El & Ayak Masajı", "Jel Oje", "Peeling"]
            }
        ]
    }
];

// Helper function to find a service by slug
export function getServiceBySlug(slug: string): { service: Service; category: ServiceCategory } | null {
    for (const category of serviceCategories) {
        const service = category.services.find(s => s.slug === slug);
        if (service) {
            return { service, category };
        }
    }
    return null;
}

// Get all service slugs for static generation
export function getAllServiceSlugs(): string[] {
    return serviceCategories.flatMap(cat => cat.services.map(s => s.slug));
}
