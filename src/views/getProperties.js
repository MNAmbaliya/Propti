import React, { useEffect,useState, useRef } from 'react';

import { Button, Col, Container, Form, Image, FormGroup, Row } from 'react-bootstrap'
import Cookies from 'universal-cookie';
import axios from "axios";
import CardIamge1 from  '../assets/images/svg/notfound.png';

var qs = require('qs');


export default function GetProperties(props) {
    const cookies = new Cookies();
    const [token, setToken] = React.useState("");
    const [allProperties, setAllProperties] = React.useState([])
    const [properties,setProperties] = React.useState([]);

    const [image,setImage] = React.useState('');
    let tmp = 1;
    let tmp1 = 1;

    useEffect(
        ()=>{
            window.scrollTo(0,0);   
            getToken();
                          
           
        }, [image]
    )
    
    /**
     * Get Token
     */
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
        getProperties(); 
        
    }

    async function getProperties(){
        var token = cookies.get("tokens");
       
            var getaddress = props.address.address != '' ? props.address.address : ''
            console.log(props);


            if( props.component[0].long_name != undefined){
                var myAddress = props.component[0].long_name + " " + props.component[1].long_name + " " + props.component[2].long_name + " " + props.component[3].long_name + " " + props.component[4].long_name + " " + props.component[5].long_name 
            }else{
                myAddress = props.address.address
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
                    
                    var tmpval = 0;

                    var street = response.data[0].addressComponents.streetName + " " + response.data[0].addressComponents.streetTypeLong;
                    props.component.map((item)=>(
                        
                        item.types[0] == "street_number" ? response.data[0].addressComponents.streetNumber == item.long_name ? tmpval++ : console.log("no match") : null,

                        item.types[0] == "route" ? street == item.long_name ? tmpval++ : console.log("no match") : '',

                        item.types[0] == "locality" ? response.data[0].addressComponents.suburb == item.short_name ? tmpval++ : console.log("no match") : '',

                        item.types[0] == "administrative_area_level_1" ? response.data[0].addressComponents.state == item.short_name ? tmpval++ : console.log("no match") : '',

                        item.types[0] == "postal_code" ? response.data[0].addressComponents.postCode == item.long_name ? tmpval++ : console.log("no match") : ''

                    ));
                    if(tmpval == 5){
                        setAllProperties(response.data)
                        getPropertie(response.data);
                        console.log("allProperties")
                        tmp1= 0;
                    }else{
                        setAllProperties({tmp:'empty'})
                        tmp1= 0;
                    }

                }

            });
        
    }
    
    
    async function getPropertie(data){
        var token = cookies.get("tokens");
        
        if(data != "" || data != null || data != undefined){
            if(data[0] != "" || data[0] != null || data[0] != undefined){
                
                if(tmp == 1){ 
                   
                    if(data[0].id != undefined || data[0].id != null || data[0].id != ''){
                        var config = {
                            method: 'get',
                            url: 'https://api.domain.com.au/v1/properties/'+data[0].id,
                            headers: { 
                                'Authorization': 'Bearer '+token,               
                            }
                        };
                        
                        axios(config)
                        .then(function (response) {
                            setProperties(response.data);
                            
                            setImage(response.data.photos[0].fullUrl);
                            console.log(image) 
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                        tmp = 0;
                    }
                   
                }
            }
        }
        

        
    }


   


    return (
        <div>
            <Image src={image != "" ? image : CardIamge1} style={{ borderRadius:'40px' }} className="w-100"></Image>
        </div>
    )
}
