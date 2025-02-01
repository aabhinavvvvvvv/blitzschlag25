import React from 'react'
import Footer from '../Components/Footer'
import logo from '../Assets/rhbsvg.png';
import "./fireworks.scss"

const Sponsor = () => {
  return (
    <>
      <div className="pyro z-100">
        <div className="before"></div>
        <div className="after"></div>
        <div
          className="relative flex flex-col items-center justify-center py-16" // Removed h-screen and w-screen
        >
          <div className='text-center my-8 mb-16'>
            <p
              className="text-3xl md:text-6xl font-normal tracking-wider"
              style={{
                fontFamily: "'Metal Mania', cursive",
                WebkitTextFillColor: "#FFFBFB",
                textShadow: "0 0 10px rgba(255, 255, 255, 0.6)",
              }}
            >
              BLITZSCHLAG
            </p>
            <p className='text-xl text-yellow-500 '>Meet Our Amazing Sponsors</p>
          </div>

          <div className='text-center text-xl'>
            <p className=' text-yellow-500 font-bold'>Title Sponsor</p>
            <img className='w-5/6 md:w-2/5 mx-auto aspect-auto' src={logo} alt="" />
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  )
}

export default Sponsor;
