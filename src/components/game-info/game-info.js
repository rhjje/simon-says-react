import React from 'react';
import './game-info.scss';

const GameInfo = ({ round, remainingItems }) => {
  return (
    <div className="game-info">
      <div className="game-info__round">{`Round: ${round}`}</div>
      <div className="game-info__remaining">{`Remaining items: ${remainingItems}`}</div>
    </div>
  );
};

export default GameInfo;
