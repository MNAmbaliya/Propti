import React, { useEffect,useState, useRef } from 'react';
import { Button, Col, Container, Form, FormGroup, Image, Row } from 'react-bootstrap'

// import reasources
import '../../../assets/css/hero.css';
import GooglePlaceAutoComplete from '../../basic/googleAutoComplete';
import Autocomplete from 'react-google-autocomplete';
import RightImage from '../../../assets/images/svg/home.png';
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom';


function Hero() {
    const all_date = useLocation();
    const inputRef = useRef(null);
    


    const [addressComponent, setAddressComponent] = React.useState([]);
    const [selectReport, setSelectReport] = React.useState('');
    const [search_btn_style, setsearch_btn_style] = React.useState('none');
    const [next_btn_style, setnext_btn_style] = React.useState('block');
    const [next_btn_active, setnext_btn_active] = React.useState(true);
    const [btnCheck, setbtnCheck] = React.useState(true);
    const [searchProperty, setSearchProperty] = React.useState({
        address:"",
        method:"new",
        type:"home"
    })

    const history = useHistory();

    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    };

    if(modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    async function enableBtn(e){
        if(e.target.value != ""){
            setSelectReport(e.target.value)
            setbtnCheck(false);
        }else{
            setbtnCheck(true);
        }
    }

    const onClickSearch = () => {
        // if(modal==true){
        //     setModal(false);
        // }else{
        //     setModal(true);
        // }
        if(selectReport != ""){
            handleSendReply(selectReport)
        }
    }

    async function handleSendReply(report){
        if(report == "strata"){
            history.push(
                {
                    pathname:"./search/strata",
                    state:{
                        address:searchProperty.address,
                        component:addressComponent
                    }
                }
            );
        }else if(report == "valuation"){
            history.push(
                {
                    pathname:"./valuation/",
                    state:{
                        address:searchProperty.address,
                        component:addressComponent,
                        detail1:"detail1"
                    }
                }
            );
        }else if(report == "build"){
            history.push(
                {
                    pathname:"./inspection/",
                    state:{
                        address:searchProperty.address,
                        component:addressComponent
                    }
                }
            );
        }else if(report == "depreciation"){
            history.push(
                {
                    pathname:"./depreciation/",
                    state:{
                        address:searchProperty.address,
                        component:addressComponent
                    }
                }
            );
        }
    }

    async function next_process(){
        setnext_btn_style("none");
        setsearch_btn_style("block");
    }

    async function valueInputed(e){
        console.log("work");
        if(e.target.value != ""){
            setnext_btn_active(false);
            setSearchProperty({
                ...searchProperty,
                address: e.target.value
            })
            setAddressComponent(e.target.value);
        }else{
            setnext_btn_active(true);
        }
        
    }

    return (
        <div className="home_search">
            <div className="hero-root position-relative">
            <Image src={RightImage} className="position-absolute  hero-image"></Image>
            <div className="set_herotext_block">
                <div><span className="hero-head-title-1">Property Reports!</span></div>
                <div><span className="hero-head-title-2">Delivered Faster!</span></div>
                <div className="hero-title set_herotext">
                    <p>At Propti we aim to save you time, money, and<br/> headaches so you can focus on the property at hand.</p>
                </div>
            </div>
            <p className="show_address" style={{display:search_btn_style}}>{searchProperty.address}</p>
            <div className="px-1 hero-place-autocomplete" style={{position:"relative"}}>
                
                {/* <GooglePlaceAutoComplete
                    setSearchProperty = {setSearchProperty} 
                    searchProperty = {searchProperty}
                    onClickSearch = {onClickSearch}
                    placeholder = "Enter the address you need a report for"
                    components = {setAddressComponent}
                /> */}

               
                        <Form.Control as={Autocomplete} types={["address"]} componentRestrictions={{ country: "au" }} ref={inputRef} type='text' placeholder="Enter property address" className='contact-form-input starta_home_search'
                            
                            onPlaceSelected={(place) => {
                                setSearchProperty({
                                    ...searchProperty,
                                    address: place.formatted_address
                                })
                                setAddressComponent(place.address_components);
                            }}
                            onChange={
                                (e)=>{
                                    valueInputed(e)
                                }
                            }
                        required></Form.Control>
                     <Button   className="app-text btn btn-outline-primary text-white search_home_button" style={{borderRadius:'1.5rem', width:'100%', color:'#fff',display:next_btn_style}}
                        onClick={
                            (e)=>next_process()
                        }
                        disabled={next_btn_active}
                    >Next</Button>
                    <Button  className="app-text btn btn-outline-primary text-white search_home_button" style={{borderRadius:'1.5rem', width:'100%', color:'#fff',display:search_btn_style}}
                        onClick={
                            (e)=>onClickSearch()
                        }
                        disabled={btnCheck}
                    >Search</Button>
                    <select name="" id="select_strata_report" 
                        onChange={
                            (e)=>{
                                enableBtn(e)
                            }
                        }
                        style={{display:search_btn_style}}
                    >
                        <option value="" class='hide_text'>Select Report</option>
                        <option value="strata">Strata Report</option>
                        <option value="build">Building & Pest Inspection</option>
                        <option value="valuation">Valuation Report</option>
                        <option value="depreciation">Depreciation Report</option>
                    </select>
                
            </div>
            {modal && (
                <div className="select_button">
                   <h5>Select Report Type : </h5>
                   <Button onClick={()=>handleSendReply("strata")}>Strata Report</Button>
                   <Button onClick={()=>handleSendReply("build")}>Building & Pest Inspection</Button>
                   <Button onClick={()=>handleSendReply("valuation")}>Valuation Report</Button>
                   <Button onClick={()=>handleSendReply("depreciation")}>Depreciation Report</Button>
                </div>
            )}
            </div>
        </div>
    )  
}

export default Hero
