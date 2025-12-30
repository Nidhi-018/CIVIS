import { MapPin, Lightbulb, Navigation, Droplet, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface InfrastructureNode {
  id: string;
  type: 'streetlights' | 'traffic' | 'water' | 'waste';
  status: 'operational' | 'warning' | 'critical' | 'maintenance';
  lat: number;
  lng: number;
  name: string;
  details?: string;
}

interface MapViewProps {
  theme: 'light' | 'dark';
  nodes: InfrastructureNode[];
  height?: string;
}

export function MapView({ theme, nodes, height = '500px' }: MapViewProps) {
  const [selectedNode, setSelectedNode] = useState<InfrastructureNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return '#10b981';
      case 'warning': return '#fbbf24';
      case 'critical': return '#ef4444';
      case 'maintenance': return '#818cf8';
      default: return '#6b7280';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'streetlights': return Lightbulb;
      case 'traffic': return Navigation;
      case 'water': return Droplet;
      case 'waste': return Trash2;
      default: return MapPin;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'streetlights': return '#fbbf24';
      case 'traffic': return '#ef4444';
      case 'water': return '#0ea5e9';
      case 'waste': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div className={`relative h-full rounded-xl border overflow-hidden ${
      theme === 'light' 
        ? 'bg-gray-50 border-gray-200' 
        : 'bg-[#1a1433] border-[#3d3066]'
    }`}>
      {/* Map Container */}
      <div className="relative w-full h-full" style={{ minHeight: height }}>
        {/* Grid Background */}
        <div className={`absolute inset-0 ${
          theme === 'light' ? 'bg-gray-100' : 'bg-[#0f0b1f]'
        }`}>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path 
                  d="M 40 0 L 0 0 0 40" 
                  fill="none" 
                  stroke={theme === 'light' ? '#e5e7eb' : '#1a1433'} 
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Map Markers */}
        <div className="absolute inset-0 p-8">
          {nodes.map((node) => {
            const Icon = getTypeIcon(node.type);
            const isHovered = hoveredNode === node.id;
            const isSelected = selectedNode?.id === node.id;
            
            return (
              <div
                key={node.id}
                className="absolute transition-transform duration-200"
                style={{
                  left: `${node.lng}%`,
                  top: `${node.lat}%`,
                  transform: `translate(-50%, -50%) scale(${isHovered || isSelected ? 1.2 : 1})`,
                }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setSelectedNode(node)}
              >
                {/* Marker */}
                <button
                  className="relative cursor-pointer"
                  style={{
                    filter: `drop-shadow(0 4px 12px ${getStatusColor(node.status)}40)`,
                  }}
                >
                  {/* Pulsing ring for critical/warning */}
                  {(node.status === 'critical' || node.status === 'warning') && (
                    <span
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{ backgroundColor: getStatusColor(node.status), opacity: 0.3 }}
                    />
                  )}
                  
                  {/* Marker circle */}
                  <div
                    className="relative w-10 h-10 rounded-full flex items-center justify-center border-3 shadow-lg"
                    style={{
                      backgroundColor: theme === 'light' ? 'white' : '#251e45',
                      borderColor: getStatusColor(node.status),
                      borderWidth: '3px',
                    }}
                  >
                    <Icon 
                      className="w-5 h-5" 
                      style={{ color: getTypeColor(node.type) }}
                    />
                  </div>
                </button>

                {/* Tooltip */}
                {(isHovered || isSelected) && (
                  <div className={`absolute left-1/2 -translate-x-1/2 top-12 z-10 p-3 rounded-lg shadow-xl min-w-[200px] ${
                    theme === 'light' 
                      ? 'bg-white border border-gray-200' 
                      : 'bg-[#251e45] border border-[#3d3066]'
                  }`}>
                    <div className={`mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                      {node.name}
                    </div>
                    <div className={`text-xs mb-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                      {node.type.charAt(0).toUpperCase() + node.type.slice(1)}
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: getStatusColor(node.status) }}
                      />
                      <span className={`text-xs capitalize ${
                        theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                      }`}>
                        {node.status}
                      </span>
                    </div>
                    {node.details && (
                      <p className={`text-xs mt-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                        {node.details}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Map Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button className={`p-2 rounded-lg shadow-lg transition-colors ${
            theme === 'light' 
              ? 'bg-white hover:bg-gray-50 text-gray-700' 
              : 'bg-[#251e45] hover:bg-[#2d2455] text-gray-300'
          }`}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <button className={`p-2 rounded-lg shadow-lg transition-colors ${
            theme === 'light' 
              ? 'bg-white hover:bg-gray-50 text-gray-700' 
              : 'bg-[#251e45] hover:bg-[#2d2455] text-gray-300'
          }`}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 10h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Legend */}
        <div className={`absolute top-4 left-4 p-3 rounded-lg shadow-lg ${
          theme === 'light' 
            ? 'bg-white/90 backdrop-blur-sm border border-gray-200' 
            : 'bg-[#251e45]/90 backdrop-blur-sm border border-[#3d3066]'
        }`}>
          <h4 className={`text-xs mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Status Legend
          </h4>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#10b981]" />
              <span className={`text-xs ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                Operational
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#fbbf24]" />
              <span className={`text-xs ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                Warning
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#ef4444]" />
              <span className={`text-xs ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                Critical
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#818cf8]" />
              <span className={`text-xs ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                Maintenance
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}