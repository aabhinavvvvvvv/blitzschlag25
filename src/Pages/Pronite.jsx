import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Liveshow from "./Liveshow.jsx";
import Bandnight from "./bandnight.jsx";
import Djnight from "./Djnight.jsx";

const Pronite = () => {
  const [showHeading, setShowHeading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Hide heading and show content after 3 seconds
    const timer = setTimeout(() => {
      setShowHeading(false);
      setShowContent(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <AnimatePresence>
        {showHeading && (
          <motion.h1
            initial={{ scale: 0.5, y: -100 }}
            animate={{ scale: 1.2, y: 0 }}
            exit={{ scale: 0.5, y: 100, opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh", // Full viewport height for centering
              textAlign: "center",
              fontSize: "5rem",
              zIndex: 10,
              color: "#ffffff",
              textShadow:
                "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.5)",
              fontFamily: "'Metal Mania', cursive",
              letterSpacing: "0.5rem",
              fontWeight: "bold",
              background: "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              border: "3px solid transparent",
              // borderImage: "linear-gradient(45deg, #ff6b6b, #4ecdc4) 1",
              padding: "2rem",
              width: "100%",
              margin: "0",
            }}
          >
            PRONITE
          </motion.h1>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Liveshow />
            <Bandnight />
            <Djnight />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Pronite;
