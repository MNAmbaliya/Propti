import React ,{ useEffect,useRef  } from 'react'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import axios from 'axios'
import CoverImage from '../../../assets/images/bg/bg/cover_image.svg'


export default function Password() {

    const [user, setUser] = React.useState([]);
    const [email, setEmail] = React.useState('');
    const [otp, setOtp] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [err, seterr] = React.useState('');

    
    
    const [emaildiv, setEmaildiv] = React.useState('block');
    const [otpdiv, setOtpdiv] = React.useState('none');
    const [passworddiv, setPassworddiv] = React.useState('none');

    async function handleSubmit(e){
        e.preventDefault();
        const updatePass = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:'updatePassword',                
                id:localStorage.getItem("userId"),
                password:password,
            }            
        )

        if(updatePass.data != 'Success'){
            seterr("something went wrong!!!");
        }else{
            seterr("");
            window.location.reload();
        }
    }


    // Send OTP
    async function sendOTP(){
        if(email != ""){
            var minm = 100000;
            var maxm = 999999;
            var code = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
            
            const sendCode = await axios.post(
                process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
                {
                    action:'sendOTP',
                    email:email,
                    code:code,
                }
                
            )

            localStorage.setItem("otpCode", code);
            setOtpdiv('block');
            setEmaildiv("none");
        }
    }

    //Check OTP
    async function checkOTP(){
        if(otp != ""){
            if(localStorage.getItem("otpCode") != ''){
                
                if(localStorage.getItem("otpCode") == otp){
                    seterr("");
                    localStorage.setItem("otpCode", '');
                    setOtpdiv('none');
                    setPassworddiv("block");
                }else{
                    seterr("OTP Does not match!!!");
                }
            }
        }
    }
    
    
    async function getUser(){
        const userd = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:'GetRegisterInfo',
                id:localStorage.getItem("userId")
            }
            
        );
        setUser(userd.data[0]);
        setEmail(userd.data[0].email)
    }

    useEffect(
        ()=>{
            getUser()
        }, []
    )

    return (
        <div className="set-order-block">
            <div className="mt-3 d-none d-md-block " style={{backgroundColor:'rgba(29, 131, 255, 0.9)', borderRadius:"10px 10px 0px 0px"}}>
                <Image src={CoverImage} className="w-100"/>
            </div>            
            <div className="portal-choose-avatar1">
                <div>
                    <Form onSubmit={handleSubmit}>
                        <div style={{display:emaildiv}}>
                            <Row>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label className="aboutus-card-text ">Email</Form.Label>
                                        <Form.Control className="aboutus-card-text portal-account-detail-input" type="text" value={user.email != '' ? user.email : email} placeholder="Enter your Email here"
                                            onChange={
                                                (e)=>setEmail(e.target.value)
                                            }
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="text-center portal-details-btn">
                                <Button className="mx-3 portal-account-detail-button"
                                    onClick={
                                        (e)=>sendOTP()
                                    }
                                >Next</Button>
                            </div>
                        </div>

                        {/* OTP */}
                        <div style={{display:otpdiv}}>
                            <Row>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label className="aboutus-card-text ">OTP</Form.Label>
                                        <Form.Control className="aboutus-card-text portal-account-detail-input" type="text" maxlength="6" placeholder="Enter OTP"
                                            onChange={
                                                (e)=>setOtp(e.target.value)
                                            }
                                        ></Form.Control>
                                        <span>{err}</span>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="text-center portal-details-btn">
                                <Button className="mx-3 portal-account-detail-button"
                                    onClick={
                                        (e)=>checkOTP()
                                    }
                                >Check</Button>
                            </div>
                        </div>


                        <div style={{display:passworddiv}}>
                            <Row>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label className="aboutus-card-text ">Enter new Password</Form.Label>
                                        <Form.Control className="aboutus-card-text portal-account-detail-input" type="text" maxlength="16" minlength="8" placeholder="Enter new password"
                                            onChange={
                                                (e)=>setPassword(e.target.value)
                                            }
                                        ></Form.Control>
                                        <span>{err}</span>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="text-center portal-details-btn">
                                <Button type="submit" className="mx-3 portal-account-detail-button">Update Password</Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>            
        </div>
    )
}
