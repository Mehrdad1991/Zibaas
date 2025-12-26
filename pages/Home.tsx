
import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_SERVICES, MOCK_CLINICS } from '../constants.tsx';

const Home: React.FC = () => {
  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  return (
    <div className="pb-32 overflow-x-hidden animate-in fade-in duration-700">
      {/* Categories */}
      <div className="bg-white px-2 py-6 md:py-10 border-b border-gray-100 mb-2 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex gap-6 md:gap-12 justify-start lg:justify-center px-4">
          {[
            { path: '/search', label: 'خدمات زیبایی', img: 'https://cdn-icons-png.flaticon.com/512/3104/3104631.png' },
            { path: '/surgery', label: 'اتاق عمل', img: 'https://cdn-icons-png.flaticon.com/512/2966/2966486.png' },
            { path: '/analysis', label: 'آنالیز AI', img: 'https://cdn-icons-png.flaticon.com/512/2103/2103533.png' },
            { path: '/store', label: 'فروشگاه کالا', img: 'https://cdn-icons-png.flaticon.com/512/1170/1170678.png' },
          ].map(item => (
            <Link key={item.path} to={item.path} className="flex flex-col items-center gap-3 shrink-0 group">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-50 rounded-full flex items-center justify-center p-4 shadow-sm border border-gray-50 group-hover:border-pink-500 group-hover:bg-white group-hover:shadow-lg transition-all transform group-active:scale-90">
                <img src={item.img} className="w-full h-full object-contain" alt={item.label} />
              </div>
              <span className="text-[10px] md:text-sm font-black text-gray-700 whitespace-nowrap">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 my-6">
        <div className="relative rounded-[32px] md:rounded-[48px] overflow-hidden aspect-[16/9] md:aspect-[16/4.5] bg-gray-900 shadow-2xl group cursor-pointer">
          <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2000ms]" alt="Hero" />
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-transparent to-transparent flex flex-col justify-center items-end px-8 md:px-24 text-white text-right">
            <h1 className="text-2xl md:text-6xl font-black tracking-tighter leading-tight mb-6 drop-shadow-2xl">زیبایی هوشمند، <br/>انتخابی تخصصی</h1>
            <Link to="/search" className="bg-white text-pink-600 px-8 py-3 md:py-4 rounded-2xl text-xs md:text-lg font-black hover:bg-pink-600 hover:text-white transition-all shadow-2xl transform hover:-translate-y-1">شروع آنالیز رایگان چهره</Link>
          </div>
        </div>
      </div>

      {/* Featured Grid */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <h3 className="text-xl md:text-3xl font-black text-gray-900 border-r-4 border-pink-600 pr-4 mb-8">برترین کلینیک‌ها</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {MOCK_CLINICS.map(clinic => (
            <Link 
              key={clinic.id} 
              to={`/clinic/${clinic.id}`}
              className="bg-white border border-gray-100 rounded-[28px] md:rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all group flex flex-col transform hover:-translate-y-2"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img src={clinic.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={clinic.name} />
              </div>
              <div className="p-4 md:p-7 flex-1 flex flex-col gap-2 text-right">
                <h4 className="text-[12px] md:text-xl font-black text-gray-900 line-clamp-1 group-hover:text-pink-600 transition-colors">{clinic.name}</h4>
                <p className="text-[10px] md:text-sm text-gray-400 font-bold">{clinic.location}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
