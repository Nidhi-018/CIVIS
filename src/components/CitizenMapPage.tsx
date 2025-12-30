import { useState } from 'react';
import { MapView } from './MapView';
import { Filter } from 'lucide-react';

interface CitizenMapPageProps {
  theme: 'light' | 'dark';
}

export function CitizenMapPage({ theme }: CitizenMapPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Public infrastructure nodes - citizens can see all infrastructure
  const infrastructureNodes = [
    { id: '1', type: 'streetlights' as const, status: 'operational' as const, latitude: 40.7128, longitude: -74.0060, name: 'Streetlight - Main St', details: 'Operating normally' },
    { id: '2', type: 'streetlights' as const, status: 'warning' as const, latitude: 40.7589, longitude: -73.9851, name: 'Streetlight - Oak Ave', details: 'Low brightness detected' },
    { id: '3', type: 'streetlights' as const, status: 'critical' as const, latitude: 40.7505, longitude: -73.9934, name: 'Streetlight - Park Rd', details: 'Not responding' },
    { id: '4', type: 'traffic' as const, status: 'operational' as const, latitude: 40.7282, longitude: -73.7949, name: 'Traffic Signal - Downtown', details: 'All lights functioning' },
    { id: '5', type: 'traffic' as const, status: 'maintenance' as const, latitude: 40.7831, longitude: -73.9712, name: 'Traffic Signal - 5th Ave', details: 'Scheduled maintenance' },
    { id: '6', type: 'water' as const, status: 'operational' as const, latitude: 40.6892, longitude: -74.0445, name: 'Water Pump - Station A', details: 'Normal pressure' },
    { id: '7', type: 'water' as const, status: 'warning' as const, latitude: 40.7308, longitude: -73.9973, name: 'Water Valve - Zone 3', details: 'Pressure fluctuation' },
    { id: '8', type: 'waste' as const, status: 'operational' as const, latitude: 40.7829, longitude: -73.9654, name: 'Waste Bin - Park', details: '45% full' },
    { id: '9', type: 'waste' as const, status: 'critical' as const, latitude: 40.6501, longitude: -73.9496, name: 'Waste Bin - Market', details: '95% full - requires emptying' },
    { id: '10', type: 'streetlights' as const, status: 'operational' as const, latitude: 40.7580, longitude: -73.9855, name: 'Streetlight - River St', details: 'Operating normally' },
    { id: '11', type: 'traffic' as const, status: 'warning' as const, latitude: 40.7831, longitude: -73.9712, name: 'Traffic Signal - West End', details: 'Timer sync issue' },
    { id: '12', type: 'water' as const, status: 'operational' as const, latitude: 40.7505, longitude: -73.9934, name: 'Water Tank - North', details: 'Level: 78%' },
  ];

  // Filter nodes based on selections
  const filteredNodes = infrastructureNodes.filter(node => {
    const categoryMatch = selectedCategory === 'all' || node.type === selectedCategory;
    const statusMatch = selectedStatus === 'all' || node.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  // Count by status for display
  const statusCounts = {
    operational: infrastructureNodes.filter(n => n.status === 'operational').length,
    warning: infrastructureNodes.filter(n => n.status === 'warning').length,
    critical: infrastructureNodes.filter(n => n.status === 'critical').length,
    maintenance: infrastructureNodes.filter(n => n.status === 'maintenance').length,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className={`text-3xl mb-2 ${
          theme === 'light' ? 'text-gray-900' : 'text-white'
        }`}>
          Map
        </h1>
        <p className={`${
          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
        }`}>
          View real-time status of city infrastructure
        </p>
      </div>

      {/* Filters Section */}
      <div className={`p-6 rounded-2xl border mb-6 ${
        theme === 'light'
          ? 'bg-white border-gray-200'
          : 'bg-[#1a1433] border-[#3d3066]'
      }`}>
        <div className="flex items-center gap-2 mb-4">
          <Filter className={`w-5 h-5 ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-300'
          }`} />
          <h3 className={`${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            Filters
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Infrastructure Type Filter */}
          <div>
            <label className={`block text-sm mb-3 ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}>
              Infrastructure Type
            </label>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors ${
                  selectedCategory === 'all'
                    ? theme === 'light'
                      ? 'bg-[#ff6b35] text-white'
                      : 'bg-[#a78bfa] text-white'
                    : theme === 'light'
                      ? 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      : 'bg-[#251e45] text-gray-300 hover:bg-[#3d3066]'
                }`}
              >
                <span>All Infrastructure</span>
                <span className={`ml-2 text-xs ${
                  selectedCategory === 'all'
                    ? 'opacity-80'
                    : theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  ({infrastructureNodes.length})
                </span>
              </button>

              <button
                onClick={() => setSelectedCategory('streetlights')}
                className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors ${
                  selectedCategory === 'streetlights'
                    ? theme === 'light'
                      ? 'bg-[#ff6b35] text-white'
                      : 'bg-[#a78bfa] text-white'
                    : theme === 'light'
                      ? 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      : 'bg-[#251e45] text-gray-300 hover:bg-[#3d3066]'
                }`}
              >
                <span>Street Lights</span>
                <span className={`ml-2 text-xs ${
                  selectedCategory === 'streetlights'
                    ? 'opacity-80'
                    : theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  ({infrastructureNodes.filter(n => n.type === 'streetlights').length})
                </span>
              </button>

              <button
                onClick={() => setSelectedCategory('traffic')}
                className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors ${
                  selectedCategory === 'traffic'
                    ? theme === 'light'
                      ? 'bg-[#ff6b35] text-white'
                      : 'bg-[#a78bfa] text-white'
                    : theme === 'light'
                      ? 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      : 'bg-[#251e45] text-gray-300 hover:bg-[#3d3066]'
                }`}
              >
                <span>Traffic Signals</span>
                <span className={`ml-2 text-xs ${
                  selectedCategory === 'traffic'
                    ? 'opacity-80'
                    : theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  ({infrastructureNodes.filter(n => n.type === 'traffic').length})
                </span>
              </button>

              <button
                onClick={() => setSelectedCategory('water')}
                className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors ${
                  selectedCategory === 'water'
                    ? theme === 'light'
                      ? 'bg-[#ff6b35] text-white'
                      : 'bg-[#a78bfa] text-white'
                    : theme === 'light'
                      ? 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      : 'bg-[#251e45] text-gray-300 hover:bg-[#3d3066]'
                }`}
              >
                <span>Water Distribution</span>
                <span className={`ml-2 text-xs ${
                  selectedCategory === 'water'
                    ? 'opacity-80'
                    : theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  ({infrastructureNodes.filter(n => n.type === 'water').length})
                </span>
              </button>

              <button
                onClick={() => setSelectedCategory('waste')}
                className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors ${
                  selectedCategory === 'waste'
                    ? theme === 'light'
                      ? 'bg-[#ff6b35] text-white'
                      : 'bg-[#a78bfa] text-white'
                    : theme === 'light'
                      ? 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      : 'bg-[#251e45] text-gray-300 hover:bg-[#3d3066]'
                }`}
              >
                <span>Waste Management</span>
                <span className={`ml-2 text-xs ${
                  selectedCategory === 'waste'
                    ? 'opacity-80'
                    : theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  ({infrastructureNodes.filter(n => n.type === 'waste').length})
                </span>
              </button>
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className={`block text-sm mb-3 ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}>
              Status Filter
            </label>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedStatus('all')}
                className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors ${
                  selectedStatus === 'all'
                    ? theme === 'light'
                      ? 'bg-[#ff6b35] text-white'
                      : 'bg-[#a78bfa] text-white'
                    : theme === 'light'
                      ? 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      : 'bg-[#251e45] text-gray-300 hover:bg-[#3d3066]'
                }`}
              >
                <span>All Status</span>
                <span className={`ml-2 text-xs ${
                  selectedStatus === 'all'
                    ? 'opacity-80'
                    : theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  ({infrastructureNodes.length})
                </span>
              </button>

              <button
                onClick={() => setSelectedStatus('operational')}
                className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors ${
                  selectedStatus === 'operational'
                    ? theme === 'light'
                      ? 'bg-[#ff6b35] text-white'
                      : 'bg-[#a78bfa] text-white'
                    : theme === 'light'
                      ? 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      : 'bg-[#251e45] text-gray-300 hover:bg-[#3d3066]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                  <span>Operational</span>
                </div>
                <span className={`ml-2 text-xs ${
                  selectedStatus === 'operational'
                    ? 'opacity-80'
                    : theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  ({statusCounts.operational})
                </span>
              </button>

              <button
                onClick={() => setSelectedStatus('warning')}
                className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors ${
                  selectedStatus === 'warning'
                    ? theme === 'light'
                      ? 'bg-[#ff6b35] text-white'
                      : 'bg-[#a78bfa] text-white'
                    : theme === 'light'
                      ? 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      : 'bg-[#251e45] text-gray-300 hover:bg-[#3d3066]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#fbbf24]" />
                  <span>Warning</span>
                </div>
                <span className={`ml-2 text-xs ${
                  selectedStatus === 'warning'
                    ? 'opacity-80'
                    : theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  ({statusCounts.warning})
                </span>
              </button>

              <button
                onClick={() => setSelectedStatus('critical')}
                className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors ${
                  selectedStatus === 'critical'
                    ? theme === 'light'
                      ? 'bg-[#ff6b35] text-white'
                      : 'bg-[#a78bfa] text-white'
                    : theme === 'light'
                      ? 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      : 'bg-[#251e45] text-gray-300 hover:bg-[#3d3066]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#ef4444]" />
                  <span>Critical</span>
                </div>
                <span className={`ml-2 text-xs ${
                  selectedStatus === 'critical'
                    ? 'opacity-80'
                    : theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  ({statusCounts.critical})
                </span>
              </button>

              <button
                onClick={() => setSelectedStatus('maintenance')}
                className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors ${
                  selectedStatus === 'maintenance'
                    ? theme === 'light'
                      ? 'bg-[#ff6b35] text-white'
                      : 'bg-[#a78bfa] text-white'
                    : theme === 'light'
                      ? 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      : 'bg-[#251e45] text-gray-300 hover:bg-[#3d3066]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#818cf8]" />
                  <span>Maintenance</span>
                </div>
                <span className={`ml-2 text-xs ${
                  selectedStatus === 'maintenance'
                    ? 'opacity-80'
                    : theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  ({statusCounts.maintenance})
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {(selectedCategory !== 'all' || selectedStatus !== 'all') && (
          <div className={`mt-4 pt-4 border-t flex items-center gap-2 flex-wrap ${
            theme === 'light' ? 'border-gray-200' : 'border-[#3d3066]'
          }`}>
            <span className={`text-sm ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Active Filters:
            </span>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  theme === 'light'
                    ? 'bg-orange-100 text-[#ff6b35] hover:bg-orange-200'
                    : 'bg-purple-900/30 text-[#a78bfa] hover:bg-purple-900/40'
                }`}
              >
                {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} ×
              </button>
            )}
            {selectedStatus !== 'all' && (
              <button
                onClick={() => setSelectedStatus('all')}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  theme === 'light'
                    ? 'bg-orange-100 text-[#ff6b35] hover:bg-orange-200'
                    : 'bg-purple-900/30 text-[#a78bfa] hover:bg-purple-900/40'
                }`}
              >
                {selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)} ×
              </button>
            )}
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedStatus('all');
              }}
              className={`text-sm ${
                theme === 'light'
                  ? 'text-gray-600 hover:text-gray-900'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className={`mb-4 text-sm ${
        theme === 'light' ? 'text-gray-600' : 'text-gray-400'
      }`}>
        Showing {filteredNodes.length} of {infrastructureNodes.length} infrastructure nodes
      </div>

      {/* Full Map */}
      <div className="h-[600px]">
        <MapView theme={theme} nodes={filteredNodes} height="600px" />
      </div>
    </div>
  );
}
