import React, { useState, useEffect } from 'react';

const Score = (props) => {
    // Set the high score from localStorage on initial render
    const [highScore, setHighScore] = useState(() => {
        const savedHighScore = localStorage.getItem('highScore');
        return savedHighScore ? parseInt(savedHighScore) : 0; // Default to 0 if not found
    });

    // Update high score in localStorage whenever it changes
    const handleHighScore = () => {
        if (props.score > highScore) {
            setHighScore(props.score);
            localStorage.setItem('highScore', props.score); // Save to localStorage
        }
    };

    // Run the handleHighScore on every score update
    useEffect(() => {
        handleHighScore();
    }, [props.score]); // This will trigger whenever props.score changes

    return (
        <div className='absolute top-7 right-10 flex flex-col gap-3'>
            <h1 className="text-gray-400 text-xl p-2 border-2 border-gray-600 rounded bg-gray-800 font-[RussoOne]">
                Score: {props.score}
            </h1>
            <h1 className="text-gray-400 text-xl p-2 border-2 border-gray-600 rounded bg-gray-800 font-[RussoOne]">
                High Score: {highScore}
            </h1>
        </div>
    );
}

export default Score;
