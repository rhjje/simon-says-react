import React from 'react';
import './game-field.scss';

const GameField = ({activeItem, onClickItem, playMode, gameOver, round}) => {
  let warning;
  if (gameOver) {
    warning = <div className="game-over">You lost in round {round} (:</div>;
  }
  let blue = <div className="game-cell game-cell_blue" data-tile="blue" onClick={onClickItem}></div>;
  let red = <div className="game-cell game-cell_red" data-tile="red" onClick={onClickItem}></div>;
  let yellow = <div className="game-cell game-cell_yellow" data-tile="yellow" onClick={onClickItem}></div>;
  let green = <div className="game-cell game-cell_green" data-tile="green" onClick={onClickItem}></div>;
  switch(activeItem) {
    case 'blue':
      blue = <div className="game-cell game-cell_blue game-cell_active"></div>;
      break;
    case 'red':
      red = <div className="game-cell game-cell_red game-cell_active"></div>;
      break;
    case 'yellow':
      yellow = <div className="game-cell game-cell_yellow game-cell_active"></div>;
      break;
    case 'green':
      green = <div className="game-cell game-cell_green game-cell_active"></div>;
      break;
    default:
      break;
  }

  if (playMode) {
    blue = <div className="game-cell game-cell_blue game-cell_click" data-tile="blue" onClick={onClickItem}></div>;
    red = <div className="game-cell game-cell_red game-cell_click" data-tile="red" onClick={onClickItem}></div>;
    yellow = <div className="game-cell game-cell_yellow game-cell_click" data-tile="yellow" onClick={onClickItem}></div>;
    green = <div className="game-cell game-cell_green game-cell_click" data-tile="green" onClick={onClickItem}></div>;
  }

  return (
    <div className="game-field">
      {warning}
      {blue}
      {red}
      {yellow}
      {green}
    </div>
  );
};

export default GameField;