import React, { useEffect, useRef, useState } from "react";
import teamImg from "../Assets/teams.jpg";
import TeamCard from "../Components/TeamCard";

// Team Members' Images
import siddhantmohanty from "../Assets/monty.jpg";
import chestasoni from "../Assets/chestha.jpg";
import aayushsarraff from "../Assets/aayush.jpg";
import subhrajitroy from "../Assets/roy.jpg";
import jiteshyadav from "../Assets/jitesh.jpg";
import aryamansharma from "../Assets/arya.jpg";
import shravyabhamidipati from "../Assets/shravya.jpg";
import ishanhemnani from "../Assets/ishaan.jpg";
import shanirajput from "../Assets/shani.jpg";
import sachin from "../Assets/sachin.jpg";
import tusharsankhla from "../Assets/tushar.jpg";
import vinaybansal from "../Assets/vinay.png";
import yashasvigautam from "../Assets/yash.jpg";
import praveshnath from "../Assets/pravesh.jpg";
import rahulbairwa from "../Assets/rahul.jpg";
import anushkaagrahari from "../Assets/anushka.jpg";
import rajbilonia from "../Assets/raj.png";
import nitinkumar from "../Assets/nitin.jpg";
import ayushagarwal from "../Assets/aayushagr.jpg";
import nehaldave from "../Assets/nehal.jpg";
import amanamarnathtiwari from "../Assets/amantiwari.jpg";
import aditibajpai from "../Assets/aditi.png";
import rochitjain from "../Assets/rochit.jpg";
import anshshah from "../Assets/ansh.jpg";
import tanishagodha from "../Assets/tanisha.jpg";
import giriraj from "../Assets/giriraj.png";
import divyanshikushwah from "../Assets/divyanshi.jpg";
import ashokkumarmeena from "../Assets/ashokkumarmeena.jpg";
import simichaudhary from "../Assets/simichaudhary.jpg";
import vinaytanwawr from "../Assets/vinaytanwar.jpg"; 
import kritika from "../Assets/kritika.jpg"

import vidit from "../Assets/vidit.png";
import krithik from "../Assets/krithik.png";
import jassi from "../Assets/jassi.png";
import mad from "../Assets/mad.png";
import rudra from "../Assets/rudra.png";
import ronak from "../Assets/ronak.png";
import ankit from "../Assets/ankit.png";
import lokesh from "../Assets/lokesh.png"



import tv from '../Assets/tv.png';
import dipaloy from '../Assets/dipaloy.png';
import sandeep from '../Assets/sandeep.png';
import satish from '../Assets/satish.png';
import vks from '../Assets/vks.png';
import bhavna from '../Assets/bhavna.png';
import niraja from '../Assets/niraja.jpg';
import prabhakar from '../Assets/prabhakar.png';
import biman from '../Assets/biman.png';
import ritika from '../Assets/ritika.png';

// Core Team Data
const core_team = [
  { name: "Siddhant Mohanty", position: "President", img: siddhantmohanty },
  { name: "Chesta Soni", position: "Vice President", img: chestasoni },
  {
    name: "Aayush Sarraff",
    position: "Cultural Secretary",
    img: aayushsarraff,
  },
  { name: "Subhrajit Roy", position: "Cultural Secretary", img: subhrajitroy },
  { name: "Jitesh Yadav", position: "General Secretary", img: jiteshyadav },
  { name: "Aryaman Sharma", position: "General Secretary", img: aryamansharma },
  {
    name: "Shravya Bhamidipati",
    position: "General Secretary",
    img: shravyabhamidipati,
  },
  { name: "Ishan Hemnani", position: "Technical Secretary", img: ishanhemnani },
  { name: "Shani Rajput", position: "Technical Secretary", img: shanirajput },
  { name: "Sachin", position: "Technical Secretary", img: sachin },
  { name: "Lokesh Kumar Suthar", position: "Technical Secretary", img: lokesh },
  {
    name: "Tushar Sankhla",
    position: "Logistics Secretary",
    img: tusharsankhla,
  },
  { name: "Vinay Bansal", position: "Logistics Secretary", img: vinaybansal },
  {
    name: "Yashasvi Gautam",
    position: "Logistics Secretary",
    img: yashasvigautam,
  },
  { name: "Pravesh Nath", position: "Finance Secretary", img: praveshnath },
  { name: "Rahul Bairwa", position: "Finance Secretary", img: rahulbairwa },
  {
    name: "Anushka Agrahari",
    position: "Mass & Media Secretary",
    img: anushkaagrahari,
  },
  { name: "Raj Bilonia", position: "Mass & Media Secretary", img: rajbilonia },
  { name: "Nitin Kumar", position: "Mass & Media Secretary", img: nitinkumar },
  {
    name: "Ayush Agarwal",
    position: "Mass & Media Secretary",
    img: ayushagarwal,
  },
  { name: "Nehal Dave", position: "Publicity Secretary", img: nehaldave },
  {
    name: "Aman Tiwari",
    position: "Publicity Secretary",
    img: amanamarnathtiwari,
  },
  { name: "Aditi Bajpai", position: "Publicity Secretary", img: aditibajpai },
  { name: "Rochit Jain", position: "Marketing Secretary", img: rochitjain },
  { name: "Ansh Shah", position: "Marketing Secretary", img: anshshah },
  { name: "Tanisha Godha", position: "Marketing Secretary", img: tanishagodha },
  { name: "Giriraj", position: "Decor Secretary", img: giriraj },
  {
    name: "Divyanshi Kushwah",
    position: "Decor Secretary",
    img: divyanshikushwah,
  },
];

const advisors_team = [
  {
    name: "Krithik Mohan",
    position: "Advisor to VP + Cultural Secretary",
    img: krithik,
  },
  {
    name: "Jasneet Singh",
    position: "Advisor to Logistics + Decor Secretary",
    img: jassi,
  },
  {
    name: "Vidit Awasthi",
    position: "Advisor to President",
    img: vidit,
  },
  {
    name: "Madhvendra Singh",
    position: "Advisor to Logistics + Decor Secretary",
    img: mad,
  },
  {
    name: "Rudra Purohit",
    position: "Advisor to Marketing Secretary",
    img: rudra,
  },
  {
    name: "Ankit Sharma",
    position: "Advisor to General Secretary + Operational Management",
    img: ankit,
  },
  {
    name: "Krithik Mohan",
    position: "Advisor to VP + Cultural Secretary",
    img: krithik,
  },
  {
    name: "Jasneet Singh",
    position: "Advisor to Logistics + Decor Secretary",
    img: jassi,
  },
  {
    name: "Vidit Awasthi",
    position: "Advisor to President",
    img: vidit,
  },
  {
    name: "Madhvendra Singh",
    position: "Advisor to Logistics + Decor Secretary",
    img: mad,
  },
  {
    name: "Rudra Purohit",
    position: "Advisor to Marketing Secretary",
    img: rudra,
  },
  {
    name: "Ankit Sharma",
    position: "Advisor to General Secretary + Operational Management",
    img: ankit,
  },
  
];

const special_mention=[
  {
    name:"Vinay Tanwar",
    position:"",
    img:vinaytanwawr,
  },
  {
    name:"Ashok Kumar Meena",
    position:"",
    img: ashokkumarmeena,
  },
  {
    name:"Simi Chaudhary",
    position:"",
    img: simichaudhary,
    
  },
  {
    name:"Kritika",
    position:"",
    img: kritika,
    
  },
  {
    name:"Vinay Tanwar",
    position:"",
    img:vinaytanwawr,
  },
  {
    name:"Ashok Kumar Meena",
    position:"",
    img: ashokkumarmeena,
  },
  {
    name:"Simi Chaudhary",
    position:"",
    img: simichaudhary,
    
  },
  {
    name:"Kritika",
    position:"",
    img: kritika,
    
  },
  {
    name:"Vinay Tanwar",
    position:"",
    img:vinaytanwawr,
  },
  {
    name:"Ashok Kumar Meena",
    position:"",
    img: ashokkumarmeena,
  },
  {
    name:"Simi Chaudhary",
    position:"",
    img: simichaudhary,
    
  },
  {
    name:"Kritika",
    position:"",
    img: kritika,
    
  }
]

const organizing_committee = [
  {
    name: "Dr. Tarun Varma",
    position: "AD (Students)",
    img: tv,
  },
  {
    name: "Dr. Dipaloy Datta",
    position: "AD (Students)",
    img: dipaloy,
  },
  {
    name: "Dr. Sandeep Shrivastava",
    position: "AD (Mess)",
    img: sandeep,
  },
  {
    name: "Dr. Satish Pipralia",
    position: "AD (Sports)",
    img: satish,
  },
  {
    name: "Dr. Vikas Kumar Sanghal",
    position: "AD (Discipline)",
    img: vks,
  },
  {
    name: "Dr. Bhavna Shrivastava",
    position: "Coordinator Scholarships",
    img: bhavna,
  },
  {
    name: "Dr. Niraja Saraswat",
    position: "Coordinator UBA",
    img: niraja,
  },
  {
    name: "Dr. Ancesh Prabhakar",
    position: "Coordinator MoE Flagship Programs",
    img: prabhakar,
  },
  {
    name: "Dr. Biman Bandyopadhyay",
    position: "Coordinator Student Magazine",
    img: biman,
  },
  {
    name: "Dr. Ritika Mahajan",
    position: "Coordinator Wellness",
    img: ritika
  },
  {
    name: "Dr. Tarun Varma",
    position: "AD (Students)",
    img: tv,
  },
  {
    name: "Dr. Dipaloy Datta",
    position: "AD (Students)",
    img: dipaloy,
  },
  {
    name: "Dr. Sandeep Shrivastava",
    position: "AD (Mess)",
    img: sandeep,
  },
  {
    name: "Dr. Satish Pipralia",
    position: "AD (Sports)",
    img: satish,
  },
  {
    name: "Dr. Vikas Kumar Sanghal",
    position: "AD (Discipline)",
    img: vks,
  },
  {
    name: "Dr. Bhavna Shrivastava",
    position: "Coordinator Scholarships",
    img: bhavna,
  },
  {
    name: "Dr. Niraja Saraswat",
    position: "Coordinator UBA",
    img: niraja,
  },
  {
    name: "Dr. Ancesh Prabhakar",
    position: "Coordinator MoE Flagship Programs",
    img: prabhakar,
  },
  {
    name: "Dr. Biman Bandyopadhyay",
    position: "Coordinator Student Magazine",
    img: biman,
  },
  {
    name: "Dr. Ritika Mahajan",
    position: "Coordinator Wellness",
    img: ritika
  },
  {
    name: "Dr. Tarun Varma",
    position: "AD (Students)",
    img: tv,
  },
  {
    name: "Dr. Dipaloy Datta",
    position: "AD (Students)",
    img: dipaloy,
  },
  {
    name: "Dr. Sandeep Shrivastava",
    position: "AD (Mess)",
    img: sandeep,
  },
  {
    name: "Dr. Satish Pipralia",
    position: "AD (Sports)",
    img: satish,
  },
  {
    name: "Dr. Vikas Kumar Sanghal",
    position: "AD (Discipline)",
    img: vks,
  },
  {
    name: "Dr. Bhavna Shrivastava",
    position: "Coordinator Scholarships",
    img: bhavna,
  },
  {
    name: "Dr. Niraja Saraswat",
    position: "Coordinator UBA",
    img: niraja,
  },
  {
    name: "Dr. Ancesh Prabhakar",
    position: "Coordinator MoE Flagship Programs",
    img: prabhakar,
  },
  {
    name: "Dr. Biman Bandyopadhyay",
    position: "Coordinator Student Magazine",
    img: biman,
  },
  {
    name: "Dr. Ritika Mahajan",
    position: "Coordinator Wellness",
    img: ritika
  }
];

    
const Team = () => {

const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { rootMargin: "50px" } // Adjust as needed
      );
  
      if (ref.current) {
        observer.observe(ref.current);
      }
  
      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, []);



  const [activeTab, setActiveTab] = useState("core");
  const scrollContainerRef = useRef(null);
  const animationFrameRef = useRef(null);

  const getTeamData = () => {
    if (activeTab === "advisors") return advisors_team;
    if (activeTab === "special") return special_mention;
    if (activeTab === "organizing") return organizing_committee;
    return core_team;
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const scrollSpeed = 5; // Adjust the speed

    const scroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed;

        // Check if the scroll has reached the end
        if (
          scrollContainer.scrollLeft >=
          scrollContainer.scrollWidth / 2
        ) {
          // Reset scroll to the beginning of the duplicated content
          scrollContainer.scrollLeft = 0;
        }

        animationFrameRef.current = requestAnimationFrame(scroll);
      }
    };

    scroll();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [activeTab]);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  const teamData = getTeamData();
  const duplicatedTeamData = [...teamData, ...teamData]; // Duplicate data for infinite scroll

  return (
    <div className="h-screen w-full bg-transparent relative overflow-hidden">
      {/* Background Image */}
      <div
      ref={ref}
        className="absolute inset-0 bg-cover bg-center"
         style={{ 
          // backgroundImage: `url(${teamImg})`,
        backgroundImage: isVisible ? `url(${teamImg})` : "none", }}
      ></div>

      {/* Heading */}
      <h2
        className="text-center tracking-wider mx-auto mb-20 font-bold text-5xl text-white mt-24 z-20 drop-shadow-lg"
        style={{ fontFamily: "'Metal Mania', cursive" }}
      >
        {activeTab === "advisors"
          ? "Advisors Team"
          : activeTab === "special"
          ? "Special Mention"
          : activeTab === "organizing"
          ? "Organising Committee"
          : "Team Avyukt"}
      </h2>

      {/* Horizontal Scrollable Content */}
      <div
        ref={scrollContainerRef}
        className="z-10 flex space-x-6 md:space-x-8 -mt-16 mx-auto justify-center items-center overflow-hidden max-h-[70vh]"
        style={{
          whiteSpace: "nowrap",
        }}
      >
        <div className="flex justify-center">
          {duplicatedTeamData.map((member, index) => (
            <div
              key={index}
              className="inline-block mx-4 md:mx-6"
              style={{ minWidth: "200px" }}
            >
              <TeamCard img={member.img} name={member.name} post={member.position} />
            </div>
          ))}
        </div>
      </div>

      {/* Tab Buttons */}
      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 md:gap-8 px-2 sm:px-4 scrollbar-hide">
  <button
    className={`relative py-1.5 px-3 sm:py-2 sm:px-4 md:py-3 md:px-8 border border-black text-xs sm:text-sm md:text-lg font-medium md:font-semibold uppercase text-white bg-transparent rounded-full shadow-md md:shadow-lg backdrop-blur-sm transition-all duration-300 transform ${
      activeTab === "special"
        ? "bg-white/30 shadow-xl md:shadow-2xl"
        : "hover:bg-white/40 hover:shadow-lg"
    }`}
    onClick={() => handleTabSwitch("special")}
  >
    <span className="sm:hidden">Special</span>
    <span className="hidden sm:block">Special Mention</span>
  </button>
  <button
    className={`relative py-1.5 px-3 sm:py-2 sm:px-4 md:py-3 md:px-8 border border-black text-xs sm:text-sm md:text-lg font-medium md:font-semibold uppercase text-white bg-transparent rounded-full shadow-md md:shadow-lg backdrop-blur-sm transition-all duration-300 transform ${
      activeTab === "core"
        ? "bg-white/30 shadow-xl md:shadow-2xl"
        : "hover:bg-white/40 hover:shadow-lg"
    }`}
    onClick={() => handleTabSwitch("core")}
  >
    <span className="sm:hidden">Core</span>
    <span className="hidden sm:block">Core Team</span>
  </button>
  <button
    className={`relative py-1.5 px-3 sm:py-2 sm:px-4 md:py-3 md:px-8 border border-black text-xs sm:text-sm md:text-lg font-medium md:font-semibold uppercase text-white bg-transparent rounded-full shadow-md md:shadow-lg backdrop-blur-sm transition-all duration-300 transform ${
      activeTab === "advisors"
        ? "bg-white/30 shadow-xl md:shadow-2xl"
        : "hover:bg-white/40 hover:shadow-lg"
    }`}
    onClick={() => handleTabSwitch("advisors")}
  >
    <span className="sm:hidden">Advisors</span>
    <span className="hidden sm:block">Advisors Team</span>
  </button>
  <button
    className={`relative py-1.5 px-3 sm:py-2 sm:px-4 md:py-3 md:px-8 border border-black text-xs sm:text-sm md:text-lg font-medium md:font-semibold uppercase text-white bg-transparent rounded-full shadow-md md:shadow-lg backdrop-blur-sm transition-all duration-300 transform ${
      activeTab === "organizing"
        ? "bg-white/30 shadow-xl md:shadow-2xl"
        : "hover:bg-white/40 hover:shadow-lg"
    }`}
    onClick={() => handleTabSwitch("organizing")}
  >
    <span className="sm:hidden">Organizing</span>
    <span className="hidden sm:block">Organising Committee</span>
  </button>
</div>

    </div>
  );
};

export default Team;