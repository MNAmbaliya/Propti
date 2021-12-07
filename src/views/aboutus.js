import React, {useEffect} from 'react'
import { Col, Container, Image, Row  } from 'react-bootstrap'

import BgPattern1 from '../assets/images/bg/pattern/hero_bg_pattern.svg';
import BgPattern2 from '../assets/images/bg/pattern/ourwork_bg_pattern.svg'
import BgPattern3 from '../assets/images/bg/pattern/footer_bg_pattern.svg';
import IntroImage from '../assets/images/svg/Mask Group.png';
import IntroImagePanel from '../assets/images/svg/aboutus_image_panel.svg';
import Header from '../components/header';
import Footer from '../components/footer';
import Curiours from '../components/aboutus/curious';
import Userinfo from '../components/aboutus/userintro';

import '../assets/css/aboutus/aboutus.css'

function AboutUs() {
    useEffect(async () => {
        window.scrollTo(0,0);     
    }, [])
    return (
        <div className="w-100">
            <Image src={BgPattern1} className="position-absolute w-100" ></Image>
            <Container>
                <Header/>
                <div className="d-flex w-100 justify-content-center set_page_title">
                    <p className='aboutus-title'>About Us</p>
                </div>
                <Row className="about-section">
                    <Col xl={6} md={12} className="w-100 about-us-image">
                        <Image src={IntroImage} className="position-absolute aboutus-image"  style={{ left:'0'}}/>
                        <Image src={IntroImagePanel} className="aboutus-image-panel"/>
                    </Col>
                    <Col xl={6} md={12}>
                        <p className='aboutus-text set_about_text'>
                            Property reports and valuations are a crucial component when deciding to purchase a property. <br/><br/>

                            At Propti we aim to streamline the process of ordering reports and valuations through cutting-edge technology. <br/><br/>

                            Whether you are a buyer, vendor, real estate agent or conveyancer we aim to make it easier for you to purchase these documents!<br/><br/>

                            We have partnered with hundreds of strata companies, valuers, and reporters around Australia to help you save time, money, and research to help you focus on your property.<br/><br/>

                            Propti is not just a platform to order reports; it is a community of businesses that can leverage off one another. We deal with brokers, conveyancers, real estate & buyers’ agents, reporters, and valuers to help create a sustainable environment to ensure a result is met.

                        </p>
                    </Col>
                </Row>
                <div className="d-flex justify-content-between align-items-center curious_title_sec set_aboutus_root">
                    <div>
                        <p className="home-section-title-1 mb-0">CURIOUS ? </p>
                        <p className='aboutus-title'>How Does it Work?</p>
                    </div>
                    <div>
                        <p className="aboutus-text px-xl-3 px-md-0 curious-text">If you are looking for a property report, follow the steps provided for you and a quote will<br/> be sent to you prior to payment.</p>
                    </div>
                </div>
                <Curiours/>
            </Container>
            <Image src={BgPattern3} className="position-absolute w-100" style={{marginTop:'200px'}} ></Image>
            <Container>
                <Row className="carious_card_block set-cario-test">
                    <Col xl={6} md={12} key="For Reporters">
                        <Userinfo title="For Reporters" content="Receive free leads for joining our panel! We will help you gain more business via our network of agents and conveyancers. No more waiting around for business, simply log onto our portal and we will send you business. Receive funds upfront for new reports." link="Create Account Now" to="/signup"/>
                    </Col>
                    <Col xl={6} md={12} key="For Real-estate Agents">
                        <Userinfo title="For Real-estate Agents" content="As an Agent the time it takes to find and organise a strata report is extensive and unnecessary. We have developed a portal to minimise the time it takes you, whilst optimising your success selling property. We will help you know who the serious buyers are and help you find leads for future sales." link="Create Account Now" to="/signup"/>
                    </Col>
                    <Col xl={6} md={12} key="For Conveyancers">
                        <Userinfo title="For Conveyancers" content="A review of strata reports is necessary as you know. Gain access to potential clients by joining our platform. We have access to people buying all types of property reports who will potentially need help with settlements." link="Create Account Now" to="/signup"/>
                    </Col>
                    <Col xl={6} md={12} key="For Customers">
                        <Userinfo title="For Customers" content="No need to pick up the phone and call around! No need to sign up or create an account! Simply click the link and order a report seamlessly." link="Order Report Now" to="./"/>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    )
}

const Data = [
    {
        title:'For Reporters',
        content:'Receive free leads for joining our panel! We will help you gain more business via our network of agents and conveyancers. No more waiting around for business, simply log onto our not out portal and we will send you business. Receive funds upfront for new reports.'
    },
    {
        title:'For Real-estate Agents',
        content:'As an Agent the time it takes to find and organise a strata report is extensive and unnecessary. We have developed a portal to minimise the time it takes you, whilst optimising your success selling apartments. We will help you know who the serious buyers are and help you find leads for future sales.'
    },
    {
        title:'For Conveyancers',
        content:'A review of strata reports is necessary as you know. Gain access to potential customers by joining our platform. We have access to people buying strata reports who will potentially need help with settlements.'
    },
    {
        title:'For Customers',
        content:'No need to pick up a phone and call around! No need to sign up or create an account! Simply click on the link the real estate agent sends you or freely search the property you need a report for.'
    },

]

export default AboutUs
