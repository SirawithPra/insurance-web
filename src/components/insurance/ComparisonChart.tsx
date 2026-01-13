import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ComparisonChartProps {
  data: Array<{
    year: number;
    investment: number;
    death: number;
    cashValue: number;
    premium?: number;
    netPremium?: number;
  }>;
  breakEvenYear?: number;
}

export function ComparisonChart({ data, breakEvenYear }: ComparisonChartProps) {
  const formatCurrency = (value: number) => {
    return `${(value / 1000000).toFixed(1)}M`;
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-black text-slate-900">
          เปรียบเทียบผลตอบแทน (35 ปี)
        </h3>
        {breakEvenYear && (
          <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Break-even: ปีที่ {breakEvenYear}
          </span>
        )}
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="year"
            label={{ value: 'ปี', position: 'insideBottom', offset: -5 }}
            stroke="#64748b"
          />
          <YAxis
            tickFormatter={formatCurrency}
            label={{ value: 'บาท', angle: -90, position: 'insideLeft' }}
            stroke="#64748b"
          />
          <Tooltip
            formatter={(value: number) => `฿${value.toLocaleString()}`}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '12px'
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="premium"
            stroke="#f59e0b"
            strokeWidth={2}
            strokeDasharray="3 3"
            name="เงินต้น (เบี้ยสะสม)"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="netPremium"
            stroke="#fde047"
            strokeWidth={2}
            strokeDasharray="5 5"
            name="เงินต้นสุทธิ (หักลดหย่อน)"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="investment"
            stroke="#3b82f6"
            strokeWidth={2}
            name="ลงทุนเอง"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="death"
            stroke="#dc2626"
            strokeWidth={2}
            name="ประกันสะสมทรัพย์"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="cashValue"
            stroke="#10b981"
            strokeWidth={2}
            strokeDasharray="5 5"
            name="เงินคืน (เวรคืน)"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-3 md:grid-cols-5 gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-amber-500 rounded-full" />
          <span className="text-slate-600">เงินต้น</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-300 rounded-full" />
          <span className="text-slate-600">ต้นสุทธิ</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full" />
          <span className="text-slate-600">ลงทุนเอง</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-600 rounded-full" />
          <span className="text-slate-600">คุ้มครองชีวิต</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-600 rounded-full" />
          <span className="text-slate-600">เงินคืน</span>
        </div>
      </div>
    </div>
  );
}