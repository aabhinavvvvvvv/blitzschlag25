import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import tam from "../Assets/tamasha.jpg";
import panache2 from "../Assets/panache.jpg";
import ram from "../Assets/rambha_sambha.jpg";
import bat from "../Assets/battle_of_bands.jpg";
import eventbg from "../Assets/payment_bg.jpg";
import styled from 'styled-components';



const events = {
  panache: {
    name: "Panache",
    venue: "Central Lawn, MNIT Jaipur",
    day: 2,
    rulebook: "/Panache_RuleBook.pdf",
    description: "PANACHE 2025 is a fashion show redefining style, expressiveness, charisma, and glamour.",
    maxTeamSize: 50,
    eventPath: "panache",
    imgUrl: panache2,
    club: "none",
    type: "flagship",
  },
  tamasha: {
    name: "Tamasha",
    venue: "SAC Lawn, MNIT Jaipur",
    day: 2,
    rulebook: "/Tamasha_Rulebook.pdf",
    description: "TAMASHA celebrates the raw power of storytelling and social commentary through Nukkad Natak.",
    maxTeamSize: 50,
    eventPath: "tamasha",
    imgUrl: tam,
    club: "none",
    type: "flagship",
  },
  battleofbands: {
    name: "Battle Of Bands",
    venue: "VLTC Back Parking, MNIT Jaipur",
    day: 3,
    rulebook: "/BattleofBands_Rulebook.pdf",
    description: "BATTLE OF BANDS is where amplified passion meets fierce competition for the 'Best Band on Campus' title.",
    maxTeamSize: 50,
    eventPath: "battleofbands",
    imgUrl: bat,
    club: "none",
    type: "flagship",
  },
  rambasamba: {
    name: "Ramba Samba",
    venue: "Central Lawn & OAT, MNIT Jaipur",
    day: 3,
    rulebook: "/RambaSamba_Rulebook.pdf",
    description: "RAMBA SAMBA 2025 offers a captivating journey through diverse dance styles and breathtaking choreographies.",
    maxTeamSize: 50,
    eventPath: "rambasamba",
    imgUrl:ram,
    club: "none",
    type: "flagship",
  },
};

const FlagshipEvents = () => {
  const [currentEvent, setCurrentEvent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const eventArray = Object.values(events);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentEvent((prev) => (prev + 1) % eventArray.length);
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [isAutoPlaying, eventArray.length]);

  const nextEvent = () => {
    
    setCurrentEvent((prev) => (prev + 1) % eventArray.length);
  };

  const prevEvent = () => {
    
    setCurrentEvent((prev) => (prev - 1 + eventArray.length) % eventArray.length);
  };

  const cardVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setIsAutoPlaying(false);
    setCurrentEvent((prev) => (prev + newDirection + eventArray.length) % eventArray.length);
  };

  return (
    <div
      className="min-h-screen w-full text-white flex flex-col justify-center items-center overflow-hidden relative py-12"
    style={{
      backgroundImage: `url(${eventbg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100%', /* Ensures the container spans the full width */
        height: '100vh', /* Ensures the container spans the full viewport height */
    }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <motion.h1
        className="text-5xl md:text-7xl mt-16 font-extrabold text-center mb-12 relative z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500" style={{fontFamily: "'Metal Mania', cursive",}}>
          FLAGSHIPS
        </span>
      </motion.h1>

      <div className="relative w-full max-w-5xl aspect-[16/9] px-4 scale-[0.85]">
  <AnimatePresence initial={false} custom={currentEvent}>
    <motion.div
      key={currentEvent}
      custom={currentEvent}
      variants={cardVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      onDragEnd={(e, { offset, velocity }) => {
        const swipe = swipePower(offset.x, velocity.x);
        if (swipe < -swipeConfidenceThreshold) {
          paginate(1);
        } else if (swipe > swipeConfidenceThreshold) {
          paginate(-1);
        }
      }}
      className="absolute inset-0 flex rounded-xl overflow-hidden shadow-2xl"
    >
      <div className="w-1/2 relative overflow-hidden">
        <motion.img
          src={eventArray[currentEvent].imgUrl}
          alt={eventArray[currentEvent].name}
          className="w-full h-full object-cover"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <motion.div
        className="w-1/2 bg-black bg-opacity-75 backdrop-blur-sm p-8 flex flex-col justify-between"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <div>
          <motion.h2
            className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-pink-500"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{ fontFamily: '"Amarante", serif' }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {eventArray[currentEvent].name}
          </motion.h2>
          <motion.p
            className="text-gray-300 mb-3 flex items-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {eventArray[currentEvent].venue}
          </motion.p>
          <motion.p
            className="text-gray-400 text-sm leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {eventArray[currentEvent].description}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>

  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
    <button
      onClick={prevEvent}
      className="p-2 bg-gray-800/50 rounded-full hover:bg-gray-700 transition-colors text-white"
    >
      <ChevronLeft size={30} />
    </button>
  </div>

  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
    <button
      onClick={nextEvent}
      className="p-2 bg-gray-800/50 rounded-full hover:bg-gray-700 transition-colors text-white"
    >
      <ChevronRight size={30} />
    </button>
  </div>
</div>

    </div>
  );
};

export default FlagshipEvents;
