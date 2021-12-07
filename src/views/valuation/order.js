import React, { useEffect,useState, useRef } from 'react';

import { Button, Col, Container, Form, FormGroup, Image, Row } from 'react-bootstrap'
import Footer from '../../components/footer'
import Header from '../../components/header'
import { useHistory } from 'react-router-dom'
import PropertyImage from '../../assets/images/svg/property_image.jpg'
import Avatar from '../../assets/images/avatars/avatar3.svg'
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

import GooglePlaceAutoComplete from '../../components/basic/googleAutoComplete';
import BgPattern1 from '../../assets/images/bg/pattern/hero_bg_pattern.svg';
import { Route, Switch, Link } from 'react-router-dom';
import axios from 'axios'
import GetProperties from '../getProperties'
import Autocomplete from 'react-google-autocomplete';
import validator from 'validator'

function OrderValuation() {
    const inputRef = useRef(null);
    const [emailError, setEmailError] = useState('')
    const [btnCheck, setbtnCheck] = React.useState(true);
    const [mobileError, setmobileError] = useState('')
    const [ search,setSearch ] = React.useState("block"); 
    const [ detail1style,setDetail1Style ] = React.useState("none"); 
    const [ detail2style,setDetail2Style ] = React.useState("none"); 
    const [ detail3style,setDetail3Style ] = React.useState("none"); 
    const [images, setImages] = React.useState('');
    const [addressComponent, setAddressComponent] = React.useState([]);
    var address = null;
    var addressComponent1 = [];
    var tmp = 1;
    const all_date = useLocation();
    var address = "";

    // const validateEmail = (e) => {
    //     var email = e.target.value
      
    //     if (validator.isEmail(email)) {
    //         setEmailError('true')
    //         setFormData({
    //             ...formData,
    //             email: e.target.value
    //         })
    //     } else {
    //         setEmailError('false')
            
    //     }
    // }
   

    


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
        console.log(data)
        setImages(<GetProperties
            address = {addpr}
            component = {data}
        />);
    }

    const [detail1, setDetail1] = React.useState({
        Metro:"",
        Asset:"",
        other:"",
    });

    const [detail2, setDetail2] = React.useState({
        purpose:"",
        other:"",
        Estimate:"",
        Frame:"",
    })

    const [formData, setFormData] = React.useState({
        action:"purchase",
        name:"",
        email:"",
        mobile:"",
        firstName:"",
        lastName:"",
        status:"",
        agree:""
    })
    
    const [InputBox, setmyInputBox] = React.useState()
    // 

    async function mydetail1(){
        if(detail1.Metro != "" && detail1.Asset != ""){
            if(detail1.Asset == "Others"){
                if(detail1.other != ""){
                    // history.push("/valuation/detail2");
                    setDetail1Style("none");
                    setDetail2Style("block");
                    
                }else{
                    notify("Please Fill All Fields")
                }
            }else{
                // history.push("/valuation/detail2");
                setDetail1Style("none");
                setDetail2Style("block");
            }
        }else{
            notify("Please Fill All Fields")
        }
    }

    async function mydetail2(){
       
        if(detail2.Estimate != "" && detail2.Frame != "" && detail2.purpose != ""){
            if(detail2.purpose == "Others"){
                if(detail2.other != ""){
                    // history.push("/valuation/detail3");
                    setDetail2Style("none");
                    setDetail3Style("block");
                }else{
                    notify("Please Fill All Fields")
                }
            }else{
                // history.push("/valuation/detail3");
                setDetail2Style("none");
                setDetail3Style("block");
            }
        }else{
            notify("Please Fill All Fields")
        }

    }

    async function setInputBox(status){
        console.log(status);
        if(status == 0){
            console.log(status);
            setmyInputBox();
        }else{
            console.log(status);
            
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
        

        if(formData.name != "" && formData.email != "" && formData.mobile != "" && formData.firstName != "" && formData.lastName != "" ){
            if(formData.agree == true || formData.agree != ""){
                var arry1 = detail2.Frame.split("-");        
                var date_frame = arry1[2] +"/"+ arry1[1] +"/"+ arry1[0];

                
                var minm = 100000000000;
                var maxm = 999999999999;
                var code = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
               
                const res = await axios.post(
                    process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
                    {
                        action:"valuation_send_mail",
                        name:formData.name,
                        address:searchProperty.address,
                        email:formData.email,
                        mobile:formData.mobile,
                        asset:detail1.Asset,
                        purpose:detail2.purpose,
                        purchase_price: "$" + detail2.purchase_price,
                        frame:detail2.Frame,
                        code:code
                    }
                )

                const addValuation = await axios.post(
                    process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
                    {
                        action:"addValuation",
                        address:searchProperty.address,
                        valuationFor:detail1.Metro,
                        assetClass:detail1.Asset + ' ' + detail1.other ,
                        purpose:detail2.purpose + ' ' + detail2.other,
                        estimate:detail2.Estimate,
                        timeFrame:detail2.Frame,
                        comapnyName: formData.name,
                        fName:formData.firstName,
                        lName:formData.lastName,
                        email:formData.email,
                        number:formData.mobile,
                        code:code,
                    }
                )
                console.log(addValuation);
                    history.push(
                        {
                            pathname:"../success",
                            state:{
                                order:'Valuation Report',
                                number:code,
                                text:'A link confirming your order will be sent to you via email'
                            }
                        }
                    );
                // }, (error) => {
                //     console.log(error);
                // });

            }else{
                notify("Please accepted terms and conditions")
            }
        }else{
            notify("Please Fill All Fields")
        }

        
        

    }

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
        // history.push("./valuation/detail1");
        setImages(<GetProperties
            address = {searchProperty}
            component = {addressComponent}
        />);
        setSearch("none");
        setDetail1Style("block");
    }

    const notify = (message) => toast(message);

    

    return (
        <div className="d-flex flex-wrap" style={{minHeight: "100vh"}}>
            <Image src={BgPattern1} className="position-absolute w-100" style={{zIndex:"-1"}}></Image>
            <Container>
                <Header/>
                {/* <Switch>
                    <Route exact path="/valuation/"> */}
                        <div className="text-center set_report_title" style={{ display:search,position:"relative" }}>
                            <p className="app-title">Order Valuation</p>
                            {/* <div className="px-md-5 set_report_search">
                                <GooglePlaceAutoComplete
                                    value={address}
                                    setSearchProperty = {setSearchProperty} 
                                    searchProperty = {searchProperty}
                                    onClickSearch = {onClickSearch}
                                    placeholder = "Enter the address you need a valuation report for"
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
                        <Route exact path="/valuation/detail1"> */}
                            <div style={{ display:detail1style }}>
                                <p className="app-title align_center">Order Valuation</p>
                                <Form className="app-text set-build-form" onSubmit={mydetail1}>
                                    
                                    <Row>
                                        <Col md={6}>
                                            <Row>
                                                <Col xs={12} md={4}>
                                                    <Form.Check inline className="strata-redio" label="Metro" type='radio' id="Metro"  name="valuation-radiogroup-1"
                                                        onClick = {
                                                            (e)=>setDetail1({
                                                                ...detail1,
                                                                Metro: e.target.id
                                                            })
                                                        }
                                                    />
                                                </Col>
                                                <Col xs={12} md={4}>
                                                    <Form.Check inline className="strata-redio" label="Regional/Rural" type='radio' id="Regional"  name="valuation-radiogroup-1"
                                                        onClick = {
                                                            (e)=>setDetail1({
                                                                ...detail1,
                                                                Metro: e.target.id
                                                            })
                                                        }
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <p className="build-form-title py-3 pt-4">Asset Class</p>
                                    <Row className="my-2">
                                        <Col md={6}>
                                            <Row>
                                                <Col xs={12} md={4}>
                                                    <Form.Check inline className="strata-redio" label="Residential" type='radio' id="Residential"  name="valuation-radiogroup-2"
                                                        onChange = {
                                                            (e)=>setDetail1({
                                                                ...detail1,
                                                                Asset: e.target.id
                                                            })
                                                        }
                                                        onclick ={
                                                            ()=>setInputBox(0)
                                                        }
                                                    />
                                                </Col>
                                                <Col xs={12} md={4}>
                                                    <Form.Check inline className="strata-redio" label="Industrial" type='radio' id="Industrial"  name="valuation-radiogroup-2"
                                                    
                                                        onChange = {
                                                            (e)=>setDetail1({
                                                                ...detail1,
                                                                Asset: e.target.id
                                                            })
                                                        }
                                                        onclick ={
                                                            ()=>setInputBox(0)
                                                        }

                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="my-2 align-items-center">
                                        <Col md={4}>
                                            
                                            <Row>
                                                <Col xs={12} md={6}>
                                                    <Form.Check inline className="strata-redio" label="Commercial" type='radio' id="Commercial"  name="valuation-radiogroup-2"
                                                        onChange = {
                                                            (e)=>setDetail1({
                                                                ...detail1,
                                                                Asset: e.target.id
                                                            })
                                                        }
                                                        
                                                    />
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <Form.Check inline className="strata-redio" label="Others" type='radio' id="Others"  name="valuation-radiogroup-2"
                                                        onChange = {
                                                            
                                                            (e)=>setDetail1({
                                                                ...detail1,
                                                                Asset: e.target.id
                                                            })
                                                        }
                                                        

                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md={5}>
                                        <input type="text" className="border-0 shadow py-2 px-4 w-100 my-2" style={{borderRadius:'2rem', outline:'none'}} value = {detail1.other} onChange = { (e)=>setDetail1({ ...detail1, other: e.target.value }) }></input>
                                        </Col>
                                    </Row> 
                                    <div className="text-center next-btn-block">
                                        <Link onClick = {() =>{ 
                                            setSearch("block");
                                            setDetail1Style("none");
                                         }}><Button type="submit" className="px-5 py-2 next_button" style={{borderRadius:'2rem', color:'#fff'}}>Go Back</Button></Link>
                                        <Link onClick = {() =>{ mydetail1() }}><Button type="submit" className="px-5 py-2 next_button" style={{borderRadius:'2rem', color:'#fff'}}>Next</Button></Link>
                                    </div>                               
                                </Form>
                            </div>
                        {/* </Route> */}
                        {/* <Route path="/valuation/detail2"> */}
                            <div style={{ display:detail2style }}>
                                <p className="app-title align_center">Order Valuation</p>
                                <Form className="app-text set-valuation-form" onSubmit={setDetail2}>

                                    <p className="build-form-title py-3 mb-0">What is the purpose for you Valuation</p>
                                    <Row>
                                        
                                        <Col xl={4} md={12}>
                                            <Form.Check className="set-valu-radio" label="Family Law/Property Settlement" type='radio' id="Family_Law/Property_Settlement"  name="valuation-radiogroup-3"
                                                onChange = {
                                                            
                                                    (e)=>setDetail2({
                                                        ...detail2,
                                                        purpose: e.target.id
                                                    })
                                                }
                                            />
                                            <Form.Check className="set-valu-radio" label="Taxation (Stamp Duty / CGT)" type='radio' id="Taxation_(Stamp_Duty_/_CGT)"  name="valuation-radiogroup-3"
                                                onChange = {
                                                            
                                                    (e)=>setDetail2({
                                                        ...detail2,
                                                        purpose: e.target.id
                                                    })
                                                }
                                            />
                                            <Form.Check className="set-valu-radio pt-1" label="Pre Purchase Advise" type='radio' id="Pre_Purchase_Advise"  name="valuation-radiogroup-3"
                                                onChange = {
                                                            
                                                    (e)=>setDetail2({
                                                        ...detail2,
                                                        purpose: e.target.id
                                                    })
                                                }
                                            />
                                        </Col>
                                        <Col xl={6} md={12}>
                                            <Form.Check className="set-valu-radio" label="Mortage Security (First / Second)" type='radio' id="Mortage_Security_(First_/_Second)"  name="valuation-radiogroup-3"
                                                onChange = {
                                                            
                                                    (e)=>setDetail2({
                                                        ...detail2,
                                                        purpose: e.target.id
                                                    })
                                                }
                                            />
                                            <Form.Check className="set-valu-radio" label="Internal Advise / Audit" type='radio' id="Internal_Advise_/_Audit"  name="valuation-radiogroup-3"
                                                onChange = {     
                                                    (e)=>setDetail2({
                                                        ...detail2,
                                                        purpose: e.target.id
                                                    })
                                                }
                                            />
                                            <div className="set-valu-radio d-flex justify-content-between align-items-center">
                                                <Form.Check label="Others" type='radio' id="Others"  name="valuation-radiogroup-3"
                                                    onChange = {     
                                                        (e)=>setDetail2({
                                                            ...detail2,
                                                            purpose: e.target.id
                                                        })
                                                    }
                                                />
                                                <input type="text" className="border-0 shadow py-2 w-100 px-4 ml-md-5" style={{borderRadius:'2rem', outline:'none'}}
                                                    onChange = {     
                                                        (e)=>setDetail2({
                                                            ...detail2,
                                                            other: e.target.value
                                                        })
                                                    }
                                                ></input>
                                            </div>
                                        </Col>
                                        <Col xl={5} md={6} className="my-3 fixed_value">
                                            <p className="build-form-title py-3 mb-0">Valuation Estimate</p>
                                            <input type="text" maxlength="8" className="border-0 shadow py-2 w-100 px-4" style={{borderRadius:'2rem', outline:'none'}} placeholder=""
                                                onChange = {     
                                                    (e)=>setDetail2({
                                                        ...detail2,
                                                        Estimate: e.target.value
                                                    })
                                                }
                                                onKeyPress= {
                                                    (e)=>validate(e)
                                            }
                                            ></input>
                                            <span class="unit">$</span>
                                        </Col>
                                        <Col xl={5} md={6} className="my-3 ">
                                            <p className="build-form-title py-3 mb-0">Time Frame</p>
                                        
                                            <Form.Control type='date' max="2021-12-31" placeholder="Select Date" className=' border-0 shadow py-2 w-100 px-4 date_time' style={{borderRadius:'2rem', outline:'none'}}
                                                onChange = {     
                                                    (e)=>setDetail2({
                                                        ...detail2,
                                                        Frame: e.target.value
                                                    })
                                                }
                                            required></Form.Control>
                                            
                                        </Col>
                                    </Row>
                                    <div className="text-center my-5 pt-3">
                                        <Link
                                            
                                        ><Button 
                                        onClick = {() =>{ 
                                            setDetail2Style("none");
                                            setDetail1Style("block");
                                        }}
                                        className="px-5 py-2 next_button" style={{borderRadius:'2rem', color:'#fff'}}>Go Back</Button></Link>
                                        <Link
                                            onClick = {() =>{ mydetail2() }}
                                        ><Button className="px-5 py-2 next_button" style={{borderRadius:'2rem', color:'#fff'}}>Next</Button></Link>
                                    </div>
                                </Form>
                            </div>
                        {/* </Route> */}
                        {/* <Route path="/valuation/detail3"> */}
                            <div style={{ display:detail3style }}>
                                <p className="app-title align_center">Order Valuation</p>
                                <Form className="app-text " onSubmit={setDetail2}>
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
                                                    <Form.Label className="contact-form-label">Company Name*</Form.Label>
                                                    <Form.Control type='text' placeholder="Enter your company name here" className='contact-form-input' 
                                                        onChange = {     
                                                            (e)=>setFormData({
                                                                ...formData,
                                                                name: e.target.value
                                                            })
                                                        }
                                                    required></Form.Control>
                                                </FormGroup>
                                                
                                                <Row>
                                                    <Col md={6} className="my-3">
                                                        <Form.Label className="contact-form-label">First Name*</Form.Label>
                                                        <Form.Control type='text' placeholder="Enter Your E-Mail ID Here" className='contact-form-input' 
                                                            onChange = {     
                                                                (e)=>setFormData({
                                                                    ...formData,
                                                                    firstName: e.target.value
                                                                })
                                                            }
                                                        required></Form.Control>
                                                    </Col>
                                                    <Col md={6} className="my-3">
                                                        <Form.Label className="contact-form-label">Last Name*</Form.Label>
                                                        <Form.Control type='text' placeholder="Enter Your Mobile Number Here" maxlength="10" className='contact-form-input'
                                                            onChange = {     
                                                                (e)=>setFormData({
                                                                    ...formData,
                                                                    lastName: e.target.value
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
                                                        <Form.Label className="contact-form-label">Mobile Number*</Form.Label>
                                                        <Form.Control type='text' placeholder="Enter Your Mobile Number Here" maxlength="10" className='contact-form-input' 
                                                            onChange = { 
                                                                (e) => validateMobile(e)
                                                            }
                                                            onKeyPress= {
                                                                (e)=>validate(e)
                                                            }
                                                        required></Form.Control>
                                                        <span className="err">{mobileError}</span>
                                                    </Col>
                                                
                                                </Row>
                                            
                                                <Form.Check className="agree-checkbox my-3 app-text" name='purchage-agree' label='I agree to terms and conditions*' type='checkbox' id='agree'
                                                    onChange = {     
                                                        (e)=>setFormData({
                                                            ...formData,
                                                            agree: e.target.checked
                                                        })
                                                    }
                                                ></Form.Check>
                                                <Row className="justify-content-center">
                                                        <Button 
                                                            onClick = {() =>{ 
                                                                setDetail2Style("block");
                                                                setDetail3Style("none");
                                                            }}
                                                        className="navigation_button app-text" style={{borderRadius:'1.5rem', width:'100%'}}>Go Back</Button>
                                                
                                                        <Button className="navigation_button app-text"  style={{borderRadius:'1.5rem', width:'100%'}}
                                                            onClick = {     
                                                                ()=>sendMail()
                                                            }
                                                            disabled={btnCheck}  
                                                        >Order Now</Button>
                                                    
                                                </Row>
                                            </Form>
                                        </Col>
                                    </Row>
                                    
                                </Form>
                            </div>
                            
                        {/* </Route>
                    </Switch> */}
                    <ToastContainer toastClassName = "border border-grey" />
                </div>
                
            </Container>
            <Footer/>
            {/* <div className="w-100 footer-bottom-line mt-5">

            </div>  */}
        </div>
    )
}

export default OrderValuation
