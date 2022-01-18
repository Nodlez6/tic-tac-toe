import React, { useState } from 'react'
import { Board } from './Board'
import { calculateWinner } from './calculateWinner';

import './index.css';


export const Game = () => {


    const jumpTo = (step) => {

         const historyAux = history.slice(0, step + 1);

        setSquares({
            history: historyAux,
            stepNumber: step,
            xIsnext: (step % 2 ) == 0

        })
    }


    const [squares, setSquares] = useState({
            history: [
                {
                    squares: Array(9).fill(null),
                }
            ],
            stepNumber: 0,
            xIsnext: true
        })

    const { history , stepNumber , xIsnext} = squares
  

    const handleClick = (i) => {

        const historyAux = history.slice(0, stepNumber + 1);
        const current = historyAux[historyAux.length - 1];
        const squaresArray = current.squares.slice();

        if( calculateWinner(squaresArray)){
            return;
        }

        squaresArray[i] = xIsnext ? 'X' : 'O';
    
        setSquares( {
            history: [...history,{
                squares: squaresArray
            }],
            stepNumber: history.length,
            xIsnext: !xIsnext
        } )

    }
  

    const historyAux = history;
    const current = historyAux[stepNumber];
    const winner = calculateWinner(current.squares);
    let status;

    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (xIsnext ? 'X' : 'O');
    }


    return (
        <div className="game">
          <div className="game-board">
            <Board 
                squares={ current.squares }
                handleClick={handleClick}

            />
          </div>
          <div className="game-info">
            <div>{ status }</div>
            <ol>
                
                {
                    history.map((step , move) => {
                        const desc = move ?
                        'Go to move #' + move :
                        'Go to game start';
                        return (
                        <li key={move}>
                            <button onClick={() => jumpTo(move)}>{desc}</button>
                        </li>
                        );
                    })
                }
            </ol>
          </div>
        </div>
    )
}
