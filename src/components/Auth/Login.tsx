import React, { useState, useEffect } from 'react';
import { Shield, Mail, Lock } from 'lucide-react';
import authService from '../../services/authService';

const ALLOWED_DOMAIN = 'theroofdocs.com';
const DEFAULT_ADMIN_EMAIL = 'ahmed.mahmoud@theroofdocs.com';
const DEFAULT_TEMP_PASSWORD = 'Trd2025!';

const Login: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Pre-fill admin creds to ease first-time access (dev only)
    setEmail(DEFAULT_ADMIN_EMAIL);
    setPassword(DEFAULT_TEMP_PASSWORD);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const domain = email.split('@')[1] || '';
      if (domain.toLowerCase() !== ALLOWED_DOMAIN) {
        throw new Error(`Access restricted to ${ALLOWED_DOMAIN} accounts`);
      }
      await authService.signIn(email, password);
      onSuccess?.();
    } catch (err: any) {
      setError(err?.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-6">
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Admin / Staff Sign In</h2>
          <p className="text-gray-600 text-center mb-6">Only {ALLOWED_DOMAIN} emails are allowed</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder={`name@${ALLOWED_DOMAIN}`}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Your password"
                  required
                />
              </div>
            </div>
            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-2">{error}</div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <div className="mt-4 text-xs text-gray-500">
            Default admin: {DEFAULT_ADMIN_EMAIL} / {DEFAULT_TEMP_PASSWORD}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

