
import React, { useState, useRef } from 'react';
import { analyzeBeforeAfter, analyzeBeautyConsultation, generateResultSimulation, generateBeautyVideo } from '../services/geminiService';

const BeforeAfterAnalysis: React.FC = () => {
  const [mode, setMode] = useState<'consultation' | 'beforeAfter' | 'simulation'>('consultation');
  const [singleImg, setSingleImg] = useState<string | null>(null);
  const [beforeImg, setBeforeImg] = useState<string | null>(null);
  const [afterImg, setAfterImg] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [simulatedImg, setSimulatedImg] = useState<string | null>(null);
  const [simulatedVideo, setSimulatedVideo] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [simulationPrompt, setSimulationPrompt] = useState('عمل رینوپلاستی طبیعی');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'single' | 'before' | 'after') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        if (type === 'single') setSingleImg(base64);
        else if (type === 'before') setBeforeImg(base64);
        else setAfterImg(base64);
        setAnalysis(null);
        setSimulatedImg(null);
        setSimulatedVideo(null);
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

  const handleSimulate = async () => {
    if (!singleImg) return;
    setIsAnalyzing(true);
    const b64 = singleImg.split(',')[1];
    const img = await generateResultSimulation(simulationPrompt, b64);
    setSimulatedImg(img);
    
    // Also try to generate a transition video for "Premium" experience
    try {
      const video = await generateBeautyVideo(simulationPrompt, b64);
      setSimulatedVideo(video);
    } catch (e) {
      console.error("Video failed, showing image only");
    }
    
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
      <div className="flex justify-center mb-12 overflow-x-auto no-scrollbar pb-2">
        <div className="bg-white p-2 rounded-[30px] shadow-sm border border-pink-100 flex gap-2 shrink-0">
          <button 
            onClick={() => { setMode('consultation'); setAnalysis(null); }}
            className={`px-8 py-4 rounded-[22px] font-black text-xs md:text-sm transition-all whitespace-nowrap ${mode === 'consultation' ? 'bg-pink-600 text-white shadow-lg' : 'text-gray-400 hover:text-pink-600'}`}
          >
            مشاوره هوشمند (تک عکس)
          </button>
          <button 
            onClick={() => { setMode('simulation'); setAnalysis(null); }}
            className={`px-8 py-4 rounded-[22px] font-black text-xs md:text-sm transition-all whitespace-nowrap ${mode === 'simulation' ? 'bg-pink-600 text-white shadow-lg' : 'text-gray-400 hover:text-pink-600'}`}
          >
            شبیه‌ساز تغییرات ✨
          </button>
          <button 
            onClick={() => { setMode('beforeAfter'); setAnalysis(null); }}
            className={`px-8 py-4 rounded-[22px] font-black text-xs md:text-sm transition-all whitespace-nowrap ${mode === 'beforeAfter' ? 'bg-pink-600 text-white shadow-lg' : 'text-gray-400 hover:text-pink-600'}`}
          >
            تحلیل قبل و بعد
          </button>
        </div>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[50px] shadow-2xl border border-pink-50 relative overflow-hidden">
        {mode === 'simulation' ? (
          <div className="space-y-10 relative z-10">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black text-gray-900 tracking-tighter">شبیه‌ساز هوشمند نتایج</h2>
              <p className="text-gray-500 font-medium max-w-xl mx-auto">نوع عمل یا تزریق مد نظر خود را بنویسید تا Zibaas AI نتیجه احتمالی را برای شما تصویرسازی کند.</p>
            </div>

            <div className="max-w-md mx-auto space-y-6">
              <div className="relative aspect-[3/4] bg-gray-50 rounded-[40px] border-4 border-dashed border-gray-200 overflow-hidden group">
                {singleImg ? (
                  <img src={singleImg} className="w-full h-full object-cover" />
                ) : (
                  <label className="h-full flex flex-col items-center justify-center cursor-pointer p-8">
                    <div className="text-5xl mb-4">🤳</div>
                    <p className="font-black text-gray-900">آپلود عکس تمام‌رخ</p>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'single')} />
                  </label>
                )}
              </div>

              <input 
                type="text"
                placeholder="مثلاً: عمل زیبایی بینی یا تزریق فیلر لب..."
                className="w-full bg-gray-100 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-pink-500 text-right"
                value={simulationPrompt}
                onChange={(e) => setSimulationPrompt(e.target.value)}
              />

              <button 
                onClick={handleSimulate}
                disabled={!singleImg || isAnalyzing}
                className={`w-full py-5 rounded-[25px] font-black text-lg transition-all ${
                  !singleImg || isAnalyzing ? 'bg-gray-200 text-gray-400' : 'bg-pink-600 text-white shadow-xl shadow-pink-100 hover:scale-105'
                }`}
              >
                {isAnalyzing ? 'در حال خلق آینده...' : 'ساخت شبیه‌سازی هوشمند'}
              </button>
            </div>

            {(simulatedImg || simulatedVideo) && (
              <div className="mt-12 p-8 bg-pink-50 rounded-[40px] border border-pink-100 animate-in fade-in slide-in-from-bottom-6">
                <h3 className="text-2xl font-black text-pink-900 mb-8 flex items-center gap-3">
                  <span className="w-10 h-10 bg-pink-600 text-white rounded-2xl flex items-center justify-center">✨</span>
                  تصویرسازی نتیجه احتمالی
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <p className="text-center text-xs font-black text-pink-400">تصویر شبیه‌سازی شده</p>
                    <img src={simulatedImg || ''} className="w-full aspect-square object-cover rounded-[30px] shadow-2xl" />
                  </div>
                  {simulatedVideo && (
                    <div className="space-y-2">
                      <p className="text-center text-xs font-black text-pink-400">ویدیو ترنزیشن (AI Video)</p>
                      <video src={simulatedVideo} className="w-full aspect-square object-cover rounded-[30px] shadow-2xl" autoPlay loop muted />
                    </div>
                  )}
                </div>
                <p className="mt-8 text-center text-xs text-gray-400 italic font-bold">این یک شبیه‌سازی با هوش مصنوعی است و صرفاً جهت تخمین کلی ارائه می‌شود.</p>
              </div>
            )}
          </div>
        ) : (
          /* Consultation & BeforeAfter modes from existing code but with enhanced loading */
          <div className="space-y-10 relative z-10">
             {/* [Existing consultation logic...] */}
             <div className="text-center space-y-4">
              <h2 className="text-4xl font-black text-gray-900 tracking-tighter">
                {mode === 'consultation' ? 'مشاوره زیبایی با هوش مصنوعی' : 'تحلیل تغییرات (قبل و بعد)'}
              </h2>
              <p className="text-gray-500 font-medium max-w-xl mx-auto leading-relaxed">
                {mode === 'consultation' ? 'لطفاً یک عکس تمام‌رخ و واضح آپلود کنید.' : 'تصاویر قبل و بعد جراحی خود را مقایسه کنید.'}
              </p>
            </div>

            <div className="max-w-md mx-auto">
              {mode === 'consultation' ? (
                <div className="relative aspect-[3/4] bg-gray-50 rounded-[40px] border-4 border-dashed border-gray-200 overflow-hidden group">
                  {singleImg ? (
                    <img src={singleImg} className="w-full h-full object-cover" />
                  ) : (
                    <label className="h-full flex flex-col items-center justify-center cursor-pointer p-8">
                      <div className="text-5xl mb-4">📸</div>
                      <p className="font-black text-gray-900 text-center">انتخاب عکس تمام‌رخ</p>
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'single')} />
                    </label>
                  )}
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-pink-600/40 backdrop-blur-md flex items-center justify-center">
                      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {/* [Simplified Before/After UI] */}
                  <div className="aspect-square bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
                    {beforeImg ? <img src={beforeImg} className="w-full h-full object-cover" /> : <input type="file" className="opacity-0 absolute inset-0 cursor-pointer" onChange={(e) => handleFileChange(e, 'before')} />}
                  </div>
                  <div className="aspect-square bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
                    {afterImg ? <img src={afterImg} className="w-full h-full object-cover" /> : <input type="file" className="opacity-0 absolute inset-0 cursor-pointer" onChange={(e) => handleFileChange(e, 'after')} />}
                  </div>
                </div>
              )}
            </div>

            <div className="text-center">
              <button 
                onClick={mode === 'consultation' ? handleConsultationAnalyze : handleBeforeAfterAnalyze}
                disabled={isAnalyzing}
                className="px-12 py-5 bg-pink-600 text-white rounded-[25px] font-black text-lg shadow-2xl shadow-pink-100 hover:scale-105 disabled:bg-gray-200"
              >
                {isAnalyzing ? 'در حال تحلیل...' : 'شروع آنالیز هوشمند'}
              </button>
            </div>
          </div>
        )}

        {analysis && (
          <div className="mt-16 p-8 md:p-12 bg-gray-900 rounded-[40px] text-white animate-in fade-in slide-in-from-bottom-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-pink-600/20 rounded-full blur-3xl"></div>
            <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
              <span className="w-10 h-10 bg-pink-600 text-white rounded-2xl flex items-center justify-center">💡</span>
              گزارش اختصاصی Zibaas AI
            </h3>
            <div className="relative z-10 text-gray-300 leading-[1.8] font-medium whitespace-pre-wrap text-right text-lg">
              {analysis}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BeforeAfterAnalysis;
