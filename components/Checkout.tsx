
import React, { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  onBack: () => void;
  onSuccess: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, onBack, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    postalCode: ''
  });

  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  const handlePay = () => {
    setStep(3); // Simulating payment processing
    setTimeout(() => {
      onSuccess();
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      <div className="text-center mb-16 space-y-4">
         <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">نهایی‌سازی سفارش</h1>
         <p className="text-slate-400 font-bold text-lg">پرداخت امن و تحویل سریع با Zibaas Express</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5 order-2 lg:order-1">
           <div className="bg-slate-900 rounded-[50px] p-10 text-white space-y-8 sticky top-32 shadow-3xl">
              <h3 className="text-xl font-black border-r-4 border-pink-600 pr-4">خلاصه سبد خرید</h3>
              <div className="space-y-6 max-h-64 overflow-y-auto no-scrollbar">
                 {cart.map(item => (
                   <div key={item.product.id} className="flex flex-row-reverse justify-between items-center gap-4">
                      <div className="flex flex-row-reverse items-center gap-3">
                         <img src={item.product.image} className="w-12 h-12 rounded-xl object-cover bg-white p-1" alt="" />
                         <div className="text-right">
                            <p className="text-xs font-black line-clamp-1">{item.product.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold">{toPersianDigits(item.quantity)} عدد</p>
                         </div>
                      </div>
                      <span className="text-xs font-black">{toPersianDigits((item.product.price * item.quantity).toLocaleString())}</span>
                   </div>
                 ))}
              </div>
              <div className="pt-8 border-t border-white/10 space-y-4">
                 <div className="flex justify-between items-center text-slate-400 text-xs font-bold">
                    <span>{toPersianDigits(cartTotal.toLocaleString())} تومان</span>
                    <span>مبلغ کل کالاها</span>
                 </div>
                 <div className="flex justify-between items-center pt-4 text-2xl font-black">
                    <span className="text-pink-500">{toPersianDigits(cartTotal.toLocaleString())}</span>
                    <span>قابل پرداخت</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Forms Section */}
        <div className="lg:col-span-7 order-1 lg:order-2 space-y-10">
           {step === 1 && (
             <div className="bg-white p-10 md:p-14 rounded-[60px] shadow-sm border border-slate-50 space-y-10 animate-in slide-in-from-right-4">
                <h3 className="text-2xl font-black text-slate-900 border-r-8 border-pink-600 pr-6 tracking-tighter text-right">اطلاعات ارسال</h3>
                <div className="space-y-6">
                   <div className="space-y-2 text-right">
                      <label className="text-xs font-black text-slate-400 pr-4">نام گیرنده</label>
                      <input type="text" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-black focus:ring-2 focus:ring-pink-500 text-right" placeholder="نام و نام خانوادگی..." value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                   </div>
                   <div className="space-y-2 text-right">
                      <label className="text-xs font-black text-slate-400 pr-4">شماره تماس</label>
                      <input type="tel" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-black focus:ring-2 focus:ring-pink-500 text-center" placeholder="۰۹********* " value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                   </div>
                   <div className="space-y-2 text-right">
                      <label className="text-xs font-black text-slate-400 pr-4">آدرس دقیق پستی</label>
                      <textarea className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-black focus:ring-2 focus:ring-pink-500 text-right h-32" placeholder="استان، شهر، خیابان..." value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                   </div>
                </div>
                <button onClick={() => setStep(2)} disabled={!formData.name || !formData.phone || !formData.address} className="w-full py-6 bg-slate-900 text-white rounded-[32px] font-black text-xl hover:bg-pink-600 transition-all disabled:opacity-30">تایید و مرحله بعد</button>
             </div>
           )}

           {step === 2 && (
             <div className="bg-white p-10 md:p-14 rounded-[60px] shadow-sm border border-slate-50 space-y-10 animate-in slide-in-from-right-4">
                <h3 className="text-2xl font-black text-slate-900 border-r-8 border-pink-600 pr-6 tracking-tighter text-right">انتخاب درگاه پرداخت</h3>
                <div className="space-y-4">
                   {['درگاه مستقیم زرین‌پال', 'درگاه ملت (شاپرک)', 'کیف پول زیباست (شارژ شده)'].map((p, i) => (
                     <button key={i} className={`w-full p-6 rounded-3xl border-2 text-right font-black flex flex-row-reverse justify-between items-center transition-all ${i === 0 ? 'border-pink-600 bg-pink-50' : 'border-slate-100 hover:border-pink-200'}`}>
                        <span>{p}</span>
                        <div className={`w-6 h-6 rounded-full border-2 ${i === 0 ? 'border-pink-600 bg-pink-600' : 'border-slate-300'}`}></div>
                     </button>
                   ))}
                </div>
                <div className="flex gap-4">
                   <button onClick={() => setStep(1)} className="flex-1 py-6 bg-slate-100 text-slate-400 rounded-[32px] font-black">بازگشت</button>
                   <button onClick={handlePay} className="flex-[2] py-6 bg-pink-600 text-white rounded-[32px] font-black text-xl shadow-2xl shadow-pink-100 hover:bg-pink-700 transition-all">پرداخت و ثبت نهایی</button>
                </div>
             </div>
           )}

           {step === 3 && (
             <div className="py-20 text-center space-y-8 flex flex-col items-center">
                <div className="w-24 h-24 border-8 border-pink-100 border-t-pink-600 rounded-full animate-spin"></div>
                <div className="space-y-2">
                   <h3 className="text-2xl font-black text-slate-900">در حال اتصال به شبکه بانکی...</h3>
                   <p className="text-slate-400 font-bold">لطفاً از دکمه بازگشت مرورگر استفاده نکنید.</p>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
