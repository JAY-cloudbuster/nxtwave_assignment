import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { useStore } from '../store/useStore';
import { Copy, Check, Share2, Award, Rocket, Target, MessageCircle } from 'lucide-react';
import { db } from '../store/db';

export function DashboardPage() {
  const state = useStore();
  const [userId] = useState<string | null>(localStorage.getItem('current_user_id'));
  const [copied, setCopied] = useState(false);
  
  const user = state.users.find(u => u.id === userId);
  
  if (!user) {
    return <Navigate to="/register" replace />;
  }

  const referralUrl = `${window.location.origin}/register?ref=${user.referralCode}`;
  
  // Calculate stats
  const referredUsers = state.users.filter(u => u.referredBy === user.referralCode);
  const referralCount = referredUsers.length;
  
  const milestones = [5, 10, 25, 50];
  const nextMilestone = milestones.find(m => referralCount < m) || milestones[milestones.length - 1];
  const progress = Math.min(100, (referralCount / nextMilestone) * 100);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = `Hey! I'm joining NxtWave's free 'Build Your First AI Project in 60 Minutes' workshop. Register here: ${referralUrl}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;

  const handleBecomeAmbassador = () => {
    db.becomeAmbassador(user.id);
  };

  return (
    <div className="flex-grow bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold mb-4">
                <Check className="w-3.5 h-3.5" /> Successfully Registered
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome, {user.name}!</h1>
              <p className="text-slate-600 max-w-xl">You're all set for the AI Workshop. Your next step: invite your classmates to build together.</p>
            </div>
            
            {!user.isAmbassador && (
              <div className="bg-primary-50 rounded-xl p-5 border border-primary-100 shrink-0">
                <h3 className="font-semibold text-primary-900 mb-2 flex items-center gap-2">
                  <Rocket className="w-4 h-4" /> Want to lead in {user.college}?
                </h3>
                <p className="text-sm text-primary-700 mb-3">Become a Student Ambassador and get exclusive access.</p>
                <button onClick={handleBecomeAmbassador} className="w-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
                  Join Ambassador Program
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Referral Card */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-primary-600" /> Share Your Invite Link
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex-grow flex items-center bg-slate-50 border border-slate-200 rounded-lg p-1">
                  <input type="text" readOnly value={referralUrl} className="w-full bg-transparent px-3 py-2 text-slate-600 outline-none text-sm font-mono" />
                </div>
                <button onClick={handleCopy} className="shrink-0 bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  {copied ? <><Check className="w-4 h-4"/> Copied</> : <><Copy className="w-4 h-4"/> Copy Link</>}
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-3 px-4 rounded-xl font-medium transition-colors">
                  <MessageCircle className="w-5 h-5" /> Share on WhatsApp
                </a>
                <div className="flex items-center justify-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-600">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <QRCodeSVG value={referralUrl} size={64} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Show this QR</p>
                    <p className="text-xs">Perfect for college groups</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ambassador Journey (If active) */}
            {user.isAmbassador && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                  <Award className="w-32 h-32 text-primary-500" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">Ambassador Journey</h2>
                <p className="text-slate-600 text-sm mb-6">Complete these campaign actions to maximize your reach.</p>
                
                <div className="space-y-4 relative z-10">
                  <div className="flex items-start gap-4 p-4 rounded-xl border border-primary-100 bg-primary-50">
                    <div className="bg-primary-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</div>
                    <div>
                      <h4 className="font-semibold text-primary-900">Share in 3 relevant WhatsApp groups</h4>
                      <p className="text-xs text-primary-700 mt-1">Recommended action for Day 1</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50">
                    <div className="bg-slate-200 text-slate-500 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</div>
                    <div>
                      <h4 className="font-semibold text-slate-700">Contact a technical club/community</h4>
                      <p className="text-xs text-slate-500 mt-1">Recommended action for Day 3</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-slate-400" /> Your Impact
              </h3>
              
              <div className="flex items-end gap-3 mb-8">
                <div className="text-5xl font-black text-slate-900 tracking-tighter">{referralCount}</div>
                <div className="text-slate-500 pb-1 font-medium">friends joined</div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-slate-600">Next goal: {nextMilestone}</span>
                  <span className="text-primary-600">{referralCount}/{nextMilestone}</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-1000 ease-out" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
              
              <div className="text-center p-4 bg-slate-50 rounded-xl text-sm text-slate-600 border border-slate-100">
                You are currently ranked <span className="font-bold text-slate-900">#42</span> in {user.college}
              </div>
            </div>
            
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
              <h4 className="font-semibold text-amber-900 text-sm mb-2">Campaign Simulation Note</h4>
              <p className="text-xs text-amber-700">This dashboard simulates the growth loop. The more the user shares, the more the progress bar fills, creating a natural incentive to share again.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
