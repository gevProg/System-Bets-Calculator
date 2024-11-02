import React from 'react';
import { SystemType } from '../types/betting';

interface SystemSelectorProps {
  value: SystemType;
  onChange: (system: SystemType) => void;
}

export function SystemSelector({ value, onChange }: SystemSelectorProps) {
  const options: SystemType[] = [
    { selections: 3, required: 2 },
    { selections: 4, required: 2 },
    { selections: 4, required: 3 },
    { selections: 5, required: 2 },
    { selections: 5, required: 3 },
    { selections: 5, required: 4 },
  ];

  return (
    <div className="mb-6">
      <label className="block text-sm text-gray-300 mb-2">
        System Type
      </label>
      <select
        value={`${value.required}/${value.selections}`}
        onChange={(e) => {
          const [required, selections] = e.target.value.split('/').map(Number);
          onChange({ required, selections });
        }}
        className="calculator-input w-full border"
      >
        {options.map((option) => (
          <option
            key={`${option.required}/${option.selections}`}
            value={`${option.required}/${option.selections}`}
          >
            {option.required} from {option.selections}
          </option>
        ))}
      </select>
    </div>
  );
}