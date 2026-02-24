import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Droplets, TrendingUp, AlertCircle, Activity } from 'lucide-react';

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Derived metrics from data
  const latestData = data[data.length - 1] || {};
  const totalIntake = latestData['Intake well'] || 0;
  const pmUsage = latestData['PM 1-3'] || 0;
  const spWater = latestData['Sp. Water'] || 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-6 md:p-10">
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200">
            <Droplets size={28} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">SPB Water Dashboard</h1>
        </div>
        <p className="text-slate-500 max-w-2xl text-lg">
          Industrial liquid resource monitoring and normative consumption tracking.
        </p>
      </header>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <MetricCard
          title="Latest Intake (Well)"
          value={`${totalIntake.toLocaleString()} L`}
          trend="+2.4% vs last month"
          icon={<Activity size={24} />}
          trendState="neutral"
        />
        <MetricCard
          title="PM 1-3 Consumption"
          value={`${pmUsage.toLocaleString()} L`}
          trend="-1.2% vs last month"
          icon={<TrendingUp size={24} />}
          trendState="good"
        />
        <MetricCard
          title="Specific Water (SWC)"
          value={spWater}
          trend="Above target norm"
          icon={<AlertCircle size={24} />}
          trendState="bad"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
            Total Intake Over Time
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChartComponent data={data} xKey="Month" yKey="Intake well" color="#3b82f6" />
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <div className="w-2 h-6 bg-indigo-500 rounded-full"></div>
            PM Lines Comparison
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChartComponent data={data} />
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, icon, trendState }) {
  const trendColors = {
    good: 'text-emerald-600 bg-emerald-50',
    bad: 'text-rose-600 bg-rose-50',
    neutral: 'text-slate-600 bg-slate-100',
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <div className="text-slate-400">{icon}</div>
      </div>
      <h3 className="text-3xl font-bold text-slate-800 mb-2">{value}</h3>
      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${trendColors[trendState]}`}>
        {trend}
      </div>
    </div>
  );
}

// Minimal wrapper for charts to keep App clean
function AreaChartComponent({ data, xKey, yKey, color }) {
  return (
    <LineChart data={data}>
      <defs>
        <linearGradient id="colorY" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={color} stopOpacity={0.3} />
          <stop offset="95%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
      <XAxis dataKey={xKey} axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dx={-10} />
      <Tooltip
        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
      />
      <Line type="monotone" dataKey={yKey} stroke={color} strokeWidth={3} dot={{ strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
    </LineChart>
  );
}

function LineChartComponent({ data }) {
  return (
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
      <XAxis dataKey="Month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dx={-10} />
      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
      <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
      <Line type="monotone" dataKey="PM 1-3" stroke="#6366f1" strokeWidth={3} dot={false} />
      <Line type="monotone" dataKey="PM 4" stroke="#ec4899" strokeWidth={3} dot={false} />
      <Line type="monotone" dataKey="PM 5" stroke="#f59e0b" strokeWidth={3} dot={false} />
    </LineChart>
  );
}
