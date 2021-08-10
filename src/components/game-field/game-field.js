import React from 'react';
import './game-field.scss';

const GameField = ({ activeItem, onClickItem, playMode, gameOver, round }) => {
  const colors = ['blue', 'red', 'yellow', 'green'];

  return (
    <div className="game-field">
      {gameOver ? <div className="game-over">{`You lost in round ${round} (:`}</div> : null}
      {colors.map((item) => {
        if (activeItem === item) {
          return (
            <div className={`game-cell game-cell_${item} game-cell_active`} data-tile={item} onClick={onClickItem} />
          );
        }
        if (playMode) {
          return (
            <div className={`game-cell game-cell_${item} game-cell_click`} data-tile={item} onClick={onClickItem} />
          );
        }
        return (
          <div className={`game-cell game-cell_${item}`} data-tile={item} onClick={onClickItem} />
        );
      })}
    </div>
  );
};

export default GameField;
