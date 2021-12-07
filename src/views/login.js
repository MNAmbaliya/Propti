import React, {useEffect} from 'react';
import { Container, Form, Image, Button, InputGroup} from 'react-bootstrap';
import {Link, useHistory} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { signin } from '../app/api/auth/actions'


import Header from '../components/header';
import Footer from '../components/footer';
import BgPattern3 from '../assets/images/bg/pattern/footer_bg_pattern.svg';
import EmailIcon from '../assets/images/icons/email_icon.svg';
import PasswordIcon from '../assets/images/icons/password_icon.svg';
import HidePasswordIcon from '../assets/images/icons/hide_password_icon.svg';
import ShowPasswordIcon from '../assets/images/icons/show_password_icon.svg';
import '../assets/css/login.css'


function Login() {  

    /**
     * State variable for password hide show 
     */
    const[passHideShow, setPassHideShow] = React.useState(false);
    /**
     * Configure redux
     */
    
    const user = useSelector((state) => state.auth.user);
    const status = useSelector((state) => state.auth.status);
    const dispatch = useDispatch();

    
    /**
     * Declaration State variable for form data
     */
    const [formData, setFormData] = React.useState({
        email:"",
        password:"",
        action:"login"
    })
    /**
     * When the user click the login, function will be lunch
     * @param {} e 
     */
    const [err, setErr] = React.useState("");
    function handleSubmit(e){
        e.preventDefault();        
        dispatch( 
            signin
            (
                formData  
            )
        )
        
        if(status != 2){            
            if(status == 3){
                setErr("Invaild Email or Password!")
            }
        }else{
            setErr("Please Activate your account")
        }
        
        
    }
    /**
     * 
     */
    const setEmailData = (e) => {
        setFormData({
            ...formData,
            email: e.target.value
        })
    }
    const setPassData = (e) => {
        setFormData({
            ...formData,
            password: e.target.value
        })
    }
    const setHideShow = () =>{
        setPassHideShow(!passHideShow);
    }
    /**
     * Redirect to portal  when user logged in...
     */
    const histoy = useHistory();
    useEffect(
        ()=>{
            const tokens = JSON.parse(localStorage.getItem('tokens'));
            if(tokens != null){
                histoy.push('/');
            }
            window.scrollTo(0, 0);
        }, [user]
    )
    // Rendering view
    return (

        <div  className="d-flex flex-wrap login_page">
            <Image src={BgPattern3} className="w-100 login_bg"></Image>
            <Container>
                <Header/>
                <div className="text-center my-xl-5 my-md-3">
                    <p className="login-title">Login</p>
                </div>
            </Container>
            <Container className='d-flex justify-content-center my-3'>
                <Form className="login-form login_block" onSubmit = { handleSubmit }>
                    <p className = "text-danger app-text ">{err}</p>
                    <Form.Group controlId="formLoginEmail">
                        <InputGroup>
                            <InputGroup.Prepend className="px-3 login-input-prepend">
                                <Image className="ml-2" src={EmailIcon}/>
                            </InputGroup.Prepend>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email" 
                                name="email"  
                                className="login-text login-input" 
                                required
                                onChange = {setEmailData}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="formLoginPassword">
                        <InputGroup>
                            <InputGroup.Prepend className="px-3 login-input-prepend">
                                <Image className="ml-2 " src={PasswordIcon}/>
                            </InputGroup.Prepend>
                            <Form.Control 
                                type={passHideShow?"text":"password"} 
                                placeholder="Password"  
                                name="password" 
                                className="login-text login-input-medium" 
                                required
                                onChange = {setPassData}
                            />
                            <InputGroup.Prepend className="login-input">
                                <Image 
                                    onClick={setHideShow} 
                                    className="px-3 login-password-hide-show" 
                                    src={passHideShow?HidePasswordIcon:ShowPasswordIcon}
                                />
                            </InputGroup.Prepend>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="formLoginCheck" className="d-flex justify-content-between align-items-center mb-0">
                        <Form.Check type="checkbox" label="Remember Me" name="remember" className="login-text"/>
                        <Form.Text className='login-text'>Forgot Password?</Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formLoginSubmit" className='text-center pt-2'>                        
                        <Button variant="primary" type="submit" className="w-100 login-text login_button">
                            Submit
                        </Button>
                        <Form.Text className='login-text signup_ac'>Don’t Have an Account? <Link to='/signup' className="logo-link">Sign Up</Link></Form.Text>
                    </Form.Group>
                </Form>
            </Container>
            <Footer/>
        </div>
    )
}

export default Login

