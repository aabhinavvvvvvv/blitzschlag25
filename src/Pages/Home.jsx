import React from 'react';
import homeImage from '../Assets/blitz_home.png';
import insect from '../Assets/BlitzHome_insect.png';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import mnitlogo from '../Assets/mnitlogo.png';
import clublogo from '../Assets/culturalclublogo-removebg-preview.png';
import PlayButton from '../Components/PlayButton';
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
  return (
    <ScrollContainer>
      <ScrollPage>
        <Animator animation={batch(FadeIn(), Sticky(), MoveIn(-1000, 0))}>
          <div
            className="h-screen w-screen bg-transparent relative overflow-hidden flex items-center justify-center"
            style={{
              backgroundImage: `url(${homeImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Title Section */}
            <div className="relative flex flex-col items-center text-center text-white z-10">
              <div className="relative">
              <Animator animation={Fade()}>
                <h1
                  className="text-5xl md:text-8xl tracking-wider font-normal text-[#FFFBFB] drop-shadow-lg"
                  style={{
                    fontFamily: "'Metal Mania', cursive",
                    WebkitTextStroke: "3px #D4BF927D",
                    WebkitTextFillColor: "#FFFBFB",
                    textShadow:
                      "0 0 5px rgba(255, 255, 255, 0.2), 0 0 10px rgba(255, 255, 255, 0.6), 0 0 15px rgba(255, 255, 255, 0.4)",
                  }}
                >
                  BLITZSCHLAG' 25
                </h1>
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
                <p
                  className="text-xl md:text-3xl tracking-normal font-normal text-[#C0AA67] mt-5"
                  style={{
                    fontFamily: "'Metal Mania', cursive",
                    WebkitTextStroke: "0.5px #000000D1",
                    WebkitTextFillColor: "#C0AA67",
                    textShadow: "2px 2px 4px #000000",
                  }}
                >
                  7th - 9th February, 2025
                </p>
              </Animator>
              <Animator animation={Move(-1000, 0)}>
                <p className="mt-10">
                  <PlayButton />
                </p>
              </Animator>
              <Animator animation={MoveOut(1000, 0)}>
                <p
                  className="text-xl mt-7 mb-3 md:text-3xl tracking-normal font-normal text-[#C0AA67]"
                  style={{
                    fontFamily: "'Metal Mania', cursive",
                    WebkitTextStroke: "0.5px #000000D1",
                    WebkitTextFillColor: "#C0AA67",
                    textShadow: "2px 2px 4px #000000",
                  }}
                >
                  presented by
                </p>
              </Animator>
              <Animator animation={MoveOut(-1000, 0)}>
                <div className="flex justify-center sm:justify-start gap-4">
                  <Link
                    to="https://mnit.ac.in"
                    className="w-24 h-24"
                  >
                    <img
                      src={mnitlogo}
                      className="w-24 h-24"
                      alt="MNIT Logo"
                    />
                  </Link>
                  <Link
                    to="https://mnit.ac.in/cacs"
                    className="w-24 h-24"
                  >
                    <img
                      src={clublogo}
                      className="w-24 h-24"
                      alt="Cultural Club Logo"
                    />
                  </Link>
                </div>
              </Animator>
            </div>
          </div>
        </Animator>
      </ScrollPage>
    </ScrollContainer>
  );
};

export default Home;
