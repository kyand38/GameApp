import Navbar from "../components/navbar";
import CategoryQuizCard from "../components/ChooseCategory21Questions";
const Game = () => {

    return (
        <>
        <h1>Triva Titans</h1>
        <Navbar/>
        <div>
            <CategoryQuizCard/>
        </div>
        </>
    )
}

export default Game;