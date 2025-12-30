import { useState } from 'react';
import { Building2, Users, Mail, Lock, Eye, EyeOff, MapPin, Lightbulb, Droplets, TrafficCone } from 'lucide-react';

interface LoginPageProps {
  theme: 'light' | 'dark';
  onLogin: (role: 'official' | 'citizen') => void;
}

export function LoginPage({ theme, onLogin }: LoginPageProps) {
  const [selectedRole, setSelectedRole] = useState<'official' | 'citizen' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
      onLogin(selectedRole);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${
      theme === 'light' 
        ? 'bg-gradient-to-br from-orange-50 via-white to-blue-50' 
        : 'bg-gradient-to-br from-[#0f0a1f] via-[#1a1433] to-[#1e1240]'
    }`}>
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 opacity-20 ${
          theme === 'light' ? 'text-orange-300' : 'text-purple-500'
        }`}>
          <Lightbulb className="w-16 h-16" />
        </div>
        <div className={`absolute bottom-32 right-20 opacity-20 ${
          theme === 'light' ? 'text-blue-300' : 'text-blue-500'
        }`}>
          <Droplets className="w-20 h-20" />
        </div>
        <div className={`absolute top-40 right-32 opacity-20 ${
          theme === 'light' ? 'text-red-300' : 'text-purple-400'
        }`}>
          <TrafficCone className="w-12 h-12" />
        </div>
        <div className={`absolute bottom-20 left-32 opacity-20 ${
          theme === 'light' ? 'text-yellow-300' : 'text-indigo-500'
        }`}>
          <MapPin className="w-14 h-14" />
        </div>
      </div>

      <div className="w-full max-w-5xl relative">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <div className="text-center lg:text-left space-y-6 px-4">
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                theme === 'light' 
                  ? 'bg-gradient-to-br from-[#ff6b35] to-[#f7931e]' 
                  : 'bg-gradient-to-br from-[#a78bfa] to-[#818cf8]'
              }`}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" opacity="0.9"/>
                  <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h1 className={`text-5xl tracking-tight ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  CIVIS
                </h1>
                <p className={`text-sm ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  Civic Intelligence & Vital Infrastructure System
                </p>
              </div>
            </div>

            <div className={`space-y-4 ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}>
              <p className="text-lg">
                Empowering cities through real-time infrastructure monitoring, predictive maintenance, and citizen engagement.
              </p>
              
              {/* City Skyline Illustration */}
              <div className={`mt-8 p-6 rounded-2xl ${
                theme === 'light' 
                  ? 'bg-white/50 border border-gray-200' 
                  : 'bg-white/5 border border-gray-700'
              }`}>
                <div className="flex justify-around items-end h-32">
                  <div className={`w-12 h-20 rounded-t-lg ${
                    theme === 'light' ? 'bg-orange-400' : 'bg-purple-500'
                  } opacity-80`} />
                  <div className={`w-12 h-28 rounded-t-lg ${
                    theme === 'light' ? 'bg-blue-400' : 'bg-indigo-500'
                  } opacity-80`} />
                  <div className={`w-12 h-16 rounded-t-lg ${
                    theme === 'light' ? 'bg-yellow-400' : 'bg-violet-500'
                  } opacity-80`} />
                  <div className={`w-12 h-24 rounded-t-lg ${
                    theme === 'light' ? 'bg-red-400' : 'bg-blue-500'
                  } opacity-80`} />
                  <div className={`w-12 h-18 rounded-t-lg ${
                    theme === 'light' ? 'bg-orange-400' : 'bg-purple-400'
                  } opacity-80`} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className={`p-8 rounded-3xl shadow-2xl ${
            theme === 'light' 
              ? 'bg-white border border-gray-200' 
              : 'bg-[#1a1433] border border-[#3d3066]'
          }`}>
            <h2 className={`text-3xl mb-2 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              Welcome Back
            </h2>
            <p className={`mb-6 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Select your role to continue
            </p>

            {/* Role Selection Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                type="button"
                onClick={() => setSelectedRole('official')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedRole === 'official'
                    ? theme === 'light'
                      ? 'border-[#ff6b35] bg-orange-50'
                      : 'border-[#a78bfa] bg-purple-900/30'
                    : theme === 'light'
                      ? 'border-gray-200 hover:border-gray-300 bg-white'
                      : 'border-[#3d3066] hover:border-[#4d4076] bg-[#251e45]'
                }`}
              >
                <Building2 className={`w-8 h-8 mx-auto mb-2 ${
                  selectedRole === 'official'
                    ? theme === 'light' ? 'text-[#ff6b35]' : 'text-[#a78bfa]'
                    : theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`} />
                <div className={`text-sm ${
                  selectedRole === 'official'
                    ? theme === 'light' ? 'text-[#ff6b35]' : 'text-[#a78bfa]'
                    : theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  City Official
                </div>
                <div className={`text-xs mt-1 ${
                  theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  Full Access
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('citizen')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedRole === 'citizen'
                    ? theme === 'light'
                      ? 'border-[#ff6b35] bg-orange-50'
                      : 'border-[#a78bfa] bg-purple-900/30'
                    : theme === 'light'
                      ? 'border-gray-200 hover:border-gray-300 bg-white'
                      : 'border-[#3d3066] hover:border-[#4d4076] bg-[#251e45]'
                }`}
              >
                <Users className={`w-8 h-8 mx-auto mb-2 ${
                  selectedRole === 'citizen'
                    ? theme === 'light' ? 'text-[#ff6b35]' : 'text-[#a78bfa]'
                    : theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`} />
                <div className={`text-sm ${
                  selectedRole === 'citizen'
                    ? theme === 'light' ? 'text-[#ff6b35]' : 'text-[#a78bfa]'
                    : theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  Citizen
                </div>
                <div className={`text-xs mt-1 ${
                  theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  Public View
                </div>
              </button>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block text-sm mb-2 ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                }`}>
                  Email or Mobile
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    theme === 'light' ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email or mobile"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                      theme === 'light'
                        ? 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#ff6b35] focus:ring-2 focus:ring-orange-100'
                        : 'bg-[#251e45] border-[#3d3066] text-white placeholder-gray-500 focus:border-[#a78bfa] focus:ring-2 focus:ring-purple-900/50'
                    } outline-none`}
                    required
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm mb-2 ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                }`}>
                  Password
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    theme === 'light' ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-colors ${
                      theme === 'light'
                        ? 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#ff6b35] focus:ring-2 focus:ring-orange-100'
                        : 'bg-[#251e45] border-[#3d3066] text-white placeholder-gray-500 focus:border-[#a78bfa] focus:ring-2 focus:ring-purple-900/50'
                    } outline-none`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                      theme === 'light' ? 'text-gray-400 hover:text-gray-600' : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className={`w-4 h-4 rounded ${
                      theme === 'light' 
                        ? 'border-gray-300 text-[#ff6b35] focus:ring-[#ff6b35]' 
                        : 'border-[#3d3066] text-[#a78bfa] focus:ring-[#a78bfa]'
                    }`}
                  />
                  <span className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>
                    Remember me
                  </span>
                </label>
                <a 
                  href="#" 
                  className={`${
                    theme === 'light' ? 'text-[#ff6b35] hover:text-[#ff5522]' : 'text-[#a78bfa] hover:text-[#9370f0]'
                  }`}
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={!selectedRole}
                className={`w-full py-3 rounded-lg transition-all ${
                  selectedRole
                    ? theme === 'light'
                      ? 'bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white hover:shadow-lg hover:scale-[1.02]'
                      : 'bg-gradient-to-r from-[#a78bfa] to-[#818cf8] text-white hover:shadow-lg hover:scale-[1.02]'
                    : theme === 'light'
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-[#251e45] text-gray-600 cursor-not-allowed'
                }`}
              >
                {selectedRole ? `Login as ${selectedRole === 'official' ? 'City Official' : 'Citizen'}` : 'Select a role to continue'}
              </button>
            </form>

            <div className={`mt-6 text-center text-sm ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Don't have an account?{' '}
              <a 
                href="#" 
                className={`${
                  theme === 'light' ? 'text-[#ff6b35] hover:text-[#ff5522]' : 'text-[#a78bfa] hover:text-[#9370f0]'
                }`}
              >
                Request Access
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
