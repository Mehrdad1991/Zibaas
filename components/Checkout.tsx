
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
    name: 'الناز رحیمی', // Mock user
    phone: '۰۹۱۲۰۰۰۰۰۰۰',
    address: '',
    postalCode: '',
    deliveryMethod: 'EXPRESS'
  });

  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const tax = Math.floor(cartTotal * 0.09);
  const finalPrice = cartTotal + tax;

  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  const handlePay = () => {
    setStep(3); // Loading state
    setTimeout(() => {
      onSuccess();
    }, 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 animate-in fade-in duration-700 text-right">
      {/* Checkout Stepper */}
      <div className="flex justify-center mb-16">
        <div className="flex items-center gap-4 bg-white p-3 rounded-[30px] shadow-sm border border-slate-100">
          {[
            { n: 1, l: 'اطلاعات ارسال' },
            { n: 2, l: 'پیش‌فاکتور نهایی' },
            { n: 3, l: 'پرداخت امن' },
          ].map((s) => (
            <React.Fragment key={s.n}>
               <div className="flex items-center gap-2 px-4">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black transition-all ${step >= s.n ? 'bg-pink-600 text-white shadow-lg shadow-pink-100' : 'bg-slate-100 text-slate-400'}`}>
                     {toPersianDigits(s.n)}
                  </div>
                  <span className={`text-[10px] font-black whitespace-nowrap ${step >= s.n ? 'text-slate-900' : 'text-slate-300'}`}>{s.l}</span>
               </div>
               {s.n < 3 && <div className="w-8 h-px bg-slate-100"></div>}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Step-based Content */}
        <div className="lg:col-span-8">
           {step === 1 && (
             <div className="bg-white p-10 md:p-14 rounded-[60px] shadow-sm border border-slate-50 space-y-10 animate-in slide-in-from-right-4">
                <div className="space-y-2">
                   <h3 className="text-3xl font-black text-slate-900 tracking-tighter">نشانی و زمان تحویل</h3>
                   <p className="text-slate-400 font-bold text-sm">لطفاً محل دقیق دریافت سفارش خود را تعیین کنید.</p>
                </div>
                
                <div className="space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-xs font-black text-slate-400 pr-4 block">نام و نام خانوادگی تحویل گیرنده</label>
                         <input type="text" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-black focus:ring-2 focus:ring-pink-500 text-right shadow-inner" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-black text-slate-400 pr-4 block">شماره موبایل جهت هماهنگی</label>
                         <input type="tel" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-black focus:ring-2 focus:ring-pink-500 text-center shadow-inner" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                      </div>
                   </div>
                   
                   <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 pr-4 block">آدرس دقیق پستی</label>
                      <textarea className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 font-black focus:ring-2 focus:ring-pink-500 text-right h-32 shadow-inner" placeholder="استان، شهر، خیابان، پلاک، واحد..." value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => setFormData({...formData, deliveryMethod: 'EXPRESS'})}
                        className={`p-6 rounded-[35px] border-2 text-center transition-all ${formData.deliveryMethod === 'EXPRESS' ? 'border-pink-600 bg-pink-50' : 'border-slate-100 bg-white'}`}
                      >
                         <div className="text-2xl mb-2">⚡</div>
                         <h4 className="font-black text-slate-900 text-sm">ارسال فوری (۳ ساعته)</h4>
                         <p className="text-[10px] text-slate-400 font-bold mt-1">ویژه شهر تهران</p>
                      </button>
                      <button 
                        onClick={() => setFormData({...formData, deliveryMethod: 'POST'})}
                        className={`p-6 rounded-[35px] border-2 text-center transition-all ${formData.deliveryMethod === 'POST' ? 'border-pink-600 bg-pink-50' : 'border-slate-100 bg-white'}`}
                      >
                         <div className="text-2xl mb-2">📦</div>
                         <h4 className="font-black text-slate-900 text-sm">ارسال پستی (۲ روزه)</h4>
                         <p className="text-[10px] text-slate-400 font-bold mt-1">سراسر کشور</p>
                      </button>
                   </div>
                </div>
                
                <div className="pt-6 border-t border-slate-50 flex gap-4">
                   <button onClick={onBack} className="flex-1 py-6 bg-slate-100 text-slate-400 rounded-[35px] font-black hover:bg-slate-200 transition-all">بازگشت به سبد</button>
                   <button onClick={() => setStep(2)} disabled={!formData.address} className="flex-[2] py-6 bg-slate-900 text-white rounded-[35px] font-black text-xl hover:bg-pink-600 transition-all shadow-xl disabled:opacity-30">تایید و مشاهده فاکتور</button>
                </div>
             </div>
           )}

           {step === 2 && (
             <div className="bg-white p-10 md:p-16 rounded-[60px] shadow-sm border border-slate-100 space-y-10 animate-in slide-in-from-right-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-pink-600"></div>
                <div className="flex justify-between items-center flex-row-reverse border-b border-slate-50 pb-8">
                   <div className="text-right">
                      <h3 className="text-3xl font-black text-slate-900 tracking-tighter">پیش‌فاکتور سفارش</h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Order #ZB-{Math.floor(Math.random()*10000)} Review</p>
                   </div>
                   <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-2xl">Z</div>
                </div>

                <div className="space-y-6">
                   {/* Mini Table Header */}
                   <div className="flex flex-row-reverse justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">
                      <span className="w-1/2 text-right">شرح کالا</span>
                      <span className="w-1/4 text-center">تعداد</span>
                      <span className="w-1/4 text-left">مجموع (تومان)</span>
                   </div>
                   
                   <div className="divide-y divide-slate-50 border-t border-b border-slate-50">
                      {cart.map(item => (
                        <div key={item.product.id} className="flex flex-row-reverse justify-between items-center py-5 px-4 font-bold text-sm text-slate-700">
                           <span className="w-1/2 text-right line-clamp-1">{item.product.name}</span>
                           <span className="w-1/4 text-center">{toPersianDigits(item.quantity)}</span>
                           <span className="w-1/4 text-left font-black text-slate-900">{toPersianDigits((item.product.price * item.quantity).toLocaleString())}</span>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="bg-slate-50 p-8 rounded-[40px] space-y-4">
                   <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                      <span className="font-black text-slate-900">{toPersianDigits(cartTotal.toLocaleString())} تومان</span>
                      <span>مجموع ناخالص</span>
                   </div>
                   <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                      <span className="font-black text-slate-900">{toPersianDigits(tax.toLocaleString())} تومان</span>
                      <span>مالیات بر ارزش افزوده (٪۹)</span>
                   </div>
                   <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                      <div className="text-left">
                         <span className="text-3xl font-black text-pink-600">{toPersianDigits(finalPrice.toLocaleString())}</span>
                         <span className="text-xs font-bold text-slate-400 mr-2">تومان</span>
                      </div>
                      <span className="text-xl font-black text-slate-900 tracking-tighter">مبلغ نهایی قابل پرداخت:</span>
                   </div>
                </div>

                <div className="flex gap-4">
                   <button onClick={() => setStep(1)} className="flex-1 py-6 bg-slate-100 text-slate-400 rounded-[35px] font-black hover:bg-slate-200 transition-all">ویرایش اطلاعات</button>
                   <button onClick={handlePay} className="flex-[2] py-6 bg-pink-600 text-white rounded-[35px] font-black text-xl shadow-2xl shadow-pink-100 hover:bg-pink-700 transition-all active:scale-95 flex items-center justify-center gap-3">
                      <span>اتصال به درگاه بانکی</span>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                   </button>
                </div>
             </div>
           )}

           {step === 3 && (
             <div className="py-32 text-center space-y-10 flex flex-col items-center animate-pulse">
                <div className="relative">
                   <div className="w-32 h-32 border-8 border-pink-100 border-t-pink-600 rounded-full animate-spin"></div>
                   <div className="absolute inset-0 flex items-center justify-center text-3xl">🏦</div>
                </div>
                <div className="space-y-4">
                   <h3 className="text-3xl font-black text-slate-900 tracking-tighter">در حال انتقال به شبکه شاپرک...</h3>
                   <p className="text-slate-400 font-bold text-lg max-w-sm mx-auto leading-relaxed">لطفاً تا اتمام فرآیند تایید تراکنش، پنجره مرورگر را نبندید.</p>
                </div>
             </div>
           )}
        </div>

        {/* Mini Sticky Info */}
        <div className="lg:col-span-4">
           <div className="space-y-6 sticky top-32">
              <div className="bg-slate-900 p-8 rounded-[45px] text-white space-y-4 shadow-3xl">
                 <h4 className="font-black text-sm flex items-center gap-2 justify-end">
                    اطلاعات گیرنده
                    <span className="text-pink-500">📍</span>
                 </h4>
                 <div className="space-y-2 opacity-80 text-[10px] font-bold">
                    <p className="flex justify-between"><span>{formData.name}</span><span>تحویل‌گیرنده:</span></p>
                    <p className="flex justify-between"><span>{toPersianDigits(formData.phone)}</span><span>تماس:</span></p>
                    <p className="leading-loose text-left mt-2">{formData.address || 'آدرسی ثبت نشده است'}</p>
                 </div>
              </div>
              <div className="bg-emerald-50 p-6 rounded-[35px] border border-emerald-100 flex items-center gap-4 shadow-sm">
                 <span className="text-2xl">🌱</span>
                 <p className="text-[10px] text-emerald-800 font-bold leading-relaxed">
                   با انتخاب بسته‌بندی زیست‌محیطی زیباست، در حفظ طبیعت همراه ما باشید.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
