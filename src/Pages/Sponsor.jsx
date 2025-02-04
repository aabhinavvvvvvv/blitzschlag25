// import React from 'react'
// import Footer from '../Components/Footer'
import logo from '../Assets/rhbsvg.png';
import cotitile from '../Assets/Hero.png';

import React from "react";
import a from '../Assets/logos/1.png';
import b from '../Assets/logos/2.png';
import c from '../Assets/logos/3.png';
import d from '../Assets/logos/4.png';
import e from '../Assets/logos/5.jpg';
import f from '../Assets/logos/6.jpg';
import g from '../Assets/logos/7.png';
import h from '../Assets/logos/8.jpg';
import i from '../Assets/logos/9.png';
import j from '../Assets/logos/10.png';
import k from '../Assets/logos/11.jpg';
import l from '../Assets/logos/12.jpg';
import m from '../Assets/logos/13.jpg';
import n from '../Assets/logos/14.png';
import o from '../Assets/logos/15.jpg';
import p from '../Assets/logos/16.png';
import q from '../Assets/logos/17.jpg';
import r from '../Assets/logos/18.png';
import s from '../Assets/logos/19.jpg';
import t from '../Assets/logos/20.jpg';
import u from '../Assets/logos/21.png';
import v from '../Assets/logos/22.jpg';
import w from '../Assets/logos/23.png';
import x from '../Assets/logos/24.jpg';

import "./fireworks.scss"
const sponsors = [
  { name: "Title Sponsor", logo: c, tier: "title" },
  { name: "Co-Title Sponsor", logo: cotitile, tier: "co-title" },
  { name: "Co-Title Sponsor", logo: q, tier: "co-title" },
  { name: "Flagship Sponsor", logo: p, tier: "flagship" },
  { name: "Flagship Sponsor ", logo: "https://play-lh.googleusercontent.com/aWU1tIzjsokCdadf3qTxKl7bFrQ5s4Fvoaysm7TcpgB0hIam5KG75NajZqGpsw9_bA", tier: "flagship" },
  { name: "Food Partner", logo: b, tier: "other" },
  { name: "Snacking Partner", logo: f, tier: "other" },
  { name: "Ice Cream Partner", logo: g, tier: "other" },
  { name: "Overseas Education Partner", logo: h, tier: "other" },
  { name: "Desert Partner", logo: i, tier: "other" },
  { name: "Beauty Partner", logo: j, tier: "other" },
  { name: "Food Partner", logo: k, tier: "other" },
  { name: "Associate Sponsor", logo: l, tier: "other" },
  { name: "Food Partner", logo: m, tier: "other" },
  { name: "Fashion & Lifestyle Partner", logo: n, tier: "other" },
  { name: "Drinks Partner", logo: o, tier: "other" },
  { name: "Food Partner", logo: d, tier: "other" },
  { name: "Infrastructure Partner", logo: a, tier: "other" },
  { name: "Radio Partner", logo: r, tier: "other" },
  { name: "Wellness Partner", logo: s, tier: "other" },
  { name: "Foreign Pathway Partner", logo: t, tier: "other" },
  { name: "Driven By", logo: u, tier: "other" },
  { name: "Driven By", logo: v, tier: "other" },
  { name: "Thirft Partner", logo: w, tier: "other" },
  { name: "Reading Partner", logo: x, tier: "other" },
];

const SponsorCard = ({ sponsor, className = "" }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-6 rounded-xl shadow-lg backdrop-blur-md bg-black/30 border border-gray-700/50 transition-all duration-300 hover:shadow-xl hover:bg-black/40 ${className}`}
    >
      <img
        src={sponsor.logo || "/placeholder.svg"}
        alt={`${sponsor.name} logo`}
        width={
          sponsor.tier === "title"
            ? 400
            : sponsor.tier === "co-title"
            ? 300
            : sponsor.tier === "flagship"
            ? 250
            : 200
        }
        height={
          sponsor.tier === "title"
            ? 200
            : sponsor.tier === "co-title"
            ? 150
            : sponsor.tier === "flagship"
            ? 125
            : 100
        }
        className="max-w-full h-auto"
      />
      <span className="mt-4 text-sm font-semibold text-gray-300">{sponsor.name}</span>
    </div>
  );
};

export default function Sponsor() {
  const titleSponsor = sponsors.find((s) => s.tier === "title");
  const coTitleSponsors = sponsors.filter((s) => s.tier === "co-title");
  const flagshipSponsors = sponsors.filter((s) => s.tier === "flagship");
  const otherSponsors = sponsors.filter((s) => s.tier === "other");

  return (
    <div className="pyro z-100">
          <div className="before"></div>
          <div className="after"></div>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white -mt-8" style={{ fontFamily: " cursive", }}>
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col">
          <h1 style={{ fontFamily: "'Metal Mania', cursive" }} className="text-5xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Our Sponsors
          </h1>
          <p className="text-center text-lg mb-12 max-w-2xl mx-auto text-gray-400">
            We are grateful for the support of our amazing sponsors who have made this cultural fest possible. Their
            contributions help us celebrate diversity and creativity.
          </p>
        </div>

        <div className="space-y-20 mx-auto">
          {titleSponsor && (
            <div className="mb-16">
              <h2 className="text-4xl font-bold text-center mb-8 text-yellow-500">Title Sponsor</h2>
              <div className="flex justify-center">
                <SponsorCard sponsor={titleSponsor} className="w-full max-w-2xl" />
              </div>
            </div>
          )}

          {coTitleSponsors.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-semibold text-center mb-8 text-pink-500">Co-Title Sponsors</h2>
              <div className="flex flex-wrap justify-center gap-8">
                {coTitleSponsors.map((sponsor) => (
                  <SponsorCard key={sponsor.name} sponsor={sponsor} className="w-full sm:w-1/2 lg:w-1/3 max-w-md" />
                ))}
              </div>
            </div>
          )}

          {flagshipSponsors.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-semibold text-center mb-8 text-cyan-500">Flagship Sponsors</h2>
              <div className="flex flex-wrap justify-center gap-8">
                {flagshipSponsors.map((sponsor) => (
                  <SponsorCard key={sponsor.name} sponsor={sponsor} className="w-full sm:w-1/2 lg:w-1/3 max-w-md" />
                ))}
              </div>
            </div>
          )}

          {otherSponsors.length > 0 && (
            <div>
              <h2 className="text-3xl font-semibold text-center mb-8 text-green-500">Other Sponsors</h2>
              <div className="flex flex-wrap justify-center gap-8">
                {otherSponsors.map((sponsor) => (
                  <SponsorCard key={sponsor.name} sponsor={sponsor} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-md" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
    
  );
}





