import React from 'react';

const GameOptions = ({handleChange}) => {
  return (
    <div className="game-options">
      <h2 className="subtitle">Game options:</h2>
      <label htmlFor="game-difficulty">Select difficulty:</label>
      <select id="game-difficulty" onChange={handleChange} >
        <option value="1500">Easy</option>
        <option value="1000">Normal</option>
        <option value="400">Impossible</option>
      </select>
    </div>
  );
};

export default GameOptions;