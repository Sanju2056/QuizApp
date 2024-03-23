import './index.css'
import AmazonIcon from '/amazoon.png'
import flag from '/flag.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faMagnifyingGlass, faCartArrowDown, faCaretDown, faBars } from '@fortawesome/free-solid-svg-icons'
import SelectLocation from '../SelectLocation'
const Header = () => {
  const Heading = ['Today Deal', 'Customer Service', ' Registry', 'Gift Cards', ' Sell']
  return (
    <div className='header-main'>
      <div className='header-container'>
        <div className='h-box-1'>
          <div className='h-box-1-img-div'>
            <img
              src={AmazonIcon}
              className='icon-css'
            />
          </div>
          <div className='h-box-1-delivery'>
            <div className='h-box-1-d-1'>
              <FontAwesomeIcon icon={faLocationDot} className='location-icon' />
            </div>
            <div className='h-box-1-d-2'>
              <p className='h-box-1-txt'>Delivery to </p>
              <p className='h-box-1-txt1'>Nepal</p>
            </div>
          </div>
        </div>
        <div className='h-box-2'>
          <div className='h-box-2-all'>
            <p className='h-box-2-txt'>All</p>
            <FontAwesomeIcon icon={faCaretDown} className='drop-css' />
          </div>
          <input placeholder='Search Amazon' className='h-box-input' />
          <div className='h-box-2-icon'>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='search-css' />
          </div>

        </div>
        <div className='h-box-3'>
          <div className='h-box-3-b1'>
            <div className='flag-div'>
              <img
                src={flag}
                className='flag-css'
              />
            </div>
            <p className='h-box-country-txt'>EN</p>
            <FontAwesomeIcon icon={faCaretDown} className='drop-css' />
          </div>
          <div className='h-box-3-b2'>
            <p className='txt1'>Hello,sign in</p>
            <div className='h-box-3-b2-subDiv'>
              <p className='txt2'>Accounts & List</p>
              <FontAwesomeIcon icon={faCaretDown} className='drop-css' />
            </div>
          </div>
          <div className='h-box3-b3'>
            <p className='h-b3-txt-1'>Return</p>
            <p className='h-b3-txt-2'>&Orders</p>
          </div>
          <div className='h-box-3-b4'>
            <FontAwesomeIcon icon={faCartArrowDown} className='cart-css' />
            <p className='h-box-3-b4-txt'>Cart</p>
          </div>
        </div>

      </div>
      <div className='header-sec'>
        <div className='hs-div'>
          <FontAwesomeIcon icon={faBars} className='hs-icon' />
          <p className='hs-txt'>All</p>
        </div>
        {
          Heading.map((item) => {
            return <div className='hs-div'>
              <p className='hs-txt1'>{item}</p>
            </div>
          })
        }
      </div>
      <SelectLocation/>
    </div>
  )
}

export default Header