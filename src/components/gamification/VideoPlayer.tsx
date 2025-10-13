import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';

interface VideoPlayerProps {
  url: string;
  title?: string;
  thumbnail?: string;
  autoplay?: boolean;
  onComplete?: () => void;
  onProgress?: (progress: number) => void;
  maxDuration?: number; // in seconds, for micro-learning (30-90s)
}

/**
 * Simple Video Player for embedded training videos
 * Supports standard video formats (mp4, webm, etc.)
 * For YouTube/Vimeo, use ReactPlayer separately
 */
const VideoPlayerSimple: React.FC<VideoPlayerProps> = ({
  url,
  title,
  thumbnail,
  autoplay = false,
  onComplete,
  onProgress,
  maxDuration,
}) => {
  const [playing, setPlaying] = useState(autoplay);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
      onProgress?.(currentProgress);

      // Check if video is near complete
      if (currentProgress >= 98) {
        onComplete?.();
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = (newProgress / 100) * videoRef.current.duration;
      setProgress(newProgress);
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setProgress(0);
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className="relative bg-black rounded-lg overflow-hidden shadow-2xl"
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => playing && setShowControls(false)}
    >
      {/* Video Title */}
      {title && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showControls ? 1 : 0 }}
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black to-transparent p-4 z-10"
        >
          <h3 className="text-white font-semibold">{title}</h3>
          {maxDuration && (
            <span className="text-xs text-blue-400">Quick Learn - {maxDuration}s</span>
          )}
        </motion.div>
      )}

      {/* Video Element */}
      <video
        ref={videoRef}
        src={url}
        poster={thumbnail}
        className="w-full h-full"
        onTimeUpdate={handleTimeUpdate}
        autoPlay={autoplay}
        muted={muted}
        playsInline
      />

      {/* Custom Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 z-10"
      >
        {/* Progress Bar */}
        <div className="mb-3">
          <input
            type="range"
            min={0}
            max={100}
            step={0.1}
            value={progress}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-xs text-white mt-1">
            <span>{formatTime(videoRef.current?.currentTime || 0)}</span>
            <span>{formatTime(videoRef.current?.duration || 0)}</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Play/Pause */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePlayPause}
              className="w-10 h-10 flex items-center justify-center bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-colors"
            >
              {playing ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white ml-0.5" />
              )}
            </motion.button>

            {/* Restart */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleRestart}
              className="w-8 h-8 flex items-center justify-center bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-white" />
            </motion.button>

            {/* Mute/Unmute */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMute}
              className="w-8 h-8 flex items-center justify-center bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-colors"
            >
              {muted ? (
                <VolumeX className="w-4 h-4 text-white" />
              ) : (
                <Volume2 className="w-4 h-4 text-white" />
              )}
            </motion.button>
          </div>

          {/* Progress Percentage */}
          <div className="text-white text-sm font-semibold">
            {Math.round(progress)}% Complete
          </div>
        </div>
      </motion.div>

      {/* Completion Badge */}
      {progress >= 98 && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg pointer-events-none"
        >
          <span className="font-bold">Video Complete!</span>
        </motion.div>
      )}
    </div>
  );
};

// Export as default with the name VideoPlayer
export default VideoPlayerSimple;
