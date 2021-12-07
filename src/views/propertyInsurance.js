import React, { useState, useRef } from 'react';
import { Button, Col, Container, Form, FormGroup, Image, Row } from 'react-bootstrap'
import Footer from '../components/footer'
import Header from '../components/header'
import validator from 'validator'
import BgPattern1 from '../assets/images/bg/pattern/hero_bg_pattern.svg';
import FooterBgPattern from '../assets/images/bg/pattern/footer_bg_pattern.svg';
import HeroImage from '../assets/images/svg/Submit.png';
import { Link } from 'react-router-dom';
import Autocomplete from 'react-google-autocomplete';
import { jsPDF } from "jspdf";
import { useHistory } from 'react-router-dom';
import axios from 'axios'


export default function PropertyInsurance() {
    var minm = 100000000000;
    var maxm = 999999999999;
    var code = Math.floor(Math.random() * (maxm - minm + 1)) + minm;

    const [emailError, setEmailError] = useState('')
    const [btnCheck, setbtnCheck] = React.useState(true);
    const [mobileError, setmobileError] = useState('')

    const [formData, setFormData] = React.useState({
        action:"purchase",
        name:"",
        email:"",
        mobile:"",
        replacement:"",
        articles:"",
        address:"",
        value:"",
        Insurer:""
    })
    
    async function handleSubmit(e){
        e.preventDefault(); 

        const res = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:"property_insurence_send_mail",
                name:formData.name,
                email:formData.email,
                mobile:formData.mobile,
                replacement:formData.replacement,
                articles:formData.articles,
                address:formData.address,
                value:formData.value,
                Insurer:formData.Insurer
                
            }
        )

        history.push(
            {
                pathname:"../success",
                state:{
                    order:'Property Insurance', number:code, text:'A quote will be sent to you via email please refer to your reference number'
                }
            }
        );
    }

    async function validate(evt) {
        
        var theEvent = evt || window.event;
        
        if (theEvent.type === 'paste') {
            key = window.event.clipboardData.getData('text/plain');
        } else {
            var key = theEvent.keyCode || theEvent.which;
            key = String.fromCharCode(key);
        }
        var regex = /[0-9]|\./;
        if( !regex.test(key)) {
            theEvent.returnValue = false;
            if(theEvent.preventDefault) theEvent.preventDefault();
        }
    }


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

    const history = useHistory();

    return (
        <div>
            <Image src={BgPattern1} className="position-absolute w-100" style={{ zIndex:"-1"}}></Image>
            <Container>
                <Header/>
                <div className="text-center set_page_title">
                    <p className="app-title">Order Property Insurance</p> 
                </div>
                <Row className='insurance-block'>
                    <Col md={4}>
                        <Image src={HeroImage} className="position-asbolute w-100 set_hero_bg"></Image>
                        <p className="hero-title my-5 text-center">A quote will be sent to you via email</p>
                    </Col>
                    <Col md={8} className="insurance-form">
                        <Form  onSubmit={handleSubmit}>
                            <FormGroup>
                                <Form.Label className="contact-form-label">Name*</Form.Label>
                                <Form.Control type='text' placeholder="Enter Your Name Here" className='contact-form-input' required
                                
                                    onChange = {     
                                        (e)=>setFormData({
                                            ...formData,
                                            name: e.target.value
                                        })
                                    }
                                ></Form.Control>
                            </FormGroup>
                            
                            <Row>
                                <Col md={6} className="my-3">
                                    <Form.Label className="contact-form-label">E-Mail ID*</Form.Label>
                                    <Form.Control type='email' placeholder="Enter Your E-Mail ID Here" className='contact-form-input' required
                                    
                                    onChange = {     
                                        (e)=>validateEmail(e)
                                    }
                                    ></Form.Control>
                                    <span className="err">{emailError}</span>
                                </Col>
                                <Col md={6} className="my-3">
                                    <Form.Label className="contact-form-label">Mobile Number*</Form.Label>
                                    <Form.Control type='tel' maxlength="8" placeholder="Enter Your Mobile Number Here" maxlength="10" className='contact-form-input' required
                                        
                                        onChange = { 
                                            (e) => validateMobile(e)
                                        }
                                    ></Form.Control>
                                    <span className="err">{mobileError}</span>
                                </Col>
                                <Col md={6} className="my-3 fixed_value">
                                    <Form.Label className="contact-form-label">Home replacement value*</Form.Label>
                                    <Form.Control type='text' maxlength="8" className='contact-form-input' required
                                        onChange = {     
                                            (e)=>setFormData({
                                                ...formData,
                                                replacement: e.target.value
                                            })
                                        }
                                        onKeyPress= {
                                            (e)=>validate(e)
                                        }
                                        onBlur={
                                            (e)=>{
                                                var cnt = e.target.value.length;
                                                
                                                    e.target.value = cnt > 3 ? e.target.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):e.target.value
                                                
                                            }
                                        }
                                    ></Form.Control>
                                    <span class="unit1">$</span>

                                </Col>
                                <Col md={6} className="my-3 fixed_value">
                                    <Form.Label className="contact-form-label">Any valuable articles over $25k *</Form.Label>
                                    
                                    <select placeholder="Choose any one" className='contact-form-input select_tab1'    
                                        onChange = {     
                                            (e)=>setFormData({
                                                ...formData,
                                                articles: e.target.value
                                            })
                                        }
                                        required>
                                        <option value='' class='hide_text'>Choose any one</option>
                                        <option value='yes'>Yes</option>
                                        <option value='no'>No</option>
                                    </select>
                                    
                                </Col>
                            </Row>
                            <FormGroup>
                                <Form.Label className="contact-form-label">Address* </Form.Label>
                                <Form.Control as={Autocomplete} types={["address"]} componentRestrictions={{ country: "au" }}  type='text' placeholder="Enter address for property insurance" className='contact-form-input' required
                                    onBlur = {     
                                        (e)=>setFormData({
                                            ...formData,
                                            address: e.target.value
                                        })
                                    }
                                ></Form.Control>
                            </FormGroup>
                            <Row>
                                <Col md={6} className="my-3 fixed_value">
                                    <Form.Label className="contact-form-label">Contents value*</Form.Label>
                                    <Form.Control type='text' placeholder="" maxlength="8" className='contact-form-input' required
                                        onChange = {     
                                            (e)=>setFormData({
                                                ...formData,
                                                value: e.target.value
                                            })
                                        }
                                        onKeyPress= {
                                            (e)=>validate(e)
                                        }
                                    ></Form.Control>
                                     <span class="unit1">$</span>
                                </Col>
                                <Col md={6} className="my-3">
                                    <Form.Label className="contact-form-label">Current Insurer*</Form.Label>
                                    <Form.Control type='text' placeholder="Enter Current Insurer*" className='contact-form-input'
                                        onChange = {     
                                            (e)=>setFormData({
                                                ...formData,
                                                Insurer: e.target.value
                                            })
                                        }
                                        
                                    ></Form.Control>
                                </Col>
                            </Row>
                            <Form.Check className="agree-checkbox app-text" name='purchage-agree' label='I agree to terms and conditions' type='checkbox' id='agree' required></Form.Check>
                            <Row className="justify-content-center mx-0 px-0 row">
                              
                                    <Button  className="navigation_button app-text" style={{borderRadius:'1.5rem', width:'100%'}}>Go Back</Button>
                               
                                    <Button type="submit" className="navigation_button app-text" style={{borderRadius:'1.5rem', width:'100%'}} disabled={btnCheck}>Submit for quote</Button>
                              
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    )
}
