import { Wrench, User, Calendar, Clock, ChevronRight } from 'lucide-react';

interface MaintenanceTask {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  scheduledDate: string;
  estimatedTime: string;
  status: 'scheduled' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  location: string;
  category: string;
}

interface MaintenanceSectionProps {
  theme: 'light' | 'dark';
  tasks: MaintenanceTask[];
}

export function MaintenanceSection({ theme, tasks }: MaintenanceSectionProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'in-progress': return '#0ea5e9';
      case 'scheduled': return '#fbbf24';
      default: return '#6b7280';
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
      <div className={`px-5 py-4 border-b ${
        theme === 'light' ? 'border-gray-200' : 'border-[#3d3066]'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wrench className={`w-5 h-5 ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`} />
            <h3 className={`${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Maintenance Scheduling
            </h3>
          </div>
          <button className={`px-4 py-2 rounded-lg transition-colors ${
            theme === 'light'
              ? 'bg-[#ff6b35] text-white hover:bg-[#ff5522]'
              : 'bg-[#a78bfa] text-white hover:bg-[#9370f0]'
          }`}>
            New Task
          </button>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {tasks.map((task) => {
          const statusColor = getStatusColor(task.status);
          const priorityColor = getPriorityColor(task.priority);

          return (
            <div
              key={task.id}
              className={`p-4 rounded-lg border transition-all hover:shadow-md cursor-pointer ${
                theme === 'light'
                  ? 'bg-gray-50 border-gray-200 hover:border-gray-300'
                  : 'bg-[#1a1433] border-[#3d3066] hover:border-[#4d4076]'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                  <h4 className={`mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    {task.title}
                  </h4>
                  <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    {task.description}
                  </p>
                </div>
                <ChevronRight className={`w-5 h-5 shrink-0 ${
                  theme === 'light' ? 'text-gray-400' : 'text-gray-600'
                }`} />
              </div>

              {/* Status and Priority */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="px-2 py-1 rounded-full text-xs capitalize"
                  style={{ 
                    backgroundColor: `${statusColor}20`,
                    color: statusColor
                  }}
                >
                  {task.status.replace('-', ' ')}
                </span>
                <span
                  className="px-2 py-1 rounded-full text-xs capitalize"
                  style={{ 
                    backgroundColor: `${priorityColor}20`,
                    color: priorityColor
                  }}
                >
                  {task.priority}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-2">
                <div className={`flex items-center gap-2 text-sm ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  <User className="w-4 h-4" />
                  <span>{task.assignedTo}</span>
                </div>
                <div className={`flex items-center gap-2 text-sm ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  <Calendar className="w-4 h-4" />
                  <span>{task.scheduledDate}</span>
                </div>
                <div className={`flex items-center gap-2 text-sm ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  <Clock className="w-4 h-4" />
                  <span>{task.estimatedTime}</span>
                </div>
              </div>

              {/* Footer */}
              <div className={`mt-3 pt-3 border-t flex items-center justify-between ${
                theme === 'light' ? 'border-gray-200' : 'border-[#3d3066]'
              }`}>
                <span className={`text-xs ${
                  theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  {task.location}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  theme === 'light' 
                    ? 'bg-gray-200 text-gray-700' 
                    : 'bg-[#251e45] text-gray-400'
                }`}>
                  {task.category}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
