
import React from 'react';
import { SelectedCard, ReadingResult } from '../types';

interface ReadingDisplayProps {
  selectedCards: SelectedCard[];
  question: string;
  onReset: () => void;
  readingResult: ReadingResult | null;
}

const ReadingDisplay: React.FC<ReadingDisplayProps> = ({ selectedCards, question, onReset, readingResult }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-xl font-cinzel text-amber-500/70 tracking-widest uppercase">你的疑问</h2>
        <p className="text-2xl text-amber-100 italic">“{question}”</p>
        <div className="h-px w-32 bg-amber-500/30 mx-auto mt-6"></div>
      </div>

      {/* 选中的卡片展示 */}
      <div className="flex flex-wrap justify-center gap-10 perspective-1000">
        {selectedCards.map((item, idx) => (
          <div 
            key={idx} 
            className="flex flex-col items-center animate-fadeIn" 
            style={{ animationDelay: `${idx * 200}ms` }}
          >
            <span className="text-amber-400 font-cinzel text-sm mb-4 tracking-wider bg-amber-900/20 px-3 py-1 rounded-full border border-amber-500/20">
              {item.positionName}
            </span>
            
            <div 
              className="relative w-40 h-64 preserve-3d animate-flip-reveal shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-xl"
              style={{ animationDelay: `${(idx * 300) + 500}ms` }}
            >
              {/* 卡片背面 */}
              <div className="absolute inset-0 backface-hidden bg-[#1e1b4b] border-2 border-amber-700/50 rounded-xl overflow-hidden">
                <div className="w-full h-full bg-indigo-950 flex items-center justify-center p-4">
                   <div className="w-full h-full border border-amber-600/30 rounded-lg flex items-center justify-center relative">
                     <div className="absolute inset-0 card-shimmer"></div>
                     <i className="fa-solid fa-moon text-3xl text-amber-500/40"></i>
                   </div>
                </div>
              </div>

              {/* 卡片正面 */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-black rounded-xl border-2 border-amber-500/80 overflow-hidden shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                <div className={`w-full h-full ${item.isReversed ? 'rotate-180' : ''}`}>
                  <img src={item.card.image} alt={item.card.name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md p-2 text-center border-t border-amber-500/30">
                    <p className="text-xs font-cinzel text-amber-200 font-bold">{item.card.name}</p>
                    <p className="text-[9px] text-amber-400/80 uppercase tracking-tighter">
                      {item.isReversed ? '逆位 (REVERSED)' : '正位 (UPRIGHT)'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 卡片的基础含义展示 */}
            <div className="mt-8 text-center max-w-[180px] animate-fadeIn" style={{ animationDelay: `${(idx * 300) + 1200}ms` }}>
              <p className="text-sm text-slate-300 leading-relaxed italic">
                {item.isReversed ? `逆位指引：${item.card.meaning} 可能面临阻碍或需要反向思考。` : item.card.meaning}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* AI 深度解读展示 */}
      {readingResult && (
        <div className="mt-16 space-y-12 animate-fadeIn" style={{ animationDelay: '2000ms' }}>
          <div className="bg-amber-950/20 p-8 rounded-3xl border border-amber-500/30 backdrop-blur-md shadow-2xl">
            <h3 className="text-2xl font-cinzel text-amber-400 mb-6 flex items-center gap-3">
              <i className="fa-solid fa-sparkles"></i> 整体总结
            </h3>
            <p className="text-amber-100 text-lg leading-relaxed italic">“{readingResult.summary}”</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {readingResult.cardInterpretations.map((interp, idx) => (
              <div key={idx} className="bg-black/40 p-6 rounded-2xl border border-amber-900/40 hover:border-amber-500/30 transition-colors">
                <h4 className="text-amber-500 font-cinzel font-bold mb-3 flex items-center gap-2">
                  <span className="w-1 h-4 bg-amber-500 rounded-full"></span>
                  {interp.cardName}
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">{interp.interpretation}</p>
              </div>
            ))}
          </div>

          <div className="bg-indigo-950/30 p-8 rounded-3xl border border-indigo-500/30 shadow-2xl">
            <h3 className="text-2xl font-cinzel text-indigo-300 mb-6 flex items-center gap-3">
              <i className="fa-solid fa-wand-magic-sparkles"></i> 灵性建议
            </h3>
            <p className="text-slate-200 leading-relaxed">{readingResult.guidance}</p>
          </div>
        </div>
      )}

      <div className="flex justify-center pt-12 pb-20">
        <button 
          onClick={onReset}
          className="px-12 py-4 bg-transparent border-2 border-amber-600 text-amber-500 rounded-full font-cinzel font-bold hover:bg-amber-600 hover:text-black transition-all shadow-[0_0_15px_rgba(217,119,6,0.2)]"
        >
          重新开启启示
        </button>
      </div>
    </div>
  );
};

export default ReadingDisplay;
