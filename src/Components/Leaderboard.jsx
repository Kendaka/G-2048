import React from 'react';

const Leaderboard = () => {
  const placeholderData = [
    { username: 'Player1', score: 2048 },
    { username: 'Player2', score: 1500 },
    { username: 'Player3', score: 1200 },
  ];

  return (
    <div className="text-white text-center mt-8">
      <h2 className="text-3xl font-bold mb-5 font-[RussoOne]">Leaderboard</h2>
      <ul>
        {placeholderData.map((player, index) => (
          <li key={index} className="mb-2 font-[RussoOne]">
            {index + 1}. {player.username} - Score: {player.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
