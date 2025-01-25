import React from 'react';
import bg from '../Assets/sponsor.jpg';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import mnit from '../Assets/prabhaBhawan.jpg'
import cs from '../Assets/cs_image.png'
import blitz from '../Assets/about_blitz_img.jpg'
const AboutUs = () => {
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
      className="h-screen w-screen bg-transparent relative overflow-y-scroll overflow-x-hidden"
      style={{ fontFamily: 'cursive' }}
    >
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>

      <div className="text-white overflow-y-auto">
        {/* Hero Section */}
        <section className="relative text-center py-16">
          <h1
            className="text-6xl font-bold mt-8 tracking-wider text-center"
            style={{ fontFamily: "'Metal Mania', cursive" }}
          >
            About Us
          </h1>
        </section>

        {/* About Blitz */}
        <section className="relative py-8 mt-2 px-6 lg:px-20 grid lg:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <motion.div
            variants={slideInFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <img
              src={blitz}
              alt="About Us"
              className="rounded-lg shadow-lg max-w-full"
            />
          </motion.div>
          {/* Content */}
          <motion.div
            className="bg-black rounded-xl bg-opacity-20 p-5 text-center"
            variants={slideInFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <h2 className="text-4xl font-bold mb-4">About Blitzschlag</h2>
            <p className="text-gray-300 mb-6">
            Welcome to Blitzschlag 2025, Rajasthan's most anticipated annual cultural extravaganza, hosted at MNIT Jaipur. This spectacular fest embodies the vibrant spirit of our community, showcasing creativity, cooperation, coordination, and celebration. Blitzschlag is a symphony of diverse talents, fostering enjoyment, cultural exchange, and personal growth. It's a platform where individuals from all backgrounds converge, sharing rich cultural heritage and forging lifelong connections. With a staggering footfall of over 30,000 and more than 60 electrifying events, Blitzschlag 2025 is set to be a cultural spectacle like no other. Our 4 flagship events promise unforgettable experiences: TAMASHA: dramatic flair and theatrical spectacle; RAMBA SAMBA: electrifying dance face-off; BATTLE OF BANDS: Sonic showdown; and PANACHE: the fashion-forward showcases. Whether performer, spectator, or volunteer, Blitzschlag offers unforgettable moments, enduring connections, cultural enrichment, and artistic expression. This fest celebrates every individual, every talent, and every story.  Blitzschlag 2025 brings together diverse individuals, fostering creativity, innovation, and teamwork. Where diversity meets creativity, and memories last a lifetime. Get ready to immerse yourself in Rajasthan's most vibrant cultural celebration! </p>
          </motion.div>
        </section>

        {/* Theme */}
        <section className="relative py-8 mt-2 px-6 lg:px-20 grid grid-flow-row lg:grid-cols-2 gap-8 items-center lg:flex-row max-w-full">
          {/* Content */}
          <motion.div
            className="bg-black rounded-xl bg-opacity-20 p-5 text-center"
            variants={slideInFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <h2 className="text-4xl font-bold mb-4">Theme</h2>
            <p className="text-gray-300 mb-6">
              Step into Dreamscape, a world where the surreal meets reality, and the boundaries of the ordinary are blurred. This year, we summon you to embark on an ethereal journey, where whimsical fantasies intertwine with seraphic realities, crafting a vivid interpretation of imaginations and weaving a magical tapestry of dreams. Venture beyond the clouds of reality to unlock the power of lucid dreaming, where imagination takes flight and every thought becomes a brushstroke on the canvas of possibility. Evoke your craziest vision and watch it come to life here. Let your thoughts morph into a brushstroke on the boundless canvas of possibilities. Join us in this captivating adventure, where we unearth the orphic beauty within the subconscious, with dreams being not just mere figments of imagination but portals to extraordinary new realms, waiting to be unveiled.
            </p>
          </motion.div>
          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 gap-8 text-center"
            variants={slideInFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <div>
              <h3 className="text-3xl font-bold">35000+</h3>
              <p className="text-gray-400">Footfalls</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">10,00,000+</h3>
              <p className="text-gray-400">Prize worth</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">70+</h3>
              <p className="text-gray-400">Events</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">80+</h3>
              <p className="text-gray-400">Awards</p>
            </div>
          </motion.div>
        </section>

        {/* MNIT */}
        <section className="relative py-8 px-6 lg:px-20 grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            variants={slideInFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <img
              src={mnit}
              alt="About Us"
              className="rounded-lg shadow-lg"
            />
          </motion.div>
          <motion.div
            className="bg-black rounded-xl bg-opacity-20 p-5 text-center"
            variants={slideInFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <h2 className="text-4xl font-bold mb-4">About MNIT</h2>
            <p className="text-gray-300 mb-6">
              The Institute was jointly established in 1963 as Malaviya Regional Engineering College Jaipur by the Government of India and the Government of Rajasthan. Subsequently, on 26 June, 2002, the college was given the status of National Institute of Technology. On 15 August 2007, it was recognized as the Institute of National Importance through an Act of Parliament. The Institute is fully funded by the Ministry of Education (Shiksha Mantralaya), Government of India.
            </p>
          </motion.div>
        </section>

        {/* abbout cacs */}
        <section className="relative py-8 mt-2 px-6 lg:px-20 grid grid-flow-row lg:grid-cols-2 gap-8 items-center lg:flex-row">
          {/* Content */}
          <motion.div
            className="bg-black rounded-xl bg-opacity-20 p-5 text-center order-2 lg:order-1"
            variants={slideInFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <h2 className="text-4xl font-bold mb-4">About CACS</h2>
            <p className="text-gray-300 mb-6">
              Cultural Society of the Institute is an umbrella that shelters numerous clubs and societies. The motto is to facilitate and promote opportunities as well as a platform for students to prove their mettle and to explore their passion through a plethora of interactive and innovative events.
              Participating in cultural pursuits helps you become more well-rounded and ready for the real world. They aid in students' sense of belonging to the Institute and help them grow professionally and personally by honing abilities including planning, public speaking, and teamwork.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            className="order-1 lg:order-2"
            variants={slideInFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <img
              src={cs}
              alt="About Us"
              className="rounded-lg shadow-lg ml-auto"
            />
          </motion.div>
        </section>



        {/* Call to Action */}
        <section className="relative py-16 text-center">
          <motion.h2
            className="text-4xl font-bold mb-4"
            variants={slideInFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            We Are Always Ready To Take A Perfect Shot
          </motion.h2>
          <button
            onClick={() => navigate('/event')}
            className="py-3 px-8 bg-white text-black rounded-full font-semibold transition duration-300 hover:bg-gray-200"

          >
            Get Started
          </button>
        </section>
     
      </div>
    </div>
  );
};

export default AboutUs;
