import { useState } from 'react';
import { Button, Divider, Card, Typography } from 'antd';
import '../assets/styles/flames.css'; // Assuming flames.css is in the same folder as QuizCard
import Confetti from 'react-confetti';

const { Text, Title } = Typography;

interface QuestionCardProps {
    question: string;
    answers: string[];
    correct: string;
    category: string;
    explanation: string;
}

const QuizCard = () => {
    const [trivia, setTrivia] = useState<QuestionCardProps | null>(null);
    const [score, setScore] = useState(0);
    const [questionsAsked, setQuestionsAsked] = useState(0);
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
            console.log('Trivia Question:', result); // Debugging
            setTrivia(result);
            setShowExplanation(false);
            setSelectedAnswer(null);
            setQuestionsAsked((prev) => prev + 1);
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
            setScore((prev) => prev + 1);
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000); // Turn off confetti after 3 seconds
        } else {
            setShowFlames(true);
            setTimeout(() => setShowFlames(false), 3000); // Optional: Turn off flames after 3 seconds
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundColor: '#1a1a1a',
                position: 'relative',
            }}
        >
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
                {questionsAsked >= 21 ? (
                    <div>
                        <Title level={3} style={{ color: '#ffffff' }}>
                            Game Over
                        </Title>
                        <Text style={{ color: '#ffffff' }}>Your final score: {score}</Text>
                    </div>
                ) : (
                    <div>
                        {trivia === null ? (
                            <Text style={{ color: '#ffffff' }}>Click the button to start!</Text>
                        ) : (
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
                                                ? 'Correct!'
                                                : `Wrong! The correct answer is: ${trivia.correct}`}
                                        </Text>
                                        <br />
                                        <Text style={{ color: '#ffffff' }}>Explanation: {trivia.explanation}</Text>
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
                        <Text style={{ color: '#ffffff' }}>Score: {score}</Text>
                        <br />
                        <Text style={{ color: '#ffffff' }}>Questions Asked: {questionsAsked}/21</Text>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default QuizCard;