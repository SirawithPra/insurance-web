import React from 'react';

interface SliderControlProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  displayValue?: string;
  unit?: string;
  helpText?: string;
}

export function SliderControl({
  label,
  value,
  onChange,
  min,
  max,
  step,
  displayValue,
  unit,
  helpText
}: SliderControlProps) {
  const display = displayValue || value.toLocaleString();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-slate-700">{label}</label>
        <span className="text-lg font-black text-red-600">
          {display} {unit}
        </span>
      </div>
      
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
      />
      
      <div className="flex justify-between text-xs text-slate-500">
        <span>{min.toLocaleString()}</span>
        <span>{max.toLocaleString()}</span>
      </div>

      {helpText && (
        <p className="text-xs text-slate-500">{helpText}</p>
      )}
    </div>
  );
}

interface SelectOption {
  value: number | string;
  label: string;
  description?: string;
}

interface SelectControlProps {
  label: string;
  value: number | string;
  onChange: (value: number | string) => void;
  options: SelectOption[];
  helpText?: string;
}

export function SelectControl({
  label,
  value,
  onChange,
  options,
  helpText
}: SelectControlProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-bold text-slate-700">{label}</label>
      
      <div className="space-y-2">
        {options.map((option) => (
          <button
            key={String(option.value)}
            onClick={() => onChange(option.value)}
            className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
              value === option.value
                ? 'border-red-500 bg-red-50'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                value === option.value
                  ? 'border-red-600'
                  : 'border-slate-300'
              }`}>
                {value === option.value && (
                  <div className="w-3 h-3 bg-red-600 rounded-full" />
                )}
              </div>
              
              <div className="flex-1">
                <p className="font-bold text-slate-900">{option.label}</p>
                {option.description && (
                  <p className="text-xs text-slate-600 mt-0.5">{option.description}</p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {helpText && (
        <p className="text-xs text-slate-500">{helpText}</p>
      )}
    </div>
  );
}