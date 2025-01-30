import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const notifications = [
  { id: 1, title: "🎭 Prom Night", message: "Join us for a magical night filled with music, dance, and unforgettable memories at Blitzschlag 2025!", route: "/prom" },
  { id: 4, title: "🚀 Campus Ambassador", message: "Step up as a Campus Ambassador and be a crucial part of the Blitzschlag team. Applications are open now!", route: "/campus_embassador" },
  // { id: 2, title: "🛠 Workshop Registration", message: "Don't miss out! Register now for hands-on workshops conducted by industry experts during the event.", route: "/event" },
  // { id: 3, title: "🎨 Art Exhibition", message: "Experience the surreal beauty of our vibrant art exhibition, showcasing unique creations at Blitzschlag 2025.", route: "/art-exhibition" },
  { id: 5, title: "🎤 Vishal Mishra Live - 9th Feb", message: "Get ready for an electrifying night! Vishal Mishra is performing live on 9th Feb at Blitzschlag 2025. Book your tickets now!", route: "/pronites" },
];


const NotificationList = () => {
  const controls = useAnimation();
  const containerRef = useRef(null);
  const navigate = useNavigate(); // React Router hook for navigation
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle resizing for mobile view
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const contentHeight = containerRef.current.scrollHeight;

      controls.start({
        y: [0, -contentHeight],
        transition: {
          duration: notifications.length * 6, // Adjust for smoother scroll
          ease: "linear",
          repeat: Infinity,
        },
      });
    }
  }, [controls]);

  if (isMobile) return null; // Hide on mobile

  return (
    <div
      ref={containerRef}
      className="fixed bottom-20 left-4 p-5 rounded-lg shadow-2xl z-50 w-80 h-72 overflow-hidden"
      style={{
        boxShadow: "0 0 15px rgba(255, 215, 0, 0.8), 0 0 30px rgba(255, 223, 0, 0.6)",
      }}
    >
      <motion.div animate={controls} className="space-y-4">
        {[...notifications, ...notifications].map((notification, index) => (
          <div
            key={`${notification.id}-${index}`}
            onClick={() => navigate(notification.route)}
            className="p-4 rounded-lg cursor-pointer"
            style={{
              background: "linear-gradient(135deg, rgba(255, 215, 0, 0.8), rgba(255, 223, 0, 0.6))",
            }}
          >
            {/* Animated Title */}
            <motion.h3
              className="font-semibold text-yellow-900 text-xl cursor-pointer"
              style={{ fontFamily: "'Metal Mania', cursive" }}
              // Redirect on click
              whileHover={{ scale: 1.1, textShadow: "0px 0px 8px rgba(255, 255, 0, 0.8)" }} // Scale effect on hover
              whileTap={{ scale: 1.1 }} // Click animation
              transition={{ type: "spring", stiffness: 200 }}
            >
              {notification.title}
            </motion.h3>

            {/* Notification Message */}
            <p className="text-sm mt-1">{notification.message}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default NotificationList;
