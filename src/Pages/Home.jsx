import React from "react";
import homeImage from "../Assets/blitz_home.jpg";
import insect from "../Assets/BlitzHome_insect.png";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import mnitlogo from "../Assets/mnitlogo.png";
import clublogo from "../Assets/culturalclublogo-removebg-preview.png";
import PlayButton from "../Components/PlayButton";
import { motion } from "framer-motion";
import NotificationList from "../Components/NotificationList";
import { useState, useRef, useEffect } from "react";
import Clock from '../Components/Clock';
import {
  Animator,
  ScrollContainer,
  ScrollPage,
  batch,
  MoveIn,
  MoveOut,
  Sticky,
  FadeIn,
  FadeOut,
  Move,
  Fade,
} from "react-scroll-motion";


const Home = () => {
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
    <ScrollContainer>
      <ScrollPage>
        <Animator animation={batch(FadeIn(), Sticky(), MoveIn(-1000, 0))}>
          <div
            ref={ref}
            className="h-screen w-screen bg-transparent relative overflow-hidden flex items-center justify-center"
            style={{
              backgroundImage: `url(${homeImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Title Section */}
            <div className="relative flex flex-col items-center text-center text-white z-10">
              <div className="relative">
                <Animator animation={Fade()}>
                  <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 2, ease: [0.22, 1, 0.36, 1], }}

                    className="text-5xl md:text-8xl font-normal tracking-wider"
                    style={{
                      fontFamily: "'Metal Mania', cursive",
                      WebkitTextStroke: "3px #D4BF927D",
                      WebkitTextFillColor: "#FFFBFB",
                      textShadow: "0 0 10px rgba(255, 255, 255, 0.6)",
                    }}
                  >
                    BLITZSCHLAG' 25
                  </motion.h1>
                  {/* Insect Image */}
                  <img
                    src={insect}
                    alt="Insect"
                    className="absolute -top-[4.5rem] md:-top-28 left-[82%] md:left-[93%] w-16 md:w-28"
                  />
                </Animator>
              </div>
              {/* Date Section */}
              <Animator animation={Move(1000, 0)}>
                <motion.p
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 2, ease: [0.22, 1, 0.36, 1], }}
                  className="text-xl md:text-3xl font-normal text-yellow-500"
                  style={{
                    fontFamily: "'Metal Mania', cursive",
                    WebkitTextStroke: "0.5px #000000D1",
                    WebkitTextFillColor: "#C0AA67",
                    textShadow: "2px 2px 4px #000000",
                  }}
                >
                  7th - 9th February, 2025
                </motion.p>
              </Animator>
              <Animator animation={Move(-1000, 0)}>
                <motion.p
                  className="mt-10"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 2, ease: [0.22, 1, 0.36, 1], }}
                >
                  <PlayButton />
                </motion.p>
              </Animator>
              <Animator animation={MoveOut(+1000, 0)}>
                <motion.p
                  className="text-xl mt-7 mb-3 md:text-3xl tracking-normal font-normal text-[#C0AA67]"
                  style={{
                    fontFamily: "'Metal Mania', cursive",
                    WebkitTextStroke: "0.5px #000000D1",
                    WebkitTextFillColor: "#C0AA67",
                    textShadow: "2px 2px 4px #000000",
                  }}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 2, ease: [0.22, 1, 0.36, 1], }}
                >
                  presented by
                </motion.p>
              </Animator>
              <Animator animation={MoveOut(-1000, 0)}>
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 2, ease: [0.22, 1, 0.36, 1], }}
                  className="flex justify-center sm:justify-start gap-4"
                >
                  <Link to="https://mnit.ac.in" className="w-24 h-24">
                    <img src={mnitlogo} className="w-24 h-24" alt="MNIT Logo" />
                  </Link>
                  <Link to="https://mnit.ac.in/cacs" className="w-24 h-24">
                    <img
                      src={clublogo}
                      className="w-24 h-24"
                      alt="Cultural Club Logo"
                    />
                  </Link>
                </motion.div>
              </Animator>

            </div>
            {/* <NotificationList notifications={notifications} /> */}
            <div className="absolute bottom-5">
            <Animator animation={FadeOut(MoveOut)}>
                <Clock/>
            </Animator>
            </div>
            <NotificationList />
          </div>

        </Animator>
      </ScrollPage>
    </ScrollContainer>
  );
};

export default Home;
