import React, { useEffect,useState, useRef } from 'react';
import { Navbar,Button, Col, Container, Form, FormGroup, Image, Row } from 'react-bootstrap'
import Footer from '../components/footer'
import Header from '../components/header'

import BgPattern1 from '../assets/images/bg/pattern/hero_bg_pattern.svg';
import FooterBgPattern from '../assets/images/bg/pattern/footer_bg_pattern.svg';
import HeroImage from '../assets/images/svg/document.png';
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
function AuthorityDocument() {
    
    const [validated, setValidated] = useState(false);
    const inputRef = useRef(null);


    const [formData, setFormData] = useState({
        date:"",
        address:"",
        company:"",
        managementAddr:"",
        plan:"",
        currentHome:"",
        currentHomeRep:"",
        intrestedParty:"",
        intrestedhome:""
    });
    console.log(formData);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        
        /**
         * Date
         */
        var today = new Date();           
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var month = months.at(today.getMonth());
        var date = today.getDate() + ' ' + month + ' ' + today.getFullYear();
        setFormData({
            ...formData,
            date:date
        });

        setValidated(true);

        let formAnswers = {
            "addressToInspect": form.elements[0].value,
            "strataManager": form.elements[1].value,
            "managementAddress": form.elements[2].value,
            "strataPlan": form.elements[3].value,
            "currentHomeowner": form.elements[4].value,
            "homeownerRepresentative": form.elements[5].value,
            "interestedParty": form.elements[6].value,
            "interestedRepresentative": form.elements[7].value}
        console.log(formAnswers);

        // const doc = new jsPDF();
        var doc = new jsPDF('p', 'pt', 'a4');

        // doc.setFont("Arial");
        // doc.setFontSize(11);
        // doc.line(20,25,180,25);
        // doc.text(["Propti Pty Ltd", "45 Denison Street", "BONDI JUNCTION, NSW, 2022"], 20, 40);
        // doc.text("To whom it may concern,", 20, 60);

        // doc.setFont("Arial","bold");
        // doc.text("Re:                   AUTHORITY FOR STRATA RECORD", 20, 80);
        // doc.text(`(${formAnswers.addressToInspect})`, 45, 88);
        // doc.text(`Strata plan: (${formAnswers.strataPlan})`, 20, 105);
        // doc.line(20, 110, 180, 110);

        // doc.setFont("Arial", "normal");
        // doc.text([`We/I, ${formAnswers.currentHomeowner}, the owners of the above property hereby authorise ${formAnswers.interestedParty}`,"or their representative to inspect the strata records for our property and obtain copies of such", "records as they may require."], 20, 125);
        // doc.text("Yours faithfully, ", 20, 155);

        // doc.line(20, 180, 180, 180);
        // doc.text(`${formAnswers.homeownerRepresentative}, acting on behalf of the owner of the property. Or ${formAnswers.currentHomeowner}.`, 20, 185);

        // doc.save(`Authority_For_Strata_Record-${new Date().toLocaleDateString('en-AU')}-${new Date().getHours()}_${new Date().getMinutes()}.pdf`);


        const content = document.getElementById("pdfFile");
        console.log(content);
        doc.html(content, {
            callback: function(doc) {
                console.log("in callback");
                doc.save("Authority Doc.pdf");
            }
        });

        

    };

    useEffect(
        ()=>{           
            window.scrollTo(0, 0);
        }, []
    )
    


    return (
        <div>
            <Image src={BgPattern1} className="position-absolute w-100" style={{ zIndex:"-1"}}></Image>
            <Container>
                <Header/>
                <div className="text-center set_page_title">
                    <p className="app-title my-5">Authority Document</p> 
                </div>
                <Row className='insurance-block'>
                    <Col md={4}>
                        <Image src={HeroImage} className="position-asbolute w-100 set_hero_bg"></Image>
                        <p className="hero-title text-center my-5">Authority document can be downloaded after filling out required details</p>
                    </Col>
                    <Col md={8} className="insurance-form">
                        <Form validated={validated} onSubmit={handleSubmit}>
                            <FormGroup>
                                <Form.Label className="contact-form-label">Address to Inspect*</Form.Label>
                                <Form.Control as={Autocomplete} types={["address"]} componentRestrictions={{ country: "au" }} ref={inputRef} type='text' placeholder="Enter address to inspect" className='contact-form-input' 
                                    onPlaceSelected={(place) => {
                                        setFormData({
                                            ...formData,
                                            address: place.formatted_address
                                        })
                                    }}
                                required></Form.Control>
                            </FormGroup>
                            <FormGroup>
                                <Form.Label className="contact-form-label">Strata Manager (Company Name)*</Form.Label>
                                <Form.Control type='text' placeholder="Strata management" className='contact-form-input'
                                    onChange={
                                        (e)=>{
                                            setFormData({
                                                ...formData,
                                                company: e.target.value
                                            })
                                        }
                                    }
                                required></Form.Control>
                            </FormGroup>
                            <Row>
                                <Col md={6} className="my-3">
                                    <Form.Label className="contact-form-label">Strata Management Address*</Form.Label>
                                    <Form.Control as={Autocomplete} types={["address"]} componentRestrictions={{ country: "au" }} ref={inputRef} type='text' placeholder="Enter property address" className='contact-form-input'
                                        onChange={
                                            (e)=>{
                                                setFormData({
                                                    ...formData,
                                                    managementAddr: e.target.value
                                                })
                                            }
                                        }
                                    required></Form.Control>
                                </Col>
                                <Col md={6} className="my-3">
                                    <Form.Label className="contact-form-label">Strata Plan(SP)*</Form.Label>
                                    <Form.Control type='number' placeholder="Enter SP Number" className='contact-form-input'
                                    onChange={
                                        (e)=>{
                                            setFormData({
                                                ...formData,
                                                plan: e.target.value
                                            })
                                        }
                                    }
                                    required></Form.Control>
                                </Col>
                                <Col md={6} className="my-3">
                                    <Form.Label className="contact-form-label">Current Homeowner*</Form.Label>
                                    <Form.Control type='text' placeholder="Current homeowner name" className='contact-form-input'
                                    onChange={
                                        (e)=>{
                                            setFormData({
                                                ...formData,
                                                currentHome: e.target.value
                                            })
                                        }
                                    }
                                    required></Form.Control>
                                </Col>
                                <Col md={6} className="my-3">
                                    <Form.Label className="contact-form-label">Current Homeowner Representative*</Form.Label>
                                    <Form.Control type='text' placeholder="Homeowner representative name" className='contact-form-input'
                                    onChange={
                                        (e)=>{
                                            setFormData({
                                                ...formData,
                                                currentHomeRep: e.target.value
                                            })
                                        }
                                    }
                                    required></Form.Control>
                                </Col>
                                <Col md={6} className="my-3">
                                    <Form.Label className="contact-form-label">Interested Party*</Form.Label>
                                    <Form.Control type='text' placeholder="Interested party name" className='contact-form-input'
                                    onChange={
                                        (e)=>{
                                            setFormData({
                                                ...formData,
                                                intrestedParty: e.target.value
                                            })
                                        }
                                    }
                                    required></Form.Control>
                                </Col>
                                <Col md={6} className="my-3">
                                    <Form.Label className="contact-form-label">Interested Homeowner Representative</Form.Label>
                                    <Form.Control type='text' placeholder="If applicable" className='contact-form-input'
                                    onChange={
                                        (e)=>{
                                            setFormData({
                                                ...formData,
                                                intrestedhome: e.target.value
                                            })
                                        }
                                    }
                                    ></Form.Control>
                                </Col>
                            </Row>
                            <Form.Check className="agree-checkbox app-text" name='purchage-agree' label='I agree to terms and conditions' type='checkbox' id='agree' required></Form.Check>
                            <Row className="justify-content-center mx-0 px-0">
                              
                                    <Button type="submit" className="navigation_button app-text" style={{borderRadius:'1.5rem', width:'100%'}}>Download</Button>
                               
                            </Row>
                        </Form>
                    </Col>
                </Row>
                
                <div style={{display:"none"}}>
                    <div id="pdfFile" style={{ width:"595px", position:"relative" }}>
                        <Image src={bg1} className="logo-image" style={{ position:"absolute", right:"14%", top:"5%" }} ></Image>
                        <Image src={bg2} className="logo-image" style={{ position:"absolute", bottom: "20%" }} ></Image>
                        <div style={{ paddingLeft:"20px", paddingRight:"20px" }}>
                            <div> 
                                <Navbar.Brand><Image src={Logo} className="logo-image"></Image></Navbar.Brand>
                                <Image src={Line} style={{
                                    width:" 68%",
                                    float: "right",
                                    padding: "36px 0 0 0"
                                }}></Image>
                            </div>
                            <div style={{ display:"block", justifyContent:"space-between", paddingTop:"40px" }}>
                                <p style={{ fontSize:"12px" }}>
                                    Propti Pty Ltd <br />
                                    45 Denison Street <br />
                                    BONDI JUNCTION, NSW, 2022 

                                </p>
                                <p style={{ fontSize:"12px" }}>
                                    To whom it may concern,
                                </p>
                                <p style={{ position: "relative", width: "26%",fontSize:"12px" }}>

                                    <span style={{ position: "absolute", width:" max-content", left: "0", bottom: "0"}} >
                                        {/* Date: {formData.date} */}
                                    </span>
                                </p>
                            </div>
                            <div style={{ textAlign:"left", paddingTop:"50px" }}>

                                <h1 style={{ fontSize:"20px", fontWeight:"bold", color:"#313131", wordSpacing:"5px" }} >Re:&nbsp;&nbsp; AUTHORITY FOR STRATA RECORD</h1>

                                <p style={{ fontSize:"14px"}} >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.address}</p>
                            </div>
                            <div style={{paddingTop:"30px"}} >
                                <h2 style={{ fontSize:"19px", fontWeight:"bold", color:"#1D83FF" }} >Strata Plan: {formData.plan}</h2>
                            </div>
                            <div className="drawLine" style={{ width: "100%", height: "1px", backgroundColor:"#616161" }} ></div>
                            <div style={{ color:"#313131", fontSize:"12px", fontWeight:"600", paddingTop:"16px" }}>
                                {/* <p>
                                    We/ I, <span style={{ color:"#1D83FF" }}>{formData.currentHome}</span> the owners of the above property hereby authorise <span style={{ color:"#1D83FF" }}>{formData.intrestedParty}</span> or their representative to inspect the strata records for our property and obtain copies of such records as they may require.
                                </p> */}
                                <p>
                                    We/ I, <span style={{ color:"#1D83FF" }}>{formData.currentHome}</span> the owners of the above property hereby authorise <span style={{ color:"#1D83FF" }}>{formData.intrestedParty}</span> or their representative to inspect the strata records for our property and obtain copies of such records as they may require.
                                </p>
                                {/* <p>
                                    Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. on deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                                </p> */}
                            </div>

                            <div style={{ textAlign:"left", paddingTop:"30px"}}>
                                <h5 style={{ fontWeight:"500", color:"#313131", fontSize:"14px", margin:"0" }} >Yours faithfully,</h5>
                                {/* <div style={{ textAlign:"right", marginTop:"18px" }} >
                                    <p style={{ fontWeight:"500", color:"#313131", fontSize:"16px", margin:"0"  }} >{formData.currentHome}</p>
                                    <p style={{ fontWeight:"400", color:"#313131", fontSize:"12px", margin:"0" }} >Property Owner</p>
                                </div> */}
                            </div>

                            <div className="drawLine" style={{ width: "100%", height: "1px", backgroundColor:"#616161",marginTop:"40px" }} ></div>
                            <div style={{}} >
                                <p style={{ fontSize:"12px", fontWeight:"bold" }}>
                                    {formData.currentHomeRep}, Acting on behalf of the owner of the property. Or {formData.intrestedhome}
                                </p>
                            </div>


                            <div style={{paddingTop:'24px'}}>
                                <div style={{ display:"flex" }} >
                                    <Image src={call} style={{ width:"19px", height:"19px" }}></Image>
                                    <p style={{ paddingLeft:"12px", fontSize:"11px" }} >(405) 555-0128</p>
                                </div>
                                <div style={{ display:"flex" }} >
                                    <Image src={mail} style={{ width:"23px", height:"19px" }}></Image>
                                    <p style={{ paddingLeft:"12px", fontSize:"11px" }} >abc@gmail.com</p>
                                </div>
                                <div style={{ display:"flex" }} >
                                    <Image src={site} style={{ width:"19px", height:"19px" }}></Image>
                                    <p style={{ paddingLeft:"12px", fontSize:"11px" }} >www.propti.au.com</p>
                                </div>
                                <div style={{ display:"flex" }} >
                                    <Image src={loaction} style={{ width:"14px", height:"18px", marginLeft:"2px" }}></Image>
                                    <p style={{ paddingLeft:"12px", fontSize:"11px" }} >6391 Elgin St. Celina, Delaware 10299</p>
                                </div>
                            </div>

                        
                        </div>
                        <div>
                            <Image src={bottom} style={{ width:"100%" }}></Image>
                        </div>
                    </div>
                </div>
                
            </Container>
                

            <Footer/>
        </div>
    );
}

export default AuthorityDocument
