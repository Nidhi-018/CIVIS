import { AlertTriangle, AlertCircle, Info, CheckCircle, X } from 'lucide-react';
import { useState } from 'react';

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  location: string;
  timestamp: string;
  category: string;
}

interface AlertsPanelProps {
  theme: 'light' | 'dark';
  alerts: Alert[];
}

export function AlertsPanel({ theme, alerts }: AlertsPanelProps) {
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set());

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return AlertTriangle;
      case 'warning': return AlertCircle;
      case 'info': return Info;
      default: return Info;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return '#ef4444';
      case 'warning': return '#fbbf24';
      case 'info': return '#0ea5e9';
      default: return '#6b7280';
    }
  };

  const handleDismiss = (id: string) => {
    setDismissedAlerts(prev => new Set([...prev, id]));
  };

  const visibleAlerts = alerts.filter(alert => !dismissedAlerts.has(alert.id));

  return (
    <div className={`h-full rounded-xl border overflow-hidden flex flex-col ${
      theme === 'light' 
        ? 'bg-white border-gray-200' 
        : 'bg-[#251e45] border-[#3d3066]'
    }`}>
      {/* Header */}
      <div className={`px-5 py-4 border-b ${
        theme === 'light' ? 'border-gray-200' : 'border-[#3d3066]'
      }`}>
        <div className="flex items-center justify-between">
          <h3 className={`${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Real-time Alerts
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs ${
            theme === 'light' 
              ? 'bg-red-100 text-red-700' 
              : 'bg-red-900/30 text-red-400'
          }`}>
            {visibleAlerts.length} Active
          </span>
        </div>
      </div>

      {/* Alerts List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {visibleAlerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-8">
            <CheckCircle className={`w-12 h-12 mb-3 ${
              theme === 'light' ? 'text-gray-300' : 'text-gray-600'
            }`} />
            <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>
              No active alerts
            </p>
          </div>
        ) : (
          visibleAlerts.map((alert) => {
            const Icon = getAlertIcon(alert.type);
            const color = getAlertColor(alert.type);
            
            return (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border-l-4 transition-all hover:shadow-md ${
                  theme === 'light'
                    ? 'bg-gray-50 hover:bg-gray-100'
                    : 'bg-[#1a1433] hover:bg-[#1f1838]'
                }`}
                style={{ borderLeftColor: color }}
              >
                <div className="flex gap-3">
                  <div
                    className="p-2 rounded-lg h-fit"
                    style={{ backgroundColor: `${color}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className={`${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                        {alert.title}
                      </h4>
                      <button
                        onClick={() => handleDismiss(alert.id)}
                        className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-[#251e45] transition-colors ${
                          theme === 'light' ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <p className={`text-sm mb-2 ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {alert.message}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <span className={`flex items-center gap-1 ${
                        theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                          <path d="M6 1a5 5 0 100 10A5 5 0 006 1zm.5 3.5v3l2 1.2-.5.8-2.5-1.5V4.5h1z"/>
                        </svg>
                        {alert.timestamp}
                      </span>
                      <span className={`flex items-center gap-1 ${
                        theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                          <path d="M6 1a4 4 0 00-4 4c0 2.5 4 6 4 6s4-3.5 4-6a4 4 0 00-4-4zm0 5.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
                        </svg>
                        {alert.location}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full ${
                        theme === 'light' 
                          ? 'bg-gray-200 text-gray-700' 
                          : 'bg-[#251e45] text-gray-400'
                      }`}>
                        {alert.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
