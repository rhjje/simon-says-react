import React from 'react';
import './game-options.scss';

const GameOptions = ({ handleChange, onButtonClick }) => {
  return (
    <div className="game-options">
      <div className="game-difficulty">
        <label htmlFor="game-difficulty">Select difficulty: </label>
        <select id="game-difficulty" onChange={handleChange}>
          <option value="1500">Easy</option>
          <option value="1000">Normal</option>
          <option value="400">Impossible</option>
        </select>
      </div>
      <button type="button" className="game-play" onClick={onButtonClick}>Play</button>
    </div>
  );
};

export default GameOptions;
