
import { useState} from "react";

interface UserDetails {
    userName: string | null;
    email: string | null;
    password: string | null;
}

const getUserDetails = () => {
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    return userDetails;
}

const ProfileCard = () => {
    let user = getUserDetails();

    return (
        <>
        <p>Username: {user.userName}</p> 
        <button>Edit</button>
        <br/>
        <p>Email: {user.email}</p>
        <button>Edit</button>
        <br/>
        <p>Password: {user.password}</p>
        <button>Edit</button>
        </>
    );
}

export default ProfileCard;