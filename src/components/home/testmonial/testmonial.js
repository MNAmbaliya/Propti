import React from 'react';
import { Card, Carousel, Image } from 'react-bootstrap';
import Slider from "react-slick";
import ReactStars from "react-rating-stars-component";

// import resources
import '../../../assets/css/testmonial.css';
import Avatar1 from '../../../assets/images/avatars/avatar1.svg';
import Avatar2 from '../../../assets/images/avatars/avatar2.svg';
import Avatar3 from '../../../assets/images/avatars/avatar3.svg';
import QuateIcon from '../../../assets/images/icons/quate.svg';

function TestMonial() {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        centerMode:true,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows:false, 
        dots:false,
        initialSlide:1
    };
    const [slide, setSlide] = React.useState()
    return (
        <div className='testmonial-root'>
            <p className='home-section-title-1 mt-5 mt-md-3'>TESTIMONIAL</p>
            <div className='d-flex justify-content-between align-items-center'>
                <p className='home-section-title'>See what our<br/> customers think<br/> about us!</p>
                <div className="prev-next-button-section">
                    <div className="d-flex justify-content-end">
                        <div className="d-flex m-2" onClick={()=>(slide.slickPrev())}>
                            <div className='nextprev-button m-auto'>
                                <div className="prev-icon"> 
                                </div>
                            </div>
                        </div>
                        <div className="d-flex m-2" onClick={()=>(slide.slickNext())}>
                            <div className='nextprev-button m-auto'>
                                <div className="next-icon"> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="testmonial-desktop-carosel">
                <Slider ref={slider => (setSlide(slider))} {...settings}  className="mb-5">
                    {
                        Data.map(
                            (item)=>(
                                <div key={item.id}>
                                    <Card className="px-5 mx-3 testmonial-card set_testimonial_card">
                                        <Card.Body>
                                            <Image src={QuateIcon} className="testmonial-quate"></Image>
                                            <Card.Text className="mt-2 testmonial-text set_testmonial_text">
                                                {item.content}
                                            </Card.Text> 
                                            <div className='d-flex align-items-center'>
                                                <div>
                                                    <Image src={item.avatar} className="testmonial-profile"></Image>
                                                </div>
                                                <div className="ml-3">
                                                    <p className="testmonial-text testimonial-pro-name my-0">{item.name}</p>
                                                    <p className="testmonial-text testimonial-pro-type my-0">{item.user_type}</p>
                                                </div>
                                            </div>
                                            <div className="mt-1 l-2">
                                                <ReactStars size={34} value={item.star} edit={false}/>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            )
                        )
                    }
                </Slider>
            </div>
            <div className="testmonial-mobile-carosel">
                <Carousel>
                {
                        Data.map(
                            (item)=>(
                                <Carousel.Item key={item.id}>
                                    <Card className="p-1 mx-1 testmonial-card">
                                        <Card.Body>
                                            <img src={QuateIcon}></img>
                                            <Card.Text className="mt-4 testmonial-text set_testmonial_text">
                                                {item.content}
                                            </Card.Text> 
                                            <div className='d-flex align-items-center'>
                                                <div>
                                                    <img src={item.avatar} className="testmonial-profile"></img>
                                                </div>
                                                <div className="ml-2">
                                                    <p className="testmonial-text testimonial-pro-name">{item.name}</p>
                                                    <p className="testmonial-text testimonial-pro-type">{item.user_type}</p>
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                <ReactStars size={30} value={item.star} edit={false}/>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Carousel.Item>
                            )
                        )
                    }
                </Carousel>
            </div>
        </div>
    )
}

const Data = [
    {
        id:'testmonial_1',
        content:'I am very fortunate to trust my company to allies and now my company income isincreasing.',
        name:'Jenny Wilson',
        user_type:'Client',
        star:4,
        avatar: Avatar1
    },
    {
        id:'testmonial_2',
        content:'I am very fortunate to trust my company to allies and now my company income isincreasing.',
        name:'Jenny Wilson',
        user_type:'Agent',
        star:5,
        avatar: Avatar3
    },
    {
        id:'testmonial_3',
        content:'I am very fortunate to trust my company to allies and now my company income isincreasing.',
        name:'Jenny Wilson',
        user_type:'Agent',
        star:3,
        avatar: Avatar2
    },
    {
        id:'testmonial_4',
        content:'I am very fortunate to trust my company to allies and now my company income isincreasing.',
        name:'Jenny Wilson',
        user_type:'Client',
        star:2,
        avatar: Avatar1
    },
    {
        id:'testmonial_5',
        content:'I am very fortunate to trust my company to allies and now my company income isincreasing.',
        name:'Jenny Wilson',
        user_type:'Agent',
        star:4,
        avatar: Avatar2
    },
    {
        id:'testmonial_6',
        content:'I am very fortunate to trust my company to allies and now my company income isincreasing.',
        name:'Jenny Wilson',
        user_type:'reporter',
        star:5,
        avatar: Avatar3
    },
]

export default TestMonial;
