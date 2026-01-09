import React, { useState, useEffect } from 'react';
import './NeonTicTacToe.css';

const NeonTicTacToe = ({ onBack, onNavigate }) => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);

    const handleClick = (index) => {
        if (board[index] || winner) return;

        const newBoard = [...board];
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const checkWinner = (squares) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    useEffect(() => {
        const win = checkWinner(board);
        if (win) {
            setWinner(win);
        } else if (!board.includes(null)) {
            setWinner('Draw');
        }
    }, [board]);

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
    };

    return (
        <div className="ttt-container fade-in">
            <button className="back-button" onClick={onBack}>← Back</button>
            <button className="back-button" onClick={() => onNavigate('home')} style={{ left: '100px' }}>🏠 Home</button>
            <h2 className="ttt-title">NEON TIC-TAC-TOE</h2>

            <div className="status">
                {winner ? (
                    <span className="winner-text">{winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}`}</span>
                ) : (
                    <span>Player: <span className={isXNext ? 'x-turn' : 'o-turn'}>{isXNext ? 'X' : 'O'}</span></span>
                )}
            </div>

            <div className="ttt-board">
                {board.map((cell, index) => (
                    <button
                        key={index}
                        className={`ttt-cell ${cell ? cell.toLowerCase() : ''}`}
                        onClick={() => handleClick(index)}
                    >
                        {cell}
                    </button>
                ))}
            </div>

            <button className="reset-button" onClick={resetGame}>RESTART GAME</button>
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <button onClick={() => onNavigate('home')} className="btn">Back to Home</button>
            </div>
        </div>
    );
};

export default NeonTicTacToe;
