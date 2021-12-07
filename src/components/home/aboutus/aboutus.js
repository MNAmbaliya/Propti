import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import {Link} from 'react-router-dom'

// import reasources
import '../../../assets/css/aboutus.css'
import Icon1 from '../../../assets/images/icons/aboutus_icon1.svg'
import Icon2 from '../../../assets/images/icons/aboutus_icon2.svg'
import Icon3 from '../../../assets/images/icons/aboutus_icon3.svg'

function AboutUs() {
    return (
        <div className="aboutus-root">
            <p className='home-section-title-1'>ABOUT US</p>
            <div className='d-flex justify-content-between align-items-center set_aboutus_root'>
                <p className='home-section-title'>Perfect Place For<br/> property Search</p>
                <p className='about-title-content'>
                    Established in 2020, Propti is a property portal that offers <br />
                    solutions to your property reporting needs. We can save you <br />
                    time, money, and stress whether you're a solicitor, buyers <br />
                    agent, real estate agent, or buyer.
                </p>
            </div>
            <Row className='my-2'>
                <Col md={4}>
                    <Card className='aboutus-card'>
                        <div className='aboutus-card-icon-border-1 mr-auto d-flex'>
                            <div className='aboutus-card-icon-border-2'>
                                <Card.Img variant="top" src={Icon1} className="aboutus-card-icon"></Card.Img>
                            </div>
                        </div>
                        <div className='mt-4 mb-0'>
                            <Card.Title className='aboutus-card-title'>Strata Reports</Card.Title>
                            <Card.Text className='aboutus-card-text'>An in-depths report of the history, costs, issues, and plans involved regarding...</Card.Text>
                            <Link to="./search/strata" className='aboutus-card-link'>Order now</Link>
                        </div>
                    </Card>
                </Col>
                <Col  md={4}>
                    <Card className='aboutus-card'>
                        <div className='aboutus-card-icon-border-1 mr-auto d-flex'>
                            <div className='aboutus-card-icon-border-2 set_building_icon'>
                                <Card.Img variant="top" src={Icon2} className="aboutus-card-icon"></Card.Img>
                            </div>
                        </div>
                        <div className='mt-4 mb-0'>
                            <Card.Title className='aboutus-card-title'>Building & Pest Reports</Card.Title>
                            <Card.Text className='aboutus-card-text'>States the potential issues the complex may have externally...</Card.Text>
                            <Link to="./Inspection" className='aboutus-card-link'>Order now</Link>
                        </div>
                    </Card>
                </Col>
                <Col  md={4}>
                    <Card className='aboutus-card'>
                        <div className='aboutus-card-icon-border-1 mr-auto d-flex'>
                            <div className='aboutus-card-icon-border-2'>
                                <Card.Img variant="top" src={Icon3} className="aboutus-card-icon"></Card.Img>
                            </div>
                        </div>
                        <div className='mt-4 mb-0'>
                            <Card.Title className='aboutus-card-title'>Valuations</Card.Title>
                            <Card.Text className='aboutus-card-text'>A detailed report of the true value of a property that you wish to sell or settle on</Card.Text>
                            <Link to="./valuation" className='aboutus-card-link'>Order now</Link>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default AboutUs
