
export enum SpreadType {
  SINGLE = '单牌占卜',
  THREE_CARD = '过去、现在、未来',
  CELTIC_CROSS = '五牌十字阵'
}

export interface TarotCard {
  id: number;
  name: string;
  arcana: 'Major' | 'Minor';
  suit?: 'Cups' | 'Pentacles' | 'Swords' | 'Wands';
  meaning: string;
  image: string;
}

export interface SelectedCard {
  card: TarotCard;
  isReversed: boolean;
  positionName?: string;
}

export interface ReadingResult {
  summary: string;
  cardInterpretations: {
    cardName: string;
    interpretation: string;
  }[];
  guidance: string;
}
