import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Drawer from "react-modern-drawer";

import "react-modern-drawer/dist/index.css";
import logo from "../Assets/blitz_logo.png";
import { auth } from "../../fi"; // Assuming you have a firebase.js file where auth is initialized
import "../css files/navbar.css";
import {
  FaHome,
  FaInfoCircle,
  FaUser,
  FaCalendarAlt,
  FaUsers,
  FaHandHoldingHeart,
  FaSignInAlt,
  FaSignOutAlt,
  FaTicketAlt,
  FaCubes,
  FaMusic,
  FaQuestionCircle,
} from "react-icons/fa";
import { PiRankingDuotone } from "react-icons/pi";

import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import styled from "styled-components";
import { Check } from "lucide-react";

const Checkbox = ({ isDrawerOpen, setIsDrawerOpen }) => {
  const handleChange = () => {
    setIsDrawerOpen(!isDrawerOpen); // Toggle drawer state
  };

  return (
    <StyledWrapper>
      <label className="hamburger">
        <input
          type="checkbox"
          checked={isDrawerOpen}
          onChange={handleChange} // Toggle state on change
        />
        <svg viewBox="0 0 32 32">
          <path
            className="line line-top-bottom"
            d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
          />
          <path className="line" d="M7 16 27 16" />
        </svg>
      </label>
    </StyledWrapper>
  );
};

const Navbar = () => {
//qr
const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Clean up the listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowLogoutModal(false);
      navigate("/"); // Redirect to homepage after logout
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };
  const handlePaymentClick = ()=>{
    navigate("/pay");
  }

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <div className="absolute w-full z-50 bg-transparent">
      {
          isOpen && <QRmodal  toggleModal={toggleModal} />
      }


      <div className="flex justify-between items-center">
        <div>
          <Link to="/">
            <img
              src={logo}
              alt="Blitz Logo"
              className="h-20 p-1 ml-3 absolute top-1"
            />
          </Link>
        </div>

        {/* Main Navigation (Visible in PC) */}
        <div
          className="hidden relative font-normal p-1 top-3 left-12 text-2xl bg-black bg-opacity-10 backdrop-blur-md border border-[#ffffff2f] rounded-xl text-white   lg:flex justify-between items-center gap-x-7"
          style={{ fontFamily: "'Jaro', sans-serif" }}
        >
          <Link
            to="/event"
            className="px-4 py-2 hover:text-[#D3D3D3]  transition-all duration-200"
          >
            EVENTS
          </Link>
          {!user ? (
            <Link
              to="/login"
              className="px-4 py-2 hover:text-[#D3D3D3]  transition-all duration-200"
            >
              LOGIN
            </Link>
          ) : (
            <></>
          )}
          {user && (
            <Link
              to="/profile"
              className="px-4 py-2 hover:text-[#D3D3D3]  transition-all duration-200"
            >
              PROFILE
            </Link>
          )}
          <Link
            to="/schedule"
            className="px-4 py-2 hover:text-[#D3D3D3] transition-all duration-200"
          >
            SCHEDULE
          </Link>
          <Link
            to="/sponsor"
            className="px-4 py-2 hover:text-[#D3D3D3] transition-all duration-200"
          >
            SPONSER
          </Link>
          <Link
            to="/faq"
            className="px-4 py-2 hover:text-[#D3D3D3] transition-all duration-200"
          >
            FAQ
          </Link>
        </div>

        {/* Drawer Icon */}
        <div onClick={toggleDrawer} className="cursor-pointer text-2xl px-4">
          <Checkbox
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
          />
        </div>
      </div>

      {/* Drawer for Mobile Navigation */}
      <Drawer
  open={isDrawerOpen}
  onClose={toggleDrawer}
  direction="right"
  style={{
    backgroundColor: "transparent", // Custom background color
  }}
  size={250}
>
  <div className="flex flex-col items-left p-10 bg-black bg-opacity-100 h-full overflow-y-scroll ">
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Montserrat:wght@400;500&display=swap');
    </style>
    <div className="text-gold text-lg font-cinzel">
      <Link
        to="/"
        style={{fontFamily: "'Metal Mania', cursive",}}
        className="flex items-center px-4 py-3 mb-4 hover:text-indigo-300"
        onClick={toggleDrawer}
      >
        <FaHome className="mr-3" />
        Home
      </Link>
      <Link
        to="/about"
        style={{fontFamily: "'Metal Mania', cursive",}}
        className="flex items-center px-4 py-3 mb-4 hover:text-indigo-300"
        onClick={toggleDrawer}
      >
        <FaInfoCircle className="mr-3" />
        About
      </Link>
      <Link
        to="/sponsor"
        style={{fontFamily: "'Metal Mania', cursive",}}
        className="flex items-center px-4 py-3 mb-4 hover:text-indigo-300"
        onClick={toggleDrawer}
      >
        <FaHandHoldingHeart className="mr-3" />
        Sponsor
      </Link>
      <Link
        to="/our_team"
        style={{fontFamily: "'Metal Mania', cursive",}}
        className="flex items-center px-4 py-3 mb-4 hover:text-indigo-300"
        onClick={toggleDrawer}
      >
        <FaUsers className="mr-3" />
        Our Team
      </Link>
      <Link
        to="/schedule"
        style={{fontFamily: "'Metal Mania', cursive",}}
        className="flex items-center px-4 py-3 mb-4 hover:text-indigo-300"
        onClick={toggleDrawer}
      >
        <FaCalendarAlt className="mr-3" />
        Schedule
      </Link>
      {user && (
        <Link
          to="/profile"
          style={{fontFamily: "'Metal Mania', cursive",}}
          className="flex items-center px-4 py-3 mb-4 hover:text-indigo-300"
          onClick={toggleDrawer}
        >
          <FaUser className="mr-3" />
          Profile
        </Link>
      )}
      <Link
        to="/campus_embassador"
        style={{fontFamily: "'Metal Mania', cursive",}}
        className="flex items-center px-4 py-3 mb-4 hover:text-indigo-300"
        onClick={toggleDrawer}
      >
        <FaUsers className="mr-3" />
        <span>Ambassador</span>
      </Link>
      <Link
        to="/pronites"
        style={{fontFamily: "'Metal Mania', cursive",}}
        className="flex items-center px-4 py-3 mb-4 hover:text-indigo-300"
        onClick={toggleDrawer}
      >
        <FaMusic className="mr-3" />
        ProNites
      </Link>
      <Link
        to="/pass"
        style={{fontFamily: "'Metal Mania', cursive",}}
        className="flex items-center px-4 py-3 mb-4 hover:text-indigo-300"
        onClick={toggleDrawer}
      >
        <FaTicketAlt className="mr-3" />
        Pass
      </Link>
      <Link
        to="/champions_throphy"
        style={{fontFamily: "'Metal Mania', cursive",}}
        className="flex items-center px-4 py-3 mb-4 hover:text-indigo-300"
        onClick={toggleDrawer}
      >
        <PiRankingDuotone className="mr-3" />
        Champions Trophy
      </Link>
      <Link
        to="/pay"
        style={{fontFamily: "'Metal Mania', cursive",}}
        className="flex items-center px-4 py-3 mb-4 hover:text-indigo-300"
      >
        <RiMoneyRupeeCircleFill className="mr-3" />
        Payment
      </Link>
      {!user ? (
        <>
          <Link
            to="/signup"
            style={{fontFamily: "'Metal Mania', cursive",}}
            className="flex items-center px-4 py-3 mb-4 hover:text-indigo-300"
            onClick={toggleDrawer}
          >
            <FaSignOutAlt className="mr-3" />
            Sign Up
          </Link>
          <Link
            to="/login"
            style={{fontFamily: "'Metal Mania', cursive",}}
            className="flex items-center px-4 py-3 mb-4 hover:text-indigo-300"
            onClick={toggleDrawer}
          >
            <FaSignInAlt className="mr-3" />
            Login
          </Link>
        </>
      ) : null}
      <Link
        to="/event"
        style={{fontFamily: "'Metal Mania', cursive",}}
        className="flex items-center px-4 py-3 mb-4 hover:text-indigo-300"
        onClick={toggleDrawer}
      >
        <FaCalendarAlt className="mr-3" />
        Event
      </Link>
      <Link
      
        to="/faq"
        className="flex items-center px-4 py-3 mb-4 hover:text-indigo-300"
        style={{fontFamily: "'Metal Mania', cursive",}}
        onClick={toggleDrawer}
      >
        <FaQuestionCircle className="mr-3" />
        FAQ
      </Link>
    </div>
  </div>
</Drawer>


      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-black">
            <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StyledWrapper = styled.div`
  .hamburger {
    cursor: pointer;
    display: inline-block;
    position: relative; /* Ensures proper stacking */
    z-index: 9999; /* Ensures it's above the navbar or drawer */
    width: 50px;
    height: 50px;
  }

  .hamburger input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0; /* Hides the checkbox but keeps it clickable */
    cursor: pointer;
    z-index: 9999; /* Ensures it's clickable */
  }

  .hamburger svg {
    width: 100%;
    height: 100%;
    z-index: 9999; /* Ensures the icon is visible above other elements */
    transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .line {
    fill: none;
    stroke: white;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 3;
    transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
      stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .line-top-bottom {
    stroke-dasharray: 12 63;
  }

  .hamburger input:checked + svg {
    transform: rotate(-45deg); /* Cross effect */
  }

  .hamburger input:checked + svg .line-top-bottom {
    stroke-dasharray: 20 300;
    stroke-dashoffset: -32.42;
  }
`;



export default Navbar;
