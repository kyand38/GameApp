import { useState } from 'react';

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

            // Debugging: Log the API response
            console.log('API Response:', result);

            // Assuming `result` matches the structure of `QuestionCardProps`
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
        <div>
            {questionsAsked >= 21 ? (
                <div>
                    <h2>Game Over</h2>
                    <p>Your final score: {score}</p>
                    {/* Save score to user profile here */}
                </div>
            ) : (
                <div>
                    {trivia === null ? (
                        <p>Click the button to start!</p>
                    ) : (
                        <div>
                            <h2>Category: {trivia.category}</h2>
                            <h4>Question: {trivia.question}</h4>
                            <div>
                                {trivia.answers.map((answer, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswerClick(answer)}
                                        disabled={showExplanation}
                                    >
                                        {answer}
                                    </button>
                                ))}
                            </div>
                            {showExplanation && (
                                <div>
                                    <p>
                                        {selectedAnswer === trivia.correct
                                            ? 'Correct!'
                                            : `Wrong! The correct answer is: ${trivia.correct}`}
                                    </p>
                                    <p>Explanation: {trivia.explanation}</p>
                                </div>
                            )}
                        </div>
                    )}
                    <button
                        onClick={() => {
                            console.log("Button clicked");
                            getRandomQuestion();
                        }}
                    >
                        Get Random Question
                    </button>
                    <p>Score: {score}</p>
                    <p>Questions Asked: {questionsAsked}/21</p>
                </div>
            )}
        </div>
    );
};

export default QuizCard;