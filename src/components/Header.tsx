import { Sun, Moon, Bell, User, Menu, Shield, Users } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  onMenuToggle?: () => void;
  currentPage?: string;
  onNavigate?: (page: string) => void;
  userRole?: 'official' | 'citizen';
  onLogout?: () => void;
  onNotificationClick?: () => void;
  notificationCount?: number;
}

export function Header({ theme, onThemeToggle, onMenuToggle, currentPage = 'dashboard', onNavigate, userRole, onLogout, onNotificationClick, notificationCount }: HeaderProps) {
  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md border-b ${
      theme === 'light' 
        ? 'bg-white/80 border-gray-200' 
        : 'bg-[#1a1433]/80 border-[#3d3066]'
    }`}>
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo and Title */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#251e45] transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              theme === 'light' 
                ? 'bg-gradient-to-br from-[#ff6b35] to-[#f7931e]' 
                : 'bg-gradient-to-br from-[#a78bfa] to-[#818cf8]'
            }`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" opacity="0.8"/>
                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h1 className={`text-xl ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                CIVIS
              </h1>
              <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                Infrastructure Monitor
              </p>
            </div>
          </div>
        </div>

        {/* Navigation - Different for City Official vs Citizen */}
        <nav className="hidden md:flex items-center gap-6">
          {userRole === 'official' ? (
            <>
              <button
                onClick={() => onNavigate?.('overview')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentPage === 'overview'
                    ? theme === 'light'
                      ? 'bg-[#ff6b35] text-white hover:bg-[#ff5522]'
                      : 'bg-[#a78bfa] text-white hover:bg-[#9370f0]'
                    : theme === 'light'
                      ? 'text-gray-700 hover:bg-gray-100'
                      : 'text-gray-300 hover:bg-[#251e45]'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => onNavigate?.('map')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentPage === 'map'
                    ? theme === 'light'
                      ? 'bg-[#ff6b35] text-white hover:bg-[#ff5522]'
                      : 'bg-[#a78bfa] text-white hover:bg-[#9370f0]'
                    : theme === 'light'
                      ? 'text-gray-700 hover:bg-gray-100'
                      : 'text-gray-300 hover:bg-[#251e45]'
                }`}
              >
                Map
              </button>
              <button
                onClick={() => onNavigate?.('alerts')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentPage === 'alerts'
                    ? theme === 'light'
                      ? 'bg-[#ff6b35] text-white hover:bg-[#ff5522]'
                      : 'bg-[#a78bfa] text-white hover:bg-[#9370f0]'
                    : theme === 'light'
                      ? 'text-gray-700 hover:bg-gray-100'
                      : 'text-gray-300 hover:bg-[#251e45]'
                }`}
              >
                Alerts
              </button>
              <button
                onClick={() => onNavigate?.('complaints')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentPage === 'complaints'
                    ? theme === 'light'
                      ? 'bg-[#ff6b35] text-white hover:bg-[#ff5522]'
                      : 'bg-[#a78bfa] text-white hover:bg-[#9370f0]'
                    : theme === 'light'
                      ? 'text-gray-700 hover:bg-gray-100'
                      : 'text-gray-300 hover:bg-[#251e45]'
                }`}
              >
                Complaints
              </button>
              <button
                onClick={() => onNavigate?.('maintenance')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentPage === 'maintenance'
                    ? theme === 'light'
                      ? 'bg-[#ff6b35] text-white hover:bg-[#ff5522]'
                      : 'bg-[#a78bfa] text-white hover:bg-[#9370f0]'
                    : theme === 'light'
                      ? 'text-gray-700 hover:bg-gray-100'
                      : 'text-gray-300 hover:bg-[#251e45]'
                }`}
              >
                Maintenance
              </button>
              <button
                onClick={() => onNavigate?.('analytics')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentPage === 'analytics'
                    ? theme === 'light'
                      ? 'bg-[#ff6b35] text-white hover:bg-[#ff5522]'
                      : 'bg-[#a78bfa] text-white hover:bg-[#9370f0]'
                    : theme === 'light'
                      ? 'text-gray-700 hover:bg-gray-100'
                      : 'text-gray-300 hover:bg-[#251e45]'
                }`}
              >
                Analytics
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onNavigate?.('home')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentPage === 'home'
                    ? theme === 'light'
                      ? 'bg-[#ff6b35] text-white hover:bg-[#ff5522]'
                      : 'bg-[#a78bfa] text-white hover:bg-[#9370f0]'
                    : theme === 'light'
                      ? 'text-gray-700 hover:bg-gray-100'
                      : 'text-gray-300 hover:bg-[#251e45]'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => onNavigate?.('map')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentPage === 'map'
                    ? theme === 'light'
                      ? 'bg-[#ff6b35] text-white hover:bg-[#ff5522]'
                      : 'bg-[#a78bfa] text-white hover:bg-[#9370f0]'
                    : theme === 'light'
                      ? 'text-gray-700 hover:bg-gray-100'
                      : 'text-gray-300 hover:bg-[#251e45]'
                }`}
              >
                Map
              </button>
              <button
                onClick={() => onNavigate?.('report')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentPage === 'report'
                    ? theme === 'light'
                      ? 'bg-[#ff6b35] text-white hover:bg-[#ff5522]'
                      : 'bg-[#a78bfa] text-white hover:bg-[#9370f0]'
                    : theme === 'light'
                      ? 'text-gray-700 hover:bg-gray-100'
                      : 'text-gray-300 hover:bg-[#251e45]'
                }`}
              >
                Report Issue
              </button>
              <button
                onClick={() => onNavigate?.('my-complaints')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentPage === 'my-complaints'
                    ? theme === 'light'
                      ? 'bg-[#ff6b35] text-white hover:bg-[#ff5522]'
                      : 'bg-[#a78bfa] text-white hover:bg-[#9370f0]'
                    : theme === 'light'
                      ? 'text-gray-700 hover:bg-gray-100'
                      : 'text-gray-300 hover:bg-[#251e45]'
                }`}
              >
                My Complaints
              </button>
              <button
                onClick={() => onNavigate?.('city-status')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentPage === 'city-status'
                    ? theme === 'light'
                      ? 'bg-[#ff6b35] text-white hover:bg-[#ff5522]'
                      : 'bg-[#a78bfa] text-white hover:bg-[#9370f0]'
                    : theme === 'light'
                      ? 'text-gray-700 hover:bg-gray-100'
                      : 'text-gray-300 hover:bg-[#251e45]'
                }`}
              >
                City Status
              </button>
            </>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Role Badge */}
          {userRole && (
            <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg ${
              userRole === 'official'
                ? theme === 'light'
                  ? 'bg-orange-100 text-[#ff6b35]'
                  : 'bg-purple-900/30 text-[#a78bfa]'
                : theme === 'light'
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-blue-900/30 text-blue-400'
            }`}>
              {userRole === 'official' ? (
                <>
                  <Shield className="w-4 h-4" />
                  <span className="text-sm">Official</span>
                </>
              ) : (
                <>
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Citizen</span>
                </>
              )}
            </div>
          )}

          {/* Theme Toggle */}
          <button
            onClick={onThemeToggle}
            className={`p-2 rounded-lg transition-colors ${
              theme === 'light'
                ? 'hover:bg-gray-100 text-gray-700'
                : 'hover:bg-[#251e45] text-gray-300'
            }`}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {/* Notifications */}
          <button
            onClick={onNotificationClick}
            className={`relative p-2 rounded-lg transition-colors ${
              theme === 'light'
                ? 'hover:bg-gray-100 text-gray-700'
                : 'hover:bg-[#251e45] text-gray-300'
            }`}
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {notificationCount && notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#ef4444] rounded-full"></span>
            )}
          </button>

          {/* User Profile with Logout */}
          <div className="relative group">
            <button
              className={`flex items-center gap-2 p-2 pr-3 rounded-lg transition-colors ${
                theme === 'light'
                  ? 'hover:bg-gray-100 text-gray-700'
                  : 'hover:bg-[#251e45] text-gray-300'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                theme === 'light' 
                  ? 'bg-gray-200' 
                  : 'bg-[#3d3066]'
              }`}>
                <User className="w-4 h-4" />
              </div>
              <span className="hidden lg:inline text-sm">
                {userRole === 'official' ? 'Admin' : 'User'}
              </span>
            </button>
            
            {/* Dropdown Menu */}
            {onLogout && (
              <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all ${
                theme === 'light' 
                  ? 'bg-white border border-gray-200' 
                  : 'bg-[#1a1433] border border-[#3d3066]'
              }`}>
                <button
                  onClick={onLogout}
                  className={`w-full px-4 py-2 text-left text-sm rounded-lg transition-colors ${
                    theme === 'light'
                      ? 'text-gray-700 hover:bg-gray-100'
                      : 'text-gray-300 hover:bg-[#251e45]'
                  }`}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}