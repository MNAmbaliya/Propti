import React, { useEffect,useState, useRef } from 'react';
import { Button, Col, Container, Form, FormGroup, Image, Row } from 'react-bootstrap'
import Footer from '../components/footer'
import Header from '../components/header'
import Geocode from "react-geocode";
import SETTINGS from '../config';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import axios from "axios";

import BgPattern1 from '../assets/images/bg/pattern/hero_bg_pattern.svg';
import GooglePlaceAutoComplete from '../components/basic/googleAutoComplete';
import OrderPropertyCard from '../components/order/orderpropertycard';
import { getStrataReport } from '../API/order.api';
import CardIamge1 from  '../assets/images/svg/notfound.png';
import Cookies from 'universal-cookie';
import Autocomplete from 'react-google-autocomplete';
import validator from 'validator'

var qs = require('qs');

function Order( { location } ) {
    const inputRef = useRef(null);
    const cookies = new Cookies();
    const all_date = useLocation();
    const [address, setupcomingAddress] = React.useState(null);
    const [allProperties, setAllProperties] = React.useState([])

    const [getaddress, setAddress] = React.useState('');
    const [reportDetail, setreportDetail] = React.useState('');
    const [found, setFound] = React.useState('');
    const [searchReport, setSearchReport] = React.useState([]);
    const [emailError, setEmailError] = useState('')
    const [searchProperty, setSearchProperty] = React.useState({
        address:address,
        method:"",
        type:""
    })
    const [addressComponent, setAddressComponent] = React.useState([]);

    const [searchData, setsearchData] = React.useState([]);
    const [token, setToken] = React.useState("");


    const history = useHistory();

    var minm = 100000000000;
    var maxm = 999999999999;
    var code = Math.floor(Math.random() * (maxm - minm + 1)) + minm;

    
    


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
    


    useEffect(
        ()=>{           
            getToken();    
            if(all_date.state != undefined){
                if(all_date.state.address != undefined){
                    // address = all_date.state.address;
                    setupcomingAddress( all_date.state.address);
                    getProperties(address,all_date.state.component);
                }
            }      

        }, []
    )
    

    async function getProperties(address,component){
        const report = await axios.post(
                
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:"getReport",
                address:all_date.state != undefined ? all_date.state.address : searchProperty.address
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

            var myAddress = component[0].long_name + " " + component[1].long_name.replaceAll("Rd","Road") + " " + component[2].long_name + " " + component[3].long_name + " " + component[4].long_name + " " + component[5].long_name 
        }else{
            myAddress = searchProperty.address.replaceAll("Rd","Road");
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

    const onClickSearch = async () => {

        if(searchProperty.address != undefined){
            getProperties( searchProperty.address, addressComponent);            
        }
    }

    const validateEmail = (e) => {
        var email = e.target.value
      
        if (validator.isEmail(email)) {
            setEmailError('Valid Email')
        } else {
            setEmailError('Invalid Email')
            
        }
    }

    //show contact form
    const [showContact, setShowContact] = React.useState(false)
    return (
        <div className="d-flex flex-wrap" style={{minHeight: "100vh"}}>
            <Image src={BgPattern1} className="position-absolute w-100" style={{zIndex:"-1"}}></Image>
            <Container>
                <Header/>
                <div className="text-center set_report_title" style={{ position:"relative" }}> 
                    <p className="app-title ">Order Strata Report</p>
                    <Row >
                        <Col md={12}>
                            <Form.Control as={Autocomplete} types={["address"]} componentRestrictions={{ country: "au" }} ref={inputRef} type='text' placeholder="Enter property address" value={address != "" ? address : ''} className='contact-form-input starta_search'
                                
                                onPlaceSelected={(place,e) => {
                                    
                                    // 2/65 dover Road Rose Bay NSW, Australia
                                    // 2/65 Dover Road Rose Bay NSW, Australia
                                    setSearchProperty({
                                        ...searchProperty,
                                        address: place.formatted_address.replaceAll('Rd,',"Road")
                                    })
                                    setAddressComponent(place.address_components);
                                    setupcomingAddress(place.formatted_address.replaceAll('Rd,',"Road"));
                                }}
                                onChange={
                                    (e)=>{
                                        setSearchProperty({
                                            ...searchProperty,
                                            address: e.target.value
                                        })
                                        setAddressComponent(e.target.value);
                                        setupcomingAddress(e.target.value);
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
                {
                        allProperties.tmp == 'empty' ?

                            found == 'new' ? 
                            
                                searchReport != '' ? 
                                    searchReport.filter((item, index) => index < 1).map(
                                        (item)=>(
                                            <Row className="justify-content-center">
                                                <Col md={4}>
                                                    <OrderPropertyCard
                                                        number = { code }
                                                        reportType = 'existing'
                                                        formatted_address = {searchProperty.address}
                                                        streetname = {item.address}
                                                        reportby={item.reported_by}
                                                        descrition = {"Report by : "+item.reported_by}
                                                        image = {item.file}
                                                        report = 'data' //{searchData[0].reported_by}
                                                        date = {item.report_date}
                                                        strataReport = {'strata'}
                                                    />
                                                </Col>
                                                <Col md={4}>
                                                    
                                                    <OrderPropertyCard
                                                        number = { code }
                                                        reportType = 'noFound'
                                                        formatted_address = {searchProperty.address != null ? searchProperty.address : all_date.state.address}
                                                        streetname = {searchProperty.address != null ? searchProperty.address : all_date.state.address}
                                                        descrition = {""}
                                                        image = {CardIamge1}
                                                        report = 'data' //{searchData[0].reported_by}
                                                        date = {'TBC'}
                                                        strataReport = {'strata'}
                                                    />
                                                </Col>
                                            </Row>
                                        )
                                    )
                                :
                                    
                                    
                                <Row className="justify-content-center">
                                     <Col md={4}>
                                         
                                        <OrderPropertyCard
                                            number = { code }
                                            reportType = 'noFound'
                                            formatted_address = {searchProperty.address != null ? searchProperty.address : all_date.state.address}
                                            streetname = {searchProperty.address != null ? searchProperty.address : all_date.state.address}
                                            descrition = {""}
                                            image = {CardIamge1}
                                            report = 'data' //{searchData[0].reported_by}
                                            date = {'TBC'}
                                            strataReport = {'strata'}
                                        />
                                    </Col>
                                </Row>
                            :

                            <div className = ""> 
                                <div className="d-flex justify-content-between px-md-5">   
                                    <p className="app-text px-3 my-0">*No Related Search Found. Can’t Find Property?</p>
                                    <p className="app-text px-3 my-0 text-primary app-link" onClick={()=>setShowContact(!showContact)}>Click Here</p>
                                </div>
                                <div  className="px-md-5 my-0 py-0"><hr/></div>
                                {
                                    showContact && 
                                    <>
                                        <div className="text-center mt-5">
                                            <p className="app-text mt-3">Please fill in the following details, we will get in touch with you as soon as possible. You<br/> can also call us on 1300 253 761 to order your report over the phone.</p>
                                        </div>
                                        <div className="mx-md-5 px-md-5 mt-5">
                                            <Form className="mx-md-5 px-md-5">
                                                <FormGroup>
                                                    <Form.Label className="contact-form-label">Property Name*</Form.Label>
                                                    <Form.Control type='text' placeholder="Enter Property Name Here" className='contact-form-input' required></Form.Control>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Form.Label className="contact-form-label">Your Name</Form.Label>
                                                    <Form.Control type='text' placeholder="Enter Your Name Here" className='contact-form-input'></Form.Control>
                                                </FormGroup>
                                                <Row >
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Form.Label className="contact-form-label">Email ID*</Form.Label>
                                                            <Form.Control type='text' placeholder="Enter your mail ID" className='contact-form-input'
                                                                
                                                            required></Form.Control>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Form.Label className="contact-form-label">Contact Number</Form.Label>
                                                            <Form.Control type='text' placeholder="Enter Your contact number" className='contact-form-input'></Form.Control>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row className="px-5">
                                                    <Col md={6}>
                                                        <Button className="app-text btn btn-outline-primary text-white" style={{borderRadius:'1.5rem', width:'100%', color:'#fff'}}>Cancel</Button>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Button className="app-text btn btn-outline-primary text-white" style={{borderRadius:'1.5rem', width:'100%', color:'#fff'}}>Submit</Button>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </div>
                                    </>
                                }
                                    
                            </div>
                        :
                        
                        reportDetail == "existing" ?

                            <div className="search-report-block">
                                <Row className="justify-content-center">
                                    {
                                        searchReport != '' ? 
                                        searchReport.filter((item, index) => index < 1).map(
                                            (item)=>(
                                                <Col md={4}>
                                                    <OrderPropertyCard
                                                        number = { code }
                                                        reportType = 'existing'
                                                        formatted_address = {searchProperty.address}
                                                        streetname = {item.address}
                                                        descrition = {"Report by : "+item.reported_by}
                                                        image = {item.file}
                                                        report = 'data' //{searchData[0].reported_by}
                                                        date = {item.report_date}
                                                        strataReport = {'strata'}
                                                        reportby={item.reported_by}
                                                    />
                                                </Col>
                                            )
                                        )
                                    :
                                        ''
                                        
                                    }
                                    {
                                        searchReport != '' ? 
                                            allProperties.filter((item, index) => index < 1).map(
                                                (item)=>(
                                                    <Col md={4}>
                                                        
                                                        <OrderPropertyCard
                                                            reportType = 'new'
                                                            number = { code }
                                                            formatted_address = {searchProperty.address}
                                                            streetname = {item.address}
                                                            descrition = {''}
                                                            method = {searchProperty.method}
                                                            type = {searchProperty.type}
                                                            image = {CardIamge1}
                                                            report = 'data' //{searchData[0].reported_by}
                                                            id = {item.id}
                                                            strataReport = {'strata'}
                                                        />
                                                    </Col>
                                                )
                                            )
                                        : ''
                                    }
                                </Row>
                            </div>

                            :

                            <div className="search-report-block">
                                <Row className="justify-content-center">
                                    {
                                        allProperties.filter((item, index) => index < 1).map(
                                            (item)=>(
                                                <Col md={4}>
                                                    
                                                    <OrderPropertyCard
                                                        reportType = 'moreNew'
                                                        number = { code }
                                                        streetname = {item.address}
                                                        formatted_address = {searchProperty.address}
                                                        descrition = ''
                                                        method = {searchProperty.method}
                                                        type = {searchProperty.type}
                                                        image = {CardIamge1}
                                                        report = '' //{searchData[0].reported_by}
                                                        id = {item.id}
                                                    />
                                                </Col>
                                            )
                                        )
                                    }
                                </Row>
                            </div>

                           
                               
                                   
                                  
                               
                    
                }
               
            </Container>
            <Footer></Footer>
        </div>
    )
}

export default Order
