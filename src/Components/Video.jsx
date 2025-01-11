import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import video from "../Assets/video.mp4";

const Video = () => {
  const [videoEnded, setVideoEnded] = useState(false); // Track video state
  const [fadeOut, setFadeOut] = useState(false); // Control fade effect
  const [isMuted, setIsMuted] = useState(true); // Mute state
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const videoRef = useRef(null); // Reference to the video element
  const navigate = useNavigate();

  // Toggle audio mute
  const toggleMute = () => {
    setIsMuted(prevMuted => {
      const newMuted = !prevMuted;
      if (videoRef.current) {
        videoRef.current.muted = newMuted;
      }
      return newMuted;
    });
  };

  // Handle video end
  const handleVideoEnd = () => {
    setFadeOut(true);
    setTimeout(() => {
      setVideoEnded(true);
      navigate('/'); // Navigate to the home page
    }, 1000); // Smooth transition
  };

  // Start playback when enough data is loaded
  const handleCanPlay = () => {
    setIsLoading(false); // Video is ready to play
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  // Show loading spinner if buffering occurs
  const handleBuffering = () => {
    setIsLoading(true);
  };

  const handlePlaying = () => {
    setIsLoading(false); // Remove spinner when video resumes playing
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted; // Ensure muted state is synchronized
    }
  }, [isMuted]);

  return (
    <div className={`main relative h-screen w-screen ${videoEnded ? 'bg-black' : ''}`}>
      {!videoEnded && (
        <div
          className={`video-container h-full w-full ${
            fadeOut ? 'opacity-0' : 'opacity-100'
          } transition-opacity duration-1000`}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
              <div className="spinner border-4 border-t-4 border-gray-200 rounded-full w-12 h-12 animate-spin"></div>
              <p className="text-white text-sm mt-4">Loading...</p>
            </div>
          )}
          <video
            className="video object-cover w-full h-full md:h-auto md:w-auto md:aspect-video"
            ref={videoRef}
            muted={isMuted}
            preload="auto"
            onEnded={handleVideoEnd}
            onCanPlay={handleCanPlay} // Handle video readiness
            onWaiting={handleBuffering} // Handle buffering state
            onPlaying={handlePlaying} // Handle playback resume
            onLoadedMetadata={() => {
              if (videoRef.current) {
                videoRef.current.playbackRate = 1.75; // Set playback speed
              }
            }}
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Mute/Unmute Button */}
          {!isLoading && (
            <button
              onClick={toggleMute}
              className="absolute bottom-10 left-10 bg-black text-white py-2 px-4 rounded shadow-md hover:bg-gray-800 transition duration-200"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? 'Unmute' : 'Mute'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Video;
