
import React from 'react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (p: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart }) => {
  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <button 
        onClick={onBack}
        className="mb-10 flex items-center gap-3 text-slate-400 hover:text-pink-600 font-black transition-all group"
      >
        <svg className="h-6 w-6 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 12H5M12 19l-7-7 7-7" /></svg>
        بازگشت به فروشگاه
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Gallery Section */}
        <div className="lg:col-span-6 space-y-6">
           <div className="aspect-square rounded-[60px] overflow-hidden bg-white border border-slate-50 shadow-2xl p-10 flex items-center justify-center">
              <img src={product.image} className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-700" alt={product.name} />
           </div>
           <div className="grid grid-cols-4 gap-4">
              {[product.image, product.image, product.image, product.image].map((img, i) => (
                <div key={i} className="aspect-square rounded-3xl overflow-hidden border border-slate-100 bg-white p-2 cursor-pointer hover:border-pink-500 transition-all">
                   <img src={img} className="w-full h-full object-contain" alt="" />
                </div>
              ))}
           </div>
        </div>

        {/* Info Section */}
        <div className="lg:col-span-6 text-right space-y-10 flex flex-col justify-center">
           <div className="space-y-4">
              <div className="flex items-center justify-end gap-3 text-pink-600">
                 <span className="text-xs font-black uppercase tracking-widest">{product.brand} Official</span>
                 <div className="w-2 h-2 bg-pink-600 rounded-full animate-pulse"></div>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-tight">{product.name}</h1>
              <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed italic opacity-80">{product.description}</p>
           </div>

           <div className="bg-white p-10 rounded-[50px] border border-slate-50 shadow-sm space-y-8">
              <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-6">
                 <div className="text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Final Price</p>
                    <div className="flex items-center gap-2">
                       <span className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">{toPersianDigits(product.price.toLocaleString())}</span>
                       <span className="text-sm font-black text-slate-400">تومان</span>
                    </div>
                 </div>
                 <div className="bg-emerald-50 text-emerald-600 px-6 py-3 rounded-2xl border border-emerald-100 font-black text-xs">
                    تضمین اصالت کالا Zibaas Verified
                 </div>
              </div>
              
              <button 
                onClick={() => onAddToCart(product)}
                className="w-full py-8 bg-slate-900 text-white rounded-[40px] font-black text-2xl shadow-3xl shadow-slate-100 hover:bg-pink-600 transition-all active:scale-95 flex items-center justify-center gap-4"
              >
                افزودن به سبد خرید
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </button>
           </div>

           {/* Technical Specs */}
           <div className="space-y-6">
              <h3 className="text-2xl font-black text-slate-900 border-r-8 border-pink-600 pr-6 tracking-tighter">مشخصات فنی</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {Object.entries(product.specs).map(([key, val], i) => (
                   <div key={i} className="flex justify-between items-center p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="font-black text-slate-900 text-sm">{val}</span>
                      <span className="text-xs font-bold text-slate-400">{key}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
