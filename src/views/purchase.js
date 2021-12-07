import React, { useEffect,useState } from 'react'
import { Button, Col, Container, Form, FormGroup, Image, Row } from 'react-bootstrap'
import Footer from '../components/footer'
import { useHistory } from 'react-router-dom'
import Header from '../components/header'
import { useLocation } from 'react-router-dom';
import { useParams} from "react-router-dom";

import BgPattern1 from '../assets/images/bg/pattern/hero_bg_pattern.svg';
import PropertyImage from '../assets/images/svg/property_image.jpg'
import Avatar from '../assets/images/avatars/avatar3.svg'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { orderBy } from 'lodash'
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import SelectSearch, { fuzzySearch } from "react-select-search";
import validator from 'validator'
import dateFormat from 'dateformat';

function Purchase() {
    const all_date = useLocation();
    const history = useHistory();

    console.log('all_date.state');
    console.log(all_date);

    if(all_date.state == undefined){
        history.push({
            pathname: '/search/strata',  
            state:{
                
            }          
        });
    }

    console.log(all_date);
    const [emailError, setEmailError] = useState('')
    const [emailError2, setEmailError2] = useState('')
    const [emailError1, setEmailError1] = useState('')
    const [mobileError, setmobileError] = useState('')
    const [LetterUrl, setLetterUrl] = useState('')
    console.log(LetterUrl);
    const [newInspectionDate, setNewInspectionDate] = useState('TBC')
    const [thebuyeragent, setthebuyeragent] = useState('');
    const [theSolicitoragent, settheSolicitoragent] = useState('');
    const [organizeFinane, setorganizeFinane] = useState('');
    // const [theSolicitoragentfound, settheSolicitoragentfound] = useState('no');
    const [disclimer, setdisclimer] = useState('none')
    const [agent, setAgent] = React.useState([]);
    const [OnBehalf, setOnBehalf] = React.useState('no');
    const [buyeragent, setbuyerAgent] = React.useState([]);
    const [solicitoragent, setsolicitorAgent] = React.useState([]);
    const [btnCheck, setbtnCheck] = React.useState(true);
    const [privateAgent, setPrivateAgent] = React.useState(all_date.state != undefined ? all_date.state.agent != undefined ? all_date.state.agent : undefined : '');
    const [agentOption, setagentOption] = React.useState([]);
    const [changeLetter, setChangeLetter] = React.useState([]);
    
    const [agentBuyerOption, setagentBuyerOption] = React.useState([]);
    const [agentsociliorOption, setagentsociliorOption] = React.useState([]);
    

    const [abnErr, setabnErr] = React. useState('');
    const [realUser, setrealUser] = React. useState('');
    const [value, setValue] = useState("");
    const [value1, setValue1] = useState("");
    const [formData, setFormData] = React.useState({
        action:"purchase",
        address:all_date.state == undefined ? '' : all_date.state.address,
        name:"",
        agentemail:"",
        agentname:"",
        email:"",
        mobile:"",
        firstName:"",
        lastName:"",
        status:"",
        agree:"",
        inspectionDate:"NULL",
        recommandedAgent: "NULL",
        usingbuyerAgentName:"NULL",
        usingbuyerAgentEmail:"NULL",
        usingSolicitorAgentName:"NULL",
        usingSolicitorAgentEmail:"NULL",
        theSolicitoragentfound:'NULL',
        authorityLetter:'NULL',
        trustedBroker:'NULL',
        onBehlaf:'NULL'
        
    })
    console.log('formData');
    console.log(formData);
    const notify = (message) => toast(message);

    async function sendMail(e){
        e.preventDefault();
        setFormData({
            ...formData,
            name: value
        });

        const data = new FormData();
        data.append("file", changeLetter);
        data.append("fileName", 'fileName' );
        data.append("action", 'uploadAutherityLetter' );
        const res = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            data,
            {
                "encType": "multipart/form-data" 
            }
        )
        
        setLetterUrl(process.env.REACT_APP_BACKEND_API_URL + '/' + res.data.url);

        
        // uploadletter(changeLetter);
        

        
        history.push({
            pathname: '/payment',
            state: { 
                detail: formData,
                number: all_date.state.number, 
                image:all_date.state.image,
                address:formData.address,
                formated_address:all_date.state.formated_address,
                inspection:newInspectionDate != "TBC" ? dateFormat(newInspectionDate , "dd/mm/yyyy") : dateFormat(all_date.state.inspection, "dd/mm/yyyy"),
                report:all_date.state.report != '' ? all_date.state.report : '',
                agent:agent,
                pvtAgent:privateAgent,
                typeOfReport:all_date.state.typeOfReport,
                letter:process.env.REACT_APP_BACKEND_API_URL + '/' + res.data.url,              
                method: all_date.state.method,
                report_by: all_date.state.report_by,
            }
        });

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
   
    async function getUser(){
        var userId = localStorage.getItem('userId');
        if(userId != undefined){
            
            const res = await axios.post(
                process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
                {
                    action:'getUser',
                    id:userId
                }
            )
            if(res.data != null){
                if(res.data[0].role == "real_estate_agent"){
                    setrealUser(res.data);
                }
            }
            
            

        }
       
    }

    const [otherAgent, setOtherAgent] = React.useState('none');
    const [otherAgent1, setOtherAgent1] = React.useState('none');
    const [otherAgent2, setOtherAgent2] = React.useState('none');
    async function getAllAgent(){
        const res = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:'getUserRole',
                role:'real_estate_agent'
            }
        )
        setAgent(res.data);
        var j = 0;
        var myobj = [];
        for(var i=0;i<res.data.length;i++){
            var obj = {};
            for(var d=0 ; d<2 ; d++){
                obj['name'] = res.data[i].name;  
                obj['value'] = res.data[i].name;  
            }
            myobj.push(obj);
            j++;
        }
        setagentOption(myobj);

        const res1 = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:'getUserRole',
                role:'buyers_agent'
            }
        )
        setbuyerAgent(res1.data);
        var j = 0;
        var myobj = [];
        for(var i=0;i<res1.data.length;i++){
            var obj = {};
            for(var d=0 ; d<2 ; d++){
                obj['name'] = res1.data[i].name;  
                obj['value'] = res1.data[i].name;  
            }
            myobj.push(obj);
            j++;
        }
        setagentBuyerOption(myobj);

        const res2 = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:'getUserRole',
                role:'conveyancer'
            }
        )
        setsolicitorAgent(res2.data);
        var j = 0;
        var myobj = [];
        for(var i=0;i<res2.data.length;i++){
            var obj = {};
            for(var d=0 ; d<2 ; d++){
                obj['name'] = res2.data[i].name;  
                obj['value'] = res2.data[i].name;  
            }
            myobj.push(obj);
            j++;
        }
        setagentsociliorOption(myobj);
    }

    async function selectedData(e){
        if(e.target.checked){
            setOtherAgent("block");
        }else{
            setOtherAgent("none");
        }
        // if(e.target.value == 'other'){
        //     setOtherAgent('block');
        // }else{
        //     setOtherAgent('none');
        // }
    }
    async function selectedData1(e){
        if(e.target.checked){
            setOtherAgent1("block");
        }else{
            setOtherAgent1("none");
        }
    }
    async function selectedData2(e){
        if(e.target.checked){
            setOtherAgent2("block");
        }else{
            setOtherAgent2("none");
        }
    }

    async function selectAgent(e){
        console.log(e);
        setFormData( {
            ...formData,
            name: e
        })
    }
    async function selectAgent1(e){

        const res = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:'getUserByName',
                agent:e
            }            
        )
        setFormData( {
            ...formData,
            usingbuyerAgentName: res.data[0].name,
            usingbuyerAgentEmail: res.data[0].email
        });
        
    }
    async function selectAgent2(e){
        const res = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:'getUserByName',
                agent:e
            }            
        )
        setFormData( {
            ...formData,
            usingSolicitorAgentEmail: res.data[0].email,
            usingSolicitorAgentName: res.data[0].name
        })
        // setFormData( {
        //     ...formData,
        //     usingSolicitorAgentName: res.data[0].name
        // })
    }
    async function selectAgent3(e){
        
        setFormData( {
            ...formData,
            onBehlaf: e
        })
    }

    useEffect(
        ()=>{
           
            getUser();
            getAllAgent();
            window.scrollTo(0,0);   
        }, []
    )

    async function changeDate(e){
        setNewInspectionDate(e.target.value);
        setdisclimer("block");
        setFormData({
            ...formData,
            inspectionDate: e.target.value
        })
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
    const validateAgentEmail = (e) => {
        var email = e.target.value
      
        if (validator.isEmail(email)) {
            setEmailError1('')
            setFormData({
                ...formData,
                usingbuyerAgentEmail: e.target.value
            })
            setbtnCheck(false)
        } else {
            setEmailError1('Invalid')
            setbtnCheck(true)
        }
    }
    const validatesolicitorEmail = (e) => {
        var email = e.target.value
      
        if (validator.isEmail(email)) {
            setEmailError2('')
            setFormData({
                ...formData,
                usingSolicitorAgentEmail: e.target.value
            })
            setbtnCheck(false)
        } else {
            setEmailError2('Invalid')
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

    async function uploadletter(e){
        // var response = uploadReportImage(e);
        
        // setFormData( {
        //     ...formData,
        //     authorityLetter: process.env.REACT_APP_BACKEND_API_URL + '/' + res.data.url
        // })
    }

   

    
    const options = [
        {
          name: "Annie Cruz",
          value: "annie.cruz",
          photo: "https://randomuser.me/api/portraits/women/60.jpg"
        },
        {
          name: "Eli Shelton",
          disabled: true,
          value: "eli.shelton",
          photo: "https://randomuser.me/api/portraits/men/7.jpg"
        },
        {
          name: "Loretta Rogers",
          value: "loretta.rogers",
          photo: "https://randomuser.me/api/portraits/women/51.jpg"
        },
        {
          name: "Lloyd Fisher",
          value: "lloyd.fisher",
          photo: "https://randomuser.me/api/portraits/men/34.jpg"
        },
        {
          name: "Tiffany Gonzales",
          value: "tiffany.gonzales",
          photo: "https://randomuser.me/api/portraits/women/71.jpg"
        }
    ];
    
    return (
        <div>
            <Image src={BgPattern1} className="position-absolute w-100" style={{zIndex:"-1"}}></Image>
            <Container>
                <Header/>
                <div className="text-center set_page_title">
                    <p className="app-title">Order Strata Report</p> 
                </div>
                <Row className="strata-Rep-section">
                    <Col md={4}>
                        <Image src={all_date.state == undefined ? '' : all_date.state.image} className="w-100" style={{ borderRadius:'40px' }}></Image>
                        <div className="text-center">
                            <p className="strata-img-title">{all_date.state == undefined ? '' : all_date.state.address}</p>
                            {
                                all_date.state == undefined ? '' :
                                all_date.state.method == 'independed' ?
                                    <p className="strata-img-date">{newInspectionDate != "TBC" ? 'Estimated Inspection Date : ' +dateFormat(newInspectionDate , "dd/mm/yyyy") : 'Estimated Inspection Date : ' +'TBC'} </p>
                                :
                                    <p className="strata-img-date">{ all_date.state.method == 'existing' ? all_date.state.inspection == "TBC" ? 'Estimated Inspection Date : TBC' : 'Estimated Inspection Date : ' + dateFormat(all_date.state.inspection , "dd/mm/yyyy") : all_date.state.method == "newReport" ?  newInspectionDate != "TBC" ? 'Estimated Inspection Date : ' +dateFormat(newInspectionDate , "dd/mm/yyyy") : 'Estimated Inspection Date : ' +'TBC' :  all_date.state != undefined ? 'Estimated Inspection Date : ' + dateFormat(all_date.state.inspection , "dd/mm/yyyy") : '' } </p>
                            }
                            
                            <p className="strata-img-date covid_info" style={{display:disclimer}}>
                                {
                                    all_date.state == undefined ? '' :
                                    all_date.state.method == "newReport" || all_date.state.method == "independed" ? 'Due to COVID19, the inspection may take longer; the team will notify you once the inspection has been scheduled.' : '' 
                                }
                            </p>
                        </div>

                        {
                            all_date.state == undefined ? '' :
                            all_date.state.agent != undefined ?
                                <div className="d-flex justify-content-between px-md-2 align-items-center report-author-block">
                                    <div className="d-flex align-items-center">
                                        <Image src={all_date.state == undefined ? '' : all_date.state.agent.avatar != "" ?all_date.state.agent.avatar : Avatar} className="admin-avatar"></Image>
                                        <div className="ml-3 report-users">
                                            <p className="app-text my-0 text-dark">Reported By:</p>
                                            <p className="app-text my-0">{all_date.state == undefined ? '' :all_date.state.agent.name}</p>
                                            
                                        </div>
                                    </div>
                                    <p className="app-title text-primary my-0">$50</p>
                                </div>
                            :
                            ""

                        }

                       
                    </Col>
                    <Col md={8} className="strata-rep-form">
                    {/* onSubmit={handleSubmit} */}
                        <Form onSubmit={sendMail} >
                            <FormGroup>
                                <Form.Label className="contact-form-label">Agent Name*</Form.Label>
                                {/* <Form.Control type='text' placeholder="Enter Your Name Here" className='contact-form-input' 
                                    onChange = {     
                                        (e)=>setFormData({
                                            ...formData,
                                            name: e.target.value
                                        })
                                    }
                                required></Form.Control> */}
                                
                                {/* <select placeholder="Choose any one" className='contact-form-input select_tab' onChange = {     
                                        (e)=>setFormData( {
                                            ...formData,
                                            name: e.target.value
                                        })
                                        
                                    } 
                                    onClick={(e)=>selectedData(e)}
                                required>
                                    <option value='' class='hide_text'>Choose any one</option>
                                   {                                      
                                       agent.map(
                                        (item)=>(
                                            <option id={item.email} value={item.name}>{item.name}</option>
                                        )
                                    )
                                   }
                                   <option value='other' >Other</option>
                                </select> */}
                            </FormGroup>

                            <Row>
                                <Col sm={9} >
                                    <SelectSearch
                                        options={agentOption}
                                        value={value}
                                        onChange={(e)=>selectAgent(e)}
                                        search
                                        filterOptions={fuzzySearch}
                                        placeholder="Search Agent Name"
                                    />
                                </Col>
                                <Col sm={3} className="agent_not_found">
                                    <input type="checkbox" name="noagent" id="noagent"
                                        onChange={
                                            (e)=>selectedData(e)
                                        }
                                    />
                                    <label for="noagent" className="form-check-label" style={{color:"#1D83FF"}}>Agent not on list</label>
                                </Col>
                            </Row>
                                
                            <Row>
                                <Col md={6} className="my-3" style={{ display:otherAgent }}>
                                    <Form.Label className="contact-form-label">Agent Name*</Form.Label>
                                    <Form.Control type='text' placeholder="Enter Agent Name Here" className='contact-form-input'
                                        onChange = {     
                                            (e)=>setFormData({
                                                ...formData,
                                                agentname: e.target.value
                                            })
                                        }
                                    ></Form.Control>
                                </Col>
                                <Col md={6} className="my-3" style={{ display:otherAgent }}>
                                    <Form.Label className="contact-form-label">Agent Email*</Form.Label>
                                    <Form.Control type='text' placeholder="Enter E-Mail ID Here" className='contact-form-input'
                                        onChange = {     
                                            (e)=>setFormData({
                                                ...formData,
                                                agentemail: e.target.value
                                            })
                                        }
                                    ></Form.Control>
                                </Col>                                
                                <Col md={6} className="my-3">
                                    <Form.Label className="contact-form-label">First Name*</Form.Label>
                                    <Form.Control type='text' placeholder="Enter your first name here" className='contact-form-input' 
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
                                    <Form.Control type='text' placeholder="Enter your last name here" className='contact-form-input'
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
                                    <Form.Control type='text' placeholder="Enter Your E-Mail ID Here" className='contact-form-input'
                                        
                                        onChange = { 
                                            (e) => validateEmail(e)
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
                                {
                                    all_date.state.method == "newReport" || all_date.state.method == "independed" ? 
                                        <Col md={12} className="my-3">
                                            {/* <Form.Label className="contact-form-label">Requesting Report*</Form.Label> */}
                                            <Form.Label className="contact-form-label">Inspection Date Need By*</Form.Label>
                                            <Form.Control type='date' placeholder="Enter Your E-Mail ID Here" max="2021-12-31" className='contact-form-input'
                                                onChange = {  
                                                    (e)=>changeDate(e)
                                                }
                                            required></Form.Control>
                                        </Col>
                                    : 

                                    ''
                                }


                                {/* Are you using a buyers agent? */}
                                <Col md={12} className="my-3">
                                    <Form.Label className="contact-form-label">Do you have a buyers agent?*</Form.Label>
                                    <select placeholder="Choose any one" className='contact-form-input select_tab'
                                            onChange = {  
                                                (e)=>setthebuyeragent(e.target.value)
                                            }
                                        >
                                        <option value='no' class='hide_text'>Choose any one</option>
                                        <option value='yes'>Yes</option>
                                        <option value='not'>No</option>
                                        
                                    </select>
                                </Col>
                               
                                {
                                    thebuyeragent == "yes" ? 
                                        <>
                                            <Col md={12} className="my-3">
                                                <Row>
                                                    <Col sm={9} >
                                                        <SelectSearch
                                                            options={agentBuyerOption}
                                                            value={value}
                                                            onChange={(e)=>selectAgent1(e)}
                                                            search
                                                            filterOptions={fuzzySearch}
                                                            placeholder="Search Agent Name"
                                                        />
                                                    </Col>
                                                    <Col sm={3} className="agent_not_found">
                                                        <input type="checkbox" name="noagent1" id="noagent1"
                                                            onChange={
                                                                (e)=>selectedData1(e)
                                                            }
                                                        />
                                                        <label for="noagent1" className="form-check-label" style={{color:"#1D83FF"}}>Agent not on list</label>
                                                    </Col>
                                                </Row>
                                            </Col>

                                            <Col md={6} className="my-3" style={{ display:otherAgent1 }}>
                                                <Form.Label className="contact-form-label">Agent Name*</Form.Label>
                                                <Form.Control type='text' placeholder="Enter Agent Name Here" className='contact-form-input'
                                                    onChange = {     
                                                        (e)=>setFormData({
                                                            ...formData,
                                                            usingbuyerAgentName: e.target.value
                                                        })
                                                    }
                                                ></Form.Control>
                                            </Col>
                                            <Col md={6} className="my-3" style={{ display:otherAgent1 }}>
                                                <Form.Label className="contact-form-label">Agent Email*</Form.Label>
                                                <Form.Control type='text' placeholder="Enter E-Mail ID Here" className='contact-form-input'
                                                    onChange = {  
                                                           
                                                        (e)=>validateAgentEmail(e)
                                                    }
                                                ></Form.Control>
                                                <span className="err">{emailError1}</span>
                                            </Col> 
                                        </>
                                    :   
                                        thebuyeragent == 'not' ?
                                            <Col md={12} className="my-3">
                                                <Form.Label className="contact-form-label">Do you want us to recommend you one?*</Form.Label>
                                                <select placeholder="Choose any one" className='contact-form-input select_tab'
                                                        onChange = {  
                                                            (e)=>setFormData({
                                                                ...formData,
                                                                recommandedAgent: e.target.value
                                                            })
                                                        }
                                                    >
                                                    <option value='NULL' class='hide_text'>Choose any one</option>
                                                    <option value='yes'>Yes</option>
                                                    <option value='no'>No</option>
                                                    
                                                </select>
                                            </Col>
                                        : ''
                                
                                }

                                {/*Do you have a solicitor?*/}
                                <Col md={12} className="my-3">
                                    <Form.Label className="contact-form-label">Do you have a solicitor?*</Form.Label>
                                    <select placeholder="Choose any one" className='contact-form-input select_tab'
                                            onChange = {  
                                                (e)=>settheSolicitoragent(e.target.value)
                                            }
                                        >
                                        <option value='no' class='hide_text'>Choose any one</option>
                                        <option value='yes'>Yes</option>
                                        <option value='not'>No</option>
                                        
                                    </select>
                                </Col>
                                {
                                    
                                    theSolicitoragent == "yes" ? 
                                        <>
                                            <Col md={12} className="my-3">
                                                <Row>
                                                    <Col sm={9} >
                                                        {/* <SelectSearch
                                                            options={solicitoragent}
                                                            value={value}
                                                            onChange={(e)=>selectAgent2(e)}
                                                            search
                                                            filterOptions={fuzzySearch}
                                                            placeholder="Search Agent Name"
                                                        /> */}
                                                        <SelectSearch
                                                            options={agentsociliorOption}
                                                            value={value}
                                                            onChange={(e)=>selectAgent2(e)}
                                                            search
                                                            filterOptions={fuzzySearch}
                                                            placeholder="Search Agent Name"
                                                        />
                                                    </Col>
                                                    <Col sm={3} className="agent_not_found">
                                                        <input type="checkbox" name="noagent2" id="noagent2"
                                                            onChange={
                                                                (e)=>selectedData2(e)
                                                            }
                                                        />
                                                        <label for="noagent2" className="form-check-label" style={{color:"#1D83FF"}}>Agent not on list</label>
                                                    </Col>
                                                </Row>
                                            </Col>

                                            <Col md={6} className="my-3" style={{ display:otherAgent2 }}>
                                                <Form.Label className="contact-form-label">Agent Name*</Form.Label>
                                                <Form.Control type='text' placeholder="Enter Agent Name Here" className='contact-form-input'
                                                    onChange = {     
                                                        (e)=>setFormData({
                                                            ...formData,
                                                            usingSolicitorAgentName: e.target.value
                                                        })
                                                    }
                                                ></Form.Control>
                                            </Col>
                                            <Col md={6} className="my-3" style={{ display:otherAgent2 }}>
                                                <Form.Label className="contact-form-label">Agent Email*</Form.Label>
                                                <Form.Control type='text' placeholder="Enter E-Mail ID Here" className='contact-form-input'
                                                    onChange = {     
                                                        (e)=>validatesolicitorEmail(e)
                                                    }
                                                ></Form.Control>
                                                <span className="err">{emailError2}</span>
                                            </Col>   
                                        </>
                                    : 

                                        theSolicitoragent == "not" ?  

                                            <Col md={12} className="my-3">
                                                <Form.Label className="contact-form-label">Do you want us to recommend you one?*</Form.Label>
                                                <select placeholder="Choose any one" className='contact-form-input select_tab'
                                                        onChange = {  
                                                            (e)=>setFormData({
                                                                ...formData,
                                                                theSolicitoragentfound: e.target.value
                                                            })
                                                        }
                                                    >
                                                    <option value='no' class='hide_text'>Choose any one</option>
                                                    <option value='yes'>Yes</option>
                                                    <option value='no'>No</option>
                                                    
                                                </select>
                                            </Col>
                                        : ''
                                }

                                {/* Have you organized finane? */}
                                <Col md={12} className="my-3">
                                    <Form.Label className="contact-form-label">Have you organized finane?*</Form.Label>
                                    <select placeholder="Choose any one" className='contact-form-input select_tab'
                                            onChange = {  
                                                (e)=>setorganizeFinane(e.target.value)
                                            }
                                        >
                                        <option value='no' class='hide_text'>Choose any one</option>
                                        <option value='yes'>Yes</option>
                                        <option value='no'>No</option>
                                        
                                    </select>
                                </Col>
                                {
                                    organizeFinane == "no" ? 
                                        <Col md={12} className="my-3">
                                            <Form.Label className="contact-form-label">Would you like us to reccomend you a trusted broker?*</Form.Label>
                                            <select placeholder="Choose any one" className='contact-form-input select_tab'
                                                    onChange = {  
                                                        (e)=>setFormData({
                                                            ...formData,
                                                            trustedBroker: e.target.value
                                                        })
                                                    }
                                                >
                                                <option value='' class='hide_text'>Choose any one</option>
                                                <option value='yes'>Yes</option>
                                                <option value='no'>No</option>
                                                
                                            </select>
                                        </Col>
                                    : ''

                                }

                                <Col md={12} className="my-3">
                                    <Form.Label className="contact-form-label">You purchasing this report on behalf of someone?*</Form.Label>
                                    <select placeholder="Choose any one" className='contact-form-input select_tab'
                                            onChange = {  
                                                (e)=>setOnBehalf(e.target.value)
                                            }
                                        >
                                        <option value='' class='hide_text'>Choose any one</option>
                                        <option value='yes'>Yes</option>
                                        <option value='no'>No</option>
                                        
                                    </select>
                                </Col>
                                {
                                    OnBehalf == "yes" ?
                                        <Col md={6} className="my-3"> 
                                            <SelectSearch
                                                options={agentOption}
                                                value={value}
                                                onChange={(e)=>selectAgent3(e)}
                                                search
                                                filterOptions={fuzzySearch}
                                                placeholder="Search Agent Name"
                                            />
                                        </Col>
                                     : ''
                                }   

                                {
                                    all_date.state.method == "independed" ? 
                                        <Col md={12} className="my-3">
                                            <Form.Label className="contact-form-label">Upload Authority Letter*</Form.Label> <br/>
                                            <Form.Check className="contact-form-input" style={{width:'100%'}} name='purchage-type' inline  type='file' id='file'
                                                onChange = {     
                                                    (e)=>setChangeLetter(e.target.files[0])
                                                }
                                            ></Form.Check><br/>
                                        </Col> 
                                    : 

                                    ''
                                }
                                        

                            </Row>
                            <div className="d-flex justify-content-between my-3 set-radio-mobile">
                                <Form.Check className="app-text strata-redio" name='purchage-type' inline label='I am Renting' type='radio' id='Renting'
                                     onChange = {     
                                        (e)=>setFormData({
                                            ...formData,
                                            status: e.target.id
                                        })
                                    }
                                 
                                ></Form.Check>
                                <Form.Check className="app-text strata-redio" name='purchage-type' inline label='I am Selling' type='radio' id='Selling'
                                    onChange = {     
                                        (e)=>setFormData({
                                            ...formData,
                                            status: e.target.id
                                        })
                                    }
                                ></Form.Check>
                                <Form.Check className="app-text strata-redio" name='purchage-type' inline label='Neither Renting Nor Selling' type='radio' id='Neither_Renting_Nor_Selling'
                                    onChange = {     
                                        (e)=>setFormData({
                                            ...formData,
                                            status: e.target.id
                                        })
                                    }
                                ></Form.Check>
                            </div>
                            <Form.Check className="app-text agree-checkbox" name='purchage-agree' label='I agree to terms and conditions' type='checkbox' id='agree'
                                onChange = {     
                                    (e)=>setFormData({
                                        ...formData,
                                        agree: e.target.value
                                    })
                                }
                            ></Form.Check>
                            <Row className="justify-content-center my-4">
                                    <Button className="navigation_button app-text" style={{borderRadius:'1.5rem', width:'100%'}}
                                     onClick = {     
                                        ()=> {
                                            history.goBack();
                                        }
                                    }
                                    >Go Back</Button>
                                
                                    <Button className="navigation_button app-text" type="submit"  style={{borderRadius:'1.5rem', width:'100%'}}
                                      disabled={btnCheck}  
                                    >Order Now</Button>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    )
}

export default Purchase

