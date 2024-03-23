import { Link } from 'react-router-dom'
import './index.css'
import icon from '/Vector.png'
import play from '/play.png'
import scoreIcon from '/scoreIcon.png'

const StartPage = () => {
    return (
        <div className='sp-main'>
            <div className='sp-container'>
                <div className='sp-box-1'>
                    <img
                        src={icon}
                        height={"100%"}
                        width={"100% "}
                    />
                    <p className='sp-b-txt'>QUIZ</p>
                </div>
                <div className='txt-div'>
                    <p className='txt-div-1'>Start the quiz</p>
                    <p className='txt-div-2'>Challenge yourself</p>
                </div>
                <Link to={'/quiz'}>
                    <button className='sp-btn'>
                        <img
                            src={play}
                            height={"60px"}
                            width={"60px"}
                        />
                        <p className='sp-btn-txt'>Play</p>
                    </button>
                </Link>
                <Link to={'/scoreSheet'}>
                    <button className='sp-btn1'>
                        <img
                            src={scoreIcon}
                            height={"60px"}
                            width={"60px"}
                        />
                        <p className='sp-btn-txt'>Scoreboard</p>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default StartPage