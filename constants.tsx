
import { Service, Clinic, Technician, Product } from './types';

export const MOCK_SERVICES: Service[] = [
  { id: '1', name: 'بوتاکس پیشانی', price: 1200000, duration: 30, category: 'BEAUTY', image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=400' },
  { id: '2', name: 'فیلر لب', price: 2500000, duration: 45, category: 'BEAUTY', image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=400' },
  { id: '3', name: 'جراحی بینی', price: 45000000, duration: 180, category: 'SURGERY', image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=400' },
  { id: '4', name: 'لیزر موهای زائد', price: 800000, duration: 60, category: 'BEAUTY', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400' },
  { id: '5', name: 'کاشت مو', price: 15000000, duration: 480, category: 'SURGERY', image: 'https://images.unsplash.com/photo-1585747623397-6810c62b2abb?auto=format&fit=crop&q=80&w=400' },
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

export const MOCK_TECHNICIANS: Technician[] = [
  {
    id: 't1',
    name: 'الناز رحیمی',
    role: 'متخصص زیبایی و فیشیال',
    specialty: 'جوانسازی پوست',
    image: 'https://i.pravatar.cc/150?u=t1',
    bio: 'با بیش از ۸ سال سابقه در زمینه مراقبت‌های پوستی و پاکسازی تخصصی. فارغ‌التحصیل آکادمی‌های معتبر بین‌المللی.',
    rating: 4.9,
    reviewCount: 124,
    offeredServices: ['1', '4'],
    isVerified: true,
    portfolio: [
      { id: 'p1', title: 'درمان آکنه شدید', image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=400', description: 'نتیجه پس از ۳ جلسه پاکسازی تخصصی' },
      { id: 'p2', title: 'جوانسازی دور چشم', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400', description: 'ترکیب مزوتراپی و فیشیال' }
    ]
  },
  {
    id: 't2',
    name: 'حمید صادقی',
    role: 'تکنسین ارشد کاشت مو',
    specialty: 'کاشت مو به روش SUT',
    image: 'https://i.pravatar.cc/150?u=t2',
    bio: 'متخصص کاشت مو و ابرو با بالاترین تراکم ممکن. همکاری با برترین کلینیک‌های تهران و شیراز.',
    rating: 4.7,
    reviewCount: 89,
    offeredServices: ['5'],
    isVerified: true,
    portfolio: [
      { id: 'p3', title: 'کاشت موی سر', image: 'https://images.unsplash.com/photo-1585747623397-6810c62b2abb?auto=format&fit=crop&q=80&w=400', description: 'تراکم بالا پس از ۶ ماه' }
    ]
  }
];

export const MOCK_CLINICS: Clinic[] = [
  { 
    id: 'c1', 
    name: 'کلینیک تخصصی زیبا', 
    location: 'تهران، جردن', 
    rating: 4.8, 
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800', 
    availableRoomsCount: 2, 
    rooms: [
      { 
        id: 'r1', 
        name: 'اتاق VIP شماره ۱', 
        pricePerHour: 250000, 
        features: ['تخت برقی ۴ موتوره', 'نورپردازی تخصصی جراحی', 'اتوکلاو کلاس B اختصاصی', 'کمد ابزار قفل‌دار', 'یخچال دارویی'], 
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800', 
        gallery: [
          'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'این اتاق مجهز به تمامی استانداردهای لازم برای انجام جراحی‌های سرپایی و تزریقات تخصصی است. دکوراسیون مدرن و محیط کاملاً استریل، تجربه‌ای آرام برای پزشک و بیمار فراهم می‌کند.',
        isAvailable: true 
      },
      { 
        id: 'r2', 
        name: 'اتاق جراحی سرپایی', 
        pricePerHour: 450000, 
        features: ['مانیتورینگ علائم حیاتی', 'ساکشن سنترال', 'کپسول اکسیژن', 'تخت ریکاوری'], 
        image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800', 
        gallery: [
          'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'ایده‌آل برای اعمال جراحی کوچک پوست، کاشت مو و بلفاروپلاستی. این فضا دارای تهویه فشار مثبت و سیستم برق اضطراری است.',
        isAvailable: true 
      }
    ],
    services: ['1', '2', '4'],
    description: 'کلینیک تخصصی زیبا با بهره‌گیری از پیشرفته‌ترین تجهیزات روز دنیا و کادری مجرب، آماده ارائه خدمات زیبایی و جوانسازی به شما عزیزان می‌باشد.',
    address: 'تهران، خیابان جردن، کوچه نیلوفر، پلاک ۱۲',
    staff: [
      { id: 's1', name: 'دکتر مریم احمدی', role: 'متخصص پوست و مو', specialty: 'زیبایی و لیزر', image: 'https://i.pravatar.cc/150?u=s1', isPlatformUser: true },
      { id: 's2', name: 'دکتر سهراب مرادی', role: 'جراح پلاستیک', specialty: 'فیلر و جوانسازی', image: 'https://i.pravatar.cc/150?u=s2', isPlatformUser: true }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1504813184591-01592fd03cf7?auto=format&fit=crop&q=80&w=400'
    ]
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
        name: 'یونیت دندانپزشکی A', 
        pricePerHour: 300000, 
        features: ['یونیت مدرن صدرا', 'کمپرسور سایلنت', 'لایت کیور', 'جرم‌گیر پیزو'], 
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800', 
        gallery: [
          'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'یونیت کاملاً مجهز برای انجام کلیه خدمات دندانپزشکی ترمیمی و زیبایی. محیطی دلباز با نور طبیعی.',
        isAvailable: true 
      },
    ],
    services: ['3', '5'],
    description: 'مرکز درمانی سلامت مهر با سابقه‌ای درخشان در جراحی‌های پیچیده و کاشت مو، ایمنی و سلامت شما را اولویت اول خود قرار می‌دهد.',
    address: 'تهران، میدان ونک، ابتدای خیابان ملاصدرا',
    staff: [
      { id: 's3', name: 'دکتر علی کاظمی', role: 'جراح فوق تخصص', specialty: 'راینوپلاستی', image: 'https://i.pravatar.cc/150?u=s3', isPlatformUser: true }
    ],
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
