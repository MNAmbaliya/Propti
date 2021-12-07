import React ,{ useEffect,useRef  } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import axios from 'axios'
function ContactUs() {

    const [data, setData] =React.useState([]);
    const [msg, setMsg] =React.useState('');
    const [err, seterr] =React.useState('');

    async function getUserDetails(){
        
        const user = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:'GetRegisterInfo',
                id:localStorage.getItem("userId")
            }
            
        );

        if(user.data == ""){
            setData({
                fname:"",
                lname:"",
                number:"",
                email:"",
                company:"",
                abn:"",
                address:"",
                city:"",
                state:"",
                postcode:"",
                avatar:"",
                registration_id:"",
            });
        }else{
            setData(user.data[0]);
        }
        
    }
    

    useEffect(
        ()=>{
            getUserDetails()
        }, []
    )

    async function handleSubmit(e){

        seterr('');
        // accountContact
        e.preventDefault();
        const mail = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:"accountContact",
                name:data.name,
                email:data.email,
                mobile:data.mobile,
                abn:data.abn,
                agent:data.agent,
                msg:msg
            }
        );
        seterr(mail.data);
        setMsg('');
    }


    return (
        <div className="my-5">
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={7} className="mx-auto">
                        <Row>
                            <Col md={12}>
                                <Form.Group>
                                    <Form.Label className="aboutus-card-text ">Name*</Form.Label>
                                    <Form.Control type="text" className="contact-form-input" value={data!=''? data.fname + " " + data.lname : ''} placeholder="Enter Your Name Here"></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="aboutus-card-text ">E-Mail ID*</Form.Label>
                                    <Form.Control type="text" className="contact-form-input" value={data!=''? data.email : ''} placeholder="Enter Your E-Mail ID Here"></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="aboutus-card-text ">Mobile Number*</Form.Label>
                                    <Form.Control type="text" className="contact-form-input" value={data!=''? data.number : ''} placeholder="Enter Your Mobile Number Here"></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="aboutus-card-text ">ABN</Form.Label>
                                    <Form.Control type="text" className="contact-form-input" value={data!=''? data.abn : ''} placeholder="Enter ABN Here"></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="aboutus-card-text ">Currently Agency</Form.Label>
                                    <Form.Control type="text" className="contact-form-input" value={data!=''? data.company : ''} placeholder="Enter Agency Number Here"></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col md={12}>
                                <Form.Group>
                                    <Form.Label className="aboutus-card-text ">Message</Form.Label>
                                    <Form.Control as="textarea" rows={5} value={msg != '' ? msg :  (e)=>setMsg(e.target.value)} className="contact-form-text-input" 
                                        onChange={
                                            (e)=>setMsg(e.target.value)
                                        }
                                    placeholder="Enter Your Message Here"></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <span>{err}</span>
                        <div className="text-center">
                            <Button type="submit" className ="portal-account-detail-button my-2">Submit</Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default ContactUs
