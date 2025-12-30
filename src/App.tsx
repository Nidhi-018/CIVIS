import { useState, useEffect } from 'react';
import { LoginPage } from './components/LoginPage';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { HeroSection } from './components/HeroSection';
import { MapView } from './components/MapView';
import { MetricCard } from './components/MetricCard';
import { AlertsPanel } from './components/AlertsPanel';
import { ComplaintsSection } from './components/ComplaintsSection';
import { MaintenanceSection } from './components/MaintenanceSection';
import { AnalyticsPage } from './components/AnalyticsPage';
import { CitizenDashboard } from './components/CitizenDashboard';
import { CitizenComplaintForm } from './components/CitizenComplaintForm';
import { CitizenMapPage } from './components/CitizenMapPage';
import { CitizenSidebar } from './components/CitizenSidebar';
import { MyComplaintsPage } from './components/MyComplaintsPage';
import { CityStatusPage } from './components/CityStatusPage';
import { OfficialComplaintsPage } from './components/OfficialComplaintsPage';
import { OfficialNotificationPanel } from './components/OfficialNotificationPanel';
import { ComplaintDetailModal } from './components/ComplaintDetailModal';
import { AlertTriangle, Wrench, Zap, TrendingUp } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'official' | 'citizen' | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('overview');
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);

  // Apply theme to body
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleLogin = (role: 'official' | 'citizen') => {
    setUserRole(role);
    setIsAuthenticated(true);
    setCurrentPage(role === 'official' ? 'overview' : 'home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setCurrentPage('overview');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  // Mock notifications for officials
  const mockNotifications = [
    {
      id: 'n1',
      category: 'streetlights' as const,
      title: 'Broken streetlight on Main Street',
      location: 'Main Street, #45',
      urgency: 'high' as const,
      trustScore: 92,
      timestamp: '2 hours ago',
      unread: true
    },
    {
      id: 'n2',
      category: 'water' as const,
      title: 'Water leakage near park',
      location: 'Park Rd & 3rd Ave',
      urgency: 'high' as const,
      trustScore: 87,
      timestamp: '4 hours ago',
      unread: true
    },
    {
      id: 'n3',
      category: 'waste' as const,
      title: 'Overflowing waste bin',
      location: 'Bus Stop, Downtown',
      urgency: 'medium' as const,
      trustScore: 78,
      timestamp: '1 day ago',
      unread: false
    },
  ];

  const handleNotificationClick = (notification: any) => {
    // Convert notification to complaint detail format
    setSelectedComplaint({
      id: notification.id,
      category: notification.category,
      title: notification.title,
      description: 'Detailed description of the issue will appear here...',
      location: notification.location,
      urgency: notification.urgency,
      trustScore: notification.trustScore,
      timestamp: notification.timestamp,
      status: 'submitted' as const,
      reportedBy: 'John Doe',
    });
    setNotificationPanelOpen(false);
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage theme={theme} onLogin={handleLogin} />;
  }

  // Show Citizen Dashboard if logged in as citizen
  if (userRole === 'citizen') {
    return (
      <div className="min-h-screen">
        <Header 
          theme={theme} 
          onThemeToggle={toggleTheme}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          currentPage={currentPage}
          onNavigate={handleNavigate}
          userRole={userRole}
          onLogout={handleLogout}
        />
        
        {/* Citizen Sidebar */}
        <CitizenSidebar
          theme={theme}
          isOpen={sidebarOpen}
          currentPage={currentPage}
          onClose={() => setSidebarOpen(false)}
          onNavigate={handleNavigate}
        />
        
        {/* Citizen Pages */}
        {currentPage === 'home' && (
          <CitizenDashboard theme={theme} onNavigate={handleNavigate} />
        )}
        
        {currentPage === 'map' && (
          <CitizenMapPage theme={theme} />
        )}
        
        {currentPage === 'report' && (
          <div className="p-6 max-w-7xl mx-auto">
            <CitizenComplaintForm 
              theme={theme} 
              trustScore={85}
              onCancel={() => handleNavigate('home')}
            />
          </div>
        )}
        
        {currentPage === 'my-complaints' && (
          <MyComplaintsPage theme={theme} />
        )}
        
        {currentPage === 'city-status' && (
          <CityStatusPage theme={theme} />
        )}
      </div>
    );
  }

  // City Official Dashboard (existing dashboard)
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

  // Mock alerts data
  const alerts = [
    {
      id: 'a1',
      type: 'critical' as const,
      title: 'Water Pressure Drop',
      message: 'Significant pressure drop detected in Zone 3. Immediate attention required.',
      location: 'Zone 3, Sector B',
      timestamp: '5 min ago',
      category: 'Water'
    },
    {
      id: 'a2',
      type: 'warning' as const,
      title: 'Streetlight Malfunction',
      message: 'Multiple streetlights showing reduced brightness on Oak Avenue.',
      location: 'Oak Avenue',
      timestamp: '12 min ago',
      category: 'Streetlights'
    },
    {
      id: 'a3',
      type: 'critical' as const,
      title: 'Waste Container Full',
      message: 'Waste container at Market Square is at 95% capacity.',
      location: 'Market Square',
      timestamp: '25 min ago',
      category: 'Waste'
    },
    {
      id: 'a4',
      type: 'warning' as const,
      title: 'Traffic Signal Sync Issue',
      message: 'Traffic signal timing not synchronized properly at West End intersection.',
      location: 'West End',
      timestamp: '1 hour ago',
      category: 'Traffic'
    },
    {
      id: 'a5',
      type: 'info' as const,
      title: 'Scheduled Maintenance',
      message: 'Routine maintenance scheduled for 5th Avenue traffic signals tomorrow.',
      location: '5th Avenue',
      timestamp: '2 hours ago',
      category: 'Traffic'
    }
  ];

  // Mock complaints data
  const complaints = [
    {
      id: 'c1',
      title: 'Broken streetlight on Main Street',
      description: 'The streetlight near house #45 has been flickering and went out completely last night.',
      location: 'Main Street, #45',
      category: 'Streetlights',
      status: 'in-progress' as const,
      priority: 'high' as const,
      timestamp: '2 hours ago',
      reportedBy: 'John Doe'
    },
    {
      id: 'c2',
      title: 'Water leakage near park',
      description: 'There is a visible water leak at the corner of Park Road and 3rd Avenue.',
      location: 'Park Rd & 3rd Ave',
      category: 'Water',
      status: 'pending' as const,
      priority: 'high' as const,
      timestamp: '4 hours ago',
      reportedBy: 'Sarah Smith'
    },
    {
      id: 'c3',
      title: 'Overflowing waste bin',
      description: 'The public waste bin at the bus stop is overflowing and causing hygiene issues.',
      location: 'Bus Stop, Downtown',
      category: 'Waste',
      status: 'resolved' as const,
      priority: 'medium' as const,
      timestamp: '1 day ago',
      reportedBy: 'Mike Johnson'
    },
    {
      id: 'c4',
      title: 'Traffic light stuck on red',
      description: 'The traffic signal at Oak Avenue has been stuck on red for 10+ minutes.',
      location: 'Oak Avenue',
      category: 'Traffic',
      status: 'in-progress' as const,
      priority: 'high' as const,
      timestamp: '3 hours ago',
      reportedBy: 'Emily Brown'
    },
    {
      id: 'c5',
      title: 'Dim street lighting',
      description: 'Multiple streetlights on River Street appear significantly dimmer than usual.',
      location: 'River Street',
      category: 'Streetlights',
      status: 'pending' as const,
      priority: 'low' as const,
      timestamp: '5 hours ago',
      reportedBy: 'David Lee'
    }
  ];

  // Mock maintenance tasks
  const maintenanceTasks = [
    {
      id: 'm1',
      title: 'Replace traffic signal controller',
      description: 'Upgrade aging controller unit at 5th Avenue intersection',
      assignedTo: 'Tech Team A',
      scheduledDate: 'Dec 30, 2024',
      estimatedTime: '3 hours',
      status: 'scheduled' as const,
      priority: 'medium' as const,
      location: '5th Avenue',
      category: 'Traffic'
    },
    {
      id: 'm2',
      title: 'Water pipe inspection',
      description: 'Routine inspection of water distribution pipes in Zone 3',
      assignedTo: 'Water Dept',
      scheduledDate: 'Dec 29, 2024',
      estimatedTime: '5 hours',
      status: 'in-progress' as const,
      priority: 'high' as const,
      location: 'Zone 3',
      category: 'Water'
    },
    {
      id: 'm3',
      title: 'Streetlight bulb replacement',
      description: 'Replace LED bulbs on Oak Avenue (12 units)',
      assignedTo: 'Maintenance Crew B',
      scheduledDate: 'Dec 31, 2024',
      estimatedTime: '2 hours',
      status: 'scheduled' as const,
      priority: 'low' as const,
      location: 'Oak Avenue',
      category: 'Streetlights'
    },
    {
      id: 'm4',
      title: 'Waste collection route optimization',
      description: 'Review and optimize collection routes for improved efficiency',
      assignedTo: 'Logistics Team',
      scheduledDate: 'Jan 2, 2025',
      estimatedTime: '4 hours',
      status: 'scheduled' as const,
      priority: 'low' as const,
      location: 'City-wide',
      category: 'Waste'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header 
        theme={theme} 
        onThemeToggle={toggleTheme}
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        userRole={userRole}
        onLogout={handleLogout}
        onNotificationClick={() => setNotificationPanelOpen(!notificationPanelOpen)}
        notificationCount={mockNotifications.filter(n => n.unread).length}
      />
      
      {/* Hero Section */}
      <HeroSection theme={theme} />
      
      <div className="flex">
        <Sidebar 
          theme={theme}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className="flex-1 p-6 overflow-auto">
          {currentPage === 'overview' && (
            <>
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <MetricCard
                  theme={theme}
                  title="Total Anomalies"
                  value="23"
                  change="+12%"
                  trend="up"
                  icon={AlertTriangle}
                  iconColor="#ef4444"
                  subtitle="Last 24 hours"
                />
                <MetricCard
                  theme={theme}
                  title="Active Maintenance"
                  value="8"
                  change="-3%"
                  trend="down"
                  icon={Wrench}
                  iconColor="#0ea5e9"
                  subtitle="Tasks in progress"
                />
                <MetricCard
                  theme={theme}
                  title="Energy Consumption"
                  value="1,847 kWh"
                  change="+5.2%"
                  trend="up"
                  icon={Zap}
                  iconColor="#fbbf24"
                  subtitle="Daily average"
                />
                <MetricCard
                  theme={theme}
                  title="System Efficiency"
                  value="94.2%"
                  change="+2.1%"
                  trend="up"
                  icon={TrendingUp}
                  iconColor="#10b981"
                  subtitle="Overall performance"
                />
              </div>

              {/* Map and Alerts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                  <MapView theme={theme} nodes={filteredNodes} />
                </div>
                <div>
                  <AlertsPanel theme={theme} alerts={alerts} />
                </div>
              </div>

              {/* Complaints Section */}
              <div className="mb-6">
                <ComplaintsSection theme={theme} complaints={complaints} />
              </div>

              {/* Maintenance Section */}
              <div className="mb-6">
                <MaintenanceSection theme={theme} tasks={maintenanceTasks} />
              </div>
            </>
          )}

          {currentPage === 'analytics' && (
            <AnalyticsPage theme={theme} />
          )}

          {currentPage === 'map' && (
            <div className="p-6">
              <h1 className={`text-3xl mb-6 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Infrastructure Map
              </h1>
              <MapView theme={theme} nodes={filteredNodes} />
            </div>
          )}

          {currentPage === 'alerts' && (
            <div className="p-6">
              <h1 className={`text-3xl mb-6 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Alerts & Notifications
              </h1>
              <AlertsPanel theme={theme} alerts={alerts} />
            </div>
          )}

          {currentPage === 'complaints' && (
            <OfficialComplaintsPage theme={theme} />
          )}

          {currentPage === 'maintenance' && (
            <div className="p-6">
              <h1 className={`text-3xl mb-6 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Maintenance Scheduling
              </h1>
              <MaintenanceSection theme={theme} tasks={maintenanceTasks} />
            </div>
          )}

          {currentPage === 'reports' && (
            <div className="p-6">
              <h1 className={`text-4xl tracking-tight ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Reports
              </h1>
              <p className={`mt-2 ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                Reports page coming soon
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Official Notification Panel */}
      {userRole === 'official' && (
        <OfficialNotificationPanel
          theme={theme}
          isOpen={notificationPanelOpen}
          onClose={() => setNotificationPanelOpen(false)}
          notifications={mockNotifications}
          onNotificationClick={handleNotificationClick}
        />
      )}

      {/* Complaint Detail Modal */}
      {selectedComplaint && (
        <ComplaintDetailModal
          theme={theme}
          complaint={selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
        />
      )}
    </div>
  );
}