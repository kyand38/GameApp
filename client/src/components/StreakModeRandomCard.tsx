import { useState } from 'react';
import { Button, Divider, Card, Typography } from 'antd';
import '../assets/styles/flames.css'; // Optional CSS for flames
import Confetti from 'react-confetti';
import SparkleEffect from '../components/SparkleComponent';
// import Fireworks from '../components/Fireworks';

const { Text, Title } = Typography;

interface QuestionCardProps {
    question: string;
    answers: string[];
    correct: string;
    category: string;
    explanation: string;
}

const StreakModeCard = () => {
    const [trivia, setTrivia] = useState<QuestionCardProps | null>(null);
    const [streak, setStreak] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const [buttonLabel, setButtonLabel] = useState("First Question");
    const [showRedOverlay, setShowRedOverlay] = useState(false);
    const [showStreakOnly, setShowStreakOnly] = useState(false); // New state for exclusive streak display

    const getRandomQuestion = async () => {
        try {
            const response = await fetch('/api/quiz/random-question', { method: 'GET' });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setTrivia(result);
            setShowExplanation(false);
            setSelectedAnswer(null);
            setShowConfetti(false);

            setButtonLabel("Next Question");
        } catch (error) {
            console.error('Error fetching question:', error);
        }
    };

    const handleAnswerClick = (answer: string) => {
        setSelectedAnswer(answer);
        setShowExplanation(true);

        if (answer === trivia?.correct) {
            setStreak((prev) => prev + 1);
            setShowStreakOnly(true); // Show streak only
            setTimeout(() => setShowStreakOnly(false), 4000); // Hide streak-only view after 4 seconds
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
        } else {
            setShowRedOverlay(true);
            setTimeout(() => setShowRedOverlay(false), 2500);
            setGameOver(true);
        }
    };

    const resetGame = () => {
        setStreak(0);
        setGameOver(false);
        setTrivia(null);
        setButtonLabel("First Question");
    };

    if (showStreakOnly && streak > 0) {
        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    backgroundColor: 'black',
                }}
            >
                <h1
                    style={{
                        fontFamily: "'Orbitron', sans-serif",
                            marginBottom: '20px',
                            zIndex: 2,
                            fontSize: '9rem',
                            fontWeight: 'bold',
                            background: 'linear-gradient(45deg, #ff007f, #ff00ff, #7f00ff, #00b8ff, #00ff00)',
                            backgroundSize: '300% 300%',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent',
                            textAlign: 'center',
                            position: 'absolute',
                            transformOrigin: 'center',
                            animation: 'spinY 4s linear infinite', // Apply animation
                    }}
                >
                    {streak} in a row!
                    <Fireworks />
                </h1>
                <style>
                    {`
                    @keyframes spinY {
                        0% {
                            transform: rotateY(0deg);
                        }
                        50% {
                            transform: rotateY(180deg);
                        }
                        100% {
                            transform: rotateY(360deg);
                        }
                    }
                    `}
                </style>
            </div>
        );
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundColor: 'black',
            }}
        >
            <SparkleEffect />
            {showRedOverlay && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        zIndex: 1000,
                        pointerEvents: 'none',
                    }}
                ></div>
            )}
            {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

            <Card
                style={{
                    width: 500,
                    borderRadius: '12px',
                    border: '2px solid',
                    borderImage: 'linear-gradient(90deg, rgb(255,110,199)  0%, rgb(98,83,225) 63%, rgb(4,190,254)  93%) 1',
                    backgroundColor: '#2a2a2a',
                    padding: '20px',
                    textAlign: 'center',
                }}
            >
                {gameOver ? (
                    <div>
                        <Title level={3} style={{ color: '#ffffff' }}>
                            Game Over
                        </Title>
                        <Title level={4} style={{ color: '#ffffff', marginBottom: '20px' }}>
                            Your Streak: {streak}
                        </Title>
                        <Button
                            onClick={resetGame}
                            style={{
                                marginTop: '20px',
                                background: 'linear-gradient(90deg, rgb(4,190,254) 0%, rgb(98,83,225) 63%, rgb(255,110,199) 93%)',
                                color: '#ffffff',
                                border: '1px solid #555555',
                            }}
                        >
                            Start Over
                        </Button>
                    </div>
                ) : (
                    <div>
                        {trivia ? (
                            <>
                                <Title level={4} style={{ color: '#ffffff' }}>
                                    Category: {trivia.category}
                                </Title>
                                <Text style={{ color: '#ffffff' }}>{trivia.question}</Text>
                                <Divider />
                                <div style={{ marginTop: '10px' }}>
                                    {trivia.answers.map((answer, index) => (
                                        <Button
                                            key={index}
                                            onClick={() => handleAnswerClick(answer)}
                                            style={{
                                                display: 'block',
                                                margin: '10px auto',
                                                backgroundColor: '#333333',
                                                color: '#ffffff',
                                                border: '1px solid #555555',
                                                width: '80%',
                                            }}
                                            disabled={showExplanation}
                                        >
                                            {answer}
                                        </Button>
                                    ))}
                                </div>
                                {showExplanation && (
                                    <div style={{ marginTop: '15px' }}>
                                        <Text style={{ color: '#ffffff' }}>
                                            {selectedAnswer === trivia.correct
                                                ? 'Correct! '
                                                : `Wrong! The correct answer was: `}
                                            <span style={{ color: 'lightgreen', fontWeight: 'bold' }}>
                                                {trivia.correct}
                                            </span>
                                        </Text>
                                        <br />
                                        <Text style={{ color: '#ffffff' }}>Explanation: {trivia?.explanation}</Text>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div>
                                <Text style={{ color: '#ffffff', fontSize: '1.2rem' }}>
                                    Click the button to start!
                                </Text>
                                <br />
                                <Text style={{ color: '#ffffff', fontSize: '1.2rem' }}>
                                    Answer the question correctly to increase your streak!
                                </Text>
                            </div>
                        )}
                        <Divider />
                        <Button
                            onClick={getRandomQuestion}
                            style={{
                                background: 'linear-gradient(90deg, rgb(4,190,254) 0%, rgb(98,83,225) 63%, rgb(255,110,199) 93%)',
                                color: '#ffffff',
                                border: '1px solid #555555',
                                marginTop: '20px',
                            }}
                        >
                            {buttonLabel}
                        </Button>
                        <Divider />
                        <Text style={{ color: '#ffffff' }}>Current Streak: {streak}</Text>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default StreakModeCard;
