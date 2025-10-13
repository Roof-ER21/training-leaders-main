/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video,
  Mic,
  Square,
  Play,
  Pause,
  RotateCcw,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  Loader,
  Download,
  AlertTriangle,
  Camera,
} from 'lucide-react';

interface SalesPitchRecorderProps {
  isOpen: boolean;
  onClose: () => void;
  moduleName: string;
  moduleId: string;
  userName?: string;
  userEmail?: string;
}

type RecordingMode = 'audio' | 'video';
type RecordingState = 'idle' | 'recording' | 'paused' | 'stopped';

const MAX_RECORDING_TIME = 300; // 5 minutes in seconds

const SalesPitchRecorder: React.FC<SalesPitchRecorderProps> = ({
  isOpen,
  onClose,
  moduleName,
  moduleId,
  userName = 'Unknown User',
  userEmail = '',
}) => {
  const [recordingMode, setRecordingMode] = useState<RecordingMode>('audio');
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);
  const videoPreviewRef = useRef<HTMLVideoElement | null>(null);

  // Initialize media stream when mode changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isOpen && recordingState === 'idle') {
      initializeStream();
    }

    return () => {
      cleanupStream();
    };
  }, [isOpen, recordingMode]);

  // Timer effect
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (recordingState === 'recording') {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= MAX_RECORDING_TIME) {
            stopRecording();
            return MAX_RECORDING_TIME;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [recordingState]);

  const initializeStream = async () => {
    try {
      const constraints: MediaStreamConstraints =
        recordingMode === 'video'
          ? {
              video: {
                width: { ideal: 1280 },
                height: { ideal: 720 },
                facingMode: 'user',
              },
              audio: {
                echoCancellation: true,
                noiseSuppression: true,
                sampleRate: 44100,
              },
            }
          : {
              audio: {
                echoCancellation: true,
                noiseSuppression: true,
                sampleRate: 44100,
              },
            };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      // Show video preview for video mode
      if (recordingMode === 'video' && videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = stream;
        videoPreviewRef.current.play();
      }
    } catch (error) {
      console.error('Error accessing media devices:', error);
      setErrorMessage(
        'Could not access camera/microphone. Please check permissions.'
      );
    }
  };

  const cleanupStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoPreviewRef.current) {
      videoPreviewRef.current.srcObject = null;
    }
  };

  const startRecording = async () => {
    try {
      if (!streamRef.current) {
        await initializeStream();
      }

      if (!streamRef.current) {
        throw new Error('Could not initialize media stream');
      }

      chunksRef.current = [];
      const mimeType =
        recordingMode === 'video'
          ? 'video/webm;codecs=vp8,opus'
          : 'audio/webm;codecs=opus';

      const mediaRecorder = new MediaRecorder(streamRef.current, {
        mimeType: MediaRecorder.isTypeSupported(mimeType)
          ? mimeType
          : undefined,
      });

      mediaRecorder.ondataavailable = event => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: recordingMode === 'video' ? 'video/webm' : 'audio/webm',
        });
        setRecordedBlob(blob);
        const url = URL.createObjectURL(blob);
        setRecordedUrl(url);

        // Store in localStorage for persistence
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result as string;
          localStorage.setItem(
            `recording_${moduleId}_${Date.now()}`,
            JSON.stringify({
              data: base64data,
              type: blob.type,
              timestamp: new Date().toISOString(),
              moduleName,
              userName,
            })
          );
        };
        reader.readAsDataURL(blob);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(1000); // Collect data every second
      setRecordingState('recording');
      setRecordingTime(0);
      setSubmitStatus('idle');
    } catch (error) {
      console.error('Error starting recording:', error);
      setErrorMessage('Failed to start recording. Please try again.');
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.pause();
      setRecordingState('paused');
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current?.state === 'paused') {
      mediaRecorderRef.current.resume();
      setRecordingState('recording');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state !== 'inactive') {
      mediaRecorderRef.current?.stop();
      setRecordingState('stopped');
      cleanupStream();
    }
  };

  const resetRecording = () => {
    if (recordedUrl) {
      URL.revokeObjectURL(recordedUrl);
    }
    setRecordedBlob(null);
    setRecordedUrl(null);
    setRecordingState('idle');
    setRecordingTime(0);
    setIsPlaying(false);
    setSubmitStatus('idle');
    setErrorMessage('');
    chunksRef.current = [];
    initializeStream();
  };

  const playRecording = () => {
    if (recordingMode === 'audio' && audioPlayerRef.current) {
      if (isPlaying) {
        audioPlayerRef.current.pause();
      } else {
        audioPlayerRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else if (recordingMode === 'video' && videoPlayerRef.current) {
      if (isPlaying) {
        videoPlayerRef.current.pause();
      } else {
        videoPlayerRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const downloadRecording = () => {
    if (recordedBlob) {
      const url = URL.createObjectURL(recordedBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sales-pitch-${moduleId}-${Date.now()}.${recordingMode === 'video' ? 'webm' : 'webm'}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const submitRecording = async () => {
    if (!recordedBlob) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Convert blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(recordedBlob);

      reader.onloadend = async () => {
        const base64data = reader.result as string;

        // In a real implementation, you would send this to your backend
        // For now, we'll simulate the submission
        const submissionData = {
          userName,
          userEmail,
          moduleName,
          moduleId,
          recordingType: recordingMode,
          timestamp: new Date().toISOString(),
          duration: recordingTime,
          recordingData: base64data.substring(0, 100) + '...', // Truncate for demo
        };

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Save to localStorage as backup
        localStorage.setItem(
          `submission_${moduleId}_${Date.now()}`,
          JSON.stringify(submissionData)
        );

        console.log('Recording submitted:', submissionData);

        setIsSubmitting(false);
        setSubmitStatus('success');

        // Auto-close after success
        setTimeout(() => {
          onClose();
        }, 3000);
      };

      reader.onerror = () => {
        throw new Error('Failed to read recording data');
      };
    } catch (error) {
      console.error('Error submitting recording:', error);
      setIsSubmitting(false);
      setSubmitStatus('error');
      setErrorMessage(
        'Failed to submit recording. Please try again or download the file.'
      );
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const timeRemaining = MAX_RECORDING_TIME - recordingTime;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Record Sales Pitch
                </h2>
                <p className="text-purple-100">
                  Module: {moduleName} | Max Time: 5 minutes
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-purple-800 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Mode Selection */}
            {recordingState === 'idle' && !recordedBlob && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Choose Recording Mode:
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setRecordingMode('audio')}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      recordingMode === 'audio'
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <Mic
                      className={`w-12 h-12 mx-auto mb-3 ${
                        recordingMode === 'audio'
                          ? 'text-purple-600'
                          : 'text-gray-400'
                      }`}
                    />
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Audio Only
                    </h4>
                    <p className="text-sm text-gray-600">
                      Record voice pitch (smaller file size)
                    </p>
                  </button>

                  <button
                    onClick={() => setRecordingMode('video')}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      recordingMode === 'video'
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <Video
                      className={`w-12 h-12 mx-auto mb-3 ${
                        recordingMode === 'video'
                          ? 'text-purple-600'
                          : 'text-gray-400'
                      }`}
                    />
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Video & Audio
                    </h4>
                    <p className="text-sm text-gray-600">
                      Record full presentation with video
                    </p>
                  </button>
                </div>
              </div>
            )}

            {/* Recording Preview/Display Area */}
            <div className="mb-8">
              {/* Video Preview (during recording) */}
              {recordingMode === 'video' &&
                recordingState !== 'stopped' &&
                !recordedBlob && (
                  <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
                    <video
                      ref={videoPreviewRef}
                      autoPlay
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    {recordingState === 'recording' && (
                      <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-600 text-white px-3 py-1 rounded-full">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        <span className="text-sm font-medium">RECORDING</span>
                      </div>
                    )}
                  </div>
                )}

              {/* Audio Visualization (during recording) */}
              {recordingMode === 'audio' &&
                recordingState !== 'stopped' &&
                !recordedBlob && (
                  <div className="relative bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg p-12">
                    <div className="text-center text-white">
                      <Mic className="w-20 h-20 mx-auto mb-4" />
                      {recordingState === 'recording' && (
                        <>
                          <div className="text-2xl font-bold mb-2">
                            RECORDING...
                          </div>
                          <div className="flex justify-center space-x-2">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className="w-2 bg-white rounded-full animate-pulse"
                                style={{
                                  height: `${Math.random() * 40 + 20}px`,
                                  animationDelay: `${i * 0.1}s`,
                                }}
                              />
                            ))}
                          </div>
                        </>
                      )}
                      {recordingState === 'idle' && (
                        <div className="text-xl">Ready to record</div>
                      )}
                      {recordingState === 'paused' && (
                        <div className="text-xl">Recording Paused</div>
                      )}
                    </div>
                  </div>
                )}

              {/* Playback */}
              {recordedBlob && (
                <div className="bg-gray-50 rounded-lg p-6">
                  {recordingMode === 'video' ? (
                    <video
                      ref={videoPlayerRef}
                      src={recordedUrl || undefined}
                      controls
                      className="w-full rounded-lg"
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onEnded={() => setIsPlaying(false)}
                    />
                  ) : (
                    <div className="text-center">
                      <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mic className="w-10 h-10 text-white" />
                      </div>
                      <audio
                        ref={audioPlayerRef}
                        src={recordedUrl || undefined}
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
              )}
            </div>

            {/* Timer Display */}
            {recordingState !== 'idle' && (
              <div className="mb-6 flex items-center justify-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <span className="text-lg font-semibold text-gray-900">
                    {formatTime(recordingTime)}
                  </span>
                </div>
                {recordingState === 'recording' && (
                  <div className="text-sm text-gray-600">
                    Time remaining: {formatTime(timeRemaining)}
                  </div>
                )}
              </div>
            )}

            {/* Control Buttons */}
            <div className="flex justify-center space-x-4 mb-6">
              {recordingState === 'idle' && !recordedBlob && (
                <button
                  onClick={startRecording}
                  className="px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2 text-lg font-semibold"
                >
                  {recordingMode === 'video' ? (
                    <Camera className="w-6 h-6" />
                  ) : (
                    <Mic className="w-6 h-6" />
                  )}
                  <span>Start Recording</span>
                </button>
              )}

              {recordingState === 'recording' && (
                <>
                  <button
                    onClick={pauseRecording}
                    className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center space-x-2"
                  >
                    <Pause className="w-5 h-5" />
                    <span>Pause</span>
                  </button>
                  <button
                    onClick={stopRecording}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                  >
                    <Square className="w-5 h-5" />
                    <span>Stop</span>
                  </button>
                </>
              )}

              {recordingState === 'paused' && (
                <>
                  <button
                    onClick={resumeRecording}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <Play className="w-5 h-5" />
                    <span>Resume</span>
                  </button>
                  <button
                    onClick={stopRecording}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                  >
                    <Square className="w-5 h-5" />
                    <span>Stop</span>
                  </button>
                </>
              )}

              {recordingState === 'stopped' && recordedBlob && (
                <>
                  <button
                    onClick={resetRecording}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                  >
                    <RotateCcw className="w-5 h-5" />
                    <span>Re-record</span>
                  </button>
                  <button
                    onClick={downloadRecording}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download</span>
                  </button>
                  <button
                    onClick={submitRecording}
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Submit</span>
                      </>
                    )}
                  </button>
                </>
              )}
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-green-900">
                    Recording submitted successfully!
                  </p>
                  <p className="text-sm text-green-700">
                    Your manager will review it shortly.
                  </p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
                <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold text-red-900">
                    Submission failed
                  </p>
                  <p className="text-sm text-red-700">{errorMessage}</p>
                </div>
              </div>
            )}

            {errorMessage && submitStatus === 'idle' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center space-x-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                <p className="text-sm text-yellow-800">{errorMessage}</p>
              </div>
            )}

            {/* Instructions */}
            {recordingState === 'idle' && !recordedBlob && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Recording Tips:
                </h4>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                  <li>Find a quiet location with good lighting (for video)</li>
                  <li>Practice your pitch before recording</li>
                  <li>
                    Speak clearly and confidently as if talking to a real
                    customer
                  </li>
                  <li>
                    Include key points from the module you just completed
                  </li>
                  <li>You can pause and resume if needed</li>
                  <li>Review your recording before submitting</li>
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SalesPitchRecorder;
