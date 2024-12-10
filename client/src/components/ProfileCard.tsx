import { EditFilled } from "@ant-design/icons";
import { useState } from "react";
import { Descriptions, Button, Input } from "antd";
import React from "react";
import { createStyles } from "antd-style";
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";

const GET_USER = gql`
    query Me {
        me {
            _id
            username
            email
            highScore
        }
    }
`;

const useProfileCardStyles = createStyles(({ css }) => ({
    profileCard: css`
        background: linear-gradient(135deg, #6253e1, #04befe);
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 0 10px 4px rgba(0, 255, 255, 0.7),
            0 0 20px 6px rgba(255, 0, 255, 0.7);
        width: 80%;
        max-width: 400px;
        margin-bottom: 40px;
    `,
    profileImage: css`
        border-radius: 50%;
        margin-bottom: 20px;
        box-shadow: 0 0 20px 10px rgba(0, 255, 255, 0.9),
            0 0 30px 12px rgba(255, 0, 255, 0.9);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        &:hover {
            transform: scale(1.1);
        }
    `,
    profileButton: css`
        margin-top: 10px;
        border-radius: 10px;
        transition: all 0.3s ease-in-out;
        display: inline-block;
        font-size: 16px;
        font-weight: bold;
        color: #fff;
        background: linear-gradient(135deg, #6253e1, #04befe);
        box-shadow: 0 0 10px 4px rgba(0, 255, 255, 0.7);
        &:hover {
            box-shadow: 0 0 20px 6px rgba(255, 0, 255, 0.7);
            transform: scale(1.1);
        }
    `,
}));

const ProfileCard: React.FC = () => {
    const { styles } = useProfileCardStyles();
    const { data, loading, error } = useQuery(GET_USER);

    const user = data?.me || { email: "", username: "", highScore: 0 };

    const [editing, setEditing] = useState({
        userName: false,
    });

    const [values, setValues] = useState({
        userName: "",
    });

    // Update values when user data loads
    useEffect(() => {
        if (data?.me) {
            setValues({ userName: data.me.username });
        }
    }, [data]);

    const handleEdit = (field: string) => {
        setEditing((prev) => ({ ...prev, [field]: true }));
    };

    const handleSave = (field: string) => {
        setEditing((prev) => ({ ...prev, [field]: false }));
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: string
    ) => {
        setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };

    if (loading) return <p>Loading user data...</p>;
    if (error) return <p>Error loading user data: {error.message}</p>;
    console.log(data);
    console.log(user);

    return (
        <div className={styles.profileCard}>
            <img
                src="https://via.placeholder.com/150"
                alt="User Avatar"
                className={styles.profileImage}
            />
            <Descriptions
                title="User Profile"
                bordered
                column={1}
                labelStyle={{ fontWeight: "bold", width: "150px" }}
                contentStyle={{ color: "#595959" }}
            >
                <Descriptions.Item label="Username">
                    {editing.userName ? (
                        <Input
                            value={user.username}
                            onChange={(e) => handleChange(e, "userName")}
                            onBlur={() => handleSave("userName")}
                            autoFocus
                        />
                    ) : (
                        <>
                            {values.userName || "Username Not Found"}
                            <Button
                                type="link"
                                icon={<EditFilled />}
                                onClick={() => handleEdit("userName")}
                                style={{ padding: 0, marginLeft: 8 }}
                            />
                        </>
                    )}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                    {user.email || "Email Not Found"}
                </Descriptions.Item>
                <Descriptions.Item label="High Score">
                    {user.highScore || "No high scores"}
                </Descriptions.Item>
            </Descriptions>
            <Button className={styles.profileButton} type="primary">
                Save Changes
            </Button>
        </div>
    );
};


export default ProfileCard;
