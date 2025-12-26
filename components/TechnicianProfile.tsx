
import React from 'react';
import { Technician, Service } from '../types';
import { MOCK_SERVICES } from '../constants';

interface TechnicianProfileProps {
  technician: Technician;
  onBack: () => void;
  onBookService: (service: Service) => void;
}

const TechnicianProfile: React.FC<TechnicianProfileProps> = ({ technician, onBack, onBookService }) => {
  const techServices = MOCK_SERVICES.filter(s => technician.offeredServices.includes(s.id));

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-500">
      <button 
        onClick={onBack}
        className="mb-10 flex items-center gap-2 text-gray-500 hover:text-pink-600 font-bold transition-colors group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        بازگشت به لیست
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Profile Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-bl-full -z-10"></div>
            <img src={technician.image} className="w-32 h-32 rounded-3xl object-cover mx-auto mb-6 ring-8 ring-white shadow-xl" alt={technician.name} />
            <h1 className="text-3xl font-black text-gray-900 mb-2">{technician.name}</h1>
            <p className="text-pink-600 font-bold mb-6">{technician.role}</p>
            
            <div className="flex justify-center gap-8 mb-8">
               <div>
                  <p className="text-gray-400 text-xs mb-1">امتیاز</p>
                  <p className="font-black text-gray-900">{technician.rating} / ۵</p>
               </div>
               <div className="w-px h-8 bg-gray-100"></div>
               <div>
                  <p className="text-gray-400 text-xs mb-1">نظرات</p>
                  <p className="font-black text-gray-900">{technician.reviewCount} مورد</p>
               </div>
            </div>

            <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-pink-600 transition-colors mb-4">
              پیام به متخصص
            </button>
            <div className="flex justify-center gap-4">
               {['Instagram', 'WhatsApp'].map(social => (
                 <div key={social} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center cursor-pointer hover:bg-pink-50 hover:text-pink-600 transition-all">
                    <span className="text-[10px] font-bold">{social[0]}</span>
                 </div>
               ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
             <h3 className="text-xl font-black mb-4">درباره من</h3>
             <p className="text-gray-500 leading-relaxed text-sm">{technician.bio}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-8 space-y-12">
          {/* Portfolio */}
          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-8 border-r-8 border-pink-600 pr-6">پورتفولیو و نمونه‌کار</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {technician.portfolio.map(item => (
                <div key={item.id} className="group bg-white rounded-[40px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all">
                   <div className="h-64 overflow-hidden relative">
                      <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
                   </div>
                   <div className="p-6">
                      <h4 className="text-xl font-black text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-500 text-sm">{item.description}</p>
                   </div>
                </div>
              ))}
            </div>
          </section>

          {/* Services */}
          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-8 border-r-8 border-pink-600 pr-6">خدمات من</h2>
            <div className="space-y-4">
              {techServices.map(service => (
                <div key={service.id} className="bg-white p-6 rounded-3xl border border-gray-100 flex justify-between items-center group hover:border-pink-300 transition-all">
                   <div className="flex items-center gap-6">
                      <img src={service.image} className="w-16 h-16 rounded-2xl object-cover" alt={service.name} />
                      <div>
                         <h4 className="font-black text-gray-900">{service.name}</h4>
                         <p className="text-xs text-gray-400">مدت زمان: {service.duration} دقیقه</p>
                      </div>
                   </div>
                   <div className="text-left">
                      <div className="font-black text-gray-900 mb-2">{service.price.toLocaleString()} تومان</div>
                      <button 
                        onClick={() => onBookService(service)}
                        className="bg-pink-50 text-pink-600 px-6 py-2 rounded-xl font-bold text-sm group-hover:bg-pink-600 group-hover:text-white transition-all"
                      >
                        رزرو نوبت
                      </button>
                   </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TechnicianProfile;
