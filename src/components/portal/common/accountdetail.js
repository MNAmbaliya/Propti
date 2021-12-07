import React ,{ useEffect,useRef  } from 'react'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import axios from 'axios'

import CoverImage from '../../../assets/images/bg/bg/cover_image.svg'
import UploadImageIcon from '../../../assets/images/icons/upload_image_icon.svg'

import FakeAvatar1 from '../../../assets/images/avatars/fake_avatar1.svg'
import FakeAvatar2 from '../../../assets/images/avatars/fake_avatar2.svg'
import FakeAvatar3 from '../../../assets/images/avatars/fake_avatar3.svg'
import FakeAvatar4 from '../../../assets/images/avatars/fake_avatar4.svg'
import FakeAvatar5 from '../../../assets/images/avatars/fake_avatar5.svg'
import FakeAvatar6 from '../../../assets/images/avatars/fake_avatar6.svg'
import FakeAvatar7 from '../../../assets/images/avatars/fake_avatar7.svg'
import FakeAvatar8 from '../../../assets/images/avatars/fake_avatar8.svg'
import { Avatar } from '@material-ui/core'


function AccountDetail() {
    const [data, setData] =React.useState({
        action:'UpadateRegisterInfo',
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

    const [extraData, setextraData] =React.useState({
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

    const [resertStyle, setResertStyle] =React.useState("none");
    const [accountStyle, setAccountStyle] =React.useState("block");

    async function getWalls(){
        
        // const res = await axios.post(
        //     process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
        //     {
        //         action:'getUser',
        //         id:localStorage.getItem("userId")
        //     }
            
        // );
        // setData(res.data[0]);

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
    

    async function handleSubmit(e){
        e.preventDefault();
        
        const update = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:'UpadateRegisterInfo',
                fname:data.fname,
                lname:data.lname,
                number:data.number,
                email:data.email,
                company:data.company,
                abn:data.abn,
                address:data.address,
                city:data.city,
                state:data.state,
                postcode:data.postcode,
                avatar:AvatarChange != undefined || AvatarChange != null ? AvatarChange : data.avatar,
                registration_id:localStorage.getItem("userId"),
            }            
        );       
        const updateReg = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:'UpdateRegisterAvatar',
                avatar:AvatarChange != undefined || AvatarChange != null ? AvatarChange : data.avatar,
                id:localStorage.getItem("userId")
            }            
        );  
        // console.log(updateReg);
        window.location.reload();
    }

    // var AvatarChange;
    const [AvatarChange, setAvatarChange] =React.useState();
    async function changeAvatar(avatarName){
        setAvatarChange(avatarName);
        setData({
            ...data,
            avatar: avatarName
        })
    }


    // Upload images

    const inputFile = useRef(null) 

    const [profile, setProfile] = React.useState([]);
    async function clickOnUpload(){
        inputFile.current.click();
    }

    async function profileChange(event){
        setProfile(event.target.files[0]);
        
        const imageData  = new FormData();
        imageData   .append("file", event.target.files[0]);
        imageData   .append("fileName", 'profile_' );
        imageData   .append("action", 'uploadBlogImage' );
        const res = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            imageData   ,
            {
                "enctype": "multipart/form-data" 
            }
        )

        // const fileUrl = await uploadImage(profile, 'profile_'); 
        var url = process.env.REACT_APP_BACKEND_API_URL+ "/" + res.data.url + ".png";
        setData({
            ...data,
            avatar: url
        })
        setAvatarChange(url);
        
    }


    async function uploadImage(file,fileName){
        
    
        
    }
    




    /**
     * Call API when this page load
     */

    useEffect(
        ()=>{
            getWalls()
        }, []
    )


    // Reset a password code
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

        var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        var test = reg.test(password);
        if (test) {
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
        }else{
            seterr("Password Contain Capital ,Small Alphabet , Numbers and Special Symbols");
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
            // console.log('code');
            // console.log(code);
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

    async function resetpasswordfunction() {
        setAccountStyle("none");
        setResertStyle("block");
    }

    return (
        <>
            <div className="set-order-block" style={{display:accountStyle}}>
                <div className="mt-3 d-none d-md-block " style={{backgroundColor:'rgba(29, 131, 255, 0.9)', borderRadius:"10px 10px 0px 0px"}}>
                    <Image src={CoverImage} className="w-100"/>
                </div>            
                <div className="portal-choose-avatar">
                    <div className="d-flex align-items-end flex-wrap mb-3">
                        <div className="rounded-circle text-center upload-img-block" >
                            {/* <Image src={UploadImageIcon}/>
                            <p className="my-0 text-white upload-img-text ">Upload Image</p> */}
                            <Image className="avatarMainImage" src={data.avatar}
                                onClick={
                                    ()=>clickOnUpload()
                                }
                            />
                            <div className="preview">

                            </div>
                            <Form className="profileForm">
                                <input type='file' ref={inputFile} style={{display: 'none'}} name="ProfileImage" className="uploadFile"
                                    onChange={
                                        (e)=>profileChange(e)
                                    }
                                ></input>
                            </Form>
                        </div>
                        <div>
                            <Image src={FakeAvatar1} className="mx-2" onClick={
                                ()=>changeAvatar(FakeAvatar1)
                            }/>
                            <Image src={FakeAvatar2}  className="mx-2" onClick={
                                ()=>changeAvatar(FakeAvatar2)
                            } />
                            <Image src={FakeAvatar3}  className="mx-2" onClick={
                                ()=>changeAvatar(FakeAvatar3)
                            } />
                            <Image src={FakeAvatar4}  className="mx-2" onClick={
                                ()=>changeAvatar(FakeAvatar4)
                            } />
                            <Image src={FakeAvatar5}  className="mx-2" onClick={
                                ()=>changeAvatar(FakeAvatar5)
                            } />
                            <Image src={FakeAvatar6}  className="mx-2" onClick={
                                ()=>changeAvatar(FakeAvatar6)
                            } />
                            <Image src={FakeAvatar7}  className="mx-2" onClick={
                                ()=>changeAvatar(FakeAvatar7)
                            } />
                            <Image src={FakeAvatar8}  className="mx-2" onClick={
                                ()=>changeAvatar(FakeAvatar8)
                            } />
                        </div>
                    </div>
                    <div>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label className="aboutus-card-text ">First Name</Form.Label>
                                        <Form.Control className="aboutus-card-text portal-account-detail-input" type="text" placeholder="Enter your name here"
                                            value={data.fname}
                                            onChange = {     
                                                (e)=>setData({
                                                    ...data,
                                                    fname: e.target.value
                                                })
                                            }
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label className="aboutus-card-text ">Last Name</Form.Label>
                                        <Form.Control className="aboutus-card-text portal-account-detail-input" type="text" placeholder="Enter your name here"
                                            value={data.lname}
                                            onChange = {     
                                                (e)=>setData({
                                                    ...data,
                                                    lname: e.target.value
                                                })
                                            }
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label className="aboutus-card-text ">Phone Number</Form.Label>
                                        <Form.Control className="aboutus-card-text portal-account-detail-input" type="text" placeholder="Enter Phone Number"
                                            value={data.number}
                                            onChange = {     
                                                (e)=>setData({
                                                    ...data,
                                                    number: e.target.value
                                                })
                                            }
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label className="aboutus-card-text ">Emial ID</Form.Label>
                                        <Form.Control className="aboutus-card-text portal-account-detail-input" type="text" placeholder="Enter Email ID"
                                            value={data.email}
                                            onChange = {     
                                                (e)=>setData({
                                                    ...data,
                                                    email: e.target.value
                                                })
                                            }
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label className="aboutus-card-text ">Company</Form.Label>
                                        <Form.Control className="aboutus-card-text portal-account-detail-input" type="text" placeholder="Enter Company Name"
                                            value={data.company}
                                            onChange = {     
                                                (e)=>setData({
                                                    ...data,
                                                    company: e.target.value
                                                })
                                            }
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label className="aboutus-card-text ">ABN</Form.Label>
                                        <Form.Control className="aboutus-card-text" type="text" placeholder="Enter ABN Number"
                                            value={data.abn}
                                            onChange = {     
                                                (e)=>setData({
                                                    ...data,
                                                    abn: e.target.value
                                                })
                                            }
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label className="aboutus-card-text ">Address</Form.Label>
                                        <Form.Control className="aboutus-card-text portal-account-detail-input" type="text" placeholder="Amet minim mollit non deserunt ullamco"
                                            value={data.address}
                                            onChange = {     
                                                (e)=>setData({
                                                    ...data,
                                                    address: e.target.value
                                                })
                                            }
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label className="aboutus-card-text ">City</Form.Label>
                                        <Form.Control className="aboutus-card-text portal-account-detail-input" type="text" placeholder="Enter Your City"
                                            value={data.city}
                                            onChange = {     
                                                (e)=>setData({
                                                    ...data,
                                                    city: e.target.value
                                                })
                                            }
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label className="aboutus-card-text ">State</Form.Label>
                                        <Form.Control className="aboutus-card-text portal-account-detail-input" type="text" placeholder="Enter Your State"
                                            value={data.state}
                                            onChange = {     
                                                (e)=>setData({
                                                    ...data,
                                                    state: e.target.value
                                                })
                                            }
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label className="aboutus-card-text ">Post Code</Form.Label>
                                        <Form.Control className="aboutus-card-text portal-account-detail-input" type="text" placeholder="Enter your ZIP Code"
                                            value={data.postcode}
                                            onChange = {     
                                                (e)=>setData({
                                                    ...data,
                                                    postcode: e.target.value
                                                })
                                            }
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="text-center portal-details-btn">
                                <Button onClick={()=>resetpasswordfunction()} className="mx-3 portal-account-detail-button">Change Password</Button>
                                <Button type="submit" className="mx-3 portal-account-detail-button">Update Profile</Button>
                                <Button className="mx-3 portal-account-detail-button ">Clear All</Button>
                            </div>
                        </Form>
                    </div>
                </div>            
            </div>


            {/* Reset password */}
            <div className="set-order-block" style={{display:resertStyle}}>
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
        </>

        
    )
}

export default AccountDetail
