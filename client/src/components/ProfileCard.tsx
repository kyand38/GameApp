import { EditFilled } from "@ant-design/icons";
import { useState } from "react";
import { Descriptions, Button, Input } from "antd";
import React from "react";
import { createStyles } from "antd-style";
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import Robot from "../images/Titian.webp";

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
        background: linear-gradient(135deg, #8969ff, #82b6ed);
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 0 5px 2px rgba(0, 255, 255, 0.4),
            0 0 10px 3px rgba(255, 0, 255, 0.4);
        width: 100%;
        max-width: 800px;
        margin-bottom: 40px;
    `,
    profileImage: css`
        width: 200px;
        border-radius: 50%;
        margin-bottom: 20px;
        box-shadow: 0 0 10px 5px rgba(0, 255, 255, 0.5),
            0 0 15px 6px rgba(255, 0, 255, 0.5);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        &:hover {
            transform: scale(1.05);
            box-shadow: 0 0 15px 6px rgba(0, 255, 255, 0.6),
                0 0 20px 7px rgba(255, 0, 255, 0.6);
        }
    `,
    profileButton: css`
        margin-top: 10px;
        border-radius: 10px;
        transition: all 0.3s ease-in-out;
        display: inline-block;
        font-size: 16px;
        color: #fff;
        background: linear-gradient(135deg, #6253e1, #04befe);
        border: none;
        &:hover {
            box-shadow: 0 0 10px 4px rgba(0, 255, 255, 0.5),
                0 0 12px 5px rgba(255, 0, 255, 0.5);
            transform: scale(1.05);
        }
    `,
}));


const ProfileCard: React.FC = () => {
    const { styles } = useProfileCardStyles();
    const { data, loading, error } = useQuery(GET_USER);

    const user = data?.me || { email: "", username: "", highScore: 0 };

    const [editing, setEditing] = useState({
        userName: false,
        email: false, // Add email to editing state
    });

    const [values, setValues] = useState({
        userName: "",
        email: "", // Add email to values state
    });

    // Update values when user data loads
    useEffect(() => {
        if (data?.me) {
            setValues({
                userName: data.me.username,
                email: data.me.email,
            });
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

    return (
        <div className={styles.profileCard}>
            <img
                src={Robot}
                alt="User Avatar"
                className={styles.profileImage}
            />
            <Descriptions
                title={user.username + "'s Profile"}
                bordered
                column={1}
                labelStyle={{ fontWeight: "bold", width: "150px" }}
                contentStyle={{ color: "#595959" }}
            >
                <Descriptions.Item label="Username">
                    {editing.userName ? (
                        <Input
                            value={values.userName}
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
                    {editing.email ? (
                        <Input
                            value={values.email}
                            onChange={(e) => handleChange(e, "email")}
                            onBlur={() => handleSave("email")}
                            autoFocus
                        />
                    ) : (
                        <>
                            {values.email || "Email Not Found"}
                            <Button
                                type="link"
                                icon={<EditFilled />}
                                onClick={() => handleEdit("email")}
                                style={{ padding: 0, marginLeft: 8 }}
                            />
                        </>
                    )}
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
