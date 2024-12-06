
import { useState} from "react";
import { UserDetails } from "../interfaces/interface";

const getUserDetails = () => {
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    return userDetails;
}

const ProfileCard = () => {
    let user = getUserDetails();

    return (
        <>
        {user ? <p>Username: {user.userName} </p>: <p>Username Not Found</p> } 
        <button>Edit</button>
        <br/>
        {user ? <p>Email: {user.email} </p>: <p>Email Not Found</p> } 
        <button>Edit</button>
        <br/>
        {user ? <p>Password: {user.password} </p>: <p>Password Not Found</p> }
        <button>Edit</button>
        </>
    );
}

export default ProfileCard;