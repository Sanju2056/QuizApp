import Body from "../Body"
import Footer from "../Footer"
import Header from "../Header"
// import Chat from "../Components/Chat/chat"
// import Tutorial from "../Tutorial"
import './index.css'

const HomePage = () => {
  return (
    <div className="homePage-main">
        <Header/>
        <Body/>
        <Footer/>
        {/* <Tutorial/> */}
    </div>
  )
}

export default HomePage