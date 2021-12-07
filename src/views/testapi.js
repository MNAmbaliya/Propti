import React from 'react'
import axios from 'axios'
import { Button, Col, Container, Form, FormGroup, Image, Row } from 'react-bootstrap'


export default function Testapi() {
    
    var axios = require('axios');
    var qs = require('qs');
    var data = qs.stringify({
        'client_id': 'client_4f363bc816d8d1a65e65e6cdbf032256',
        'client_secret': 'secret_9c5900c75a8fb3bb5764280ed74a5120',
        'scope': 'api_agencies_read api_listings_read',
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
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });


    async function get_address(){
        var axios = require('axios');
        var FormData = require('form-data');
        var data = new FormData();

        var config = {
        method: 'get',
        url: 'https://api.domain.com.au/sandbox/v1/properties/_suggest?terms=100+Harris+St%2C+Pyrmont&channel=All &pageSize=20',
        headers: { 
            'Authorization': 'Bearer b43524770ea0b3a20cf2e7a15dd3d454'
        },
        data : data
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

    }

    return (
        <div>
            <Button onClick={
                ()=>get_address()
            }>test</Button>
        </div>
    )
}
