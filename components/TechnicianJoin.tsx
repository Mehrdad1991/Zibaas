
import React from 'react';

interface TechnicianJoinProps {
  onStart: () => void;
}

const TechnicianJoin: React.FC<TechnicianJoinProps> = ({ onStart }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-block bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full text-sm font-bold">
            فرصت ویژه برای فریلنسرهای زیبایی
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight">
            کسب‌وکار شخصی‌ات را در <span className="text-pink-600">Zibaas</span> حرفه‌ای کن
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            دیگر نگران کلینیک و تجهیزات نباشید. ما بهترین اتاق‌های مجهز را در برترین نقاط شهر در اختیار شما می‌گذاریم تا فقط روی هنر خود تمرکز کنید.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { t: 'درآمد بیشتر', d: 'حذف واسطه‌ها و دریافت مستقیم هزینه از مشتری' },
              { t: 'برند شخصی', d: 'پروفایل اختصاصی و نمایش پورتفولیو حرفه‌ای' },
              { t: 'اتاق‌های مجهز', d: 'اجاره ساعتی یا روزانه مجهزترین اتاق‌های کلینیک' },
              { t: 'هوش مصنوعی', d: 'معرفی هوشمند شما به مشتریان بر اساس تخصص' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-pink-500 flex-shrink-0 mt-1 flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{item.t}</h4>
                  <p className="text-sm text-gray-400">{item.d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <button 
              onClick={onStart}
              className="bg-pink-600 text-white px-10 py-5 rounded-3xl font-black text-lg shadow-2xl shadow-pink-200 hover:bg-pink-700 hover:scale-105 transition-all"
            >
              همین حالا شروع کنید (رایگان)
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-pink-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse delay-700"></div>
          
          <div className="relative bg-white p-8 rounded-[40px] shadow-2xl border border-gray-50 overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=800" 
              className="rounded-3xl w-full h-[500px] object-cover" 
              alt="Professional Technician"
            />
            <div className="absolute bottom-12 left-12 right-12 bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-pink-600 flex items-center justify-center text-white text-xl">✨</div>
                  <div>
                    <p className="text-gray-400 text-xs">بیش از ۵۰۰ متخصص</p>
                    <p className="font-black text-gray-900">به جامعه Zibaas پیوسته‌اند</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="mt-32 text-center">
        <h2 className="text-3xl font-black text-gray-900 mb-16">مسیر حرفه‌ای شدن در ۴ قدم</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           {[
             { n: '۰۱', t: 'ثبت‌نام و احراز', d: 'مدارک تخصصی خود را آپلود کنید' },
             { n: '۰۲', t: 'ایجاد پورتفولیو', d: 'بهترین کارهایتان را به نمایش بگذارید' },
             { n: '۰۳', t: 'اجاره اتاق', d: 'کلینیک و زمان دلخواه را رزرو کنید' },
             { n: '۰۴', t: 'شروع پذیرش', d: 'از طریق سیستم هوشمند مشتری بگیرید' },
           ].map((step, i) => (
             <div key={i} className="relative group">
                <div className="text-6xl font-black text-pink-50 mb-4 group-hover:text-pink-100 transition-colors">{step.n}</div>
                <h4 className="text-xl font-black text-gray-900 mb-2">{step.t}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{step.d}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default TechnicianJoin;
