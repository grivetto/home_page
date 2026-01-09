import React, { useEffect, useRef, useState, useCallback } from 'react';
import './TetrisGame.css';

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;

const SHAPES = [
    [[1, 1, 1, 1]], // I
    [[1, 1], [1, 1]], // O
    [[0, 1, 0], [1, 1, 1]], // T
    [[1, 0, 0], [1, 1, 1]], // L
    [[0, 0, 1], [1, 1, 1]], // J
    [[0, 1, 1], [1, 1, 0]], // S
    [[1, 1, 0], [0, 1, 1]]  // Z
];

const COLORS = [
    '#00ffff', // Cyan (I)
    '#ffff00', // Yellow (O)
    '#800080', // Purple (T)
    '#ff7f00', // Orange (L)
    '#0000ff', // Blue (J)
    '#00ff00', // Green (S)
    '#ff0000'  // Red (Z)
];

const TetrisGame = ({ onBack, onNavigate }) => {
    const canvasRef = useRef(null);
    const [grid, setGrid] = useState(Array.from({ length: ROWS }, () => Array(COLS).fill(0)));
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [nextPiece, setNextPiece] = useState(null);

    // Game state refs to avoid closure staleness in loop
    const gameState = useRef({
        grid: Array.from({ length: ROWS }, () => Array(COLS).fill(0)),
        activePiece: null,
        score: 0,
        level: 1,
        gameOver: false,
        dropCounter: 0,
        lastTime: 0,
        dropInterval: 1000
    });

    const requestRef = useRef();

    const createPiece = () => {
        const typeId = Math.floor(Math.random() * SHAPES.length);
        const shape = SHAPES[typeId];
        return {
            shape,
            color: COLORS[typeId],
            x: Math.floor(COLS / 2) - Math.floor(shape[0].length / 2),
            y: 0
        };
    };

    const initGame = () => {
        const startPiece = createPiece();
        const next = createPiece();

        gameState.current = {
            grid: Array.from({ length: ROWS }, () => Array(COLS).fill(0)),
            activePiece: startPiece,
            score: 0,
            level: 1,
            gameOver: false,
            dropCounter: 0,
            lastTime: 0,
            dropInterval: 1000
        };

        setGrid(gameState.current.grid);
        setScore(0);
        setLevel(1);
        setGameOver(false);
        setNextPiece(next);
        setGameStarted(true);

        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        requestRef.current = requestAnimationFrame(gameLoop);
    };

    const checkCollision = (piece, grid, xOffset = 0, yOffset = 0) => {
        for (let y = 0; y < piece.shape.length; y++) {
            for (let x = 0; x < piece.shape[y].length; x++) {
                if (piece.shape[y][x] !== 0) {
                    const newX = piece.x + x + xOffset;
                    const newY = piece.y + y + yOffset;

                    if (newX < 0 || newX >= COLS || newY >= ROWS) return true;
                    if (newY >= 0 && grid[newY][newX] !== 0) return true;
                }
            }
        }
        return false;
    };

    const rotatePiece = () => {
        const { activePiece, grid } = gameState.current;
        if (!activePiece) return;

        const newShape = activePiece.shape[0].map((_, i) =>
            activePiece.shape.map(row => row[i]).reverse()
        );

        const rotatedPiece = { ...activePiece, shape: newShape };

        // Wall kicks (basic)
        if (!checkCollision(rotatedPiece, grid)) {
            gameState.current.activePiece = rotatedPiece;
        } else if (!checkCollision(rotatedPiece, grid, -1, 0)) {
            gameState.current.activePiece = { ...rotatedPiece, x: rotatedPiece.x - 1 };
        } else if (!checkCollision(rotatedPiece, grid, 1, 0)) {
            gameState.current.activePiece = { ...rotatedPiece, x: rotatedPiece.x + 1 };
        }
    };

    const mergePiece = () => {
        const { activePiece, grid } = gameState.current;

        activePiece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    const newY = activePiece.y + y;
                    const newX = activePiece.x + x;
                    if (newY >= 0 && newY < ROWS && newX >= 0 && newX < COLS) {
                        grid[newY][newX] = activePiece.color;
                    }
                }
            });
        });

        clearLines();

        // Spawn next piece
        gameState.current.activePiece = nextPiece;
        const newNext = createPiece();
        setNextPiece(newNext);

        // Check game over
        if (checkCollision(gameState.current.activePiece, grid)) {
            gameState.current.gameOver = true;
            setGameOver(true);
            setGameStarted(false);
            cancelAnimationFrame(requestRef.current);
        }
    };

    const clearLines = () => {
        let linesCleared = 0;
        const { grid } = gameState.current;

        for (let y = ROWS - 1; y >= 0; y--) {
            if (grid[y].every(cell => cell !== 0)) {
                grid.splice(y, 1);
                grid.unshift(Array(COLS).fill(0));
                linesCleared++;
                y++; // Check same row again
            }
        }

        if (linesCleared > 0) {
            const points = [0, 40, 100, 300, 1200];
            gameState.current.score += points[linesCleared] * gameState.current.level;
            setScore(gameState.current.score);

            // Level up every 10 lines (simplified)
            // For now just increase speed with score
            if (gameState.current.score > gameState.current.level * 500) {
                gameState.current.level++;
                gameState.current.dropInterval = Math.max(100, 1000 - (gameState.current.level - 1) * 100);
                setLevel(gameState.current.level);
            }
        }
    };

    const movePiece = (dir) => {
        const { activePiece, grid } = gameState.current;
        if (!activePiece || gameState.current.gameOver) return;

        if (!checkCollision(activePiece, grid, dir, 0)) {
            activePiece.x += dir;
        }
    };

    const dropPiece = () => {
        const { activePiece, grid } = gameState.current;
        if (!activePiece || gameState.current.gameOver) return;

        if (!checkCollision(activePiece, grid, 0, 1)) {
            activePiece.y++;
        } else {
            mergePiece();
        }
    };

    const gameLoop = (time = 0) => {
        const state = gameState.current;
        if (state.gameOver) return;

        const deltaTime = time - state.lastTime;
        state.lastTime = time;
        state.dropCounter += deltaTime;

        if (state.dropCounter > state.dropInterval) {
            dropPiece();
            state.dropCounter = 0;
        }

        draw();
        requestRef.current = requestAnimationFrame(gameLoop);
    };

    const draw = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const { grid, activePiece } = gameState.current;

        // Clear canvas
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw grid
        grid.forEach((row, y) => {
            row.forEach((color, x) => {
                if (color !== 0) {
                    drawBlock(ctx, x, y, color);
                }
            });
        });

        // Draw active piece
        if (activePiece) {
            activePiece.shape.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        drawBlock(ctx, activePiece.x + x, activePiece.y + y, activePiece.color);
                    }
                });
            });
        }
    };

    const drawBlock = (ctx, x, y, color) => {
        ctx.fillStyle = color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = color;
        ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);

        // Inner bevel effect
        ctx.shadowBlur = 0;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    };

    const handleKeyDown = useCallback((e) => {
        if (!gameStarted || gameOver) return;

        switch (e.key) {
            case 'ArrowLeft':
                movePiece(-1);
                break;
            case 'ArrowRight':
                movePiece(1);
                break;
            case 'ArrowDown':
                dropPiece();
                break;
            case 'ArrowUp':
                rotatePiece();
                break;
            default:
                break;
        }
        draw(); // Force redraw on input
    }, [gameStarted, gameOver]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            cancelAnimationFrame(requestRef.current);
        };
    }, [handleKeyDown]);

    // Next Piece Preview
    const NextPiecePreview = ({ piece }) => {
        if (!piece) return null;
        return (
            <div className="next-piece-preview">
                {piece.shape.map((row, y) => (
                    <div key={y} className="preview-row">
                        {row.map((cell, x) => (
                            <div
                                key={x}
                                className="preview-cell"
                                style={{
                                    backgroundColor: cell ? piece.color : 'transparent',
                                    boxShadow: cell ? `0 0 10px ${piece.color}` : 'none'
                                }}
                            />
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="tetris-container">
            <button className="back-button" onClick={onBack} style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 100 }}>← Back</button>
            <button className="back-button" onClick={() => onNavigate('home')} style={{ position: 'absolute', top: '20px', left: '120px', zIndex: 100 }}>🏠 Home</button>
            <div className="game-area">
                <canvas
                    ref={canvasRef}
                    width={COLS * BLOCK_SIZE}
                    height={ROWS * BLOCK_SIZE}
                    className="tetris-canvas"
                />

                {!gameStarted && !gameOver && (
                    <div className="overlay">
                        <button className="start-btn" onClick={initGame}>Start Game</button>
                    </div>
                )}

                {gameOver && (
                    <div className="overlay">
                        <h2>Game Over</h2>
                        <p>Score: {score}</p>
                        <button className="restart-btn" onClick={initGame}>Restart</button>
                    </div>
                )}
            </div>

            <div className="sidebar">
                <div className="stat-box">
                    <h3>Score</h3>
                    <p>{score}</p>
                </div>
                <div className="stat-box">
                    <h3>Level</h3>
                    <p>{level}</p>
                </div>
                <div className="stat-box">
                    <h3>Next</h3>
                    <NextPiecePreview piece={nextPiece} />
                </div>

                <div className="mobile-controls">
                    <div className="control-row">
                        <button className="control-btn" onClick={() => rotatePiece()}>↻</button>
                    </div>
                    <div className="control-row">
                        <button className="control-btn" onClick={() => movePiece(-1)}>←</button>
                        <button className="control-btn" onClick={() => dropPiece()}>↓</button>
                        <button className="control-btn" onClick={() => movePiece(1)}>→</button>
                    </div>
                </div>

                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <button onClick={() => onNavigate('home')} className="btn">Back to Home</button>
                </div>
            </div>
        </div>
    );
};

export default TetrisGame;
