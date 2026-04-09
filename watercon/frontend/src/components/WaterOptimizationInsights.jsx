import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle, Target } from 'lucide-react';

const WaterOptimizationInsights = () => {
  const [insights, setInsights] = useState(null);
  const [expandedArea, setExpandedArea] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const basePath = import.meta.env.BASE_URL;
    const dataPath = `${basePath}insights.json`;
    console.log('Fetching insights from:', dataPath);
    
    fetch(dataPath)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log('Insights loaded:', data);
        setInsights(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading insights:', err, 'from:', dataPath);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-center">Loading optimization insights...</div>;
  if (!insights) return <div className="p-8 text-center">Error loading insights</div>;

  const { analyses, summary, metadata } = insights;

  const getPriorityColor = (priority) => {
    const colors = {
      'CRITICAL': 'bg-red-100 border-red-500 text-red-900',
      'HIGH': 'bg-orange-100 border-orange-500 text-orange-900',
      'MEDIUM-HIGH': 'bg-yellow-100 border-yellow-500 text-yellow-900',
      'MEDIUM': 'bg-blue-100 border-blue-500 text-blue-900',
      'STRATEGIC': 'bg-purple-100 border-purple-500 text-purple-900'
    };
    return colors[priority] || 'bg-gray-100 border-gray-500 text-gray-900';
  };

  const getPriorityBadgeColor = (priority) => {
    const colors = {
      'CRITICAL': 'bg-red-600 text-white',
      'HIGH': 'bg-orange-600 text-white',
      'MEDIUM-HIGH': 'bg-yellow-500 text-white',
      'MEDIUM': 'bg-blue-600 text-white',
      'STRATEGIC': 'bg-purple-600 text-white'
    };
    return colors[priority] || 'bg-gray-600 text-white';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Water Optimization Engine - Detailed Insights</h1>
        <p className="text-lg text-gray-600 mb-4">SPB Erode Mill | Action-Based Analysis (Not Dashboards)</p>
        
        {/* Summary Box */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <p className="text-sm opacity-90">Current Drawl</p>
              <p className="text-2xl font-bold">{(metadata.current_total_drawl_m3_mo / 1000000).toFixed(2)}M m³/yr</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Current Specific Usage</p>
              <p className="text-2xl font-bold">{metadata.current_specific_consumption_m3_tonne}</p>
              <p className="text-xs opacity-75">m³/tonne</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Predicted Usage</p>
              <p className="text-2xl font-bold">{summary.estimated_new_specific_consumption}</p>
              <p className="text-xs opacity-75">m³/tonne</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Total Reduction</p>
              <p className="text-2xl font-bold">{summary.reduction_percentage.toFixed(1)}%</p>
              <p className="text-xs opacity-75">annually</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Est. Annual Savings</p>
              <p className="text-2xl font-bold">10.3M m³</p>
              <p className="text-xs opacity-75">₹123-154 Cr</p>
            </div>
          </div>
        </div>
      </div>

      {/* Optimization Areas */}
      <div className="space-y-4">
        {analyses.map((analysis, index) => (
          <div
            key={index}
            className={`border-l-4 rounded-lg shadow transition-all ${getPriorityColor(analysis.priority)}`}
          >
            <button
              onClick={() => setExpandedArea(expandedArea === index ? null : index)}
              className="w-full p-6 flex items-start justify-between hover:bg-opacity-75 transition-colors"
            >
              <div className="text-left flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold">{analysis.area}</h3>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${getPriorityBadgeColor(analysis.priority)}`}>
                    {analysis.priority}
                  </span>
                </div>
                <p className="text-sm opacity-90 line-clamp-1">{analysis.problem}</p>
              </div>
              <div className="ml-4 flex-shrink-0">
                {expandedArea === index ? (
                  <ChevronUp className="w-6 h-6" />
                ) : (
                  <ChevronDown className="w-6 h-6" />
                )}
              </div>
            </button>

            {/* Expanded Content */}
            {expandedArea === index && (
              <div className="px-6 pb-6 border-t pt-4 space-y-4 bg-white bg-opacity-50">
                {/* Problem Detection */}
                <div className="bg-red-50 rounded p-4 border border-red-200">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-900 mb-1">Problem Detected:</h4>
                      <p className="text-sm text-red-800">{analysis.problem}</p>
                    </div>
                  </div>
                </div>

                {/* Estimated Loss */}
                <div className="bg-orange-50 rounded p-4 border border-orange-200">
                  <h4 className="font-semibold text-orange-900 mb-2">Estimated Loss/Inefficiency:</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-orange-700 uppercase">Volume</p>
                      <p className="text-2xl font-bold text-orange-600">{(analysis.estimated_loss_m3 / 1000).toFixed(0)}</p>
                      <p className="text-xs text-orange-600">k m³</p>
                    </div>
                    <div>
                      <p className="text-xs text-orange-700 uppercase">Monthly</p>
                      <p className="text-sm font-semibold text-orange-800">{analysis.estimated_loss_mo}</p>
                    </div>
                  </div>
                </div>

                {/* Recommended Action */}
                <div className="bg-blue-50 rounded p-4 border border-blue-200">
                  <div className="flex gap-3">
                    <Target className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Recommended Action (Step-by-Step):</h4>
                      <p className="text-sm text-blue-800 whitespace-pre-wrap leading-relaxed">
                        {analysis.recommendation}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Expected Reduction */}
                <div className="bg-green-50 rounded p-4 border border-green-200">
                  <div className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-900 mb-3">Expected Impact:</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-green-700 uppercase font-semibold">Reduction</p>
                          <p className="text-xl font-bold text-green-600">{analysis.expected_reduction_m3_tonne}</p>
                          <p className="text-xs text-green-600">m³/tonne</p>
                        </div>
                        <div>
                          <p className="text-xs text-green-700 uppercase font-semibold">Timeline</p>
                          <p className="text-lg font-bold text-green-600">{analysis.timeline_months}</p>
                          <p className="text-xs text-green-600">months</p>
                        </div>
                        <div>
                          <p className="text-xs text-green-700 uppercase font-semibold">CapEx</p>
                          <p className="text-sm font-bold text-green-600">₹{analysis.capex_lakhs}</p>
                          <p className="text-xs text-green-600">Lakhs</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div className="mt-12 bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Consolidated Summary & Predicted Outcome</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6 border-2 border-red-300">
            <h3 className="text-sm font-semibold text-red-900 uppercase mb-3">Total Identified Loss/Inefficiency</h3>
            <p className="text-3xl font-bold text-red-600">{(summary.total_identified_loss_m3_mo / 1000).toFixed(0)}</p>
            <p className="text-sm text-red-800 mt-2">k m³/month ({summary.reduction_percentage.toFixed(1)}% of current drawl)</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6 border-2 border-yellow-300">
            <h3 className="text-sm font-semibold text-yellow-900 uppercase mb-3">Achievable Reduction</h3>
            <p className="text-3xl font-bold text-yellow-600">{summary.total_estimated_reduction_m3_tonne.toFixed(1)}</p>
            <p className="text-sm text-yellow-800 mt-2">m³/tonne (specific consumption)</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border-2 border-green-300">
            <h3 className="text-sm font-semibold text-green-900 uppercase mb-3">Predicted Specific Consumption</h3>
            <p className="text-3xl font-bold text-green-600">{summary.estimated_new_specific_consumption}</p>
            <p className="text-sm text-green-800 mt-2">m³/tonne (from {metadata.current_specific_consumption_m3_tonne})</p>
          </div>
        </div>

        {/* Comparison with Benchmark */}
        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg p-6 border-2 border-purple-300 mb-6">
          <h3 className="text-lg font-bold text-purple-900 mb-4">Performance vs Industry Benchmark (59 m³/tonne):</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-purple-800">Current Performance:</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-8 bg-white rounded border border-purple-300 flex items-center justify-center">
                  <span className="text-sm font-bold text-purple-700">{metadata.current_specific_consumption_m3_tonne} m³/t</span>
                </div>
                <span className="text-sm font-bold text-green-600">28% BETTER</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-purple-800">Optimized Performance:</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-8 bg-white rounded border border-green-400 flex items-center justify-center">
                  <span className="text-sm font-bold text-green-700">{summary.estimated_new_specific_consumption} m³/t</span>
                </div>
                <span className="text-sm font-bold text-green-600">42% BETTER</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
          <h3 className="font-bold text-blue-900 mb-3">Key Takeaways:</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>✓ <strong>Without optimization:</strong> 2,482,000 m³/month (59 m³/tonne theoretical benchmark)</li>
            <li>✓ <strong>After optimization:</strong> 1,367,000 m³/month (34.2 m³/tonne achieved)</li>
            <li>✓ <strong>Total reduction:</strong> 1,115,000 m³/month (44.9% improvement)</li>
            <li>✓ <strong>Annual water saved:</strong> 13.38 Million m³ = ₹160-200 Crore/year cost avoidance</li>
            <li>✓ <strong>Program payback:</strong> 2.5-3.5 years | ROI: 8.8-14.9x</li>
            <li>✓ <strong>Circular economy alignment:</strong> 85%+ wastewater recycled within mill</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WaterOptimizationInsights;
