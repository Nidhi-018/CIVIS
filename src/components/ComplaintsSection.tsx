import { MessageSquare, MapPin, Clock, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

interface Complaint {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  timestamp: string;
  reportedBy: string;
}

interface ComplaintsSectionProps {
  theme: 'light' | 'dark';
  complaints: Complaint[];
}

export function ComplaintsSection({ theme, complaints }: ComplaintsSectionProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return CheckCircle2;
      case 'in-progress': return Clock;
      case 'rejected': return XCircle;
      default: return AlertCircle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return '#10b981';
      case 'in-progress': return '#0ea5e9';
      case 'rejected': return '#6b7280';
      default: return '#fbbf24';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f7931e';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div className={`rounded-xl border overflow-hidden ${
      theme === 'light' 
        ? 'bg-white border-gray-200' 
        : 'bg-[#251e45] border-[#3d3066]'
    }`}>
      {/* Header */}
      <div className={`px-5 py-4 border-b flex items-center justify-between ${
        theme === 'light' ? 'border-gray-200' : 'border-[#3d3066]'
      }`}>
        <div className="flex items-center gap-2">
          <MessageSquare className={`w-5 h-5 ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-300'
          }`} />
          <h3 className={`${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Citizen Complaints
          </h3>
        </div>
        <div className="flex gap-2">
          <select className={`px-3 py-1.5 rounded-lg border text-sm ${
            theme === 'light'
              ? 'bg-white border-gray-200 text-gray-700'
              : 'bg-[#1a1433] border-[#3d3066] text-gray-300'
          }`}>
            <option>All Status</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
          <select className={`px-3 py-1.5 rounded-lg border text-sm ${
            theme === 'light'
              ? 'bg-white border-gray-200 text-gray-700'
              : 'bg-[#1a1433] border-[#3d3066] text-gray-300'
          }`}>
            <option>All Priority</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
      </div>

      {/* Complaints List */}
      <div className="divide-y divide-gray-200 dark:divide-[#3d3066] max-h-[500px] overflow-y-auto">
        {complaints.map((complaint) => {
          const StatusIcon = getStatusIcon(complaint.status);
          const statusColor = getStatusColor(complaint.status);
          const priorityColor = getPriorityColor(complaint.priority);

          return (
            <div
              key={complaint.id}
              className={`p-4 transition-colors ${
                theme === 'light' 
                  ? 'hover:bg-gray-50' 
                  : 'hover:bg-[#1a1433]'
              }`}
            >
              <div className="flex gap-4">
                {/* Priority Indicator */}
                <div
                  className="w-1 rounded-full"
                  style={{ backgroundColor: priorityColor }}
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className={`${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                      {complaint.title}
                    </h4>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <StatusIcon 
                        className="w-4 h-4" 
                        style={{ color: statusColor }}
                      />
                      <span 
                        className="text-xs capitalize"
                        style={{ color: statusColor }}
                      >
                        {complaint.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>

                  <p className={`text-sm mb-3 ${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {complaint.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className={`flex items-center gap-1 ${
                      theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      <MapPin className="w-3 h-3" />
                      {complaint.location}
                    </span>
                    <span className={`flex items-center gap-1 ${
                      theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      <Clock className="w-3 h-3" />
                      {complaint.timestamp}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full ${
                      theme === 'light' 
                        ? 'bg-gray-100 text-gray-700' 
                        : 'bg-[#1a1433] text-gray-400'
                    }`}>
                      {complaint.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full capitalize ${
                      theme === 'light' 
                        ? 'bg-orange-50 text-orange-700' 
                        : 'bg-orange-900/20 text-orange-400'
                    }`}>
                      {complaint.priority} priority
                    </span>
                  </div>

                  <div className={`text-xs mt-2 ${
                    theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    Reported by: {complaint.reportedBy}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
