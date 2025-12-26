
import React from 'react';
import { Clinic, Service } from '../types';
import { MOCK_SERVICES } from '../constants';

interface ClinicProfileProps {
  clinic: Clinic;
  onBack: () => void;
  onBookService: (service: Service) => void;
}

const ClinicProfile: React.FC<ClinicProfileProps> = ({ clinic, onBack, onBookService }) => {
  const clinicServices = MOCK_SERVICES.filter(s => clinic.services.includes(s.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in duration-500">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-gray-500 hover:text-pink-600 font-bold transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        بازگشت به لیست
      </button>

      {/* Hero Section */}
      <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl mb-12">
        <img src={clinic.image} className="w-full h-full object-cover" alt={clinic.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-12">
          <div className="text-white space-y-2">
            <h1 className="text-5xl font-black">{clinic.name}</h1>
            <p className="text-xl opacity-90 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {clinic.address}
            </p>
          </div>
        </div>
        <div className="absolute top-8 left-8 bg-white/90 backdrop-blur px-4 py-2 rounded-2xl flex items-center gap-2 font-black text-amber-600 shadow-lg">
          <span className="text-xl">{clinic.rating}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-12">
          {/* About */}
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-r-4 border-pink-600 pr-4">درباره کلینیک</h2>
            <p className="text-gray-600 leading-relaxed text-lg">{clinic.description}</p>
          </section>

          {/* Gallery */}
          {clinic.gallery.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 text-gray-900 border-r-4 border-pink-600 pr-4">گالری تصاویر</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {clinic.gallery.map((img, idx) => (
                  <div key={idx} className="h-48 rounded-2xl overflow-hidden shadow-md group">
                    <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={`Gallery ${idx}`} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Services */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-r-4 border-pink-600 pr-4">خدمات ارائه شده</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clinicServices.map(service => (
                <div key={service.id} className="bg-white p-6 rounded-2xl border border-gray-100 flex justify-between items-center hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center text-pink-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{service.name}</h4>
                      <p className="text-sm text-gray-400">{service.duration} دقیقه</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="font-black text-gray-900 mb-1">{service.price.toLocaleString()} تومان</div>
                    <button 
                      onClick={() => onBookService(service)}
                      className="text-pink-600 text-sm font-bold hover:underline"
                    >
                      رزرو نوبت
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Staff */}
          {clinic.staff.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 text-gray-900 border-r-4 border-pink-600 pr-4">متخصصین کلینیک</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {clinic.staff.map(member => (
                  <div key={member.id} className="bg-white p-6 rounded-3xl flex items-center gap-6 shadow-sm border border-gray-50 group hover:shadow-md transition-shadow">
                    <img src={member.image} className="w-20 h-20 rounded-2xl object-cover ring-4 ring-pink-50 group-hover:ring-pink-100 transition-all" alt={member.name} />
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">{member.name}</h4>
                      <p className="text-pink-600 font-medium text-sm">{member.role}</p>
                      <p className="text-gray-400 text-xs mt-1">{member.specialty}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Sticky Booking Widget */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-pink-50 sticky top-28">
            <h3 className="text-2xl font-black text-gray-900 mb-6">رزرو سریع</h3>
            <div className="space-y-4 mb-8">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">اتاق‌های آماده اجاره</p>
                {/* Fix: changed availableRooms to availableRoomsCount */}
                <p className="text-xl font-bold text-gray-900">{clinic.availableRoomsCount} اتاق</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">اولین نوبت خالی</p>
                <p className="text-xl font-bold text-gray-900">فردا ساعت ۹:۰۰</p>
              </div>
            </div>
            <button className="w-full py-5 bg-pink-600 text-white rounded-2xl font-black text-lg shadow-lg shadow-pink-200 hover:bg-pink-700 hover:scale-[1.02] transition-all mb-4">
              درخواست مشاوره هوشمند
            </button>
            <button className="w-full py-5 bg-white text-pink-600 border-2 border-pink-100 rounded-2xl font-black text-lg hover:border-pink-300 transition-all">
              اجاره اتاق (ویژه تکنسین)
            </button>
            <p className="text-center text-xs text-gray-400 mt-6 leading-relaxed">
              با رزرو از Zibaas، ۵٪ از مبلغ تراکنش به عنوان اعتبار به کیف پول شما بازمی‌گردد.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicProfile;