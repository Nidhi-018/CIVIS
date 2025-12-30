import { useState } from 'react';
import { 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Lightbulb,
  MapPin,
  Calendar,
  X,
  ChevronRight,
  Image as ImageIcon
} from 'lucide-react';

interface MyComplaintsPageProps {
  theme: 'light' | 'dark';
}

interface Complaint {
  id: string;
  category: 'streetlights' | 'traffic' | 'water' | 'waste' | 'roads' | 'other';
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  status: 'submitted' | 'under-review' | 'resolved';
  urgency: 'low' | 'medium' | 'high';
  images?: string[];
  statusHistory: {
    status: string;
    date: string;
    note?: string;
  }[];
}

export function MyComplaintsPage({ theme }: MyComplaintsPageProps) {
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  // Mock user's complaints
  const myComplaints: Complaint[] = [
    {
      id: 'c1',
      category: 'streetlights',
      title: 'Broken streetlight on Main Street',
      description: 'The streetlight near house #45 has been flickering for the past week and went out completely last night. This is creating a safety concern for pedestrians and drivers in the area.',
      location: 'Main Street, #45',
      date: 'Dec 28, 2024',
      time: '6:30 PM',
      status: 'under-review',
      urgency: 'high',
      images: ['https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400'],
      statusHistory: [
        { status: 'Submitted', date: 'Dec 28, 2024 - 6:30 PM' },
        { status: 'Under Review', date: 'Dec 29, 2024 - 9:15 AM', note: 'Assigned to maintenance team for inspection' },
      ]
    },
    {
      id: 'c2',
      category: 'roads',
      title: 'Large pothole on Park Avenue',
      description: 'There is a large pothole approximately 2 feet wide on Park Avenue that is causing vehicles to swerve dangerously. It has been growing larger over the past few weeks.',
      location: 'Park Avenue, near Oak Street',
      date: 'Dec 25, 2024',
      time: '2:15 PM',
      status: 'submitted',
      urgency: 'medium',
      statusHistory: [
        { status: 'Submitted', date: 'Dec 25, 2024 - 2:15 PM' },
      ]
    },
    {
      id: 'c3',
      category: 'waste',
      title: 'Overflowing waste bin at bus stop',
      description: 'The public waste bin at the downtown bus stop has been overflowing for several days, creating an unsanitary situation and attracting pests.',
      location: 'Bus Stop, Downtown (5th Ave)',
      date: 'Dec 20, 2024',
      time: '11:00 AM',
      status: 'resolved',
      urgency: 'medium',
      images: ['https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400'],
      statusHistory: [
        { status: 'Submitted', date: 'Dec 20, 2024 - 11:00 AM' },
        { status: 'Under Review', date: 'Dec 20, 2024 - 2:30 PM', note: 'Scheduled for collection' },
        { status: 'Resolved', date: 'Dec 21, 2024 - 8:45 AM', note: 'Bin emptied and cleaned. Collection frequency increased.' },
      ]
    },
    {
      id: 'c4',
      category: 'water',
      title: 'Water leakage on residential street',
      description: 'Small water leak visible on the sidewalk on Elm Street. Water is continuously flowing, suggesting a possible pipe issue.',
      location: 'Elm Street, #23',
      date: 'Dec 27, 2024',
      time: '8:45 AM',
      status: 'under-review',
      urgency: 'high',
      statusHistory: [
        { status: 'Submitted', date: 'Dec 27, 2024 - 8:45 AM' },
        { status: 'Under Review', date: 'Dec 27, 2024 - 10:00 AM', note: 'Water department notified for urgent inspection' },
      ]
    },
    {
      id: 'c5',
      category: 'traffic',
      title: 'Pedestrian crossing signal not working',
      description: 'The pedestrian crossing button at the intersection is not responding when pressed. Pedestrians are having difficulty crossing safely.',
      location: 'Oak Ave & 3rd Street',
      date: 'Dec 15, 2024',
      time: '5:20 PM',
      status: 'resolved',
      urgency: 'high',
      statusHistory: [
        { status: 'Submitted', date: 'Dec 15, 2024 - 5:20 PM' },
        { status: 'Under Review', date: 'Dec 16, 2024 - 8:00 AM', note: 'Traffic signal team dispatched' },
        { status: 'Resolved', date: 'Dec 17, 2024 - 11:30 AM', note: 'Button mechanism replaced and tested' },
      ]
    },
  ];

  const getCategoryIcon = (category: Complaint['category']) => {
    switch (category) {
      case 'streetlights':
        return Lightbulb;
      case 'traffic':
        return AlertCircle;
      case 'water':
        return AlertCircle;
      case 'waste':
        return AlertCircle;
      case 'roads':
        return AlertCircle;
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
      case 'roads':
        return theme === 'light' ? '#6366f1' : '#818cf8';
      default:
        return theme === 'light' ? '#6b7280' : '#9ca3af';
    }
  };

  const getStatusBadge = (status: Complaint['status']) => {
    switch (status) {
      case 'submitted':
        return {
          text: 'Submitted',
          color: theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-blue-900/30 text-blue-400',
          icon: Clock
        };
      case 'under-review':
        return {
          text: 'Under Review',
          color: theme === 'light' ? 'bg-yellow-100 text-yellow-700' : 'bg-yellow-900/30 text-yellow-400',
          icon: AlertCircle
        };
      case 'resolved':
        return {
          text: 'Resolved',
          color: theme === 'light' ? 'bg-green-100 text-green-700' : 'bg-green-900/30 text-green-400',
          icon: CheckCircle2
        };
    }
  };

  // Group complaints by status
  const groupedComplaints = {
    active: myComplaints.filter(c => c.status === 'submitted' || c.status === 'under-review'),
    resolved: myComplaints.filter(c => c.status === 'resolved'),
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className={`text-3xl mb-2 ${
          theme === 'light' ? 'text-gray-900' : 'text-white'
        }`}>
          My Complaints
        </h1>
        <p className={`${
          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
        }`}>
          Track all your submitted reports and their current status
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className={`p-5 rounded-xl border ${
          theme === 'light'
            ? 'bg-white border-gray-200'
            : 'bg-[#1a1433] border-[#3d3066]'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              theme === 'light' ? 'bg-blue-100' : 'bg-blue-900/30'
            }`}>
              <Clock className={`w-5 h-5 ${
                theme === 'light' ? 'text-blue-600' : 'text-blue-400'
              }`} />
            </div>
            <div>
              <p className={`text-2xl ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                {groupedComplaints.active.length}
              </p>
              <p className={`text-sm ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                Active Reports
              </p>
            </div>
          </div>
        </div>

        <div className={`p-5 rounded-xl border ${
          theme === 'light'
            ? 'bg-white border-gray-200'
            : 'bg-[#1a1433] border-[#3d3066]'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              theme === 'light' ? 'bg-green-100' : 'bg-green-900/30'
            }`}>
              <CheckCircle2 className={`w-5 h-5 ${
                theme === 'light' ? 'text-green-600' : 'text-green-400'
              }`} />
            </div>
            <div>
              <p className={`text-2xl ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                {groupedComplaints.resolved.length}
              </p>
              <p className={`text-sm ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                Resolved
              </p>
            </div>
          </div>
        </div>

        <div className={`p-5 rounded-xl border ${
          theme === 'light'
            ? 'bg-white border-gray-200'
            : 'bg-[#1a1433] border-[#3d3066]'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              theme === 'light' ? 'bg-purple-100' : 'bg-purple-900/30'
            }`}>
              <AlertCircle className={`w-5 h-5 ${
                theme === 'light' ? 'text-purple-600' : 'text-purple-400'
              }`} />
            </div>
            <div>
              <p className={`text-2xl ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                {myComplaints.length}
              </p>
              <p className={`text-sm ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                Total Reports
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Complaints */}
      {groupedComplaints.active.length > 0 && (
        <div className="mb-8">
          <h2 className={`text-xl mb-4 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            Active Reports
          </h2>
          <div className="space-y-3">
            {groupedComplaints.active.map((complaint) => {
              const Icon = getCategoryIcon(complaint.category);
              const statusBadge = getStatusBadge(complaint.status);
              const StatusIcon = statusBadge.icon;

              return (
                <button
                  key={complaint.id}
                  onClick={() => setSelectedComplaint(complaint)}
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
                        <h3 className={`text-lg ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>
                          {complaint.title}
                        </h3>
                        <ChevronRight className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-1 ${
                          theme === 'light' ? 'text-gray-400' : 'text-gray-600'
                        }`} />
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mb-3">
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
                          <Calendar className={`w-4 h-4 ${
                            theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                          }`} />
                          <span className={`text-sm ${
                            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {complaint.date} • {complaint.time}
                          </span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm ${statusBadge.color}`}>
                          <StatusIcon className="w-4 h-4" />
                          {statusBadge.text}
                        </span>
                        {complaint.images && complaint.images.length > 0 && (
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
                            theme === 'light' ? 'bg-gray-100 text-gray-600' : 'bg-gray-800 text-gray-400'
                          }`}>
                            <ImageIcon className="w-3 h-3" />
                            {complaint.images.length}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Resolved Complaints */}
      {groupedComplaints.resolved.length > 0 && (
        <div>
          <h2 className={`text-xl mb-4 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            Resolved Reports
          </h2>
          <div className="space-y-3">
            {groupedComplaints.resolved.map((complaint) => {
              const Icon = getCategoryIcon(complaint.category);
              const statusBadge = getStatusBadge(complaint.status);
              const StatusIcon = statusBadge.icon;

              return (
                <button
                  key={complaint.id}
                  onClick={() => setSelectedComplaint(complaint)}
                  className={`w-full p-5 rounded-xl border transition-all text-left group ${
                    theme === 'light'
                      ? 'bg-white border-gray-200 hover:border-[#ff6b35] hover:shadow-md'
                      : 'bg-[#1a1433] border-[#3d3066] hover:border-[#a78bfa] hover:shadow-lg hover:shadow-purple-900/20'
                  }`}
                >
                  <div className="flex items-start gap-4">
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

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className={`text-lg ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>
                          {complaint.title}
                        </h3>
                        <ChevronRight className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-1 ${
                          theme === 'light' ? 'text-gray-400' : 'text-gray-600'
                        }`} />
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mb-3">
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
                          <Calendar className={`w-4 h-4 ${
                            theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                          }`} />
                          <span className={`text-sm ${
                            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {complaint.date} • {complaint.time}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm ${statusBadge.color}`}>
                          <StatusIcon className="w-4 h-4" />
                          {statusBadge.text}
                        </span>
                        {complaint.images && complaint.images.length > 0 && (
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
                            theme === 'light' ? 'bg-gray-100 text-gray-600' : 'bg-gray-800 text-gray-400'
                          }`}>
                            <ImageIcon className="w-3 h-3" />
                            {complaint.images.length}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {myComplaints.length === 0 && (
        <div className={`text-center py-16 rounded-2xl border ${
          theme === 'light'
            ? 'bg-gray-50 border-gray-200'
            : 'bg-[#1a1433] border-[#3d3066]'
        }`}>
          <AlertCircle className={`w-16 h-16 mx-auto mb-4 ${
            theme === 'light' ? 'text-gray-400' : 'text-gray-600'
          }`} />
          <h3 className={`text-xl mb-2 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            No complaints yet
          </h3>
          <p className={`${
            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            You haven't submitted any reports. Report issues to track them here.
          </p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedComplaint && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedComplaint(null)}
        >
          <div 
            className={`max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${
              theme === 'light' ? 'bg-white' : 'bg-[#1a1433]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`sticky top-0 z-10 p-6 border-b flex items-start justify-between ${
              theme === 'light' 
                ? 'bg-white border-gray-200' 
                : 'bg-[#1a1433] border-[#3d3066]'
            }`}>
              <div className="flex-1">
                <h2 className={`text-2xl mb-2 ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  {selectedComplaint.title}
                </h2>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm ${
                    getStatusBadge(selectedComplaint.status).color
                  }`}>
                    {getStatusBadge(selectedComplaint.status).text}
                  </span>
                  <span className={`text-sm ${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {selectedComplaint.category.charAt(0).toUpperCase() + selectedComplaint.category.slice(1)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedComplaint(null)}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'light'
                    ? 'hover:bg-gray-100'
                    : 'hover:bg-[#251e45]'
                }`}
              >
                <X className={`w-5 h-5 ${
                  theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                }`} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
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
                  {selectedComplaint.description}
                </p>
              </div>

              {/* Location & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className={`text-sm mb-2 ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                  }`}>
                    Location
                  </h3>
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-4 h-4 ${
                      theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                    }`} />
                    <span className={`${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      {selectedComplaint.location}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className={`text-sm mb-2 ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                  }`}>
                    Submitted On
                  </h3>
                  <div className="flex items-center gap-2">
                    <Calendar className={`w-4 h-4 ${
                      theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                    }`} />
                    <span className={`${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      {selectedComplaint.date} • {selectedComplaint.time}
                    </span>
                  </div>
                </div>
              </div>

              {/* Images */}
              {selectedComplaint.images && selectedComplaint.images.length > 0 && (
                <div>
                  <h3 className={`text-sm mb-3 ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                  }`}>
                    Uploaded Photos
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedComplaint.images.map((image, idx) => (
                      <img
                        key={idx}
                        src={image}
                        alt={`Evidence ${idx + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Status Timeline */}
              <div>
                <h3 className={`text-sm mb-4 ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                }`}>
                  Status Timeline
                </h3>
                <div className="space-y-4">
                  {selectedComplaint.statusHistory.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${
                          idx === selectedComplaint.statusHistory.length - 1
                            ? theme === 'light'
                              ? 'bg-[#ff6b35]'
                              : 'bg-[#a78bfa]'
                            : theme === 'light'
                              ? 'bg-green-500'
                              : 'bg-green-400'
                        }`} />
                        {idx < selectedComplaint.statusHistory.length - 1 && (
                          <div className={`w-0.5 h-12 ${
                            theme === 'light' ? 'bg-gray-300' : 'bg-[#3d3066]'
                          }`} />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className={`mb-1 ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>
                          {item.status}
                        </p>
                        <p className={`text-sm ${
                          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {item.date}
                        </p>
                        {item.note && (
                          <p className={`text-sm mt-1 ${
                            theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                          }`}>
                            {item.note}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
