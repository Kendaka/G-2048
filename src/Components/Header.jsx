import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const isLeaderboardPage = location.pathname === '/leaderboard';

    return (
        <div className='relative flex justify-center items-center w-full p-3'>
            <Link 
                to={isLeaderboardPage ? "/" : "/leaderboard"} 
                className="absolute text-xl left-8 top-6 px-3 py-1 text-gray-300 bg-gray-700 rounded hover:bg-gray-600"
            >
                {isLeaderboardPage ? "Go Back" : "Leaderboard"}
            </Link>
            <h1 className="text-gray-400 text-6xl font-[PressStart2P]">2048</h1>
        </div>
    );
};

export default Header;
