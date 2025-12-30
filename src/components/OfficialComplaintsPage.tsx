import { useState } from 'react';
import { 
  AlertCircle,
  Clock,
  CheckCircle2,
  Filter,
  Search,
  Lightbulb,
  Navigation,
  Droplet,
  Trash2,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { TrustIndexBadge } from './TrustIndexBadge';
import { ComplaintDetailModal } from './ComplaintDetailModal';

interface OfficialComplaintsPageProps {
  theme: 'light' | 'dark';
}

interface Complaint {
  id: string;
  category: 'streetlights' | 'traffic' | 'water' | 'waste' | 'roads' | 'other';
  title: string;
  description: string;
  location: string;
  urgency: 'low' | 'medium' | 'high';
  trustScore: number;
  timestamp: string;
  status: 'submitted' | 'under-review' | 'verified' | 'assigned' | 'resolved';
  reportedBy: string;
  photos?: string[];
  sensorData?: {
    temperature?: number;
    humidity?: number;
    pressure?: number;
  };
}

export function OfficialComplaintsPage({ theme }: OfficialComplaintsPageProps) {
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterUrgency, setFilterUrgency] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock complaints data
  const complaints: Complaint[] = [
    {
      id: 'C001',
      category: 'streetlights',
      title: 'Broken streetlight on Main Street',
      description: 'The streetlight near house #45 has been flickering for the past week and went out completely last night. This is creating a safety concern for pedestrians and drivers in the area.',
      location: 'Main Street, #45',
      urgency: 'high',
      trustScore: 92,
      timestamp: '2 hours ago',
      status: 'submitted',
      reportedBy: 'John Doe',
      photos: ['https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400']
    },
    {
      id: 'C002',
      category: 'water',
      title: 'Water leakage on residential street',
      description: 'Small water leak visible on the sidewalk on Elm Street. Water is continuously flowing, suggesting a possible pipe issue.',
      location: 'Elm Street, #23',
      urgency: 'high',
      trustScore: 87,
      timestamp: '4 hours ago',
      status: 'under-review',
      reportedBy: 'Sarah Smith',
      sensorData: {
        pressure: 42
      }
    },
    {
      id: 'C003',
      category: 'waste',
      title: 'Overflowing waste bin at bus stop',
      description: 'The public waste bin at the downtown bus stop has been overflowing for several days, creating an unsanitary situation.',
      location: 'Bus Stop, Downtown (5th Ave)',
      urgency: 'medium',
      trustScore: 78,
      timestamp: '1 day ago',
      status: 'verified',
      reportedBy: 'Mike Johnson',
      photos: ['https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400']
    },
    {
      id: 'C004',
      category: 'traffic',
      title: 'Pedestrian crossing signal not working',
      description: 'The pedestrian crossing button at the intersection is not responding when pressed.',
      location: 'Oak Ave & 3rd Street',
      urgency: 'high',
      trustScore: 95,
      timestamp: '3 hours ago',
      status: 'assigned',
      reportedBy: 'Emily Brown'
    },
    {
      id: 'C005',
      category: 'roads',
      title: 'Large pothole on Park Avenue',
      description: 'There is a large pothole approximately 2 feet wide on Park Avenue causing vehicles to swerve.',
      location: 'Park Avenue, near Oak Street',
      urgency: 'medium',
      trustScore: 81,
      timestamp: '5 hours ago',
      status: 'submitted',
      reportedBy: 'David Lee'
    },
    {
      id: 'C006',
      category: 'streetlights',
      title: 'Multiple streetlights dim on River Street',
      description: 'Several streetlights on River Street appear significantly dimmer than usual, affecting visibility.',
      location: 'River Street',
      urgency: 'low',
      trustScore: 72,
      timestamp: '2 days ago',
      status: 'resolved',
      reportedBy: 'Lisa Anderson'
    },
    {
      id: 'C007',
      category: 'water',
      title: 'Low water pressure in apartment building',
      description: 'Residents of the Park View Apartments are experiencing unusually low water pressure.',
      location: 'Park View Apartments, 123 Main St',
      urgency: 'medium',
      trustScore: 88,
      timestamp: '6 hours ago',
      status: 'under-review',
      reportedBy: 'Robert Wilson',
      sensorData: {
        pressure: 28
      }
    },
    {
      id: 'C008',
      category: 'traffic',
      title: 'Traffic signal stuck on red',
      description: 'The traffic signal at 5th and Main has been stuck on red for over 15 minutes causing traffic backup.',
      location: '5th Ave & Main Street',
      urgency: 'high',
      trustScore: 96,
      timestamp: '1 hour ago',
      status: 'submitted',
      reportedBy: 'Jennifer Martinez'
    },
  ];

  // Filter complaints
  const filteredComplaints = complaints.filter(complaint => {
    const statusMatch = filterStatus === 'all' || complaint.status === filterStatus;
    const urgencyMatch = filterUrgency === 'all' || complaint.urgency === filterUrgency;
    const searchMatch = searchQuery === '' || 
      complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.location.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && urgencyMatch && searchMatch;
  });

  // Group complaints by urgency
  const highUrgency = filteredComplaints.filter(c => c.urgency === 'high' && c.status !== 'resolved');
  const otherComplaints = filteredComplaints.filter(c => c.urgency !== 'high' || c.status === 'resolved');

  const getCategoryIcon = (category: Complaint['category']) => {
    switch (category) {
      case 'streetlights':
        return Lightbulb;
      case 'traffic':
        return Navigation;
      case 'water':
        return Droplet;
      case 'waste':
        return Trash2;
      default:
        return AlertCircle;
    }
  };

  const getCategoryColor = (category: Complaint['category']) => {
    switch (category) {
      case 'streetlights':
        return theme === 'light' ? '#fbbf24' : '#fbbf24';
      case 'traffic':
        return theme === 'light' ? '#3b82f6' : '#60a5fa';
      case 'water':
        return theme === 'light' ? '#06b6d4' : '#22d3ee';
      case 'waste':
        return theme === 'light' ? '#10b981' : '#34d399';
      default:
        return theme === 'light' ? '#6b7280' : '#9ca3af';
    }
  };

  const getStatusBadge = (status: Complaint['status']) => {
    switch (status) {
      case 'submitted':
        return {
          text: 'New',
          color: theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-blue-900/30 text-blue-400',
          icon: Clock
        };
      case 'under-review':
        return {
          text: 'Under Review',
          color: theme === 'light' ? 'bg-yellow-100 text-yellow-700' : 'bg-yellow-900/30 text-yellow-400',
          icon: AlertCircle
        };
      case 'verified':
        return {
          text: 'Verified',
          color: theme === 'light' ? 'bg-purple-100 text-purple-700' : 'bg-purple-900/30 text-purple-400',
          icon: CheckCircle2
        };
      case 'assigned':
        return {
          text: 'Assigned',
          color: theme === 'light' ? 'bg-orange-100 text-orange-700' : 'bg-orange-900/30 text-orange-400',
          icon: CheckCircle2
        };
      case 'resolved':
        return {
          text: 'Resolved',
          color: theme === 'light' ? 'bg-green-100 text-green-700' : 'bg-green-900/30 text-green-400',
          icon: CheckCircle2
        };
    }
  };

  const getUrgencyIndicator = (urgency: Complaint['urgency']) => {
    switch (urgency) {
      case 'high':
        return {
          color: 'bg-red-500',
          text: 'High Priority',
          textColor: theme === 'light' ? 'text-red-700' : 'text-red-400'
        };
      case 'medium':
        return {
          color: 'bg-yellow-500',
          text: 'Medium',
          textColor: theme === 'light' ? 'text-yellow-700' : 'text-yellow-400'
        };
      case 'low':
        return {
          color: 'bg-green-500',
          text: 'Low',
          textColor: theme === 'light' ? 'text-green-700' : 'text-green-400'
        };
    }
  };

  // Count by status
  const statusCounts = {
    all: complaints.length,
    submitted: complaints.filter(c => c.status === 'submitted').length,
    'under-review': complaints.filter(c => c.status === 'under-review').length,
    verified: complaints.filter(c => c.status === 'verified').length,
    assigned: complaints.filter(c => c.status === 'assigned').length,
    resolved: complaints.filter(c => c.status === 'resolved').length,
  };

  const handleComplaintClick = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
  };

  const handleVerify = () => {
    console.log('Verifying complaint:', selectedComplaint?.id);
    // In a real app, this would update the backend
    setSelectedComplaint(null);
  };

  const handleAssign = () => {
    console.log('Assigning maintenance task for:', selectedComplaint?.id);
    // In a real app, this would create a maintenance task
    setSelectedComplaint(null);
  };

  const handleChangeStatus = (status: string) => {
    console.log('Changing status to:', status);
    // In a real app, this would update the backend
    setSelectedComplaint(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className={`text-3xl mb-2 ${
          theme === 'light' ? 'text-gray-900' : 'text-white'
        }`}>
          Citizen Complaints
        </h1>
        <p className={`${
          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
        }`}>
          Review and manage reported infrastructure issues from citizens
        </p>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
        <button
          onClick={() => setFilterStatus('all')}
          className={`p-4 rounded-xl border transition-all text-left ${
            filterStatus === 'all'
              ? theme === 'light'
                ? 'border-[#ff6b35] bg-orange-50'
                : 'border-[#a78bfa] bg-purple-900/20'
              : theme === 'light'
                ? 'border-gray-200 bg-white hover:border-gray-300'
                : 'border-[#3d3066] bg-[#1a1433] hover:border-[#4d4076]'
          }`}
        >
          <div className={`text-2xl mb-1 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            {statusCounts.all}
          </div>
          <div className={`text-xs ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            Total
          </div>
        </button>

        <button
          onClick={() => setFilterStatus('submitted')}
          className={`p-4 rounded-xl border transition-all text-left ${
            filterStatus === 'submitted'
              ? theme === 'light'
                ? 'border-blue-500 bg-blue-50'
                : 'border-blue-500 bg-blue-900/20'
              : theme === 'light'
                ? 'border-gray-200 bg-white hover:border-gray-300'
                : 'border-[#3d3066] bg-[#1a1433] hover:border-[#4d4076]'
          }`}
        >
          <div className={`text-2xl mb-1 ${
            theme === 'light' ? 'text-blue-600' : 'text-blue-400'
          }`}>
            {statusCounts.submitted}
          </div>
          <div className={`text-xs ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            New
          </div>
        </button>

        <button
          onClick={() => setFilterStatus('under-review')}
          className={`p-4 rounded-xl border transition-all text-left ${
            filterStatus === 'under-review'
              ? theme === 'light'
                ? 'border-yellow-500 bg-yellow-50'
                : 'border-yellow-500 bg-yellow-900/20'
              : theme === 'light'
                ? 'border-gray-200 bg-white hover:border-gray-300'
                : 'border-[#3d3066] bg-[#1a1433] hover:border-[#4d4076]'
          }`}
        >
          <div className={`text-2xl mb-1 ${
            theme === 'light' ? 'text-yellow-600' : 'text-yellow-400'
          }`}>
            {statusCounts['under-review']}
          </div>
          <div className={`text-xs ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            Reviewing
          </div>
        </button>

        <button
          onClick={() => setFilterStatus('verified')}
          className={`p-4 rounded-xl border transition-all text-left ${
            filterStatus === 'verified'
              ? theme === 'light'
                ? 'border-purple-500 bg-purple-50'
                : 'border-purple-500 bg-purple-900/20'
              : theme === 'light'
                ? 'border-gray-200 bg-white hover:border-gray-300'
                : 'border-[#3d3066] bg-[#1a1433] hover:border-[#4d4076]'
          }`}
        >
          <div className={`text-2xl mb-1 ${
            theme === 'light' ? 'text-purple-600' : 'text-purple-400'
          }`}>
            {statusCounts.verified}
          </div>
          <div className={`text-xs ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            Verified
          </div>
        </button>

        <button
          onClick={() => setFilterStatus('assigned')}
          className={`p-4 rounded-xl border transition-all text-left ${
            filterStatus === 'assigned'
              ? theme === 'light'
                ? 'border-orange-500 bg-orange-50'
                : 'border-orange-500 bg-orange-900/20'
              : theme === 'light'
                ? 'border-gray-200 bg-white hover:border-gray-300'
                : 'border-[#3d3066] bg-[#1a1433] hover:border-[#4d4076]'
          }`}
        >
          <div className={`text-2xl mb-1 ${
            theme === 'light' ? 'text-orange-600' : 'text-orange-400'
          }`}>
            {statusCounts.assigned}
          </div>
          <div className={`text-xs ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            Assigned
          </div>
        </button>

        <button
          onClick={() => setFilterStatus('resolved')}
          className={`p-4 rounded-xl border transition-all text-left ${
            filterStatus === 'resolved'
              ? theme === 'light'
                ? 'border-green-500 bg-green-50'
                : 'border-green-500 bg-green-900/20'
              : theme === 'light'
                ? 'border-gray-200 bg-white hover:border-gray-300'
                : 'border-[#3d3066] bg-[#1a1433] hover:border-[#4d4076]'
          }`}
        >
          <div className={`text-2xl mb-1 ${
            theme === 'light' ? 'text-green-600' : 'text-green-400'
          }`}>
            {statusCounts.resolved}
          </div>
          <div className={`text-xs ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            Resolved
          </div>
        </button>
      </div>

      {/* Search and Filters */}
      <div className={`p-4 rounded-xl border mb-6 ${
        theme === 'light'
          ? 'bg-white border-gray-200'
          : 'bg-[#1a1433] border-[#3d3066]'
      }`}>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
              theme === 'light' ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              placeholder="Search complaints by title or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                theme === 'light'
                  ? 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
                  : 'bg-[#251e45] border-[#3d3066] text-white placeholder-gray-500'
              }`}
            />
          </div>

          {/* Urgency Filter */}
          <div className="flex items-center gap-2">
            <Filter className={`w-5 h-5 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`} />
            <select
              value={filterUrgency}
              onChange={(e) => setFilterUrgency(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${
                theme === 'light'
                  ? 'bg-gray-50 border-gray-300 text-gray-900'
                  : 'bg-[#251e45] border-[#3d3066] text-white'
              }`}
            >
              <option value="all">All Urgency Levels</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
        </div>
      </div>

      {/* High Priority Complaints */}
      {highUrgency.length > 0 && (
        <div className="mb-8">
          <h2 className={`text-xl mb-4 flex items-center gap-2 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            <AlertCircle className="w-6 h-6 text-red-500" />
            High Priority ({highUrgency.length})
          </h2>
          <div className="space-y-3">
            {highUrgency.map((complaint) => {
              const Icon = getCategoryIcon(complaint.category);
              const statusBadge = getStatusBadge(complaint.status);
              const StatusIcon = statusBadge.icon;
              const urgencyInfo = getUrgencyIndicator(complaint.urgency);

              return (
                <button
                  key={complaint.id}
                  onClick={() => handleComplaintClick(complaint)}
                  className={`w-full p-5 rounded-xl border transition-all text-left group ${
                    theme === 'light'
                      ? 'bg-white border-red-200 hover:border-red-400 hover:shadow-lg'
                      : 'bg-[#1a1433] border-red-900/50 hover:border-red-700 hover:shadow-lg hover:shadow-red-900/20'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Priority Indicator */}
                    <div className={`w-1 h-full absolute left-0 top-0 bottom-0 rounded-l-xl ${urgencyInfo.color}`} />

                    {/* Category Icon */}
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ 
                        backgroundColor: theme === 'light' 
                          ? `${getCategoryColor(complaint.category)}20` 
                          : `${getCategoryColor(complaint.category)}30` 
                      }}
                    >
                      <Icon 
                        className="w-6 h-6" 
                        style={{ color: getCategoryColor(complaint.category) }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              theme === 'light' ? 'bg-gray-100 text-gray-700' : 'bg-gray-800 text-gray-300'
                            }`}>
                              #{complaint.id}
                            </span>
                            <span className={`text-xs ${urgencyInfo.textColor}`}>
                              {urgencyInfo.text}
                            </span>
                          </div>
                          <h3 className={`text-lg mb-1 ${
                            theme === 'light' ? 'text-gray-900' : 'text-white'
                          }`}>
                            {complaint.title}
                          </h3>
                        </div>
                        <ChevronRight className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-1 ${
                          theme === 'light' ? 'text-gray-400' : 'text-gray-600'
                        }`} />
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <div className="flex items-center gap-1.5">
                          <MapPin className={`w-4 h-4 ${
                            theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                          }`} />
                          <span className={`text-sm ${
                            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {complaint.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className={`w-4 h-4 ${
                            theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                          }`} />
                          <span className={`text-sm ${
                            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {complaint.timestamp}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm ${statusBadge.color}`}>
                          <StatusIcon className="w-4 h-4" />
                          {statusBadge.text}
                        </span>
                        <TrustIndexBadge theme={theme} score={complaint.trustScore} size="small" />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Other Complaints */}
      <div>
        <h2 className={`text-xl mb-4 ${
          theme === 'light' ? 'text-gray-900' : 'text-white'
        }`}>
          {highUrgency.length > 0 ? 'Other Complaints' : 'All Complaints'} ({otherComplaints.length})
        </h2>
        <div className="space-y-3">
          {otherComplaints.map((complaint) => {
            const Icon = getCategoryIcon(complaint.category);
            const statusBadge = getStatusBadge(complaint.status);
            const StatusIcon = statusBadge.icon;
            const urgencyInfo = getUrgencyIndicator(complaint.urgency);

            return (
              <button
                key={complaint.id}
                onClick={() => handleComplaintClick(complaint)}
                className={`w-full p-5 rounded-xl border transition-all text-left group ${
                  theme === 'light'
                    ? 'bg-white border-gray-200 hover:border-[#ff6b35] hover:shadow-md'
                    : 'bg-[#1a1433] border-[#3d3066] hover:border-[#a78bfa] hover:shadow-lg hover:shadow-purple-900/20'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Category Icon */}
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ 
                      backgroundColor: theme === 'light' 
                        ? `${getCategoryColor(complaint.category)}20` 
                        : `${getCategoryColor(complaint.category)}30` 
                    }}
                  >
                    <Icon 
                      className="w-6 h-6" 
                      style={{ color: getCategoryColor(complaint.category) }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            theme === 'light' ? 'bg-gray-100 text-gray-700' : 'bg-gray-800 text-gray-300'
                          }`}>
                            #{complaint.id}
                          </span>
                          {complaint.urgency !== 'low' && (
                            <span className={`text-xs ${urgencyInfo.textColor}`}>
                              {urgencyInfo.text}
                            </span>
                          )}
                        </div>
                        <h3 className={`text-lg mb-1 ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>
                          {complaint.title}
                        </h3>
                      </div>
                      <ChevronRight className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-1 ${
                        theme === 'light' ? 'text-gray-400' : 'text-gray-600'
                      }`} />
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <div className="flex items-center gap-1.5">
                        <MapPin className={`w-4 h-4 ${
                          theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                        }`} />
                        <span className={`text-sm ${
                          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {complaint.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className={`w-4 h-4 ${
                          theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                        }`} />
                        <span className={`text-sm ${
                          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {complaint.timestamp}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm ${statusBadge.color}`}>
                        <StatusIcon className="w-4 h-4" />
                        {statusBadge.text}
                      </span>
                      <TrustIndexBadge theme={theme} score={complaint.trustScore} size="small" />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Empty State */}
      {filteredComplaints.length === 0 && (
        <div className={`text-center py-16 rounded-2xl border ${
          theme === 'light'
            ? 'bg-gray-50 border-gray-200'
            : 'bg-[#1a1433] border-[#3d3066]'
        }`}>
          <CheckCircle2 className={`w-16 h-16 mx-auto mb-4 ${
            theme === 'light' ? 'text-gray-400' : 'text-gray-600'
          }`} />
          <h3 className={`text-xl mb-2 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            No complaints found
          </h3>
          <p className={`${
            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            Try adjusting your filters to see more results
          </p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedComplaint && (
        <ComplaintDetailModal
          theme={theme}
          complaint={selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
          onVerify={handleVerify}
          onAssign={handleAssign}
          onChangeStatus={handleChangeStatus}
        />
      )}
    </div>
  );
}
