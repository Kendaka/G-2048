import React from 'react';

const Score = () => {
    return (
        <div className='absolute top-7 right-10 flex flex-col gap-3'>
            <h1 className='text-gray-400 text-xl p-2 border-2 border-gray-600 rounded bg-gray-800'>
                Score: 0
            </h1>
            <h1 className='text-gray-400 text-xl p-2 border-2 border-gray-600 rounded bg-gray-800'>
                High Score: 0
            </h1>
        </div>
    )
}

export default Score;
