import { 
  Home,
  Map,
  AlertCircle,
  FileText,
  Activity,
  X
} from 'lucide-react';

interface CitizenSidebarProps {
  theme: 'light' | 'dark';
  isOpen: boolean;
  currentPage: string;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

export function CitizenSidebar({ theme, isOpen, currentPage, onClose, onNavigate }: CitizenSidebarProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'map', label: 'Map', icon: Map },
    { id: 'report', label: 'Report Issue', icon: AlertCircle },
    { id: 'my-complaints', label: 'My Complaints', icon: FileText },
    { id: 'city-status', label: 'City Status', icon: Activity },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-72 z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${
          theme === 'light'
            ? 'bg-white border-r border-gray-200'
            : 'bg-[#1a1433] border-r border-[#3d3066]'
        }`}
      >
        {/* Header */}
        <div className={`p-6 border-b ${
          theme === 'light' ? 'border-gray-200' : 'border-[#3d3066]'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                theme === 'light'
                  ? 'bg-gradient-to-br from-[#ff6b35] to-[#f7931e]'
                  : 'bg-gradient-to-br from-[#a78bfa] to-[#818cf8]'
              }`}>
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className={`text-lg ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  CIVIS
                </h2>
                <p className={`text-xs ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  Citizen Portal
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'light'
                  ? 'hover:bg-gray-100 text-gray-600'
                  : 'hover:bg-[#251e45] text-gray-400'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? theme === 'light'
                        ? 'bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white shadow-lg'
                        : 'bg-gradient-to-r from-[#a78bfa] to-[#818cf8] text-white shadow-lg shadow-purple-900/30'
                      : theme === 'light'
                        ? 'text-gray-700 hover:bg-gray-100'
                        : 'text-gray-300 hover:bg-[#251e45]'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${
                    isActive ? 'text-white' : ''
                  }`} />
                  <span className={`${
                    isActive ? '' : ''
                  }`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer Info */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${
          theme === 'light' ? 'border-gray-200' : 'border-[#3d3066]'
        }`}>
          <div className={`p-3 rounded-lg ${
            theme === 'light'
              ? 'bg-blue-50 border border-blue-200'
              : 'bg-blue-900/10 border border-blue-800/30'
          }`}>
            <p className={`text-xs ${
              theme === 'light' ? 'text-blue-700' : 'text-blue-300'
            }`}>
              💡 Help improve your city by reporting infrastructure issues
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
