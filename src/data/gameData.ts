export interface GameDataType {
  [key: string]: {
    name: string;
    logo: string;
  };
}

export interface ConvertGameDataType {
  gameId: string;
  gameName?: string;
  gameLogo?: string;
  gameType: string;
  isPrivate: boolean;
  title: string;
  desc: string;
  positions: string[] | null;
  totalManCnt: number;
  inManCnt: number;
}

const gameData: GameDataType = {
  lol: {
    name: '리그 오브 레전드',
    logo: '/images/game/lol.svg',
  },
  pubg: {
    name: '배틀그라운드',
    logo: '/images/game/pubg.svg',
  },
  tft: {
    name: '전략적 팀 전투',
    logo: '/images/game/tft.svg',
  },
};

export default gameData;
