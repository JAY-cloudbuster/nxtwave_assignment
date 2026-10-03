import { Outlet, Link, useLocation } from 'react-router-dom';
import { Rocket, ShieldAlert, BarChart3, LayoutDashboard } from 'lucide-react';

export function MainLayout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                <Rocket className="h-6 w-6 text-primary-600" />
                <span className="font-bold text-xl tracking-tight text-slate-900">
                  NxtWave<span className="text-primary-600">.ai</span>
                </span>
              </Link>
              <nav className="ml-10 flex items-center space-x-4 hidden md:flex">
                <Link to="/" className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">Workshop</Link>
                <Link to="/register" className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">Register</Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="text-slate-600 hover:text-slate-900 text-sm font-medium hidden sm:block">My Dashboard</Link>
              <Link to="/admin" className="inline-flex items-center gap-1.5 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm">
                <LayoutDashboard className="w-4 h-4" />
                Growth Admin
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col">
        {isAdmin && (
          <div className="bg-slate-900 text-slate-300 py-2 px-4 text-xs font-medium flex items-center justify-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400">ADMIN MODE:</span> Viewing simulated campaign data.
          </div>
        )}
        <div className="flex-grow flex flex-col">
          <Outlet />
        </div>
      </main>
      
      {!isAdmin && (
        <footer className="bg-slate-900 text-slate-400 py-12 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 text-white mb-4">
                <Rocket className="h-5 w-5" />
                <span className="font-bold text-lg">NxtWave AI</span>
              </div>
              <p className="text-sm">Empowering the next generation of engineers with practical AI skills.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-white transition-colors">Workshop Details</Link></li>
                <li><Link to="/register" className="hover:text-white transition-colors">Register Now</Link></li>
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Ambassador Portal</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Internal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/admin" className="hover:text-white transition-colors flex items-center gap-2"><BarChart3 className="w-4 h-4"/> Campaign Command Center</Link></li>
              </ul>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
