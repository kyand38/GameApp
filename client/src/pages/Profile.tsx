import Navbar from "../components/navbar";
import ProfileCard from "../components/ProfileCard";
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ css }) => ({
    mainContainer: css`
        background: black;
       
    `,

    container: css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        text-align: center;
    `,
    profileSection: css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    `,
}));

const Profile = () => {
    const { styles } = useStyle();

    return (
        <>
            <Navbar />
            <div className={styles.mainContainer}>
            <div className={styles.container}>
                <div className={styles.profileSection}>
                    <ProfileCard />
                </div>
            </div>
            </div>
        </>
    );
};

export default Profile;
