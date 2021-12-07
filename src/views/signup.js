/* eslint-disable */
import React, { useEffect } from 'react'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import {Link, useHistory} from "react-router-dom";
import Autocomplete from 'react-google-autocomplete';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber,isPossiblePhoneNumber } from 'react-phone-number-input'

import '../assets/css/signup.css'
import Header from '../components/header'
import Footer from '../components/footer'
import BgPattern3 from '../assets/images/bg/pattern/footer_bg_pattern.svg'
import axios from 'axios';

function SignUp() {
    /**
     *  Configuration Redux
     */
    const history = useHistory();
    const [btnCheck, setbtnCheck] = React.useState(true);
    const [errName, seterr] = React.useState("");
    /**
     *  Declaration the form data to the state variable
     */
    const [formData, setFormData] = React.useState({
        action:"register",
        name:"",
        email:"",
        password:"",
        role:"real_estate_agent",
        mobile:"",
        abn:"",
        agency:"",
        address:"",
        isEmailVerified:"false"
    })
    /**
     *  Declaration state variable for err message
     */
    const [err, setErr] = React.useState("");
    const [errEmail, setErrEmail] = React.useState("");

    /**
     * input only number in ABN input box
     * @param {*} e 
     */

    const [anbPattern, setabnPattern] = React.useState(/^[0-9\b]+$/);
    const [abnErr, setabnErr] = React. useState('');

    const onChangeABN = (e) => {
        let abn = e.target.value;
        if(abn == "" || anbPattern.test(abn)){
            setFormData({
                ...formData,
                abn: abn
            })
            setabnErr("") 
        }
        else{
            setabnErr("Possible only number") 
        }
    }
    useEffect(
        ()=>{
            if(formData.abn !==""){
                axios.post(
                    process.env.REACT_APP_ABN_SERVICE_URL + "?guid="+process.env.REACT_APP_ABN_SERVICE_GUID+"&abn="+formData.abn
                ).then(async(res)=>{
                    const step1 = res.data.split('(');
                    const step2 = step1[1].split(')');
                    const jsonData = JSON.parse(step2[0]);
                    if(jsonData?.AbnStatus == "Active"){
                        setabnErr(jsonData.EntityName)
                    }
                    else(
                        setabnErr("Invalide ABN number")
                    )
                })
            }
            window.scrollTo(0, 0);
        },[formData.abn]
    )
    /**
     * When the user click the submit button, this function will be run
     * @param {*} e 
     */
    async function handleSubmit(e){
        const  api_url = "https://proptiapi.ignatiuslab.in/test_api.php";
        e.preventDefault();
        try{
            axios.post(
                process.env.REACT_APP_ABN_SERVICE_URL + "?guid="+process.env.REACT_APP_ABN_SERVICE_GUID+"&abn="+formData.abn
            ).then(async(res)=>{
                const step1 = res.data.split('(');
                const step2 = step1[1].split(')');
                const jsonData = JSON.parse(step2[0]);
                if(jsonData?.AbnStatus == "Active"){
                    setabnErr(jsonData.EntityName)
                    try{
                        axios.post(
                            api_url,
                            formData
                        ).then(
                            (res)=>(
                                axios.post(
                                    "https://proptiapi.ignatiuslab.in/test_api.php",
                                    {
                                        action:"registerInfo",
                                        fname:formData.name,
                                        lname:"",
                                        number:formData.mobile,
                                        email:formData.email,
                                        company:"",
                                        abn:formData.abn,
                                        address:formData.address,
                                        city:"",
                                        state:"",
                                        postcode:"",
                                        registration_id:res.data
                                    }
                                ).then(
                                    (res)=>{

                                        if(res.data != 'Failed to create'){
                                            axios.post(
                                                process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
                                                {
                                                    action:"active_ac",
                                                    email:formData.email,
                                                    name:formData.name,
                                                    id:res.data[0].maxID
                                                }
                                            ).then(
                                                (res1)=>{
                                                    history.push('/login')
                                                });
                                        }else{

                                        }
                                        
                                        
                                        
                                    //
                                    }
                                )
                            )
                            
                        )
                        // const report = await axios.post(
                
                        //     process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
                        //     {
                        //         action:"getReport",
                        //         address:address
                        //     }
                        // );
                        
                    } catch (error){
                        error.response.data.message !== ""? setErr(error.response.data.message):setErr("")
                    }
                }
                else{
                    setabnErr("Invalid ABN")   
                }
            }
         )
        }catch{(e)=>
            setabnErr("Invalid ABN", e)   
        }
    }

    /**
     * Save form data to the state variable.
     */
    const handleFormDataChange = async (e, elementID) => {
        
        if(elementID == "name"){
            const res = await axios.post(
                process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
                {
                    action:'getUserByName',
                    agent:e.target.value
                }            
            )
            if(res.data[0] == 'nodata'){
                setbtnCheck(false);
                seterr('');
                
            }else{
                setbtnCheck(true);
                seterr("User Name Already Exist!!!");
            }
        }

        if(elementID == "email"){
            const res = await axios.post(
                process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
                {
                    action:'getUserByEmail',
                    agent:e.target.value
                }            
            )
            if(res.data[0] == 'nodata'){
                setbtnCheck(false);
                setErrEmail('');
                
            }else{
                setbtnCheck(true);
                setErrEmail("Email Already Exist!!!");
            }
        }
        
        setFormData({
            ...formData,
            [elementID]: e.target.value
        })
    }

    /**
     * Redirect to portal when user logged in...
     */

    useEffect(
        ()=>{
            if(localStorage.getItem('tokens')!== null){
                history.push('/portal/reporter')
            }
        }, []
    )

    
    /**
     * Rendering view
     */
    return (
        <div>
            <Image src={BgPattern3} className="position-absolute w-100" style={{ marginTop:'100px', zIndex:'-1'}}></Image>
            <Container>
                <Header></Header>
                <div className="text-center my-xl-5 my-md-3">
                    <p className="login-title">Create Account</p>
                </div>
            </Container>
            <Container className="d-flex justify-content-center">
                <Form className='signup-form' onSubmit={handleSubmit}>
                    <Form.Group controlid="signUpName">
                        <Form.Label className='signup-label ml-2'>Full Name*</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder='Enter Your Name Here' 
                            className="login-text signup-input" 
                            name="name" 
                            required 
                            onChange={(e)=>handleFormDataChange(e, "name")}
                        />
                        <span style={{color:"red",paddingLeft:"20px"}}> {errName} </span>
                    </Form.Group>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlid="signUpEmail">
                                <Form.Label className='signup-label ml-2'>E-Mail ID*
                                    {
                                        err == "Email already taken"?
                                        <span className="ml-2 app-text text-danger">{err}</span>:""
                                    }
                                </Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder='Enter Your E-Mail ID Here' 
                                    className="login-text signup-input" 
                                    name="email" 
                                    style = {{border:err == "Email already taken"?"solid 1px red":"none"}}
                                    required 
                                    onChange={(e)=>handleFormDataChange(e, "email")}
                                />
                                <span style={{color:"red",paddingLeft:"20px"}}> {errEmail} </span>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlid="signUpMobile">
                                <Form.Label className='signup-label ml-2'>
                                    Mobile Number*
                                    <span className="ml-2 app-text text-danger">
                                        {
                                            formData.mobile !==""
                                            ?
                                                formData.mobile && isPossiblePhoneNumber(formData.mobile) ? formData.mobile && isValidPhoneNumber(formData.mobile) ? '' : 'Invalid Phone Number' : 'Impossible Phone Number'
                                            : ""
                                        }            
                                    </span>
                                </Form.Label>
                                 <PhoneInput
                                    international            
                                    placeholder="Enter phone number"
                                    countryCallingCodeEditable={false}
                                    defaultCountry="AU"
                                    value={formData.mobile}
                                    error={formData.mobile ? (isValidPhoneNumber(formData.mobile) ? undefined : 'Invalid phone number') : 'Phone number required'}
                                    onChange={(e)=>{
                                        setFormData({
                                            ...formData,
                                            mobile: e
                                        })
                                    }}
                                    required
                                />
                                
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlid="signUpName">
                        <Form.Label className='signup-label ml-2'>
                            Password*
                            {
                                err.includes('password')?<span className="ml-2 app-text text-danger">{err} </span>:""
                            }
                        </Form.Label>
                        <Form.Control 
                            type="password" 
                            style = {{border: err.includes('password')?"solid 1px red":"none"}}
                            placeholder='Enter Your Password Here' 
                            className="login-text signup-input" 
                            name="password" 
                            required 
                            onChange={(e)=>handleFormDataChange(e, "password")}
                        />
                    </Form.Group>                  
                    <Row className="my-5 ml-1 text-left ">
                        <Col md={3} className="px-0">
                            <Form.Check 
                                type="radio" 
                                inline 
                                id='inline-check-1' 
                                name="role" 
                                value="real_estate_agent" 
                                label="Real Estate Agent" 
                                className="signup-label"
                                onChange={(e)=>handleFormDataChange(e, "role")}
                                // checked={(formData.role == "real_estate_agent")}
                            />
                        </Col>
                        <Col md={3} className="px-0 signup-radio">
                            <Form.Check 
                                type="radio" 
                                inline 
                                id='inline-check-2' 
                                name="role" 
                                value="reporter" 
                                label="Strata Reporter" 
                                className="signup-label"
                                onChange={(e)=>handleFormDataChange(e, "role")}
                                // checked={(formData.role == "reporter")}
                            />
                        </Col>
                        <Col md={3} className="px-0 signup-radio">
                            <Form.Check 
                                type="radio" 
                                inline 
                                id='inline-check-3' 
                                name="role" 
                                value="buyers_agent" 
                                label="Buyers Agent" 
                                className="signup-label"
                                onChange={(e)=>handleFormDataChange(e, "role")}
                                // checked={(formData.role == "buyer_agent")}
                            />
                        </Col>
                        <Col md={3} className="px-0 signup-radio">
                            <Form.Check 
                                type="radio" 
                                inline 
                                id='inline-check-4' 
                                name="role" 
                                value="conveyancer" 
                                label="Conveyancer" 
                                className="signup-label"
                                onChange={(e)=>handleFormDataChange(e, "role")}
                                // checked={(formData.role == "conveyancer")}
                            />
                        </Col>
                    </Row>                                     
                    <Row>
                        <Col md={6}>
                            <Form.Group controlid="signUpABN">
                                <Form.Label className='signup-label ml-2'>
                                    ABN*
                                    <span className="ml-2 app-text text-danger">{abnErr}</span>
                                </Form.Label>
                                <Form.Control 
                                    type="text"
                                    value = {formData.abn}
                                    placeholder='Enter Your ABN Here' 
                                    name="abn" 
                                    className="login-text signup-input" 
                                    required 
                                    style = {{border:(abnErr =="Invalide ABN number")?"solid 1px red":"none"}}
                                    // onChange={(e)=>handleFormDataChange(e, "abn")}
                                    onChange = {onChangeABN}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlid="signUpAgency">
                                <Form.Label className='signup-label ml-2'>Agency*</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder='Enter Your Agency Name Here' 
                                    name="agency" 
                                    className="login-text signup-input"
                                    onChange={(e)=>handleFormDataChange(e, "agency")}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlid="signUpAddress">
                        <Form.Label className='signup-label ml-2'>Address*</Form.Label>
                        <Autocomplete
                            style={{
                                width: '100%',
                                padding: '15px',
                                borderRadius:'55px',
                                border:'none',
                                boxShadow:'5px 5px 15px rgb(67 127 236 / 10%)',
                                outline:'none',
                                background: '#FCFDFD',
                                fontFamily:'Poppins',
                                transition: "border-color .15s ease-in-out,box-shadow .15s ease-in-out"
                            }}
                            onPlaceSelected={(place) => {
                                setFormData({
                                    ...formData,
                                    address: place.formatted_address
                                })
                            }}
                            types={['address']}
                            componentRestrictions={{country: "au"}}
                            placeholder="Enter your address here"
                        />
                    </Form.Group>
                    <Form.Group className="text-center">
                        <Button type="submit" className="login-text login_button" disabled={btnCheck}  >Continue</Button>
                        <p className='login-text'>Already Have an Account? <Link to='/login' className="logo-link">Log in</Link></p>
                    </Form.Group>
                </Form>
            </Container>
            <Footer></Footer>
        </div>
    )
}

export default SignUp
