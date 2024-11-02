export function generateCombinations(arr: number[], r: number): number[][] {
  const result: number[][] = [];

  function combine(temp: number[], start: number, r: number) {
    if (r === 0) {
      result.push([...temp]);
      return;
    }

    for (let i = start; i <= arr.length - r; i++) {
      temp.push(arr[i]);
      combine(temp, i + 1, r - 1);
      temp.pop();
    }
  }

  combine([], 0, r);
  return result;
}

export function calculateSystemBetReturns(
  bets: Bet[],
  stake: number,
  required: number
): BetCombination[] {
  const indices = Array.from({ length: bets.length }, (_, i) => i);
  const combinations = generateCombinations(indices, required);
  
  return combinations.map(combo => {
    const combinationOdds = combo
      .map(index => bets[index])
      .filter(bet => bet.status === 'correct')
      .reduce((acc, bet) => acc * bet.odds, 1);

    const unitStake = stake / combinations.length;
    return {
      bets: combo,
      return: combinationOdds * unitStake
    };
  });
}