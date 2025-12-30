import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ChartPanelProps {
  theme: 'light' | 'dark';
  data: any[];
  title: string;
  type?: 'line' | 'bar';
  dataKeys?: { key: string; color: string; name: string }[];
}

export function ChartPanel({ 
  theme, 
  data, 
  title, 
  type = 'line',
  dataKeys = [
    { key: 'value', color: '#ff6b35', name: 'Usage' }
  ]
}: ChartPanelProps) {
  const isDark = theme === 'dark';
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-lg shadow-lg border ${
          isDark 
            ? 'bg-[#251e45] border-[#3d3066]' 
            : 'bg-white border-gray-200'
        }`}>
          <p className={`text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {label}
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-semibold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`p-5 rounded-xl border ${
      theme === 'light' 
        ? 'bg-white border-gray-200' 
        : 'bg-[#251e45] border-[#3d3066]'
    }`}>
      <h3 className={`mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
        {title}
      </h3>
      
      <ResponsiveContainer width="100%" height={300}>
        {type === 'line' ? (
          <LineChart data={data}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={isDark ? '#3d3066' : '#e5e7eb'} 
            />
            <XAxis 
              dataKey="name" 
              stroke={isDark ? '#9ca3af' : '#6b7280'}
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke={isDark ? '#9ca3af' : '#6b7280'}
              style={{ fontSize: '12px' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ 
                fontSize: '12px',
                color: isDark ? '#e5e7eb' : '#374151'
              }}
            />
            {dataKeys.map((dk) => (
              <Line
                key={dk.key}
                type="monotone"
                dataKey={dk.key}
                stroke={dk.color}
                strokeWidth={2}
                dot={{ fill: dk.color, r: 4 }}
                activeDot={{ r: 6 }}
                name={dk.name}
              />
            ))}
          </LineChart>
        ) : (
          <BarChart data={data}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={isDark ? '#3d3066' : '#e5e7eb'} 
            />
            <XAxis 
              dataKey="name" 
              stroke={isDark ? '#9ca3af' : '#6b7280'}
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke={isDark ? '#9ca3af' : '#6b7280'}
              style={{ fontSize: '12px' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ 
                fontSize: '12px',
                color: isDark ? '#e5e7eb' : '#374151'
              }}
            />
            {dataKeys.map((dk) => (
              <Bar
                key={dk.key}
                dataKey={dk.key}
                fill={dk.color}
                radius={[8, 8, 0, 0]}
                name={dk.name}
              />
            ))}
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
