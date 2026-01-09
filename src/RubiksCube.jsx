import React, { useEffect, useState } from 'react';
import './RubiksCube.css';

const RubiksCube = ({ onBack, onNavigate }) => {
    return (
        <div className="rubiks-container fade-in">
            <button className="back-button" onClick={onBack}>← Back</button>
            <button className="back-button" onClick={() => onNavigate('home')} style={{ left: '100px' }}>🏠 Home</button>
            <div className="scene">
                <div className="cube">
                    {/* We need 27 mini-cubes to look realistic, or just 6 faces if it's a solid block. 
              A "Rubik's Cube" implies grid lines. We'll build 6 faces with 9 stickers each. */}

                    {['front', 'back', 'right', 'left', 'top', 'bottom'].map((face) => (
                        <div key={face} className={`cube-face ${face}`}>
                            {[...Array(9)].map((_, i) => (
                                <div key={i} className="sticker"></div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className="controls">
                <p>Auto-rotating 3D Cube</p>
                <div style={{ marginTop: '2rem' }}>
                    <button onClick={() => onNavigate('home')} className="btn">Back to Home</button>
                </div>
            </div>
        </div>
    );
};

export default RubiksCube;
