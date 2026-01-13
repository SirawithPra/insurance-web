

interface Plan {
  id: string;
  name: string;
  subtitle: string;
  description: string;
}

interface PlanSelectorProps {
  plans: Plan[];
  selectedPlan: string;
  onSelectPlan: (planId: string) => void;
}

export function PlanSelector({ plans, selectedPlan, onSelectPlan }: PlanSelectorProps) {
  return (
    <div className="space-y-3">
      {plans.map((plan) => (
        <button
          key={plan.id}
          onClick={() => onSelectPlan(plan.id)}
          className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${
            selectedPlan === plan.id
              ? 'bg-slate-900 border-slate-900 text-white shadow-xl transform scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-red-200 hover:shadow-md'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className={`font-black text-lg ${
              selectedPlan === plan.id ? 'text-white' : 'text-slate-900'
            }`}>
              {plan.name}
            </h3>
            {selectedPlan === plan.id && (
              <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            )}
          </div>
          
          <p className={`text-xs font-bold mb-2 uppercase tracking-wider ${
            selectedPlan === plan.id ? 'text-red-300' : 'text-red-600'
          }`}>
            {plan.subtitle}
          </p>
          
          <p className={`text-sm ${
            selectedPlan === plan.id ? 'text-white/80' : 'text-slate-500'
          }`}>
            {plan.description}
          </p>
        </button>
      ))}
    </div>
  );
}
