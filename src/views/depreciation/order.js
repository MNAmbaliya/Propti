import React, { useEffect,useState, useRef } from 'react';

import { Button, Col, Container, Form, Image, FormGroup, Row } from 'react-bootstrap'
import Footer from '../../components/footer'
import Header from '../../components/header'
import { useHistory } from 'react-router-dom'
import PropertyImage from '../../assets/images/svg/property_image.jpg'
import Avatar from '../../assets/images/avatars/avatar3.svg'
import emailjs from 'emailjs-com';
import PurchaseBuilding from './purchase'
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import Cookies from 'universal-cookie';
import GetProperties from '../getProperties'

import GooglePlaceAutoComplete from '../../components/basic/googleAutoComplete';
import BgPattern1 from '../../assets/images/bg/pattern/hero_bg_pattern.svg';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Autocomplete from 'react-google-autocomplete';
import validator from 'validator'

var qs = require('qs');

export default function OrderBuilding() {
    const inputRef = useRef(null);
    const cookies = new Cookies();
    const all_date = useLocation();
    let tmp = 1;
    const [images, setImages] = React.useState('');
    const [allProperties, setAllProperties] = React.useState([]);
    
    const [myownproperties, setownproperties] = React.useState([]);
    var address = null;
    // const [address, setupcomingAddress] = React.useState(null);
    const [token, setToken] = React.useState("");
    var minm = 100000000000;
    var maxm = 999999999999;
    var code = Math.floor(Math.random() * (maxm - minm + 1)) + minm;

    const [btnCheck, setbtnCheck] = React.useState(true);
    const [reportDetail, setreportDetail] = React.useState('');
    const [searchReport, setSearchReport] = React.useState([]);
    const [found, setFound] = React.useState('');
    const [addressComponent, setAddressComponent] = React.useState([]);
    var addressComponent1 = [];


    
    
    
    
    const [searchProperty, setSearchProperty] = React.useState({
        address:address,
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
        setImages(<GetProperties
            address = {addpr}
            component = {data}
        />);
    }

    const [ search,setSearch ] = React.useState("block"); 
    const [ detail1,setDetail1 ] = React.useState("none"); 
    

    const [formData, setFormData] = React.useState({
        action:"purchase",
        name:"",
        address:"",
        email:"",
        mobile:"",
        purchase_price:"",
        purchase_date:"",
        settlement_date:"",
        manager_name:"",
        status:"",
        agree:""
    })

    const [emailError, setEmailError] = useState('')
    const [mobileError, setmobileError] = useState('')
    const [InputBox, setmyInputBox] = React.useState()
    // 

    async function mydetail1(){
    }

    async function mydetail2(){
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
        if( !regex.test(key)) {
            theEvent.returnValue = false;
            if(theEvent.preventDefault) theEvent.preventDefault();
        }
    }

    async function sendMail(){
        
        if(formData.name != "" && formData.address != "" && formData.email != "" && formData.mobile != "" && formData.purchase_price != "" && formData.purchase_date != "" && formData.settlement_date != "" && formData.manager_name != "" ){
            

                if(formData.agree == "" || formData.agree == false){
                    notify("Please accepted terms and conditions");
                }else{
    
                    var arry1 = formData.purchase_date.split("-");        
                    var date_frame = arry1[2] +"/"+ arry1[1] +"/"+ arry1[0];
    
                    var arry2 = formData.settlement_date.split("-");        
                    var date_frame1 = arry2[2] +"/"+ arry2[1] +"/"+ arry2[0];
    
                    const res = await axios.post(
                        process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
                        {
                            action:"depreciation_send_mail",
                            address:formData.address,
                            price:formData.purchase_price,
                            date:date_frame,
                            settlement_date:date_frame1,
                            manager_name:formData.manager_name,
                            name:formData.name,
                            email:formData.email,
                            mobile:formData.mobile,
                            code:code
                        }
                    )
                    const addDepreciation = await axios.post(
                        process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
                        {
                            action:"addDepreciation",
                            address:formData.address,
                            name:formData.name,
                            email:formData.email ,
                            number:formData.mobile,
                            price:formData.purchase_price,
                            purchaseDate:formData.purchase_date,
                            settlementDate: formData.settlement_date,
                            managerName:formData.manager_name,
                            code:code,
                        }
                    )
                    console.log(addDepreciation);
                    // var arry1 = formData.purchase_date.split("-");        
                    // var date_frame = arry1[2] +"/"+ arry1[1] +"/"+ arry1[0];
    
                    // var arry2 = formData.settlement_date.split("-");
                    // var date_frame2 = arry2[2] +"/"+ arry2[1] +"/"+ arry2[0];
                    
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
                            
                    
    
                            history.push(
                                {
                                    pathname:"../success",
                                    state:{
                                        order:'Depreciation Report', number:code, text:'A link confirming your order will be sent to you via email'
                                    }
                                }
                            );
                        // }, (error) => {
                            
                        // });
                }
    
            
        }else{
            notify("Please Fill All Fields")
        }
        
    }

    async function getToken(){
        if(cookies.get("tokens") == "" || cookies.get("tokens") == undefined || cookies.get("tokens") == null){
            localStorage.setItem("tokens1", '');
            if(localStorage.getItem('tokens1') == "" || localStorage.getItem('tokens1') == undefined || localStorage.getItem('tokens1') == null){
                var data = qs.stringify({
                    'client_id': 'client_4f363bc816d8d1a65e65e6cdbf032256',
                    'client_secret': 'secret_9c5900c75a8fb3bb5764280ed74a5120',
                    'scope': 'api_agencies_read api_listings_read api_properties_read',
                    'grant_type': 'client_credentials' 
                  });
                  var config = {
                    method: 'post',
                    url: 'https://auth.domain.com.au/v1/connect/token',
                    headers: { 
                      'grant_type': '', 
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data : data
                  };
                  
                  axios(config)
                  .then(function (response) {
                    
                    var responces = response.data;
                    setToken(responces.access_token);
                    cookies.set('tokens', responces.access_token, { path: '/' , maxAge:43200 });
                    
                    localStorage.setItem("tokens1", responces.access_token);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
            }
        }

       
    }


    async function getProperties(address,component){
       
        const report = await axios.post(
                
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:"getReport",
                address:address
            }
        );
        if(report.data.length != 0){
            setreportDetail('existing');
            setSearchReport(report.data);
        }else{
            setreportDetail('new');
        }


        var token = cookies.get("tokens");
        var getaddress = searchProperty.address != '' ? searchProperty.address : ''
        
        if( component[0].long_name != undefined){

            var myAddress = component[0].long_name + " " + component[1].long_name + " " + component[2].long_name + " " + component[3].long_name + " " + component[4].long_name + " " + component[5].long_name 
        }else{
            myAddress = searchProperty.address
        }

        var config = {
            method: 'get',
            // url: 'https://api.domain.com.au/v1/properties/_suggest?terms='+getaddress,
            url: 'https://api.domain.com.au/v1/properties/_suggest?terms='+myAddress,
            headers: { 
              'Authorization': 'Bearer '+token,               
            }
          };

        axios(config)
        .then(function (response) {

            if(response.data.length != 0){
                setAllProperties(response.data)
                
                setownproperties(response.data)
                
                var tmpval = 0;

                var street = response.data[0].addressComponents.streetName + " " + response.data[0].addressComponents.streetTypeLong;
                component.map((item)=>(
                    
                    item.types[0] == "street_number" ? response.data[0].addressComponents.streetNumber == item.long_name ? tmpval++ : console.log("no match") : null,

                    item.types[0] == "route" ? street == item.long_name ? tmpval++ : console.log("no match") : '',

                    item.types[0] == "locality" ? response.data[0].addressComponents.suburb == item.short_name ? tmpval++ : console.log("no match") : '',

                    item.types[0] == "administrative_area_level_1" ? response.data[0].addressComponents.state == item.short_name ? tmpval++ : console.log("no match") : '',

                    item.types[0] == "postal_code" ? response.data[0].addressComponents.postCode == item.long_name ? tmpval++ : console.log("no match") : ''

                ));
                if(tmpval == 5){
                    setAllProperties(response.data)
                    setownproperties(response.data)
                }else{
                    setAllProperties({tmp:'empty'})
                    setFound("new");
                }
                

            }else{
                setAllProperties({tmp:'empty'})
                setFound("new");
            }

            
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    

   
    // const history = useHistory();
    const [properties,setProperties] = React.useState([]);
    
    async function getImage(){
        var token = cookies.get("tokens");
        if(allProperties[0].id != undefined || allProperties[0].id != null || allProperties[0].id != ''){
            var config = {
                method: 'get',
                url: 'https://api.domain.com.au/v1/properties/'+allProperties[0].id,
                headers: { 
                'Authorization': 'Bearer '+token,               
                }
            };
            
            axios(config)
            .then(function (response) {
                setProperties(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
            tmp = 0;
        }
    }
    
    const history = useHistory();
    
    // console.log("properties");
    // console.log(properties);
    const onClickSearch = () => {
        // history.push("/depreciation/detail1");
        if(searchProperty.address != undefined){
            getProperties( searchProperty.address, addressComponent); 
            
        }
        setImages(<GetProperties
            address = {searchProperty}
            component = {addressComponent}
        />);

        setTimeout(function(){ 
            setSearch("none");
            setDetail1("block");
        }, 1200);

        
        window.scrollTo(0,0);   
        
    }

    const notify = (message) => toast(message);

    const validateEmail = (e) => {
        var email = e.target.value
      
        if (validator.isEmail(email)) {
            setEmailError('')
            setFormData({
                ...formData,
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
            setFormData({
                ...formData,
                mobile: e.target.value
            })
            setbtnCheck(false)
        } else {
            setmobileError('Invalid')
            setbtnCheck(true)
        }
    }

    useEffect(
        ()=>{

            setTimeout(() => {
                getToken();  
                window.scrollTo(0,0);   
            }, 1000);
            
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
                    setDetail1("block");
                }
            }  
            
            
        }, []
    )


    return (
        <div className="d-flex flex-wrap" style={{minHeight: "100vh"}}>
            <Image src={BgPattern1} className="position-absolute w-100" style={{zIndex:"-1"}}></Image>
            <Container>
                <Header/>
                {/* <Router>
                <Switch>
                    <Route exact path="/depreciation"> */}
                        <div className={"text-center set_report_title "} style={{ display:search,position:"relative"  }} >
                            <p className="app-title">Order Depreciation Report</p>
                            {/* <div className="px-md-5 set_report_search">
                                <GooglePlaceAutoComplete
                                    value={address}
                                    setSearchProperty = {setSearchProperty} 
                                    searchProperty = {searchProperty}
                                    onClickSearch = {onClickSearch}
                                    placeholder = "Enter the address you need a depreciation report for"
                                />
                            </div> */}
                            <Row >
                                <Col md={12}>
                                    <Form.Control as={Autocomplete} types={["address"]} componentRestrictions={{ country: "au" }} ref={inputRef} type='text' placeholder="Enter property address" value={address != "" ? address : ''} className='contact-form-input starta_search'
                                        
                                        onPlaceSelected={(place) => {
                                            setSearchProperty({
                                                ...searchProperty,
                                                address: place.formatted_address
                                            })
                                            setAddressComponent(place.address_components);
                                        }}
                                        // onChange={
                                        //     (e)=>{
                                        //         setSearchProperty({
                                        //             ...searchProperty,
                                        //             address: e.target.value
                                        //         })
                                        //         setAddressComponent(e.target.value);
                                        //     }
                                        // }
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
                </Switch>
                </Router> */}
                
                <div className="set_building_title px-3" style={{ display:detail1 }}>
                    {/* <Router>
                        <Switch>
                            <Route exact path="/depreciation/detail1"> */}
                                <p className="app-title align_center">Order Depreciation Report</p>
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
                                                        (e)=>setFormData({
                                                            ...formData,
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
                                                            (e)=>setFormData({
                                                                ...formData,
                                                                address: e.target.value
                                                            })
                                                        }
                                                    required></Form.Control>
                                                </Col>
                                                <Col md={6} className="my-3">
                                                    <Form.Label className="contact-form-label">E-Mail ID*</Form.Label>
                                                    <Form.Control type='text' placeholder="Enter Your E-Mail ID Here" className='contact-form-input'
                                                        onChange = { 
                                                            (e) => validateEmail(e)
                                                        }
                                                        
                                                    required></Form.Control>
                                                    <span className="err">{emailError}</span>
                                                </Col>
                                                <Col md={6} className="my-3">
                                                    <Form.Label className="contact-form-label">Contact Number*</Form.Label>
                                                    <Form.Control type='text' maxlength="13" placeholder="Enter your Contact Number" maxlength="10" className='contact-form-input' 
                                                        
                                                        onChange = { 
                                                            (e) => validateMobile(e)
                                                        }
                                                        onKeyPress= {
                                                            (e)=>validate(e)
                                                        }
                                                    required></Form.Control>
                                                     <span className="err">{mobileError}</span>
                                                </Col>
                                                <Col md={6} className="my-3 fixed_value">
                                                    <Form.Label className="contact-form-label">Purchase Price*</Form.Label>
                                                    <Form.Control type='text' maxlength="8" placeholder="" className='contact-form-input doller_price' 
                                                        onChange = {     
                                                            (e)=>setFormData({
                                                                ...formData,
                                                                purchase_price: e.target.value
                                                            })
                                                        }
                                                        onKeyPress= {
                                                            (e)=>validate(e)
                                                        }
                                                    required></Form.Control>
                                                    <span class="unit1">$</span>
                                                </Col>
                                                <Col md={6} className="my-3">
                                                    <Form.Label className="contact-form-label">Purchase date*</Form.Label>
                                                    <Form.Control type='date' max="2021-12-31" placeholder="Select Purchase Date" className='contact-form-input' 
                                                        onChange = {     
                                                            (e)=>setFormData({
                                                                ...formData,
                                                                purchase_date: e.target.value
                                                            })
                                                        }
                                                    required></Form.Control>
                                                </Col>
                                                <Col md={6} className="my-3">
                                                    <Form.Label className="contact-form-label">Settlement Date*</Form.Label>
                                                    <Form.Control type='date' max="2021-12-31" placeholder="elect Settlement Date" className='contact-form-input' 
                                                        onChange = {     
                                                            (e)=>setFormData({
                                                                ...formData,
                                                                settlement_date: e.target.value
                                                            })
                                                        }
                                                    required></Form.Control>
                                                </Col>
                                                <Col md={6} className="my-3">
                                                    <Form.Label className="contact-form-label">Property Manager Name*</Form.Label>
                                                    <Form.Control type='text' placeholder="Property Manager name here" className='contact-form-input'
                                                        onChange = {     
                                                            (e)=>setFormData({
                                                                ...formData,
                                                                manager_name: e.target.value
                                                            })
                                                        }
                                                    required></Form.Control>
                                                </Col>
                                            </Row>
                                            
                                            <Form.Check className="agree-checkbox app-text" name='purchage-agree' label='I agree to terms and conditions*' type='checkbox' id='agree'
                                                onChange = {     
                                                    (e)=>setFormData({
                                                        ...formData,
                                                        agree: e.target.checked
                                                    })
                                                }
                                            ></Form.Check>
                                            <Row className="justify-content-center my-4 row">
                                    
                                                    <Button className="navigation_button app-text" style={{borderRadius:'1.5rem', width:'100%', color:'#fff'}}>Go Back</Button>
                                    
                                                    <Button className="navigation_button app-text"  style={{borderRadius:'1.5rem', width:'100%', color:'#fff'}}
                                                        onClick = {     
                                                            ()=>sendMail()
                                                        }
                                                        disabled={btnCheck}  
                                                    >Order Now</Button>
                                    
                                            </Row>
                                        </Form>
                                    </Col>
                                </Row>
                            {/* </Route>
                            
                        </Switch>
                    </Router> */}
                </div>
                <ToastContainer toastClassName = "border border-grey" />
                
            </Container>
            <Footer/>
            {/* <div className="w-100 footer-bottom-line mt-5">

            </div> */}
        </div>
    )
}

