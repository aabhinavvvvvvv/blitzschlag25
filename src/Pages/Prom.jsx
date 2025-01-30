import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Music, Crown, Users } from "lucide-react";
import leftcurtain from "../Assets/red_curtain_left.png";
import rightcurtain from "../Assets/red_curtain_right.png";
import promnightImage from "../Assets/Prom.jpg";
import "../css files/liveshow.css";
import { Ticket } from "lucide-react";
export default function PromNightLanding() {
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsCurtainOpen(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const container = document.querySelector(".stars-container");
    if (container) {
      container.innerHTML = "";
      for (let i = 0; i < 120; i++) {
        const heart = document.createElement("div");
        heart.className = "heart";

        const size = Math.random() * 15 + 2;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;

        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;

        heart.style.setProperty("--duration", `${2 + Math.random() * 2}s`);
        heart.style.setProperty("--opacity", `${0.3 + Math.random() * 0.7}`);

        const heartColors = ["#ff1493", "#ff69b4", "#ff85a2", "#ff4081"];
        heart.style.backgroundColor =
          heartColors[Math.floor(Math.random() * heartColors.length)];

        container.appendChild(heart);
      }
    }
  }, []);

  const curtainVariants = {
    closed: (isLeft) => ({
      x: "0%",
      skew: "0deg",
    }),
    open: (isLeft) => ({
      x: isLeft ? "-100vw" : "100vw", // Use `vw` for viewport width, ensuring the curtain moves out of screen
      skew: isLeft ? "-10deg" : "10deg",
      transition: {
        x: { type: "spring", stiffness: 50, damping: 100 },
        skew: { type: "tween", ease: "easeInOut", duration: 0.8 },
      },
    }),
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Heart Background */}
      <div className="stars-container absolute top-0 left-0 w-full h-full pointer-events-none z-10"></div>

      {/* Left Curtain */}
      <motion.div
        custom={true}
        variants={curtainVariants}
        initial="closed"
        animate={isCurtainOpen ? "open" : "closed"}
        className="fixed top-0 left-0 w-1/2 h-full z-40 bg-cover bg-right"
        style={{
          backgroundImage: `url('${leftcurtain}')`,
          transformOrigin: "left center",
        }}
      />

      {/* Right Curtain */}
      <motion.div
        custom={false}
        variants={curtainVariants}
        initial="closed"
        animate={isCurtainOpen ? "open" : "closed"}
        className="fixed top-0 right-0 w-1/2 h-full z-40 bg-cover bg-left"
        style={{
          backgroundImage: `url('${rightcurtain}')`,
          transformOrigin: "right center",
        }}
      />

      {/* Content */}
      <div className="min-h-screen  flex flex-col items-center justify-center p-4 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isCurtainOpen ? 1 : 0,
            scale: isCurtainOpen ? 1 : 0.8,
          }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-4xl flex flex-col items-center justify-center space-y-8"
        >
          {/* Prom Night Image */}
          <motion.div
            className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl mt-20 flex justify-center items-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            {/* Glow Effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-violet-300 opacity-60 blur-2xl rounded-3xl"></div>

            {/* Image Container */}
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              {/* Dark Overlay */}
              <div className="w-full h-full bg-gradient-to-b from-transparent to-black/50 absolute bottom-0 z-10"></div>

              <img
                src={promnightImage || "/placeholder.svg"}
                alt="The Blitz Prom Night"
                className="w-full h-full object-cover floating-image"
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            className="text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <h1
              className="text-5xl md:text-7xl font-bold mb-2 shadow-text  text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"
              style={{ fontFamily: "'Metal Mania', cursive" }}
            >
              The Blitz Prom Night
            </h1>
            {/* <p className="text-xl md:text-3xl shadow-text text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500" style={{ fontFamily: "'Metal Mania', cursive" }}>A Night of Glamour and Celebration</p> */}
          </motion.div>

          {/* Description */}
          <motion.div
            className="  md:w-full bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 bg-opacity-40 backdrop-blur-lg rounded-xl p-8 shadow-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <p className="text-white text-lg md:text-xl  leading-relaxed font-medium">
              For the first time in MNIT's history, The Blitz Prom Night
              promises to be a momentous event celebrating the spirit of
              togetherness. Students will experience an evening of glamour,
              excitement, and elegance, as they don formal attire for a night
              filled with music, dance, and memorable moments. This inaugural
              prom marks a new tradition, offering a unique opportunity for
              students to come together in celebration of their academic journey
              and campus life.
            </p>
          </motion.div>

          {/* Event Details */}
          <motion.div
            className="bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 bg-opacity-40 backdrop-blur-lg rounded-xl p-8 w-full shadow-lg mt-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
              {/* Event Location */}
              <div className="flex items-center space-x-4">
                <MapPin className="text-pink-400 h-8 w-8" />
                <span className="text-lg md:text-xl font-semibold">
                  VLTC Front Porch
                </span>
              </div>

              {/* Event Date */}
              <div className="flex items-center space-x-4">
                <Calendar className="text-pink-400 h-8 w-8" />
                <span className="text-lg md:text-xl font-semibold">
                  6th February 2025 (Day 0 of Blitzschlag '25)
                </span>
              </div>

              {/* Event Time */}
              <div className="flex items-center space-x-4">
                <Clock className="text-pink-400 h-8 w-8" />
                <span className="text-lg md:text-xl font-semibold">
                  9:00 PM to 11:30 PM (Entry starts at 8:30 PM)
                </span>
              </div>

              {/* Music and Dance */}
              <div className="flex items-center space-x-4">
                <Music className="text-pink-400 h-8 w-8" />
                <span className="text-lg md:text-xl font-semibold">
                  Live Music and Dance
                </span>
              </div>

              {/* Prom Contest */}
              <div className="flex items-center space-x-4">
                <Crown className="text-pink-400 h-8 w-8" />
                <span className="text-lg md:text-xl font-semibold">
                  Prom King and Queen Contest
                </span>
              </div>

              {/* Couples Event */}
              <div className="flex items-center space-x-4">
                <Users className="text-pink-400 h-8 w-8" />
                <span className="text-lg md:text-xl font-semibold">
                  Couples Event
                </span>
              </div>
            </div>
          </motion.div>

          {/* Highlight */}
          <motion.div
            className="bg-pink-500 bg-opacity-80 backdrop-blur-lg rounded-xl p-6 w-full"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-white mb-3">
              Highlight: Slow Dance and Ramp Walk Challenge
            </h3>
            <p className="text-white text-lg leading-relaxed">
              The prom night will culminate in a final slow dance, followed by a
              highlight challenge featuring a ramp walk. Couples will showcase
              their fashion, walk, and confidence on stage. Judging will be
              based on costume, confidence, and creativity. The highest-scoring
              couple will be crowned Prom King and Queen of Blitzschlag '25.
            </p>
          </motion.div>

          <button
            className="group relative overflow-hidden rounded-xl text-xl font-semibold w-64"
            onClick={() => {
              window.open(
                "https://docs.google.com/forms/d/1Sm9_BhNe3cRoa2hSwDyZt6x6VYizNOd8y1qkWFiPJ2k/edit?ts=679b0ecf",
                "_blank"
              );
            }}
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-300 transform group-hover:scale-105 transition-transform duration-300"></div>
            <div className="absolute -inset-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-300 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-black/50 backdrop-blur-sm rounded-xl px-8 py-4 flex items-center justify-center gap-2 group-hover:bg-black/40 transition-colors duration-300">
              <Ticket className="w-5 h-5" />
              Register Now
            </div>
          </button>
        </motion.div>
        {/* </motion.div> */}
      </div>
    </div>
  );
}
