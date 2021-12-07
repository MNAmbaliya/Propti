import React, { useEffect } from 'react'
import { Button, Col, Container, Form, FormGroup, Image, Row,  } from 'react-bootstrap'
import Footer from '../components/footer'
import Header from '../components/header'
import { useLocation, useHistory } from 'react-router-dom';

import axios from 'axios'
import BgPattern1 from '../assets/images/bg/pattern/hero_bg_pattern.svg';
import PropertyImage from '../assets/images/svg/property_image.jpg'
import Avatar from '../assets/images/avatars/avatar3.svg'

function Payment() {
    
    const all_date = useLocation();
    const history = useHistory();
    console.log("all_date");
    console.log(all_date);
    const [formData, setFormData] = React.useState({
        action:"purchase",
        name:"",
        number:"",
        expire:"",
        cvv:"",
    })

    if(all_date.state == undefined){
        history.push({
            pathname: '/search/strata',            
        });
    }
    
    async function handleSubmit(e){
        e.preventDefault();
        
        var creatOrderData = {
            action:"creatOrder",
            address:all_date.state.detail.address,
            type:'strata',
            reporter:'test men',
            report:'test',
            agent:all_date.state.detail.name == 'other' ? all_date.state.detail.agentname : all_date.state.detail.name,
            agentemail:all_date.state.detail.agentemail,
            mobile:all_date.state.detail.mobile,
            email:all_date.state.detail.email,
            name:all_date.state.detail.firstName + " " + all_date.state.detail.lastName,
            file:all_date.state.image,
            forWhat:all_date.state.detail.status,
            recommendedAgent:all_date.state.detail.recommandedAgent,
            usingBName:all_date.state.detail.usingbuyerAgentName,
            usingBEmail:all_date.state.detail.usingbuyerAgentEmail,
            solicitorName:all_date.state.detail.usingSolicitorAgentName,
            solicitorEmail:all_date.state.detail.usingSolicitorAgentEmail,
            solicitorFound:all_date.state.detail.theSolicitoragentfound,
            trustedBroker:all_date.state.detail.trustedBroker,
            authorityLetter:all_date.state.letter,
            onbehalf:all_date.state.detail.onBehlaf,
            referenceID:all_date.state.number,
            agreed:'yes',
            paid:'yes',
            price:'250',
            status:'pending'
        }

        const res = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            creatOrderData
        )
       

        //mail send
        if(all_date.state.detail.theSolicitoragentfound == "yes"){
            const sendmail1 = await axios.post(
                process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
                {
                    action:"foundSolicitor",
                    address:all_date.state.detail.address,
                    agent:all_date.state.detail.name,
                    mobile:all_date.state.detail.mobile,
                    email:all_date.state.detail.email,
                    name:all_date.state.detail.name,
                    status:all_date.state.detail.status,
                }
            )
        }
        if(all_date.state.detail.trustedBroker == "yes"){
            const sendmail2 = await axios.post(
                process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
                {
                    action:"requestingBroker",
                    address:all_date.state.detail.address,
                    agent:all_date.state.detail.name,
                    mobile:all_date.state.detail.mobile,
                    email:all_date.state.detail.email,
                    name:all_date.state.detail.name,
                    status:all_date.state.detail.status,
                }
            )
        }


        
        var id = res.data;
        var today = new Date();
        const createCustomer = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:"CreateCustomerOrder",
                address:all_date.state.detail.address,
                agent:all_date.state.detail.name,
                name:all_date.state.detail.firstName + " " + all_date.state.detail.lastName,
                email:all_date.state.detail.email,
                mobile:all_date.state.detail.mobile,
                date:all_date.state.detail.inspectionDate != '' ? all_date.state.detail.inspectionDate : '',
                order_id:id,
                formated_address:all_date.state.formated_address,
                file:all_date.state.image,
                admin_approve:'false'
            }
        )
           
        


        // starta_send_mail
        const res1 = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:"starta_send_mail",
                address:all_date.state.detail.address,
                agent:all_date.state.detail.name,
                mobile:all_date.state.detail.mobile,
                email:all_date.state.detail.email,
                name:all_date.state.detail.name,
                status:all_date.state.detail.status,
                code:all_date.state.number
            }
        )

        if(all_date.state.report != ""){
            console.log("customer mail send");
            // CUSTOMER MAIL SEND
            const res1 = await axios.post(
                process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
                {
                    action:"order_approve",
                    address:all_date.state.detail.address,
                    email:all_date.state.detail.email,
                    name:all_date.state.detail.name,
                }
            )

            var email = "";
            all_date.state.agent.map((item)=>(
                all_date.state.detail.name == item.name ? email=item.email : ''
                ));
                // CUSTOMER MAIL SEND
                const aget_mail = await axios.post(
                    process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
                    {
                        action:"agent_notify",
                        address:all_date.state.detail.address,
                        email:email,
                        name:all_date.state.detail.name,
                    }
                )
                console.log("agent mail send");
        }

        // new agent send mail
        if(all_date.state.detail.agentemail != "" && all_date.state.detail.agentname != ""){
            const res1 = await axios.post(
                process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
                {
                    action:"new_agent",
                    name:all_date.state.detail.name,
                    email:all_date.state.detail.email,
                    address:all_date.state.detail.address,
                    agentname:all_date.state.detail.agentname,
                    agentemail:all_date.state.detail.agentemail,
                }
            )
        }


        // emailjs.send("service_2ejqknc","template_kc1pic6",{
                //     name:formData.name,
                //     address:formData.address,
                //     email:formData.email,
                //     mobile:formData.mobile,
                //     purchase_price: "$" + formData.purchase_price,
                //     purchase_date:date_frame,
                //     settlement_date:date_frame2,
                //     manager_name:formData.manager_name,
                // },"user_wWCNhCethmwLr19htdKio")
                //     .then((result)=>{
                //         console.log(result);
                history.push(
                    {
                        pathname:"../success",
                        state:{
                            order:'Strata Report', number:all_date.state.number,
                            text:'A link confirming your order will be sent to you via email'
                        }
                    }
                );
            // }, (error) => {
            //     console.log(error);
            // });

    }
    // Only digit apply code
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

    

    useEffect(
        async()=>{
            window.scrollTo(0,0);   
        }, []
    )

    return (
        <div>
            <Image src={BgPattern1} className="position-absolute w-100" style={{zIndex:"-1"}}></Image>
            <Container>
                <Header/>
                <div className="text-center set_page_title">
                    <p className="app-title">Order Report</p> 
                </div>
                <Row className='strata-Rep-section'>
                    <Col md={4}>
                        <Image src={all_date.state.image} style={{ borderRadius:'40px' }} className="w-100"></Image>
                        <div className="text-center">
                            <p className="strata-img-title">{all_date.state.address}</p>
                            <p className="strata-img-date">Estimated Inspection Date : {all_date.state.inspection}</p>
                        </div>
                        {
                            all_date.state.pvtAgent != undefined ?
                                <div className="d-flex justify-content-between px-md-2 align-items-center report-author-block">
                                    <div className="d-flex align-items-center">
                                        <Image src={all_date.state.pvtAgent.avatar != "" ?all_date.state.pvtAgent.avatar : Avatar} className="admin-avatar"></Image>
                                        <div className="ml-3 report-users">
                                            <p className="app-text my-0 text-dark">Reported By:</p>
                                            <p className="app-text my-0">{all_date.state == undefined ? '' :all_date.state.pvtAgent.name}</p>
                                        </div>
                                    </div>
                                    <p className="app-title text-primary my-0">$50</p>
                                </div>
                            :
                            ""

                        }
                    </Col>
                    <Col md={8}  className="strata-rep-form ">
                        <div className="text-center">
                            <p className="payment-title">Credit Card</p> 
                        </div>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Form.Label className="contact-form-label">Card Holder Name*</Form.Label>
                                <Form.Control type='text' placeholder="Enter Your Name Here" className='contact-form-input' required
                                
                                    onChange = {     
                                        (e)=>setFormData({
                                            ...formData,
                                            name: e.target.value
                                        })
                                    }
                                ></Form.Control>
                            </FormGroup>
                            <FormGroup>
                                <Form.Label className="contact-form-label">Card Number*</Form.Label>
                                <Form.Control type='text' placeholder="Enter Your Card Number Here" className='contact-form-input' required
                                    maxLength="16"
                                    minLength="16"
                                    onKeyPress= {
                                        (e)=>validate(e)
                                    }
                                    onChange = {     
                                        (e)=>setFormData({
                                            ...formData,
                                            number: e.target.value
                                        })
                                    }
                                ></Form.Control>
                            </FormGroup>
                            <Row>
                                <Col md={6}>
                                    <Form.Label className="contact-form-label">Expiration Date*</Form.Label>
                                    <Form.Control type='date' max="2021-12-31" placeholder="Enter card expiration date Here" className='contact-form-input' required
                                        onChange = {     
                                            (e)=>setFormData({
                                                ...formData,
                                                expire: e.target.value
                                            })
                                        }
                                    ></Form.Control>
                                    
                                </Col>
                                <Col md={6}>
                                    <Form.Label className="contact-form-label">CVV*</Form.Label>
                                    <Form.Control type='text' placeholder="Enter Your CVV Number Here" className='contact-form-input' required
                                        maxLength="3"
                                        minLength="3"
                                        onKeyPress= {
                                            (e)=>validate(e)
                                        }
                                        onChange = {     
                                            (e)=>setFormData({
                                                ...formData,
                                                cvv: e.target.value
                                            })
                                        }
                                    ></Form.Control>
                                </Col>
                            </Row>
                            <div className="my-5 text-center">
                                <Button className="navigation_button app-text" style={{borderRadius:'1.5rem', width:'100%'}}
                                    onClick = {     
                                    ()=> {
                                        
                                        history.push({
                                            pathname: './purchase',  
                                            state:{
                                                address: all_date.state.address,
                                                agent: undefined,
                                                formated_address: all_date.state.formated_address,
                                                image: all_date.state.image,
                                                inspection: all_date.state.inspection,
                                                method: all_date.state.method,
                                                number: all_date.state.number,
                                                report: all_date.state.report,
                                                report_by: all_date.state.report_by,
                                                typeOfReport: all_date.state.typeOfReport
                                            }            
                                        });
                                    }
                                }
                                >Go Back</Button>
                                <Button type="submit" className="app-text navigation_button"  style={{borderRadius:'1.5rem'}}>
                                    { all_date.state.typeOfReport == "noFound" ? 
                                        "Pay $50 to $295 Now" 
                                      : 
                                        all_date.state.typeOfReport == "moreNew" ?
                                            'Pay $295 Now'
                                        :
                                            'Pay $50 Now'
                                            
                                }  </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
                
            </Container>
            <Footer/>
        </div>
    )
}

export default Payment
