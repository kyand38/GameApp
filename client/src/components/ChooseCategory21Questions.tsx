import { useState } from 'react';
import { Button, Divider, Card, Typography } from 'antd';
import Confetti from 'react-confetti';
import CategorySelector from './CategorySelector';

const { Text, Title } = Typography;

const CategoryQuizCard = () => {
  const [category, setCategory] = useState<string | null>(null);
  const [trivia, setTrivia] = useState<any>(null);
  const [score, setScore] = useState(0);
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const getTriviaByCategory = async () => {
    if (!category) return;

    const url = `https://quizmania-api.p.rapidapi.com/trivia-by-category?category=${encodeURIComponent(
      category
    )}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_QUIZMASTER_API_KEY,
        'x-rapidapi-host': 'quizmania-api.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      setTrivia(result);
      setQuestionsAsked((prev) => prev + 1);
    } catch (error) {
      console.error('Error fetching trivia:', error);
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
      }}
    >
      {showConfetti && <Confetti />}
      <CategorySelector onSelect={(selectedCategory) => setCategory(selectedCategory)} />
      <Divider />
      <Button
        onClick={getTriviaByCategory}
        disabled={!category}
        style={{
          background: 'linear-gradient(90deg, rgb(4,190,254) 0%, rgb(98,83,225) 63%, rgb(255,110,199) 93%)',
          color: '#ffffff',
          border: '1px solid #555555',
        }}
      >
        Get Question
      </Button>
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
          <Text style={{ color: '#ffffff' }}>{trivia.question}</Text>
          <Divider />
          {trivia.answers.map((answer: string, index: number) => (
            <Button
              key={index}
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
        </Card>
      )}
    </div>
  );
};

export default CategoryQuizCard;