import { useState } from 'react';
import { Button, Divider, Card, Typography } from 'antd';
import '../assets/styles/flames.css'; // Optional CSS for flames
import Confetti from 'react-confetti';
import SparkleEffect from '../components/SparkleComponent';
import Fireworks from '../components/Fireworks';

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
    const [showFlames, setShowFlames] = useState(false);

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
            setShowFlames(false);
        } catch (error) {
            console.error('Error fetching question:', error);
        }
    };

    const handleAnswerClick = (answer: string) => {
        setSelectedAnswer(answer);
        setShowExplanation(true);

        if (answer === trivia?.correct) {
            setStreak((prev) => prev + 1);
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 4000); // Hide confetti after 4 seconds
        } else {
            setGameOver(true);
            setShowFlames(true);
            setTimeout(() => setShowFlames(false), 4000); // Hide flames after 4 seconds
        }
    };

    const resetGame = () => {
        setStreak(0);
        setGameOver(false);
        setTrivia(null);
    };

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
            {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
            {showFlames && <div className="flames"></div>}

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
                        {trivia === null ? (
                            <div>
                            <Text  style={{
                                            color: '#ffffff',
                                            fontSize: '1.5rem',
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            marginTop: '20px',
                                            marginBottom: '20px',
                                            textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                                        }}>Click the button to start!</Text>
                            <br></br>
                            <Text
                             style={{
                                color: '#ffffff',
                                fontSize: '1rem',
                                textAlign: 'center',
                                marginTop: '10px',
                                textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                            }}
                            >See how many questions you can get correct in a row!</Text>
                        </div>
                    )
                        : (
                            <div>
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
                            Get Random Question
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
