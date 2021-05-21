import React from 'react';

const GameInfo = ({onButtonClick, round, remainingItems}) => {
  return (
    <div className="game-info">
      <h2 className="subtitle">Round: {round} Items: {remainingItems}</h2>
      <button className="game-play" onClick={onButtonClick}>Play</button>
    </div>
  );
};

export default GameInfo;