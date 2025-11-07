import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  User,
  BookOpen,
  MessageSquare,
  Filter,
  Search,
  Trash2,
  Eye,
  Send,
} from 'lucide-react';
import {
  recordingStorage,
  RecordingMetadata,
  StoredRecording,
} from '../../services/recordingStorage';
import { emailSubmissionService } from '../../services/emailSubmission';

interface RecordingManagementProps {
  isAdmin?: boolean;
}

const RecordingManagement: React.FC<RecordingManagementProps> = ({
  isAdmin = true,
}) => {
  const [recordings, setRecordings] = useState<RecordingMetadata[]>([]);
  const [filteredRecordings, setFilteredRecordings] = useState<
    RecordingMetadata[]
  >([]);
  const [selectedRecording, setSelectedRecording] =
    useState<StoredRecording | null>(null);
  const [statusFilter, setStatusFilter] = useState<
    'all' | RecordingMetadata['status']
  >('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackRecording, setFeedbackRecording] =
    useState<RecordingMetadata | null>(null);
  const [storageStats, setStorageStats] = useState(
    recordingStorage.getStorageStats()
  );

  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    loadRecordings();
  }, []);

  useEffect(() => {
    filterRecordings();
  }, [recordings, statusFilter, searchTerm]);

  const loadRecordings = () => {
    const allRecordings = recordingStorage.getAllRecordingMetadata();
    setRecordings(allRecordings);
    setStorageStats(recordingStorage.getStorageStats());
  };

  const filterRecordings = () => {
    let filtered = recordings;

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(r => r.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        r =>
          r.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.moduleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredRecordings(filtered);
  };

  const handleViewRecording = (recording: RecordingMetadata) => {
    const fullRecording = recordingStorage.getRecording(recording.id);
    if (fullRecording) {
      setSelectedRecording(fullRecording);
      setIsPlaying(false);
    }
  };

  const playRecording = () => {
    if (!selectedRecording) return;

    if (selectedRecording.recordingType === 'audio' && audioPlayerRef.current) {
      if (isPlaying) {
        audioPlayerRef.current.pause();
      } else {
        audioPlayerRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else if (
      selectedRecording.recordingType === 'video' &&
      videoPlayerRef.current
    ) {
      if (isPlaying) {
        videoPlayerRef.current.pause();
      } else {
        videoPlayerRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const downloadRecording = (recording: RecordingMetadata) => {
    const fullRecording = recordingStorage.getRecording(recording.id);
    if (!fullRecording) return;

    const blob = recordingStorage.base64ToBlob(fullRecording.dataUrl);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${recording.userName}-${recording.moduleId}-${Date.now()}.${recording.recordingType === 'video' ? 'webm' : 'webm'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const updateRecordingStatus = (
    recordingId: string,
    status: RecordingMetadata['status'],
    feedbackText?: string
  ) => {
    const success = recordingStorage.updateRecordingMetadata(recordingId, {
      status,
      feedback: feedbackText,
      reviewedBy: 'Admin',
      reviewedAt: new Date().toISOString(),
    });

    if (success) {
      loadRecordings();
      if (selectedRecording?.id === recordingId) {
        const updated = recordingStorage.getRecording(recordingId);
        if (updated) setSelectedRecording(updated);
      }
    }
  };

  const handleSendFeedback = async () => {
    if (!feedbackRecording || !feedback) return;

    // Update recording with feedback
    updateRecordingStatus(
      feedbackRecording.id,
      'reviewed',
      feedback
    );

    // Send email (if configured)
    await emailSubmissionService.sendFeedbackEmail(
      feedbackRecording.userEmail,
      feedbackRecording.userName,
      feedbackRecording.moduleName,
      feedback,
      'approved'
    );

    setShowFeedbackModal(false);
    setFeedback('');
    setFeedbackRecording(null);
  };

  const deleteRecording = (recordingId: string) => {
    if (window.confirm('Are you sure you want to delete this recording?')) {
      recordingStorage.deleteRecording(recordingId);
      loadRecordings();
      if (selectedRecording?.id === recordingId) {
        setSelectedRecording(null);
      }
    }
  };

  const cleanupOldRecordings = () => {
    const deleted = recordingStorage.deleteOldRecordings(30);
    alert(`Deleted ${deleted} recordings older than 30 days`);
    loadRecordings();
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getStatusColor = (status: RecordingMetadata['status']): string => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'reviewed':
        return 'bg-purple-100 text-purple-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600">
            You don't have permission to view this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sales Pitch Recording Management
          </h1>
          <p className="text-gray-600">
            Review and provide feedback on trainee recordings
          </p>
        </div>

        {/* Storage Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Recordings</p>
                <p className="text-2xl font-bold text-gray-900">
                  {storageStats.totalRecordings}
                </p>
              </div>
              <Eye className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {storageStats.pendingRecordings}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Reviewed</p>
                <p className="text-2xl font-bold text-purple-600">
                  {storageStats.reviewedRecordings}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Storage Used</p>
                <p className="text-lg font-bold text-gray-900">
                  {storageStats.totalSizeFormatted}
                </p>
                <p className="text-xs text-gray-500">
                  {storageStats.percentUsed.toFixed(1)}% used
                </p>
              </div>
              <div className="w-8 h-8 flex items-center justify-center">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${storageStats.percentUsed}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-6 shadow mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, email, or module..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={e =>
                  setStatusFilter(e.target.value as typeof statusFilter)
                }
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="submitted">Submitted</option>
                <option value="reviewed">Reviewed</option>
                <option value="approved">Approved</option>
              </select>
            </div>

            {/* Cleanup Button */}
            <button
              onClick={cleanupOldRecordings}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Cleanup Old</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recordings List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recordings ({filteredRecordings.length})
                </h2>
              </div>

              <div className="overflow-y-auto" style={{ maxHeight: '600px' }}>
                {filteredRecordings.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    No recordings found
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {filteredRecordings.map(recording => (
                      <div
                        key={recording.id}
                        onClick={() => handleViewRecording(recording)}
                        className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedRecording?.id === recording.id
                            ? 'bg-blue-50'
                            : ''
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="font-medium text-gray-900 text-sm">
                              {recording.userName}
                            </span>
                          </div>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getStatusColor(recording.status)}`}
                          >
                            {recording.status}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                          <BookOpen className="w-3 h-3" />
                          <span className="truncate">{recording.moduleName}</span>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatDuration(recording.duration)}
                          </span>
                          <span>{new Date(recording.timestamp).toLocaleDateString()}</span>
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {recording.recordingType}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recording Details & Player */}
          <div className="lg:col-span-2">
            {selectedRecording ? (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedRecording.userName}'s Recording
                    </h2>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedRecording.status)}`}
                    >
                      {selectedRecording.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Email:</span>
                      <span className="ml-2 text-gray-900">
                        {selectedRecording.userEmail}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Module:</span>
                      <span className="ml-2 text-gray-900">
                        {selectedRecording.moduleName}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Duration:</span>
                      <span className="ml-2 text-gray-900">
                        {formatDuration(selectedRecording.duration)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Type:</span>
                      <span className="ml-2 text-gray-900 capitalize">
                        {selectedRecording.recordingType}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Submitted:</span>
                      <span className="ml-2 text-gray-900">
                        {formatDate(selectedRecording.timestamp)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Size:</span>
                      <span className="ml-2 text-gray-900">
                        {recordingStorage.formatSize(selectedRecording.size)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Player */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  {selectedRecording.recordingType === 'video' ? (
                    <video
                      ref={videoPlayerRef}
                      src={selectedRecording.dataUrl}
                      controls
                      className="w-full rounded-lg"
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onEnded={() => setIsPlaying(false)}
                    />
                  ) : (
                    <div className="text-center">
                      <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Play className="w-10 h-10 text-white" />
                      </div>
                      <audio
                        ref={audioPlayerRef}
                        src={selectedRecording.dataUrl}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onEnded={() => setIsPlaying(false)}
                        className="hidden"
                      />
                      <button
                        onClick={playRecording}
                        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2 mx-auto"
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="w-5 h-5" />
                            <span>Pause</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-5 h-5" />
                            <span>Play Recording</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Feedback Section */}
                {selectedRecording.feedback && (
                  <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
                    <div className="flex items-start space-x-3">
                      <MessageSquare className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-blue-900 mb-1">
                          Manager Feedback
                        </p>
                        <p className="text-blue-800 text-sm">
                          {selectedRecording.feedback}
                        </p>
                        {selectedRecording.reviewedAt && (
                          <p className="text-blue-700 text-xs mt-2">
                            Reviewed on {formatDate(selectedRecording.reviewedAt)}{' '}
                            by {selectedRecording.reviewedBy}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => downloadRecording(selectedRecording)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>

                  <button
                    onClick={() => {
                      setFeedbackRecording(selectedRecording);
                      setFeedback(selectedRecording.feedback || '');
                      setShowFeedbackModal(true);
                    }}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Provide Feedback</span>
                  </button>

                  <button
                    onClick={() =>
                      updateRecordingStatus(selectedRecording.id, 'approved')
                    }
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Approve</span>
                  </button>

                  <button
                    onClick={() => deleteRecording(selectedRecording.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Recording Selected
                </h3>
                <p className="text-gray-600">
                  Select a recording from the list to view and review it
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Feedback Modal */}
        {showFeedbackModal && feedbackRecording && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Provide Feedback for {feedbackRecording.userName}
              </h3>

              <textarea
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                placeholder="Enter your feedback here..."
                className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-4"
              />

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowFeedbackModal(false);
                    setFeedback('');
                    setFeedbackRecording(null);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendFeedback}
                  disabled={!feedback.trim()}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Feedback</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordingManagement;
