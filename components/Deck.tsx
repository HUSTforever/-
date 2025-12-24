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

interface FlyingCard {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

const Deck: React.FC<DeckProps> = ({ onCardSelect, disabled, selectedCount, totalNeeded, selectedIds }) => {
  const [shuffledDeck, setShuffledDeck] = useState<TarotCard[]>([]);
  const [hoveredCard, setHoveredCard] = useState<TarotCard | null>(null);
  const [lastSelectedCard, setLastSelectedCard] = useState<TarotCard | null>(null);
  const [flyingCard, setFlyingCard] = useState<FlyingCard | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const newDeck = [...DECK].sort(() => Math.random() - 0.5);
    setShuffledDeck(newDeck);
  }, []);

  const handleCardClick = (card: TarotCard, event: React.MouseEvent) => {
    if (disabled || selectedCount >= totalNeeded || selectedIds.includes(card.id)) return;

    // 获取点击卡片的位置
    const cardRect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    
    // 获取目标槽位的位置
    const targetSlotIndex = selectedCount;
    const slotElement = slotRefs.current[targetSlotIndex];
    if (slotElement) {
      const slotRect = slotElement.getBoundingClientRect();
      
      setFlyingCard({
        id: card.id,
        startX: cardRect.left,
        startY: cardRect.top,
        endX: slotRect.left,
        endY: slotRect.top
      });

      // 动画结束后正式触发选择
      setTimeout(() => {
        onCardSelect(card);
        setLastSelectedCard(card);
        setFlyingCard(null);
      }, 750);
    } else {
      onCardSelect(card);
      setLastSelectedCard(card);
    }
  };

  const displayCard = hoveredCard || lastSelectedCard;

  return (
    <div className="w-full py-8 px-4 relative flex flex-col items-center">
      {/* 占卜槽位：卡片飞向的目标区域 */}
      <div className="text-center mb-10 w-full max-w-4xl">
        <h2 className="text-2xl font-cinzel text-amber-200 mb-6 tracking-widest">
          {selectedCount < totalNeeded 
            ? `请挑选 ${totalNeeded - selectedCount} 枚命运之种`
            : "阵法已成，共鸣中..."}
        </h2>
        
        <div className="flex justify-center gap-6 md:gap-10">
          {Array.from({ length: totalNeeded }).map((_, i) => (
            <div 
              key={i} 
              ref={el => { slotRefs.current[i] = el; }}
              className={`
                w-16 h-28 md:w-24 md:h-40 rounded-lg border-2 transition-all duration-700 relative
                ${i < selectedCount 
                  ? 'border-amber-400 bg-amber-950/40 shadow-[0_0_15px_rgba(251,191,36,0.4)]' 
                  : 'border-amber-900/20 bg-black/20'}
              `}
            >
              {/* 槽位背景装饰 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <i className={`fa-solid fa-bahai text-xl transition-all duration-500 ${i < selectedCount ? 'text-amber-500 opacity-80 scale-110' : 'text-amber-900/20'}`}></i>
              </div>

              {/* 已填充状态 */}
              {i < selectedCount && (
                <div className="absolute inset-0 p-1 animate-fadeIn">
                   <div className="w-full h-full bg-[#1a1a3a] rounded-md border border-amber-500/30 flex items-center justify-center">
                     <div className="absolute inset-0 card-shimmer opacity-20"></div>
                     <i className="fa-solid fa-moon text-amber-500/40 text-sm"></i>
                   </div>
                </div>
              )}
              
              <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-cinzel text-amber-500/40 uppercase tracking-tighter whitespace-nowrap`}>
                Slot {i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 飞行的卡片虚影 */}
      {flyingCard && (
        <div 
          className="animate-card-fly w-36 h-60 md:w-44 md:h-72 bg-[#1e1b4b] rounded-xl border-2 border-amber-400"
          style={{
            '--start-x': `${flyingCard.startX}px`,
            '--start-y': `${flyingCard.startY}px`,
            '--end-x': `${flyingCard.endX}px`,
            '--end-y': `${flyingCard.endY}px`,
            top: 0,
            left: 0,
          } as any}
        >
          <div className="w-full h-full bg-[#0c0c1e] flex items-center justify-center p-3">
             <div className="w-full h-full border border-amber-600/30 rounded-lg bg-[#1a1a3a]"></div>
          </div>
        </div>
      )}

      {/* 选牌信息展示 */}
      <div className={`h-24 transition-all duration-500 flex flex-col items-center mb-6 ${displayCard ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {displayCard && (
          <div className="text-center bg-black/60 backdrop-blur-xl px-8 py-4 rounded-2xl border border-amber-500/50 shadow-[0_0_40px_rgba(251,191,36,0.2)] max-w-xl animate-fadeIn">
            <div className="flex items-center justify-center gap-3 mb-1">
               <span className="text-amber-500 text-[10px] uppercase tracking-[0.2em] font-cinzel">
                 {hoveredCard ? '星辰指引' : '契约已成'}
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
          const isAnimating = flyingCard?.id === card.id;

          return (
            <div 
              key={`${card.id}-${idx}`}
              onClick={(e) => handleCardClick(card, e)}
              onMouseEnter={() => setHoveredCard(card)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`
                flex-shrink-0 w-36 h-60 md:w-44 md:h-72 rounded-xl border-2 
                cursor-pointer transition-all duration-500 transform snap-center
                relative overflow-hidden group 
                ${isSelected 
                  ? 'border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.6)] -translate-y-8 scale-110 z-10' 
                  : 'border-amber-900/40 hover:border-amber-500 hover:-translate-y-6 hover:rotate-2 hover:shadow-[0_0_20px_rgba(251,191,36,0.2)] bg-[#1e1b4b]'}
                ${(disabled || isAnimating) && !isSelected ? 'opacity-40 cursor-not-allowed grayscale' : 'opacity-100'}
              `}
            >
              <div className="absolute inset-0 bg-[#0c0c1e] flex items-center justify-center p-3">
                 <div className="w-full h-full border-2 border-amber-600/30 rounded-lg flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#1a1a3a] via-[#0c0c1e] to-[#2a1a3a]">
                   <div className="absolute inset-0 card-shimmer opacity-30"></div>
                   
                   <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-amber-500/40 rounded-full animate-[spin_30s_linear_infinite]"></div>
                   </div>

                   <div className="flex flex-col items-center relative z-10">
                      <div className="w-16 h-16 border border-amber-500/40 rounded-full flex items-center justify-center mb-2 bg-amber-950/20 backdrop-blur-sm transition-transform group-hover:scale-110">
                        <i className={`fa-solid fa-eye text-2xl text-amber-500/60 ${isSelected ? 'animate-none' : 'animate-pulse'}`}></i>
                      </div>
                   </div>

                   {isSelected && (
                     <div className="absolute inset-0 bg-amber-500/20 flex flex-col items-center justify-center backdrop-blur-[2px] animate-fadeIn">
                       <i className="fa-solid fa-check text-2xl text-amber-400 shadow-sm"></i>
                     </div>
                   )}
                 </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col items-center mt-4 gap-2">
        <div className="flex items-center gap-4 text-amber-500/30 text-xs">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500/30"></div>
          <p className="font-cinzel tracking-[0.3em] uppercase">触碰虚空 寻获真理</p>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500/30"></div>
        </div>
      </div>
    </div>
  );
};

export default Deck;