import { useEffect, useState } from 'react';


function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        query {
                            leaderboard {
                                username
                                score
                                category
                                createdAt
                            }
                        }
                    `,
                }),
            });
            const { data } = await response.json();
            setLeaderboard(data.leaderboard);
            setLoading(false);
        };
        fetchLeaderboard();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Leaderboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Score</th>
                        <th>Category</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((entry: any, index: number) => (
                        <tr key={index}>
                            <td>{entry.username}</td>
                            <td>{entry.score}</td>
                            <td>{entry.category}</td>
                            <td>{new Date(entry.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default Leaderboard;