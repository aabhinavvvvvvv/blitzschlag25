import React, { useEffect, useState, useRef } from "react";
import { Ticket } from "lucide-react";
import "../css files/liveshow.css";
import promnightImage from "../Assets/Prom.jpg";
import { useNavigate } from "react-router-dom";

function PromNight() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.9,
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
// useEffect(() => {
//     const container = document.querySelector(".stars-container");
//     if (container) {
//       for (let i = 0; i < 100; i++) {
//         const star = document.createElement("div");
//         star.className = "star";
//         const size = Math.random() * 9;
//         star.style.width = `${size}px`;
//         star.style.height = `${size}px`;
//         star.style.left = `${Math.random() * 100}%`;
//         star.style.top = `${Math.random() * 100}%`;
//         star.style.setProperty("--duration", `${2 + Math.random() * 1}s`);
//         star.style.setProperty("--opacity", `${0.5 + Math.random() * 0.8}`);
//         container.appendChild(star);
//       }
//     }
//   }, []);
useEffect(() => {
    const container = document.querySelector(".stars-container");
    if (container) {
        container.innerHTML = ""; // Clear existing hearts before adding new ones
        
        for (let i = 0; i < 120; i++) { // Increased the number of hearts
            const heart = document.createElement("div");
            heart.className = "heart"; // Updated class name

            // Random size variation
            const size = Math.random() * 12 + 2; // Size range: 2px - 10px
            heart.style.width = `${size}px`;
            heart.style.height = `${size}px`;

            // Random position
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.top = `${Math.random() * 100}%`;

            // Animation properties
            heart.style.setProperty("--duration", `${2 + Math.random() * 2}s`); // Flickering duration
            heart.style.setProperty("--opacity", `${0.3 + Math.random() * 0.7}`); // Opacity variation

            // Random slight color variation (shades of pink)
            const heartColors = ["#ff1493", "#ff69b4", "#ff85a2", "#ff4081"];
            heart.style.backgroundColor = heartColors[Math.floor(Math.random() * heartColors.length)];

            container.appendChild(heart);
        }
    }
}, []);

  
  return (
    <div className="h-screen bg-black text-white overflow-hidden relative">
      <div className="stars-container absolute inset-0 overflow-hidden z-0" />
      <div className="absolute inset-0 z-10" />

      <div className="relative h-full z-20 flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 flex items-center gap-28">
          <div
            ref={sectionRef}
            className={`hidden md:block w-full transform transition-all duration-1000 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
            }`}
          >
            <div className="relative w-full mx-auto mt-10 scale-[0.8]">
  {/* Glowing Effect */}
  <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-300 opacity-50 blur-2xl rounded-3xl"></div>

  {/* Heart Shaped Image */}
  <div className="relative overflow-hidden heart-shape">
    <div className="w-full h-full bg-gradient-to-b from-transparent rounded-xl to-black/50 absolute bottom-0 z-10"></div>
    <img
      className="w-full h-full object-cover floating-image"
      alt="Prom Night"
      style={{ objectPosition: "center top" }}
      src={promnightImage}
    />
  </div>
</div>

          </div>

          <div className="block md:hidden w-full text-center relative ">
            <h1 className="text-6xl font-bold absolute -top-36 left-44 transform -translate-x-1/2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500" style={{fontFamily: "'Metal Mania', cursive"}}>
              Prom Night
            </h1>
            <div className="absolute -inset-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-300 opacity-90 blur-2xl rounded-full"></div>
            <div className="relative mx-auto ">
              <div className="relative overflow-hidden rounded-2xl ">
                <div className="w-full h-full bg-gradient-to-b from-transparent rounded-xl to-black/50 absolute bottom-0 z-10"></div>
                <img
                  className="w-full h-full object-cover floating-image"
                  alt="Prom Night"
                  style={{ objectPosition: "center top" }}
                  src={promnightImage}
                />
              </div>
            </div>

            <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-full flex justify-center">
              <button
                className="group relative overflow-hidden rounded-xl text-xl font-semibold w-64"
                onClick={() => {
                  navigate("/prom-pass");
                }}
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-300 transform group-hover:scale-105 transition-transform duration-300"></div>
                <div className="absolute -inset-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-300 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-black/50 backdrop-blur-sm rounded-xl px-8 py-4 flex items-center justify-center gap-2 group-hover:bg-black/40 transition-colors duration-300">
                  <Ticket className="w-5 h-5" />
                  Get Your Pass
                </div>
              </button>
            </div>
          </div>

          <div
            className={`w-full md:w-4/5 text-center md:text-left transform transition-all duration-1000 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-80 opacity-0"
            } md:block hidden`}
          >
            <div className="mb-12">
              <h1 className="text-7xl md:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-300 " style={{fontFamily: "'Metal Mania', cursive"}}>
                Prom Night
              </h1>
              <div className="flex items-center md:justify-start justify-center space-x-3">
                <span className="h-0.5 w-12 bg-blue-500"></span>
                <p className="text-2xl text-gray-300">A Night to Remember</p>
                <span className="h-0.5 w-12 bg-blue-500"></span>
              </div>
            </div>

            <div className="mb-12">
              <p className="text-3xl font-light text-gray-300">
                <span className="text-pink-400" style={{fontFamily: "'Metal Mania', cursive"}}>10th February 2024</span>
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <button
                className="group relative overflow-hidden rounded-xl text-xl font-semibold w-64"
                onClick={() => {
                  navigate("/prom-registration");
                }}
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-300  transform group-hover:scale-105 transition-transform duration-300"></div>
                <div className="absolute -inset-[2px] bg-gradient-to-r from-pink-500 to-purple-500  rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-black/50 backdrop-blur-sm rounded-xl px-8 py-4 flex items-center justify-center gap-2 group-hover:bg-black/40 transition-colors duration-300">
                  <Ticket className="w-5 h-5" />
                  Register Now
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromNight;
