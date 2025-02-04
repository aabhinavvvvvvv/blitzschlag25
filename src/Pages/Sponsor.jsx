import React from "react";

const sponsors = [
  { name: "Title Sponsor", logo: "/placeholder.svg?height=200&width=400", tier: "title" },
  { name: "Co-Title Sponsor 1", logo: "/placeholder.svg?height=150&width=300", tier: "co-title" },
  { name: "Co-Title Sponsor 2", logo: "/placeholder.svg?height=150&width=300", tier: "co-title" },
  { name: "Flagship Sponsor 1", logo: "/placeholder.svg?height=125&width=250", tier: "flagship" },
  { name: "Flagship Sponsor 2", logo: "/placeholder.svg?height=125&width=250", tier: "flagship" },
  { name: "Other Sponsor 1", logo: "/placeholder.svg?height=100&width=200", tier: "other" },
  { name: "Other Sponsor 2", logo: "/placeholder.svg?height=100&width=200", tier: "other" },
  { name: "Other Sponsor 3", logo: "/placeholder.svg?height=100&width=200", tier: "other" },
  { name: "Other Sponsor 4", logo: "/placeholder.svg?height=100&width=200", tier: "other" },
];

const SponsorCard = ({ sponsor }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-xl shadow-lg backdrop-blur-md bg-black/30 border border-gray-700/50 transition-all duration-300 hover:shadow-xl hover:bg-black/40 w-full max-w-xs">
      <img
        src={sponsor.logo || "/placeholder.svg"}
        alt={`${sponsor.name} logo`}
        className="max-w-full h-auto object-contain"
      />
      <span className="mt-4 text-sm font-semibold text-gray-300 text-center">{sponsor.name}</span>
    </div>
  );
};

export default function SponsorsPage() {
  const titleSponsor = sponsors.find((s) => s.tier === "title");
  const coTitleSponsors = sponsors.filter((s) => s.tier === "co-title");
  const flagshipSponsors = sponsors.filter((s) => s.tier === "flagship");
  const otherSponsors = sponsors.filter((s) => s.tier === "other");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col items-center py-12">
      {/* Title & Description */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Our Sponsors
        </h1>
        <p className="text-lg mt-4 max-w-2xl mx-auto text-gray-400">
          We are grateful for the support of our amazing sponsors who have made this cultural fest possible. Their
          contributions help us celebrate diversity and creativity.
        </p>
      </div>

      {/* Sponsors List */}
      <div className="mt-12 w-full px-4">
        {titleSponsor && (
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold mb-8 text-yellow-500">Title Sponsor</h2>
            <div className="flex justify-center">
              <SponsorCard sponsor={titleSponsor} />
            </div>
          </div>
        )}

        {coTitleSponsors.length > 0 && (
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-semibold mb-8 text-pink-500">Co-Title Sponsors</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {coTitleSponsors.map((sponsor) => (
                <SponsorCard key={sponsor.name} sponsor={sponsor} />
              ))}
            </div>
          </div>
        )}

        {flagshipSponsors.length > 0 && (
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-semibold mb-8 text-cyan-500">Flagship Sponsors</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {flagshipSponsors.map((sponsor) => (
                <SponsorCard key={sponsor.name} sponsor={sponsor} />
              ))}
            </div>
          </div>
        )}

        {otherSponsors.length > 0 && (
          <div className="text-center">
            <h2 className="text-3xl font-semibold mb-8 text-green-500">Other Sponsors</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {otherSponsors.map((sponsor) => (
                <SponsorCard key={sponsor.name} sponsor={sponsor} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
