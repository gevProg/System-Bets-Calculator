import React from 'react';
import { Bet } from '../types/betting';

interface OddsInputProps {
  index: number;
  bet: Bet;
  onChange: (index: number, field: keyof Bet, value: any) => void;
}

export function OddsInput({ index, bet, onChange }: OddsInputProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm text-gray-300">
          Odds {index + 1}
        </label>
        <div className="flex gap-1">
          {['correct', 'incorrect', 'void'].map((status) => (
            <button
              key={status}
              onClick={() => onChange(index, 'status', status)}
              className={`status-button ${
                bet.status === status ? 'active' : 'inactive'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <input
        type="number"
        step="0.01"
        min="1"
        value={bet.odds}
        onChange={(e) => onChange(index, 'odds', parseFloat(e.target.value))}
        className="calculator-input w-full border"
      />
    </div>
  );
}