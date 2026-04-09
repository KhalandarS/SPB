import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

const WaterOptimizationDashboard = () => {
  const [vizData, setVizData] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load visualization data
    const basePath = import.meta.env.BASE_URL;
    const dataPath = `${basePath}visualization_data.json`;
    console.log('Fetching from:', dataPath);
    
    fetch(dataPath)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log('Data loaded:', data);
        setVizData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading data:', err, 'from:', dataPath);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-center">Loading optimization data...</div>;
  if (!vizData) return <div className="p-8 text-center">Error loading data</div>;

  const { consumption_breakdown, section_performance, specific_consumption_projection, summary_kpi, phase_breakdown } = vizData;

  // Prepare data for consumption chart
  const consumptionData = consumption_breakdown.map(item => ({
    name: item.section.split('(')[0].trim(),
    value: item.m3_month / 1000,
    percent: item.percent,
    reduction: item.reduction_potential_percent
  }));

  // Prepare data for section performance
  const performanceData = section_performance.map(item => ({
    name: item.section.split('.')[1].trim().substring(0, 15),
    savings: item.monthly_savings_m3 / 1000,
    reduction: item.estimated_reduction_m3_tonne,
    capex: parseInt(item.capex_lakhs)
  }));

  // Projection data
  const projectionData = [
    { category: 'Current', consumption: specific_consumption_projection.baseline_m3_tonne, status: 'Current' },
    { category: 'Optimized', consumption: specific_consumption_projection.optimized_m3_tonne, status: 'Target' },
    { category: 'Benchmark', consumption: specific_consumption_projection.industry_benchmark, status: 'Industry Standard' }
  ];

  // Phase breakdown
  const phaseData = [
    { phase: 'Phase 1\n(M1-2)', reduction: 7.3, capex: 300 },
    { phase: 'Phase 2\n(M3-9)', reduction: 5.0, capex: 850 },
    { phase: 'Phase 3\n(M10-12)', reduction: 1.67, capex: 500 }
  ];

  // Priority distribution
  const priorityData = [
    { name: 'CRITICAL', count: 3, value: 30 },
    { name: 'HIGH', count: 4, value: 40 },
    { name: 'MEDIUM', count: 1, value: 10 },
    { name: 'STRATEGIC', count: 1, value: 20 }
  ];

  const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4', '#14b8a6'];
  const PRIORITY_COLORS = { 'CRITICAL': '#ef4444', 'HIGH': '#f97316', 'MEDIUM': '#eab308', 'STRATEGIC': '#3b82f6' };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Water Optimization Engine</h1>
        <p className="text-lg text-gray-600">SPB Erode Mill | Q1 2025-26 Analysis | Dataset: newdata2</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Current Drawl</h3>
          <p className="text-3xl font-bold text-gray-900">{(summary_kpi.current_total_drawl_m3_mo/1000).toFixed(0)}</p>
          <p className="text-xs text-gray-500 mt-2">k m³/month</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Optimized Drawl</h3>
          <p className="text-3xl font-bold text-gray-900">{(summary_kpi.optimized_total_drawl_m3_mo/1000).toFixed(0)}</p>
          <p className="text-xs text-gray-500 mt-2">k m³/month (Target)</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Specific Consumption</h3>
          <p className="text-2xl font-bold text-gray-900">{specific_consumption_projection.baseline_m3_tonne} → {specific_consumption_projection.optimized_m3_tonne}</p>
          <p className="text-xs text-gray-500 mt-2">m³/tonne (Current → Target)</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Annual Savings</h3>
          <p className="text-3xl font-bold text-gray-900">₹{summary_kpi.annual_savings_crore}</p>
          <p className="text-xs text-gray-500 mt-2">Crore/year @ ₹12/m³</p>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Current Water Consumption Breakdown */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Current Water Consumption Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={consumptionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${percent.toFixed(1)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {consumptionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${(value).toFixed(0)} k m³`} />
            </PieChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 mt-4 text-center">Total: {(summary_kpi.current_total_drawl_m3_mo/1000).toFixed(0)} k m³/month</p>
        </div>

        {/* Specific Water Consumption: Current vs Target */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Specific Water Consumption Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="consumption" fill="#3b82f6" name="m³/tonne" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 p-3 bg-green-50 rounded border border-green-200">
            <p className="text-sm text-green-900">
              <strong>Improvement:</strong> {specific_consumption_projection.improvement_m3_tonne.toFixed(1)} m³/tonne reduction 
              ({specific_consumption_projection.improvement_percent.toFixed(1)}% better)
            </p>
          </div>
        </div>
      </div>

      {/* Section Performance */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Section-Wise Optimization Potential</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={performanceData}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
            <YAxis yAxisId="left" label={{ value: 'Monthly Savings (k m³)', angle: -90, position: 'insideLeft' }} />
            <YAxis yAxisId="right" orientation="right" label={{ value: 'Reduction (m³/tonne)', angle: 90, position: 'insideRight' }} />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="savings" fill="#3b82f6" name="Monthly Savings (k m³)" />
            <Bar yAxisId="right" dataKey="reduction" fill="#10b981" name="Reduction (m³/tonne)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Implementation Phases */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Object.entries(phase_breakdown).map(([key, phase]) => (
          <div key={key} className="bg-white rounded-lg shadow p-6 border-t-4 border-blue-500">
            <h3 className="text-lg font-bold text-gray-900 mb-3">{phase.phase}</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase">Reduction</p>
                <p className="text-2xl font-bold text-green-600">{phase.reduction} m³/tonne</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase">CapEx</p>
                <p className="text-lg font-semibold text-orange-600">₹{phase.capex}-{phase.capex+150} L</p>
              </div>
              <div className="pt-2 border-t">
                <p className="text-xs font-semibold text-gray-600 mb-2">Key Actions:</p>
                <ul className="text-xs text-gray-700 space-y-1">
                  {phase.key_actions.slice(0, 3).map((action, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Priority Matrix */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Implementation Priority Matrix</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { priority: 'CRITICAL', count: 3, actions: ['Leakage Detection', 'Drain Water Reuse', 'Domestic Water'] },
            { priority: 'HIGH', count: 4, actions: ['Hot Effluent', 'Cooling Water', 'Paper Machine', 'DM Plant'] },
            { priority: 'MEDIUM', count: 1, actions: ['Bagasse Pulping'] },
            { priority: 'STRATEGIC', count: 1, actions: ['Circular Economy'] }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded border-2" style={{ borderColor: PRIORITY_COLORS[item.priority] }}>
              <h3 className="font-bold text-lg mb-2" style={{ color: PRIORITY_COLORS[item.priority] }}>
                {item.priority}
              </h3>
              <p className="text-2xl font-bold text-gray-900 mb-3">{item.count}</p>
              <ul className="text-xs text-gray-700 space-y-1">
                {item.actions.map((action, i) => (
                  <li key={i}>• {action}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Summary */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow p-6 text-white">
        <h2 className="text-2xl font-bold mb-6">Financial Summary & ROI</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm opacity-90 mb-2">Total Program CapEx</p>
            <p className="text-3xl font-bold">₹{summary_kpi.total_capex_lakhs}-{summary_kpi.total_capex_lakhs * 1.5}</p>
            <p className="text-xs opacity-75 mt-1">Lakhs (12-month deployment)</p>
          </div>
          <div>
            <p className="text-sm opacity-90 mb-2">Annual Water Savings</p>
            <p className="text-3xl font-bold">₹{summary_kpi.annual_savings_crore} Cr</p>
            <p className="text-xs opacity-75 mt-1">@ {summary_kpi.water_cost_per_m3_rupees} Rs/m³</p>
          </div>
          <div>
            <p className="text-sm opacity-90 mb-2">Payback Period</p>
            <p className="text-3xl font-bold">{summary_kpi.payback_period_years} yrs</p>
            <p className="text-xs opacity-75 mt-1">Full investment recovery</p>
          </div>
          <div>
            <p className="text-sm opacity-90 mb-2">ROI Multiple</p>
            <p className="text-3xl font-bold">{summary_kpi.roi_multiple}x</p>
            <p className="text-xs opacity-75 mt-1">Return on investment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterOptimizationDashboard;
