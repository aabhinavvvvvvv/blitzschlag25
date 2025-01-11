import React from 'react';
import homeImage from '../Assets/blitz_home.png';
import insect from '../Assets/BlitzHome_insect.png';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import mnitlogo from '../Assets/mnitlogo.png';
import clublogo from '../Assets/culturalclublogo-removebg-preview.png';
import { FiPlayCircle } from "react-icons/fi";
import PlayButton from '../Components/PlayButton';
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

const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
const FadeUp = batch(Fade(), Move(), Sticky());

const Home = () => {
  const navigate = useNavigate();
  return (
    <ScrollContainer>

    <div className="h-screen w-full bg-transparent relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{
          backgroundImage: `url(${homeImage})`,
        }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white mt-20">
        {/* Title with Insect */}
        <div className="relative inline-block">
          <h1
            className="text-5xl md:text-8xl tracking-wider font-normal text-[#FFFBFB] drop-shadow-lg"
            style={{
              fontFamily: "'Metal Mania', cursive",
              WebkitTextStroke: "3px #D4BF927D",
              WebkitTextFillColor: "#FFFBFB",
              textShadow: "0 0 5px rgba(255, 255, 255, 0.2), 0 0 10px rgba(255, 255, 255, 0.6), 0 0 15px rgba(255, 255, 255, 0.4)"
            }}
          >
            BLITZSCHLAG' 25
          </h1>
          {/* Insect Image */}
          <img  
            src={insect}
            alt="Insect"
            className="absolute -top-[4.5rem]  md:-top-28 left-[82%] md:left-[93%] w-16 md:w-28"
          />
        </div>
        {/* Date and PlayButton */}
        <div className="flex-col justify-center items-center w-full mt-5 gap-5">
          <p
            className="text-xl md:text-3xl tracking-normal font-normal text-[#C0AA67] date"
            style={{
              fontFamily: "'Metal Mania', cursive",
              WebkitTextStroke: "0.5px #000000D1",
              WebkitTextFillColor: "#C0AA67",
              textShadow: "2px 2px 4px #000000",
            }}
          >
            6th - 9th February, 2025
          </p>
          <p className='mt-10'><PlayButton /></p>
        </div>
        <p
          className="text-xl mt-7 mb-3 md:text-3xl tracking-normal font-normal text-[#C0AA67] "
          style={{
            fontFamily: "'Metal Mania', cursive",
            WebkitTextStroke: "0.5px #000000D1",
            WebkitTextFillColor: "#C0AA67",
            textShadow: "2px 2px 4px #000000",
          }}
        >presented by</p>
        <div className='flex justify-center sm:justify-start gap-4'>
          <Link to='https://mnit.ac.in' className='w-24 h-24'><img src={mnitlogo} className='w-24 h-24 ' alt="MNIT Logo" /></Link>
          <Link to='https://mnit.ac.in/cacs' className='w-24 h-24'><img src={clublogo} className='w-24 h-24 ' alt="Cultural Club Logo" /></Link>
  
        </div>
      </div>


    </div>
        </ScrollContainer>
  );
};

export default Home;
