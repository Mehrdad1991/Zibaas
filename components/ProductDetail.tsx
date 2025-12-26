
import React from 'react';
import { Product } from '../types';
import { MOCK_SERVICES } from '../constants';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (p: Product) => void;
  onBookService?: (s: any) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart, onBookService }) => {
  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  // Logic to show related services for "Visual Lock-in"
  const getRelatedServices = () => {
    if (product.category === 'SKINCARE' || product.category === 'CONSUMABLE') {
      return MOCK_SERVICES.filter(s => s.category === 'BEAUTY').slice(0, 2);
    }
    if (product.category === 'AFTERCARE') {
      return MOCK_SERVICES.filter(s => s.category === 'SURGERY').slice(0, 2);
    }
    return [];
  };

  const relatedServices = getRelatedServices();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-5 duration-700 text-right">
      <button 
        onClick={onBack}
        className="mb-10 flex items-center justify-end gap-3 text-slate-400 hover:text-pink-600 font-black transition-all group"
      >
        بازگشت به فروشگاه
        <svg className="h-6 w-6 group-hover:translate-x-[-4px] transition-transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 12H5M12 19l-7-7 7-7" /></svg>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Info Section */}
        <div className="lg:col-span-7 space-y-12">
           <div className="space-y-6">
              <div className="flex items-center justify-end gap-3 text-pink-600">
                 <span className="text-xs font-black uppercase tracking-widest">{product.brand} Official Partner</span>
                 <div className="w-2 h-2 bg-pink-600 rounded-full animate-pulse"></div>
              </div>
              <h1 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter leading-tight">{product.name}</h1>
              <p className="text-slate-400 text-xl md:text-2xl font-medium leading-relaxed italic opacity-80">{product.description}</p>
           </div>

           <div className="bg-white p-10 md:p-14 rounded-[60px] border-2 border-slate-50 shadow-sm space-y-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-pink-50 rounded-br-full -z-10"></div>
              <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                 <div className="text-center md:text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Certified Pricing</p>
                    <div className="flex items-center gap-2">
                       <span className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter">{toPersianDigits(product.price.toLocaleString())}</span>
                       <span className="text-sm font-black text-slate-400">تومان</span>
                    </div>
                 </div>
                 
                 <button 
                   onClick={() => onAddToCart(product)}
                   className="w-full md:w-auto px-16 py-8 bg-slate-900 text-white rounded-[40px] font-black text-2xl shadow-3xl shadow-slate-100 hover:bg-pink-600 transition-all active:scale-95 flex items-center justify-center gap-6"
                 >
                   افزودن به سبد خرید
                   <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                 </button>
              </div>
           </div>

           {/* Integrated Services (The Visual Lock-in) */}
           {relatedServices.length > 0 && (
             <div className="space-y-8 pt-10">
                <div className="flex flex-col items-end">
                   <h3 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter border-r-8 border-pink-600 pr-6">این محصول را برای کدام خدمت می‌خواهید؟</h3>
                   <p className="text-slate-400 font-bold mt-2">رزرو نوبت همزمان با خرید محصول، شامل تخفیف ویژه پکیج Zibaas می‌شود.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {relatedServices.map(service => (
                     <div key={service.id} className="bg-pink-50/50 p-6 rounded-[40px] border border-pink-100 flex flex-row-reverse items-center gap-5 hover:bg-pink-50 transition-colors">
                        <img src={service.image} className="w-20 h-20 rounded-3xl object-cover shadow-lg" alt="" />
                        <div className="flex-1">
                           <h4 className="font-black text-slate-900 text-lg">{service.name}</h4>
                           <button 
                             onClick={() => onBookService?.(service)}
                             className="text-pink-600 font-black text-xs mt-1 hover:underline"
                           >
                              رزرو نوبت اجرایی ←
                           </button>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
           )}

           {/* Specs Grid */}
           <div className="space-y-6">
              <h3 className="text-2xl font-black text-slate-900 border-r-8 border-pink-600 pr-6 tracking-tighter">مشخصات فنی و اصالت</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {Object.entries(product.specs).map(([key, val], i) => (
                   <div key={i} className="flex justify-between items-center p-6 bg-white rounded-[30px] border border-slate-50 shadow-sm">
                      <span className="font-black text-slate-900 text-sm">{val}</span>
                      <span className="text-xs font-bold text-slate-400">{key}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Gallery Section */}
        <div className="lg:col-span-5 space-y-8">
           <div className="aspect-[4/5] rounded-[80px] overflow-hidden bg-white border-4 border-white shadow-4xl p-12 flex items-center justify-center sticky top-32">
              <img src={product.image} className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-[2000ms]" alt={product.name} />
              <div className="absolute bottom-12 right-12 bg-white/90 backdrop-blur-xl p-4 rounded-3xl shadow-xl border border-slate-100">
                 <div className="flex gap-1 text-amber-400 text-2xl">★★★★★</div>
                 <p className="text-[10px] font-black text-slate-400 mt-1 uppercase text-center">Verified Authenticity</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
