import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Button, Drawer, Typography, List, Spin } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import { GET_LEADERBOARD } from '../apollo/queries';
const { Text } = Typography;


interface Props {
    buttonStyle: string;
}

const Leaderboard: React.FC<Props> = ({ buttonStyle }: any) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [leaderboardData, setLeaderboardData] = useState<any>(null);
    const [getLeaderboard, { loading, error, data }] = useLazyQuery(GET_LEADERBOARD, { fetchPolicy: 'no-cache' });

    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

    useEffect(() => {
        getLeaderboard()
    }, [isDrawerOpen])

    useEffect(() => {
        data && setLeaderboardData(data.getLeaderboard)
    }, [data])

    return (
        <div>
            {/* Button to toggle the drawer */}
            <Button
                type="primary"
                onClick={toggleDrawer}
                className={`${buttonStyle} button ant-btn-lg`}
                icon={<AntDesignOutlined />}

            >
                View Leaderboard
            </Button>

            {/* Drawer component */}
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
                ) : leaderboardData && leaderboardData.length > 0 ? (
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