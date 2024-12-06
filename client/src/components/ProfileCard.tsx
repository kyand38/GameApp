
import { EditFilled } from "@ant-design/icons";
import { useState } from "react";
import { UserDetails } from "../interfaces/interface.js";
import { Card } from 'antd';
import React from 'react';

const getUserDetails = () => {
    const [userDetails, _setUserDetails] = useState<UserDetails | null>(null);

    return userDetails;
}

const ProfileCard: React.FC = () => {
    let user = getUserDetails();

    return (
        <>
            <Card style={{ width: 300 , }} size="default" >
                {user ? <p>Username: {user.userName} </p> : <p>Username Not Found</p>}
                <button><EditFilled /></button>
                <br />
                {user ? <p>Email: {user.email} </p> : <p>Email Not Found</p>}
                <button><EditFilled /></button>
                <br />
                {user ? <p>Password: {user.password} </p> : <p>Password Not Found</p>}
                <button><EditFilled /></button>
            </Card>
        </>
    );
}

export default ProfileCard;