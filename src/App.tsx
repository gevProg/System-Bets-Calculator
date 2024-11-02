import React, { useState, useCallback } from 'react';
import { Calculator } from 'lucide-react';
import { SystemSelector } from './components/SystemSelector';
import { OddsInput } from './components/OddsInput';
import { SystemType, Bet, BetCombination } from './types/betting';
import { calculateSystemBetReturns } from './utils/combinations';

function App() {
  const [systemType, setSystemType] = useState<SystemType>({
    selections: 3,
    required: 2,
  });
  const [stake, setStake] = useState<number>(100);
  const [bets, setBets] = useState<Bet[]>([
    { odds: 2.0, status: 'correct' },
    { odds: 2.0, status: 'correct' },
    { odds: 2.0, status: 'correct' },
  ]);
  const [results, setResults] = useState<BetCombination[]>([]);

  const handleBetChange = useCallback((index: number, field: keyof Bet, value: any) => {
    setBets((prev) =>
      prev.map((bet, i) => (i === index ? { ...bet, [field]: value } : bet))
    );
  }, []);

  const calculateReturns = useCallback(() => {
    const combinations = calculateSystemBetReturns(bets, stake, systemType.required);
    setResults(combinations);
  }, [bets, stake, systemType]);

  const totalReturn = results.reduce((sum, combo) => sum + combo.return, 0);

  return (
    <div className="min-h-screen bg-[#1a1a1a] py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-[#222] rounded-md shadow-xl border border-[#333] overflow-hidden">
          <div className="bg-[#282828] px-6 py-4 border-b border-[#333] flex items-center gap-3">
            <Calculator className="w-6 h-6 text-[#00b073]" />
            <h1 className="text-xl font-bold text-white">System Bets Calculator</h1>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <SystemSelector value={systemType} onChange={setSystemType} />
                
                <div className="mb-6">
                  <label className="block text-sm text-gray-300 mb-2">
                    Total Stake (€)
                  </label>
                  <input
                    type="number"
                    value={stake}
                    onChange={(e) => setStake(parseFloat(e.target.value))}
                    className="calculator-input w-full border"
                  />
                </div>

                {Array.from({ length: systemType.selections }).map((_, i) => (
                  <OddsInput
                    key={i}
                    index={i}
                    bet={bets[i] || { odds: 2.0, status: 'correct' }}
                    onChange={handleBetChange}
                  />
                ))}

                <button
                  onClick={calculateReturns}
                  className="w-full bg-[#00b073] text-white py-3 rounded-sm font-medium hover:bg-[#00c082] transition-colors mt-6"
                >
                  Calculate
                </button>
              </div>

              <div className="bg-[#1d1d1d] rounded-md p-6">
                <h2 className="text-lg font-semibold mb-4 text-[#00b073]">Calculation Results</h2>
                
                <div className="space-y-3">
                  {results.map((combo, i) => (
                    <div key={i} className="p-3 bg-[#282828] rounded-sm border border-[#333]">
                      <div className="text-sm text-gray-400">
                        Combination {combo.bets.map(b => b + 1).join(', ')}
                      </div>
                      <div className="font-medium text-white">
                        Return: €{combo.return.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                {results.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-[#333]">
                    <div className="text-xl font-bold text-[#00b073]">
                      Total Potential Return: €{totalReturn.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      Profit: €{(totalReturn - stake).toFixed(2)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;