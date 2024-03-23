import './index.css'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SelectLocation = () => {
    return (
        <div className='sL-box'>
            <div className='sL-container' >
                <div className='sL-header'>
                    <p className='sL-h-txt'>Choose your location</p>
                </div>
                <div className='sL-body'>
                    <p className='sL-b-txt'>Delivery options and delivery speeds may vary for different locations</p>
                    <button className='sL-b-btn'>
                        <p className='btn-txt'>Sign in to see your address</p>
                    </button>
                    <button className='sL-b-btn1'>
                        <p className='btn-txt1'>Nepal</p>
                        <FontAwesomeIcon icon={faCaretDown} className='hs-icon' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SelectLocation