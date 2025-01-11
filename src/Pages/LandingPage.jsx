import React, { useEffect, useRef } from "react";
import Home from "./Home";
import Team from "./Team";
import EventImg from "../Assets/eventbg.jpg";
import "../css files/animation.css";
import Transition from "../transition";
import Event from "./Event";
import Login from "./Login";
import SignUp from "./SignUp";
import mnitlogo from "../Assets/mnitlogo.png";
import clublogo from "../Assets/culturalclublogo.png";
import "../css files/landing.css";
import LandingEvent from "./LandingEvent";

import {
  Animator,
  ScrollContainer,
  ScrollPage,
  batch,
  Fade,
  FadeIn,
  FadeOut,
  Move,
  MoveIn,
  MoveOut,
  Sticky,
  StickyIn,
  StickyOut,
  Zoom,
  ZoomIn,
  ZoomOut,
} from "react-scroll-motion";
import AboutUs from "./About";
import Footer from "../Components/Footer";

const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
const FadeUp = batch(Fade(), Move(), Sticky());

// Custom Hook to handle scroll progress
const useScrollProgress = (threshold, onThresholdReached) => {
  const observer = useRef();

  useEffect(() => {
    const options = {
      threshold,
    };

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onThresholdReached(entry.target.id); // Pass the section ID when the threshold is reached
        }
      });
    }, options);

    const sections = document.querySelectorAll(".scroll-section");
    sections.forEach((section) => observer.current.observe(section));

    return () => {
      sections.forEach((section) => observer.current.unobserve(section));
    };
  }, [threshold, onThresholdReached]);
};

const LandingPage = () => {
 
  // useScrollProgress(0.3, handleScrollProgress); // Trigger at 30% threshold

  return (
    <ScrollContainer>
      {/* Home Section */}
      {/* <ScrollPage>
        <Animator animation={ZoomInScrollOut}>
          <div
            id="Home"
            className="scroll-section h-screen w-screen"
          > */}
            <Home />
          {/* </div>
        </Animator>
      </ScrollPage> */}
      <ScrollPage>
  <Animator animation={ZoomInScrollOut}>
    <div className="w-screen h-screen flex justify-center items-center">
      
    <h1
      style={{
        fontSize: "50px",
        background: "linear-gradient(45deg, #ff6a00, #ee0979, #ff00b9)",
        backgroundClip: "text",
        color: "transparent",
        fontWeight: "600",
        textAlign: "center",
        textShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        letterSpacing: "2px",
        animation: "glowAnimation 3s ease-in-out infinite",
        fontFamily:"Armante serif",
      }}
      >
      Event
    </h1>
      </div>
  </Animator>
</ScrollPage>

      {/* Event Section */}
      <ScrollPage>
        <Animator animation={ZoomInScrollOut}>
          <div
            id="Event"
            className="scroll-section h-screen w-screen "
          >
            <Event />
          </div>
        </Animator>
      </ScrollPage>
      <ScrollPage>
  <Animator animation={ZoomInScrollOut}>
    <h1
      style={{
        fontSize: "50px",
        background: "linear-gradient(45deg, #ff6a00, #ee0979, #ff00b9)",
        backgroundClip: "text",
        color: "transparent",
        fontWeight: "600",
        textAlign: "center",
        textShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        letterSpacing: "2px",
        animation: "glowAnimation 3s ease-in-out infinite",
        fontFamily:"Armante serif",
      }}
    >
      Team
    </h1>
  </Animator>
</ScrollPage>

      {/* Team Section */}
      <ScrollPage>
        <Animator animation={ZoomInScrollOut}>
          <div
            id="Team"
            className="scroll-section h-screen w-screen"
          >
            <Team />
          </div>
        </Animator>
      </ScrollPage>
     <Footer />
    </ScrollContainer>
  );
};

export default Transition(LandingPage);