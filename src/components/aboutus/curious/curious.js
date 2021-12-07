import React from 'react'
import { Col, Row } from 'react-bootstrap'

function Curious() {
    return (
        <Row className="curious_sec">
            <Col md={4}>
                <div className="curious_set">
                    <div className="text-center d-flex justify-content-center">
                        <div className="p-3 aboutus-curious-no">
                            <p className="aboutus-curious-no-text">1</p>
                        </div>
                    </div>
                    <div className="set_curious_block">
                        <p className="aboutus-text text-center">
                            Simply look up the address you need a 
                            report for; if there is an existing report
                            you can purchase it immediately and
                            download it via our portal.
                        </p>
                    </div>
                </div>
            </Col>
            <Col md={4}>
                <div className="curious_set">
                    <div className="text-center d-flex justify-content-center">     
                        <div className="p-3 aboutus-curious-no">
                            <p className="aboutus-curious-no-text">2</p>
                        </div>
                    </div>
                    <div className="set_curious_block">
                        <p className="aboutus-text text-center abouts-curious">
                            If you need to order a new report, click
                            purchase new report and enter your 
                            information and a report will be 
                            delivered to you within the following days.
                        </p>
                    </div>
                </div>
            </Col>
            <Col md={4}>
                <div className="curious_set">
                    <div className="text-center d-flex justify-content-center">
                        <div className="p-3 aboutus-curious-no">
                            <p className="aboutus-curious-no-text">3</p>
                        </div>
                    </div>
                    <div className="set_curious_block">
                        <p className="aboutus-text text-center">
                            No need to pick up a phone or call 
                            around you can simply purchase a 
                            report through us, and we do the work 
                            for you.
                        </p>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default Curious
