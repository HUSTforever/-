
import React, { useState } from 'react';
import { SpreadType, TarotCard, SelectedCard, ReadingResult } from './types';
import { SPREADS } from './constants';
import Deck from './components/Deck';
import ReadingDisplay from './components/ReadingDisplay';
// 导入 Gemini 占卜服务
import { generateTarotReading } from './services/geminiService';

const App: React.FC = () => {
  const [step, setStep] = useState<'intro' | 'setup' | 'selection' | 'reading'>('intro');
  const [question, setQuestion] = useState('');
  const [spread, setSpread] = useState<SpreadType>(SpreadType.THREE_CARD);
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);
  const [isMeditating, setIsMeditating] = useState(false);
  // 存储 AI 占卜结果的状态
  const [readingResult, setReadingResult] = useState<ReadingResult | null>(null);

  const startSetup = () => setStep('setup');
  
  const startSelection = () => {
    if (!question.trim()) {
      alert("请输入你的困惑或想要占卜的问题。");
      return;
    }
    setStep('selection');
    setSelectedCards([]);
    setReadingResult(null);
  };

  const handleCardSelect = (card: TarotCard) => {
    const spreadInfo = SPREADS[spread];
    const nextIndex = selectedCards.length;
    
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
        // 当选完卡片后，触发 AI 占卜流程
        performAIReading(newSelection);
      }
    }
  };

  // 执行 AI 占卜，调用 Gemini 服务
  const performAIReading = async (cards: SelectedCard[]) => {
    setIsMeditating(true);
    try {
      const result = await generateTarotReading(question, cards);
      setReadingResult(result);
      setStep('reading');
    } catch (error) {
      console.error("占卜链接中断:", error);
      // 如果 AI 失败，允许进入结果页查看本地牌面含义
      setReadingResult(null);
      setStep('reading');
    } finally {
      setIsMeditating(false);
    }
  };

  const reset = () => {
    setStep('intro');
    setQuestion('');
    setSelectedCards([]);
    setReadingResult(null);
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
              “纯净的心灵是通往智慧的唯一钥匙。点击下方开启你的旅程。”
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
                  placeholder="例如：关于我的职业发展，塔罗能给我什么启示？"
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

        {step === 'selection' && !isMeditating && (
          <Deck 
            onCardSelect={handleCardSelect} 
            disabled={isMeditating} 
            selectedCount={selectedCards.length}
            totalNeeded={SPREADS[spread].slots}
            selectedIds={selectedCards.map(sc => sc.card.id)}
          />
        )}

        {isMeditating && (
          <div className="flex flex-col items-center space-y-6">
             <div className="relative">
                <div className="w-24 h-24 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
                <i className="fa-solid fa-om absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-amber-500 animate-pulse"></i>
             </div>
             <div className="text-center">
                <h3 className="text-2xl font-cinzel text-amber-200">正在解读星象...</h3>
                <p className="text-amber-500/40 text-sm mt-2">连接更高次元的智慧</p>
             </div>
          </div>
        )}

        {step === 'reading' && (
          <ReadingDisplay 
            selectedCards={selectedCards} 
            question={question}
            onReset={reset}
            readingResult={readingResult}
          />
        )}
      </main>

      <footer className="p-8 text-center text-slate-500 text-sm border-t border-amber-900/10">
        <p className="font-cinzel">© 2025 奥秘塔罗 • 星辰增强版</p>
      </footer>
    </div>
  );
};

export default App;
