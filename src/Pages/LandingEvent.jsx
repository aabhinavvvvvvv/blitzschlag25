import React, { useState, useEffect,useRef } from 'react';
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
    description: "Step into the glamorous world of PANACHE 2025, a spectacular fashion extravaganza that celebrates the essence of creativity, charisma, and self-expression. This event redefines the art of style as participants showcase their innovative designs, vibrant themes, and artistic flair on the runway. From stunning outfits to captivating choreography, PANACHE is not just a fashion show but an unforgettable journey through the evolving trends and timeless elegance of fashion. Witness the perfect blend of confidence and grace as the runway transforms into a canvas of dreams and inspirations.",
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
    description: "Experience the unfiltered magic of storytelling and social awareness at TAMASHA 2025, a one-of-a-kind Nukkad Natak competition. This event takes the age-old tradition of street theater and amplifies it with dynamic performances that blend humor, drama, and powerful messages. TAMASHA provides a platform for passionate performers to highlight pressing social issues, celebrate cultural narratives, and connect with audiences through raw emotions and compelling scripts. It’s a festival of voices coming together, proving that theater is not just an art form but a catalyst for change.",
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
    description: "Prepare for an adrenaline-fueled night of music and competition at BATTLE OF BANDS 2025! This electrifying event brings together the best campus bands, each armed with powerful vocals, heart-thumping beats, and exceptional stage presence. From soulful melodies to high-octane rock anthems, the performances are sure to captivate and energize the crowd. Whether you're a music enthusiast or just love a good show, BATTLE OF BANDS is a spectacle of passion, skill, and the unifying power of music. Join us for a night where music breaks all boundaries and creates unforgettable memories.",
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
    description: "Dive into the vibrant and exhilarating world of dance at RAMBA SAMBA 2025, a celebration of rhythm, movement, and creativity. This event is a melting pot of diverse dance styles, ranging from classical elegance to modern grooves, ensuring there’s something for everyone. Watch as talented teams dazzle the audience with their impeccable synchronization, captivating concepts, and innovative choreography. RAMBA SAMBA is more than just a dance competition; it's an immersive experience where performers push the boundaries of artistry, inspire audiences, and celebrate the universal language of dance.",
    maxTeamSize: 50,
    eventPath: "rambasamba",
    imgUrl: ram,
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
  const [isVisible, setIsVisible] = useState(false);
      const ref = useRef(null);
    
      useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
            }
          },
          { rootMargin: "50px" } // Adjust as needed
        );
    
        if (ref.current) {
          observer.observe(ref.current);
        }
    
        return () => {
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        };
      }, []);
  return (
    <div
    ref={ref}
      className="min-h-screen w-full text-white flex flex-col justify-center items-center overflow-hidden relative py-12"
    style={{
      //backgroundImage: `url(${eventbg})`,
      backgroundImage: isVisible ? `url(${eventbg})` : "none",
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

      <div className="relative w-full max-w-5xl aspect-[16/9] px-4 md:scale-[0.85]">
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
            className="text-gray-300 mb-3 flex items-center text-md md:text-xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {eventArray[currentEvent].venue}
          </motion.p>
          <motion.p
            className="text-gray-400 text-sm leading-relaxed hidden md:block overflow-ellipsis"
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
// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import styled from "styled-components";
// import eventbg from "../Assets/payment_bg.jpg";

// // Your events data here
// const events = {
//   panache: {
//     name: "Panache",
//     venue: "Central Lawn, MNIT Jaipur",
//     day: 2,
//     rulebook: "/Panache_RuleBook.pdf",
//     description: "Step into the glamorous world of PANACHE 2025, a spectacular fashion extravaganza that celebrates the essence of creativity, charisma, and self-expression. This event redefines the art of style as participants showcase their innovative designs, vibrant themes, and artistic flair on the runway. From stunning outfits to captivating choreography, PANACHE is not just a fashion show but an unforgettable journey through the evolving trends and timeless elegance of fashion. Witness the perfect blend of confidence and grace as the runway transforms into a canvas of dreams and inspirations.",
//     maxTeamSize: 50,
//     eventPath: "panache",
//     imgUrl: panache2,
//     club: "none",
//     type: "flagship",
//   },
//   tamasha: {
//     name: "Tamasha",
//     venue: "SAC Lawn, MNIT Jaipur",
//     day: 2,
//     rulebook: "/Tamasha_Rulebook.pdf",
//     description: "Experience the unfiltered magic of storytelling and social awareness at TAMASHA 2025, a one-of-a-kind Nukkad Natak competition. This event takes the age-old tradition of street theater and amplifies it with dynamic performances that blend humor, drama, and powerful messages. TAMASHA provides a platform for passionate performers to highlight pressing social issues, celebrate cultural narratives, and connect with audiences through raw emotions and compelling scripts. It’s a festival of voices coming together, proving that theater is not just an art form but a catalyst for change.",
//     maxTeamSize: 50,
//     eventPath: "tamasha",
//     imgUrl: tam,
//     club: "none",
//     type: "flagship",
//   },
//   battleofbands: {
//     name: "Battle Of Bands",
//     venue: "VLTC Back Parking, MNIT Jaipur",
//     day: 3,
//     rulebook: "/BattleofBands_Rulebook.pdf",
//     description: "Prepare for an adrenaline-fueled night of music and competition at BATTLE OF BANDS 2025! This electrifying event brings together the best campus bands, each armed with powerful vocals, heart-thumping beats, and exceptional stage presence. From soulful melodies to high-octane rock anthems, the performances are sure to captivate and energize the crowd. Whether you're a music enthusiast or just love a good show, BATTLE OF BANDS is a spectacle of passion, skill, and the unifying power of music. Join us for a night where music breaks all boundaries and creates unforgettable memories.",
//     maxTeamSize: 50,
//     eventPath: "battleofbands",
//     imgUrl: bat,
//     club: "none",
//     type: "flagship",
//   },
//   rambasamba: {
//     name: "Ramba Samba",
//     venue: "Central Lawn & OAT, MNIT Jaipur",
//     day: 3,
//     rulebook: "/RambaSamba_Rulebook.pdf",
//     description: "Dive into the vibrant and exhilarating world of dance at RAMBA SAMBA 2025, a celebration of rhythm, movement, and creativity. This event is a melting pot of diverse dance styles, ranging from classical elegance to modern grooves, ensuring there’s something for everyone. Watch as talented teams dazzle the audience with their impeccable synchronization, captivating concepts, and innovative choreography. RAMBA SAMBA is more than just a dance competition; it's an immersive experience where performers push the boundaries of artistry, inspire audiences, and celebrate the universal language of dance.",
//     maxTeamSize: 50,
//     eventPath: "rambasamba",
//     imgUrl: ram,
//     club: "none",
//     type: "flagship",
//   },
// };

// const FlagshipEvents = () => {
//   const [currentEvent, setCurrentEvent] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const [isBgVisible, setIsBgVisible] = useState(false);
//   const eventArray = Object.values(events);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     // Intersection Observer to lazy load background image
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsBgVisible(true);
//         }
//       },
//       { rootMargin: "100px" }
//     );

//     if (containerRef.current) {
//       observer.observe(containerRef.current);
//     }

//     return () => {
//       if (containerRef.current) {
//         observer.unobserve(containerRef.current);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     let interval;
//     if (isAutoPlaying) {
//       interval = setInterval(() => {
//         setCurrentEvent((prev) => (prev + 1) % eventArray.length);
//       }, 3000);
//     }

//     return () => clearInterval(interval);
//   }, [isAutoPlaying, eventArray.length]);

//   const nextEvent = () => {
//     setCurrentEvent((prev) => (prev + 1) % eventArray.length);
//   };

//   const prevEvent = () => {
//     setCurrentEvent((prev) => (prev - 1 + eventArray.length) % eventArray.length);
//   };

//   const cardVariants = {
//     enter: (direction) => ({
//       x: direction > 0 ? 1000 : -1000,
//       opacity: 0,
//       scale: 0.5,
//     }),
//     center: {
//       zIndex: 1,
//       x: 0,
//       opacity: 1,
//       scale: 1,
//     },
//     exit: (direction) => ({
//       zIndex: 0,
//       x: direction < 0 ? 1000 : -1000,
//       opacity: 0,
//       scale: 0.5,
//     }),
//   };

//   const swipeConfidenceThreshold = 10000;
//   const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

//   const paginate = (newDirection) => {
//     setIsAutoPlaying(false);
//     setCurrentEvent((prev) => (prev + newDirection + eventArray.length) % eventArray.length);
//   };

//   return (
//     <div
//       ref={containerRef}
//       className="min-h-screen w-full text-white flex flex-col justify-center items-center overflow-hidden relative py-12"
//       style={{
//         backgroundImage: isBgVisible ? `url(${eventbg})` : "none", // Lazy load background
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         width: "100%",
//         height: "100vh",
//       }}
//     >
//       <motion.div
//         className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//       />

//       <motion.h1
//         className="text-5xl md:text-7xl mt-16 font-extrabold text-center mb-12 relative z-10"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: 0.2 }}
//       >
//         <span
//           className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
//           style={{ fontFamily: "'Metal Mania', cursive" }}
//         >
//           FLAGSHIPS
//         </span>
//       </motion.h1>

//       <div className="relative w-full max-w-5xl aspect-[16/9] px-4 md:scale-[0.85]">
//         <AnimatePresence initial={false} custom={currentEvent}>
//           <motion.div
//             key={currentEvent}
//             custom={currentEvent}
//             variants={cardVariants}
//             initial="enter"
//             animate="center"
//             exit="exit"
//             transition={{
//               x: { type: "spring", stiffness: 300, damping: 30 },
//               opacity: { duration: 0.2 },
//             }}
//             drag="x"
//             dragConstraints={{ left: 0, right: 0 }}
//             dragElastic={1}
//             onDragEnd={(e, { offset, velocity }) => {
//               const swipe = swipePower(offset.x, velocity.x);
//               if (swipe < -swipeConfidenceThreshold) {
//                 paginate(1);
//               } else if (swipe > swipeConfidenceThreshold) {
//                 paginate(-1);
//               }
//             }}
//             className="absolute inset-0 flex rounded-xl overflow-hidden shadow-2xl"
//           >
//             <div className="w-1/2 relative overflow-hidden">
//               <motion.img
//                 src={eventArray[currentEvent].imgUrl}
//                 alt={eventArray[currentEvent].name}
//                 className="w-full h-full object-cover"
//                 initial={{ scale: 1.2 }}
//                 animate={{ scale: 1 }}
//                 transition={{ duration: 0.8 }}
//               />
//               <motion.div
//                 className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//               />
//             </div>
//             <motion.div
//               className="w-1/2 bg-black bg-opacity-75 backdrop-blur-sm p-8 flex flex-col justify-between"
//               initial={{ x: 100, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ delay: 0.7, duration: 0.5 }}
//             >
//               <div>
//                 <motion.h2
//                   className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-pink-500"
//                   initial={{ y: 20, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   style={{ fontFamily: '"Amarante", serif' }}
//                   transition={{ delay: 0.3, duration: 0.5 }}
//                 >
//                   {eventArray[currentEvent].name}
//                 </motion.h2>
//                 <motion.p
//                   className="text-gray-300 mb-3 flex items-center text-md md:text-xl"
//                   initial={{ y: 20, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{ delay: 0.4, duration: 0.5 }}
//                 >
//                   {eventArray[currentEvent].venue}
//                 </motion.p>
//                 <motion.p
//                   className="text-gray-400 text-sm leading-relaxed hidden md:block overflow-ellipsis"
//                   initial={{ y: 20, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{ delay: 0.5, duration: 0.5 }}
//                 >
//                   {eventArray[currentEvent].description}
//                 </motion.p>
//               </div>
//             </motion.div>
//           </motion.div>
//         </AnimatePresence>

//         <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
//           <button
//             onClick={prevEvent}
//             className="p-2 bg-gray-800/50 rounded-full hover:bg-gray-700 transition-colors text-white"
//           >
//             <ChevronLeft size={30} />
//           </button>
//         </div>

//         <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
//           <button
//             onClick={nextEvent}
//             className="p-2 bg-gray-800/50 rounded-full hover:bg-gray-700 transition-colors text-white"
//           >
//             <ChevronRight size={30} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FlagshipEvents;
