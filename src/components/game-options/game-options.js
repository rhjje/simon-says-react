import React from 'react';
import './game-options.scss';

const GameOptions = ({ difficulty, onChangeDifficulty, onClickPlay }) => {
  return (
    <div className="game-options">
      <div className="game-difficulty">
        <label htmlFor="game-difficulty">Select difficulty: </label>
        <select value={difficulty} id="game-difficulty" onChange={onChangeDifficulty}>
          <option value="1500">Easy</option>
          <option value="1000">Normal</option>
          <option value="400">Impossible</option>
        </select>
      </div>
      <button type="button" className="game-play" onClick={onClickPlay}>Play</button>
    </div>
  );
};

export default GameOptions;
