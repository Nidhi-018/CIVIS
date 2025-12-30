import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  Lightbulb,
  Navigation,
  Droplet,
  Trash2,
  MapPin,
  TrendingUp,
  Activity
} from 'lucide-react';

interface CityStatusPageProps {
  theme: 'light' | 'dark';
}

interface CityAlert {
  id: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  area: string;
  timestamp: string;
  category: string;
}

interface AreaHealth {
  area: string;
  status: 'good' | 'fair' | 'attention';
  operational: number;
  total: number;
  categories: {
    streetlights: { operational: number; total: number };
    traffic: { operational: number; total: number };
    water: { operational: number; total: number };
    waste: { operational: number; total: number };
  };
}

export function CityStatusPage({ theme }: CityStatusPageProps) {
  // Public city-wide alerts - aggregated and citizen-friendly
  const cityAlerts: CityAlert[] = [
    {
      id: 'a1',
      title: 'Planned Water Service Interruption',
      description: 'Water service will be temporarily unavailable in the Downtown area tomorrow from 2:00 AM to 6:00 AM for system upgrades. Please plan accordingly.',
      severity: 'warning',
      area: 'Downtown',
      timestamp: '2 hours ago',
      category: 'Water Distribution'
    },
    {
      id: 'a2',
      title: 'Traffic Signal Update Complete',
      description: 'Traffic signal timing has been optimized at major intersections to improve traffic flow during peak hours.',
      severity: 'info',
      area: 'City-wide',
      timestamp: '5 hours ago',
      category: 'Traffic Signals'
    },
    {
      id: 'a3',
      title: 'Increased Waste Collection This Week',
      description: 'Due to the holiday season, waste collection frequency has been increased in residential areas. Check your neighborhood schedule.',
      severity: 'info',
      area: 'Residential Zones',
      timestamp: '1 day ago',
      category: 'Waste Management'
    },
  ];

  // Infrastructure health by area
  const areaHealth: AreaHealth[] = [
    {
      area: 'Downtown',
      status: 'good',
      operational: 245,
      total: 256,
      categories: {
        streetlights: { operational: 89, total: 92 },
        traffic: { operational: 24, total: 24 },
        water: { operational: 78, total: 80 },
        waste: { operational: 54, total: 60 }
      }
    },
    {
      area: 'North District',
      status: 'fair',
      operational: 178,
      total: 192,
      categories: {
        streetlights: { operational: 65, total: 70 },
        traffic: { operational: 18, total: 20 },
        water: { operational: 58, total: 62 },
        waste: { operational: 37, total: 40 }
      }
    },
    {
      area: 'East Side',
      status: 'good',
      operational: 312,
      total: 320,
      categories: {
        streetlights: { operational: 118, total: 120 },
        traffic: { operational: 28, total: 28 },
        water: { operational: 96, total: 98 },
        waste: { operational: 70, total: 74 }
      }
    },
    {
      area: 'West End',
      status: 'attention',
      operational: 156,
      total: 180,
      categories: {
        streetlights: { operational: 52, total: 65 },
        traffic: { operational: 15, total: 18 },
        water: { operational: 54, total: 58 },
        waste: { operational: 35, total: 39 }
      }
    },
  ];

  const getSeverityBadge = (severity: CityAlert['severity']) => {
    switch (severity) {
      case 'info':
        return {
          bg: theme === 'light' ? 'bg-blue-100' : 'bg-blue-900/30',
          text: theme === 'light' ? 'text-blue-700' : 'text-blue-400',
          border: theme === 'light' ? 'border-blue-200' : 'border-blue-800',
          label: 'Information'
        };
      case 'warning':
        return {
          bg: theme === 'light' ? 'bg-yellow-100' : 'bg-yellow-900/30',
          text: theme === 'light' ? 'text-yellow-700' : 'text-yellow-400',
          border: theme === 'light' ? 'border-yellow-200' : 'border-yellow-800',
          label: 'Notice'
        };
      case 'critical':
        return {
          bg: theme === 'light' ? 'bg-red-100' : 'bg-red-900/30',
          text: theme === 'light' ? 'text-red-700' : 'text-red-400',
          border: theme === 'light' ? 'border-red-200' : 'border-red-800',
          label: 'Important'
        };
    }
  };

  const getAreaStatusColor = (status: AreaHealth['status']) => {
    switch (status) {
      case 'good':
        return {
          bg: theme === 'light' ? 'bg-green-100' : 'bg-green-900/30',
          text: theme === 'light' ? 'text-green-700' : 'text-green-400',
          dot: 'bg-green-500',
          label: 'All Systems Normal'
        };
      case 'fair':
        return {
          bg: theme === 'light' ? 'bg-blue-100' : 'bg-blue-900/30',
          text: theme === 'light' ? 'text-blue-700' : 'text-blue-400',
          dot: 'bg-blue-500',
          label: 'Minor Maintenance'
        };
      case 'attention':
        return {
          bg: theme === 'light' ? 'bg-yellow-100' : 'bg-yellow-900/30',
          text: theme === 'light' ? 'text-yellow-700' : 'text-yellow-400',
          dot: 'bg-yellow-500',
          label: 'Some Services Affected'
        };
    }
  };

  const calculatePercentage = (operational: number, total: number) => {
    return Math.round((operational / total) * 100);
  };

  // Overall city statistics
  const totalOperational = areaHealth.reduce((sum, area) => sum + area.operational, 0);
  const totalInfrastructure = areaHealth.reduce((sum, area) => sum + area.total, 0);
  const overallHealth = calculatePercentage(totalOperational, totalInfrastructure);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className={`text-3xl mb-2 ${
          theme === 'light' ? 'text-gray-900' : 'text-white'
        }`}>
          City Status
        </h1>
        <p className={`${
          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
        }`}>
          Real-time overview of city infrastructure and important updates
        </p>
      </div>

      {/* Overall City Health */}
      <div className={`p-6 rounded-2xl border mb-8 ${
        theme === 'light'
          ? 'bg-gradient-to-br from-green-50 to-white border-green-200'
          : 'bg-gradient-to-br from-green-900/10 to-[#1a1433] border-green-800/30'
      }`}>
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
            theme === 'light' ? 'bg-green-100' : 'bg-green-900/30'
          }`}>
            <Activity className={`w-8 h-8 ${
              theme === 'light' ? 'text-green-600' : 'text-green-400'
            }`} />
          </div>
          <div className="flex-1">
            <h2 className={`text-2xl mb-1 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              {overallHealth}% Operational
            </h2>
            <p className={`${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              {totalOperational} of {totalInfrastructure} infrastructure systems working normally
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={`h-3 rounded-full overflow-hidden ${
          theme === 'light' ? 'bg-gray-200' : 'bg-gray-800'
        }`}>
          <div 
            className={`h-full transition-all ${
              theme === 'light' ? 'bg-green-500' : 'bg-green-400'
            }`}
            style={{ width: `${overallHealth}%` }}
          />
        </div>
      </div>

      {/* City Alerts */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className={`w-6 h-6 ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-300'
          }`} />
          <h2 className={`text-2xl ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            City Updates & Alerts
          </h2>
        </div>

        {cityAlerts.length > 0 ? (
          <div className="space-y-4">
            {cityAlerts.map((alert) => {
              const badge = getSeverityBadge(alert.severity);
              return (
                <div
                  key={alert.id}
                  className={`p-5 rounded-xl border transition-all ${
                    theme === 'light'
                      ? 'bg-white border-gray-200'
                      : 'bg-[#1a1433] border-[#3d3066]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-lg text-sm border ${badge.bg} ${badge.text} ${badge.border}`}>
                          {badge.label}
                        </span>
                        <span className={`text-sm ${
                          theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                          {alert.timestamp}
                        </span>
                      </div>
                      <h3 className={`text-lg mb-2 ${
                        theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {alert.title}
                      </h3>
                      <p className={`mb-3 ${
                        theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                      }`}>
                        {alert.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1.5">
                          <MapPin className={`w-4 h-4 ${
                            theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                          }`} />
                          <span className={`${
                            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {alert.area}
                          </span>
                        </div>
                        <div className={`px-2 py-0.5 rounded ${
                          theme === 'light' ? 'bg-gray-100 text-gray-700' : 'bg-gray-800 text-gray-300'
                        }`}>
                          {alert.category}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={`text-center py-12 rounded-xl border ${
            theme === 'light'
              ? 'bg-gray-50 border-gray-200'
              : 'bg-[#1a1433] border-[#3d3066]'
          }`}>
            <CheckCircle2 className={`w-12 h-12 mx-auto mb-3 ${
              theme === 'light' ? 'text-green-500' : 'text-green-400'
            }`} />
            <p className={`${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              No active alerts. All city systems operating normally.
            </p>
          </div>
        )}
      </div>

      {/* Infrastructure Health by Area */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <MapPin className={`w-6 h-6 ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-300'
          }`} />
          <h2 className={`text-2xl ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            Infrastructure Health by Area
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {areaHealth.map((area) => {
            const statusColor = getAreaStatusColor(area.status);
            const healthPercentage = calculatePercentage(area.operational, area.total);

            return (
              <div
                key={area.area}
                className={`p-6 rounded-xl border ${
                  theme === 'light'
                    ? 'bg-white border-gray-200'
                    : 'bg-[#1a1433] border-[#3d3066]'
                }`}
              >
                {/* Area Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-xl ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {area.area}
                  </h3>
                  <span className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${statusColor.bg} ${statusColor.text}`}>
                    <div className={`w-2 h-2 rounded-full ${statusColor.dot}`} />
                    {statusColor.label}
                  </span>
                </div>

                {/* Overall Area Health */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      Overall Health
                    </span>
                    <span className={`${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      {healthPercentage}%
                    </span>
                  </div>
                  <div className={`h-2 rounded-full overflow-hidden ${
                    theme === 'light' ? 'bg-gray-200' : 'bg-gray-800'
                  }`}>
                    <div 
                      className={`h-full transition-all ${
                        healthPercentage >= 90
                          ? 'bg-green-500'
                          : healthPercentage >= 75
                          ? 'bg-blue-500'
                          : 'bg-yellow-500'
                      }`}
                      style={{ width: `${healthPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Category Breakdown */}
                <div className="space-y-3">
                  {/* Streetlights */}
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      theme === 'light' ? 'bg-yellow-100' : 'bg-yellow-900/30'
                    }`}>
                      <Lightbulb className={`w-4 h-4 ${
                        theme === 'light' ? 'text-yellow-600' : 'text-yellow-400'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm ${
                          theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                        }`}>
                          Street Lights
                        </span>
                        <span className={`text-sm ${
                          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {area.categories.streetlights.operational}/{area.categories.streetlights.total}
                        </span>
                      </div>
                      <div className={`h-1.5 rounded-full overflow-hidden ${
                        theme === 'light' ? 'bg-gray-200' : 'bg-gray-800'
                      }`}>
                        <div 
                          className="h-full bg-yellow-500"
                          style={{ 
                            width: `${calculatePercentage(
                              area.categories.streetlights.operational, 
                              area.categories.streetlights.total
                            )}%` 
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Traffic */}
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      theme === 'light' ? 'bg-blue-100' : 'bg-blue-900/30'
                    }`}>
                      <Navigation className={`w-4 h-4 ${
                        theme === 'light' ? 'text-blue-600' : 'text-blue-400'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm ${
                          theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                        }`}>
                          Traffic Signals
                        </span>
                        <span className={`text-sm ${
                          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {area.categories.traffic.operational}/{area.categories.traffic.total}
                        </span>
                      </div>
                      <div className={`h-1.5 rounded-full overflow-hidden ${
                        theme === 'light' ? 'bg-gray-200' : 'bg-gray-800'
                      }`}>
                        <div 
                          className="h-full bg-blue-500"
                          style={{ 
                            width: `${calculatePercentage(
                              area.categories.traffic.operational, 
                              area.categories.traffic.total
                            )}%` 
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Water */}
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      theme === 'light' ? 'bg-cyan-100' : 'bg-cyan-900/30'
                    }`}>
                      <Droplet className={`w-4 h-4 ${
                        theme === 'light' ? 'text-cyan-600' : 'text-cyan-400'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm ${
                          theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                        }`}>
                          Water Distribution
                        </span>
                        <span className={`text-sm ${
                          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {area.categories.water.operational}/{area.categories.water.total}
                        </span>
                      </div>
                      <div className={`h-1.5 rounded-full overflow-hidden ${
                        theme === 'light' ? 'bg-gray-200' : 'bg-gray-800'
                      }`}>
                        <div 
                          className="h-full bg-cyan-500"
                          style={{ 
                            width: `${calculatePercentage(
                              area.categories.water.operational, 
                              area.categories.water.total
                            )}%` 
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Waste */}
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      theme === 'light' ? 'bg-green-100' : 'bg-green-900/30'
                    }`}>
                      <Trash2 className={`w-4 h-4 ${
                        theme === 'light' ? 'text-green-600' : 'text-green-400'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm ${
                          theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                        }`}>
                          Waste Management
                        </span>
                        <span className={`text-sm ${
                          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {area.categories.waste.operational}/{area.categories.waste.total}
                        </span>
                      </div>
                      <div className={`h-1.5 rounded-full overflow-hidden ${
                        theme === 'light' ? 'bg-gray-200' : 'bg-gray-800'
                      }`}>
                        <div 
                          className="h-full bg-green-500"
                          style={{ 
                            width: `${calculatePercentage(
                              area.categories.waste.operational, 
                              area.categories.waste.total
                            )}%` 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Footer */}
      <div className={`mt-8 p-4 rounded-xl border ${
        theme === 'light'
          ? 'bg-blue-50 border-blue-200'
          : 'bg-blue-900/10 border-blue-800/30'
      }`}>
        <p className={`text-sm ${
          theme === 'light' ? 'text-blue-700' : 'text-blue-300'
        }`}>
          💡 This page shows public city-wide information. For detailed technical data and internal alerts, please refer to the Officials dashboard.
        </p>
      </div>
    </div>
  );
}
