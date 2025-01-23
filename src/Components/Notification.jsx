import React from "react";
import { motion } from "framer-motion";

const Notification = ({ title, message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="fixed top-4 left-4 bg-gray-900 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm w-full"
    >
      <h3 className="font-semibold text-yellow-500 mb-1">{title}</h3>
      <p className="text-sm">{message}</p>
    </motion.div>
  );
};

export default Notification;
