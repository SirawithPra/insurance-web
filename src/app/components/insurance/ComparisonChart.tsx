import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface ChartDataPoint {
  year: number;
  death?: number | null;
  cashValue?: number | null;
  premium?: number;
  investment?: number;
}

interface ComparisonChartProps {
  data: ChartDataPoint[];
  breakEvenYear?: number;
}

export function ComparisonChart({ data, breakEvenYear }: ComparisonChartProps) {
  const formatValue = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value.toString();
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
      <h3 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-tight">
        กราฟเปรียบเทียบมูลค่า
      </h3>
      
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorDeath" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorInvest" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="year" 
            stroke="#64748b"
            tick={{ fontSize: 12, fontWeight: 'bold' }}
            label={{ value: 'ปีที่', position: 'insideBottom', offset: -5, style: { fontSize: 12, fontWeight: 'bold' } }}
          />
          <YAxis 
            stroke="#64748b"
            tickFormatter={formatValue}
            tick={{ fontSize: 12, fontWeight: 'bold' }}
            label={{ value: 'มูลค่า (บาท)', angle: -90, position: 'insideLeft', style: { fontSize: 12, fontWeight: 'bold' } }}
          />
          <Tooltip 
            formatter={(value: number) => `฿${value.toLocaleString()}`}
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)', 
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}
          />
          <Legend 
            wrapperStyle={{ fontSize: '12px', fontWeight: 'bold' }}
            iconType="circle"
          />
          <Area 
            type="monotone" 
            dataKey="death" 
            stroke="#ef4444" 
            strokeWidth={3}
            fill="url(#colorDeath)"
            name="มูลค่าหากเกิดเหตุ"
            strokeDasharray="5 5"
          />
          <Area 
            type="monotone" 
            dataKey="cashValue" 
            stroke="#3b82f6" 
            strokeWidth={3}
            fill="url(#colorCash)"
            name="เงินสดที่ถอนได้"
          />
          <Line 
            type="monotone" 
            dataKey="premium" 
            stroke="#94a3b8" 
            strokeWidth={2}
            strokeDasharray="3 3"
            name="เบี้ยสะสม"
            dot={false}
          />
          <Area 
            type="monotone" 
            dataKey="investment" 
            stroke="#10b981" 
            strokeWidth={3}
            fill="url(#colorInvest)"
            name="พอร์ตจำลอง"
          />
        </AreaChart>
      </ResponsiveContainer>

      {breakEvenYear && (
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
          <p className="text-sm font-bold text-amber-900">
            💡 จุดคุ้มทุน: <span className="text-amber-600">ปีที่ {breakEvenYear}</span>
            <span className="text-xs text-amber-700 ml-2">(รวมผลประโยชน์ด้านภาษีแล้ว)</span>
          </p>
        </div>
      )}
    </div>
  );
}
