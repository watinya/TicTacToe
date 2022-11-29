import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//     render() {
//         return (
//             <button 
//                 className="square" 
//                 onClick={() => this.props.onClick()}
//             >
//                 {this.props.value}
//             </button>
//         );
//     }
// }
//class如只包含render且沒有自己state的conpoent, 可改用下方function component
function Square(props) {
    return(
        <button className={`square ${props.winning ? 'winning-line' : ''}`} onClick={props.onClick}>
            {props.value}
        </button>
    );
}
  
class Board extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         squares: Array(9).fill(null),
    //         oIsNext: true,
    //     };
    // }

    renderSquare(i, winning) {
        return (
            <Square 
                //-----props-----
                value = {this.props.squares[i]}
                winning = {winning}
                onClick = {() => this.props.onClick(i)}
            />
        );
    }

    render() {
    //     let boardSquares = [];
    // for(let row = 0; row < 3; row++){
    //   let boardRow = [];
    //   for(let col = 0; col < 3; col++){
    //     boardRow.push(<span key={(row * 3) + col}>{this.renderSquare((row * 3) + col)}</span>);
    //   }
    //   boardSquares.push(<div className="board-row" key={row}>{boardRow}</div>);
    // }
        let boardSquare = [];
        let lines = 3;
        
        for(let row = 0 ; row < lines; row++){
            let boardRow = [];
            for(let col = 0; col < lines; col++){
                let keys = (row * lines) + col;

                let winning = false;
                const winningLine = this.props.winningLine;
                if(winningLine && winningLine.includes(keys)){
                    //for(let i = 0; i < winningLine.length; i++){
                        //if(winningLine.includes(keys)){
                            winning = true;
                        //}
                    //}
                }

                //需用span(單區塊)，用div(整條)要在額外加CSS(兩者定義不同)
                boardRow.push(<span key={keys}>{this.renderSquare(keys, winning)}</span>);
            }
            boardSquare.push(<div className="board-row" key={row}>{boardRow}</div>);
        }
        // console.log(boardSquare);

        return (
            <div>
                {boardSquare}
            </div>
            //上下程式碼結果相同
            // <div>
            //     <div className="board-row">
            //         {this.renderSquare(0)}
            //         {this.renderSquare(1)}
            //         {this.renderSquare(2)}
            //     </div>
            //     <div className="board-row">
            //         {this.renderSquare(3)}
            //         {this.renderSquare(4)}
            //         {this.renderSquare(5)}
            //     </div>
            //     <div className="board-row">
            //         {this.renderSquare(6)}
            //         {this.renderSquare(7)}
            //         {this.renderSquare(8)}
            //     </div>
            // </div>
        );
    }
}
  
class Game extends React.Component {
    constructor(props){
        super(props);   //一定要有!!!!!!
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            oIsNext: true,
            isDescending: false,
        };
    }
    
    handleClick(i) {
        const locations = [
            [1, 1], [1, 2], [1, 3],
            [2, 1], [2, 2], [2, 3],
            [3, 1], [3, 2], [3, 3],
        ];
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        //如分出勝負責提前回傳(不可再click)
        if(calculateWinner(squares) || squares[i]){
            return;
        }

        squares[i] = this.state.oIsNext ? 'O' : 'X';
        this.setState({
            history: history.concat([{
                squares: squares,
                location: locations[i],
            }]),
            stepNumber: history.length,
            oIsNext: !this.state.oIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            oIsNext: (step % 2) === 0,
        });
    }

    sortHistory(){
        this.setState({
            isDescending: !this.state.isDescending,
        });
    }

    restart(){
        this.setState({
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            oIsNext: true,
            isDescending: false,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        
        const moves = history.map((step, move) => {
            const player = (move % 2) ? 'O' : 'X';
            const desc = move ?
                'Go to move #' + move + ' ' + player + ' @ ' + history[move].location:
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>
                        {(move === this.state.stepNumber) ? <b>{desc}</b> : desc}
                    </button>
                </li>
            );
        });
        
        let status;
        let winningLine;
        if(winner) {
            status = 'Winner : ' + winner.sign;
            winningLine = winner.line;
        } else if(!current.squares.includes(null)){
            status = 'Draw';
        } else {
            status = 'Next Player : ' + (this.state.oIsNext ? 'O' : 'X');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares = {current.squares}
                        winningLine = {winningLine}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <button onClick={() => this.restart()}>
                        RESTART
                    </button>
                    <div id="info">{status}</div>
                    <button onClick={() => this.sortHistory()}>
                        Sort by: {this.state.isDescending ? 'Ascending' : 'Descending'}
                    </button>
                    <ol>
                        {this.state.isDescending ? moves.reverse() : moves}
                    </ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for(let i = 0; i < lines.length; i++){
        const [a, b, c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return {
                sign: squares[a],
                line: lines[i]
            };
        }
    }

    return null;
}
  
// ========================================
  
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
  