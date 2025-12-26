
import React from 'react';
import { CartItem, Product } from '../types';

interface CartPageProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onGoToCheckout: () => void;
  onNavigate: (tab: any) => void;
}

const CartPage: React.FC<CartPageProps> = ({ cart, onUpdateQuantity, onGoToCheckout, onNavigate }) => {
  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  
  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-32 px-6 text-center space-y-10 animate-in fade-in zoom-in duration-500">
        <div className="text-9xl opacity-20">🛒</div>
        <div className="space-y-4 text-right md:text-center">
           <h2 className="text-4xl font-black text-slate-900 tracking-tighter">سبد خرید شما فعلاً خالی است</h2>
           <p className="text-slate-400 font-bold text-lg leading-relaxed">محصولات مراقبتی یا تجهیزات مورد نیاز خود را به سبد اضافه کنید.</p>
        </div>
        <button 
          onClick={() => onNavigate('store')}
          className="bg-pink-600 text-white px-12 py-5 rounded-[28px] font-black text-xl shadow-2xl shadow-pink-100 hover:bg-pink-700 transition-all active:scale-95"
        >
          ورود به فروشگاه Zibaas
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700 text-right">
      <div className="flex flex-col md:flex-row-reverse justify-between items-end mb-16 gap-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">سبد خرید شما</h1>
          <p className="text-slate-400 font-bold text-lg mt-2">مدیریت اقلام انتخابی و بررسی نهایی</p>
        </div>
        <button onClick={() => onNavigate('store')} className="text-pink-600 font-black flex items-center gap-2 group hover:gap-4 transition-all">
           افزودن کالای جدید
           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-6">
          {cart.map((item) => (
            <div key={item.product.id} className="bg-white p-6 md:p-8 rounded-[45px] border border-slate-100 shadow-sm flex flex-col md:flex-row-reverse items-center gap-8 group hover:shadow-xl transition-all duration-500">
               <div className="w-32 h-32 md:w-44 md:h-44 bg-slate-50 rounded-[35px] overflow-hidden p-6 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <img src={item.product.image} className="max-w-full max-h-full object-contain" alt={item.product.name} />
               </div>
               
               <div className="flex-1 text-right space-y-4 w-full">
                  <div className="flex flex-col md:flex-row-reverse justify-between items-start md:items-center gap-4">
                     <div>
                        <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest">{item.product.brand}</span>
                        <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">{item.product.name}</h3>
                     </div>
                     <div className="text-left md:text-right">
                        <p className="text-2xl font-black text-slate-900">{toPersianDigits(item.product.price.toLocaleString())} <span className="text-xs text-slate-400">تومان</span></p>
                        <p className="text-[10px] text-slate-400 font-bold mt-1">قیمت واحد</p>
                     </div>
                  </div>
                  
                  <div className="flex flex-row-reverse justify-between items-center pt-6 border-t border-slate-50">
                     <div className="flex items-center gap-5 bg-slate-50 p-2 rounded-2xl">
                        <button onClick={() => onUpdateQuantity(item.product.id, 1)} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-xl font-black hover:text-pink-600 transition-colors shadow-pink-100">+</button>
                        <span className="font-black text-lg w-6 text-center">{toPersianDigits(item.quantity)}</span>
                        <button onClick={() => onUpdateQuantity(item.product.id, -1)} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-xl font-black hover:text-pink-600 transition-colors shadow-pink-100">-</button>
                     </div>
                     <button 
                       onClick={() => onUpdateQuantity(item.product.id, -item.quantity)}
                       className="text-slate-300 hover:text-red-500 transition-colors p-2 group/del"
                     >
                        <svg className="h-6 w-6 group-hover/del:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                     </button>
                  </div>
               </div>
            </div>
          ))}
        </div>

        {/* Pricing Summary */}
        <div className="lg:col-span-4">
           <div className="bg-white rounded-[50px] p-10 md:p-12 border border-slate-100 shadow-4xl space-y-10 sticky top-32 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-bl-full -z-10 opacity-50"></div>
              
              <h3 className="text-2xl font-black border-r-4 border-pink-600 pr-4 tracking-tighter">خلاصه پیش‌فاکتور</h3>
              
              <div className="space-y-6 text-sm font-bold">
                 <div className="flex justify-between items-center text-slate-500">
                    <span>{toPersianDigits(cartTotal.toLocaleString())} تومان</span>
                    <span>قیمت کل کالاها</span>
                 </div>
                 <div className="flex justify-between items-center text-emerald-500">
                    <span>رایگان</span>
                    <span>هزینه ارسال زیباست</span>
                 </div>
                 <div className="flex justify-between items-center text-slate-400 border-t border-slate-50 pt-6">
                    <span>{toPersianDigits(Math.floor(cartTotal * 0.09).toLocaleString())} تومان</span>
                    <span>مالیات بر ارزش افزوده (٪۹)</span>
                 </div>
              </div>

              <div className="pt-8 border-t border-dashed border-slate-200 space-y-8">
                 <div className="flex justify-between items-end">
                    <div className="text-right">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Grand Total</p>
                       <span className="text-3xl md:text-4xl font-black text-pink-600">{toPersianDigits(Math.floor(cartTotal * 1.09).toLocaleString())}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-400 mb-1">تومان</span>
                 </div>

                 <button 
                   onClick={onGoToCheckout}
                   className="w-full py-7 bg-slate-900 text-white rounded-[40px] font-black text-xl shadow-3xl shadow-slate-200 hover:bg-pink-600 transition-all active:scale-95 flex items-center justify-center gap-4 group"
                 >
                   تایید و ثبت سفارش
                   <svg className="w-7 h-7 rotate-180 group-hover:translate-x-[-5px] transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                 </button>
              </div>

              <div className="p-6 bg-slate-50 rounded-[30px] border border-slate-100 flex items-center gap-4">
                 <span className="text-2xl">🛡️</span>
                 <p className="text-[10px] text-slate-500 leading-relaxed font-bold">
                   اصالت و سلامت فیزیکی تمامی کالاهای تامین شده در زیباست ۱۰۰٪ تضمین می‌شود.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
