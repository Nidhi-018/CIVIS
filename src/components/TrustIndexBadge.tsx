import { Shield, Info } from 'lucide-react';
import { useState } from 'react';

interface TrustIndexBadgeProps {
  theme: 'light' | 'dark';
  score: number; // 0-100
  size?: 'small' | 'medium' | 'large';
  showTooltip?: boolean;
}

export function TrustIndexBadge({ theme, score, size = 'medium', showTooltip = true }: TrustIndexBadgeProps) {
  const [showInfo, setShowInfo] = useState(false);

  const getTrustLevel = (score: number) => {
    if (score >= 80) return { label: 'High Trust', color: '#10b981', bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400' };
    if (score >= 50) return { label: 'Medium Trust', color: '#fbbf24', bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400' };
    return { label: 'Building Trust', color: '#f59e0b', bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-400' };
  };

  const trust = getTrustLevel(score);
  
  const sizeClasses = {
    small: 'text-xs px-2 py-1',
    medium: 'text-sm px-3 py-1.5',
    large: 'text-base px-4 py-2'
  };

  const iconSizes = {
    small: 'w-3 h-3',
    medium: 'w-4 h-4',
    large: 'w-5 h-5'
  };

  return (
    <div className="relative inline-block">
      <div className={`flex items-center gap-2 rounded-lg ${trust.bg} ${trust.text} ${sizeClasses[size]}`}>
        <Shield className={iconSizes[size]} style={{ color: trust.color }} />
        <span>{trust.label}</span>
        <span className="opacity-70">({score}%)</span>
        {showTooltip && (
          <span
            onMouseEnter={() => setShowInfo(true)}
            onMouseLeave={() => setShowInfo(false)}
            className="ml-1 opacity-70 hover:opacity-100 transition-opacity cursor-help"
          >
            <Info className={iconSizes[size]} />
          </span>
        )}
      </div>

      {/* Tooltip */}
      {showInfo && showTooltip && (
        <div className={`absolute z-50 left-0 top-full mt-2 w-64 p-3 rounded-lg shadow-xl border ${
          theme === 'light'
            ? 'bg-white border-gray-200'
            : 'bg-[#1a1433] border-[#3d3066]'
        }`}>
          <h4 className={`text-sm mb-2 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            Your Trust Index
          </h4>
          <ul className={`text-xs space-y-1.5 ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            <li>✓ Verified and accurate reports increase your score</li>
            <li>✓ Timely updates help improve city services</li>
            <li>⚠ Repeated false reports may reduce visibility</li>
          </ul>
          <p className={`text-xs mt-2 italic ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-500'
          }`}>
            We value responsible community participation
          </p>
        </div>
      )}
    </div>
  );
}