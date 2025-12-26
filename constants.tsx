
import { Service, Clinic, Technician, Product } from './types';

export const MOCK_SERVICES: Service[] = [
  { id: '1', name: 'بوتاکس پیشانی', price: 1200000, duration: 30, category: 'BEAUTY', image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=400' },
  { id: '2', name: 'فیلر لب', price: 2500000, duration: 45, category: 'BEAUTY', image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=400' },
  { id: '3', name: 'جراحی بینی', price: 45000000, duration: 180, category: 'SURGERY', image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=400' },
  { id: '4', name: 'لیزر موهای زائد', price: 800000, duration: 60, category: 'BEAUTY', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400' },
  { id: '5', name: 'کاشت مو', price: 15000000, duration: 480, category: 'SURGERY', image: 'https://images.unsplash.com/photo-1585747623397-6810c62b2abb?auto=format&fit=crop&q=80&w=400' },
];

export const MOCK_TECHNICIANS: Technician[] = [
  {
    id: 't1',
    name: 'استاد الناز رحیمی',
    role: 'متخصص ارشد فیشیال و جوانسازی',
    specialty: 'آنالیز ساختاری پوست',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400',
    bio: 'با بیش از ۱۲ سال تجربه در کلینیک‌های طراز اول تهران و دبی. مدرس تکنیک‌های نوین پاکسازی در آکادمی Zibaas.',
    philosophy: 'زیبایی یک فرآیند بیولوژیکی است، نه یک تغییر ناگهانی. من بر حفظ ساختار طبیعی چهره تمرکز دارم.',
    experienceYears: 12,
    awards: ['تکنسین برتر سال ۱۴۰۲', 'گواهینامه تخصصی پوست از آکادمی پاریس'],
    rating: 4.9,
    reviewCount: 342,
    offeredServices: ['1', '4'],
    isVerified: true,
    portfolio: [
      { id: 'p1', title: 'اصلاح کانتورینگ صورت', image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=400', description: 'ترکیب تکنیک‌های غیرتهاجمی برای زاویه‌سازی فک.', tag: 'VIP Case' },
      { id: 'p2', title: 'درمان هایپرپیگمانتاسیون', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400', description: 'رفع لک‌های مقاوم به درمان طی ۵ جلسه.', tag: 'Success Story' }
    ]
  },
  {
    id: 't2',
    name: 'دکتر حمید صادقی',
    role: 'جراح و تکنسین ارشد کاشت مو',
    specialty: 'تکنیک Micro-FIT اختصاصی',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    bio: 'پیشرو در متدهای نوین کاشت مو با تراکم حداکثری. دارای سابقه همکاری با بیش از ۲۰ مرکز فوق‌تخصصی در خاورمیانه.',
    philosophy: 'خط رویش مو، امضای یک جراح است. من برای هر مراجع یک طراحی منحصر به فرد انجام می‌دهم.',
    experienceYears: 15,
    awards: ['نشان طلای نوآوری در جراحی زیبایی', 'عضو انجمن جراحان موی آسیا'],
    rating: 4.8,
    reviewCount: 1240,
    offeredServices: ['5'],
    isVerified: true,
    portfolio: [
      { id: 'p3', title: 'کاشت فول‌تراکم جلو سر', image: 'https://images.unsplash.com/photo-1585747623397-6810c62b2abb?auto=format&fit=crop&q=80&w=400', description: 'استفاده از تکنیک انحصاری SUT Plus برای تراکم فوق‌العاده.', tag: 'Artistic Line' }
    ]
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'دستگاه لیزر تیتانیوم ۲۰۲۴',
    brand: 'Alma',
    price: 850000000,
    category: 'EQUIPMENT',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600',
    description: 'پیشرفته‌ترین دستگاه لیزر حذف موهای زائد با سه طول موج همزمان و سیستم خنک‌کنندگی فوق‌العاده.',
    specs: { 'طول موج': '755/810/1064 nm', 'توان': '2000W', 'گارانتی': '۲۴ ماه طلایی' },
    stock: 5,
    isFeatured: true
  },
  {
    id: 'p2',
    name: 'بوتاکس مصپورت ۵۰۰ واحدی',
    brand: 'Masport',
    price: 1850000,
    category: 'CONSUMABLE',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600',
    description: 'پرفروش‌ترین بوتاکس ایرانی با تاییدیه وزارت بهداشت، کیفیت رقابتی و ماندگاری بالا.',
    specs: { 'حجم': '۵۰۰ واحد', 'نگهداری': '۲ تا ۸ درجه سانتی‌گراد', 'کشور': 'ایران' },
    stock: 120
  },
  {
    id: 'p3',
    name: 'تخت جراحی ۴ موتوره پوست',
    brand: 'Z-Medical',
    price: 45000000,
    category: 'FURNITURE',
    image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=600',
    description: 'تخت فول برقی با قابلیت تنظیم ارتفاع، شیب پا و کمر. دارای چرم مصنوعی آنتی‌باکتریال.',
    specs: { 'تعداد موتور': '۴ عدد', 'تحمل وزن': '۲۰۰ کیلوگرم', 'رنگ': 'سفید صدفی' },
    stock: 8,
    isFeatured: true
  },
  {
    id: 'p4',
    name: 'سرم جوانساز هیالورونیک اسید',
    brand: 'SkinCeuticals',
    price: 3200000,
    category: 'SKINCARE',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143af7be?auto=format&fit=crop&q=80&w=600',
    description: 'فرمولاسیون حرفه‌ای برای آبرسانی عمیق و رفع چروک‌های سطحی، مناسب برای استفاده بعد از فیشیال.',
    specs: { 'حجم': '۳۰ میلی‌لیتر', 'مناسب': 'انواع پوست', 'تولید': 'آمریکا' },
    stock: 45
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
    rooms: [
      { 
        id: 'r1', 
        name: 'اتاق جراحی VIP ۱', 
        pricePerHour: 450000, 
        features: ['تخت برقی ۴ موتوره', 'نورپردازی تخصصی جراحی', 'اتوکلاو کلاس B اختصاصی', 'کمد ابزار قفل‌دار', 'یخچال دارویی'], 
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800', 
        gallery: [],
        description: 'این اتاق مجهز به تمامی استانداردهای لازم برای انجام جراحی‌های سرپایی و تزریقات تخصصی است.',
        isAvailable: true,
        type: 'SURGERY'
      },
      { 
        id: 'r2', 
        name: 'اتاق تزریق و زیبایی ۲', 
        pricePerHour: 250000, 
        features: ['تخت ۳ موتوره', 'پمپ تزریق', 'مانیتورینگ علائم حیاتی'], 
        image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800', 
        gallery: [],
        description: 'مناسب برای تزریق فیلر، بوتاکس و مزوتراپی در محیطی کاملاً استریل.',
        isAvailable: true,
        type: 'SURGERY'
      }
    ],
    services: ['1', '2', '4'],
    description: 'کلینیک تخصصی زیبا با ۱۰ سال سابقه و بیش از ۵۰۰۰ پرونده موفق، رتبه ۱ جراحی‌های سرپایی در منطقه جردن را داراست.',
    address: 'تهران، خیابان جردن، کوچه نیلوفر، پلاک ۱۲',
    staff: [],
    gallery: []
  },
  { 
    id: 'c2', 
    name: 'بیمارستان سلامت مهر', 
    location: 'تهران، ونک', 
    rating: 4.5, 
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800', 
    availableRoomsCount: 4, 
    rooms: [
      { 
        id: 'r3', 
        name: 'اتاق عمل شماره ۳', 
        pricePerHour: 600000, 
        features: ['تجهیزات کامل بیهوشی', 'تخت جراحی هیدرولیک', 'مانیتورینگ پیشرفته'], 
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800', 
        gallery: [],
        description: 'اتاق عمل جنرال با قابلیت انجام جراحی‌های زیبایی سنگین تحت بیهوشی کامل.',
        isAvailable: true,
        type: 'SURGERY'
      },
      { 
        id: 'r4', 
        name: 'یونیت کاشت مو A', 
        pricePerHour: 350000, 
        features: ['صندلی مخصوص کاشت مو', 'میکروسکوپ‌های نوری', 'نور سرد'], 
        image: 'https://images.unsplash.com/photo-1585747623397-6810c62b2abb?auto=format&fit=crop&q=80&w=400', 
        gallery: [],
        description: 'فضای اختصاصی برای تیم‌های کاشت مو با تهویه مخصوص.',
        isAvailable: true,
        type: 'SURGERY'
      }
    ],
    services: ['3', '5'],
    description: 'مرکز درمانی سلامت مهر، قطب جراحی‌های زیبایی با کادر پزشکی تمام وقت و مجهزترین آی‌سی‌یو پشتیبان.',
    address: 'تهران، میدان ونک، ابتدای خیابان ملاصدرا',
    staff: [],
    gallery: []
  },
];

export const SYSTEM_INSTRUCTION = `
You are the AI assistant for Zibaas (زیباست), a premier Iranian platform for beauty and medical bookings.
Your goal is to help users find the right clinics, technicians, and book services or rent rooms.
Available services include: ${MOCK_SERVICES.map(s => s.name).join(', ')}.
Available clinics include: ${MOCK_CLINICS.map(c => c.name).join(', ')}.
Be polite, professional, and helpful. Always respond in Persian (Farsi).
Encourage users to book services or rent rooms through the platform.
`;
