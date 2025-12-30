import { useState } from 'react';
import { MapView } from './MapView';
import { MetricCard } from './MetricCard';
import { HeroSection } from './HeroSection';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Clock,
  Upload,
  MapPin,
  Camera,
  Send,
  Filter
} from 'lucide-react';

interface CitizenDashboardProps {
  theme: 'light' | 'dark';
  onNavigate?: (page: string) => void;
}

interface Complaint {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  status: 'pending' | 'in-progress' | 'resolved';
  timestamp: string;
  image?: string;
}

export function CitizenDashboard({ theme, onNavigate }: CitizenDashboardProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Simplified infrastructure nodes - only showing public health status
  const publicNodes = [
    { id: '1', type: 'streetlights' as const, status: 'operational' as const, lat: 25, lng: 30, name: 'Streetlight - Main St', details: 'Working' },
    { id: '2', type: 'streetlights' as const, status: 'warning' as const, lat: 35, lng: 45, name: 'Streetlight - Oak Ave', details: 'Reported issue' },
    { id: '3', type: 'streetlights' as const, status: 'critical' as const, lat: 45, lng: 25, name: 'Streetlight - Park Rd', details: 'Not working' },
    { id: '4', type: 'traffic' as const, status: 'operational' as const, lat: 55, lng: 60, name: 'Traffic Signal', details: 'Working' },
    { id: '6', type: 'water' as const, status: 'operational' as const, lat: 40, lng: 70, name: 'Water System', details: 'Normal' },
    { id: '7', type: 'water' as const, status: 'warning' as const, lat: 30, lng: 55, name: 'Water System', details: 'Under maintenance' },
    { id: '8', type: 'waste' as const, status: 'operational' as const, lat: 70, lng: 50, name: 'Waste Bin', details: 'Available' },
    { id: '9', type: 'waste' as const, status: 'critical' as const, lat: 20, lng: 65, name: 'Waste Bin', details: 'Full' },
  ];

  // User's complaints
  const myComplaints: Complaint[] = [
    {
      id: 'c1',
      title: 'Broken streetlight on Main Street',
      description: 'The streetlight near house #45 has been flickering.',
      location: 'Main Street, #45',
      category: 'Streetlights',
      status: 'in-progress',
      timestamp: '2 days ago',
    },
    {
      id: 'c2',
      title: 'Pothole on Park Avenue',
      description: 'Large pothole causing traffic issues.',
      location: 'Park Avenue',
      category: 'Roads',
      status: 'pending',
      timestamp: '5 days ago',
    },
    {
      id: 'c3',
      title: 'Overflowing waste bin',
      description: 'Waste bin at bus stop needs emptying.',
      location: 'Bus Stop, Downtown',
      category: 'Waste',
      status: 'resolved',
      timestamp: '1 week ago',
    },
  ];

  // Area issues
  const areaIssues = [
    {
      id: 'i1',
      title: 'Streetlight maintenance in progress',
      location: 'Oak Avenue',
      category: 'Streetlights',
      status: 'in-progress' as const,
      timestamp: '1 hour ago'
    },
    {
      id: 'i2',
      title: 'Water quality check scheduled',
      location: 'Zone 3',
      category: 'Water',
      status: 'pending' as const,
      timestamp: '3 hours ago'
    },
    {
      id: 'i3',
      title: 'Traffic signal timing updated',
      location: 'Downtown',
      category: 'Traffic',
      status: 'resolved' as const,
      timestamp: '1 day ago'
    },
  ];

  const filteredComplaints = selectedCategory === 'all' 
    ? myComplaints 
    : myComplaints.filter(c => c.category.toLowerCase() === selectedCategory);

  return (
    <>
      {/* Hero Section */}
      <HeroSection theme={theme} />
      
      <div className="p-6 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className={`text-3xl mb-2 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            Welcome, Citizen 👋
          </h1>
          <p className={`${
            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            Stay informed about your city's infrastructure and report issues
          </p>
        </div>

        {/* City-wide Health Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <MetricCard
            theme={theme}
            title="Operational Systems"
            value="892"
            change="+2.3%"
            trend="up"
            icon={CheckCircle2}
            iconColor="#10b981"
            subtitle="Working normally"
          />
          <MetricCard
            theme={theme}
            title="Under Maintenance"
            value="23"
            change="-5.1%"
            trend="down"
            icon={Clock}
            iconColor="#f59e0b"
            subtitle="Being fixed"
          />
          <MetricCard
            theme={theme}
            title="Reported Issues"
            value="12"
            change="+8.2%"
            trend="up"
            icon={AlertTriangle}
            iconColor="#ef4444"
            subtitle="In your area"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Report Issue Card */}
          <div className={`p-6 rounded-2xl border ${
            theme === 'light'
              ? 'bg-gradient-to-br from-orange-50 to-white border-orange-200'
              : 'bg-gradient-to-br from-purple-900/20 to-[#1a1433] border-[#3d3066]'
          }`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
              theme === 'light' 
                ? 'bg-gradient-to-br from-[#ff6b35] to-[#f7931e]' 
                : 'bg-gradient-to-br from-[#a78bfa] to-[#818cf8]'
            }`}>
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <h3 className={`text-xl mb-2 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              Report an Issue
            </h3>
            <p className={`text-sm mb-4 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Let us know about infrastructure problems in your area
            </p>
            <button
              onClick={() => onNavigate?.('report')}
              className={`w-full py-2 rounded-lg transition-all ${
                theme === 'light'
                  ? 'bg-[#ff6b35] text-white hover:bg-[#ff5522]'
                  : 'bg-[#a78bfa] text-white hover:bg-[#9370f0]'
              }`}
            >
              Report Now
            </button>
          </div>

          {/* Map Preview */}
          <div 
            className="lg:col-span-2 cursor-pointer group relative"
            onClick={() => onNavigate?.('map')}
          >
            <MapView theme={theme} nodes={publicNodes} height="300px" />
            {/* Overlay hint */}
            <div className={`absolute inset-0 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${
              theme === 'light'
                ? 'bg-black/10'
                : 'bg-white/10'
            }`}>
              <div className={`px-6 py-3 rounded-lg ${
                theme === 'light'
                  ? 'bg-white shadow-lg'
                  : 'bg-[#1a1433] shadow-lg border border-[#3d3066]'
              }`}>
                <span className={`${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  Click to view full map
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Issues in Your Area */}
        <div className={`p-6 rounded-2xl border mb-8 ${
          theme === 'light'
            ? 'bg-white border-gray-200'
            : 'bg-[#1a1433] border-[#3d3066]'
        }`}>
          <h3 className={`text-xl mb-4 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            Current Issues in Your Area
          </h3>
          
          <div className="space-y-3">
            {areaIssues.map(issue => (
              <div
                key={issue.id}
                className={`p-4 rounded-xl border ${
                  theme === 'light'
                    ? 'bg-gray-50 border-gray-200'
                    : 'bg-[#251e45] border-[#3d3066]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-1 rounded text-xs ${
                        issue.status === 'resolved'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : issue.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {issue.status === 'resolved' ? 'Resolved' : issue.status === 'in-progress' ? 'In Progress' : 'Pending'}
                      </span>
                      <span className={`text-xs ${
                        theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        {issue.category}
                      </span>
                    </div>
                    <h4 className={`mb-1 ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      {issue.title}
                    </h4>
                    <div className={`text-sm flex items-center gap-4 ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {issue.location}
                      </span>
                      <span>{issue.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Complaints */}
        <div className={`p-6 rounded-2xl border ${
          theme === 'light'
            ? 'bg-white border-gray-200'
            : 'bg-[#1a1433] border-[#3d3066]'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-xl ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              My Complaints
            </h3>
            
            <div className="flex items-center gap-2">
              <Filter className={`w-4 h-4 ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`px-3 py-1 rounded-lg border text-sm ${
                  theme === 'light'
                    ? 'bg-white border-gray-300 text-gray-900'
                    : 'bg-[#251e45] border-[#3d3066] text-white'
                }`}
              >
                <option value="all">All Categories</option>
                <option value="streetlights">Streetlights</option>
                <option value="roads">Roads</option>
                <option value="waste">Waste</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {filteredComplaints.map(complaint => (
              <div
                key={complaint.id}
                className={`p-4 rounded-xl border ${
                  theme === 'light'
                    ? 'bg-gray-50 border-gray-200'
                    : 'bg-[#251e45] border-[#3d3066]'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        complaint.status === 'resolved'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : complaint.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {complaint.status === 'resolved' ? 'Resolved' : complaint.status === 'in-progress' ? 'In Progress' : 'Pending'}
                      </span>
                      <span className={`text-xs ${
                        theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        {complaint.category}
                      </span>
                    </div>
                    <h4 className={`mb-1 ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      {complaint.title}
                    </h4>
                    <p className={`text-sm mb-2 ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {complaint.description}
                    </p>
                    <div className={`text-sm flex items-center gap-4 ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {complaint.location}
                      </span>
                      <span>{complaint.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}