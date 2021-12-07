import React from 'react'
import { Col, Form, FormGroup, Image, Row, Button} from 'react-bootstrap'
import axios from 'axios'
import GoToBottom from '../../../views/GoToContact'
// import reasources
import '../../../assets/css/contact.css';
import ContactImage from '../../../assets/images/svg/contact.svg';
import { useLocation } from 'react-router-dom';
function Contact() {
    const all_date = useLocation();
   

    
    const [displayName, setdisplayName] = React.useState("dnone");
    const [success, setsuccess] = React.useState("dnone");
    var gotocontact = "";
    if(all_date.state != undefined){
        if(all_date.state.scroll != undefined){
            if(all_date.state.scroll == "bottom"){
                console.log("test");
               
                gotocontact = <GoToBottom />;
                all_date.state.scroll = "complete";
                // window.scrollTo(0,document.body.scrollHeight - 1200);
            }
        }
    }

    
    const [formData, setFormData] = React.useState({
        name:"",
        mobile:"",
        email:"",
        type:"",
        message:""
    })

    async function handleSubmit(e){
        e.preventDefault();
        setdisplayName("dblock");
        setsuccess("dnone");
        const res = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:"contact_mail",
                name:formData.name,
                email:formData.email,
                mobile:formData.mobile,
                message:formData.message
            }
        )
        var data = {
            name:"",
            mobile:"",
            email:"",
            type:"",
            message:""
        };
        setsuccess("dblock");
        setFormData(data);
        setdisplayName("dnone");
        
    }

    return (
        <div className="contact-root" id="contact_part">
            <div className='d-flex justify-content-between align-items-center'>
                <p className='home-section-title'>Contact Us</p>
            </div>
            <Row>
                {gotocontact}
                <Col md={6} className="mt-5">
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Form.Label className="contact-form-label">Full Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Your Name Here" className='contact-form-input' required
                                onChange = {     
                                    (e)=>setFormData({
                                        ...formData,
                                        name: e.target.value
                                    })
                                }
                                value={formData.name}
                            />
                        </FormGroup>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Form.Label className="contact-form-label">Mobile Number</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Mobile Number Here" className='contact-form-input' required
                                         onChange = {     
                                            (e)=>setFormData({
                                                ...formData,
                                                mobile: e.target.value
                                            })
                                        }
                                        value={formData.mobile}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>                                    
                                    <Form.Label className="contact-form-label">E-Mail ID</Form.Label>
                                    <Form.Control type="email" placeholder="Enter Your E-Mail ID Here" className='contact-form-input' required 
                                        onChange = {     
                                            (e)=>setFormData({
                                                ...formData,
                                                email: e.target.value
                                            })
                                        }
                                        value={formData.email}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>                                    
                            <Form.Label className="contact-form-label">Type</Form.Label>

                            <select placeholder="Choose any one" className='contact-form-input select_tab'    
                                onChange = {     
                                    (e)=>setFormData({
                                        ...formData,
                                        type: e.target.value
                                    })
                                    
                                } 
                                value={formData.type}      
                            required>
                                <option value='' class='hide_text'>Choose any one</option>
                                <option value='Client'>Client</option>
                                <option value='Agent'>Agent</option>
                                <option value='Reporter'>Reporter</option>
                            </select>
                        </FormGroup>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label className="contact-form-label">Message</Form.Label>
                            <Form.Control as="textarea" rows={5} className='contact-form-text-input' placeholder="Message" required
                                onChange = {     
                                    (e)=>setFormData({
                                        ...formData,
                                        message: e.target.value
                                    })
                                }
                                value={formData.message}
                            />
                        </Form.Group>
                        <div className="psoload" id={displayName}>
                            {/* <div className="straight"></div> */}
                            <div className="curve"></div>
                            <div className="center"></div>
                            {/* <div className="inner"></div> */}
                        </div>
                        <div className="submit_data">
                            <Button variant="primary" type="submit"  className="contact-form-submit">
                                Submit
                            </Button>
                            <div className="main-container" id={success}>
                                {/* <div className="check-container">
                                    <div className="check-background">
                                        <svg viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 25L27.3077 44L58.5 7" stroke="white" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                   
                                </div> */}
                                <p className="thank-you">Thank you for contacting us.</p>
                            </div>
                        </div>

                    </Form>
                </Col>
                <Col md={6}>
                    <Image src={ContactImage} className="w-100 set_contact_img"></Image>
                </Col>
            </Row>
        </div>
    )
}

export default Contact
