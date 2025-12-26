
import React, { useState, useMemo } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { Product, CartItem } from '../types';
import { Role } from '../store/roles';

interface StoreProps {
  cart: CartItem[];
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  userRole: Role | null;
  onViewProduct: (product: Product) => void;
  onGoToCheckout: () => void;
}

const Store: React.FC<StoreProps> = ({ 
  cart, 
  onAddToCart, 
  onUpdateQuantity, 
  userRole,
  onViewProduct,
  onGoToCheckout
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);

  const categories = useMemo(() => {
    const all = [
      { id: 'ALL', label: 'همه محصولات', icon: '🛍️' },
      { id: 'SKINCARE', label: 'مراقبت پوست', icon: '🧴' },
      { id: 'AFTERCARE', label: 'مراقبت بعد عمل', icon: '🩹' },
    ];
    
    // Professionals see more categories
    if (userRole === Role.Clinic || userRole === Role.Technician || userRole === Role.Admin) {
      all.push(
        { id: 'EQUIPMENT', label: 'تجهیزات پزشکی', icon: '⚡' },
        { id: 'CONSUMABLE', label: 'مواد مصرفی', icon: '🧪' },
        { id: 'FURNITURE', label: 'تجهیزات کلینیک', icon: '🛋️' }
      );
    }
    return all;
  }, [userRole]);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => {
      // Role-based visibility logic
      const isProfessional = userRole === Role.Clinic || userRole === Role.Technician || userRole === Role.Admin;
      const canSee = isProfessional || p.category === 'SKINCARE' || p.category === 'AFTERCARE';
      
      const catMatch = activeCategory === 'ALL' || p.category === activeCategory;
      const searchMatch = p.name.includes(searchQuery) || p.brand.includes(searchQuery);
      
      return canSee && catMatch && searchMatch;
    });
  }, [activeCategory, searchQuery, userRole]);

  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <div className="bg-[#FAFBFF] min-h-screen">
      {/* Dynamic Store Header */}
      <div className="bg-white border-b border-slate-100 sticky top-16 md:top-24 z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 w-full md:w-auto order-2 md:order-1">
             <div className="relative flex-1 md:w-96">
                <input 
                  type="text" 
                  placeholder="جستجو در تجهیزات و محصولات زیباست..." 
                  className="w-full bg-slate-50 border-none rounded-2xl pr-12 pl-6 py-4 font-black text-sm focus:ring-2 focus:ring-pink-500 text-right shadow-inner"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg className="h-5 w-5 absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
             </div>
             <button 
               onClick={() => setShowCart(true)}
               className="relative p-4 bg-slate-900 text-white rounded-2xl shadow-xl hover:bg-pink-600 transition-all group"
             >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] font-black w-6 h-6 rounded-lg flex items-center justify-center border-2 border-white animate-bounce">
                    {toPersianDigits(cart.reduce((a, b) => a + b.quantity, 0))}
                  </span>
                )}
             </button>
          </div>
          
          <div className="text-right order-1 md:order-2">
             <h1 className="text-3xl font-black text-slate-900 tracking-tighter">فروشگاه تخصصی زیباست</h1>
             <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Smart Medical & Beauty Supply</p>
          </div>
        </div>

        {/* Categories Scroller */}
        <div className="max-w-7xl mx-auto px-6 pb-6 overflow-x-auto no-scrollbar">
           <div className="flex gap-4 min-w-max">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-xs transition-all ${
                    activeCategory === cat.id ? 'bg-pink-600 text-white shadow-xl shadow-pink-100' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-lg">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Role-Specific Banner */}
        {userRole !== Role.Clinic && userRole !== Role.Technician && (
          <div className="bg-slate-900 rounded-[40px] p-8 md:p-12 mb-12 text-white flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl"></div>
             <div className="text-right space-y-4 relative z-10">
                <h3 className="text-2xl md:text-4xl font-black tracking-tighter">تجهیزات تخصصی می‌خواهید؟</h3>
                <p className="text-slate-400 font-medium">اگر کلینیک‌دار یا متخصص زیبایی هستید، با ارتقای حساب کاربری به بخش تجهیزات سنگین دسترسی پیدا کنید.</p>
             </div>
             <button className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-black text-sm whitespace-nowrap hover:bg-pink-600 hover:text-white transition-all shadow-xl">ارتقای حساب متخصص</button>
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {filteredProducts.map(product => (
            <div 
              key={product.id} 
              className="bg-white rounded-[40px] p-4 md:p-6 shadow-sm border border-slate-50 hover:shadow-4xl transition-all duration-500 group flex flex-col h-full cursor-pointer"
              onClick={() => onViewProduct(product)}
            >
              <div className="aspect-square rounded-[30px] overflow-hidden bg-slate-50 mb-6 relative">
                <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={product.name} />
                <div className="absolute top-4 left-4">
                   <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-xl text-[9px] font-black text-slate-400 uppercase tracking-widest">{product.brand}</span>
                </div>
                {product.isFeatured && (
                  <div className="absolute bottom-4 right-4 bg-pink-600 text-white px-3 py-1 rounded-xl text-[9px] font-black shadow-lg">PREMIUM</div>
                )}
              </div>
              
              <div className="flex-1 text-right space-y-4">
                <h5 className="font-black text-slate-900 text-sm md:text-lg leading-tight line-clamp-2">{product.name}</h5>
                <div className="flex flex-col items-end">
                   <div className="flex items-center gap-1">
                      <span className="text-lg md:text-2xl font-black text-slate-900">{toPersianDigits(product.price.toLocaleString())}</span>
                      <span className="text-[10px] text-slate-400 font-bold">تومان</span>
                   </div>
                   {product.stock < 10 && (
                     <p className="text-[9px] text-red-500 font-black mt-1 italic animate-pulse">تنها {toPersianDigits(product.stock)} عدد در انبار باقی‌مانده</p>
                   )}
                </div>
              </div>

              <button 
                onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                className="w-full mt-6 py-4 bg-slate-50 text-slate-900 rounded-2xl font-black text-xs hover:bg-pink-600 hover:text-white transition-all shadow-sm active:scale-95"
              >
                افزودن به سبد خرید
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modern Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowCart(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-left-full duration-500">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
               <button onClick={() => setShowCart(false)} className="text-slate-400 hover:text-pink-600 p-2">
                 <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
               </button>
               <h3 className="text-2xl font-black text-slate-900">سبد خرید هوشمند</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-6 no-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-40 grayscale">
                  <div className="text-8xl">🛒</div>
                  <p className="font-black text-xl text-slate-400 tracking-tighter">هنوز محصولی انتخاب نکرده‌اید</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.product.id} className="flex flex-row-reverse gap-4 p-5 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300">
                    <img src={item.product.image} className="w-24 h-24 rounded-2xl object-cover shadow-sm" alt="" />
                    <div className="flex-1 space-y-2 text-right flex flex-col justify-center">
                      <h5 className="font-black text-slate-900 text-sm">{item.product.name}</h5>
                      <p className="text-xs text-pink-600 font-black">{toPersianDigits(item.product.price.toLocaleString())} تومان</p>
                      <div className="flex items-center gap-3 mt-2 justify-end">
                        <button onClick={() => onUpdateQuantity(item.product.id, -1)} className="w-8 h-8 bg-white rounded-xl border border-slate-200 flex items-center justify-center font-black hover:bg-pink-50 transition-colors">-</button>
                        <span className="font-black text-sm w-6 text-center">{toPersianDigits(item.quantity)}</span>
                        <button onClick={() => onUpdateQuantity(item.product.id, 1)} className="w-8 h-8 bg-white rounded-xl border border-slate-200 flex items-center justify-center font-black hover:bg-pink-50 transition-colors">+</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 bg-white border-t border-slate-100 space-y-6 text-right shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
                <div className="space-y-3">
                   <div className="flex justify-between items-center text-slate-400 text-xs font-bold">
                      <span>{toPersianDigits(cartTotal.toLocaleString())} تومان</span>
                      <span>مجموع اقلام</span>
                   </div>
                   <div className="flex justify-between items-center text-slate-400 text-xs font-bold">
                      <span className="text-emerald-500">رایگان</span>
                      <span>هزینه ارسال</span>
                   </div>
                   <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                      <span className="text-2xl font-black text-slate-900">{toPersianDigits(cartTotal.toLocaleString())} تومان</span>
                      <span className="text-slate-900 font-black">مبلغ نهایی</span>
                   </div>
                </div>
                <button 
                  onClick={onGoToCheckout}
                  className="w-full py-6 bg-slate-900 text-white rounded-[32px] font-black text-xl shadow-2xl shadow-slate-100 hover:bg-pink-600 transition-all active:scale-95"
                >
                  تکمیل سفارش و پرداخت
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Store;
