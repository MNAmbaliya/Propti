import React, { useEffect } from 'react'

import { Button, Col, Container, Form, Image, FormGroup, Row } from 'react-bootstrap'
import Footer from '../../components/footer'
import Header from '../../components/header'
import { useHistory } from 'react-router-dom'
import PropertyImage from '../../assets/images/svg/property_image.jpg'
import Avatar from '../../assets/images/avatars/avatar3.svg'
import emailjs from 'emailjs-com';


import GooglePlaceAutoComplete from '../../components/basic/googleAutoComplete';
import BgPattern1 from '../../assets/images/bg/pattern/hero_bg_pattern.svg';
import { Route, Switch, Link } from 'react-router-dom';



function PurchaseBuilding() {
    const [searchProperty, setSearchProperty] = React.useState({
        address:"",
        method:"new",
        type:"valuation"
    })

    const [detail1, setDetail1] = React.useState({
        Metro:"",
        Asset:"",
        other:"",
    });

    const [detail2, setDetail2] = React.useState({
        purpose:"",
        other:"",
        Estimate:"",
        Frame:"",
    });

    const [formData, setFormData] = React.useState({
        action:"purchase",
        name:"",
        email:"",
        mobile:"",
        firstName:"",
        lastName:"",
        status:"",
        agree:""
    })
    
    const [InputBox, setmyInputBox] = React.useState()
    // 

    async function mydetail1(){
        // console.log(detail1);
    }

    async function mydetail2(){
        // console.log(detail2);
    }

    async function setInputBox(status){
        console.log(status);
        if(status == 0){
            console.log(status);
            setmyInputBox();
        }else{
            console.log(status);
            
        }
       
    }

    async function sendMail(){

        // emailjs.send("service_2ejqknc","template_o3t8dbq",{
        //     address: "",
        //     asset: "detail1.Asset.replace("_", " ")",
        //     purpose: "detail2.purpose.replace("_", " ")",
        //     Estimated: "detail2.Estimate",
        //     Frame: "detail2.Frame",
        //     name: "formData.name",
        //     email: "formData.email",
        //     mobile: "formData.mobile",
        // },"user_wWCNhCethmwLr19htdKio")
        //     .then((result)=>{
        //         notify(result.text);
        //         history.push("./success");
        //     }, (error) => {
        //         notify(error.text);
        //     });

        

    }

    // const history = useHistory();

    const history = useHistory();

    const onClickSearch = () => {
        history.push("./pest-building/detail1");
        
    }


    return (
        <div>
            <Image src={BgPattern1} className="position-absolute w-100" style={{zIndex:"-1"}}></Image>
            <Container>
                <Header/>
                
                <div className="mx-5 px-5">
                    <Row className='mt-5'>
                        <Col md={4}>
                            <Image src={PropertyImage} className="w-100"></Image>
                            <div className="text-center">
                                <p className="wall-question-title ">TBA street, Sydney, News, 2000</p>
                                <p className="app-text">Date Inspected: 01/01/2020</p>
                            </div>
                            <div className="d-flex justify-content-between px-md-2 align-items-center">
                                <div className="d-flex align-items-center">
                                    <Image src={Avatar} className="admin-avatar"></Image>
                                    <div className="ml-3">
                                        <p className="app-text my-0">Reported By:</p>
                                        <p className="app-text my-0 text-dark">Adaham Smith</p>
                                    </div>
                                </div>
                                <p className="app-title text-primary my-0">$250</p>
                            </div>
                        </Col>
                        <Col md={8} className="px-md-5">
                        {/* onSubmit={handleSubmit} */}
                            <Form >
                                <FormGroup>
                                    <Form.Label className="contact-form-label">Agent Name*</Form.Label>
                                    <Form.Control type='text' placeholder="Enter Your Name Here" className='contact-form-input' 
                                        onChange = {     
                                            (e)=>setFormData({
                                                ...formData,
                                                name: e.target.value
                                            })
                                        }
                                    required></Form.Control>
                                </FormGroup>
                                <Row>
                                    <Col md={6} className="my-3">
                                        <Form.Label className="contact-form-label">E-Mail ID*</Form.Label>
                                        <Form.Control type='text' placeholder="Enter Your E-Mail ID Here" className='contact-form-input'
                                            onChange = {     
                                                (e)=>setFormData({
                                                    ...formData,
                                                    email: e.target.value
                                                })
                                            }
                                        required></Form.Control>
                                    </Col>
                                    <Col md={6} className="my-3">
                                        <Form.Label className="contact-form-label">Mobile Number*</Form.Label>
                                        <Form.Control type='text' placeholder="Enter Your Mobile Number Here" className='contact-form-input' 
                                            onChange = {     
                                                (e)=>setFormData({
                                                    ...formData,
                                                    mobile: e.target.value
                                                })
                                            }
                                        required></Form.Control>
                                    </Col>
                                    <Col md={6} className="my-3">
                                        <Form.Label className="contact-form-label">First Name*</Form.Label>
                                        <Form.Control type='text' placeholder="Enter Your E-Mail ID Here" className='contact-form-input' 
                                            onChange = {     
                                                (e)=>setFormData({
                                                    ...formData,
                                                    firstName: e.target.value
                                                })
                                            }
                                        required></Form.Control>
                                    </Col>
                                    <Col md={6} className="my-3">
                                        <Form.Label className="contact-form-label">Last Name*</Form.Label>
                                        <Form.Control type='text' placeholder="Enter Your Mobile Number Here" className='contact-form-input'
                                            onChange = {     
                                                (e)=>setFormData({
                                                    ...formData,
                                                    lastName: e.target.value
                                                })
                                            }
                                        required></Form.Control>
                                    </Col>
                                </Row>
                                <div className="d-flex justify-content-between  my-3">
                                    <Form.Check className="app-text" name='purchage-type' inline label='I am Renting' type='radio' id='Renting'
                                        onChange = {     
                                            (e)=>setFormData({
                                                ...formData,
                                                status: e.target.id
                                            })
                                        }
                                    ></Form.Check>
                                    <Form.Check className="app-text" name='purchage-type' inline label='I am Selling' type='radio' id='Selling'
                                        onChange = {     
                                            (e)=>setFormData({
                                                ...formData,
                                                status: e.target.id
                                            })
                                        }
                                    ></Form.Check>
                                    <Form.Check className="app-text" name='purchage-type' inline label='Neither Renting Nor Selling' type='radio' id='Neither_Renting_Nor_Selling'
                                        onChange = {     
                                            (e)=>setFormData({
                                                ...formData,
                                                status: e.target.id
                                            })
                                        }
                                    ></Form.Check>
                                </div>
                                <Form.Check className=" my-3 app-text" name='purchage-agree' label='I agree to terms and conditions' type='checkbox' id='agree'
                                    onChange = {     
                                        (e)=>setFormData({
                                            ...formData,
                                            agree: e.target.value
                                        })
                                    }
                                ></Form.Check>
                                <Row className="px-5 my-5">
                                    <Col md={6}>
                                        <Button className="app-text" style={{borderRadius:'1.5rem', width:'100%'}}>Go Back</Button>
                                    </Col>
                                    <Col md={6}>
                                        <Button className="app-text"  style={{borderRadius:'1.5rem', width:'100%'}}
                                            onClick = {     
                                                ()=>sendMail()
                                            }
                                        >Order Now</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </div>
                <Footer/>
            </Container>
            <div className="w-100 footer-bottom-line mt-5">

            </div>
        </div>
    )
}

export default PurchaseBuilding
