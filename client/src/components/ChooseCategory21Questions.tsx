import { useState } from 'react';
import { Button, Divider, Card, Typography, Modal } from 'antd';
import Confetti from 'react-confetti';
import SparkleEffect from './SparkleComponent';

const { Text, Title } = Typography;

interface Question {
    question: string;
    answers: string[];
    correct: string;
    category: string;
    explanation: string;
    difficulty: string;
}

const CategoryQuizCard = () => {
    const [category, setCategory] = useState<string | null>(null);
    const [trivia, setTrivia] = useState<Question | null>(null);
    const [score, setScore] = useState(0);
    const [questionsAsked, setQuestionsAsked] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [allQuestions, setAllQuestions] = useState<Question[]>([]);
    const [usedIndices, setUsedIndices] = useState<number[]>([]);
    const [showExplanation, setShowExplanation] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isGameOver, setIsGameOver] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1); // Track current question index
    const [isQuestionVisible, setIsQuestionVisible] = useState(false); // New state for visibility of the h1
    const [showRedOverlay, setShowRedOverlay] = useState(false);

    const MAX_QUESTIONS = 21;

    const categories = [
        'Geography',
        'Literature',
        'Science',
        'History',
        'Art',
        'Music',
        'Technology',
        'Sports',
        'Entertainment',
        'Biology',
        'Mathematics',
        'Food',
        'Mythology',
        'Astronomy',
        'YouTubers/Streamers',
        'Language',
        'Animals',
        'Culture',
        'Landmarks',
        'Economics',
        'Linguistics',
        'Chemistry',
        'Physics',
        'Philosophy',
        'Geology',
    ];

    const fetchTriviaByCategory = async (selectedCategory: string) => {
        try {
            const url = `/api/quiz/trivia-by-category?category=${encodeURIComponent(selectedCategory)}`;
            const response = await fetch(url, { method: 'GET' });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const result = await response.json();
    
            setAllQuestions(result);
            setUsedIndices([]);
            pickRandomQuestion(result, []);
        } catch (error) {
            console.error('Error fetching trivia:', error);
        }
    };

    const pickRandomQuestion = (questions: Question[], used: number[]) => {
        if (used.length >= questions.length || questionsAsked >= MAX_QUESTIONS) {
            setIsGameOver(true);
            return;
        }

        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * questions.length);
        } while (used.includes(randomIndex));

        setUsedIndices([...used, randomIndex]);
        setTrivia(questions[randomIndex]);
        setQuestionsAsked((prev) => prev + 1);
        setCurrentQuestionIndex(questionsAsked + 1); // Update the current question index
        setShowExplanation(false);
        setSelectedAnswer(null);
        setShowConfetti(false);

        // Show the question index for 4 seconds
        setIsQuestionVisible(true);
        setTimeout(() => setIsQuestionVisible(false), 4000);
    };

    const handleAnswerClick = (answer: string) => {
        if (!trivia) return;

        setSelectedAnswer(answer);
        setShowExplanation(true);

        if (answer === trivia.correct) {
            setScore((prev) => prev + 1);
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
        }
        else {
            setShowRedOverlay(true);
            setTimeout(() => setShowRedOverlay(false), 1000);
        };
    };

    const handleCategorySelect = (selectedCategory: string) => {
        setCategory(selectedCategory);
        setIsModalOpen(false);
        fetchTriviaByCategory(selectedCategory);
    };

    const restartGame = () => {
        setIsGameOver(false);
        setScore(0);
        setQuestionsAsked(0);
        setTrivia(null);
        setUsedIndices([]);
        // fetchTriviaByCategory(selectedCategory);
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
    
            {isGameOver ? (
                <Card
                    style={{
                        width: 500,
                        borderRadius: '12px',
                        backgroundColor: '#2a2a2a',
                        padding: '20px',
                        textAlign: 'center',
                    }}
                >
                    <Title level={3} style={{ color: '#ffffff' }}>
                        Game Over!
                    </Title>
                    <Text style={{ color: '#ffffff', fontSize: '18px', fontWeight: 'bold' }}>Your Final Score: {score}</Text>
                    <Divider />
                    <Button
                        onClick={restartGame}
                        style={{
                            background: 'linear-gradient(90deg, rgb(4,190,254) 0%, rgb(98,83,225) 63%, rgb(255,110,199) 93%)',
                            color: '#ffffff',
                            border: '1px solid #555555',
                            marginBottom: '10px',
                        }}
                    >
                        Start Again
                    </Button>
                    <Button
                        onClick={() => (window.location.href = '/')}
                        style={{
                            background: '#333333',
                            color: '#ffffff',
                            border: '1px solid #555555',
                        }}
                    >
                        Return to Homepage
                    </Button>
                </Card>
            ) : (
                <>
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        style={{
                            background: 'linear-gradient(90deg, rgb(4,190,254) 0%, rgb(98,83,225) 63%, rgb(255,110,199) 93%)',
                            color: '#ffffff',
                            border: '1px solid #555555',
                            marginBottom: '20px',
                        }}
                    >
                        Choose Category
                    </Button>
                    <Divider />
    
                    {trivia && (
                        <Card
                            style={{
                                marginTop: '20px',
                                borderRadius: '12px',
                                border: '2px solid',
                                borderImage: 'linear-gradient(90deg, rgb(255,110,199) 0%, rgb(98,83,225) 63%, rgb(4,190,254) 93%) 1',
                                backgroundColor: '#2a2a2a',
                                padding: '20px',
                                textAlign: 'center',
                            }}
                        >
                            <Title level={4} style={{ color: '#ffffff' }}>
                                Category: {category}
                            </Title>
                            <Text style={{ color: '#ffffff', fontStyle: 'italic' }}>Difficulty: {trivia.difficulty}</Text>
                            <Divider />
                            <Text style={{ color: '#ffffff' }}>Score: {score}</Text>
                            <br />
                            <Text style={{ color: '#ffffff' }}>Questions Asked: {questionsAsked}/21</Text>
                            <Divider />
                            {/* Conditionally render the question index */}
                            {isQuestionVisible ? (
                                <h1 style={{ color: '#ffffff' }}>
                                    Question {currentQuestionIndex} of {MAX_QUESTIONS}
                                </h1>
                            ) : (
                                <>
                                    <Text style={{ color: '#ffffff' }}>{trivia.question}</Text>
                                    <Divider />
                                    {trivia.answers.map((answer: string, index: number) => (
                                        <Button
                                            key={index}
                                            onClick={() => handleAnswerClick(answer)}
                                            style={{
                                                margin: '5px',
                                                backgroundColor: '#333333',
                                                color: '#ffffff',
                                                border: '1px solid #555555',
                                                width: '80%',
                                            }}
                                        >
                                            {answer}
                                        </Button>
                                    ))}
                                    {showExplanation && selectedAnswer && (
                                        <div style={{ marginTop: '10px' }}>
                                            <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>
                                                {selectedAnswer === trivia.correct
                                                    ? 'Correct!'
                                                    : `Wrong! The correct answer is: ${trivia.correct}`}
                                            </Text>
                                            <br />
                                            <Text style={{ color: '#ffffff' }}>{trivia.explanation}</Text>
                                            <br></br>
                                            <Button
                                                onClick={() => pickRandomQuestion(allQuestions, usedIndices)}
                                                disabled={allQuestions.length === 0}
                                                style={{
                                                    background: 'linear-gradient(90deg, rgb(4,190,254) 0%, rgb(98,83,225) 63%, rgb(255,110,199) 93%)',
                                                    color: '#ffffff',
                                                    border: '1px solid #555555',
                                                }}
                                            >
                                                Next Question
                                            </Button>
                                        </div>
                                    )}
                                </>
                            )}
                        </Card>
                    )}
                </>
            )}
    
            {/* Category Selector Modal */}
            <Modal
                title="Select a Category"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                bodyStyle={{
                    backgroundColor: '#1a1a1a',
                    color: '#ffffff',
                }}
                centered
            >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                    {categories.map((category) => (
                        <Button
                            key={category}
                            onClick={() => handleCategorySelect(category)}
                            style={{
                                margin: '5px',
                                background: 'linear-gradient(90deg, rgb(4,190,254) 0%, rgb(98,83,225) 63%, rgb(255,110,199) 93%)',
                                color: '#ffffff',
                                border: '1px solid #555555',
                            }}
                        >
                            {category}
                        </Button>
                    ))}
                </div>
            </Modal>
        </div>
    );
}    

export default CategoryQuizCard;
