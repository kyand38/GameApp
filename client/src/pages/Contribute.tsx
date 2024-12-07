
import Navbar from "../components/navbar";
import NewQuestionForm from "../components/newQuestionForm";
import FeedBackForm from "../components/feedBackForm";

import { Card } from 'antd';

const Contribute = () => {

    return (
        <>
            <h1>Contribute</h1>
            <Navbar />
            <div>
                <Card title="Suggest A New Question">
                    <NewQuestionForm/>
                </Card>
                <Card title="Give Us Your Feedback">
                    <FeedBackForm/>
                </Card>
            </div>
        </>
    )
}

export default Contribute;