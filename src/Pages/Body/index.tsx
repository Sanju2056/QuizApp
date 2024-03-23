import './index.css'
import 'swiper/css';
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { image, topCardItems, arrayLast, arrayThree } from '../../../Constants'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css/navigation';

const Body = () => {
    const ItemCard = ({ item }) => {
        return (
            <div className='b-card'>
                <p className='b-card-title'>
                    {item.title}
                </p>
                <div className='b-img-div'>
                    <img
                        src={item.image}
                        className='b-img-css'
                    />
                </div>
                <p className='b-card-seeMore'>
                    See More
                </p>
            </div>
        )
    }
    const ItemCard2 = ({ item }) => {
        return (
            <div className='b-card'>
                <p className='b-card-title'>
                    {item.title}
                </p>
                <div className='b-img-div'>
                    <img
                        src={item.image}
                        className='b-img-css'
                    />
                </div>
                <p className='b-card-seeMore'>
                    See More
                </p>
            </div>
        )
    }

    return (

        <div className='box-main'>
            <div className='b-container-1'>
                {
                    topCardItems.map((item) => {
                        return <ItemCard item={item} />
                    })
                }
            </div>
            <div className='b-container-2'>
                <p className='b-card-title'>
                    Top Sellers in Books for you
                </p>
                <div className='book-container'>
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={0}
                        slidesPerView={8}
                        navigation
                    >
                        {
                            image.map((item) => {
                                return <SwiperSlide className='book-card-div'>
                                    <img
                                        src={item}
                                        className='book-css'
                                    />
                                </SwiperSlide>
                            })
                        }
                    </Swiper>
                </div>

            </div>
            <div className='b-container-3'>

                <p className='b-card-title'>Exciting deals
                    <span className='span-css'>See all deals</span>
                </p>
                <div className='b-c3-card-container'>
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={0}
                        slidesPerView={7}
                        navigation
                    >
                        {
                            arrayThree.map((item) => {
                                return (
                                    <SwiperSlide className='b-c3-card'>
                                        <div className='b-c3-img-div'>
                                            <img
                                                src={item.image}
                                                className='b-c3-img-css'
                                            />
                                        </div>
                                        <div className='bc3-txt1-div'>
                                            <div className='bc3-off-div'>
                                                <p className='bc3-off-txt'>{item.offer} off</p>
                                            </div>
                                            <p className='bc3-deal-txt' >Deal</p>
                                        </div>

                                        <div className='bc3-txt2-div'>
                                            <div className='bc3-txt2-div1'>
                                                <span className='bc3-txt2-span'>$</span>
                                                <p className='bc3-txt2-txt1'>
                                                    {item.newPrice}
                                                </p>
                                                <p className='bc3-txt2-txt2'>Last Price:
                                                    <span className='bc3-txt2-txt2-span'>${item.newPrice}</span></p>
                                            </div>
                                            <p className='bc3-txt2-txt3'>{item.itemName}</p>
                                        </div>

                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>

                </div>

            </div>
            <div className='b-container-1'>
                {
                    arrayLast.map((item) => {
                        return <ItemCard2 item={item} />
                    })
                }

            </div>
            <div className='b-container-3'>
            
                <p className='b-card-title'>Deals Under $100
                    <span className='span-css'>See More</span>
                </p>
                <div className='b-c3-card-container'>
                    <Swiper 
                     modules={[Navigation]}
                     spaceBetween={0}
                     slidesPerView={7}
                     navigation
                    >
                    {
                        arrayThree.map((item) => {
                            return <SwiperSlide className='b-c3-card'>
                                <div className='b-c3-img-div'>
                                    <img
                                        src={item.image}
                                        className='b-c3-img-css'
                                    />
                                </div>
                                <div className='bc3-txt1-div'>
                                    <div className='bc3-off-div'>
                                        <p className='bc3-off-txt'>{item.offer} off</p>
                                    </div>
                                    <p className='bc3-deal-txt' >Deal</p>
                                </div>

                                <div className='bc3-txt2-div'>
                                    <div className='bc3-txt2-div1'>
                                        <span className='bc3-txt2-span'>$</span>
                                        <p className='bc3-txt2-txt1'>
                                            {item.newPrice}
                                        </p>
                                        <p className='bc3-txt2-txt2'>Last Price:
                                            <span className='bc3-txt2-txt2-span'>${item.newPrice}</span></p>
                                    </div>
                                    <p className='bc3-txt2-txt3'>{item.itemName}</p>
                                </div>
                            </SwiperSlide>
                        })
                    }
                    </Swiper>
                   
                    
                </div>
            </div>
            <div className='b-container-1'>
                {
                    arrayLast.map((item) => {
                        return <ItemCard2 item={item} />
                    })
                }

            </div>
            <div className='b-container-4'>
                <div className='b-container4-f'></div>
                <div className='b-container4-m'>
                    <p className='b-c4-txt'>See personalized recommendations</p>
                    <button className='bc4-btn'><p className='bc4-btn-txt'>Sign in</p></button>
                    <p className='b-c4-txt2'>New customer?
                        <span className='b-c4-span'> Start here.</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Body