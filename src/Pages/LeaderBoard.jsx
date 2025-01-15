import React from 'react';
import bg from '../Assets/leaderBoardbg.webp'

import { motion } from "framer-motion"
import { Trophy, Medal, Crown } from 'lucide-react'

const teams = [
  { position: 1, name: "Team Alpha", points: 2500, medals: { gold: 5, silver: 3, bronze: 2 } },
  { position: 2, name: "Team Beta", points: 2100, medals: { gold: 4, silver: 4, bronze: 3 } },
  { position: 3, name: "Team Gamma", points: 1800, medals: { gold: 3, silver: 5, bronze: 4 } },
  { position: 4, name: "Team Delta", points: 1500, medals: { gold: 2, silver: 3, bronze: 4 } },
  { position: 5, name: "Team Epsilon", points: 1200, medals: { gold: 1, silver: 4, bronze: 5 } },
  { position: 6, name: "Team Zeta", points: 1000, medals: { gold: 1, silver: 2, bronze: 6 } },
  { position: 7, name: "Team Delta", points: 1500, medals: { gold: 2, silver: 3, bronze: 4 } },
  { position: 8, name: "Team Epsilon", points: 1200, medals: { gold: 1, silver: 4, bronze: 5 } },
  { position: 9, name: "Team Zeta", points: 1000, medals: { gold: 1, silver: 2, bronze: 6 } },
  { position: 10, name: "Team Zeta", points: 1000, medals: { gold: 1, silver: 2, bronze: 6 } },
]

export default function Leaderboard() {
  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative py-12 px-4"
      style={{ 
        backgroundImage: `url(${bg})` ,
        backgroundColor: '#1a1a2e' 
      }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.h1 
          className="text-6xl font-bold mt-8 tracking-wider text-center"
          style={{ fontFamily: "'Metal Mania', cursive" }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Leaderboard
        </motion.h1>
        <div className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-black/50">
                <th className="py-4 px-6 text-left text-gray-300">Rank</th>
                <th className="py-4 px-6 text-left text-gray-300">Team</th>
                <th className="py-4 px-6 text-center text-gray-300">
                  <Trophy className="inline-block w-5 h-5 text-yellow-400" />
                </th>
                <th className="py-4 px-6 text-center text-gray-300">
                  <Trophy className="inline-block w-5 h-5 text-gray-400" />
                </th>
                <th className="py-4 px-6 text-center text-gray-300">
                  <Trophy className="inline-block w-5 h-5 text-orange-400" />
                </th>
                <th className="py-4 px-6 text-right text-gray-300">Points</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => (
                <motion.tr 
                  key={team.position}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`
                    border-b border-gray-700/50 last:border-0 
                    ${team.position === 1 ? 'bg-gradient-to-r from-yellow-500/20 to-transparent' : 
                      team.position === 2 ? 'bg-gradient-to-r from-gray-500/20 to-transparent' :
                      team.position === 3 ? 'bg-gradient-to-r from-orange-500/20 to-transparent' :
                      'hover:bg-white/5'}
                  `}
                >
                  <td className="py-6 px-6">
                    <div className="flex items-center gap-2">
                      {team.position <= 3 ? (
                        <div className={`
                          p-2 rounded-full 
                          ${team.position === 1 ? 'bg-yellow-500/20' : 
                            team.position === 2 ? 'bg-gray-500/20' : 
                            'bg-orange-500/20'}
                        `}>
                          <Crown className={`
                            w-6 h-6
                            ${team.position === 1 ? 'text-yellow-400' : 
                              team.position === 2 ? 'text-gray-400' : 
                              'text-orange-400'}
                          `} />
                        </div>
                      ) : (
                        <span className="text-xl font-bold text-gray-500">#{team.position}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-6 px-6">
                    <span className={`text-xl font-semibold 
                      ${team.position === 1 ? 'text-yellow-300' : 
                        team.position === 2 ? 'text-gray-300' : 
                        team.position === 3 ? 'text-orange-300' : 
                        'text-gray-300'}
                    `}>
                      {team.name}
                    </span>
                  </td>
                  <td className="py-6 px-6 text-center">
                    <span className="text-yellow-400 font-semibold">{team.medals.gold}</span>
                  </td>
                  <td className="py-6 px-6 text-center">
                    <span className="text-white font-semibold">{team.medals.silver}</span>
                  </td>
                  <td className="py-6 px-6 text-center">
                    <span className="text-orange-400 font-semibold">{team.medals.bronze}</span>
                  </td>
                  <td className="py-6 px-6">
                    <div className="flex items-center justify-end gap-4">
                      <div className="w-32 bg-gray-700/50 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(team.points / 2500) * 100}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className={`h-full rounded-full
                            ${team.position === 1 ? 'bg-yellow-400' : 
                              team.position === 2 ? 'bg-gray-400' : 
                              team.position === 3 ? 'bg-orange-400' : 
                              'bg-purple-400'}
                          `}
                        />
                      </div>
                      <span className={`text-xl font-bold tabular-nums
                        ${team.position === 1 ? 'text-yellow-300' : 
                          team.position === 2 ? 'text-gray-300' : 
                          team.position === 3 ? 'text-orange-300' : 
                          'text-gray-300'}
                      `}>
                        {team.points}
                      </span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <motion.div 
          className="mt-8 text-center text-sm text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className="flex items-center justify-center gap-6">
            <span className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-400" /> Gold
            </span>
            <span className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-gray-400" /> Silver
            </span>
            <span className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-orange-400" /> Bronze
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

