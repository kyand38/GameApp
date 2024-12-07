import { useState } from 'react';
import { Modal, Button } from 'antd';

const categories = [
  "Geography",
  "Literature",
  "Science",
  "History",
  "Art",
  "Music",
  "Technology",
  "Sports",
  "Entertainment",
  "Biology",
  "Mathematics",
  "Food",
  "Mythology",
  "Astronomy",
  "YouTubers/Streamers",
  "Language",
  "Animals",
  "Culture",
  "Landmarks",
  "Economics",
  "Linguistics",
  "Chemistry",
  "Physics",
  "Philosophy",
  "Geology",
];

const CategorySelector = ({ onSelect }: { onSelect: (category: string) => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCategoryClick = (category: string) => {
    onSelect(category);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        style={{
          background: 'linear-gradient(90deg, rgb(4,190,254) 0%, rgb(98,83,225) 63%, rgb(255,110,199) 93%)',
          color: '#ffffff',
          border: '1px solid #555555',
        }}
      >
        Select Category
      </Button>
      <Modal
        title="Select a Trivia Category"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => handleCategoryClick(category)}
              style={{
                margin: '5px',
                backgroundColor: '#333333',
                color: '#ffffff',
                border: '1px solid #555555',
                width: '120px',
              }}
            >
              {category}
            </Button>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default CategorySelector;