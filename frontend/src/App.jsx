import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Droplets, TrendingUp, AlertCircle, Activity, Target, CheckCircle, Clock, DollarSign, TrendingDown, Zap, X, Plus, Lock, Trash2, Edit, Eye } from 'lucide-react';

function MetricCard({ title, value, target, icon, color }) {
  const percentage = target ? Math.round((value / target) * 100) : 0;
  const isGood = value <= target;

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Top border accent */}
      <div className="h-1" style={{ backgroundColor: color }}></div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">{title}</h3>
          <div className="p-2.5 rounded-lg" style={{ backgroundColor: `${color}15` }}>
            <div style={{ color }}>
              {icon}
            </div>
          </div>
        </div>
        
        <p className="text-3xl font-bold text-slate-900 mb-4">{value.toLocaleString()}</p>
        
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-500">Target</p>
            <p className="text-sm font-semibold text-slate-700">{target}</p>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all"
              style={{
                width: `${Math.min(percentage, 100)}%`,
                backgroundColor: isGood ? '#10b981' : '#ef4444'
              }}
            ></div>
          </div>
          <p className={`text-xs mt-3 font-semibold ${isGood ? 'text-green-600' : 'text-red-600'}`}>
            {isGood ? '✓ Within target' : '✗ Above target'} • {percentage}%
          </p>
        </div>
      </div>
    </div>
  );
}

function StrategyDetailModal({ strategy, onClose }) {
  if (!strategy) return null;

  const statusBadge = strategy.status === 'Active' ? 'bg-green-600 text-white' : 'bg-amber-600 text-white';

  // Handle ESC key press
  React.useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [onClose]);

  // Handle click outside modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={handleBackdropClick}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto border border-slate-200">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 text-white p-6 flex justify-between items-start border-b border-slate-800">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge}`}>
                {strategy.status}
              </span>
            </div>
            <h2 className="text-2xl font-bold">{strategy.name}</h2>
            <p className="text-slate-300 text-sm mt-1">{strategy.category}</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-slate-800 rounded-lg transition flex-shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Overview */}
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Overview</h3>
            <p className="text-slate-700">{strategy.description}</p>
          </div>

          {/* Key Metrics */}
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Key Metrics</h3>
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-700 font-semibold">Savings</p>
                <p className="text-xl font-bold text-blue-900">{strategy.savingsPotential}</p>
                <p className="text-xs text-blue-600">K L</p>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <p className="text-xs text-amber-700 font-semibold">Cost</p>
                <p className="text-lg font-bold text-amber-900">₹{(strategy.implementation_cost / 1000).toFixed(0)}K</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <p className="text-xs text-green-700 font-semibold">Payback</p>
                <p className="text-xl font-bold text-green-900">{strategy.payback_months}</p>
                <p className="text-xs text-green-600">months</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                <p className="text-xs text-purple-700 font-semibold">ROI</p>
                <p className="text-xl font-bold text-purple-900">{strategy.roi_percent}%</p>
              </div>
            </div>
          </div>

          {/* Impact Level */}
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Impact Level</h3>
            <div className={`p-3 rounded-lg border ${
              strategy.impact === 'High' ? 'bg-red-50 border-red-200' :
              strategy.impact === 'Medium' ? 'bg-orange-50 border-orange-200' :
              'bg-blue-50 border-blue-200'
            }`}>
              <p className={`font-semibold ${
                strategy.impact === 'High' ? 'text-red-700' :
                strategy.impact === 'Medium' ? 'text-orange-700' :
                'text-blue-700'
              }`}>
                {strategy.impact} Impact
              </p>
              <p className={`text-sm mt-1 ${
                strategy.impact === 'High' ? 'text-red-600' :
                strategy.impact === 'Medium' ? 'text-orange-600' :
                'text-blue-600'
              }`}>
                {strategy.impact === 'High' ? 'High-impact strategy with significant water reduction potential' :
                 strategy.impact === 'Medium' ? 'Moderate impact with good complementary benefits' :
                 'Supporting strategy with targeted applications'}
              </p>
            </div>
          </div>

          {/* Financial Summary */}
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Financial Summary</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <p className="text-xs text-slate-600">Annual Savings Value</p>
                <p className="text-lg font-bold text-slate-900">₹{(strategy.savingsPotential * 50000).toLocaleString()}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <p className="text-xs text-slate-600">Break-even in</p>
                <p className="text-lg font-bold text-slate-900">{strategy.payback_months} months</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StrategyCard({ strategy, onViewDetails }) {
  const statusBg = strategy.status === 'Active' ? 'bg-green-600' : 'bg-amber-600';
  const impactColor = strategy.impact === 'High' ? 'text-red-600' : strategy.impact === 'Medium' ? 'text-orange-600' : 'text-blue-600';

  return (
    <div className="bg-white border border-slate-200 rounded-xl hover:shadow-lg hover:border-slate-300 transition-all duration-300 overflow-hidden group">
      {/* Header Bar */}
      <div className="h-1 bg-gradient-to-r from-blue-600 to-blue-500"></div>
      
      <div className="p-6">
        {/* Title and Status */}
        <div className="flex justify-between items-start mb-4">
          <h4 className="font-semibold text-slate-900 text-lg">{strategy.name}</h4>
          <span className={`${statusBg} text-white text-xs px-3 py-1 rounded-full font-semibold`}>
            {strategy.status}
          </span>
        </div>

        {/* Description */}
        <p className="text-slate-600 text-sm mb-5 leading-relaxed line-clamp-2">{strategy.description}</p>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-slate-100">
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Savings</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{strategy.savingsPotential}</p>
            <p className="text-xs text-slate-500">Thousand Liters</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">ROI</p>
            <p className={`text-2xl font-bold mt-1 ${impactColor}`}>{strategy.roi_percent}%</p>
            <p className="text-xs text-slate-500">Annual Return</p>
          </div>
        </div>

        {/* Footer Info */}
        <div className="flex items-center justify-between text-sm mb-5">
          <div>
            <p className="text-xs text-slate-500">Cost: ₹{(strategy.implementation_cost / 1000).toFixed(0)}K</p>
            <p className="text-xs text-slate-500">Payback: {strategy.payback_months}mo</p>
          </div>
          <div className={`text-xs font-semibold px-3 py-1 rounded-full ${
            strategy.impact === 'High' ? 'bg-red-100 text-red-700' :
            strategy.impact === 'Medium' ? 'bg-orange-100 text-orange-700' :
            'bg-blue-100 text-blue-700'
          }`}>
            {strategy.impact} Impact
          </div>
        </div>

        {/* View Details Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(strategy);
          }}
          className="w-full py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-blue-600 hover:text-white transition-all font-semibold text-sm uppercase tracking-wide group-hover:shadow-md"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

function AdminPanel({ strategies, setStrategies, departments, onLogout }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStrategy, setNewStrategy] = useState({
    id: 0,
    category: '',
    name: '',
    description: '',
    department: '',
    savingsPotential: 0,
    implementation_cost: 0,
    payback_months: 0,
    roi_percent: 0,
    status: 'Planned',
    impact: 'Medium'
  });

  const handleAddStrategy = () => {
    if (!newStrategy.name || !newStrategy.description) {
      alert('Please fill in all required fields');
      return;
    }
    const strategy = {
      ...newStrategy,
      id: Math.max(...strategies.map(s => s.id), 0) + 1
    };
    setStrategies([...strategies, strategy]);
    setNewStrategy({
      id: 0,
      category: '',
      name: '',
      description: '',
      department: '',
      savingsPotential: 0,
      implementation_cost: 0,
      payback_months: 0,
      roi_percent: 0,
      status: 'Planned',
      impact: 'Medium'
    });
    setShowAddForm(false);
    alert('Strategy added successfully!');
  };

  const handleDeleteStrategy = (id) => {
    if (confirm('Are you sure you want to delete this strategy?')) {
      setStrategies(strategies.filter(s => s.id !== id));
    }
  };

  return (
    <div className="space-y-12 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Control Panel</h2>
          <p className="text-slate-600 mt-1">Manage conservation strategies and system configuration</p>
        </div>
        <button
          onClick={onLogout}
          className="px-6 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition font-semibold"
        >
          Logout
        </button>
      </div>

      {/* Add Strategy Section */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200 px-8 py-6">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            <Plus size={20} /> Add New Strategy
          </button>
        </div>

        {showAddForm && (
          <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-blue-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Strategy Name *"
                value={newStrategy.name}
                onChange={(e) => setNewStrategy({...newStrategy, name: e.target.value})}
                className="px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Category"
                value={newStrategy.category}
                onChange={(e) => setNewStrategy({...newStrategy, category: e.target.value})}
                className="px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              <textarea
                placeholder="Description *"
                value={newStrategy.description}
                onChange={(e) => setNewStrategy({...newStrategy, description: e.target.value})}
                className="col-span-1 md:col-span-2 px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                rows="2"
              />
              <input
                type="number"
                placeholder="Savings Potential (K L)"
                value={newStrategy.savingsPotential}
                onChange={(e) => setNewStrategy({...newStrategy, savingsPotential: parseFloat(e.target.value)})}
                className="px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Implementation Cost (₹)"
                value={newStrategy.implementation_cost}
                onChange={(e) => setNewStrategy({...newStrategy, implementation_cost: parseFloat(e.target.value)})}
                className="px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Payback (months)"
                value={newStrategy.payback_months}
                onChange={(e) => setNewStrategy({...newStrategy, payback_months: parseInt(e.target.value)})}
                className="px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="ROI (%)"
                value={newStrategy.roi_percent}
                onChange={(e) => setNewStrategy({...newStrategy, roi_percent: parseFloat(e.target.value)})}
                className="px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              <select
                value={newStrategy.status}
                onChange={(e) => setNewStrategy({...newStrategy, status: e.target.value})}
                className="px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="Active">Active</option>
                <option value="Planned">Planned</option>
              </select>
              <select
                value={newStrategy.impact}
                onChange={(e) => setNewStrategy({...newStrategy, impact: e.target.value})}
                className="px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="High">High Impact</option>
                <option value="Medium">Medium Impact</option>
                <option value="Low">Low Impact</option>
              </select>

              <div className="col-span-1 md:col-span-2 flex gap-3">
                <button
                  onClick={handleAddStrategy}
                  className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Add Strategy
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-slate-300 text-slate-700 py-2.5 rounded-lg hover:bg-slate-400 transition font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Strategies Management */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200 px-8 py-6">
          <h3 className="text-2xl font-semibold text-slate-900">Manage Strategies ({strategies.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left p-4 font-semibold text-slate-700">Strategy Name</th>
                <th className="text-center p-4 font-semibold text-slate-700">Savings (K L)</th>
                <th className="text-center p-4 font-semibold text-slate-700">Cost (₹)</th>
                <th className="text-center p-4 font-semibold text-slate-700">ROI</th>
                <th className="text-center p-4 font-semibold text-slate-700">Status</th>
                <th className="text-center p-4 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {strategies.map(strategy => (
                <tr key={strategy.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="p-4 font-semibold text-slate-900">{strategy.name}</td>
                  <td className="text-center p-4 text-slate-700">{strategy.savingsPotential}</td>
                  <td className="text-center p-4 text-slate-700">₹{strategy.implementation_cost.toLocaleString()}</td>
                  <td className="text-center p-4 font-semibold text-blue-600">{strategy.roi_percent}%</td>
                  <td className="text-center p-4">
                    <span className={`text-xs px-3 py-1.5 rounded-full font-semibold ${
                      strategy.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {strategy.status}
                    </span>
                  </td>
                  <td className="text-center p-4">
                    <button
                      onClick={() => handleDeleteStrategy(strategy.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition font-semibold text-xs"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 p-6 rounded-xl">
          <p className="text-sm text-blue-700 font-semibold uppercase tracking-wide">Total Strategies</p>
          <p className="text-4xl font-bold text-blue-900 mt-2">{strategies.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 p-6 rounded-xl">
          <p className="text-sm text-green-700 font-semibold uppercase tracking-wide">Total Potential Savings</p>
          <p className="text-3xl font-bold text-green-900 mt-2">{strategies.reduce((sum, s) => sum + s.savingsPotential, 0)} K L</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 p-6 rounded-xl">
          <p className="text-sm text-orange-700 font-semibold uppercase tracking-wide">Total Investment</p>
          <p className="text-3xl font-bold text-orange-900 mt-2">₹{(strategies.reduce((sum, s) => sum + s.implementation_cost, 0) / 100000).toFixed(1)}Cr</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 p-6 rounded-xl">
          <p className="text-sm text-purple-700 font-semibold uppercase tracking-wide">Avg ROI</p>
          <p className="text-4xl font-bold text-purple-900 mt-2">{(strategies.reduce((sum, s) => sum + s.roi_percent, 0) / strategies.length).toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [data, setData] = useState([]);
  const [breakupData, setBreakupData] = useState([]);
  const [norms, setNorms] = useState({});
  const [strategies, setStrategies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedStrategies, setSelectedStrategies] = useState([]);
  const [selectedStrategyDetail, setSelectedStrategyDetail] = useState(null);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch('/data.json').then((res) => res.json()),
      fetch('/consumption_breakup.json').then((res) => res.json()),
      fetch('/norms.json').then((res) => res.json()),
      fetch('/conservation_strategies.json').then((res) => res.json()),
    ])
      .then(([monthlyData, consumptionBreakup, normsData, strategiesData]) => {
        setData(monthlyData);
        setBreakupData(consumptionBreakup);
        setNorms(normsData);
        setStrategies(strategiesData.strategies);
        setDepartments(strategiesData.departments);
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const latestData = data[data.length - 1] || {};
  const totalIntake = latestData['Intake well'] || 0;
  const targetIntake = norms['Intake well'] || 27400;
  
  // Calculate total savings potential
  const totalSavingsPotential = strategies.reduce((sum, s) => sum + (selectedStrategies.includes(s.id) ? s.savingsPotential : 0), 0);
  const projectedIntake = totalIntake - totalSavingsPotential;
  const savingsPercentage = ((totalSavingsPotential / totalIntake) * 100).toFixed(1);

  // Department data for radar chart
  const deptReductionData = departments.map(dept => ({
    name: dept.name,
    current: dept.current_consumption,
    target_5: dept.target_reduction_5pct,
    target_10: dept.target_reduction_10pct
  }));

  const toggleStrategy = (id) => {
    setSelectedStrategies(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleAdminLogin = () => {
    if (adminPassword === '123') {
      setIsAdminAuthenticated(true);
      setAdminPassword('');
    } else {
      alert('Invalid password!');
      setAdminPassword('');
    }
  };

  // Show admin login screen if accessing admin panel
  if (activeTab === 'admin' && !isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-10 max-w-md w-full">
          <div className="flex items-center justify-center mb-8">
            <Lock size={40} className="text-slate-800" />
          </div>
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-2">Control Panel</h2>
          <p className="text-center text-slate-600 mb-8 text-sm">Enter your credentials to access the control center</p>
          
          <input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
            placeholder="Password"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            autoFocus
          />
          <button
            onClick={handleAdminLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Unlock
          </button>
          <p className="text-xs text-slate-500 text-center mt-4">Demo Password: 123</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl shadow-lg">
                <Droplets size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Water Management Solutions</h1>
                <p className="text-sm text-slate-500">SPB Erode Conservation Platform</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-8 border-t border-slate-200">
          <div className="flex gap-1">
            {['overview', 'strategies', 'calculator', 'analytics', 'admin'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-semibold border-b-2 transition-all text-sm uppercase tracking-wide ${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {tab === 'admin' ? 'Control Panel' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="px-8 py-10">
        {/* Detail Modal */}
        <StrategyDetailModal 
          strategy={selectedStrategyDetail} 
          onClose={() => setSelectedStrategyDetail(null)} 
        />
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6 h-[calc(100vh-140px)] overflow-hidden flex flex-col">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                title="Latest Intake"
                value={totalIntake}
                target={targetIntake}
                icon={<Activity size={24} />}
                color="#3b82f6"
              />
              <MetricCard
                title="Projected Intake"
                value={projectedIntake}
                target={targetIntake * 0.9}
                icon={<TrendingDown size={24} />}
                color="#10b981"
              />
              <MetricCard
                title="Potential Savings"
                value={totalSavingsPotential}
                target={totalIntake * 0.1}
                icon={<Zap size={24} />}
                color="#f59e0b"
              />
              <MetricCard
                title="Savings %"
                value={parseFloat(savingsPercentage)}
                target={10}
                icon={<Target size={24} />}
                color="#8b5cf6"
              />
            </div>

            {/* Project Objective */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <div className="w-2 h-5 bg-green-500 rounded-full"></div>
                Project Objective
              </h2>
              <div className="flex items-center gap-4 bg-green-50 border border-green-200 p-3 rounded-lg">
                <Target size={24} className="text-green-600 flex-shrink-0" />
                <p className="text-green-800 text-sm">
                  Reduce total water drawl by <strong>5%</strong> initially, then <strong>10%</strong> through recycle, reuse, reduce strategies
                </p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col">
                <h3 className="text-lg font-semibold mb-3">Total Intake Over Time (33 months)</h3>
                <div className="flex-1 min-h-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                      <defs>
                        <linearGradient id="colorIntake" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="Month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Area type="monotone" dataKey="Intake well" stroke="#3b82f6" fill="url(#colorIntake)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col">
                <h3 className="text-lg font-semibold mb-3">Consumption Breakup (Q1 2025-26)</h3>
                <div className="flex-1 min-h-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={breakupData} layout="vertical" margin={{ top: 5, right: 20, left: 100, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" tick={{ fontSize: 11 }} />
                      <YAxis type="category" dataKey="station" tick={{ fontSize: 11 }} width={90} />
                      <Tooltip />
                      <Bar dataKey="consumption" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STRATEGIES TAB */}
        {activeTab === 'strategies' && (
          <div className="space-y-10">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-semibold mb-6">Water Conservation Strategies</h2>
              <p className="text-slate-600 mb-6">Click on any strategy to view full details. Select strategies to implement and track potential water savings.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {strategies.map(strategy => (
                  <StrategyCard 
                    key={strategy.id}
                    strategy={strategy}
                    onViewDetails={() => setSelectedStrategyDetail(strategy)}
                  />
                ))}
              </div>

              {selectedStrategies.length > 0 && (
                <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-4">Selected Strategies Summary</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-blue-800">Total Savings</p>
                      <p className="text-2xl font-bold text-blue-900">{totalSavingsPotential} K L</p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-800">Reduction %</p>
                      <p className="text-2xl font-bold text-blue-900">{savingsPercentage}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-800">Total Cost</p>
                      <p className="text-2xl font-bold text-blue-900">
                        ₹{selectedStrategies.reduce((sum, id) => sum + (strategies.find(s => s.id === id)?.implementation_cost || 0), 0).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-800">Avg ROI</p>
                      <p className="text-2xl font-bold text-blue-900">
                        {(selectedStrategies.reduce((sum, id) => sum + (strategies.find(s => s.id === id)?.roi_percent || 0), 0) / selectedStrategies.length).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CALCULATOR TAB */}
        {activeTab === 'calculator' && (
          <div className="space-y-10">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-semibold mb-6">Water Savings Calculator</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-lg mb-4">Current Status</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-600">Current Intake (Dec 2025)</p>
                      <p className="text-3xl font-bold text-slate-900">{totalIntake.toLocaleString()} K L</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-600">Target (Current Norms)</p>
                      <p className="text-3xl font-bold text-blue-600">{targetIntake.toLocaleString()} K L</p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <p className="text-sm text-red-600">Current Status</p>
                      <p className={`text-3xl font-bold ${totalIntake > targetIntake ? 'text-red-600' : 'text-green-600'}`}>
                        {totalIntake > targetIntake ? '+' : ''}{(totalIntake - targetIntake).toLocaleString()} K L
                      </p>
                      <p className="text-xs text-red-600">{totalIntake > targetIntake ? 'Above' : 'Below'} target</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-4">Reduction Scenarios</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <p className="text-sm text-amber-800">5% Reduction Target</p>
                      <p className="text-2xl font-bold text-amber-900">{(totalIntake * 0.95).toFixed(0)} K L</p>
                      <p className="text-xs text-amber-700 mt-1">Savings: {(totalIntake * 0.05).toFixed(0)} K L</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm text-green-800">10% Reduction Target</p>
                      <p className="text-2xl font-bold text-green-900">{(totalIntake * 0.9).toFixed(0)} K L</p>
                      <p className="text-xs text-green-700 mt-1">Savings: {(totalIntake * 0.1).toFixed(0)} K L</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-800">With Selected Strategies</p>
                      <p className="text-2xl font-bold text-blue-900">{projectedIntake.toFixed(0)} K L</p>
                      <p className="text-xs text-blue-700 mt-1">Savings: {totalSavingsPotential} K L ({savingsPercentage}%)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reduction by Department */}
              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-4">Target Reduction by Department (Top Users)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-100 border-b-2 border-slate-200">
                      <tr>
                        <th className="text-left p-3">Department</th>
                        <th className="text-right p-3">Current (K L)</th>
                        <th className="text-right p-3">5% Target (K L)</th>
                        <th className="text-right p-3">10% Target (K L)</th>
                        <th className="text-right p-3">Savings @ 5%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departments.slice(0, 6).map(dept => (
                        <tr key={dept.name} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="p-3">{dept.name}</td>
                          <td className="text-right p-3 font-semibold">{dept.current_consumption}</td>
                          <td className="text-right p-3">{dept.target_reduction_5pct}</td>
                          <td className="text-right p-3">{dept.target_reduction_10pct}</td>
                          <td className="text-right p-3 text-green-600 font-semibold">{dept.current_consumption - dept.target_reduction_5pct} K L</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <div className="space-y-10">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-semibold mb-6">Performance Analytics</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-lg mb-4">Department Reduction Targets</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={deptReductionData} margin={{ top: 5, right: 20, left: 100, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" tick={{ fontSize: 11 }} />
                        <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="current" fill="#ef4444" name="Current" />
                        <Bar dataKey="target_5" fill="#f59e0b" name="5% Target" />
                        <Bar dataKey="target_10" fill="#10b981" name="10% Target" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-4">Strategy Impact Analysis</h3>
                  <div className="space-y-3">
                    {strategies.slice(0, 5).map(strategy => (
                      <div key={strategy.id} className="p-3 bg-slate-50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-semibold text-sm">{strategy.name}</p>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{strategy.impact}</span>
                        </div>
                        <div className="w-full bg-slate-300 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(strategy.savingsPotential / 500) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">{strategy.savingsPotential} K L savings | ROI: {strategy.roi_percent}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <CheckCircle className="text-blue-600 mb-2" size={24} />
                  <p className="text-sm text-blue-900">Active Strategies</p>
                  <p className="text-2xl font-bold text-blue-600">{strategies.filter(s => s.status === 'Active').length}</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
                  <Clock className="text-yellow-600 mb-2" size={24} />
                  <p className="text-sm text-yellow-900">Planned Strategies</p>
                  <p className="text-2xl font-bold text-yellow-600">{strategies.filter(s => s.status === 'Planned').length}</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <Zap className="text-green-600 mb-2" size={24} />
                  <p className="text-sm text-green-900">Total Potential</p>
                  <p className="text-2xl font-bold text-green-600">{strategies.reduce((sum, s) => sum + s.savingsPotential, 0)} K L</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <DollarSign className="text-purple-600 mb-2" size={24} />
                  <p className="text-sm text-purple-900">Total Investment</p>
                  <p className="text-2xl font-bold text-purple-600">₹{(strategies.reduce((sum, s) => sum + s.implementation_cost, 0) / 100000).toFixed(1)}Cr</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ADMIN TAB */}
        {activeTab === 'admin' && isAdminAuthenticated && (
          <AdminPanel 
            strategies={strategies} 
            setStrategies={setStrategies} 
            departments={departments}
            onLogout={() => {
              setIsAdminAuthenticated(false);
              setActiveTab('overview');
            }}
          />
        )}
      </main>
    </div>
  );
}



