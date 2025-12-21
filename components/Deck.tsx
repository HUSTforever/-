
import React, { useState, useRef, useEffect } from 'react';
import { TarotCard } from '../types';
import { DECK } from '../constants';

interface DeckProps {
  onCardSelect: (card: TarotCard) => void;
  disabled: boolean;
  selectedCount: number;
  totalNeeded: number;
  selectedIds: number[];
}

const Deck: React.FC<DeckProps> = ({ onCardSelect, disabled, selectedCount, totalNeeded, selectedIds }) => {
  const [shuffledDeck, setShuffledDeck] = useState<TarotCard[]>([]);
  const [hoveredCard, setHoveredCard] = useState<TarotCard | null>(null);
  const [lastSelectedCard, setLastSelectedCard] = useState<TarotCard | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newDeck = [...DECK].sort(() => Math.random() - 0.5);
    setShuffledDeck(newDeck);
  }, []);

  const handleCardClick = (card: TarotCard) => {
    if (!disabled && selectedCount < totalNeeded && !selectedIds.includes(card.id)) {
      onCardSelect(card);
      setLastSelectedCard(card);
    }
  };

  // 决定顶部信息栏显示哪张牌的信息
  const displayCard = hoveredCard || lastSelectedCard;

  return (
    <div className="w-full py-12 px-4 relative flex flex-col items-center">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-cinzel text-amber-200">
          {selectedCount < totalNeeded 
            ? `请从星阵中挑选 ${totalNeeded - selectedCount} 张牌`
            : "所有牌已选好，正在开启神谕..."}
        </h2>
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalNeeded }).map((_, i) => (
            <div 
              key={i} 
              className={`w-3 h-3 rounded-full border border-amber-500/50 transition-all duration-500 ${i < selectedCount ? 'bg-amber-400 shadow-[0_0_12px_#fbbf24]' : 'bg-transparent scale-90'}`}
            />
          ))}
        </div>
      </div>

      {/* 信息展示区域：显示悬停或选中的卡片含义 */}
      <div className={`h-24 transition-all duration-500 flex flex-col items-center mb-6 ${displayCard ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {displayCard && (
          <div className="text-center bg-black/60 backdrop-blur-xl px-8 py-4 rounded-2xl border border-amber-500/50 shadow-[0_0_40px_rgba(251,191,36,0.2)] max-w-xl animate-fadeIn">
            <div className="flex items-center justify-center gap-3 mb-1">
               <span className="text-amber-500 text-xs uppercase tracking-widest font-cinzel">
                 {hoveredCard ? '探索中' : '已选择'}
               </span>
               <div className="h-px w-8 bg-amber-500/30"></div>
               <p className="text-amber-300 font-cinzel font-bold text-xl">{displayCard.name}</p>
            </div>
            <p className="text-slate-200 text-sm italic leading-relaxed">{displayCard.meaning}</p>
          </div>
        )}
      </div>

      <div 
        ref={scrollRef}
        className="w-full flex gap-6 overflow-x-auto no-scrollbar pb-20 px-12 snap-x"
      >
        {shuffledDeck.map((card, idx) => {
          const isSelected = selectedIds.includes(card.id);
          return (
            <div 
              key={`${card.id}-${idx}`}
              onClick={() => handleCardClick(card)}
              onMouseEnter={() => setHoveredCard(card)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`
                flex-shrink-0 w-36 h-60 md:w-44 md:h-72 rounded-xl border-2 
                cursor-pointer transition-all duration-500 transform snap-center
                relative overflow-hidden group 
                ${isSelected 
                  ? 'border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.6)] -translate-y-8 scale-110 z-10' 
                  : 'border-amber-900/40 hover:border-amber-500 hover:-translate-y-6 hover:rotate-2 hover:shadow-[0_0_20px_rgba(251,191,36,0.2)] bg-[#1e1b4b]'}
                ${disabled && !isSelected ? 'opacity-40 cursor-not-allowed grayscale' : 'opacity-100'}
              `}
            >
              {/* 卡片背面：更具象的神秘主义图案 */}
              <div className="absolute inset-0 bg-[#0c0c1e] flex items-center justify-center p-3">
                 <div className="w-full h-full border-2 border-amber-600/30 rounded-lg flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#1a1a3a] via-[#0c0c1e] to-[#2a1a3a]">
                   <div className="absolute inset-0 card-shimmer opacity-30"></div>
                   
                   {/* 背景几何星图 */}
                   <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-amber-500/40 rounded-full animate-[spin_30s_linear_infinite]"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-amber-500/20 rotate-45"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-amber-500/20 -rotate-45"></div>
                   </div>

                   {/* 核心象征符号：曼陀罗与眼睛 */}
                   <div className="flex flex-col items-center relative z-10">
                      <div className="w-16 h-16 border border-amber-500/40 rounded-full flex items-center justify-center mb-2 bg-amber-950/20 backdrop-blur-sm">
                        <i className="fa-solid fa-eye text-2xl text-amber-500/60 animate-pulse"></i>
                      </div>
                      <div className="flex gap-3 text-amber-600/40">
                        <i className="fa-solid fa-moon text-xs"></i>
                        <i className="fa-solid fa-star text-[10px] animate-pulse"></i>
                        <i className="fa-solid fa-sun text-xs"></i>
                      </div>
                   </div>

                   {/* 选中效果叠加 */}
                   {isSelected && (
                     <div className="absolute inset-0 bg-amber-500/20 flex flex-col items-center justify-center backdrop-blur-[2px] animate-fadeIn">
                       <div className="bg-amber-400 text-black font-bold font-cinzel text-[11px] px-3 py-1 rounded shadow-[0_0_15px_rgba(0,0,0,0.5)] mb-4">
                         命中所属
                       </div>
                       <div className="w-12 h-12 rounded-full border-2 border-amber-400 flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.4)]">
                         <i className="fa-solid fa-check text-2xl text-amber-400"></i>
                       </div>
                     </div>
                   )}

                   {/* 四角神秘符号 */}
                   <div className="absolute top-1.5 left-1.5 opacity-40"><i className="fa-solid fa-ankh text-[10px] text-amber-500"></i></div>
                   <div className="absolute top-1.5 right-1.5 opacity-40"><i className="fa-solid fa-om text-[10px] text-amber-500"></i></div>
                   <div className="absolute bottom-1.5 left-1.5 opacity-40"><i className="fa-solid fa-yin-yang text-[10px] text-amber-500"></i></div>
                   <div className="absolute bottom-1.5 right-1.5 opacity-40"><i className="fa-solid fa-dharmachakra text-[10px] text-amber-500"></i></div>
                 </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col items-center mt-4 gap-2">
        <div className="flex items-center gap-4 text-amber-500/30 text-xs">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500/30"></div>
          <p className="font-cinzel tracking-[0.3em] uppercase">拨动命运之弦</p>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500/30"></div>
        </div>
      </div>
    </div>
  );
};

export default Deck;
