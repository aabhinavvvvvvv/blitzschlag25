import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import video from "../Assets/video.mp4";

const Video = () => {
  const [videoEnded, setVideoEnded] = useState(false); // Track video state
  const [fadeOut, setFadeOut] = useState(false); // Control fade effect
  const [isMuted, setIsMuted] = useState(true); // Mute state
  const [isLoaded, setIsLoaded] = useState(false); // Track if video is loaded
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

  // Ensure the video is only playing when loaded
  useEffect(() => {
    if (isLoaded && videoRef.current) {
      videoRef.current.play();
    }
  }, [isLoaded]);

  return (
    <div className={`main relative h-screen w-screen ${videoEnded ? 'bg-black' : ''}`}>
      {!videoEnded && (
        <div
          className={`video-container h-full w-full ${
            fadeOut ? 'opacity-0' : 'opacity-100'
          } transition-opacity duration-1000`}
        >
          <video
            className="video object-cover w-full h-full md:h-auto md:w-auto md:aspect-video"
            ref={videoRef}
            muted={isMuted}
            preload="auto" // Automatically preload metadata and enough data to play the video
            onEnded={handleVideoEnd}
            onCanPlay={() => setIsLoaded(true)} // Ensure the video is ready to play
            onLoadedMetadata={() => {
              if (videoRef.current) {
                videoRef.current.playbackRate = 1.75; // Set playback speed
              }
            }}
            autoPlay={isLoaded} // Only autoplay if fully loaded
             // Added video controls for accessibility
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Mute/Unmute Button */}
          <button
            onClick={toggleMute}
            className="absolute bottom-10 left-10 bg-black text-white py-2 px-4 rounded shadow-md hover:bg-gray-800 transition duration-200"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'} // Improved accessibility
          >
            {isMuted ? 'Unmute' : 'Mute'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Video;
