import React, { useEffect, useState } from 'react';
import bg from '../Assets/leaderBoardbg.webp';
import { motion } from "framer-motion";
import { Trophy, Crown } from 'lucide-react';

export default function Leaderboard() {
  const [teams, setTeams] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const fetchLeaderBoard = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/leaderboard/top10`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json();
      if (response.ok) {
        const formattedTeams = result.data.map((item, index) => ({
          position: index + 1,
          name: item.college,
          points: item.points,
          medals: { gold: item.gold, silver: item.silver, bronze: item.bronze },
        }));
        setTeams(formattedTeams);
        console.log(result.data);
      } else {
        console.error('Error :', result.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error :', error);
    }
  };

  useEffect(() => {
    fetchLeaderBoard();

    // Add an event listener to track screen size changes
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Small screens (less than 768px)
    };

    handleResize(); // Initialize on mount
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative py-12 px-4"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundColor: '#1a1a2e'
      }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.h1
          className="text-4xl md:text-8xl font-bold my-16 tracking-wider text-center"
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
                <th className="py-3 md:py-4 px-3 md:px-6 text-left text-gray-300">Rank</th>
                <th className="py-3 md:py-4 px-3 md:px-6 text-left text-gray-300">Team</th>
                <th className="py-3 md:py-4 px-3 md:px-6 text-center text-gray-300">
                  <Trophy className="inline-block w-4 md:w-5 h-4 md:h-5 text-yellow-400" />
                </th>
                <th className="py-3 md:py-4 px-3 md:px-6 text-center text-gray-300">
                  <Trophy className="inline-block w-4 md:w-5 h-4 md:h-5 text-gray-400" />
                </th>
                <th className="py-3 md:py-4 px-3 md:px-6 text-center text-gray-300">
                  <Trophy className="inline-block w-4 md:w-5 h-4 md:h-5 text-orange-400" />
                </th>
                <th className={`py-3 md:py-4 px-3 md:px-6 text-right text-gray-300`}>
                  Points
                </th>
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
                  <td className="py-4 md:py-6 px-3 md:px-6">
                    <div className="flex items-center gap-2">
                      {team.position <= 3 ? (
                        <div className={`
                          p-1 md:p-2 rounded-full 
                          ${team.position === 1 ? 'bg-yellow-500/20' :
                            team.position === 2 ? 'bg-gray-500/20' :
                              'bg-orange-500/20'}
                        `}>
                          <Crown className={`
                            w-5 h-5 md:w-6 md:h-6
                            ${team.position === 1 ? 'text-yellow-400' :
                              team.position === 2 ? 'text-gray-400' :
                                'text-orange-400'}
                          `} />
                        </div>
                      ) : (
                        <span className="text-lg md:text-xl font-bold text-gray-500">#{team.position}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 md:py-6 px-3 md:px-6">
                    <span className={`text-sm md:text-2xl font-semibold 
                      ${team.position === 1 ? 'text-yellow-300' :
                        team.position === 2 ? 'text-gray-300' :
                          team.position === 3 ? 'text-orange-300' :
                            'text-gray-300'}
                    `}>
                      {team.name}
                    </span>
                  </td>
                  <td className="py-4 md:py-6 px-3 md:px-6 text-center">
                    <span className="text-yellow-400 font-semibold">{team.medals.gold}</span>
                  </td>
                  <td className="py-4 md:py-6 px-3 md:px-6 text-center">
                    <span className="text-white font-semibold">{team.medals.silver}</span>
                  </td>
                  <td className="py-4 md:py-6 px-3 md:px-6 text-center">
                    <span className="text-orange-400 font-semibold">{team.medals.bronze}</span>
                  </td>

                  <td className="py-4 md:py-6 px-3 md:px-6">
                    <div className="flex items-center justify-end gap-4">
                      {!isSmallScreen && (
                        <div className="w-20 md:w-32 bg-gray-700/50 rounded-full h-1.5 md:h-2 overflow-hidden">
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
                      )}
                      <span className={`text-lg md:text-xl font-bold tabular-nums
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
      </div>
      <p className="text-center text-lg text-white-400 backdrop-blur-sm mt-4 font-bold">
        Colleges are only listed here if their teams have earned a position in at least one event.
      </p>

    </div>
  );
}
