import { EditFilled } from "@ant-design/icons";
import { useState } from "react";
import { UserDetails } from "../interfaces/interface.js";
import { Descriptions, Button, Input } from 'antd';
import React from 'react';
import { createStyles } from 'antd-style';

const useProfileCardStyles = createStyles(({ css }) => ({
    
    profileCard: css`
        background: linear-gradient(135deg, #6253e1, #04befe);
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 0 10px 4px rgba(0, 255, 255, 0.7), 0 0 20px 6px rgba(255, 0, 255, 0.7);
        width: 80%;
        max-width: 400px;
        margin-bottom: 40px;
    `,
    profileImage: css`
        border-radius: 50%;
        margin-bottom: 20px;
        box-shadow: 0 0 20px 10px rgba(0, 255, 255, 0.9), 0 0 30px 12px rgba(255, 0, 255, 0.9);
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

const getUserDetails = () => {
    const [userDetails, _setUserDetails] = useState<UserDetails | null>(null);
    return userDetails;
}

const ProfileCard: React.FC = () => {
    let user = getUserDetails();
    
    const [editing, setEditing] = useState({
        userName: false,
        password: false
    });
    const [values, setValues] = useState({
        userName: user?.userName || '',
        password: user?.password || ''
    });

    const handleEdit = (field: string) => {
        setEditing((prev) => ({ ...prev, [field]: true }));
    };

    const handleSave = (field: string) => {
        setEditing((prev) => ({ ...prev, [field]: false }));
        // Update the state with the new value (you can also make an API call here to update the server)
        // For example:
        // updateUserDetails({ [field]: values[field] });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const { styles } = useProfileCardStyles();

    return (
       
            <div className={styles.profileCard}>
                <img
                    src="https://via.placeholder.com/150" // Add an image URL or replace with user avatar
                    alt="User Avatar"
                    className={styles.profileImage}
                />
                <Descriptions
                    title="User Profile"
                    bordered
                    column={1}
                    labelStyle={{ fontWeight: 'bold', width: '150px' }}
                    contentStyle={{ color: '#595959' }}
                >
                    <Descriptions.Item label="Username">
                        {editing.userName ? (
                            <Input
                                value={values.userName}
                                onChange={(e) => handleChange(e, 'userName')}
                                onBlur={() => handleSave('userName')}
                                autoFocus
                            />
                        ) : (
                            <>
                                {values.userName || "Username Not Found"}
                                <Button
                                    type="link"
                                    icon={<EditFilled />}
                                    onClick={() => handleEdit('userName')}
                                    style={{ padding: 0, marginLeft: 8 }}
                                />
                            </>
                        )}
                   
                    </Descriptions.Item>
                    <Descriptions.Item label="Password">
                        {editing.password ? (
                            <Input
                                value={values.password}
                                onChange={(e) => handleChange(e, 'password')}
                                onBlur={() => handleSave('password')}
                                autoFocus
                                type="password"
                            />
                        ) : (
                            <>
                                {values.password || "Password Not Found"}
                                <Button
                                    type="link"
                                    icon={<EditFilled />}
                                    onClick={() => handleEdit('password')}
                                    style={{ padding: 0, marginLeft: 8 }}
                                />
                            </>
                        )}
                    </Descriptions.Item>
                </Descriptions>
                <Button className={styles.profileButton} type="primary">
                    Save Changes
                </Button>
            </div>
       
    );
}

export default ProfileCard;
