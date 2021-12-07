import React from 'react'
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap'

function PortalSearchBox() {
    return (
        <div>
            <Form>
                <Row className="my-4">
                    <Col md={5} className="portal-search-block" >
                        <Button className="portal-search-button position-absolute">Search</Button>
                        <Form.Control type="text" className="portal-search-box w-100 app-text" placeholder="Enter the address you need a valution for "></Form.Control>
                    </Col>
                    <Col md={7} className="d-flex justify-content-end portal-shortby">
                        <Form.Control as="select" className="w-25 portal-search-select app-text">
                            <option>Short By</option>
                            <option>Short By</option>
                        </Form.Control>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default PortalSearchBox
