import React, { useEffect } from 'react'
import {Accordion, Card, Row, Col, Image, Button} from 'react-bootstrap'

import PropertyImage from '../../../assets/images/svg/property_home_image.svg'

function  AgentItem(props) {
    console.log(props);
    return (
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
                                            <Image src={PropertyImage}/>
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
                                                    <Button className="portal-tale-text portal-account-detail-button">{props.status}</Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card.Body>
                        
                            </Accordion.Collapse>
                        </Accordion>
                    
            
        </div>
    )
}

export default AgentItem
