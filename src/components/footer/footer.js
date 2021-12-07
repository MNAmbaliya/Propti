import React from 'react';
import { Accordion, Card, Col, Button, Image, Row, Container } from 'react-bootstrap';
import {Link} from "react-router-dom";
// import reasources
import { useHistory } from 'react-router-dom'
import '../../assets/css/footer.css';
import Logo from '../../assets/images/logo/logo.png'

function Footer() {
    const history = useHistory();
    async function ContactUs(){
        history.push({
            pathname: '/',
            state: { 
                scroll:"bottom"
            },
            
        });
        window.scrollTo(0,document.body.scrollHeight);

    }

    

    return (
        <div className="w-100 mt-auto">
            <Container>
                <div className="footer-root">
                    <div className="footer-desktop">
                        <Row>
                            <Col className="col-3">
                                <Link to="/"><Image src={Logo} className="footer-logo"></Image></Link>
                                <p className="footer-text my-3">
                                The home of property reports <br/>
                            
                                </p>
                            </Col>
                            <Col className="col-2 no_space">
                                <p className="footer-title">About</p>
                                <Link className="footer-link" to="/about"><p className="footer-text py-1">About Us</p></Link>
                                {
                                    localStorage.getItem('userId') != null  ? 
                                        <Link className="footer-link" to="/wall"><p className="footer-text py-1">Wall</p></Link>
                                    : '' 
                                }
                                <Link className="footer-link" to="/blog"><p className="footer-text py-1">Latest Articles</p></Link>
                                <Link className="footer-link" to="/faqs"><p className="footer-text py-1">FAQS</p></Link>
                                {/* <Link className="footer-link" to="/"><p className="footer-text py-1">Insurance Needs</p></Link> */}
                            </Col>
                            <Col className="col-2">
                                <p className="footer-title">Order Report</p>
                                <Link className="footer-link" to="/search/strata"><p className="footer-text py-1">Strata Report</p></Link>
                                <Link className="footer-link" to="/depreciation"><p className="footer-text py-1">Depreciation Report</p></Link>
                                <Link className="footer-link" to="/Inspection"><p className="footer-text py-1">Building Report</p></Link>
                                <Link className="footer-link" to="/valuation"><p className="footer-text py-1">Valuation Report</p></Link>
                            </Col>
                            <Col className="col-3" style={{paddingLeft: "68px"}}>
                            <p className="footer-title">Support</p>
                            <Link className="footer-link" to="/signup"><p className="footer-text py-1">Partner With Us</p></Link>
                            <Link className="footer-link" to="/authority-document"><p className="footer-text py-1">Authority Document</p></Link>
                            <Link className="footer-link" to="./service"><p className="footer-text py-1">Find an Agent</p></Link>
                            <a className="footer-link" onClick={()=>ContactUs()}><p className="footer-text py-1">Contact Us</p></a>
                            </Col>
                            <Col className="col-2">
                                <p className="footer-title">Legalities</p>
                                <Link className="footer-link" to="/privacy-policy"><p className="footer-text py-1">Privacy policy</p></Link>
                                <Link className="footer-link" to="/term-use"><p className="footer-text py-1">Terms of Use</p></Link>
                            </Col>
                        </Row>
                    </div>
                    <div className='footer-mobile'>
                        <Image src={Logo}></Image>
                        <p className="footer-text my-3">
                            The home of property reports
                        </p>
                        <Accordion accessKey={0}>
                            <Card className="border-0">
                                <Card.Header className="bg-white">
                                    <Accordion.Toggle  as={Button} variant="link" eventKey="0">
                                        <p className="footer-title px-0">About</p>
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse  eventKey="0">
                                    <Card.Body>
                                        <Link className="footer-link" to="/about"><p className="footer-text py-1">About Us</p></Link>
                                        {
                                            localStorage.getItem('userId') != null  ? 
                                                <Link className="footer-link" to="/wall"><p className="footer-text py-1">Wall </p></Link>
                                            : '' 
                                        }
                                        <Link className="footer-link" to="/blog"><p className="footer-text py-1">Latest Articles</p></Link>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card className="border-0">
                                <Card.Header className="bg-white">
                                    <Accordion.Toggle  as={Button} variant="link" eventKey="1">
                                        <p className="footer-title px-0">Quick Link</p>
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse  eventKey="1">
                                    <Card.Body>
                                        <Link className="footer-link" to="/search/strata"><p className="footer-text py-1">Order Report</p></Link>
                                        <Link className="footer-link" to="/signup"><p className="footer-text py-2">Partner With Us</p></Link>
                                        {
                                            localStorage.getItem('userId') != null  ? 
                                                <Link className="footer-link" to="/wall"><p className="footer-text py-1">Wall</p></Link>
                                            : '' 
                                        }
                                        <Link className="footer-link" to="/service"><p className="footer-text py-1">Find an Agent</p></Link>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card className="border-0">
                                <Card.Header className="bg-white">
                                    <Accordion.Toggle  as={Button} variant="link" eventKey="2">
                                        <p className="footer-title px-0">Support</p>
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse  eventKey="2">
                                    <Card.Body>
                                        <Link className="footer-link" to="/login"><p className="footer-text py-1">Account</p></Link>
                                        <Link className="footer-link" to="/authority-document"><p className="footer-text py-1">Authority Document</p></Link>
                                        <Link className="footer-link" to="/faqs"><p className="footer-text py-1">FAQS</p></Link>
                                        <a className="footer-link" onClick={()=>ContactUs()}><p className="footer-text py-1">Contact Us</p></a>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card className="border-0">
                                <Card.Header className="bg-white">
                                    <Accordion.Toggle  as={Button} variant="link" eventKey="3">
                                        <p className="footer-title px-0s">Legalities</p>
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse  eventKey="3">
                                    <Card.Body>
                                       <Link className="footer-link" to="/privacy-policy"><p className="footer-text py-1">Privacy policy</p></Link>
                                       <Link className="footer-link" to="/term-use"><p className="footer-text py-1">Terms of Use</p></Link> 
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </div>
                </div>
            </Container>
            <div className="w-100 footer-bottom-line mt-5">
            </div> 
         </div>
    )
}

export default Footer
