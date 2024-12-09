import { useState } from 'react';
import { Button, Divider, Card, Typography } from 'antd';
import Confetti from 'react-confetti';
import '../assets/styles/flames.css';
import Fireworks from '../components/Fireworks';
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
    //const [showFlames, setShowFlames] = useState(false);
    const [showQuestionNumber, setShowQuestionNumber] = useState(false);
    const [questionLoading, setQuestionLoading] = useState(false);
    const [animateHeading, setAnimateHeading] = useState(false);
    const [showRedOverlay, setShowRedOverlay] = useState(false);

    const getRandomQuestion = async () => {
        setQuestionLoading(true);
        setShowQuestionNumber(true);
        setAnimateHeading(true);

        setTimeout(async () => {
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
               // setShowFlames(false);
            } catch (error) {
                console.error('Error fetching question:', error);
            } finally {
                setShowQuestionNumber(false);
                setQuestionLoading(false);
                setAnimateHeading(false);
            }
        }, 4000);
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
            {/* {showFlames && <div className="flames"></div>} */}

            {showQuestionNumber && (
                <>
                    <h1
                        className={animateHeading ? 'rotateAnimation' : ''}
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
                        }}
                    >
                        Question{' '}
                        <span
                            style={{
                                color: 'white',
                                textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                            }}
                        >
                            {questionsAsked + 1}
                        </span>
                        <Fireworks />
                    </h1>
                </>
            )}

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
                                <>
                                    <Text
                                        style={{
                                            color: '#ffffff',
                                            fontSize: '1.5rem',
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            marginTop: '20px',
                                            marginBottom: '20px',
                                            textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                                        }}
                                    >
                                        Party Time
                                    </Text>
                                    <Text
                                        style={{
                                            color: '#ffffff',
                                            fontSize: '1rem',
                                            textAlign: 'center',
                                            marginTop: '10px',
                                            textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                                        }}
                                    >
                                        <br></br>
                                        This version is 21 questions, chosen at random. Good luck, Titan!
                                    </Text>
                                </>

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
                                    background:
                                        'linear-gradient(90deg, rgb(4,190,254) 0%, rgb(98,83,225) 63%, rgb(255,110,199) 93%)',
                                    color: '#ffffff',
                                    border: '1px solid #555555',
                                    marginTop: '10px',
                                }}
                            >
                                {trivia === null ? 'Lets Play' : 'Next Question'}
                            </Button>
                            <Divider />
                            <Text style={{ color: '#ffffff' }}>Score: {score}</Text>
                            <br />
                            <Text style={{ color: '#ffffff' }}>Questions Asked: {questionsAsked}/21</Text>
                        </div>
                    )}
                </Card>
            )}
        </div>
    );
};

export default QuizCard;
