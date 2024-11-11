import React from 'react';

const GameMessage = ({ message, buttonText, onButtonClick }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
      <h1 className="text-white text-3xl mb-4">{message}</h1>
      <button
        onClick={onButtonClick}
        className="px-4 py-2 text-xl bg-gray-800 text-white rounded border-2 border-gray-600"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default GameMessage;
