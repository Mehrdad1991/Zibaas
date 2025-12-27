
import { Service, Clinic, Technician, Product } from './types';

export const TRANSLATIONS: any = {
  fa: {
    heroTitle: "تجربه زیبایی با هوش مصنوعی",
    heroSub: "مشاوره تخصصی و رزرو آنلاین بهترین مراکز",
    searchPlaceholder: "جستجوی کلینیک، متخصص یا خدمت...",
    incredibleTitle: "پیشنهادهای شگفت‌انگیز",
    featuredClinics: "کلینیک‌های برتر",
    featuredServices: "خدمات منتخب",
    viewAll: "مشاهده همه",
    bookNow: "رزرو نوبت",
    currency: "تومان",
    aiConsult: "مشاوره صوتی",
    aiAnalysis: "آنالیز چهره AI",
    backToHome: "بازگشت به خانه",
    dir: "rtl"
  },
  en: {
    heroTitle: "AI-Powered Beauty Experience",
    heroSub: "Professional Consultation & Online Booking",
    searchPlaceholder: "Search clinics, specialists, or services...",
    incredibleTitle: "Incredible Offers",
    featuredClinics: "Top Rated Clinics",
    featuredServices: "Featured Services",
    viewAll: "View All",
    bookNow: "Book Now",
    currency: "Toman",
    aiConsult: "Voice Advice",
    aiAnalysis: "AI Face Analysis",
    backToHome: "Back to Home",
    dir: "ltr"
  },
  ar: {
    heroTitle: "تجربة الجمال بالذكاء الاصطناعي",
    heroSub: "استشارة تخصصية وحجز عبر الإنترنت",
    searchPlaceholder: "ابحث عن عيادة أو متخصص أو خدمة...",
    incredibleTitle: "عروض مذهلة",
    featuredClinics: "أفضل العيادات",
    featuredServices: "خدمات مختارة",
    viewAll: "عرض الكل",
    bookNow: "احجز الآن",
    currency: "تومان",
    aiConsult: "استشارة صوتية",
    aiAnalysis: "تحليل الوجه بالذكاء",
    backToHome: "العودة للرئيسية",
    dir: "rtl"
  }
};

export const MOCK_SERVICES: Service[] = [
  { id: '1', name: 'بوتاکس پیشانی (مصپورت)', price: 1200000, duration: 30, category: 'BEAUTY', image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=600' },
  { id: '2', name: 'فیلر لب روسی', price: 3500000, duration: 45, category: 'BEAUTY', image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=600' },
  { id: '3', name: 'رینوپلاستی تخصصی', price: 45000000, duration: 180, category: 'SURGERY', image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600' },
  { id: '4', name: 'لیزر فول بادی تیتانیوم', price: 850000, duration: 60, category: 'BEAUTY', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600' },
  { id: '5', name: 'کاشت مو (Micro FIT)', price: 18000000, duration: 480, category: 'SURGERY', image: 'https://images.unsplash.com/photo-1585747623397-6810c62b2abb?auto=format&fit=crop&q=80&w=600' },
  { id: '6', name: 'مزوژل جالپرو', price: 5200000, duration: 40, category: 'BEAUTY', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600' },
  { id: '7', name: 'فیشیال VIP', price: 1500000, duration: 90, category: 'BEAUTY', image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600' },
  { id: '8', name: 'بلفاروپلاستی پلک بالا', price: 12000000, duration: 120, category: 'SURGERY', image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600' },
];

export const MOCK_TECHNICIANS: Technician[] = [
  {
    id: 't1',
    name: 'استاد الناز رحیمی',
    role: 'متخصص ارشد فیشیال',
    specialty: 'آنالیز ساختاری پوست',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400',
    bio: 'با ۱۲ سال تجربه در کلینیک‌های طراز اول دبی و تهران. متخصص در پروتکل‌های جوانسازی غیرتهاجمی.',
    rating: 4.9,
    reviewCount: 342,
    offeredServices: ['7', '6', '1'],
    isVerified: true,
    portfolio: [
      { id: 'p1', title: 'رفع لک مقاوم', image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=400', description: 'نتیجه پس از ۳ جلسه مزوتراپی.' },
      { id: 'p2', title: 'کانتورینگ صورت', image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=400', description: 'تزریق فیلر شقیقه و چانه.' }
    ]
  },
  {
    id: 't2',
    name: 'دکتر حامد صادقی',
    role: 'جراح زیبایی',
    specialty: 'رینوپلاستی و بلفارو',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    bio: 'عضو انجمن جراحان پلاستیک ایران با سابقه بیش از ۳۰۰۰ عمل موفق جراحی بینی.',
    rating: 4.8,
    reviewCount: 1240,
    offeredServices: ['3', '8', '5'],
    isVerified: true,
    portfolio: [
      { id: 'p3', title: 'بینی استخوانی', image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=400', description: 'مدل طبیعی با حفظ عملکرد تنفسی.' }
    ]
  },
  {
    id: 't3',
    name: 'سارا کریمی',
    role: 'تکنسین ارشد لیزر',
    specialty: 'اپراتور دستگاه تیتانیوم',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ef159963?auto=format&fit=crop&q=80&w=400',
    bio: 'دارای مدرک بین‌المللی کار با دستگاه‌های لیزر الکس و دایود.',
    rating: 4.7,
    reviewCount: 850,
    offeredServices: ['4'],
    isVerified: true,
    portfolio: []
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'سرم هیالورونیک اسید SkinCeuticals',
    brand: 'SkinCeuticals',
    price: 4800000,
    category: 'SKINCARE',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143af7be?auto=format&fit=crop&q=80&w=600',
    description: 'آبرسان فوق قوی برای دوران نقاهت پس از فیشیال و لیزر.',
    specs: { 'حجم': '۳۰ میلی‌لیتر', 'کشور': 'آمریکا' },
    stock: 15
  },
  {
    id: 'p2',
    name: 'دستگاه لیزر تیتانیوم ۲۰۲۴',
    brand: 'Alma',
    price: 950000000,
    category: 'EQUIPMENT',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600',
    description: 'پیشرفته‌ترین دستگاه لیزر حذف موهای زائد با ۳ طول موج همزمان.',
    specs: { 'توان': '2000W', 'سیستم خنک‌کننده': 'Super Ice' },
    stock: 3
  },
  {
    id: 'p3',
    name: 'کرم ترمیم کننده Cicalfate',
    brand: 'Avene',
    price: 850000,
    category: 'AFTERCARE',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600',
    description: 'ترمیم کننده سریع پوست پس از جراحی و تزریق.',
    specs: { 'حجم': '۴۰ میلی‌لیتر', 'نوع': 'آنتی‌باکتریال' },
    stock: 120
  },
  {
    id: 'p4',
    name: 'تخت جراحی برقی ۴ موتوره',
    brand: 'Z-Medical',
    price: 55000000,
    category: 'FURNITURE',
    image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=600',
    description: 'تخت جراحی فول اتوماتیک با قابلیت پوزیشن صندلی و ترندلنبرگ.',
    specs: { 'تعداد موتور': '۴ عدد', 'رنگ': 'سفید صدفی' },
    stock: 8
  }
];

export const MOCK_CLINICS: Clinic[] = [
  { 
    id: 'c1', 
    name: 'کلینیک تخصصی زیبا', 
    location: 'تهران، جردن', 
    rating: 4.9, 
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800', 
    availableRoomsCount: 2, 
    address: 'خیابان نلسون ماندلا، کوچه گلستان، پلاک ۱۲',
    description: 'مجهزترین مرکز درمانی شمال تهران با تخصص در جراحی‌های سرپایی و زیبایی.',
    services: ['1', '2', '4', '6', '7'],
    staff: [],
    gallery: [],
    rooms: [
      { 
        id: 'r1', 
        name: 'اتاق جراحی VIP ۱', 
        pricePerHour: 450000, 
        features: ['تخت ۴ موتوره', 'نور جراحی هوشمند', 'اتوکلاو کلاس B'], 
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800', 
        gallery: [],
        description: 'اتاق عمل جنرال مجهز برای رینوپلاستی و بلفاروپلاستی.',
        isAvailable: true 
      },
      { 
        id: 'r2', 
        name: 'یونیت تزریقات مجهز', 
        pricePerHour: 250000, 
        features: ['مانیتورینگ علائم حیاتی', 'تخت ۳ موتوره'], 
        image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800', 
        gallery: [],
        description: 'مناسب برای تزریق فیلر، بوتاکس و مزوژل در محیطی استریل.',
        isAvailable: true 
      }
    ]
  },
  { 
    id: 'c2', 
    name: 'مرکز جراحی سلامت مهر', 
    location: 'تهران، ونک', 
    rating: 4.7, 
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800', 
    availableRoomsCount: 4, 
    address: 'میدان ونک، ابتدای ملاصدرا، پلاک ۵',
    description: 'قطب جراحی پلاستیک و کاشت مو با کادر مجرب.',
    services: ['3', '5', '8'],
    staff: [],
    gallery: [],
    rooms: [
      { 
        id: 'r3', 
        name: 'اتاق کاشت مو A', 
        pricePerHour: 350000, 
        features: ['صندلی کاشت مو اختصاصی', 'نور سرد', 'تهویه نانو'], 
        image: 'https://images.unsplash.com/photo-1585747623397-6810c62b2abb?auto=format&fit=crop&q=80&w=800', 
        gallery: [],
        description: 'فضای اختصاصی برای تیم‌های کاشت مو با رعایت تمامی پروتکل‌ها.',
        isAvailable: true 
      }
    ]
  }
];

export const getLocalizedServices = (lang: string): Service[] => MOCK_SERVICES.map(s => ({
  ...s,
  name: lang === 'fa' ? s.name : (lang === 'en' ? s.name.replace('بوتاکس', 'Botox').replace('فیلر', 'Filler') : s.name)
}));

export const getLocalizedClinics = (lang: string): Clinic[] => MOCK_CLINICS.map(c => ({
  ...c,
  name: lang === 'fa' ? c.name : (lang === 'en' ? 'Ziba Clinic' : 'عيادة زيبا')
}));

export const SYSTEM_INSTRUCTION = `
You are the AI assistant for Zibaas (زیباست). Help users in their selected language.
Professional, welcoming, and expert in beauty trends.
`;
