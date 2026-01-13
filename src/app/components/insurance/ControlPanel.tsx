import React from 'react';
import { Slider } from '../ui/slider';

interface SliderControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  displayValue: string;
  helpText?: string;
  unit?: string;
}

export function SliderControl({
  label,
  value,
  min,
  max,
  step,
  onChange,
  displayValue,
  helpText,
  unit = ''
}: SliderControlProps) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-sm font-bold text-slate-700">
          {label}
        </label>
        <span className="text-xl font-black text-red-600">
          {displayValue} {unit}
        </span>
      </div>
      
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(values) => onChange(values[0])}
        className="w-full"
      />
      
      {helpText && (
        <p className="text-xs text-slate-500 italic text-center">
          💡 {helpText}
        </p>
      )}
    </div>
  );
}

interface SelectControlProps {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  options: { value: string | number; label: string }[];
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
      <label className="text-sm font-bold text-slate-700">
        {label}
      </label>
      
      <select
        value={value}
        onChange={(e) => {
          const val = e.target.value;
          onChange(isNaN(Number(val)) ? val : Number(val));
        }}
        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {helpText && (
        <p className="text-xs text-slate-500 italic text-center">
          💡 {helpText}
        </p>
      )}
    </div>
  );
}
