import React, { useState, useEffect } from 'react';
import './QuizApp.css';
import italianQuestions from './italianQuestions.json';

const QuizApp = ({ onNavigate }) => {
    const [gameState, setGameState] = useState('setup'); // setup, playing, end
    const [categories, setCategories] = useState([]);
    const [config, setConfig] = useState({
        category: '',
        difficulty: 'easy',
        amount: 10
    });
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    useEffect(() => {
        // Extract unique categories from the JSON
        const uniqueCategories = [...new Set(italianQuestions.map(q => q.category))];
        setCategories(uniqueCategories);
    }, []);

    const startGame = async () => {
        setLoading(true);
        setError(null);

        // Simulate network delay for effect
        setTimeout(() => {
            let filtered = italianQuestions;

            if (config.category) {
                filtered = filtered.filter(q => q.category === config.category);
            }

            // Filter by difficulty if needed, or just mix them if not enough
            // For now, let's just use the category filter and shuffle

            if (filtered.length === 0) {
                setError("Nessuna domanda trovata per questa categoria.");
                setLoading(false);
                return;
            }

            // Shuffle questions
            const shuffled = filtered.sort(() => Math.random() - 0.5).slice(0, config.amount);

            const formattedQuestions = shuffled.map(q => ({
                ...q,
                answers: shuffleArray([...q.incorrect_answers, q.correct_answer])
            }));

            setQuestions(formattedQuestions);
            setGameState('playing');
            setCurrentQuestionIndex(0);
            setScore(0);
            setLoading(false);
        }, 500);
    };

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const handleAnswerClick = (answer) => {
        if (selectedAnswer) return; // Prevent multiple clicks

        setSelectedAnswer(answer);
        const correct = answer === questions[currentQuestionIndex].correct_answer;
        setIsCorrect(correct);

        if (correct) {
            setScore(prev => prev + 1);
        }

        setTimeout(() => {
            if (currentQuestionIndex + 1 < questions.length) {
                setCurrentQuestionIndex(prev => prev + 1);
                setSelectedAnswer(null);
                setIsCorrect(null);
            } else {
                setGameState('end');
            }
        }, 1500);
    };

    const decodeHTML = (html) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    const renderSetup = () => (
        <div className="quiz-card glass">
            <h2>Configurazione Quiz</h2>
            {error && <div className="error-msg">{error}</div>}

            <div className="form-group">
                <label>Categoria</label>
                <select
                    value={config.category}
                    onChange={(e) => setConfig({ ...config, category: e.target.value })}
                >
                    <option value="">Tutte le Categorie</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Difficoltà</label>
                <select
                    value={config.difficulty}
                    onChange={(e) => setConfig({ ...config, difficulty: e.target.value })}
                >
                    <option value="easy">Facile</option>
                    <option value="medium">Medio</option>
                    <option value="hard">Difficile</option>
                </select>
            </div>

            <div className="form-group">
                <label>Numero di Domande</label>
                <select
                    value={config.amount}
                    onChange={(e) => setConfig({ ...config, amount: parseInt(e.target.value) })}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </div>

            <button className="start-btn" onClick={startGame} disabled={loading}>
                {loading ? 'Caricamento...' : 'Inizia Quiz'}
            </button>
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <button onClick={() => onNavigate('home')} className="btn" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>Back to Home</button>
            </div>
        </div>
    );

    const renderGame = () => {
        const question = questions[currentQuestionIndex];
        const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

        return (
            <div className="quiz-card glass">
                <div className="quiz-header">
                    <span className="question-count">Domanda {currentQuestionIndex + 1}/{questions.length}</span>
                    <span className="score">Punteggio: {score}</span>
                </div>

                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>

                <h3 className="question-text">{decodeHTML(question.question)}</h3>

                <div className="answers-grid">
                    {question.answers.map((ans, idx) => {
                        let btnClass = 'answer-btn';
                        if (selectedAnswer) {
                            if (ans === question.correct_answer) btnClass += ' correct';
                            else if (ans === selectedAnswer) btnClass += ' wrong';
                            else btnClass += ' disabled';
                        }

                        return (
                            <button
                                key={idx}
                                className={btnClass}
                                onClick={() => handleAnswerClick(ans)}
                                disabled={!!selectedAnswer}
                            >
                                {decodeHTML(ans)}
                            </button>
                        );
                    })}
                </div>
                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <button onClick={() => onNavigate('home')} className="btn" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>Back to Home</button>
                </div>
            </div>
        );
    };

    const renderEnd = () => (
        <div className="quiz-card glass text-center">
            <h2>Quiz Completato!</h2>
            <div className="final-score">
                <span className="score-number">{score}</span>
                <span className="score-total">/ {questions.length}</span>
            </div>
            <p className="score-msg">
                {score === questions.length ? 'Punteggio Perfetto! 🎉' :
                    score > questions.length / 2 ? 'Ottimo Lavoro! 👍' : 'Ritenta, sarai più fortunato!'}
            </p>
            <button className="start-btn" onClick={() => setGameState('setup')}>Gioca Ancora</button>
            <div style={{ marginTop: '1rem' }}>
                <button onClick={() => onNavigate('home')} className="btn" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>Back to Home</button>
            </div>
        </div>
    );

    return (
        <div className="quiz-container">
            {gameState === 'setup' && renderSetup()}
            {gameState === 'playing' && renderGame()}
            {gameState === 'end' && renderEnd()}
        </div>
    );
};

export default QuizApp;
