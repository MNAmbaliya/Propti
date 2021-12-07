import React, { useEffect } from 'react'
import {Navbar,Accordion, Card, Row, Col, Image, Button} from 'react-bootstrap'
import axios from 'axios'
import { jsPDF } from "jspdf";
import PropertyImage from '../../../assets/images/svg/property_home_image.svg'
import Logo from '../../../assets/images/logo/logo.png';
import Line from '../../../assets/images/pdf/line.png';
import call from '../../../assets/images/pdf/call.png';
import mail from '../../../assets/images/pdf/mail.png';
import site from '../../../assets/images/pdf/internet.png';
import loaction from '../../../assets/images/pdf/loaction.png';
import bottom from '../../../assets/images/pdf/bottom.png';
import bg1 from '../../../assets/images/pdf/background1.png';
import bg2 from '../../../assets/images/pdf/background2.png';
import CardIamge1 from  '../../../assets/images/svg/notfound.png';

function DownloadReport(props) {

    const [agent, setAgent] = React.useState([]);
    
    async function download(e){
        console.log(props.count);
        const content = document.getElementById("pdfFile"+props.count);

        var doc = new jsPDF('p', 'pt', 'a4');

        doc.html(content, {
            callback: function(doc) {
                doc.save("Authority Doc.pdf");
            }
        });
    }

    async function getAgentDetails(){
        const agent = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:"getUserByName",
                agent:props.agent
            }
        );
        setAgent(agent.data[0]);
    }

    useEffect(
        ()=>{
            getAgentDetails()
        }, []
    )

    return (
        <>
            <div className="order-process-row">
            
                <Accordion>
        
                    <Card>
                        <Card.Header className="px-0">
                            <Accordion.Toggle as={'div'} variant="link" eventKey="0">
                                <Row className="mx-0 px-md-3 py-2 px-2  portal-tale-text text-muted">
                                    <Col xs={4}>
                                        <p>{props.address}</p>
                                    </Col>
                                    <Col xs={1}>
                                        <p>${props.price} </p>
                                    </Col>
                                    <Col xs={2}>
                                        <p>{props.agent}</p>
                                    </Col>
                                    <Col xs={2}>
                                        <p>{props.date}</p>
                                    </Col>
                                    <Col xs={2}>
                                        <p>{props.date}</p>
                                    </Col>
                                    <Col xs={1}>
                                        <p className="text-primary">Details</p>
                                    </Col>
                                </Row>
                            </Accordion.Toggle>
                        </Card.Header>
                    </Card>
        
                    <Accordion.Collapse eventKey="0" className="portal-more-collapse">
        
                        <Card.Body>
                            <Row>
                                <Col xs={3}>
                                    <Image src={props.file != "" ? props.file : CardIamge1} style={{ width: "275px",height: "183px",borderRadius:"14px"}}/>
                                </Col>
                                <Col xs={9}>
                                    <p className="my-1 portal-property-title">{props.address}</p>
                                    <Row>
                                        <Col xs={3}><p className="my-1 portal-tale-text ">Turn and Round Time:</p></Col>
                                        <Col xs={2}><p className="my-1 portal-tale-text text-primary">{props.report}</p></Col>
                                        <Col xs={2}><p className="my-1 portal-tale-text ">Vendor:</p></Col>
                                        <Col xs={2}><p className="my-1 portal-tale-text text-primary">{props.agent}</p></Col>
                                    </Row>
                                    <Row>
                                        <Col xs={3}><p className="my-1 portal-tale-text ">Price($):</p></Col>
                                        <Col xs={2}><p className="my-1 portal-tale-text text-primary">{props.price}</p></Col>
                                    </Row>
                                    <Row>
                                        <Col xs={3}>
                                            <p className="my-1 portal-tale-text">Agent:</p>
                                            <p className="my-1 portal-tale-text">Date:</p>
                                        </Col>
                                        <Col xs={2}>
                                            <p className="my-1 portal-tale-text text-primary">{props.agent}</p>
                                            <p className="my-1 portal-tale-text text-primary">{props.date}</p>
                                        </Col>
                                        <Col xs={2}>
                                            <Button 
                                                onClick={
                                                    (e)=>download(e)
                                                }
                                            className="portal-tale-text portal-account-detail-button">Download</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Body>
                
                    </Accordion.Collapse>
                </Accordion>

                
                
            </div>
            <div style={{display:"none"}}>
                
                <div id={"pdfFile"+props.count} style={{ width:"595px", position:"relative" }}>
                    <Image src={bg1} className="logo-image" style={{ position:"absolute", right:"14%", top:"5%" }} ></Image>
                    <Image src={bg2} className="logo-image" style={{ position:"absolute", bottom: "20%" }} ></Image>

                    <div style={{ paddingLeft:"20px", paddingRight:"20px" }}>
                        <div> 
                            <Navbar.Brand><Image src={Logo} className="logo-image"></Image></Navbar.Brand>
                            <Image src={Line} style={{
                                width:" 68%",
                                float: "right",
                                padding: "36px 0 0 0"
                            }}></Image>
                        </div>
                        <div style={{ display:"block", justifyContent:"space-between", paddingTop:"40px" }}>
                                <p style={{ fontSize:"12px" }}>
                                    Strata Report
                                </p>
                            {/* <Image src={props.file != "" ? props.file : CardIamge1} style={{ width: "275px",height: "166px",borderRadius:"14px"}}/> */}
                            
                            <p style={{ position: "relative", width: "26%",fontSize:"12px" }}>

                                <span style={{ position: "absolute", width:" max-content", left: "0", bottom: "0"}} >
                                    {/* Date: {formData.date} */}
                                </span>
                            </p>
                        </div>
                        <div style={{ textAlign:"left", paddingTop:"0px" }}>

                            {/* <h1 style={{ fontSize:"20px", fontWeight:"bold", color:"#313131", wordSpacing:"5px" }} >Re:&nbsp;&nbsp; AUTHORITY FOR STRATA RECORD</h1> */}

                            
                        </div>
                        <div style={{paddingTop:"66px"}} >
                            <h2 style={{ fontSize:"19px", fontWeight:"bold", color:"#1D83FF" }} >Client Details: </h2>
                        </div>
                        <div className="drawLine" style={{ width: "100%", height: "1px", backgroundColor:"#616161" }} ></div>
                        <div style={{ color:"#313131", fontSize:"12px", fontWeight:"600", paddingTop:"16px" }}>
                            
                            <p>
                                <strong>Strata Address  : </strong> {props.address} <br/>
                                <strong>Client Name : </strong> {props.clientName} <br/>
                                <strong>Client Email : </strong> {props.clientEmail} <br/>
                                <strong>Client Mobile : </strong> {props.clientMobile} <br/>
                                <strong>For  : </strong> {props.forWhat} <br/>
                                
                            </p>
                            
                        </div>
                        <div style={{paddingTop:"60px"}} >
                            <h2 style={{ fontSize:"19px", fontWeight:"bold", color:"#1D83FF" }} >Agent Details: </h2>
                        </div>
                        <div className="drawLine" style={{ width: "100%", height: "1px", backgroundColor:"#616161" }} ></div>
                        <div style={{ color:"#313131", fontSize:"12px", fontWeight:"600", paddingTop:"16px" }}>
                            
                            <p>
                                <strong>Agent Name  : </strong> {agent.name} <br/>
                                <strong>Agent Email  : </strong> {agent.email} <br/>
                            </p>
                            
                        </div>
                        

                        <div className="drawLine" style={{ width: "100%", height: "1px", backgroundColor:"#616161",marginTop:"40px" }} ></div>
                    


                        <div style={{paddingTop:'70px'}}>
                            <div style={{ display:"flex" }} >
                                <Image src={call} style={{ width:"19px", height:"19px" }}></Image>
                                <p style={{ paddingLeft:"12px", fontSize:"11px" }} >(405) 555-0128</p>
                            </div>
                            <div style={{ display:"flex" }} >
                                <Image src={mail} style={{ width:"23px", height:"19px" }}></Image>
                                <p style={{ paddingLeft:"12px", fontSize:"11px" }} >abc@gmail.com</p>
                            </div>
                            <div style={{ display:"flex" }} >
                                <Image src={site} style={{ width:"19px", height:"19px" }}></Image>
                                <p style={{ paddingLeft:"12px", fontSize:"11px" }} >www.propti.au.com</p>
                            </div>
                            <div style={{ display:"flex" }} >
                                <Image src={loaction} style={{ width:"14px", height:"18px", marginLeft:"2px" }}></Image>
                                <p style={{ paddingLeft:"12px", fontSize:"11px" }} >6391 Elgin St. Celina, Delaware 10299</p>
                            </div>
                        </div>

                    
                    </div>
                    <div>
                        <Image src={bottom} style={{ width:"100%" }}></Image>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DownloadReport
