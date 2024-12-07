import Navbar from "../components/navbar";
// import QuizCard from "../components/21QuestionsCardRandom";
import StreakModeCard from "../components/StreakModeRandomCard";
const Game = () => {

    return (
        <>
        <h1>Triva Titans</h1>
        <Navbar/>
        <div>
            <StreakModeCard/>
        {/* <QuizCard/> */}
        </div>
        </>
    )
}

export default Game;