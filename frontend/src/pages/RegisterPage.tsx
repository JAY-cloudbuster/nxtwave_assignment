import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { db } from '../store/db';
import { UserPlus, AlertCircle } from 'lucide-react';

export function RegisterPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const referredBy = searchParams.get('ref') || '';
  const sourceParam = searchParams.get('utm_source') || 'organic';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    branch: '',
    graduationYear: '2024',
    primaryInterest: 'AI/ML',
    referredBy: referredBy
  });
  
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (!formData.name || !formData.email || !formData.phone || !formData.college) {
        throw new Error("Please fill out all required fields.");
      }
      
      const user = db.registerUser(formData, sourceParam);
      
      // Save current user session (simulated login)
      localStorage.setItem('current_user_id', user.id);
      
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Secure Your Spot</h2>
          <p className="text-sm text-slate-500 mt-2">Free 60-Minute AI Workshop</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-600 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder="John Doe" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder="john@example.com" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">WhatsApp No.</label>
              <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder="10-digit number" />
            </div>
          </div>

          <div>
            <label htmlFor="college" className="block text-sm font-medium text-slate-700 mb-1">College Name</label>
            <input type="text" id="college" name="college" required value={formData.college} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder="Institute of Technology" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="branch" className="block text-sm font-medium text-slate-700 mb-1">Branch</label>
              <select id="branch" name="branch" value={formData.branch} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all appearance-none">
                <option value="">Select...</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="graduationYear" className="block text-sm font-medium text-slate-700 mb-1">Graduation Year</label>
              <select id="graduationYear" name="graduationYear" value={formData.graduationYear} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all appearance-none">
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {referredBy && (
            <div>
              <label htmlFor="referredBy" className="block text-sm font-medium text-slate-700 mb-1">Referral Code</label>
              <input type="text" id="referredBy" name="referredBy" readOnly value={formData.referredBy} className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed outline-none" />
              <p className="text-xs text-primary-600 mt-1">Referral code applied automatically!</p>
            </div>
          )}

          <button type="submit" className="w-full mt-8 bg-slate-900 text-white font-semibold rounded-lg px-4 py-3 hover:bg-slate-800 transition-colors flex justify-center items-center gap-2">
            Complete Registration
          </button>
        </form>
      </div>
    </div>
  );
}
