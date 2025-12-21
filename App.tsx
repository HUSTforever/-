
import React, { useState } from 'react';
import { SpreadType, TarotCard, SelectedCard, ReadingResult } from './types';
import { SPREADS } from './constants';
import { generateTarotReading } from './services/geminiService';
import Deck from './components/Deck';
import ReadingDisplay from './components/ReadingDisplay';

const App: React.FC = () => {
  const [step, setStep] = useState<'intro' | 'setup' | 'selection' | 'reading'>('intro');
  const [question, setQuestion] = useState('');
  const [spread, setSpread] = useState<SpreadType>(SpreadType.THREE_CARD);
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [readingResult, setReadingResult] = useState<ReadingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startSetup = () => setStep('setup');
  
  const startSelection = () => {
    if (!question.trim()) {
      alert("请输入你的困惑或想要占卜的问题。");
      return;
    }
    setStep('selection');
    setSelectedCards([]);
  };

  const handleCardSelect = (card: TarotCard) => {
    const spreadInfo = SPREADS[spread];
    const nextIndex = selectedCards.length;
    
    // 检查卡片是否已被选中，避免重复选择同一张（如果逻辑允许）
    if (selectedCards.some(sc => sc.card.id === card.id)) return;

    if (nextIndex < spreadInfo.slots) {
      const isReversed = Math.random() > 0.7;
      const newCard: SelectedCard = {
        card,
        isReversed,
        positionName: spreadInfo.positions[nextIndex]
      };
      
      const newSelection = [...selectedCards, newCard];
      setSelectedCards(newSelection);

      if (newSelection.length === spreadInfo.slots) {
        getReading(newSelection);
      }
    }
  };

  const getReading = async (cards: SelectedCard[]) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateTarotReading(question, cards);
      setReadingResult(result);
      setStep('reading');
    } catch (err: any) {
      setError(err.message || "宇宙能量中断，请重新尝试。");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep('intro');
    setQuestion('');
    setReadingResult(null);
    setSelectedCards([]);
    setError(null);
  };

  return (
    <div className="min-h-screen mystic-gradient text-slate-200">
      <header className="p-6 flex justify-between items-center border-b border-amber-900/20 backdrop-blur-sm sticky top-0 z-50">
        <h1 className="text-2xl font-cinzel font-bold text-amber-500 tracking-widest cursor-pointer" onClick={reset}>
          奥秘塔罗
        </h1>
        <div className="flex gap-4">
          <i className="fa-solid fa-sun text-amber-400"></i>
          <i className="fa-solid fa-moon text-indigo-400"></i>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl py-12 px-4 min-h-[80vh] flex flex-col items-center justify-center">
        
        {step === 'intro' && (
          <div className="text-center space-y-8 animate-fadeIn">
            <div className="relative inline-block">
              <i className="fa-solid fa-hand-holding-sparkles text-7xl text-amber-500 mb-6"></i>
              <div className="absolute inset-0 bg-amber-500/20 blur-3xl rounded-full"></div>
            </div>
            <h2 className="text-4xl md:text-6xl font-cinzel text-amber-200 font-bold tracking-tight">揭示你的命运</h2>
            <p className="text-xl text-slate-400 max-w-xl mx-auto italic">
              “群星虽有预兆，却不束缚灵魂。通过古老奥秘寻求指引。”
            </p>
            <button 
              onClick={startSetup}
              className="px-12 py-4 bg-amber-600 hover:bg-amber-500 text-black font-bold font-cinzel rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(217,119,6,0.4)]"
            >
              开启神谕
            </button>
          </div>
        )}

        {step === 'setup' && (
          <div className="w-full max-w-md space-y-8 animate-fadeIn">
            <div className="text-center">
              <h2 className="text-3xl font-cinzel text-amber-200 mb-2">静心思考</h2>
              <p className="text-amber-500/60 text-sm">专注于你内心最真实的问题</p>
            </div>
            
            <div className="space-y-6 bg-indigo-950/20 p-8 rounded-2xl border border-amber-900/30">
              <div className="space-y-2">
                <label className="text-amber-300 font-cinzel block text-sm">你的疑问</label>
                <textarea 
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="例如：我未来半年的职业发展前景如何？"
                  className="w-full bg-[#0a0a14] border border-amber-900/50 rounded-lg p-4 text-slate-200 focus:border-amber-500 outline-none h-32 resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-amber-300 font-cinzel block text-sm">选择牌阵</label>
                <div className="grid grid-cols-1 gap-3">
                  {Object.values(SpreadType).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSpread(type)}
                      className={`
                        p-3 rounded-lg border text-left transition-all
                        ${spread === type 
                          ? 'border-amber-500 bg-amber-500/10 text-amber-200' 
                          : 'border-amber-900/30 bg-black/20 text-slate-400 hover:border-amber-700/50'}
                      `}
                    >
                      <span className="font-cinzel">{type}</span>
                      <p className="text-[10px] opacity-60">
                        {type === SpreadType.SINGLE ? '快速的日常指引' : 
                         type === SpreadType.THREE_CARD ? '探索时间线：过去、现状、未来' : 
                         '更深层次的五牌十字探索'}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={startSelection}
                className="w-full py-4 bg-gradient-to-r from-amber-700 to-amber-600 rounded-lg font-cinzel text-black font-bold hover:brightness-110 transition-all shadow-lg"
              >
                进入占卜空间
              </button>
            </div>
          </div>
        )}

        {step === 'selection' && !loading && (
          <Deck 
            onCardSelect={handleCardSelect} 
            disabled={loading} 
            selectedCount={selectedCards.length}
            totalNeeded={SPREADS[spread].slots}
            selectedIds={selectedCards.map(sc => sc.card.id)}
          />
        )}

        {loading && (
          <div className="flex flex-col items-center space-y-6">
             <div className="relative">
                <div className="w-24 h-24 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
                <i className="fa-solid fa-eye absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-amber-500 animate-pulse"></i>
             </div>
             <div className="text-center">
                <h3 className="text-2xl font-cinzel text-amber-200">正在与星象共鸣...</h3>
                <p className="text-slate-400 italic">“命运之线正在为你编织故事。”</p>
             </div>
          </div>
        )}

        {step === 'reading' && readingResult && (
          <ReadingDisplay 
            reading={readingResult} 
            selectedCards={selectedCards} 
            onReset={reset}
          />
        )}

        {error && (
          <div className="text-center p-8 bg-red-950/20 border border-red-900/50 rounded-xl">
            <p className="text-red-400 mb-4">{error}</p>
            <button onClick={reset} className="text-amber-500 font-cinzel underline underline-offset-4">重试</button>
          </div>
        )}

      </main>

      <footer className="p-8 text-center text-slate-500 text-sm border-t border-amber-900/10">
        <p className="font-cinzel">© 2024 奥秘塔罗 • 灵性见解应用</p>
      </footer>
    </div>
  );
};

export default App;
