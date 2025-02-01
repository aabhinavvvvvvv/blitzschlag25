import React from 'react'
import Footer from '../Components/Footer'
import logo from '../Assets/rhbsvg.png';
import cotitile from '../Assets/Hero.png';
import "./fireworks.scss"

const Sponsor = () => {
  return (
    <div className="pyro z-100">
      <div className="before"></div>
      <div className="after"></div>
      <div
        className="relative flex flex-col items-center justify-center py-32 gap-y-8" // Removed h-screen and w-screen
      >
        <div className='text-center'>
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

          <p className=' text-yellow-500 font-bold'>Title Sponsor</p>
          <div className='text-center text-xl'>
            <img className='w-5/6 md:w-2/5 mx-auto aspect-auto' src={logo} alt="" />
          </div>

          <p className=' text-yellow-500 font-bold'>Co-Title Sponsor</p>
          <div className='text-center text-xl'>
            <img className='w-5/6 md:w-2/5 mx-auto aspect-auto' src={cotitile} alt="" />
          </div>

          <p className=' text-yellow-500 font-bold'>Gold Sponsor</p>
          <div className='text-center text-xl grid'>
            <img className='w-5/6 md:w-2/5 mx-auto aspect-auto' src="https://play-lh.googleusercontent.com/aWU1tIzjsokCdadf3qTxKl7bFrQ5s4Fvoaysm7TcpgB0hIam5KG75NajZqGpsw9_bA" alt=""/>
          </div>
      </div>

    </div>
  )
}

export default Sponsor;
