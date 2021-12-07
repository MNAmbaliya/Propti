import React from 'react'
import { Accordion, Card, Button, Image } from 'react-bootstrap'

function FaqsItem(props) {
    return (
        <div>
            <Accordion className="my-2">
                <Card className="border-0 bg-white faqs-item-card">
                    <Card.Header className="faqs-item-card-header bg-white ">
                        <Accordion.Toggle as={"div"} variant="link" eventKey="0" className="w-100" style={{cursor:"pointer"}}>
                            <div className="d-flex justify-content-between align-items-center py-2">
                                <p className="faqs-text my-0">{props.title}</p>
                                <p className="faqs-plus-icon my-0 text-primary">+</p>
                            </div>
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse  eventKey="0">
                        <Card.Body>
                            <div className="mx-md-5">
                                <p className="faqs-text my-0">{props.content}</p>
                            </div>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    )
}

export default FaqsItem
