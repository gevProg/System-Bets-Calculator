export type SystemType = {
  selections: number;
  required: number;
};

export type Bet = {
  odds: number;
  status: 'correct' | 'incorrect' | 'void';
};

export type BetCombination = {
  bets: number[];
  return: number;
};