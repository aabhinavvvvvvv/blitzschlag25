import React from 'react';
import { Trophy, Crown } from 'lucide-react';
import { motion } from 'framer-motion';
import bg from '../Assets/leaderBoardbg.webp'
const colleges = [
    { rank: 1, name: "College A", gold: 10, silver: 8, bronze: 6, points: 100 },
    { rank: 2, name: "College B", gold: 9, silver: 7, bronze: 5, points: 90 },
    { rank: 3, name: "College C", gold: 8, silver: 6, bronze: 4, points: 80 },
    { rank: 4, name: "College D", gold: 7, silver: 5, bronze: 3, points: 70 },
    { rank: 5, name: "College E", gold: 6, silver: 4, bronze: 2, points: 60 },
    { rank: 6, name: "College F", gold: 5, silver: 3, bronze: 1, points: 50 },
    { rank: 7, name: "College G", gold: 4, silver: 2, bronze: 1, points: 40 },
    { rank: 8, name: "College H", gold: 3, silver: 2, bronze: 1, points: 30 },
    { rank: 9, name: "College I", gold: 2, silver: 1, bronze: 0, points: 20 },
    { rank: 10, name: "College J", gold: 1, silver: 1, bronze: 0, points: 10 }
];

const LeaderBoard = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center py-12 px-4" style={{ backgroundImage: `url(${bg})` }}>
            <div className="w-full max-w-4xl bg-opacity-80 p-8 rounded-xl backdrop-blur-sm">
                <motion.h1 
                    className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Top 10 Colleges Leaderboard
                </motion.h1>
                <div className="overflow-hidden bg-gray-900 bg-opacity-50 border border-gray-700 rounded-lg">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-800 bg-opacity-70">
                                <th className="py-4 px-6 text-gray-300">Rank</th>
                                <th className="py-4 px-6 text-gray-300">College Name</th>
                                <th className="py-4 px-6 text-center text-gray-300"><Trophy className="inline-block w-5 h-5 text-yellow-400" /></th>
                                <th className="py-4 px-6 text-center text-gray-300"><Trophy className="inline-block w-5 h-5 text-gray-300" /></th>
                                <th className="py-4 px-6 text-center text-gray-300"><Trophy className="inline-block w-5 h-5 text-orange-600" /></th>
                                <th className="py-4 px-6 text-center text-gray-300">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {colleges.map((college, index) => (
                                <motion.tr 
                                    key={college.rank} 
                                    className="border-b border-gray-700 hover:bg-gray-800 hover:bg-opacity-50 transition-colors"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <td className="py-4 px-6 font-medium text-gray-200">
                                        {college.rank <= 3 ? (
                                            <span 
                                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${college.rank === 1 ? 'bg-yellow-500 text-black' : college.rank === 2 ? 'bg-gray-400 text-black' : 'bg-orange-500 text-black'}`}
                                            >
                                                <Crown className="w-4 h-4 mr-1" />
                                                {college.rank}
                                            </span>
                                        ) : (
                                            college.rank
                                        )}
                                    </td>
                                    <td className="py-4 px-6 text-gray-200">{college.name}</td>
                                    <td className="py-4 px-6 text-center text-gray-200">{college.gold}</td>
                                    <td className="py-4 px-6 text-center text-gray-200">{college.silver}</td>
                                    <td className="py-4 px-6 text-center text-gray-200">{college.bronze}</td>
                                    <td className="py-4 px-6 text-center font-medium text-gray-200">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(college.points / 100) * 100}%` }}
                                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                                        />
                                        <span className="mt-1 inline-block">{college.points}</span>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <motion.div 
                    className="mt-6 text-sm text-center text-gray-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <p>
                        <Trophy className="inline-block w-4 h-4 mr-1 text-yellow-400" /> <span className='text-black'>Gold</span>
                        <Trophy className="inline-block w-4 h-4 ml-4 mr-1 text-gray-800" /> <span className='text-black'>Silver</span>
                        <Trophy className="inline-block w-4 h-4 ml-4 mr-1 text-orange-600" /> <span className='text-black'>Bronze</span>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default LeaderBoard;

