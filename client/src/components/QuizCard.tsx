import { useState } from 'react';
import { Card, Button, Typography, Space, Divider } from 'antd';
import 'antd/dist/reset.css';
// import gsap from 'gsap'
const { Title, Text } = Typography;

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

    const getRandomQuestion = async () => {
        const url = 'https://quizmania-api.p.rapidapi.com/random-trivia';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': import.meta.env.VITE_QUIZMASTER_API_KEY,
                'x-rapidapi-host': 'quizmania-api.p.rapidapi.com',
            },
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setTrivia(result);
            setShowExplanation(false);
            setSelectedAnswer(null);
            setQuestionsAsked((prev) => prev + 1);
        } catch (error) {
            console.error('Error fetching question:', error);
        }
    };

    const handleAnswerClick = (answer: string) => {
        setSelectedAnswer(answer);
        setShowExplanation(true);
        if (answer === trivia?.correct) {
            setScore((prev) => prev + 1);
        }
    };

    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#121212',
            minHeight: '100vh',
        }}>
            {questionsAsked >= 21 ? (
                <Card
                    style={{
                        maxWidth: 600,
                        margin: '0 auto',
                        backgroundColor: '#1e1e1e',
                        color: 'white',
                        textAlign: 'center',
                    }}
                // bordered={false} 'linear-gradient(90deg, rgb(4,190,254) 0%, rgb(98,83,225) 63%, rgb(255,110,199) 93%)'
                >
                    <Title level={2} style={{ color: '#ffffff' }}>
                        Game Over
                    </Title>
                    <Text>Your final score: {score}</Text>
                </Card>
            ) : (
                <Card
                    style={{
                        maxWidth: 600,
                        margin: '0 auto',
                        backgroundColor: '#1e1e1e',
                        color: 'white',
                        borderStyle: 'solid',
                        borderWidth: '2px',
                        borderColor: 'rgb(98,83,225)'
                    }}
                    //bordered={false}
                >
                    {trivia === null ? (
                        <Text style={{ color: '#ffffff' }}>Click the button to start!</Text>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Title level={4} style={{ color: '#ffffff', textAlign: 'center' }}>
                                Category: {trivia.category}
                            </Title>
                            <Divider />
                            <Text style={{ color: '#ffffff', textAlign: 'center', marginBottom: '20px' }}>
                                {trivia.question}
                            </Text>
                            <Space direction="vertical" style={{ width: '100%', maxWidth: '400px' }}>
                                {trivia.answers.map((answer, index) => (
                                    <Button
                                        key={index}
                                        onClick={() => handleAnswerClick(answer)}
                                        disabled={showExplanation}
                                        style={{
                                            backgroundColor: '#333333',
                                            color: '#ffffff',
                                            border: '1px solid rgb(4,190,254)',
                                            width: '100%',
                                            textAlign: 'left',
                                        }}
                                    >
                                        {answer}
                                    </Button>
                                ))}
                            </Space>
                            {showExplanation && (
                                <div style={{ marginTop: 20, textAlign: 'center' }}>
                                    <Text
                                        style={{
                                            color: selectedAnswer === trivia.correct ? '#00ff00' : '#ff4d4f',
                                        }}
                                    >
                                        {selectedAnswer === trivia.correct
                                            ? 'Correct!'
                                            : `Wrong! The correct answer is: ${trivia.correct}`}
                                    </Text>
                                    <Divider />
                                    <Text style={{ color: '#ffffff' }}>Explanation: {trivia.explanation}</Text>
                                </div>
                            )}
                        </div>
                    )}
                    <Divider />
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%', // Optional, to ensure vertical centering
                            gap: '1rem', // Adds spacing between elements
                        }}
                    >
                        <Button
                            onClick={getRandomQuestion}
                            style={{
                                background: 'linear-gradient(90deg, rgb(4,190,254) 0%, rgb(98,83,225) 63%, rgb(255,110,199) 100%)',
                                color: '#ffffff',
                                border: '1px solid #555555',
                            }}
                        >
                            Get Random Question
                        </Button>
                        <Divider style={{ backgroundColor: 'rgb(255,110,199)', width: '80%' }} />
                        <Text style={{ color: '#ffffff', fontSize: '16px' }}>Score: {score}</Text>
                        <Text style={{ color: '#ffffff', fontSize: '16px' }}>
                            Questions Asked: {questionsAsked}/21
                        </Text>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default QuizCard;