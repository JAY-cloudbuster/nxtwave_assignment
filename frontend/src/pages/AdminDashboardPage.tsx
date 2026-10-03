import { useState } from 'react';
import { useStore } from '../store/useStore';
import { db } from '../store/db';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line
} from 'recharts';
import { 
  TrendingUp, Download, Activity, Zap, BrainCircuit, Target,
  AlertTriangle, Presentation, FlaskConical, Map, ListChecks
} from 'lucide-react';

export function AdminDashboardPage() {
  const state = useStore();
  const [activeTab, setActiveTab] = useState('command-center');
  const [scenario, setScenario] = useState<'conservative'|'base'|'upside'>('base');
  
  // Calculate aggregate stats
  const target = 500;
  const current = state.registrations.length;
  const remaining = Math.max(0, target - current);
  const percentAchieved = Math.min(100, (current / target) * 100);
  
  const referralRegs = state.registrations.filter(r => r.source === 'referral').length;
  const referralPercent = current > 0 ? (referralRegs / current) * 100 : 0;
  
  const totalCost = 800; // Simulated spent
  const cpr = current > 0 ? totalCost / current : 0;
  
  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "ID,Name,Email,College,Source,ReferralCode,ReferredBy\n"
      + state.users.map(u => `${u.id},${u.name},${u.email},${u.college},${state.registrations.find(r=>r.userId===u.id)?.source},${u.referralCode},${u.referredBy}`).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "campaign_demo_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const tabs = [
    { id: 'command-center', label: 'Command Center', icon: Activity },
    { id: 'path-to-500', label: 'Path to 500', icon: Map },
    { id: 'simulator', label: 'Simulator', icon: Zap },
    { id: 'copilot', label: 'AI Copilot', icon: BrainCircuit },
    { id: 'experiments', label: 'Experiments', icon: FlaskConical },
    { id: 'timeline', label: '7-Day Plan', icon: ListChecks },
    { id: 'funnel', label: 'Funnel', icon: TrendingUp },
  ];

  const sConf = state.simulatorConfig;
  const simScenarios = {
    conservative: { amb: 20, ctr: 0.1, conv: 0.08, commConv: 0.03, overlap: 0.9, emailConv: 0.01 },
    base: { amb: sConf.ambassadors, ctr: sConf.ctr, conv: sConf.conversionRate, commConv: sConf.communityConvRate, overlap: sConf.overlapAdjustment, emailConv: sConf.emailConvRate },
    upside: { amb: 40, ctr: 0.25, conv: 0.15, commConv: 0.08, overlap: 0.8, emailConv: 0.03 },
  };

  const currentScen = simScenarios[scenario];
  
  const calcAmbassador = Math.round(currentScen.amb * sConf.reachPerAmbassador * currentScen.ctr * currentScen.conv);
  const calcCommunities = Math.round(sConf.communities * sConf.communitySize * currentScen.commConv);
  const calcPaid = Math.round(sConf.paidBudget / sConf.paidCpa);
  const calcEmail = Math.round(sConf.emails * currentScen.emailConv);
  const grossReach = calcAmbassador + calcCommunities + calcPaid + calcEmail;
  const netReach = Math.round(grossReach * currentScen.overlap);

  const simulateAction = () => {
    db.setState(s => ({ simulatorConfig: { ...s.simulatorConfig, ambassadors: 55 } }));
    setActiveTab('simulator');
  };

  return (
    <div className="flex flex-col md:flex-row flex-grow bg-slate-50">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 bg-white border-r border-slate-200 p-4 shrink-0 flex flex-col">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-3">Growth OS</h2>
        <nav className="space-y-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-slate-900 text-white' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-slate-300' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>
        
        <div className="mt-auto pt-8 space-y-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h3 className="text-xs font-semibold text-slate-900 mb-2">Simulation State</h3>
            <div className="space-y-2">
              <button onClick={() => db.loadPresentationState()} className="w-full text-left text-xs text-primary-600 hover:text-primary-700 font-medium py-1 flex items-center gap-2">
                <Presentation className="w-3 h-3" /> Start Presentation Demo
              </button>
              <button onClick={() => db.reset()} className="w-full text-left text-xs text-red-600 hover:text-red-700 font-medium py-1 flex items-center gap-2">
                <AlertTriangle className="w-3 h-3" /> Reset Demo State
              </button>
              <button onClick={handleExport} className="w-full text-left text-xs text-slate-600 hover:text-slate-900 font-medium py-1 flex items-center gap-2">
                <Download className="w-3 h-3" /> Export Mock CSV
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow p-4 sm:p-8 max-w-6xl overflow-auto">
        
        {/* Assumptive Transparency Header */}
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex items-start gap-3 mb-6">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <strong>Simulation Note:</strong> This application demonstrates a strategic framework. Target (500) and Budget (₹2,000) are official challenge inputs. All other data—such as registrations, conversion rates, and A/B test results—are simulated to demonstrate operational competence. They are explicitly labelled as <span className="bg-amber-100 px-1 rounded">Demo data</span> or <span className="bg-amber-100 px-1 rounded">Proposed assumption</span>.
          </p>
        </div>

        {activeTab === 'command-center' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Campaign Command Center</h1>
                <p className="text-slate-500 text-sm mt-1">7-Day Workshop Growth Engine OS</p>
              </div>
              <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> DEMO LIVE
              </div>
            </div>

            {/* Top Level KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-slate-500 text-xs font-medium mb-1">Total Registrations (Demo)</div>
                <div className="flex items-end gap-2">
                  <div className="text-3xl font-black text-slate-900">{current}</div>
                  <div className="text-sm font-medium text-slate-400 mb-1">/ {target}</div>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-slate-500 text-xs font-medium mb-1">Referral Contribution (Demo)</div>
                <div className="flex items-end gap-2">
                  <div className="text-3xl font-black text-slate-900">{referralPercent.toFixed(1)}%</div>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-slate-500 text-xs font-medium mb-1">Cost Per Reg (Modeled)</div>
                <div className="flex items-end gap-2">
                  <div className="text-3xl font-black text-slate-900">₹{cpr.toFixed(0)}</div>
                </div>
              </div>
              <div className="bg-slate-900 p-5 rounded-2xl shadow-sm text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-20"><Target className="w-16 h-16"/></div>
                <div className="text-slate-400 text-xs font-medium mb-1 relative z-10">Remaining Gap</div>
                <div className="flex items-end gap-2 relative z-10">
                  <div className="text-3xl font-black">{remaining}</div>
                </div>
              </div>
            </div>

            {/* Target Meter */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-end mb-4">
                <h3 className="font-bold text-slate-900">Registration Velocity</h3>
                <span className="text-xs font-medium text-slate-500">Day 4 of 7 (Simulated)</span>
              </div>
              <div className="h-4 bg-slate-100 rounded-full overflow-hidden mb-2 relative">
                <div className="absolute top-0 left-0 h-full w-full flex">
                   {[20, 40, 60, 80].map(m => (
                     <div key={m} className="h-full border-r border-white/40" style={{width: '20%'}}></div>
                   ))}
                </div>
                <div className="h-full bg-slate-900 rounded-full transition-all duration-1000" style={{ width: `${percentAchieved}%` }}></div>
              </div>
              <div className="flex justify-between text-xs font-medium text-slate-500">
                <span>0</span>
                <span>{target} Target</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Decision Log */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 border-b border-slate-100 bg-slate-50">
                  <h3 className="font-bold text-slate-900 text-sm">Strategic Decision Log</h3>
                </div>
                <div className="p-4 space-y-4 text-sm flex-grow">
                  <div className="border-l-2 border-primary-500 pl-3">
                    <div className="font-semibold text-slate-900">Decision: Referral Engine &gt; Landing Page</div>
                    <div className="text-slate-600 mt-1 text-xs">Reason: 500 leads for ₹2k requires an impossible ₹4 CPA on paid channels. A referral mechanism multipliers the seed audience.</div>
                  </div>
                  <div className="border-l-2 border-slate-300 pl-3">
                    <div className="font-semibold text-slate-900">Decision: Include Campaign Simulator</div>
                    <div className="text-slate-600 mt-1 text-xs">Reason: Numbers in a vacuum are meaningless. A simulator exposes the assumptions required to hit 500.</div>
                  </div>
                </div>
              </div>
              
              {/* Daily Trend Chart (Mock) */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
                 <h3 className="font-bold text-slate-900 text-sm mb-4">Cumulative Registrations (Demo Data)</h3>
                 <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={[
                        { day: 'Day 1', regs: 30 },
                        { day: 'Day 2', regs: 85 },
                        { day: 'Day 3', regs: 190 },
                        { day: 'Day 4', regs: current || 317 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                        <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                        <Line type="monotone" dataKey="regs" stroke="#0f172a" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                      </LineChart>
                    </ResponsiveContainer>
                 </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'path-to-500' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Path to 500</h1>
              <p className="text-slate-500 text-sm mt-1">Breakdown of modeled channel contribution to reach the target.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="mb-6">
                <div className="text-slate-500 text-sm mb-1 font-medium">Goal Status (Demo vs Target)</div>
                <div className="flex gap-4 items-end mb-4">
                  <div className="text-4xl font-black text-slate-900">{current} <span className="text-lg text-slate-400 font-medium tracking-normal">current</span></div>
                  <div className="text-4xl font-black text-primary-600">{remaining} <span className="text-lg text-slate-400 font-medium tracking-normal">remaining</span></div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="font-bold text-slate-900 text-sm mb-4">Modeled Contribution by Channel (Assumptions)</h3>
                
                {[
                  { label: 'Student Ambassadors', value: calcAmbassador, color: 'bg-primary-600', width: `${(calcAmbassador/target)*100}%` },
                  { label: 'College Communities', value: calcCommunities, color: 'bg-primary-400', width: `${(calcCommunities/target)*100}%` },
                  { label: 'Email Outreach', value: calcEmail, color: 'bg-slate-500', width: `${(calcEmail/target)*100}%` },
                  { label: 'Paid Seed (₹1,200)', value: calcPaid, color: 'bg-slate-300', width: `${(calcPaid/target)*100}%` },
                ].map(channel => (
                  <div key={channel.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-700">{channel.label}</span>
                      <span className="text-slate-500">{channel.value} projected</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3">
                      <div className={`h-3 rounded-full ${channel.color}`} style={{ width: channel.width }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'simulator' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div>
              <h1 className="text-2xl font-bold text-slate-900">Campaign Simulator</h1>
              <p className="text-slate-500 text-sm mt-1">Mathematical proof of concept to reach 500 registrations.</p>
            </div>

            {/* Scenario Selector */}
            <div className="flex gap-2">
              {[
                { id: 'conservative', label: 'Conservative' },
                { id: 'base', label: 'Base Case (Editable)' },
                { id: 'upside', label: 'Upside' }
              ].map(s => (
                <button key={s.id} onClick={() => setScenario(s.id as any)} 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${scenario === s.id ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                  {s.label}
                </button>
              ))}
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-6">Assumption Inputs</h3>
                  
                  <div className="grid grid-cols-2 gap-6 mb-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Number of Ambassadors</label>
                      <input type="number" disabled={scenario !== 'base'} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm disabled:opacity-50" value={currentScen.amb} 
                        onChange={(e) => db.setState(s => ({ simulatorConfig: { ...s.simulatorConfig, ambassadors: Number(e.target.value) } }))} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Ambassador CTR (%)</label>
                      <input type="number" step="0.01" disabled={scenario !== 'base'} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm disabled:opacity-50" value={currentScen.ctr}
                        onChange={(e) => db.setState(s => ({ simulatorConfig: { ...s.simulatorConfig, ctr: Number(e.target.value) } }))} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Landing Page Conv (%)</label>
                      <input type="number" step="0.01" disabled={scenario !== 'base'} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm disabled:opacity-50" value={currentScen.conv}
                        onChange={(e) => db.setState(s => ({ simulatorConfig: { ...s.simulatorConfig, conversionRate: Number(e.target.value) } }))} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Overlap / Duplication Adj</label>
                      <input type="number" step="0.01" disabled={scenario !== 'base'} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm disabled:opacity-50" value={currentScen.overlap}
                        onChange={(e) => db.setState(s => ({ simulatorConfig: { ...s.simulatorConfig, overlapAdjustment: Number(e.target.value) } }))} />
                    </div>
                  </div>
                </div>
                
                {scenario === 'base' && (
                  <div className="bg-slate-100 p-4 rounded-xl text-xs text-slate-600 border border-slate-200">
                    <strong>Note:</strong> In Base Case, assumptions are editable to test sensitivity. Conservative and Upside are fixed scenarios.
                  </div>
                )}
              </div>

              <div>
                <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl sticky top-24">
                  <h3 className="font-bold mb-6 text-slate-200">Modeled Calculation</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Gross Reach</span>
                      <span className="font-medium">{grossReach}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Overlap Reduction</span>
                      <span className="font-medium text-red-400">-{grossReach - netReach}</span>
                    </div>
                    <div className="pt-4 border-t border-slate-700 flex justify-between items-end">
                      <span className="font-semibold text-slate-200">Net Modeled Regs</span>
                      <span className="text-3xl font-black text-white">{netReach}</span>
                    </div>
                  </div>
                  
                  {netReach >= 500 ? (
                     <div className="bg-green-500/20 border border-green-500/30 text-green-400 p-3 rounded-lg text-sm font-medium flex items-center gap-2 justify-center">
                       Target achievable in this scenario
                     </div>
                  ) : (
                     <div className="bg-amber-500/20 border border-amber-500/30 text-amber-400 p-3 rounded-lg text-sm font-medium flex items-center flex-col text-center">
                       <span>Shortfall of {500 - netReach}</span>
                       <span className="text-xs mt-1 text-amber-500/80">Requires assumption optimization</span>
                     </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'copilot' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
             <div className="text-center mb-8">
              <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <BrainCircuit className="w-8 h-8 text-primary-400" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">AI-Assisted Campaign Diagnosis</h1>
              <p className="text-slate-500 text-sm mt-1">Rule-based diagnosis based on simulated demo data</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1 h-full bg-primary-500"></div>
               
               <div className="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <div className="text-xs font-semibold text-slate-500 mb-1">CURRENT SITUATION</div>
                    <div className="font-bold text-slate-900">{current} / 500</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-xs font-semibold text-slate-500 mb-1">DATA STATUS</div>
                    <div className="inline-block bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded">Simulation</div>
                  </div>
               </div>

               <h3 className="font-bold text-slate-900 mb-2">BOTTLENECK: Low Ambassador Activation</h3>
               <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                 <strong className="text-slate-900">EVIDENCE:</strong> The model currently assumes only 25 active ambassadors. With standard conversion metrics, this mathematically restricts the referral loop from crossing the 500 threshold.
               </p>
               <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4">
                 <h4 className="font-semibold text-slate-800 text-sm mb-1">RECOMMENDATION</h4>
                 <p className="text-sm text-slate-600">
                   Execute a direct email campaign to the 80 most engaged current registrants offering a "Certificate of Leadership" in exchange for 5 referrals, increasing Ambassador count to 55.
                 </p>
                 <div className="mt-3 text-xs font-medium text-green-600 bg-green-50 inline-block px-2 py-1 rounded">MODELED IMPACT: +70 registrations</div>
               </div>
               
               <button onClick={simulateAction} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                 Simulate Action
               </button>
            </div>
          </div>
        )}

        {activeTab === 'experiments' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div>
              <h1 className="text-2xl font-bold text-slate-900">Experiment Center</h1>
              <p className="text-slate-500 text-sm mt-1">A/B testing infrastructure</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-bold text-slate-900">Experiment #1: Landing Page Headline</h3>
                  <p className="text-sm text-slate-500 mt-1">Testing emotional resonance (Portfolio) vs Practicality (60 Mins)</p>
                </div>
                <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium">Demo experiment data</span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-slate-200 rounded-xl p-4">
                  <div className="text-xs font-bold text-slate-400 mb-2">VARIANT A (CONTROL)</div>
                  <div className="font-medium text-slate-900 mb-4 bg-slate-50 p-3 rounded">"Build Your First AI Project in 60 Minutes"</div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Simulated Conv. Rate:</span>
                    <span className="font-bold text-slate-700">8.4%</span>
                  </div>
                </div>
                <div className="border border-primary-200 rounded-xl p-4 bg-primary-50/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-primary-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">WINNER</div>
                  <div className="text-xs font-bold text-primary-600 mb-2">VARIANT B</div>
                  <div className="font-medium text-slate-900 mb-4 bg-white p-3 rounded shadow-sm border border-primary-100">"Build an AI Project You Can Show in Your Portfolio"</div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Simulated Conv. Rate:</span>
                    <span className="font-bold text-primary-700">11.2%</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 border-t border-slate-100 pt-4">
                <h4 className="text-sm font-bold text-slate-900 mb-1">Conclusion & Next Action</h4>
                <p className="text-sm text-slate-600">Variant B significantly outperforms. Final year students index heavily on placement-readiness over time-savings. Roll out Variant B to 100% of traffic.</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'timeline' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div>
              <h1 className="text-2xl font-bold text-slate-900">7-Day Execution Plan</h1>
              <p className="text-slate-500 text-sm mt-1">Proposed campaign timeline</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative">
               <div className="absolute left-12 top-10 bottom-10 w-0.5 bg-slate-100"></div>
               <div className="space-y-6">
                 {[
                   { day: 1, title: 'Launch + Seed Audience', desc: 'Deploy landing page, push ₹1.2k paid budget for initial 30 users.' },
                   { day: 2, title: 'Ambassador Recruitment', desc: 'Identify most engaged seed users. Convert to ambassadors.' },
                   { day: 3, title: 'Community Distribution', desc: 'Ambassadors push unique QR codes into college WhatsApp groups.' },
                   { day: 4, title: 'Experiment Review', desc: 'Analyze A/B test results. Optimize landing page headline.' },
                   { day: 5, title: 'Scale Strongest Channel', desc: 'Push remaining budget into highest converting source.' },
                   { day: 6, title: 'Milestone Reminder Push', desc: 'Email users sitting at 3 or 4 referrals to push for 5.' },
                   { day: 7, title: 'Final Urgency', desc: 'Last 24 hours messaging across all channels.' },
                 ].map(item => (
                   <div key={item.day} className="flex gap-6 relative z-10">
                     <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm ring-4 ring-white">
                       {item.day}
                     </div>
                     <div>
                       <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
                       <p className="text-slate-600 text-sm mt-0.5">{item.desc}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        )}

        {activeTab === 'funnel' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div>
              <h1 className="text-2xl font-bold text-slate-900">Funnel Analysis</h1>
              <p className="text-slate-500 text-sm mt-1">Simulated conversion metrics</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
               <div className="space-y-8 max-w-2xl mx-auto">
                 {[
                   { label: 'Reach', value: 3400, color: 'bg-slate-100', width: '100%' },
                   { label: 'Landing Page Visits', value: state.pageViews, color: 'bg-primary-50', width: '80%' },
                   { label: 'Total Registrations', value: current || 120, color: 'bg-primary-100', width: '50%' },
                   { label: 'Referral Link Shares', value: 85, color: 'bg-primary-200', width: '30%' },
                   { label: 'Referred Registrations', value: referralRegs || 45, color: 'bg-primary-500', text: 'text-white', width: '15%' }
                 ].map((step, i) => (
                   <div key={i} className="relative">
                      <div className="flex justify-between items-end mb-2">
                        <span className="font-medium text-slate-700 text-sm">{step.label}</span>
                        <span className="font-bold text-slate-900">{step.value}</span>
                      </div>
                      <div className="w-full bg-slate-50 h-10 rounded-lg overflow-hidden flex items-center border border-slate-100">
                         <div className={`h-full ${step.color} transition-all duration-1000 flex items-center px-4 ${step.text || 'text-slate-800'}`} style={{width: step.width}}>
                         </div>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
