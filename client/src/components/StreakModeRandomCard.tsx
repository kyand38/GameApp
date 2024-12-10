import { useState } from 'react';
import { Button, Divider, Card, Typography, message } from 'antd';
import '../assets/styles/flames.css'; // Optional CSS for flames
import Confetti from 'react-confetti';
import SparkleEffect from '../components/SparkleComponent';
import Fireworks from '../components/Fireworks';
import { useMutation } from '@apollo/client';
import { ADD_LEADERBOARD_ENTRY } from '../apollo/mutations';
import AuthService from '../utils/auth'; // Import your AuthService

// Destructure the Typography components
const { Text, Title } = Typography;

interface QuestionCardProps {
    question: string;
    answers: string[];
    correct: string;
    category: string;
    explanation: string;
}

// Streak mode card component
const StreakModeCard = () => {
    const [trivia, setTrivia] = useState<QuestionCardProps | null>(null);
    const [streak, setStreak] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const [buttonLabel, setButtonLabel] = useState('First Question');
    const [showRedOverlay, setShowRedOverlay] = useState(false);
    const [showStreakOnly, _setShowStreakOnly] = useState(false); // New state for exclusive streak display
    const [addLeaderboardEntry] = useMutation(ADD_LEADERBOARD_ENTRY);

    // Function to fetch a random question
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
            setButtonLabel('Next Question');
        } catch (error) {
            console.error('Error fetching question:', error);
        }
    };

    // Function to add the final streak to the leaderboard
    const handleGameOver = async () => {
        const user = AuthService.getProfile(); // Retrieve user profile
        const username = user?.data.username || 'Anonymous'; // Fallback to 'Anonymous' if no username
    
        try {
            await addLeaderboardEntry({
                variables: {
                    username, // Pass the username
                    score: streak,
                },
            });
            message.success('Score added to the leaderboard!');
        } catch (err) {
            console.error('Error adding leaderboard entry:', err);
            message.error('Failed to update leaderboard.');
        }
    };

    // Function to handle answer button clicks
    const handleAnswerClick = (answer: string) => {
        setSelectedAnswer(answer);
        setShowExplanation(true);
        const user = AuthService.getProfile(); // Decode the user's profile from the token
        console.log('Decoded User:', user); // Log the decoded user to verify the structure
        if (answer !== trivia?.correct) {
            setShowRedOverlay(true);
            setTimeout(() => setShowRedOverlay(false), 2500);
            setGameOver(true);
        
            // Add to leaderboard when the game ends
            handleGameOver();
        } else {
            setStreak(streak + 1);
            setShowConfetti(true);

            // Submit the final streak to the leaderboard
            // const user = AuthService.getProfile(); // Retrieve user profile
            
            // addLeaderboardEntry({
            //     variables: {
            //         username: user?.data.username || 'Anonymous', // Fallback to 'Anonymous' if username is missing
            //         score: streak,
            //     },
            // })
            // .then(() => {
            //     message.success('Score added to the leaderboard!');
            // })
            // .catch((err) => {
            //     console.error('Error adding leaderboard entry:', err);
            //     message.error('Failed to update leaderboard.');
            // });
        }
    };
    // Function to reset the game
    const resetGame = () => {
        setStreak(0);
        setGameOver(false);
        setTrivia(null);
        setButtonLabel('First Question');
    };

    // New function to toggle the exclusive streak display
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
                        background:
                            'linear-gradient(45deg, #FF007F, #FF00FF, #7F00FF, #00B8FF, #00FF00)',
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
                </h1>
                <Fireworks /> {/* Fireworks displayed between questions */}
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
                    borderImage:
                        'linear-gradient(90deg, rgb(255,110,199)  0%, rgb(98,83,225) 63%, rgb(4,190,254)  93%) 1',
                    backgroundColor: '#2A2A2A',
                    padding: '20px',
                    textAlign: 'center',
                }}
            >
                {gameOver ? (
                    <div>
                        <Title level={3} style={{ color: '#FFFFFF' }}>
                            Game Over
                        </Title>
                        <Title level={4} style={{ color: '#FFFFFF', marginBottom: '20px' }}>
                            Your Streak: {streak}
                        </Title>
                        <Button
                            onClick={resetGame}
                            style={{
                                marginTop: '20px',
                                background:
                                    'linear-gradient(90deg, rgb(4,190,254) 0%, rgb(98,83,225) 63%, rgb(255,110,199) 93%)',
                                color: '#FFFFFF',
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
                                <Title level={4} style={{ color: '#FFFFFF' }}>
                                    Category: {trivia.category}
                                </Title>
                                <Text style={{ color: '#FFFFFF' }}>{trivia.question}</Text>
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
                                                color: '#FFFFFF',
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
                                        <Text style={{ color: '#FFFFFF' }}>
                                            {selectedAnswer === trivia.correct
                                                ? 'Correct! '
                                                : `Wrong! The correct answer was: `}
                                            <span style={{ color: 'lightgreen', fontWeight: 'bold' }}>
                                                {trivia.correct}
                                            </span>
                                        </Text>
                                        <br />
                                        <Text style={{ color: '#FFFFFF' }}>
                                            Explanation: {trivia?.explanation}
                                        </Text>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div>
                                <Text style={{ color: '#FFFFFF', fontSize: '1.2rem' }}>
                                    Click the button to start!
                                </Text>
                                <br />
                                <Text style={{ color: '#FFFFFF', fontSize: '1.2rem' }}>
                                    Answer the question correctly to increase your streak!
                                </Text>
                            </div>
                        )}
                        <Divider />
                        <Button
                            onClick={getRandomQuestion}
                            style={{
                                background:
                                    'linear-gradient(90deg, rgb(4,190,254) 0%, rgb(98,83,225) 63%, rgb(255,110,199) 93%)',
                                color: '#FFFFFF',
                                border: '1px solid #555555',
                                marginTop: '20px',
                            }}
                        >
                            {buttonLabel}
                        </Button>
                        <Divider />
                        <Text style={{ color: '#FFFFFF' }}>Current Streak: {streak}</Text>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default StreakModeCard;