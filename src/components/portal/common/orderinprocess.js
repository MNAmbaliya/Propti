import React, { useEffect } from 'react'
import { Form,Accordion, Card, Col, Image, Row, Button } from 'react-bootstrap'
import PortalSearchBox from './portalsearchbox'
import axios from 'axios'
import PropertyImage from '../../../assets/images/svg/property_home_image.svg'
import AgentItem from './agentItem'

function Download() {

    const [orderDetails, setOrderDetails] = React.useState([]);
    const [orderDetails1, setOrderDetails1] = React.useState([]);
    
    async function getOrderHistory(){
        
        if(localStorage.getItem('userId') != undefined){
            const user = await axios.post(
                process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
                {
                    action:"getUser",
                    id:localStorage.getItem('userId')
                }
            );
            
            const res = await axios.post(
                process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
                {
                    action:"getUserAgent",
                    agent:user.data[0].name  
                }
            );
            
            
            if(res != null){
                if(res.data != undefined){
                    if(res.data[0] != "nodata"){
                        setOrderDetails(res.data);
                        setOrderDetails1(res.data);
                    }else{
                        setOrderDetails(res.data[0]);
                        setOrderDetails1(res.data[0]);
                        
                    }
                }
            }
        } 
    }

    useEffect(
        ()=>{
            getOrderHistory()
        }, []
    )


    async function searchRecord(event){
        var updatedList = orderDetails1;

        if(event.target.value != ""){
            updatedList = updatedList.filter(function(item){
            
                return item.address.toLowerCase().search(
                    event.target.value.toLowerCase()
                ) !== -1;
            });
            setOrderDetails(updatedList);
        }else{
            setOrderDetails(orderDetails);
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
        var regex = /[A-Za-z0-9 ]|\./;
        if( !regex.test(key)) {
            theEvent.returnValue = false;
            if(theEvent.preventDefault) theEvent.preventDefault();
        }
    }


    return (
        <div className="set-order-block">
            <Form>
                <Row className="my-4">
                    <Col md={5} className="portal-search-block" >
                        <Button className="portal-search-button position-absolute">Search</Button>
                        <Form.Control type="text" className="portal-search-box w-100 app-text" placeholder="Enter the address you need a valution for "
                            onKeyPress= {
                                (e)=>validate(e)
                            }

                            onKeyUp={
                                (e)=>searchRecord(e)
                            }

                        ></Form.Control>
                    </Col>
                    <Col md={7} className="d-flex justify-content-end portal-shortby">
                        <Form.Control as="select" className="w-25 portal-search-select app-text">
                            <option>Short By</option>
                            <option>Short By</option>
                        </Form.Control>
                    </Col>
                </Row>
            </Form>
            <div className="portal-table table-responsive">
                <div className="portal-table-content">
                    <Row className="mx-0 px-md-3 py-2 px-2 portal-tale-text portal-table-header">
                        <Col xs={4}>
                            <p className="my-1">Address</p>
                        </Col>
                        <Col xs={1}>
                            <p className="my-1">Price($)</p>
                        </Col>
                        <Col xs={2}>
                            <p className="my-1">Agent Name</p>
                        </Col>
                        <Col xs={2}>
                            <p className="my-1">Date & Time</p>
                        </Col>
                        <Col xs={2}>
                            <p className="my-1">Turn and Round Time</p>
                        </Col>
                        <Col xs={1}>
                            <p className="my-1">Action  </p>
                        </Col>
                    </Row>
                    {  orderDetails != "nodata" &&

                        orderDetails.map(
                            (item)=>(
                                <AgentItem address={item.address} id={item.order_id} price={item.price} agent={item.agent} date={item.date} report={item.report} status={item.status} ></AgentItem>
                            )
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Download
