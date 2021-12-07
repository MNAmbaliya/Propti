import React from 'react'
import { Card, Col, Image, ProgressBar, Row } from 'react-bootstrap'
import ContractIcon from '../../../assets/images/icons/admin_contract_icon.svg'

function StatusCard(props) {
    return (
        <div>
            <Card className="admin-card">
                <Card.Body className="py-2 px-4">
                    <Row>
                        <Col xs={8}>
                            <p className="admin-text my-1"><b>{props.data.name}</b></p>
                            <p className="admin-title text-primary my-1">{props.data.task} Tasks</p>
                            <div className="d-flex justify-content-between">
                                <p className="admin-text my-1 text-muted">Progress</p>
                                <p className="admin-text my-1 text-primary">{props.data.progress}%</p>
                            </div>
                            <ProgressBar now={props.data.progress} variant={props.data.progress>20?"success":"danger"} style={{height:'5px'}}/>
                        </Col>
                        <Col xs={4}>
                            <Image src={ContractIcon} width={30}/>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    )
}

export default StatusCard
