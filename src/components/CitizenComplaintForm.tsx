import { useState } from 'react';
import { 
  MapPin, 
  Camera, 
  Upload, 
  X, 
  Loader, 
  CheckCircle2, 
  Locate,
  AlertCircle,
  Lightbulb,
  Navigation,
  Droplet,
  Trash2
} from 'lucide-react';
import { TrustIndexBadge } from './TrustIndexBadge';

interface CitizenComplaintFormProps {
  theme: 'light' | 'dark';
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
  trustScore?: number;
}

export function CitizenComplaintForm({ theme, onSubmit, onCancel, trustScore = 85 }: CitizenComplaintFormProps) {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    location: '',
    urgency: 'medium',
  });
  
  const [photos, setPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);

  const categories = [
    { id: 'streetlights', label: 'Streetlights', icon: Lightbulb, color: '#fbbf24' },
    { id: 'traffic', label: 'Traffic Signals', icon: Navigation, color: '#ef4444' },
    { id: 'water', label: 'Water Supply', icon: Droplet, color: '#0ea5e9' },
    { id: 'waste', label: 'Waste Management', icon: Trash2, color: '#10b981' },
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files).map(file => URL.createObjectURL(file));
      setPhotos([...photos, ...newPhotos]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleDetectLocation = () => {
    setDetectingLocation(true);
    // Simulate location detection
    setTimeout(() => {
      setFormData({ ...formData, location: '123 Main Street, Downtown' });
      setDetectingLocation(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onSubmit?.(formData);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className={`max-w-2xl mx-auto p-8 rounded-2xl border text-center ${
        theme === 'light'
          ? 'bg-white border-gray-200'
          : 'bg-[#1a1433] border-[#3d3066]'
      }`}>
        <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
          theme === 'light'
            ? 'bg-green-100'
            : 'bg-green-900/30'
        }`}>
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        
        <h2 className={`text-2xl mb-2 ${
          theme === 'light' ? 'text-gray-900' : 'text-white'
        }`}>
          Report Submitted Successfully!
        </h2>
        
        <p className={`mb-6 ${
          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
        }`}>
          Your complaint has been received and is under review.
        </p>

        {/* Status Timeline */}
        <div className={`p-4 rounded-xl mb-6 ${
          theme === 'light'
            ? 'bg-gray-50 border border-gray-200'
            : 'bg-[#251e45] border-[#3d3066]'
        }`}>
          <h3 className={`text-sm mb-3 ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-300'
          }`}>
            Complaint Status
          </h3>
          <div className="flex items-center justify-center gap-2">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mb-1">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <span className={`text-xs ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                Submitted
              </span>
            </div>
            
            <div className={`h-0.5 w-16 ${
              theme === 'light' ? 'bg-gray-300' : 'bg-gray-600'
            }`} />
            
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-1 ${
                theme === 'light'
                  ? 'border-gray-300 bg-white'
                  : 'border-gray-600 bg-[#1a1433]'
              }`}>
                <span className="w-2 h-2 rounded-full bg-gray-400" />
              </div>
              <span className={`text-xs ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                Under Review
              </span>
            </div>
            
            <div className={`h-0.5 w-16 ${
              theme === 'light' ? 'bg-gray-300' : 'bg-gray-600'
            }`} />
            
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-1 ${
                theme === 'light'
                  ? 'border-gray-300 bg-white'
                  : 'border-gray-600 bg-[#1a1433]'
              }`}>
                <span className="w-2 h-2 rounded-full bg-gray-400" />
              </div>
              <span className={`text-xs ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                Resolved
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setIsSubmitted(false)}
            className={`w-full py-3 rounded-lg transition-all ${
              theme === 'light'
                ? 'bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white hover:shadow-lg'
                : 'bg-gradient-to-r from-[#a78bfa] to-[#818cf8] text-white hover:shadow-lg'
            }`}
          >
            Submit Another Report
          </button>
          
          <button
            onClick={onCancel}
            className={`w-full py-3 rounded-lg transition-colors ${
              theme === 'light'
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-[#251e45] text-gray-300 hover:bg-[#3d3066]'
            }`}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-4xl mx-auto p-6 rounded-2xl border ${
      theme === 'light'
        ? 'bg-white border-gray-200'
        : 'bg-[#1a1433] border-[#3d3066]'
    }`}>
      {/* Header with Trust Badge */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className={`text-2xl mb-1 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            File a Complaint
          </h2>
          <p className={`text-sm ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            Help us improve your city's infrastructure
          </p>
        </div>
        <TrustIndexBadge theme={theme} score={trustScore} size="medium" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Selection */}
        <div>
          <label className={`block text-sm mb-3 ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-300'
          }`}>
            Issue Category *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories.map(cat => {
              const Icon = cat.icon;
              const isSelected = formData.category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat.id })}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? theme === 'light'
                        ? 'border-[#ff6b35] bg-orange-50'
                        : 'border-[#a78bfa] bg-purple-900/30'
                      : theme === 'light'
                        ? 'border-gray-200 hover:border-gray-300 bg-white'
                        : 'border-[#3d3066] hover:border-[#4d4076] bg-[#251e45]'
                  }`}
                >
                  <Icon 
                    className={`w-6 h-6 mx-auto mb-2 ${
                      isSelected
                        ? theme === 'light' ? 'text-[#ff6b35]' : 'text-[#a78bfa]'
                        : ''
                    }`}
                    style={{ color: !isSelected ? cat.color : undefined }}
                  />
                  <div className={`text-sm ${
                    isSelected
                      ? theme === 'light' ? 'text-[#ff6b35]' : 'text-[#a78bfa]'
                      : theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                  }`}>
                    {cat.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className={`block text-sm mb-2 ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-300'
          }`}>
            Issue Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Brief description of the issue"
            className={`w-full px-4 py-3 rounded-lg border ${
              theme === 'light'
                ? 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                : 'bg-[#251e45] border-[#3d3066] text-white placeholder-gray-500'
            } outline-none focus:ring-2 ${
              theme === 'light' ? 'focus:ring-orange-200' : 'focus:ring-purple-900/50'
            }`}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className={`block text-sm mb-2 ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-300'
          }`}>
            Detailed Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            placeholder="Please provide as much detail as possible..."
            className={`w-full px-4 py-3 rounded-lg border resize-none ${
              theme === 'light'
                ? 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                : 'bg-[#251e45] border-[#3d3066] text-white placeholder-gray-500'
            } outline-none focus:ring-2 ${
              theme === 'light' ? 'focus:ring-orange-200' : 'focus:ring-purple-900/50'
            }`}
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className={`block text-sm mb-2 ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-300'
          }`}>
            Location *
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <MapPin className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                theme === 'light' ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Enter location or pin on map"
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  theme === 'light'
                    ? 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    : 'bg-[#251e45] border-[#3d3066] text-white placeholder-gray-500'
                } outline-none focus:ring-2 ${
                  theme === 'light' ? 'focus:ring-orange-200' : 'focus:ring-purple-900/50'
                }`}
                required
              />
            </div>
            <button
              type="button"
              onClick={handleDetectLocation}
              disabled={detectingLocation}
              className={`px-4 py-3 rounded-lg border-2 transition-colors ${
                theme === 'light'
                  ? 'border-[#ff6b35] text-[#ff6b35] hover:bg-orange-50'
                  : 'border-[#a78bfa] text-[#a78bfa] hover:bg-purple-900/30'
              } disabled:opacity-50`}
            >
              {detectingLocation ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <Locate className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className={`text-xs mt-1 ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-500'
          }`}>
            Tip: Use the location button to auto-detect your current position
          </p>
        </div>

        {/* Photo Upload */}
        <div>
          <label className={`block text-sm mb-2 ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-300'
          }`}>
            Upload Photos (Optional)
          </label>
          
          {/* Upload Area */}
          <label className={`block border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            theme === 'light'
              ? 'border-gray-300 hover:border-[#ff6b35] hover:bg-orange-50'
              : 'border-[#3d3066] hover:border-[#a78bfa] hover:bg-purple-900/20'
          }`}>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
              className="hidden"
            />
            <div className="flex flex-col items-center gap-2">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                theme === 'light'
                  ? 'bg-gray-100'
                  : 'bg-[#251e45]'
              }`}>
                <Camera className={`w-6 h-6 ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`} />
              </div>
              <div>
                <p className={`text-sm ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                }`}>
                  Click to upload photos
                </p>
                <p className={`text-xs ${
                  theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  or drag and drop
                </p>
              </div>
            </div>
          </label>

          {/* Photo Previews */}
          {photos.length > 0 && (
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mt-3">
              {photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img
                    src={photo}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity ${
                      theme === 'light'
                        ? 'bg-red-500 text-white'
                        : 'bg-red-600 text-white'
                    }`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Urgency Selector */}
        <div>
          <label className={`block text-sm mb-3 ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-300'
          }`}>
            Urgency Level
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'low', label: 'Low', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30', border: 'border-green-500' },
              { id: 'medium', label: 'Medium', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900/30', border: 'border-yellow-500' },
              { id: 'high', label: 'High', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30', border: 'border-red-500' },
            ].map(urgency => {
              const isSelected = formData.urgency === urgency.id;
              return (
                <button
                  key={urgency.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, urgency: urgency.id })}
                  className={`py-3 px-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? `${urgency.border} ${urgency.bg}`
                      : theme === 'light'
                        ? 'border-gray-200 hover:border-gray-300 bg-white'
                        : 'border-[#3d3066] hover:border-[#4d4076] bg-[#251e45]'
                  }`}
                >
                  <div className={`text-sm ${
                    isSelected
                      ? urgency.color
                      : theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                  }`}>
                    {urgency.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting || !formData.category || !formData.title || !formData.description || !formData.location}
            className={`flex-1 py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
              isSubmitting || !formData.category || !formData.title || !formData.description || !formData.location
                ? theme === 'light'
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#3d3066] text-gray-600 cursor-not-allowed'
                : theme === 'light'
                  ? 'bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white hover:shadow-lg'
                  : 'bg-gradient-to-r from-[#a78bfa] to-[#818cf8] text-white hover:shadow-lg'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Submit Report
              </>
            )}
          </button>
          
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className={`px-6 py-3 rounded-lg transition-colors ${
                theme === 'light'
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-[#251e45] text-gray-300 hover:bg-[#3d3066]'
              } disabled:opacity-50`}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
