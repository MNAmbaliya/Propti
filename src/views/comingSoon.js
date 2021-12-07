import React, { useState, useRef } from 'react';
import { Navbar,Button, Col, Container, Form, FormGroup, Image, Row } from 'react-bootstrap'
import Footer from '../components/footer'
import Header from '../components/header'
import validator from 'validator'
import axios from 'axios'
import BgPattern1 from '../assets/images/bg/pattern/hero_bg_pattern.svg';
import FooterBgPattern from '../assets/images/bg/pattern/footer_bg_pattern.svg';
import HeroImage from '../assets/images/svg/home.png';
import { Link } from 'react-router-dom';
import Autocomplete from 'react-google-autocomplete';
import { jsPDF } from "jspdf";
import Logo from '../assets/images/logo/logo.png';
import Line from '../assets/images/pdf/line.png';
import call from '../assets/images/pdf/call.png';
import mail from '../assets/images/pdf/mail.png';
import site from '../assets/images/pdf/internet.png';
import loaction from '../assets/images/pdf/loaction.png';
import bottom from '../assets/images/pdf/bottom.png';
import bg1 from '../assets/images/pdf/background1.png';
import bg2 from '../assets/images/pdf/background2.png';

export default function ComingSoon() {

    const [formData,setFormData] = React.useState([]);

    const [emailError, setEmailError] = useState('')
    const [btnCheck, setbtnCheck] = React.useState(true);
    const [mobileError, setmobileError] = useState('')


    const validateEmail = (e) => {
        var email = e.target.value
      
        if (validator.isEmail(email)) {
            setEmailError('')
            setFormData({
                ...formData,
                email: e.target.value
            })
            setbtnCheck(false)
        } else {
            setEmailError('Invalid')
            setbtnCheck(true)
        }
    }
    const validateMobile = (e) => {
        var mobile = e.target.value
      
        if (validator.isMobilePhone(mobile, 'any')) {
            setmobileError('')
            setFormData({
                ...formData,
                mobile: e.target.value
            })
            setbtnCheck(false)
        } else {
            setmobileError('Invalid')
            setbtnCheck(true)
        }
    }

    async function handleSubmit(e){
        e.preventDefault(); 
        if(formData.name != undefined || formData.email != undefined || formData.company != undefined || formData.mobile != undefined || formData.report != undefined){
            if(formData.name != "" || formData.email != "" || formData.company != "" || formData.mobile != "" || formData.report != "" ){
                const res = await axios.post(
                    process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
                    {
                        action:"coming_soon",
                        name:formData.name,
                        email:formData.email,
                        mobile:formData.mobile,
                        report:formData.report,
                        company:formData.company,
                        
                        
                    }
                )
                window.location.reload();
            }
        }
    }


    console.log(formData);
    return (
        <div>
            <Image src={BgPattern1} className="position-absolute w-100" style={{ zIndex:"-1"}}></Image>
            <Container>
                <Navbar className="justify-content-between">
                    <Link to="/"><Navbar.Brand><Image src={Logo} className="logo-image"></Image></Navbar.Brand></Link>
                    <div className="navbar-desktop-menu w-100">
                        <Row className="justify-content-end">
                            <Col md={3} className="text-right">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="19" viewBox="0 0 22 19" fill="none">
                                    <path d="M3 1.89368H19C20.1 1.89368 21 2.79702 21 3.90111V15.9457C21 17.0498 20.1 17.9532 19 17.9532H3C1.9 17.9532 1 17.0498 1 15.9457V3.90111C1 2.79702 1.9 1.89368 3 1.89368Z" fill="#1D83FF" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M21 3.90112L11 10.9271L1 3.90112" fill="#1D83FF"/>
                                    <path d="M21 3.90112L11 10.9271L1 3.90112" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span className="ml-2">jake@propti.com.au</span>
                            </Col>
                            <Col md={3} className="text-right">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                    <path d="M19.8881 15.0945V18.1056C19.8892 18.3852 19.8321 18.6618 19.7206 18.918C19.609 19.1741 19.4454 19.404 19.2401 19.593C19.0349 19.782 18.7926 19.9258 18.5288 20.0154C18.265 20.1049 17.9854 20.1382 17.7081 20.1131C14.6309 19.7774 11.6751 18.722 9.07809 17.0316C6.66192 15.4906 4.61344 13.4345 3.07811 11.0093C1.38809 8.39084 0.336359 5.40958 0.00811668 2.3071C-0.0168727 2.02954 0.0159916 1.74979 0.104617 1.48568C0.193242 1.22157 0.335687 0.978868 0.522881 0.773037C0.710076 0.567207 0.937919 0.402754 1.1919 0.29015C1.44589 0.177545 1.72045 0.119256 1.99811 0.118994H4.9981C5.48341 0.1142 5.95389 0.286694 6.32186 0.604324C6.68983 0.921955 6.93017 1.36305 6.9981 1.84539C7.12472 2.80902 7.35954 3.75519 7.69809 4.66583C7.83264 5.02509 7.86176 5.41553 7.782 5.79088C7.70224 6.16624 7.51696 6.51078 7.24809 6.78368L5.9781 8.0584C7.40165 10.5713 9.47454 12.6519 11.9781 14.0807L13.2481 12.806C13.52 12.5361 13.8632 12.3501 14.2372 12.2701C14.6112 12.19 15.0001 12.2193 15.3581 12.3543C16.2653 12.6941 17.208 12.9298 18.1681 13.0569C18.6538 13.1257 19.0975 13.3713 19.4146 13.747C19.7317 14.1226 19.9002 14.6022 19.8881 15.0945Z" fill="#1D83FF"/>
                                </svg>
                                <span className="ml-2">+61 410 602 156</span>
                            </Col>
                            
                        </Row>
                    </div>
                </Navbar>
                <div className="comingsoon">
                    <h3>Launching Soon!</h3>
                    <p>
                        If you are a strata reporter, building & pest inspector, valuer, depreciation reporter or in need of any <br/>
                        of these reports simply fill in your information below and we will contact you
                    </p>
                </div>
                <Row className="comingform">
                    <Col md={6} className="mt-5">
                        <h4 className="commingContact">Contact Us</h4>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Form.Label className="contact-form-label">Name*</Form.Label>
                                <Form.Control type="text" placeholder="Enter Your Name" 
                                    onChange = {     
                                        (e)=>setFormData({
                                            ...formData,
                                            name: e.target.value
                                        })
                                    }
                                className='contact-form-input' required/>
                            </FormGroup>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>                                    
                                        <Form.Label className="contact-form-label">E-Mail ID*</Form.Label>
                                        <Form.Control type="email" placeholder="Enter Your Email" 
                                            
                                            onChange = {     
                                                (e)=>validateEmail(e)
                                            }
                                        className='contact-form-input' required />
                                         <span className="err">{emailError}</span>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Form.Label className="contact-form-label">Mobile Number*</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Your Mobile Number"  
                                             onChange = { 
                                                (e) => validateMobile(e)
                                            }
                                        className='contact-form-input' required/>
                                        <span className="err">{mobileError}</span>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6} className="my-3 mb-5">
                                    <Form.Check className="lable_color"
                                        onChange = {     
                                            (e)=>setFormData({
                                                ...formData,
                                                report: e.target.id
                                            })
                                        }
                                    label="Seeking a Report" type='radio' id="Seeking a Report"  name="inspection-radiogroup-1"/>
                                </Col>
                                <Col md={6} className="my-3 mb-5">
                                    <Form.Check className="lable_color"
                                        onChange = {     
                                            (e)=>setFormData({
                                                ...formData,
                                                report: e.target.id
                                            })
                                        }
                                    label="I want to provide service" type='radio' id="I want to provide service"  name="inspection-radiogroup-1"/>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Form.Label className="contact-form-label">Company*</Form.Label>
                                <Form.Control type="text"  
                                    onChange = {     
                                        (e)=>setFormData({
                                            ...formData,
                                            company: e.target.value
                                        })
                                    }
                                placeholder="Enter Company Name" className='contact-form-input' required/>
                            </FormGroup>
                            {/* <div className="psoload" id={displayName}> */}
                                {/* <div className="straight"></div> */}
                                {/* <div className="curve"></div>
                                <div className="center"></div> */}
                                {/* <div className="inner"></div> */}
                            {/* </div> */}
                            <div className="submit_data my-5">
                                <Button variant="primary" type="submit"  className="contact-form-submit" disabled={btnCheck}>
                                Submit Now
                                </Button>
                                {/* <div className="main-container" id={success}> */}
                                    {/* <div className="check-container">
                                        <div className="check-background">
                                            <svg viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7 25L27.3077 44L58.5 7" stroke="white" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    
                                    </div> */}
                                    {/* <p className="thank-you">Thank you for contacting us.</p> */}
                                {/* </div> */}
                            </div>

                        </Form>
                    </Col>
                    <Col md={6}>
                        <Image src={HeroImage} className="comingimage w-100 set_contact_img"></Image>
                    </Col>
                </Row>
            </Container>
            <div className="w-100 footer-bottom-line mt-5 comingfooter">
                <Container>
                    <Row>
                        <Col md={6} className="text-left">
                            <p>@2021 propti</p>
                        </Col>
                        <Col md={6} className="text-right">
                            <p><a href="./#/privacy-policy">Privacy Policy</a> | <a href="./#/term-use">T&C</a></p>
                        </Col>
                    </Row>
                </Container>
            </div> 

        </div>
    )
}
