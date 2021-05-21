import React from 'react';
import GameField from '../game-field/game-field';
import GameInfo from '../game-info/game-info';
import GameOptions from '../game-options/game-options';

import soundRed from '../../assets/sounds/1.mp3';
import audioGreen from '../../assets/sounds/2.mp3';
import audioYellow from '../../assets/sounds/3.mp3';
import audioBlue from '../../assets/sounds/4.mp3';
// import failure from '../../assets/sounds/failure.mp3';
// import audioCorrect from '../../assets/sounds/correct.mp3';

const red = new Audio(soundRed);
const green = new Audio(audioGreen);
const yellow = new Audio(audioYellow);
const blue = new Audio(audioBlue);
// const fail = new Audio(failure);
// const correct = new Audio(audioCorrect);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.numberItem = 0;
    this.sequence = null;
    this.state = {
      round: 0,
      gameOver: false,
      playMode: false,
      interval: 1500,
      activeItem: null,
      remainingItems: 0
    };
    this.handleButton = this.handleButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  playGame() {
    const colors = ['red', 'green', 'yellow', 'blue'];
    const layout = [];
    for (let i = 0; i < this.state.round; i += 1) {
      layout.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    this.setState({remainingItems: layout.length});
    this.sequence = [...layout];
    this.sequence.reverse();
    const playSounds = (index) => {
      if (index < 0) {
        this.setState({playMode: true});
        return;
      }
      this.activateCard(layout[index]);
      setTimeout(() => this.deactivateCard(), 400);
      setTimeout(() => playSounds(index - 1), this.state.interval);
    };

    playSounds(layout.length - 1);
  }

  activateCard(card) {
    switch(card) {
      case 'red':
        this.setState({activeItem: 'red'});
        red.play();
        break;
      case 'green':
        this.setState({activeItem: 'green'});
        green.play();
        break;
      case 'yellow':
        this.setState({activeItem: 'yellow'});
        yellow.play();
        break;
      case 'blue':
        this.setState({activeItem: 'blue'});
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

  handleButton() {
    this.setState({round: 1}, () => this.playGame());
  }

  handleClick(event) {
    if (this.state.playMode) {
      if ((this.sequence[this.numberItem] === event.target.dataset.tile) && this.numberItem === this.sequence.length - 1) {
        this.numberItem = 0;
        this.setState({
          playMode: false,
          remainingItems: 0
        });
        const round = this.state.round + 1;
        setTimeout(() => {
          this.setState({round}, () => this.playGame());
        }, 1000)
      } else if (this.sequence[this.numberItem] === event.target.dataset.tile) {
        const remainingItems = this.state.remainingItems - 1;
        this.setState({remainingItems});
        this.numberItem += 1;
      } else {
        this.setState({gameOver: true})
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

  handleChange(event) {
    this.setState({interval: +event.target.value});
  }

  render() {
    return (<>
      <div className="wrapper">
        <h1 className="title">Simon says</h1>
        <GameField 
          activeItem={this.state.activeItem} 
          onClickItem={this.handleClick} 
          playMode={this.state.playMode} 
          gameOver={this.state.gameOver}
          round={this.state.round} />
        <div className="control-panel">
          <GameInfo 
            onButtonClick={this.handleButton} 
            round={this.state.round} 
            gameOver={this.state.gameOver} 
            remainingItems={this.state.remainingItems} />
          <GameOptions handleChange={this.handleChange} />
        </div>
      </div>
    </>);
  }
}

export default App;