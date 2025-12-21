
import { TarotCard, SpreadType } from './types';

// 使用维基百科和公认的塔罗资源提供的标准伟特塔罗牌图
const RWS_BASE = "https://raw.githubusercontent.com/BrunnerLivio/Tarot-API/master/static/cards/";

export const DECK: TarotCard[] = [
  { id: 0, name: "愚者", arcana: "Major", meaning: "冒险的开始，纯真，潜力和自发性。", image: `${RWS_BASE}m00.jpg` },
  { id: 1, name: "魔术师", arcana: "Major", meaning: "意志力，创造力，显化力量和沟通。", image: `${RWS_BASE}m01.jpg` },
  { id: 2, name: "女祭司", arcana: "Major", meaning: "直觉，神秘，潜意识和内在知识。", image: `${RWS_BASE}m02.jpg` },
  { id: 3, name: "皇后", arcana: "Major", meaning: "丰饶，女性特质，美与大自然的结合。", image: `${RWS_BASE}m03.jpg` },
  { id: 4, name: "皇帝", arcana: "Major", meaning: "权威，结构，坚实的根基和父亲形象。", image: `${RWS_BASE}m04.jpg` },
  { id: 5, name: "教皇", arcana: "Major", meaning: "传统，精神指引，体制和宗教归属。", image: `${RWS_BASE}m05.jpg` },
  { id: 6, name: "恋人", arcana: "Major", meaning: "爱情，和谐，关系，共同价值观和选择。", image: `${RWS_BASE}m06.jpg` },
  { id: 7, name: "战车", arcana: "Major", meaning: "控制，意志，胜利，决断和自律。", image: `${RWS_BASE}m07.jpg` },
  { id: 8, name: "力量", arcana: "Major", meaning: "勇气，耐心，柔韧的力量和内在控制。", image: `${RWS_BASE}m08.jpg` },
  { id: 9, name: "隐士", arcana: "Major", meaning: "反省，自省，孤独和寻求真理。", image: `${RWS_BASE}m09.jpg` },
  { id: 10, name: "命运之轮", arcana: "Major", meaning: "转折点，命运，机遇，循环和决定性时刻。", image: `${RWS_BASE}m10.jpg` },
  { id: 11, name: "正义", arcana: "Major", meaning: "公平，因果，诚实和法律责任。", image: `${RWS_BASE}m11.jpg` },
  { id: 12, name: "倒吊人", arcana: "Major", meaning: "牺牲，换位思考，释放，限制和新的视角。", image: `${RWS_BASE}m12.jpg` },
  { id: 13, name: "死神", arcana: "Major", meaning: "终结，巨大的转变，释放过去和重生。", image: `${RWS_BASE}m13.jpg` },
  { id: 14, name: "节制", arcana: "Major", meaning: "平衡，节制，融合与耐心的引导。", image: `${RWS_BASE}m14.jpg` },
  { id: 15, name: "恶魔", arcana: "Major", meaning: "束缚，沉溺，物质主义，阴暗面和恐惧。", image: `${RWS_BASE}m15.jpg` },
  { id: 16, name: "塔", arcana: "Major", meaning: "突发变故，崩塌，启示和自尊心的破碎。", image: `${RWS_BASE}m16.jpg` },
  { id: 17, name: "星星", arcana: "Major", meaning: "希望，灵感，治愈，平静和精神引导。", image: `${RWS_BASE}m17.jpg` },
  { id: 18, name: "月亮", arcana: "Major", meaning: "幻象，焦虑，不安，潜意识和梦境。", image: `${RWS_BASE}m18.jpg` },
  { id: 19, name: "太阳", arcana: "Major", meaning: "成功，快乐，活力，清晰和成就感。", image: `${RWS_BASE}m19.jpg` },
  { id: 20, name: "审判", arcana: "Major", meaning: "觉醒，重生，评估和最终决定。", image: `${RWS_BASE}m20.jpg` },
  { id: 21, name: "世界", arcana: "Major", meaning: "完成，整合，圆满，旅行和阶段性的终点。", image: `${RWS_BASE}m21.jpg` },
  // 小阿尔卡那 - 首牌系列
  { id: 22, name: "圣杯首牌", arcana: "Minor", suit: "Cups", meaning: "情感的流动，爱，新的友谊，创造力。", image: `${RWS_BASE}c01.jpg` },
  { id: 23, name: "宝剑首牌", arcana: "Minor", suit: "Swords", meaning: "清晰的思维，突破，真相和理性的胜利。", image: `${RWS_BASE}s01.jpg` },
  { id: 24, name: "星币首牌", arcana: "Minor", suit: "Pentacles", meaning: "物质机会，繁荣，实际的计划和财富积累。", image: `${RWS_BASE}p01.jpg` },
  { id: 25, name: "权杖首牌", arcana: "Minor", suit: "Wands", meaning: "行动的火花，热情，勇气，开创性的项目。", image: `${RWS_BASE}w01.jpg` },
];

export const SPREADS = {
  [SpreadType.SINGLE]: {
    slots: 1,
    positions: ['每日启示']
  },
  [SpreadType.THREE_CARD]: {
    slots: 3,
    positions: ['过去', '现状', '未来']
  },
  [SpreadType.CELTIC_CROSS]: {
    slots: 5,
    positions: ['核心', '挑战', '潜意识', '过去', '潜在结果']
  }
};
