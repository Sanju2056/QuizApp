import './index.css'
import { footerEnd, footerTop } from '../../../Constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import flag from '/flag.png'
import amazon from '/amazoon.png'
const Footer = () => {
  return (
    <div className="footer-main">
      <div className="f-box1">
        <div className='f-box1-sub'>
          <p className='f-txt1'>Back to top</p>
        </div>
      </div>
      <div className='f-box2'>
        <div className='f-box2-1'>
          {
            footerTop.map((item) => {
              return <div className='fb2-card-div'>
                <p className='fb2-title'>{item.title}</p>
                {
                  item.lists.map((item) => {
                    return <p className='fb2-content'>{item}</p>
                  })
                }
              </div>
            })
          }

        </div>
      </div>
      <div className='f-box3'>
        <div className='fb3-container'>
          <div className='fb3-img-div'>
            <img
              src={amazon}
              className='fb3-img'
            />
          </div>

          <div className='fb3-btn'>
            <FontAwesomeIcon icon={faGlobe} className='fb3-icon-globe' />
            <p className='fb3-txt'>English</p>
            <div className='fb3-icon-div'>
              <FontAwesomeIcon icon={faCaretUp} className='fb3-icon' />
              <FontAwesomeIcon icon={faCaretDown} className='fb3-icon' />
            </div>

          </div>
          <div className='fb3-btn'>
            <p className='fb3-txt'>$ USD - U.S.Dollar</p>
          </div>
          {/* <div className='fb3-btn'> */}
          <div className='fb3-img-div2'>
            <img className='fb3-img-css' src={flag} />
            <p className='fb3-txt'>United State</p>
          </div>
          {/* </div> */}
        </div>
      </div>
      <div className='f-box4'>
        <div className='fb4-container'>
          {
            footerEnd.map((item) => {
              return <div className='fb4-box'>
                <p className='fb4-title'>{item.title}</p>
                <p className='fb4-content'>{item.lists}</p>
              </div>
            })
          }

        </div>
        <div className='fb4-end'>
          <div className='fb4-end1'>
            <p className='fb4-title'> Condition of Use </p>
            <p className='fb4-title'> Privacy Notice </p>
            <p className='fb4-title'> Your Ads Privacy Choices</p>
          </div>
            <p className='fb4-title'>1996-2023 , Amazon.com , Inc or its affiliates</p>  
        </div>
      </div>
    </div>
  )
}

export default Footer