import React, { useEffect, useRef } from "react";
import Home from "./Home";
import Team from "./Team";
import EventImg from "../Assets/eventbg.jpg";
import "../css files/animation.css";
import Transition from "../transition";
import Event from "./Event";
import mnitlogo from "../Assets/mnitlogo.png";
import clublogo from "../Assets/culturalclublogo.png";
import "../css files/landing.css";
import ScrollDown from "../Components/scroll";
import LandingEvent from "./LandingEvent.jsx";
import Liveshow from "./Liveshow.jsx";
// import ScrollBg from "../Components/scrollbg";

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

const LandingPage = () => {

  return (
    <ScrollContainer>
      {/* Home Section */}
      <ScrollPage>
        <Animator animation={batch()}>
          <div id="Home" className="scroll-section h-screen w-screen relative">
            <Home />
            <div className="flex justify-center items-center absolute bottom-0 left-1/2 ">
              <ScrollDown />
            </div>
          </div>
        </Animator>
      </ScrollPage>
      {/* <ScrollPage>
  <Animator animation={ZoomOut}>
    <div className="w-screen h-screen flex justify-center items-center">
      <h1>Event</h1>
      <ScrollBg />
    </div>
  </Animator>
</ScrollPage> */}

      {/* Event Section */}
      <ScrollPage>
        <Animator animation={batch(Fade(), MoveIn())}>
          <div
            id="Event"
            className="scroll-section h-screen w-screen relative  "
          >
            <LandingEvent />
          </div>
        </Animator>
      </ScrollPage>
      {/* Team Section */}
      <ScrollPage>
        <Animator animation={batch(Fade(), MoveIn())}>
          <div id="Event" className="scroll-section h-screen w-screen  ">
            <Team />
          </div>
        </Animator>
      </ScrollPage>
      {/* <div id="Event" className="scroll-section h-screen w-screen  "> */}
            <Footer />
          {/* </div> */}
    </ScrollContainer>
  );
};

export default Transition(LandingPage);