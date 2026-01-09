import React from 'react';

const CustomApp = ({ onNavigate }) => {
    return (
        <>
            <header className="hero fade-in">
                <div className="hero-content">
                    <h1>AI generated APP</h1>

                    <div className="mini-apps-buttons" style={{ marginTop: '2rem' }}>
                        <button onClick={() => onNavigate('rubiks')} className="app-btn cube-btn">
                            <span className="icon">🎲</span> 3D Cube
                        </button>
                        <button onClick={() => onNavigate('tictactoe')} className="app-btn neon-btn">
                            <span className="icon">⭕</span> Neon Tic-Tac-Toe
                        </button>
                        <button onClick={() => onNavigate('tetris')} className="app-btn" style={{ background: 'linear-gradient(135deg, #d500f9, #651fff)', boxShadow: '0 4px 15px rgba(213, 0, 249, 0.3)' }}>
                            <span className="icon">🕹️</span> Neon Tetris
                        </button>
                    </div>
                </div>
            </header>

            <main>
                <section className="card glass" style={{ textAlign: 'center', padding: '40px' }}>
                    <h2>Select an App</h2>
                    <p>Choose one of the AI-generated applications above to start.</p>
                </section>

                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <button onClick={() => onNavigate('home')} className="btn">Back to Home</button>
                </div>
            </main>
        </>
    );
};

export default CustomApp;
