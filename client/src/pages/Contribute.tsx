
import NewQuestionForm from "../components/newQuestionForm";
import FeedBackForm from "../components/feedBackForm";
import { Card } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ prefixCls, css }) => ({
    linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      border-width: 0;
  
      > span {
        position: relative;
      }
  
      &::before {
        content: '';
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }
  
      &:hover::before {
        opacity: 0;
      }
    }
  `,

    container: css`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    background-color: black;
    color: white;
    overflow: hidden;
    margin: 0;
  `,

    heading: css`
    font-family: 'Orbitron', sans-serif;
    margin-bottom: 20px;
    opacity: 0;
    z-index: 2;
    font-size: 3rem;
    font-weight: bold;
    background: linear-gradient(45deg, #ff007f, #ff00ff, #7f00ff, #00b8ff, #00ff00);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    background-clip: text;
    color: white;
  `,
  
    button: css`
    display: inline-block;
    margin: 10px;
    opacity: 0;
    transition: all 0.3s ease-in-out;
    z-index: 2;

    &:hover {
      animation: spin 0.5s ease-in-out;
    }
  `,
}));

const Contribute = () => {
   
    const { styles } = useStyle();

    return (
        <>
            <div className={styles.container}>
                <h1 className={`${styles.heading} heading`}>Contribute</h1>
                <div>
                    <Card title="Suggest A New Question">
                        <NewQuestionForm />
                    </Card>
                    <Card title="Give Us Your Feedback">
                        <FeedBackForm />
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Contribute;