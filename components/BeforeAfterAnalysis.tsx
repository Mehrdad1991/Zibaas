
import React, { useState, useRef } from 'react';
import { analyzeBeforeAfter, analyzeBeautyConsultation } from '../services/geminiService';

const BeforeAfterAnalysis: React.FC = () => {
  const [mode, setMode] = useState<'consultation' | 'beforeAfter'>('consultation');
  const [singleImg, setSingleImg] = useState<string | null>(null);
  const [beforeImg, setBeforeImg] = useState<string | null>(null);
  const [afterImg, setAfterImg] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'single' | 'before' | 'after') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        if (type === 'single') setSingleImg(base64);
        else if (type === 'before') setBeforeImg(base64);
        else setAfterImg(base64);
        setAnalysis(null); // Clear previous analysis
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConsultationAnalyze = async () => {
    if (!singleImg) return;
    setIsAnalyzing(true);
    const b64 = singleImg.split(',')[1];
    const result = await analyzeBeautyConsultation(b64);
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  const handleBeforeAfterAnalyze = async () => {
    if (!beforeImg || !afterImg) return;
    setIsAnalyzing(true);
    const b64_1 = beforeImg.split(',')[1];
    const b64_2 = afterImg.split(',')[1];
    const result = await analyzeBeforeAfter(b64_1, b64_2);
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="max-w-5xl mx-auto my-12 px-4">
      {/* Mode Selector */}
      <div className="flex justify-center mb-12">
        <div className="bg-white p-2 rounded-[30px] shadow-sm border border-pink-100 flex gap-2">
          <button 
            onClick={() => { setMode('consultation'); setAnalysis(null); }}
            className={`px-8 py-4 rounded-[22px] font-black text-sm transition-all ${mode === 'consultation' ? 'bg-pink-600 text-white shadow-lg' : 'text-gray-400 hover:text-pink-600'}`}
          >
            مشاوره هوشمند (تک عکس)
          </button>
          <button 
            onClick={() => { setMode('beforeAfter'); setAnalysis(null); }}
            className={`px-8 py-4 rounded-[22px] font-black text-sm transition-all ${mode === 'beforeAfter' ? 'bg-pink-600 text-white shadow-lg' : 'text-gray-400 hover:text-pink-600'}`}
          >
            تحلیل قبل و بعد
          </button>
        </div>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[50px] shadow-2xl border border-pink-50 relative overflow-hidden">
        {/* Animated Background Element */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-pink-50 rounded-full blur-3xl opacity-60"></div>

        {mode === 'consultation' ? (
          <div className="space-y-10 relative z-10">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black text-gray-900 tracking-tighter">مشاوره زیبایی با هوش مصنوعی</h2>
              <p className="text-gray-500 font-medium max-w-xl mx-auto leading-relaxed">
                لطفاً یک عکس <span className="text-pink-600 font-black">تمام‌رخ و واضح</span> از روبرو بگیرید یا آپلود کنید تا سیستم بتواند دقیق‌ترین تحلیل و پیشنهادات را به شما ارائه دهد.
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="relative aspect-[3/4] bg-gray-50 rounded-[40px] border-4 border-dashed border-gray-200 overflow-hidden group hover:border-pink-400 transition-all">
                {singleImg ? (
                  <div className="relative h-full">
                    <img src={singleImg} alt="Face" className="w-full h-full object-cover" />
                    <button 
                      onClick={() => setSingleImg(null)}
                      className="absolute top-4 right-4 bg-white/90 text-red-500 p-2 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    {isAnalyzing && (
                      <div className="absolute inset-0 bg-pink-600/20 backdrop-blur-[2px] flex items-center justify-center">
                         <div className="w-full h-1 bg-white/40 absolute animate-scan"></div>
                      </div>
                    )}
                  </div>
                ) : (
                  <label className="h-full flex flex-col items-center justify-center cursor-pointer p-8 space-y-6">
                    <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">📸</div>
                    <div className="text-center">
                      <p className="font-black text-gray-900">انتخاب یا گرفتن عکس تمام‌رخ</p>
                      <p className="text-xs text-gray-400 mt-2 font-medium">سلفی روبروی نور مناسب بگیرید</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" capture="user" onChange={(e) => handleFileChange(e, 'single')} />
                  </label>
                )}
              </div>
            </div>

            <div className="text-center">
              <button 
                onClick={handleConsultationAnalyze}
                disabled={!singleImg || isAnalyzing}
                className={`px-12 py-5 rounded-[25px] font-black text-lg shadow-2xl transition-all ${
                  !singleImg || isAnalyzing 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-pink-600 text-white shadow-pink-200 hover:scale-105 active:scale-95'
                }`}
              >
                {isAnalyzing ? 'در حال اسکن و تحلیل چهره...' : 'دریافت مشاوره هوشمند'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-10 relative z-10">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black text-gray-900 tracking-tighter">تحلیل تغییرات (قبل و بعد)</h2>
              <p className="text-gray-500 font-medium max-w-xl mx-auto">تصاویر قبل و بعد جراحی یا تزریق خود را مقایسه کنید تا کیفیت نتیجه را بررسی کنیم.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { label: 'تصویر قبل', state: beforeImg, type: 'before' },
                { label: 'تصویر بعد', state: afterImg, type: 'after' }
              ].map((box, i) => (
                <div key={i} className="space-y-4">
                  <label className="block text-center font-black text-gray-400 text-sm uppercase tracking-widest">{box.label}</label>
                  <div className="aspect-square bg-gray-50 rounded-[40px] border-4 border-dashed border-gray-200 overflow-hidden relative group hover:border-pink-400 transition-all">
                    {box.state ? (
                      <>
                        <img src={box.state} className="w-full h-full object-cover" alt={box.label} />
                        <button 
                          onClick={() => box.type === 'before' ? setBeforeImg(null) : setAfterImg(null)}
                          className="absolute top-4 right-4 bg-white/90 text-red-500 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </>
                    ) : (
                      <label className="h-full flex flex-col items-center justify-center cursor-pointer p-6 space-y-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 group-hover:text-pink-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="text-sm font-bold text-gray-400">آپلود تصویر</span>
                        <input type="file" className="hidden" onChange={(e) => handleFileChange(e, box.type as any)} accept="image/*" />
                      </label>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button 
                onClick={handleBeforeAfterAnalyze}
                disabled={!beforeImg || !afterImg || isAnalyzing}
                className={`px-12 py-5 rounded-[25px] font-black text-lg shadow-2xl transition-all ${
                  !beforeImg || !afterImg || isAnalyzing 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-pink-600 text-white shadow-pink-200 hover:scale-105'
                }`}
              >
                {isAnalyzing ? 'در حال تحلیل تغییرات...' : 'مقایسه هوشمند نتایج'}
              </button>
            </div>
          </div>
        )}

        {/* Analysis Result Display */}
        {analysis && (
          <div className="mt-16 p-8 md:p-12 bg-pink-50/50 rounded-[40px] border border-pink-100 animate-in fade-in slide-in-from-bottom-6 duration-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
               <span className="bg-pink-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Zibaas AI Report</span>
            </div>
            <h3 className="text-2xl font-black text-pink-900 mb-8 flex items-center gap-3">
              <span className="w-10 h-10 bg-pink-600 text-white rounded-2xl flex items-center justify-center text-xl">💡</span>
              پیشنهادات و تحلیل تخصصی
            </h3>
            <div className="text-gray-800 leading-[1.8] font-medium whitespace-pre-wrap text-right text-lg">
              {analysis}
            </div>
            <div className="mt-12 pt-8 border-t border-pink-100 flex flex-col md:flex-row justify-between items-center gap-6">
               <div className="flex items-center gap-3 text-pink-400 text-xs italic">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>این تحلیل صرفاً بر اساس تصویر بوده و جایگزین تشخیص پزشک نیست.</span>
               </div>
               <button className="bg-gray-900 text-white px-8 py-3 rounded-2xl font-black text-sm hover:bg-pink-600 transition-all shadow-xl">
                  رزرو مشاوره حضوری رایگان
               </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default BeforeAfterAnalysis;
