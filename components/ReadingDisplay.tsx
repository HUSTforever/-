
import React from 'react';
import { ReadingResult, SelectedCard } from '../types';

interface ReadingDisplayProps {
  reading: ReadingResult;
  selectedCards: SelectedCard[];
  onReset: () => void;
}

const ReadingDisplay: React.FC<ReadingDisplayProps> = ({ reading, selectedCards, onReset }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
      {/* 选中的卡片展示（带有翻牌动画） */}
      <div className="flex flex-wrap justify-center gap-8 perspective-1000">
        {selectedCards.map((item, idx) => (
          <div 
            key={idx} 
            className="flex flex-col items-center animate-fadeIn" 
            style={{ animationDelay: `${idx * 200}ms` }}
          >
            <span className="text-amber-400 font-cinzel text-sm mb-4 tracking-wider">{item.positionName}</span>
            
            {/* 3D 翻转容器 */}
            <div 
              className="relative w-40 h-64 preserve-3d animate-flip-reveal shadow-2xl rounded-xl"
              style={{ animationDelay: `${(idx * 300) + 500}ms` }}
            >
              {/* 卡片背面（初始可见） */}
              <div className="absolute inset-0 backface-hidden bg-[#1e1b4b] border-2 border-amber-700/50 rounded-xl overflow-hidden">
                <div className="w-full h-full bg-indigo-950 flex items-center justify-center p-4">
                   <div className="w-full h-full border border-amber-600/30 rounded-lg flex items-center justify-center relative overflow-hidden">
                     <div className="absolute inset-0 card-shimmer"></div>
                     <i className="fa-solid fa-moon text-3xl text-amber-500/40"></i>
                     <div className="absolute top-2 left-2"><i className="fa-solid fa-star text-[10px] text-amber-500/20"></i></div>
                     <div className="absolute bottom-2 right-2"><i className="fa-solid fa-star text-[10px] text-amber-500/20"></i></div>
                   </div>
                </div>
              </div>

              {/* 卡片正面（翻转后可见） */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-black rounded-xl border-2 border-amber-600 overflow-hidden">
                <div className={`w-full h-full ${item.isReversed ? 'rotate-180' : ''}`}>
                  <img src={item.card.image} alt={item.card.name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-2 text-center">
                    <p className="text-xs font-cinzel text-amber-100">{item.card.name}</p>
                    <p className="text-[9px] text-amber-400/80 uppercase tracking-tighter">
                      {item.isReversed ? '逆位 (REVERSED)' : '正位 (UPRIGHT)'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 占卜解读内容 */}
      <div className="bg-[#1a1a2e]/80 border border-amber-900/40 p-8 rounded-2xl backdrop-blur-md shadow-2xl space-y-8 animate-fadeIn" style={{ animationDelay: '1.5s' }}>
        <div className="text-center">
          <h2 className="text-3xl font-cinzel text-amber-300 mb-4 italic">宇宙的回响...</h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>
        </div>

        <section>
          <h3 className="text-xl font-cinzel text-amber-200 mb-4 flex items-center">
            <i className="fa-solid fa-sparkles mr-3 text-amber-500"></i>总体解读
          </h3>
          <p className="text-lg leading-relaxed text-slate-200 italic pl-4 border-l-2 border-amber-500/30">
            {reading.summary}
          </p>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-cinzel text-amber-200 mb-4 flex items-center">
            <i className="fa-solid fa-scroll mr-3 text-amber-500"></i>分牌解析
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {reading.cardInterpretations.map((item, idx) => (
              <div key={idx} className="bg-indigo-950/30 p-5 rounded-lg border border-indigo-900/50 hover:border-amber-500/30 transition-colors">
                <h4 className="font-cinzel text-amber-100 mb-2 border-b border-amber-500/20 pb-1">{item.cardName}</h4>
                <p className="text-sm text-slate-300 leading-relaxed">{item.interpretation}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-amber-950/20 p-8 rounded-xl border border-amber-700/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <i className="fa-solid fa-quote-right text-6xl text-amber-500"></i>
          </div>
          <h3 className="text-xl font-cinzel text-amber-200 mb-4 text-center">前进之路</h3>
          <p className="text-slate-200 text-center leading-relaxed max-w-2xl mx-auto">
            {reading.guidance}
          </p>
        </section>

        <div className="flex justify-center pt-8">
          <button 
            onClick={onReset}
            className="px-10 py-4 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 rounded-full font-cinzel text-black font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(217,119,6,0.3)]"
          >
            重新开启占卜
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadingDisplay;
