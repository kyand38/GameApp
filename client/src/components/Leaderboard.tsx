// import React from 'react';
// import { useQuery, gql } from '@apollo/client';
// import { Card, Typography, List } from 'antd';

// const { Text } = Typography;

// // Define the GraphQL query
// const GET_LEADERBOARD = gql`
//   query GetLeaderboard {
//     getLeaderboard {
//       username
//       score
//       category
//       createdAt
//     }
//   }
// `;

// const Leaderboard: React.FC = () => {
//     const { loading, error, data } = useQuery(GET_LEADERBOARD);

//     if (loading) return <Text>Loading...</Text>;
//     if (error) {
//         console.error('Error fetching leaderboard:', error);
//         return <Text style={{ color: 'red' }}>Error loading leaderboard</Text>;
//     }

//     if (!data?.getLeaderboard || data.getLeaderboard.length === 0) {
//         return <Text>No leaderboard entries found.</Text>;
//     }

//     return (
//         <Card
//             title="Leaderboard"
//             style={{
//                 margin: '20px auto',
//                 maxWidth: '600px',
//                 textAlign: 'center',
//                 border: '2px solid',
//                 borderImage: 'linear-gradient(90deg, rgb(255,110,199) 0%, rgb(98,83,225) 63%, rgb(4,190,254) 93%) 1',
//                 backgroundColor: '#2a2a2a',
//                 color: '#ffffff',
//             }}
//         >
//             <List
//                 dataSource={data.getLeaderboard}
//                 renderItem={(entry: { username: string; score: number; category: string; createdAt: string }) => (
//                     <List.Item style={{ color: '#ffffff' }}>
//                         <Text strong>{entry.username}</Text> scored <Text strong>{entry.score}</Text> in{' '}
//                         <Text italic>{entry.category || 'General'}</Text> on{' '}
//                         <Text italic>{new Date(entry.createdAt).toLocaleString()}</Text>
//                     </List.Item>
//                 )}
//             />
//         </Card>
//     );
// };

// export default Leaderboard;

import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Button, Drawer, Typography, List, Spin } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';


const { Text } = Typography;

// GraphQL query to fetch leaderboard data
const GET_LEADERBOARD = gql`
  query GetLeaderboard {
    getLeaderboard {
      username
      score
      category
      createdAt
    }
  }
`;

interface Props {
    buttonStyle: string;
}

const Leaderboard: React.FC<Props> = ({ buttonStyle }: any) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { loading, error, data } = useQuery(GET_LEADERBOARD);

    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

    return (
        <div>
            {/* Button to toggle the drawer */}
            <Button
                type="primary"
                onClick={toggleDrawer}
                className={`${buttonStyle} button ant-btn-lg`}
                icon={<AntDesignOutlined />}
        //         style={{
        //             background: 'linear-gradient(90deg, rgb(4,190,254) 0%, rgb(98,83,225) 63%, rgb(255,110,199) 93%)',
        //             border: 'none',
        //             display: 'inline - block',
        //             margin: '10px',
        //             opacity: 0,
        //             transition: 'all 0.3s ease-in -out',
        //             position: 'relative',  
        // }}
      >
            View Leaderboard
        </Button>

      {/* Drawer component */ }
    <Drawer
        title="Leaderboard"
        placement="left"
        onClose={toggleDrawer}
        open={isDrawerOpen}
        bodyStyle={{
            backgroundColor: '#1a1a1a',
            color: '#ffffff',
            padding: '20px',
        }}
        headerStyle={{
            backgroundColor: '#1a1a1a',
            color: '#ffffff',
            textAlign: 'center',
            fontWeight: 'bold',
        }}
    >
        {loading ? (
            <Spin tip="Loading..." style={{ display: 'block', margin: '20px auto' }} />
        ) : error ? (
            <Text style={{ color: 'red' }}>Error loading leaderboard</Text>
        ) : data.getLeaderboard && data.getLeaderboard.length > 0 ? (
            <List
                dataSource={data.getLeaderboard}
                renderItem={(entry: { username: string; score: number; category: string; createdAt: string }) => (
                    <List.Item
                        style={{
                            borderBottom: '1px solid #555',
                            padding: '10px 0',
                            color: '#ffffff',
                        }}
                    >
                        <div>
                            <Text strong style={{ color: '#87e8de' }}>
                                {entry.username}
                            </Text>{' '}
                            scored{' '}
                            <Text strong style={{ color: '#ff85c0' }}>
                                {entry.score}
                            </Text>{' '}
                            in{' '}
                            <Text italic style={{ color: '#ffc069' }}>
                                {entry.category || 'General'}
                            </Text>
                            <br />
                            <Text style={{ color: '#ffffff' }}>
                                {new Date(entry.createdAt).toLocaleDateString()}
                            </Text>
                        </div>
                    </List.Item>
                )}
            />
        ) : (
            <Text>No leaderboard entries found.</Text>
        )}
    </Drawer>
    </div >
  );
};

export default Leaderboard;