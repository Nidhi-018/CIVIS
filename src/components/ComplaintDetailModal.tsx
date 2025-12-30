import { useState } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  User,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  UserCheck,
  Wrench,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { TrustIndexBadge } from './TrustIndexBadge';

interface ComplaintDetailModalProps {
  theme: 'light' | 'dark';
  complaint: {
    id: string;
    category: string;
    title: string;
    description: string;
    location: string;
    urgency: 'low' | 'medium' | 'high';
    trustScore: number;
    timestamp: string;
    status: 'submitted' | 'under-review' | 'verified' | 'assigned' | 'resolved';
    photos?: string[];
    reportedBy?: string;
    sensorData?: {
      temperature?: number;
      humidity?: number;
      pressure?: number;
    };
  };
  onClose: () => void;
  onVerify?: () => void;
  onAssign?: () => void;
  onChangeStatus?: (status: string) => void;
}

export function ComplaintDetailModal({ 
  theme, 
  complaint, 
  onClose,
  onVerify,
  onAssign,
  onChangeStatus 
}: ComplaintDetailModalProps) {
  const [internalNotes, setInternalNotes] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState(complaint.status);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400' };
      case 'under-review':
        return { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400' };
      case 'verified':
        return { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-400' };
      case 'assigned':
        return { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-400' };
      case 'resolved':
        return { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400' };
      default:
        return { bg: 'bg-gray-100 dark:bg-gray-900/30', text: 'text-gray-700 dark:text-gray-400' };
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', icon: AlertTriangle };
      case 'medium':
        return { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', icon: AlertTriangle };
      default:
        return { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', icon: CheckCircle2 };
    }
  };

  const statusColor = getStatusColor(complaint.status);
  const urgencyInfo = getUrgencyColor(complaint.urgency);
  const UrgencyIcon = urgencyInfo.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className={`w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl ${
        theme === 'light'
          ? 'bg-white'
          : 'bg-[#1a1433]'
      }`}>
        {/* Header */}
        <div className={`p-6 border-b ${
          theme === 'light' ? 'border-gray-200' : 'border-[#3d3066]'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-3 py-1 rounded-lg text-sm ${statusColor.bg} ${statusColor.text}`}>
                  {complaint.status.replace('-', ' ').toUpperCase()}
                </span>
                <span className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1 ${urgencyInfo.bg} ${urgencyInfo.text}`}>
                  <UrgencyIcon className="w-4 h-4" />
                  {complaint.urgency.toUpperCase()} Priority
                </span>
              </div>
              <h2 className={`text-2xl mb-1 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                {complaint.title}
              </h2>
              <div className={`flex items-center gap-4 text-sm ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {complaint.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {complaint.timestamp}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'light'
                  ? 'hover:bg-gray-100 text-gray-600'
                  : 'hover:bg-[#251e45] text-gray-400'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6 space-y-6">
          {/* Citizen Info & Trust Index */}
          <div className={`p-4 rounded-xl border ${
            theme === 'light'
              ? 'bg-gray-50 border-gray-200'
              : 'bg-[#251e45] border-[#3d3066]'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  theme === 'light' ? 'bg-gray-200' : 'bg-[#3d3066]'
                }`}>
                  <User className={`w-5 h-5 ${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                  }`} />
                </div>
                <div>
                  <div className={`text-sm ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {complaint.reportedBy || 'Anonymous Citizen'}
                  </div>
                  <div className={`text-xs ${
                    theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    Complaint #{complaint.id}
                  </div>
                </div>
              </div>
              <TrustIndexBadge theme={theme} score={complaint.trustScore} size="medium" />
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className={`text-sm mb-2 ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}>
              Description
            </h3>
            <p className={`${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              {complaint.description}
            </p>
          </div>

          {/* Photos */}
          {complaint.photos && complaint.photos.length > 0 && (
            <div>
              <h3 className={`text-sm mb-3 flex items-center gap-2 ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                <ImageIcon className="w-4 h-4" />
                Uploaded Photos ({complaint.photos.length})
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {complaint.photos.map((photo, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPhoto(index)}
                    className="relative group aspect-square rounded-lg overflow-hidden"
                  >
                    <img
                      src={photo}
                      alt={`Evidence ${index + 1}`}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Map Location Preview */}
          <div>
            <h3 className={`text-sm mb-3 ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}>
              Exact Location
            </h3>
            <div className={`h-48 rounded-xl overflow-hidden border ${
              theme === 'light'
                ? 'bg-gray-100 border-gray-200'
                : 'bg-[#0f0b1f] border-[#3d3066]'
            }`}>
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <MapPin className={`w-12 h-12 mx-auto mb-2 ${
                    theme === 'light' ? 'text-gray-400' : 'text-gray-600'
                  }`} />
                  <p className={`text-sm ${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {complaint.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sensor Data (if available) */}
          {complaint.sensorData && (
            <div>
              <h3 className={`text-sm mb-3 ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                Related Sensor Data
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {complaint.sensorData.temperature && (
                  <div className={`p-3 rounded-lg border ${
                    theme === 'light'
                      ? 'bg-orange-50 border-orange-200'
                      : 'bg-orange-900/10 border-orange-900/30'
                  }`}>
                    <div className={`text-xs mb-1 ${
                      theme === 'light' ? 'text-orange-600' : 'text-orange-400'
                    }`}>
                      Temperature
                    </div>
                    <div className={`text-lg ${
                      theme === 'light' ? 'text-orange-700' : 'text-orange-300'
                    }`}>
                      {complaint.sensorData.temperature}°C
                    </div>
                  </div>
                )}
                {complaint.sensorData.humidity && (
                  <div className={`p-3 rounded-lg border ${
                    theme === 'light'
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-blue-900/10 border-blue-900/30'
                  }`}>
                    <div className={`text-xs mb-1 ${
                      theme === 'light' ? 'text-blue-600' : 'text-blue-400'
                    }`}>
                      Humidity
                    </div>
                    <div className={`text-lg ${
                      theme === 'light' ? 'text-blue-700' : 'text-blue-300'
                    }`}>
                      {complaint.sensorData.humidity}%
                    </div>
                  </div>
                )}
                {complaint.sensorData.pressure && (
                  <div className={`p-3 rounded-lg border ${
                    theme === 'light'
                      ? 'bg-purple-50 border-purple-200'
                      : 'bg-purple-900/10 border-purple-900/30'
                  }`}>
                    <div className={`text-xs mb-1 ${
                      theme === 'light' ? 'text-purple-600' : 'text-purple-400'
                    }`}>
                      Pressure
                    </div>
                    <div className={`text-lg ${
                      theme === 'light' ? 'text-purple-700' : 'text-purple-300'
                    }`}>
                      {complaint.sensorData.pressure} PSI
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Change Status */}
          <div>
            <h3 className={`text-sm mb-3 ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}>
              Update Status
            </h3>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as any)}
              className={`w-full px-4 py-2 rounded-lg border ${
                theme === 'light'
                  ? 'bg-white border-gray-300 text-gray-900'
                  : 'bg-[#251e45] border-[#3d3066] text-white'
              }`}
            >
              <option value="submitted">Submitted</option>
              <option value="under-review">Under Review</option>
              <option value="verified">Verified</option>
              <option value="assigned">Assigned to Maintenance</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          {/* Internal Notes */}
          <div>
            <h3 className={`text-sm mb-3 flex items-center gap-2 ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}>
              <MessageSquare className="w-4 h-4" />
              Internal Notes (Not visible to citizen)
            </h3>
            <textarea
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              rows={3}
              placeholder="Add internal notes for your team..."
              className={`w-full px-4 py-3 rounded-lg border resize-none ${
                theme === 'light'
                  ? 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  : 'bg-[#251e45] border-[#3d3066] text-white placeholder-gray-500'
              }`}
            />
          </div>
        </div>

        {/* Actions Footer */}
        <div className={`p-6 border-t ${
          theme === 'light' ? 'border-gray-200' : 'border-[#3d3066]'
        }`}>
          <div className="flex gap-3">
            <button
              onClick={onVerify}
              className={`flex-1 py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 ${
                theme === 'light'
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              <UserCheck className="w-5 h-5" />
              Mark as Verified
            </button>
            
            <button
              onClick={onAssign}
              className={`flex-1 py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 ${
                theme === 'light'
                  ? 'bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white hover:shadow-lg'
                  : 'bg-gradient-to-r from-[#a78bfa] to-[#818cf8] text-white hover:shadow-lg'
              }`}
            >
              <Wrench className="w-5 h-5" />
              Assign Maintenance Task
            </button>
            
            <button
              onClick={() => onChangeStatus?.(newStatus)}
              className={`px-6 py-3 rounded-lg transition-colors ${
                theme === 'light'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Update
            </button>
          </div>
        </div>
      </div>

      {/* Photo Lightbox */}
      {selectedPhoto !== null && complaint.photos && (
        <div 
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPhoto(Math.max(0, selectedPhoto - 1));
            }}
            disabled={selectedPhoto === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          <img
            src={complaint.photos[selectedPhoto]}
            alt={`Photo ${selectedPhoto + 1}`}
            className="max-w-full max-h-full rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPhoto(Math.min(complaint.photos!.length - 1, selectedPhoto + 1));
            }}
            disabled={selectedPhoto === complaint.photos.length - 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
          
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
      )}
    </div>
  );
}
