import React, { useEffect,useState, useRef } from 'react';

import { Button, Col, Container, Form, Image, FormGroup, Row } from 'react-bootstrap'
import Footer from '../../components/footer'
import Header from '../../components/header'
import { useHistory } from 'react-router-dom'
import PropertyImage from '../../assets/images/svg/property_image.jpg'
import { ToastContainer, toast } from 'react-toastify';
import Avatar from '../../assets/images/avatars/avatar3.svg'
import emailjs from 'emailjs-com';
// import Email from 'https://smtpjs.com/v3/smtp.js';
import PurchaseBuilding from './purchase'
import { useLocation } from 'react-router-dom';

import GooglePlaceAutoComplete from '../../components/basic/googleAutoComplete';
import BgPattern1 from '../../assets/images/bg/pattern/hero_bg_pattern.svg';
import { Route, Switch, Link } from 'react-router-dom';
import axios from 'axios'
import GetProperties from '../getProperties'
import Autocomplete from 'react-google-autocomplete';
import validator from 'validator'

function OrderInspection() {
    const inputRef = useRef(null);
    const all_date = useLocation();
    var address = "";
    // const [address, setupcomingAddress] = React.useState(null);
    const [images, setImages] = React.useState('');
    var tmp = 1;
    const [addressComponent, setAddressComponent] = React.useState([]);
    var addressComponent1 = [];
    const [emailError, setEmailError] = useState('')
    const [btnCheck, setbtnCheck] = React.useState(true);
    const [mobileError, setmobileError] = useState('')
    
    
    const [searchProperty, setSearchProperty] = React.useState({
        address:address != "" ? address : '',
        method:"new",
        type:"valuation"
    })
    
    async function set_component(data,address){
        // setAddressComponent(data);
        // address = all_date.state.address;
        addressComponent1 = data   
        var addpr = {
            address:address,
            method:'new'
        }
        console.log("12")
        setImages(<GetProperties
            address = {addpr}
            component = {data}
        />);
    }
    // const validateEmail = (e) => {
    //     var email = e.target.value
      
    //     if (validator.isEmail(email)) {
    //         setEmailError('true')
    //         setdetail2({
    //             ...detail2,
    //             email: e.target.value
    //         })
    //     } else {
    //         setEmailError('false')
            
    //     }
    // }

    const validateEmail = (e) => {
        var email = e.target.value
      
        if (validator.isEmail(email)) {
            setEmailError('')
            setdetail2({
                ...detail2,
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
            setdetail2({
                ...detail2,
                mobile: e.target.value
            })
            setbtnCheck(false)
        } else {
            setmobileError('Invalid')
            setbtnCheck(true)
        }
    }
    
    
    const [ search,setSearch ] = React.useState("block"); 
    const [ detail1style,setDetail1Style ] = React.useState("none"); 
    const [ detail2style,setDetail2Style ] = React.useState("none"); 

    const [formData, setFormData] = React.useState({
        action:"purchase",
        bedrooms:"",
        bathrooms:""
    })
    const [detail2, setdetail2] = React.useState({
        action:"purchase",
        name:"",
        address:"",
        email:"",
        mobile:"",
        report:"",
        inspection:"",
        manager_name:"",
        manager_number:"",
        agree:""
    })
    
    const [item1, setitem1] = React.useState("");
    const [item2, setitem2] = React.useState("")
    const [item3, setitem3] = React.useState("")
    const [item4, setitem4] = React.useState("")

 

    const [InputBox, setmyInputBox] = React.useState()
    // 

    async function nextDetail(){

        if( formData.bedrooms != "" && formData.bathrooms != "" ){
            // history.push("/inspection/detail2");
            setDetail1Style("none");
            setDetail2Style("block");
             window.scrollTo(0,0);   
        }else{
            notify("Please Fill All Questions")
        }

        

    }

   

    async function setInputBox(status){
        if(status == 0){
            setmyInputBox();
        }else{
            
        }
       
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
        if( !regex.test(key)) 
        {
            theEvent.returnValue = false;
            if(theEvent.preventDefault) theEvent.preventDefault();
        }
    }

    const [itemname1, setitemname1] = React.useState("");

    // check box click
    async function handleInput(e){
        let item_name = e.target.id;
        let bed_number = parseInt(item_name.substr(0,1));
        let which_type = item_name.substr(item_name.length - 9).toLowerCase().replaceAll("_","");
        let flag = true;

        if(which_type == 'bedrooms'){
            setitem1(<Col md={6} className='my-3 inspection_font'>{ item_name.replaceAll('_',' ') }</Col>);
            setitemname1(item_name.replaceAll('_',' '));
        }else if(which_type == 'bathrooms'){
            
            if(itemname1 != ""){
                let tmp = itemname1 + " , " + item_name.replaceAll('_',' ')
                setitem1(<><Col md={6} className='my-3 inspection_font'>{ tmp }</Col><Col md={6} className='my-3 align_right inspection_font'>$400</Col></>);
            }

        }

    }

    async function sendMail(){
       
       
        
        if(detail2.name != "" && detail2.address != "" && detail2.email != "" && detail2.mobile != "" && detail2.report != "" && detail2.inspection != "" && detail2.manager_name != "" && detail2.manager_number != ""){

            if( detail2.agree == "" || detail2.agree == false ){
                notify("Please accepted terms and conditions");
            }else{

                var minm = 100000000000;
                var maxm = 999999999999;
                var code = Math.floor(Math.random() * (maxm - minm + 1)) + minm;


                var arry1 = detail2.inspection.split("-");        
                var date_frame = arry1[2] +"/"+ arry1[1] +"/"+ arry1[0];
                const res = await axios.post(
                    process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
                    {
                        action:"inspection_send_mail",
                        address:detail2.address,
                        bathrooms:formData.bathrooms.replaceAll("_"," "),
                        bedrooms:formData.bedrooms.replaceAll("_"," "),
                        report_type:detail2.report.replaceAll("_"," "),
                        date :date_frame,
                        name:detail2.name,
                        email:detail2.email,
                        mobile:detail2.mobile,
                        manager_name:detail2.manager_name,
                        manager_number:detail2.manager_number,
                        code:code
                    }
                )
                const addInspection = await axios.post(
                    process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
                    {
                        action:"addInspection",
                        address:detail2.address,
                        type:formData.bedrooms,
                        bathroom:formData.bathrooms ,
                        name:detail2.name,
                        email:detail2.email,
                        number:detail2.mobile,
                        reportType: detail2.report,
                        inspectionDate:detail2.inspection,
                        managerName:detail2.manager_name,
                        managerNumber:detail2.manager_number,
                        code:code,
                    }
                )
                history.push(
                    {
                        pathname:"../success",
                        state:{
                            order:'Building and pest Report',
                            number:code,
                            text:'A link confirming your order will be sent to you via email'
                        }
                    }
                );
            }
        }else{
            notify("Please Fill All Fields")
        }
        

        

        

    }



    useEffect(
        ()=>{
           
            window.scrollTo(0,0);   
            if(all_date.state == undefined){ 
            }else{
                if(tmp == 1){
                    tmp = 0;
                    setSearchProperty({
                        ...searchProperty,
                        address: all_date.state.address
                    })
                    set_component(all_date.state.component,all_date.state.address);
                    
                    setSearch("none");
                    setDetail1Style("block");
                }
            }  
        }, []
    )
    // const history = useHistory();

    const history = useHistory();

    const onClickSearch = () => {
        // history.push("/inspection/detail1");
        setImages(<GetProperties
            address = {searchProperty}
            component = {addressComponent}
        />);

        setTimeout(function(){ 
            setSearch("none");
            setDetail1Style("block");
        }, 1200);

        
        
    }
    const notify = (message) => toast(message);

    return (
        <div className="d-flex flex-wrap" style={{minHeight: "100vh"}}>
            <Image src={BgPattern1} className="position-absolute w-100" style={{zIndex:"-1"}}></Image>
            <Container>
                <Header/>
                {/* <Switch>
                    <Route exact path="/inspection"> */}
                        <div className="text-center set_report_title" style={{ display:search,position:"relative"  }}>
                            <p className="app-title">Order Building & Pest Inspection Report</p>
                            {/* <div className="px-md-5 set_report_search home_search position-relative">
                                <GooglePlaceAutoComplete
                                    value={address}
                                    setSearchProperty = {setSearchProperty} 
                                    searchProperty = {searchProperty}
                                    onClickSearch = {onClickSearch}
                                    placeholder = "Enter the address you need a order building and / or pest report for"
                                />
                            </div> */}
                            <Row >
                                <Col md={12}>
                                    <Form.Control as={Autocomplete} types={["address"]} componentRestrictions={{ country: "au" }} ref={inputRef} type='text' placeholder="Enter property address"  className='contact-form-input starta_search'
                                        
                                        onPlaceSelected={(place) => {
                                            setSearchProperty({
                                                ...searchProperty,
                                                address: place.formatted_address
                                            })
                                            setAddressComponent(place.address_components);
                                        }}
                                        onChange={
                                            (e)=>{
                                                setSearchProperty({
                                                    ...searchProperty,
                                                    address: e.target.value
                                                })
                                                setAddressComponent(e.target.value);
                                            }
                                        }
                                    required></Form.Control>
                                </Col>
                                <Button  className="app-text btn btn-outline-primary text-white search_button strata_search" style={{borderRadius:'1.5rem', width:'100%', color:'#fff'}}
                                    onClick={
                                        (e)=>onClickSearch()
                                    }
                                >Search</Button>
                            </Row>
                        </div>
                    {/* </Route>
                </Switch> */}
                <div className="set_building_title px-3">
                    {/* <Switch>
                        <Route exact path="/inspection/detail1"> */}
                            <div style={{ display:detail1style }}>
                                <p className="app-title align_center">Order Building & Pest Inspection Report</p>
                                <Row className='mt-5'>
                                    <Col md={4}>
                                        
                                        {images}
                                        
                                        <div className="text-center">
                                            <p className="strata-img-title">{ searchProperty.address }</p>
                                            <p className="strata-img-date px-3"> Price and estimated time will be sent to you via email once order is confirmed</p>
                                        </div>
                                        
                                    </Col>
                                    <Col md={8} className="set-build-form">
                                    {/* onSubmit={handleSubmit} */}
                                        <Form >
                                            
                                            
                                            <Row>
                                                <p className="build-form-title px-3 w-100">Please select your property type*</p>
                                                <Col md={6} className="my-3">
                                                    <Form.Check className="lable_color" label="My Property has 1-4 Bedrooms" type='radio' id="1-4_Bedrooms"  name="inspection-radiogroup-1"
                                                        onChange = {
                                                                    
                                                            (e)=>setFormData({
                                                                ...formData,
                                                                bedrooms: e.target.id
                                                            })
                                                        }
                                                        onClick = {
                                                            (e)=>handleInput(e)
                                                        }
                                                    />
                                                </Col>
                                                <Col md={6} className="my-3">
                                                    <Form.Check className="lable_color" label="My Property has 5 Bedrooms" type='radio' id="5_Bedrooms"  name="inspection-radiogroup-1"
                                                        onChange = {
                                                                    
                                                            (e)=>setFormData({
                                                                ...formData,
                                                                bedrooms: e.target.id
                                                            })
                                                        }
                                                        onClick = {
                                                            (e)=>handleInput(e)
                                                        }
                                                    />
                                                </Col>
                                                <Col md={6} className="my-3">
                                                    <Form.Check className="lable_color" label="My Property has 6 Bedrooms" type='radio' id="6_Bedrooms"  name="inspection-radiogroup-1"
                                                        onChange = {
                                                                    
                                                            (e)=>setFormData({
                                                                ...formData,
                                                                bedrooms: e.target.id
                                                            })
                                                        }
                                                        onClick = {
                                                            (e)=>handleInput(e)
                                                        }
                                                    />
                                                </Col>
                                                <Col md={6} className="my-3">
                                                    <Form.Check className="lable_color" label="My Property has more than 6 Bedrooms" type='radio' id="7_or_more_Bedrooms"  name="inspection-radiogroup-1"
                                                        onChange = {
                                                                    
                                                            (e)=>setFormData({
                                                                ...formData,
                                                                bedrooms: e.target.id
                                                            })
                                                        }
                                                        onClick = {
                                                            (e)=>handleInput(e)
                                                        }
                                                    />
                                                </Col>
                                            </Row>
                                            
                                            <p className="build-form-title w-100">How many Bathrooms*</p>
                                            <Row>
                                                
                                                <Col md={6} className="my-3">
                                                    <Form.Check className="lable_color" label="1-2 Bathrooms" type='radio' id="1-2_Bathrooms"  name="inspection-radiogroup-2"
                                                        onChange = {
                                                                    
                                                            (e)=>setFormData({
                                                                ...formData,
                                                                bathrooms: e.target.id
                                                            })
                                                        }
                                                        onClick = {
                                                            (e)=>handleInput(e)
                                                        }
                                                    />
                                                </Col>
                                                <Col md={6} className="my-3">
                                                    <Form.Check className="lable_color" label="3 Bathrooms" type='radio' id="3_Bathrooms"  name="inspection-radiogroup-2"
                                                        onChange = {
                                                                    
                                                            (e)=>setFormData({
                                                                ...formData,
                                                                bathrooms: e.target.id
                                                            })
                                                        }
                                                        onClick = {
                                                            (e)=>handleInput(e)
                                                        }
                                                    />
                                                </Col>
                                                <Col md={6} className="my-3">
                                                    <Form.Check className="lable_color" label="4 Bathrooms" type='radio' id="4_Bathrooms"  name="inspection-radiogroup-2"
                                                        onChange = {
                                                                    
                                                            (e)=>setFormData({
                                                                ...formData,
                                                                bathrooms: e.target.id
                                                            })
                                                        }
                                                        onClick = {
                                                            (e)=>handleInput(e)
                                                        }
                                                    />
                                                </Col>
                                                <Col md={6} className="my-3">
                                                    <Form.Check className="lable_color" label="5 Bathrooms" type='radio' id="5_Bathrooms"  name="inspection-radiogroup-2"
                                                        onChange = {
                                                                    
                                                            (e)=>setFormData({
                                                                ...formData,
                                                                bathrooms: e.target.id
                                                            })
                                                        }
                                                        onClick = {
                                                            (e)=>handleInput(e)
                                                        }
                                                    />
                                                </Col>
                                                <Col md={6} className="my-3">
                                                    <Form.Check className="lable_color" label="6 Bathrooms" type='radio' id="6_Bathrooms"  name="inspection-radiogroup-2"
                                                        onChange = {
                                                            (e)=>setFormData({
                                                                ...formData,
                                                                bathrooms: e.target.id
                                                            })
                                                        }
                                                        onClick = {
                                                            (e)=>handleInput(e)
                                                        }
                                                    />  
                                                </Col>
                                                
                                            </Row>
                                            {/* <Row>
                                                <Col md={6} className="my-3">
                                                    <p className="app-title">Items</p>
                                                </Col>
                                                <Col md={6} className="my-3 align_right">
                                                    <p className="app-title">price</p>
                                                </Col>
                                                { item1 }
                                            </Row> */}
                                        
                                            <Row className="navigations my-5">
                                                    <Button className="app-text navigation_button" style={{borderRadius:'1.5rem', width:'100%'}}
                                                    onClick = {     
                                                        ()=> {
                                                            setSearch("block");
                                                            setDetail1Style("none");
                                                        }
                                                    }
                                                    >Go Back</Button>
                                                    <Button className="app-text navigation_button"  style={{borderRadius:'1.5rem', width:'100%'}}
                                                        onClick = {     
                                                            ()=>nextDetail()
                                                        }
                                                    >Next</Button>
                                                
                                            </Row>
                                        </Form>
                                    </Col>
                                </Row>
                            </div>
                        {/* </Route> */}
                        {/* <Route exact path="/inspection/detail2"> */}
                            <div style={{ display:detail2style }}>
                                <p className="app-title my-5 align_center">Order Building & Pest Inspection Report</p>
                                <Row className='mt-5'>
                                    <Col md={4}>
                                    {images}
                                        <div className="text-center">
                                            <p className="strata-img-title">{ searchProperty.address }</p>
                                            <p className="strata-img-date"> Price and estimated time will be sent to you via email once order is confirmed</p>
                                        </div>
                                        
                                    </Col>
                                    <Col md={8} className="strata-rep-form">
                                    {/* onSubmit={handleSubmit} */}
                                        <Form >
                                            <FormGroup>
                                                <Form.Label className="contact-form-label">Name*</Form.Label>
                                                <Form.Control type='text' placeholder="Enter Your Name Here" className='contact-form-input' 
                                                    onChange = {     
                                                        (e)=>setdetail2({
                                                            ...detail2,
                                                            name: e.target.value
                                                        })
                                                    }
                                                required></Form.Control>
                                            </FormGroup>
                                            <Row>
                                                <Col md={12} className="my-3">
                                                    <Form.Label className="contact-form-label">Address*</Form.Label>
                                                    <Form.Control type='text' placeholder="Enter Your Address Here" className='contact-form-input'
                                                        onChange = {     
                                                            (e)=>setdetail2({
                                                                ...detail2,
                                                                address: e.target.value
                                                            })
                                                        }
                                                    required></Form.Control>
                                                </Col>
                                                <Col md={6} className="my-3">
                                                    <Form.Label className="contact-form-label">E-Mail ID*</Form.Label>
                                                    <Form.Control type='email' placeholder="Enter Your E-Mail ID Here" className='contact-form-input'
                                                        onChange = {     
                                                            (e)=>validateEmail(e)
                                                        }
                                                    required></Form.Control>
                                                    <span className="err">{emailError}</span>
                                                </Col>
                                                <Col md={6} className="my-3">
                                                    <Form.Label className="contact-form-label">Contact Number*</Form.Label>
                                                    <Form.Control type='text' placeholder="Enter your Contact Number" maxlength="10" className='contact-form-input' 
                                                        
                                                        onChange = { 
                                                            (e) => validateMobile(e)
                                                        }
                                                        onKeyPress= {
                                                            (e)=>validate(e)
                                                    }
                                                    required></Form.Control>
                                                    <span className="err">{mobileError}</span>
                                                </Col>
                                                <Col md={6} className="my-3">
                                                    <Form.Label className="contact-form-label">Report Type*</Form.Label>
                                                    <select placeholder="Choose any one" className='contact-form-input select_tab' onChange = {     
                                                            (e)=>setdetail2({
                                                                ...detail2,
                                                                report: e.target.value
                                                            })
                                                        }
                                                    required>
                                                        <option value='' class='hide_text'>Choose any one</option>
                                                        <option value='pest_inspection'>Pest Inspection</option>
                                                        <option value='building_inspection'>Building Inspection</option>
                                                        <option value='both'>Both</option>
                                                    </select>
                                                </Col>
                                                <Col md={6} className="my-3">
                                                    <Form.Label className="contact-form-label">Inspection Date need By*</Form.Label>
                                                    <Form.Control type='date' max="2021-12-31"  placeholder="Select Date" className='contact-form-input' 
                                                        onChange = {     
                                                            (e)=>setdetail2({
                                                                ...detail2,
                                                                inspection: e.target.value
                                                            })
                                                        }
                                                    required></Form.Control>
                                                </Col>
                                                <Col md={6} className="my-3">
                                                    <Form.Label className="contact-form-label">Property Manager Name*</Form.Label>
                                                    <Form.Control type='text' placeholder="Property Manager name here" className='contact-form-input'
                                                        onChange = {     
                                                            (e)=>setdetail2({
                                                                ...detail2,
                                                                manager_name: e.target.value
                                                            })
                                                        }
                                                    required></Form.Control>
                                                </Col>
                                                <Col md={6} className="my-3">
                                                    <Form.Label className="contact-form-label">Property Manager Number*</Form.Label>
                                                    <Form.Control type='tel' placeholder="Enter Number" maxlength="13" className='contact-form-input' 
                                                        onChange = {     
                                                            (e)=>setdetail2({
                                                                ...detail2,
                                                                manager_number: e.target.value
                                                            })
                                                        }
                                                        onKeyPress= {
                                                            (e)=>validate(e)
                                                    }
                                                        pattern='^\d{10}$'
                                                    required></Form.Control>
                                                </Col>
                                                
                                            </Row>
                                            
                                            <Form.Check className=" agree-checkbox app-text" name='purchage-agree' label='I agree to terms and conditions*' type='checkbox' id='agree'
                                                onChange = {     
                                                    (e)=>setdetail2({
                                                        ...detail2,
                                                        agree: e.target.checked
                                                    })
                                                }
                                            ></Form.Check>
                                            <Row className="justify-content-center mx-0 px-0">
                                            
                                                <Button className="app-text navigation_button" style={{borderRadius:'1.5rem', width:'100%', color:'#fff'}}
                                                    onClick = {     
                                                        ()=> {
                                                            setDetail1Style("block");
                                                            setDetail2Style("none");
                                                        }
                                                    }
                                                >Go Back</Button>
                                                <Button className="app-text navigation_button"  style={{borderRadius:'1.5rem', width:'100%' , color:'#fff'}}
                                                    onClick = {     
                                                        ()=>sendMail()
                                                    }
                                                    disabled={btnCheck}  
                                                >Order Now</Button>
                                                
                                            </Row>
                                        </Form>
                                    </Col>
                                </Row>
                            </div>
                        {/* </Route>
                    </Switch> */}
                </div>
                <ToastContainer toastClassName = "border border-grey" />
               
            </Container>
            <Footer/>
            {/* <div className="w-100 footer-bottom-line mt-5">

            </div> */}
        </div>
    )
}

export default OrderInspection
