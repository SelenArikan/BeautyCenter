import { NextResponse } from 'next/server';

// Real Google reviews from "Love Yourself by Anastasiya"
// Güzelce, Geçit Cd. no:9 D:3D, 34530 Büyükçekmece/İstanbul
const reviewsData = {
    rating: 5.0,
    totalReviews: 22,
    reviews: [
        {
            author_name: "Müşteri",
            rating: 5,
            text: "Temiz bir işletme, ilgili ve güler yüzlü çalışanlar. Gönül rahatlığıyla gidebilirsiniz.",
            time: Math.floor(Date.now() / 1000) - 86400 * 10,
            profile_photo_url: "",
            relative_time_description: "2 hafta önce"
        },
        {
            author_name: "Müşteri",
            rating: 5,
            text: "Temiz ve güvenilir işletme. Sara'ya defalarca işleme gittim ve hepsinden ayrı memnunum, teşekkür ederim.",
            time: Math.floor(Date.now() / 1000) - 86400 * 20,
            profile_photo_url: "",
            relative_time_description: "3 hafta önce"
        },
        {
            author_name: "Müşteri",
            rating: 5,
            text: "Cilt bakımı manikür ve pedikür yaptırdım çok memnun kaldım. Hydro facial ve lazer epilasyon için randevu istiyorum, en yakın zamanda lütfen.",
            time: Math.floor(Date.now() / 1000) - 86400 * 30,
            profile_photo_url: "",
            relative_time_description: "bir ay önce"
        },
        {
            author_name: "Müşteri",
            rating: 5,
            text: "Aşırı aşırı güzel çok beğendim. Esra hanıma çok teşekkür ederim hayallerimdeki gibi ♡♡",
            time: Math.floor(Date.now() / 1000) - 86400 * 40,
            profile_photo_url: "",
            relative_time_description: "bir ay önce"
        },
        {
            author_name: "Müşteri",
            rating: 5,
            text: "I had a very good manicure and pedicure. All traces of dead skin were carefully removed without any pain. I also had a Hydrafacial.",
            time: Math.floor(Date.now() / 1000) - 86400 * 50,
            profile_photo_url: "",
            relative_time_description: "2 ay önce"
        }
    ]
};

export async function GET() {
    return NextResponse.json(reviewsData);
}
