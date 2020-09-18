import React, {Component} from 'react';
import Square from '../Components/Square';

class Board extends Component {
  constructor(){
  	super();
  	this.state={
  		squares: Array(9).fill(null),
  		xIsNext: true,
      moves: 0
  	}
  }

  renderSquare(i) {
    return <Square 
	    	value={this.state.squares[i]}
	    	onClick={() => this.handleClick(i)} />;
  }

  handleClick(i){
  	const squares = this.state.squares.slice();
  	if (this.calculateWinner(squares) || squares[i]){
  		return; //winner found
  	}
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    let nextMove = this.state.moves;
    nextMove++; 
    this.setState({
    	squares: squares,
    	xIsNext: !this.state.xIsNext,
      moves: nextMove
    });
    if(nextMove ===9 ){
      this.setState({xIsNext: null})
    }
  }

  calculateWinner(squares) {
	const winners = [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,3,6],
		[1,4,7],
		[2,5,8],
		[0,4,8],
		[2,4,6],
	];
		for (let i = 0; i < winners.length; i++) {
	    const [a, b, c] = winners[i];
	    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
	      return squares[a]; //determining winner
	    }
	  }
	  return null;
	}

  render() {
    const winner = this.calculateWinner(this.state.squares);
    let status;
    if(winner) {
    	status = 'Winner: ' + winner;  
    } 
    else if (this.state.xIsNext===null){
      status = 'The game is tied restart';
    }
    else {
    	status = this.state.xIsNext ? 'Next player: X' : 'Next player: 0';
    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
export default Board;