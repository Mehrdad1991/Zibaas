
import React, { useState, useMemo } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { Product, CartItem } from '../types';

interface StoreProps {
  cart: CartItem[];
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
}

const Store: React.FC<StoreProps> = ({ cart, onAddToCart, onUpdateQuantity }) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);

  const categories = [
    { id: 'ALL', label: 'همه', img: 'https://cdn-icons-png.flaticon.com/512/2652/2652218.png' },
    { id: 'EQUIPMENT', label: 'دستگاه‌ها', img: 'https://cdn-icons-png.flaticon.com/512/3004/3004451.png' },
    { id: 'CONSUMABLE', label: 'مصرفی', img: 'https://cdn-icons-png.flaticon.com/512/822/822143.png' },
    { id: 'FURNITURE', label: 'مبلمان', img: 'https://cdn-icons-png.flaticon.com/512/2590/2590516.png' },
    { id: 'SKINCARE', label: 'پوستی', img: 'https://cdn-icons-png.flaticon.com/512/3104/3104631.png' },
  ];

  const brands = [
    { name: 'Alma', logo: 'https://www.almalasers.com/wp-content/uploads/2018/11/alma-logo.png' },
    { name: 'Cynosure', logo: 'https://www.cynosure.com/wp-content/themes/cynosure/assets/img/cynosure-logo.svg' },
    { name: 'Medline', logo: 'https://www.medline.com/media/assets/img/medline-logo.svg' },
    { name: 'Masport', logo: 'https://masport.ir/wp-content/uploads/2021/05/logo.png' },
  ];

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => {
      const catMatch = activeCategory === 'ALL' || p.category === activeCategory;
      const searchMatch = p.name.includes(searchQuery) || p.brand.includes(searchQuery);
      return catMatch && searchMatch;
    });
  }, [activeCategory, searchQuery]);

  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Search Header */}
      <div className="sticky top-20 z-40 bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder="جستجو در زیباست..." 
              className="w-full bg-gray-100 border-none rounded-xl pr-12 pl-12 py-3 text-sm font-bold focus:ring-1 focus:ring-pink-500 text-right"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button onClick={() => setShowCart(true)} className="relative p-2 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-black w-5 h-5 rounded-md flex items-center justify-center border-2 border-white">
                {toPersianDigits(totalItems)}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 space-y-10 mt-6">
        {/* Horizontal Category Circles */}
        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-2 pt-2 justify-start lg:justify-center">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="flex flex-col items-center gap-2 shrink-0 group"
            >
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all p-3 ${
                activeCategory === cat.id ? 'bg-pink-100 ring-2 ring-pink-500' : 'bg-gray-50 group-hover:bg-gray-100'
              }`}>
                <img src={cat.img} className="w-full h-full object-contain" alt={cat.label} />
              </div>
              <span className={`text-[11px] md:text-xs font-black transition-colors ${
                activeCategory === cat.id ? 'text-pink-600' : 'text-gray-600'
              }`}>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Featured Brands */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-2">
             <h4 className="text-lg font-black text-gray-900 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-red-500 rounded-full"></span>
                محبوب‌ترین برندها
             </h4>
             <button className="text-blue-500 text-xs font-black">مشاهده همه</button>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {brands.map((brand, i) => (
              <div key={i} className="min-w-[120px] h-24 bg-white border border-gray-100 rounded-2xl flex items-center justify-center p-4 hover:shadow-md transition-shadow shrink-0">
                <img src={brand.logo} className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all" alt={brand.name} />
              </div>
            ))}
          </div>
        </div>

        {/* Products Grid - 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-r border-gray-100">
          {filteredProducts.map(product => (
            <div 
              key={product.id} 
              className="bg-white border-b border-l border-gray-100 p-3 md:p-6 group relative hover:shadow-2xl transition-all flex flex-col"
            >
              <div className="aspect-square mb-4 relative overflow-hidden rounded-xl">
                <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={product.name} />
                {product.isFeatured && (
                  <div className="absolute top-2 right-2 bg-gray-900 text-white text-[8px] font-black px-2 py-0.5 rounded-md">PREMIUM</div>
                )}
                {/* Quick Add Button */}
                <button 
                  onClick={() => onAddToCart(product)}
                  className="absolute bottom-2 left-2 bg-white text-pink-600 p-2 rounded-xl shadow-lg opacity-0 lg:group-hover:opacity-100 transition-all hover:bg-pink-600 hover:text-white border border-pink-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-3 h-32 flex flex-col justify-between">
                <div>
                  <h5 className="text-[11px] md:text-sm font-bold text-gray-800 line-clamp-2 leading-relaxed text-right">{product.name}</h5>
                  <p className="text-[9px] text-gray-400 mt-1 font-black uppercase tracking-widest text-right">{product.brand}</p>
                </div>
                
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1">
                    <span className="text-sm md:text-xl font-black text-gray-900">{toPersianDigits(product.price.toLocaleString())}</span>
                    <span className="text-[10px] text-gray-500 font-medium">تومان</span>
                  </div>
                  {product.stock < 10 && (
                    <p className="text-[8px] text-red-500 font-bold mt-1 italic">تنها {toPersianDigits(product.stock)} عدد باقی مانده</p>
                  )}
                </div>
              </div>
              
              {/* Mobile Mobile Quick Add (Visible on tap/hover) */}
              <button 
                onClick={() => onAddToCart(product)}
                className="lg:hidden mt-4 w-full py-2 bg-pink-50 text-pink-600 rounded-xl text-[10px] font-black"
              >
                افزودن سریع
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Drawer Overlay */}
      {showCart && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setShowCart(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-left-full duration-300">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-2xl font-black text-gray-900">سبد خرید شما</h3>
              <button onClick={() => setShowCart(false)} className="text-gray-400 hover:text-pink-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="text-6xl">🛒</div>
                  <p className="font-black text-gray-400">سبد خرید شما خالی است</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.product.id} className="flex gap-4 p-4 bg-gray-50 rounded-3xl border border-gray-100">
                    <img src={item.product.image} className="w-20 h-20 rounded-2xl object-cover shadow-sm" alt="" />
                    <div className="flex-1 space-y-1 text-right">
                      <h5 className="font-black text-gray-900 text-sm">{item.product.name}</h5>
                      <p className="text-xs text-pink-600 font-bold">{toPersianDigits(item.product.price.toLocaleString())} تومان</p>
                      <div className="flex items-center gap-3 mt-2 justify-end">
                        <button onClick={() => onUpdateQuantity(item.product.id, -1)} className="w-6 h-6 bg-white rounded-lg border border-gray-200 flex items-center justify-center font-bold">-</button>
                        <span className="font-black text-sm">{toPersianDigits(item.quantity)}</span>
                        <button onClick={() => onUpdateQuantity(item.product.id, 1)} className="w-6 h-6 bg-white rounded-lg border border-gray-200 flex items-center justify-center font-bold">+</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 bg-gray-50 border-t border-gray-100 space-y-6 text-right">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-black text-gray-900">{toPersianDigits(cartTotal.toLocaleString())} تومان</span>
                  <span className="text-gray-500 font-bold">مجموع کل:</span>
                </div>
                <button className="w-full py-5 bg-pink-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-pink-100 hover:bg-pink-700 transition-all">
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
