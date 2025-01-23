import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const NotificationList = ({ notifications }) => {
  const controls = useAnimation();
  const containerRef = useRef(null);

  useEffect(() => {
    const animate = async () => {
      const containerHeight = containerRef.current.offsetHeight;
      const contentHeight = containerRef.current.scrollHeight;

      await controls.start({
        y: [0, -contentHeight],
        transition: {
          duration: notifications.length * 6, // Adjust for smoother scroll
          ease: "linear",
          repeat: Infinity,
        },
      });
    };

    animate();
  }, [controls, notifications]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-20 left-4 p-5 rounded-lg shadow-2xl z-50 w-80 h-72 overflow-hidden"
      style={{
        // border: "2px solid #FFD700",
        boxShadow: "0 0 15px rgba(255, 215, 0, 0.8), 0 0 30px rgba(255, 223, 0, 0.6)",
      }}
    >

      <motion.div animate={controls} className="space-y-4">
        {notifications.concat(notifications).map((notification, index) => (
          <div
            key={`${notification.id}-${index}`}
            className="p-4 rounded-lg"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 215, 0, 0.8), rgba(255, 223, 0, 0.6))",
            //   boxShadow: "0 0 10px rgba(255, 255, 204, 0.8), 0 0 20px rgba(255, 255, 153, 0.6)",
            //   border: "1px solid #FFD700",
            }}
          >
            <h3
              className="font-semibold text-yellow-900"
              style={{
                fontFamily: "'Metal Mania', cursive",
                // textShadow: "0 0 4px rgba(255, 204, 0, 0.7)",
              }}
            >
              {notification.title}
            </h3>
            <p
              className="text-sm mt-1 "
              style={{
                // textShadow: "0 0 3px rgba(255, 255, 153, 0.5)",
              }}
            >
              {notification.message}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default NotificationList;
