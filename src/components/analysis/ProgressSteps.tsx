import React from 'react';
import { Check } from 'lucide-react';
import { STEP_DESCRIPTIONS, ACHIEVEMENT_MESSAGES } from '../../constants/methodology';

interface ProgressStepsProps {
  currentStep: number;
  className?: string;
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({
  currentStep,
  className = ''
}) => {
  const steps = [
    STEP_DESCRIPTIONS.step1,
    STEP_DESCRIPTIONS.step2,
    STEP_DESCRIPTIONS.step3,
    STEP_DESCRIPTIONS.step4
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Achievement Message */}
      {currentStep > 1 && (
        <div className="text-center mb-6 animate-in fade-in slide-in-from-bottom-2">
          <p className="text-lg font-bold text-purple-600">
            {ACHIEVEMENT_MESSAGES[currentStep - 1]}
          </p>
        </div>
      )}

      {/* Progress Bar */}
      <div className="relative">
        <div className="absolute top-5 left-0 right-0 h-1 bg-slate-200">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 ease-out"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        <div className="relative flex items-center justify-between">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = currentStep > stepNumber;
            const isCurrent = currentStep === stepNumber;
            const colorMap: Record<string, string> = {
              blue: 'from-blue-500 to-blue-600',
              green: 'from-green-500 to-green-600',
              purple: 'from-purple-500 to-purple-600',
              indigo: 'from-indigo-500 to-indigo-600'
            };

            return (
              <div key={stepNumber} className="flex flex-col items-center flex-1 relative">
                {/* Circle */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-4 transition-all duration-300 ${
                    isCompleted
                      ? `bg-gradient-to-br ${colorMap[step.color]} text-white border-white shadow-lg scale-110`
                      : isCurrent
                      ? `bg-white text-${step.color}-600 border-${step.color}-500 shadow-xl scale-125 animate-pulse`
                      : 'bg-slate-100 text-slate-400 border-slate-200'
                  }`}
                >
                  {isCompleted ? (
                    <Check size={24} strokeWidth={3} />
                  ) : (
                    <span className="text-2xl">{step.icon}</span>
                  )}
                </div>

                {/* Label */}
                <div className="mt-3 text-center max-w-[120px]">
                  <p
                    className={`text-sm font-bold transition-colors ${
                      isCurrent ? `text-${step.color}-700` : isCompleted ? 'text-slate-700' : 'text-slate-400'
                    }`}
                  >
                    {step.title}
                  </p>
                  {isCurrent && (
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Percentage */}
      <div className="text-center mt-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full">
          <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
              style={{ width: `${((currentStep) / steps.length) * 100}%` }}
            />
          </div>
          <span className="text-sm font-bold text-slate-700">
            {Math.round((currentStep / steps.length) * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};
