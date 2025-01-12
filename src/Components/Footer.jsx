import React from 'react';
import mnitlogo from '../Assets/mnitlogo.png';
import clublogo from '../Assets/culturalclublogo.png';
import logo from "../Assets/blitz_logo.png";

const Footer = () => {
  return (
    <div className="relative bg-black text-white py-10 mt-16">
      {/* Top Section */}
      <div className="container top-0 h-auto mt-10 mx-auto px-6 md:px-16 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Logos */}
        <div className="flex flex-col items-center gap-4">
          <img src={logo} className="w-28 md:w-36 lg:w-40" alt="Blitzschlag Logo" />
          <div className="flex gap-6 justify-center">
            <img
              src={mnitlogo}
              className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
              alt="MNIT Logo"
            />
            <img
              src={clublogo}
              className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
              alt="Cultural Club Logo"
            />
          </div>
        </div>

        {/* Links and Credits */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
          <div className="text-sm sm:text-base">
            <p className="font-semibold text-lg mb-2">Links</p>
            <p><a href="https://mnit.ac.in/" target="_blank" rel="noopener noreferrer" className="hover:underline">MNIT</a></p>
            <p><a href="https://mnit.ac.in/cacs/" target="_blank" rel="noopener noreferrer" className="hover:underline">CACS</a></p>
            <p><a href="https://mnit.ac.in/blitzschlag/" target="_blank" rel="noopener noreferrer" className="hover:underline">Blitzschlag</a></p>
          </div>
          <div className="text-sm sm:text-base">
            <p className="font-semibold text-lg mb-2">Technical Secretary</p>
            <p>Sachin Agarwal</p>
            <p>Lokesh Kumar Suthar</p>
          </div>
          <div className="text-sm sm:text-base">
            <p className="font-semibold text-lg mb-2">Credits</p>
            <p>Anant Hansras</p>
            <p>Kavyansh Bagdi</p>
            <p>Abhinav Kumar Gupta</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="bottom-0 w-full">
        <div className="mt-10 border-t border-gray-600"></div>

        {/* Bottom Section */}
        <div className="container mx-auto px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
          <p className="text-center text-sm">
            © Developed by Technical Team (CACS) for BLITZSCHLAG 2025
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="text-lg font-semibold">Follow Us:</span>
            <div className="flex gap-4 items-center">
              {/* YouTube */}
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-red-600 transition transform hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path className="fill-current" d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-500 transition transform hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path className="fill-current" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-600 transition transform hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path className="fill-current" d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
