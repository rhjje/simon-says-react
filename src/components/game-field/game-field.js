import React from 'react';
import './game-field.scss';

const GameField = ({ activeItem, onClickItem, playMode, gameOver, round }) => {
  return (
    <div className="game-field">
      {gameOver ? (
        <div className="game-over">{`You lost in round ${round} (:`}</div>
      ) : null}
      {['blue', 'red', 'yellow', 'green'].map((item) => {
        if (activeItem === item) {
          return (
            <div
              className={`game-cell game-cell_${item} game-cell_active`}
              data-tile={item}
              onClick={onClickItem}
              key={item}
            />
          );
        }
        if (playMode) {
          return (
            <div
              className={`game-cell game-cell_${item} game-cell_click`}
              data-tile={item}
              onClick={onClickItem}
              key={item}
            />
          );
        }
        return (
          <div
            className={`game-cell game-cell_${item}`}
            data-tile={item}
            onClick={onClickItem}
            key={item}
          />
        );
      })}
    </div>
  );
};

export default GameField;
