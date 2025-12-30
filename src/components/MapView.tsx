import { MapPin, Lightbulb, Navigation, Droplet, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface InfrastructureNode {
  id: string;
  type: 'streetlights' | 'traffic' | 'water' | 'waste';
  status: 'operational' | 'warning' | 'critical' | 'maintenance';
  latitude: number;
  longitude: number;
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

  const createCustomIcon = (node: InfrastructureNode) => {
    const Icon = getTypeIcon(node.type);
    const statusColor = getStatusColor(node.status);
    const typeColor = getTypeColor(node.type);

    return L.divIcon({
      html: `
        <div style="
          position: relative;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: ${theme === 'light' ? 'white' : '#251e45'};
          border: 3px solid ${statusColor};
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px ${statusColor}40;
          filter: drop-shadow(0 4px 12px ${statusColor}40);
        ">
          ${(node.status === 'critical' || node.status === 'warning') ? `
            <span style="
              position: absolute;
              inset: 0;
              border-radius: 50%;
              background-color: ${statusColor};
              opacity: 0.3;
              animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
            "></span>
          ` : ''}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${typeColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            ${Icon === Lightbulb ? '<path d="M9 21h6a2 2 0 0 0 2-2v-5a8 8 0 1 1-16 0v5a2 2 0 0 0 2 2z"/><path d="M12 3v3"/><path d="M12 12v6"/>' : ''}
            ${Icon === Navigation ? '<polygon points="3,11 22,2 13,21 9,13 3,11"/>' : ''}
            ${Icon === Droplet ? '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>' : ''}
            ${Icon === Trash2 ? '<polyline points="3,6 5,6 21,6"/><path d="M19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>' : ''}
            ${Icon === MapPin ? '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>' : ''}
          </svg>
        </div>
      `,
      className: 'custom-marker',
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });
  };

  // Calculate center based on nodes or default
  const center: [number, number] = nodes.length > 0
    ? [nodes[0].latitude, nodes[0].longitude]
    : [40.7128, -74.0060]; // Default to NYC

  return (
    <div className={`relative h-full rounded-xl border overflow-hidden ${
      theme === 'light'
        ? 'bg-gray-50 border-gray-200'
        : 'bg-[#1a1433] border-[#3d3066]'
    }`}>
      {/* Map Container */}
      <div style={{ height: height || '600px', width: '100%' }}>
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          className="rounded-xl"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Map Markers */}
          {nodes.map((node) => (
            <Marker
              key={node.id}
              position={[node.latitude, node.longitude]}
              icon={createCustomIcon(node)}
              eventHandlers={{
                click: () => setSelectedNode(node),
              }}
            >
              <Tooltip direction="top" offset={[0, -20]}>
                <div className={`p-2 min-w-[200px] ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  <div className="mb-1 font-medium">{node.name}</div>
                  <div className={`text-xs mb-2 ${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                  }`}>
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
                    <p className={`text-xs mt-2 ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {node.details}
                    </p>
                  )}
                </div>
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Legend */}
      <div className={`absolute top-4 left-4 p-3 rounded-lg shadow-lg z-[1000] ${
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
  );
}