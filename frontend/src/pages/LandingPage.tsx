import { Link } from 'react-router-dom';
import { ArrowRight, Code, Cpu, Target, Clock, CalendarDays, CheckCircle2 } from 'lucide-react';
import { useStore } from '../store/useStore';

export function LandingPage() {
  const state = useStore();
  const headline = state.abTests.headline === 'A' 
    ? "Build Your First AI Project in 60 Minutes" 
    : "Build an AI Project You Can Actually Show in Your Portfolio";
    
  const cta = state.abTests.cta === 'A'
    ? "Register Now - Free"
    : "Claim Your Spot - Free";

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-50 via-white to-white opacity-80" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-medium mb-8">
              <span className="flex h-2 w-2 rounded-full bg-primary-500 animate-pulse"></span>
              For Final Year Engineering Students
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
              {headline.split(' ').map((word, i) => (
                word.toLowerCase() === 'ai' ? <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500"> {word} </span> : ` ${word} `
              ))}
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Stop watching generic webinars. Spend 60 minutes building a tangible AI application you can discuss in your next placement interview.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl text-lg font-semibold hover:bg-primary-700 shadow-lg shadow-primary-600/30 transition-all hover:scale-[1.02]">
                {cta}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-sm text-slate-500 sm:hidden">Limited seats available</p>
            </div>
            <div className="mt-10 flex items-center justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2"><CalendarDays className="w-4 h-4 text-slate-400"/> This Weekend</div>
              <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-400"/> 60 Minutes</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> 100% Free</div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center mb-6">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Tangible Project</h3>
              <p className="text-slate-600">Walk away with a working AI app. No theoretical fluff, just pure practical implementation.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-secondary-50 text-secondary-600 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Portfolio Ready</h3>
              <p className="text-slate-600">Get something concrete to showcase on your resume and discuss in placement interviews.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-6">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Modern Stack</h3>
              <p className="text-slate-600">Learn to integrate modern LLM APIs with zero prior AI experience required.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Social Proof / Urgency (Simulated) */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Join hundreds of final year students</h2>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {['IIT', 'NIT', 'BITS', 'VIT', 'SRM', 'Manipal'].map(college => (
              <span key={college} className="px-4 py-2 bg-slate-50 text-slate-600 rounded-lg text-sm font-medium border border-slate-200">Students from {college}*</span>
            ))}
          </div>
          <p className="text-xs text-slate-400 mb-8">*Strategic assumption for campaign positioning.</p>
          
          <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">Ready to build?</h3>
                <p className="text-slate-300 text-lg max-w-md">Secure your spot. Get your referral code. Invite your classmates.</p>
              </div>
              <Link to="/register" className="w-full md:w-auto px-8 py-4 bg-white text-slate-900 rounded-xl text-lg font-bold hover:bg-slate-50 transition-colors whitespace-nowrap text-center">
                Register Free
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
