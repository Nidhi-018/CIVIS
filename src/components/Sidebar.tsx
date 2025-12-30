import { Lightbulb, Navigation, Droplet, Trash2, Filter, Search, X } from 'lucide-react';

interface SidebarProps {
  theme: 'light' | 'dark';
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ 
  theme, 
  selectedCategory, 
  onCategoryChange, 
  selectedStatus, 
  onStatusChange,
  isOpen = true,
  onClose 
}: SidebarProps) {
  const categories = [
    { id: 'all', name: 'All Infrastructure', icon: Filter, color: '#6b7280' },
    { id: 'streetlights', name: 'Street Lights', icon: Lightbulb, color: '#fbbf24' },
    { id: 'traffic', name: 'Traffic Signals', icon: Navigation, color: '#ef4444' },
    { id: 'water', name: 'Water Distribution', icon: Droplet, color: '#0ea5e9' },
    { id: 'waste', name: 'Waste Management', icon: Trash2, color: '#10b981' },
  ];

  const statuses = [
    { id: 'all', name: 'All Status', color: '#6b7280' },
    { id: 'operational', name: 'Operational', color: '#10b981' },
    { id: 'warning', name: 'Warning', color: '#fbbf24' },
    { id: 'critical', name: 'Critical', color: '#ef4444' },
    { id: 'maintenance', name: 'Maintenance', color: '#818cf8' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen lg:h-auto
        w-72 lg:w-80 z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${theme === 'light' 
          ? 'bg-white border-r border-gray-200' 
          : 'bg-[#1a1433] border-r border-[#3d3066]'
        }
        overflow-y-auto
      `}>
        <div className="p-6 space-y-6">
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className={`lg:hidden absolute top-4 right-4 p-2 rounded-lg ${
              theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-[#251e45]'
            }`}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Search */}
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
              theme === 'light' ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              placeholder="Search locations..."
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-colors ${
                theme === 'light'
                  ? 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35]/20'
                  : 'bg-[#251e45] border-[#3d3066] text-white placeholder-gray-500 focus:border-[#a78bfa] focus:ring-2 focus:ring-[#a78bfa]/20'
              } focus:outline-none`}
            />
          </div>

          {/* Infrastructure Type Filter */}
          <div>
            <h3 className={`mb-3 flex items-center gap-2 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              <Filter className="w-4 h-4" />
              Infrastructure Type
            </h3>
            <div className="space-y-1">
              {categories.map((category) => {
                const Icon = category.icon;
                const isSelected = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => onCategoryChange(category.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isSelected
                        ? theme === 'light'
                          ? 'bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white shadow-md'
                          : 'bg-gradient-to-r from-[#a78bfa] to-[#818cf8] text-white shadow-lg shadow-purple-500/20'
                        : theme === 'light'
                        ? 'hover:bg-gray-100 text-gray-700'
                        : 'hover:bg-[#251e45] text-gray-300'
                    }`}
                  >
                    <Icon 
                      className="w-5 h-5" 
                      style={{ color: isSelected ? 'white' : category.color }}
                    />
                    <span className="flex-1 text-left text-sm">{category.name}</span>
                    {isSelected && (
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        theme === 'light' ? 'bg-white/20' : 'bg-white/20'
                      }`}>
                        Active
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <h3 className={`mb-3 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              Status Filter
            </h3>
            <div className="space-y-1">
              {statuses.map((status) => {
                const isSelected = selectedStatus === status.id;
                return (
                  <button
                    key={status.id}
                    onClick={() => onStatusChange(status.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isSelected
                        ? theme === 'light'
                          ? 'bg-gray-100 border-2 border-gray-300'
                          : 'bg-[#251e45] border-2 border-[#3d3066]'
                        : theme === 'light'
                        ? 'hover:bg-gray-50 border-2 border-transparent'
                        : 'hover:bg-[#251e45]/50 border-2 border-transparent'
                    }`}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: status.color }}
                    />
                    <span className={`flex-1 text-left text-sm ${
                      theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                    }`}>
                      {status.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Stats */}
          <div className={`p-4 rounded-lg ${
            theme === 'light' 
              ? 'bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200' 
              : 'bg-gradient-to-br from-[#251e45] to-[#2d2455] border border-[#3d3066]'
          }`}>
            <h4 className={`mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Quick Stats
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  Total Assets
                </span>
                <span className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  1,247
                </span>
              </div>
              <div className="flex justify-between">
                <span className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  Active Alerts
                </span>
                <span className="font-semibold text-[#ef4444]">
                  23
                </span>
              </div>
              <div className="flex justify-between">
                <span className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  Efficiency
                </span>
                <span className="font-semibold text-[#10b981]">
                  94.2%
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
