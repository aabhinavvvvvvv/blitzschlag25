import React, { useEffect, useState, useRef } from "react";
import { Ticket } from "lucide-react";
import "../css files/liveshow.css";
import vaibhav from "../Assets/vaibhavdj.jpeg";
import { useNavigate } from "react-router-dom";


function Bandnight() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.9, // Trigger when 90% of the element is in view
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const container = document.querySelector(".stars-container-djnight");
    if (container) {
      for (let i = 0; i < 100; i++) {
        const star = document.createElement("div");
        star.className = "star";
        const size = Math.random() * 9;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.setProperty("--duration", `${2 + Math.random() * 1}s`);
        star.style.setProperty("--opacity", `${0.5 + Math.random() * 0.8}`);
        container.appendChild(star);
      }
    }
  }, []);

  return (
    <div className="h-screen bg-gradient-to-b from-black via-emerald-950/30 to-black text-white overflow-hidden relative">
      {/* Stars Container */}
      <div className="stars-container-djnight absolute inset-0 overflow-hidden z-0" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10" />

      {/* Main Content */}
      <div className="relative h-full z-20 flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 flex items-center gap-28">
          {/* Artist Image - Left Side */}
          <div ref={sectionRef} className={`hidden md:block w-full transform transition-all duration-1000 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
          }`}>

            
            <div className="relative w-full mx-auto mt-10 scale-[0.8]">
              {/* Enhanced Glow Effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-800 via-green-600 to-emerald-800 opacity-75 blur-3xl rounded-3xl animate-pulse"></div>

              {/* Image Container */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-emerald-500/30">
                <div className="w-full h-full bg-gradient-to-b from-transparent via-emerald-900/30 to-black/50 absolute bottom-0 z-10"></div>
                <img
                  className="w-full h-full object-cover floating-image"
                  alt="Dj Vaibhav"
                  style={{ objectPosition: "center top" }}
                  src={vaibhav}
                />
              </div>
            </div>
          </div>

          {/* Mobile View */}
          <div className="block md:hidden w-full text-center relative">
            <h1 className="text-6xl font-bold absolute -top-36 left-44 transform -translate-x-1/2 text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-400 to-green-500" style={{fontFamily: "'Metal Mania', cursive"}}>
              Dj Vaibhav
            </h1>
            <div className="absolute -inset-3 bg-gradient-to-r from-emerald-800 via-green-600 to-emerald-800 opacity-75 blur-3xl rounded-full animate-pulse"></div>
            {/* Image */}
            <div className="relative mx-auto ">
              <div className="relative overflow-hidden rounded-2xl ">
                <div className="w-full h-full bg-gradient-to-b from-transparent to-black/50 absolute bottom-0 z-10"></div>
                <img
                  className="w-full h-full object-cover floating-image"
                  alt="Dj Vaibhav"
                  style={{ objectPosition: "center top" }}
                  src={vaibhav}
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className={`w-full md:w-4/5 text-center md:text-left transform transition-all duration-1000 ${
            isVisible ? "translate-x-0 opacity-100" : "translate-x-80 opacity-0"
          } md:block hidden`}>
            {/* Title Section */}
            <div className="mb-12">
              <h1 className="text-7xl md:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-400 to-green-500" style={{fontFamily: "'Metal Mania', cursive"}}>
                Dj Vaibhav
              </h1>
              <div className="flex items-center md:justify-start justify-center space-x-3">
                <span className="h-0.5 w-12 bg-gradient-to-r from-green-500 to-emerald-500"></span>
                <p className="text-2xl text-emerald-200">Live in Concert</p>
                <span className="h-0.5 w-12 bg-gradient-to-r from-emerald-500 to-green-500"></span>
              </div>
            </div>

            {/* Date and Time */}
            <div className="mb-12">
              <p className="text-3xl font-light">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-400" style={{fontFamily: "'Metal Mania', cursive"}}>8th February 2024</span>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bandnight;
