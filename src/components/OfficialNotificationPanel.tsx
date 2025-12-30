import { useState } from 'react';
import { 
  Bell, 
  X, 
  Lightbulb, 
  Navigation, 
  Droplet, 
  Trash2,
  MapPin,
  Clock,
  AlertTriangle,
  Filter
} from 'lucide-react';
import { TrustIndexBadge } from './TrustIndexBadge';

interface Notification {
  id: string;
  category: 'streetlights' | 'traffic' | 'water' | 'waste';
  title: string;
  location: string;
  urgency: 'low' | 'medium' | 'high';
  trustScore: number;
  timestamp: string;
  unread: boolean;
}

interface OfficialNotificationPanelProps {
  theme: 'light' | 'dark';
  notifications: Notification[];
  onNotificationClick: (notification: Notification) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function OfficialNotificationPanel({ 
  theme, 
  notifications, 
  onNotificationClick,
  isOpen,
  onClose 
}: OfficialNotificationPanelProps) {
  const [filter, setFilter] = useState<'all' | 'high' | 'unread'>('all');

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'streetlights': return Lightbulb;
      case 'traffic': return Navigation;
      case 'water': return Droplet;
      case 'waste': return Trash2;
      default: return Bell;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'streetlights': return '#fbbf24';
      case 'traffic': return '#ef4444';
      case 'water': return '#0ea5e9';
      case 'waste': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getUrgencyStyles = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return {
          bg: 'bg-red-100 dark:bg-red-900/30',
          text: 'text-red-700 dark:text-red-400',
          border: 'border-red-200 dark:border-red-800'
        };
      case 'medium':
        return {
          bg: 'bg-yellow-100 dark:bg-yellow-900/30',
          text: 'text-yellow-700 dark:text-yellow-400',
          border: 'border-yellow-200 dark:border-yellow-800'
        };
      default:
        return {
          bg: 'bg-green-100 dark:bg-green-900/30',
          text: 'text-green-700 dark:text-green-400',
          border: 'border-green-200 dark:border-green-800'
        };
    }
  };

  const filteredNotifications = notifications
    .filter(n => {
      if (filter === 'high') return n.urgency === 'high';
      if (filter === 'unread') return n.unread;
      return true;
    })
    .sort((a, b) => {
      // Sort by urgency and trust score
      const urgencyWeight = { high: 3, medium: 2, low: 1 };
      const aScore = urgencyWeight[a.urgency] * 100 + a.trustScore;
      const bScore = urgencyWeight[b.urgency] * 100 + b.trustScore;
      return bScore - aScore;
    });

  const unreadCount = notifications.filter(n => n.unread).length;

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
      {/* Backdrop for mobile */}
      <div 
        className="fixed inset-0 bg-black/50 lg:hidden"
        onClick={onClose}
      />

      {/* Panel */}
      <div className={`fixed right-0 top-0 bottom-0 w-full max-w-md lg:absolute lg:top-full lg:right-0 lg:mt-2 lg:bottom-auto lg:max-h-[600px] overflow-hidden rounded-none lg:rounded-xl shadow-2xl border-l lg:border ${
        theme === 'light'
          ? 'bg-white border-gray-200'
          : 'bg-[#1a1433] border-[#3d3066]'
      }`}>
        {/* Header */}
        <div className={`p-4 border-b ${
          theme === 'light' ? 'border-gray-200' : 'border-[#3d3066]'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Bell className={`w-5 h-5 ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`} />
              <h3 className={`${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Notifications
              </h3>
              {unreadCount > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  theme === 'light'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-red-900/30 text-red-400'
                }`}>
                  {unreadCount}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className={`p-1 rounded-lg transition-colors ${
                theme === 'light'
                  ? 'hover:bg-gray-100 text-gray-600'
                  : 'hover:bg-[#251e45] text-gray-400'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                filter === 'all'
                  ? theme === 'light'
                    ? 'bg-[#ff6b35] text-white'
                    : 'bg-[#a78bfa] text-white'
                  : theme === 'light'
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-[#251e45] text-gray-300 hover:bg-[#3d3066]'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('high')}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                filter === 'high'
                  ? theme === 'light'
                    ? 'bg-[#ff6b35] text-white'
                    : 'bg-[#a78bfa] text-white'
                  : theme === 'light'
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-[#251e45] text-gray-300 hover:bg-[#3d3066]'
              }`}
            >
              High Priority
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                filter === 'unread'
                  ? theme === 'light'
                    ? 'bg-[#ff6b35] text-white'
                    : 'bg-[#a78bfa] text-white'
                  : theme === 'light'
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-[#251e45] text-gray-300 hover:bg-[#3d3066]'
              }`}
            >
              Unread
            </button>
          </div>
        </div>

        {/* Notification List */}
        <div className="overflow-y-auto max-h-[calc(100vh-120px)] lg:max-h-[500px]">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className={`w-12 h-12 mx-auto mb-3 ${
                theme === 'light' ? 'text-gray-300' : 'text-gray-600'
              }`} />
              <p className={`${
                theme === 'light' ? 'text-gray-500' : 'text-gray-500'
              }`}>
                No notifications
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-[#3d3066]">
              {filteredNotifications.map((notification) => {
                const Icon = getCategoryIcon(notification.category);
                const urgencyStyles = getUrgencyStyles(notification.urgency);
                
                return (
                  <button
                    key={notification.id}
                    onClick={() => onNotificationClick(notification)}
                    className={`w-full p-4 text-left transition-colors relative ${
                      notification.unread
                        ? theme === 'light'
                          ? 'bg-orange-50 hover:bg-orange-100'
                          : 'bg-purple-900/10 hover:bg-purple-900/20'
                        : theme === 'light'
                          ? 'hover:bg-gray-50'
                          : 'hover:bg-[#251e45]'
                    }`}
                  >
                    {/* Unread Indicator */}
                    {notification.unread && (
                      <div className={`absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${
                        theme === 'light' ? 'bg-[#ff6b35]' : 'bg-[#a78bfa]'
                      }`} />
                    )}

                    <div className="flex gap-3 pl-3">
                      {/* Category Icon */}
                      <div 
                        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          theme === 'light' ? 'bg-white' : 'bg-[#251e45]'
                        }`}
                      >
                        <Icon 
                          className="w-5 h-5" 
                          style={{ color: getCategoryColor(notification.category) }}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className={`text-sm line-clamp-1 ${
                            theme === 'light' ? 'text-gray-900' : 'text-white'
                          }`}>
                            {notification.title}
                          </h4>
                          <span className={`text-xs px-2 py-0.5 rounded ${urgencyStyles.bg} ${urgencyStyles.text} flex-shrink-0`}>
                            {notification.urgency}
                          </span>
                        </div>

                        <div className={`flex items-center gap-1 text-xs mb-2 ${
                          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          <MapPin className="w-3 h-3" />
                          <span className="line-clamp-1">{notification.location}</span>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <TrustIndexBadge 
                            theme={theme} 
                            score={notification.trustScore} 
                            size="small"
                            showTooltip={false}
                          />
                          
                          <div className={`flex items-center gap-1 text-xs ${
                            theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                          }`}>
                            <Clock className="w-3 h-3" />
                            {notification.timestamp}
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
