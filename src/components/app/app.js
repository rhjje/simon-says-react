import React from 'react';
import './app.scss';
import GameField from '../game-field/game-field';
import GameInfo from '../game-info/game-info';
import GameOptions from '../game-options/game-options';

import audioRed from '../../assets/sounds/1.mp3';
import audioGreen from '../../assets/sounds/2.mp3';
import audioYellow from '../../assets/sounds/3.mp3';
import audioBlue from '../../assets/sounds/4.mp3';

const red = new Audio(audioRed);
const green = new Audio(audioGreen);
const yellow = new Audio(audioYellow);
const blue = new Audio(audioBlue);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.numberItem = 0;
    this.sequence = null;
    this.state = {
      round: 0,
      gameOver: false,
      playMode: false,
      difficulty: localStorage.getItem('difficulty') || '1000',
      activeItem: null,
      remainingItems: 0
    };
    this.handleClickPlay = this.handleClickPlay.bind(this);
    this.handleClickItem = this.handleClickItem.bind(this);
    this.handleChangeDifficulty = this.handleChangeDifficulty.bind(this);
  }

  handleClickPlay() {
    this.setState({ round: 1 }, () => this.playGame());
  }

  handleClickItem(event) {
    if (this.state.playMode) {
      if ((this.sequence[this.numberItem] === event.target.dataset.tile)
      && this.numberItem === this.sequence.length - 1) {
        this.numberItem = 0;
        this.setState({
          playMode: false,
          remainingItems: 0
        });
        const round = this.state.round + 1;
        setTimeout(() => {
          this.setState({ round }, () => this.playGame());
        }, 1000);
      } else if (this.sequence[this.numberItem] === event.target.dataset.tile) {
        this.setState((prevState) => ({ remainingItems: prevState.remainingItems - 1 }));
        this.numberItem += 1;
      } else {
        this.setState({ gameOver: true });
        this.numberItem = 0;
        setTimeout(() => {
          this.setState({
            playMode: false,
            round: 0,
            remainingItems: 0,
            gameOver: false
          });
        }, 2000);
      }
    }
  }

  handleChangeDifficulty(event) {
    localStorage.setItem('difficulty', event.target.value);
    this.setState({ difficulty: event.target.value });
  }

  playGame() {
    const layout = [];
    for (let i = 0; i < this.state.round; i += 1) {
      const getRandomColor = () => {
        const colors = ['red', 'green', 'yellow', 'blue'];
        const currentColor = colors[Math.floor(Math.random() * colors.length)];
        if (currentColor !== layout[layout.length - 1]) {
          return currentColor;
        }
        return getRandomColor();
      };
      layout.push(getRandomColor());
    }

    this.setState({ remainingItems: layout.length });
    this.sequence = [...layout];
    this.sequence.reverse();
    const playSounds = (index) => {
      if (index < 0) {
        this.setState({ playMode: true });
        return;
      }
      this.activateCard(layout[index]);
      setTimeout(() => this.deactivateCard(), 400);
      if (index === 0) {
        setTimeout(() => playSounds(index - 1), 400);
      } else {
        setTimeout(() => playSounds(index - 1), +this.state.difficulty);
      }
    };

    playSounds(layout.length - 1);
  }

  activateCard(card) {
    switch (card) {
      case 'red':
        this.setState({ activeItem: 'red' });
        red.play();
        break;
      case 'green':
        this.setState({ activeItem: 'green' });
        green.play();
        break;
      case 'yellow':
        this.setState({ activeItem: 'yellow' });
        yellow.play();
        break;
      case 'blue':
        this.setState({ activeItem: 'blue' });
        blue.play();
        break;
      default:
        break;
    }
  }

  deactivateCard() {
    this.setState({
      activeItem: null
    });
  }

  render() {
    return (
      <>
        <h1 className="title">Simon says</h1>
        <GameInfo
          round={this.state.round}
          remainingItems={this.state.remainingItems}
        />
        <GameField
          activeItem={this.state.activeItem}
          onClickItem={this.handleClickItem}
          playMode={this.state.playMode}
          gameOver={this.state.gameOver}
          round={this.state.round}
        />
        <GameOptions
          difficulty={this.state.difficulty}
          onChangeDifficulty={this.handleChangeDifficulty}
          onClickPlay={this.handleClickPlay}
        />
      </>
    );
  }
}

export default App;
