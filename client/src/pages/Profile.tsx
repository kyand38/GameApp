import Navbar from "../components/navbar";
import ProfileCard from "../components/ProfileCard";

const Profile = () => {

    return (
        <> 
            <div>
                <h1>Profile</h1>
                <Navbar/>
            </div>
            <div>
                <ProfileCard/>
            </div>
        </>
    )
}

export default Profile;