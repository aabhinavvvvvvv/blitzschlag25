import React from 'react';
import bg from '../Assets/championsbg.jpg';
import blitz from '../Assets/aboutChampions.jpg';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../css files/throphy.css';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const ChampionsTrophy = () => {
  const navigate = useNavigate();

  // Animation Variants
  const slideInFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const slideInFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  return (
    <div
      className="min-h-screen w-full bg-transparent relative overflow-y-scroll"
      style={{ fontFamily: 'cursive' }}
    >
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center opacity-70"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>

      <div className="text-white overflow-y-auto">
        {/* Hero Section */}
        <section className="relative text-center pt-12 pb-4">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mt-8 tracking-wider text-center"
            style={{ fontFamily: "'Metal Mania', cursive" }}
          >
            Champions Trophy
          </h1>
        </section>

        {/* About Blitz */}
        <section className="relative py-6 mt-0 px-4 sm:px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 place-items-center gap-6">
          {/* Image */}
          <motion.div
            variants={slideInFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="bg-black w-fit rounded-lg"
          >
            <img
              src={blitz || '/placeholder.svg'}
              alt="About Us"
              className="rounded-lg opacity-80 shadow-lg h-[18rem] w-[18rem] sm:h-[22rem] sm:w-[22rem]"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            className="bg-black rounded-xl bg-opacity-30 w-full p-5 text-center"
            variants={slideInFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              About<br />Champions Trophy
            </h2>
            <p className="text-gray-300 text-sm sm:text-base mb-6">
              Blitzschlag 2025, the much-awaited annual fest, is all set to take place from the 7th to the 9th of February 2025. This grand celebration of art, culture, and technology promises an unforgettable experience for everyone. With a perfect blend of electrifying performances, innovative competitions, and insightful workshops, Blitzschlag offers something for every enthusiast. It's more than just an event; it's a platform to showcase talent, ignite creativity, and connect with like-minded individuals. Get ready to immerse yourself in three days of excitement, inspiration, and endless memories.
            </p>
          </motion.div>
        </section>

        {/* Button */}
        <section className="flex justify-center mt-6">
          <div className="container flex justify-center">
            <div
              className="btn text-sm sm:text-lg font-semibold bg-black bg-opacity-40 px-6 py-3 rounded-lg shadow-md hover:bg-opacity-50 transition-all duration-300"
              style={{ fontFamily: 'cursive' }}
            >
              <Link to="/leaderboard" className="flex items-center">
                Leader Board <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChampionsTrophy;

