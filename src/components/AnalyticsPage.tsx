import { ChartPanel } from './ChartPanel';

interface AnalyticsPageProps {
  theme: 'light' | 'dark';
}

export function AnalyticsPage({ theme }: AnalyticsPageProps) {
  // Chart data
  const energyData = [
    { name: 'Mon', value: 245, target: 250 },
    { name: 'Tue', value: 238, target: 250 },
    { name: 'Wed', value: 252, target: 250 },
    { name: 'Thu', value: 241, target: 250 },
    { name: 'Fri', value: 259, target: 250 },
    { name: 'Sat', value: 233, target: 250 },
    { name: 'Sun', value: 229, target: 250 }
  ];

  const waterData = [
    { name: 'Mon', consumption: 1820, pressure: 45 },
    { name: 'Tue', consumption: 1780, pressure: 46 },
    { name: 'Wed', consumption: 1850, pressure: 44 },
    { name: 'Thu', consumption: 1900, pressure: 45 },
    { name: 'Fri', consumption: 1950, pressure: 43 },
    { name: 'Sat', consumption: 1720, pressure: 47 },
    { name: 'Sun', consumption: 1680, pressure: 48 }
  ];

  return (
    <div className="p-6">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className={`text-4xl tracking-tight ${
          theme === 'light' ? 'text-gray-900' : 'text-white'
        }`}>
          Analytics
        </h1>
        <p className={`mt-2 ${
          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
        }`}>
          Detailed infrastructure performance analytics and trends
        </p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartPanel
          theme={theme}
          title="Energy Consumption Trends"
          data={energyData}
          type="line"
          dataKeys={[
            { key: 'value', color: theme === 'light' ? '#ff6b35' : '#a78bfa', name: 'Actual' },
            { key: 'target', color: '#10b981', name: 'Target' }
          ]}
        />
        <ChartPanel
          theme={theme}
          title="Water Distribution Analytics"
          data={waterData}
          type="bar"
          dataKeys={[
            { key: 'consumption', color: '#0ea5e9', name: 'Consumption (L)' },
            { key: 'pressure', color: '#10b981', name: 'Pressure (PSI)' }
          ]}
        />
      </div>
    </div>
  );
}
