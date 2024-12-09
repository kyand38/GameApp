import { useState } from 'react';
import { Button, Divider, Card, Typography, Modal } from 'antd';
import { useMutation } from '@apollo/client';
import { ADD_LEADERBOARD_ENTRY } from '../apollo/mutations';
import Confetti from 'react-confetti';
import '../assets/styles/flames.css';
// import Fireworks from '../components/Fireworks';
import SparkleEffect from '../components/SparkleComponent';

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
    const [questionLoading, setQuestionLoading] = useState(false);
    const [showRedOverlay, setShowRedOverlay] = useState(false);
    const [isGameOverModalVisible, setIsGameOverModalVisible] = useState(false);

    const [addLeaderboardEntry] = useMutation(ADD_LEADERBOARD_ENTRY);

    const getRandomQuestion = async () => {
        setQuestionLoading(true);

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
        } catch (error) {
            console.error('Error fetching question:', error);
        } finally {
            setQuestionLoading(false);
        }
    };

    const handleAnswerClick = (answer: string) => {
        setSelectedAnswer(answer);
        setShowExplanation(true);

        if (answer === trivia?.correct) {
            setScore((prev) => prev + 1);
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
        } else {
            setShowRedOverlay(true);
            setTimeout(() => setShowRedOverlay(false), 1000);
        }

        setQuestionsAsked((prev) => prev + 1);

        if (questionsAsked + 1 >= 21) {
            setIsGameOverModalVisible(true);
        }
    };

    const handleSaveScore = async () => {
        try {
            await addLeaderboardEntry({
                variables: {
                    username: "Player", // Replace with actual username from auth context
                    score,
                    category: trivia?.category || 'General',
                },
            });
            console.log('Score saved successfully!');
        } catch (error) {
            console.error('Error saving score:', error);
        } finally {
            setIsGameOverModalVisible(false);
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
                backgroundColor: 'black',
                position: 'relative',
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
                        animation: 'flash 0.5s ease-in-out',
                    }}
                ></div>
            )}
            {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

            {!questionLoading && (
                <Card
                    style={{
                        width: 500,
                        borderRadius: '12px',
                        border: '2px solid',
                        borderImage: 'linear-gradient(90deg, rgb(255,110,199) 0%, rgb(98,83,225) 63%, rgb(4,190,254) 93%) 1',
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
                                                    ? 'Correct! '
                                                    : `Wrong! The correct answer was: `}
                                                <span style={{ color: 'lightgreen', fontWeight: 'bold' }}>
                                                    {trivia.correct}
                                                </span>
                                            </Text>
                                            <br />
                                            <Text style={{ color: '#ffffff' }}>
                                                Explanation: {trivia.explanation}
                                            </Text>
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
                                    marginTop: '10px',
                                }}
                            >
                                {trivia === null ? 'Let’s Play' : 'Next Question'}
                            </Button>
                            <Divider />
                            <Text style={{ color: '#ffffff' }}>Score: {score}</Text>
                            <br />
                            <Text style={{ color: '#ffffff' }}>Questions Asked: {questionsAsked}/21</Text>
                        </div>
                    )}
                </Card>
            )}

            {/* Game Over Modal */}
            <Modal
                title="Game Over"
                visible={isGameOverModalVisible}
                onCancel={() => setIsGameOverModalVisible(false)}
                footer={null}
                centered
            >
                <p>Your final score: {score}</p>
                <Button
                    onClick={handleSaveScore}
                    style={{
                        marginTop: '10px',
                        backgroundColor: '#28a745',
                        color: '#fff',
                        border: 'none',
                    }}
                >
                    Save to Leaderboard
                </Button>
                <Button
                    onClick={() => window.location.reload()}
                    style={{
                        marginTop: '10px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                    }}
                >
                    Start Again
                </Button>
            </Modal>
        </div>
    );
};

export default QuizCard;