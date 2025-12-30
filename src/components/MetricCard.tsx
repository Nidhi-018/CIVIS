import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  iconColor: string;
  theme: 'light' | 'dark';
  subtitle?: string;
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  trend = 'neutral', 
  icon: Icon, 
  iconColor,
  theme,
  subtitle 
}: MetricCardProps) {
  return (
    <div className={`p-5 rounded-xl border transition-all hover:shadow-lg ${
      theme === 'light'
        ? 'bg-white border-gray-200 hover:border-gray-300'
        : 'bg-[#251e45] border-[#3d3066] hover:border-[#4d4076] hover:shadow-purple-500/10'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${
          theme === 'light' ? 'bg-gray-50' : 'bg-[#1a1433]'
        }`}>
          <Icon className="w-6 h-6" style={{ color: iconColor }} />
        </div>
        {change && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
            trend === 'up' 
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
              : trend === 'down'
              ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
          }`}>
            {trend === 'up' && '↑'}
            {trend === 'down' && '↓'}
            {change}
          </div>
        )}
      </div>
      <h3 className={`text-2xl mb-1 ${
        theme === 'light' ? 'text-gray-900' : 'text-white'
      }`}>
        {value}
      </h3>
      <p className={`text-sm ${
        theme === 'light' ? 'text-gray-600' : 'text-gray-400'
      }`}>
        {title}
      </p>
      {subtitle && (
        <p className={`text-xs mt-2 ${
          theme === 'light' ? 'text-gray-500' : 'text-gray-500'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
