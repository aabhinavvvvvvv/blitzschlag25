import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotificationPanel = ({ onClose }) => {
  const notifications = [
    { id: 1, title: "Early Bird Tickets", message: "Get your early bird tickets now! Limited time offer." },
    { id: 2, title: "Artist Lineup", message: "Check out our amazing artist lineup for Blitzschlag 2025!" },
    { id: 3, title: "Workshop Registration", message: "Register now for our exclusive workshops during the event." },
  ];

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 right-0 h-full w-80 bg-gray-900 text-white p-6 shadow-lg z-50"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Notifications</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-6 w-6" />
        </Button>
      </div>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: notification.id * 0.1 }}
            className="bg-gray-800 p-4 rounded-lg"
          >
            <h3 className="font-semibold text-yellow-500">{notification.title}</h3>
            <p className="text-sm mt-1">{notification.message}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default NotificationPanel;
