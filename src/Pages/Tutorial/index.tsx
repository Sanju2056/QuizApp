import { useState } from 'react'
import './index.css'

const data = [
    {
        title: "What is HTML?",
        detail: "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser. It defines the meaning and structure of web content. It is often assisted by technologies such as Cascading Style Sheets and scripting languages such as JavaScript."
    },
    {
        title: "What is JavaScript?",
        detail: "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser. It defines the meaning and structure of web content. It is often assisted by technologies such as Cascading Style Sheets and scripting languages such as JavaScript."
    },
    {
        title: "What is CSS?",
        detail: "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser. It defines the meaning and structure of web content. It is often assisted by technologies such as Cascading Style Sheets and scripting languages such as JavaScript."
    },
    {
        title: "What is ReactJs?",
        detail: "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser. It defines the meaning and structure of web content. It is often assisted by technologies such as Cascading Style Sheets and scripting languages such as JavaScript."
    },

]
const Tutorial = () => {
    const Card = ({ item, index }) => {
        const [clicked, setClicked] = useState(false)
        const changeState = (item) => {
            setClicked(!clicked)
        }
        return <div className='main-tutorial'
        >
            <div className='main-t-header'
                onClick={() => { changeState(item) }}>
                <p className='main-t-txt'>
                    {item.title}
                </p>
            </div>
            {
                clicked ? <div className='main-t-detail'>
                    <p className='main-t-d-txt'>
                        {item.detail}
                    </p>
                </div> : ''
            }
        </div>
    }
    return (
        <div className='main-body'>
            <div className='main-container'>
                {
                    data.map((item, index) => {
                        return <Card item={item} index={index} key={index} />
                    })
                }

            </div>

        </div>
    )
}

export default Tutorial