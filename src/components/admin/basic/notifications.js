import React from 'react'
import { Col, Image, Row } from 'react-bootstrap'

import CautionIcon from '../../../assets/images/icons/caution_icon.svg'
import NotificationIcon from '../../../assets/images/icons/notification_icon.svg'
import NotificationIcon1 from '../../../assets/images/icons/norification2_icon.svg'

function Notifications(props) {
    return (
        <div className="container">
            <div className="notification-list py-2 ml-2 px-2">
                <div className="d-flex align-items-center my-2 justify-content-between">
                    <div className="admin-notification-icon ">
                        <div className="notification-icon-shape-out">
                            <div className='notification-icon-shape'>
                                <Image src={CautionIcon}></Image>
                            </div>
                        </div>
                    </div>
                    <Row>
                        <Col xs={8}>
                            <p className="my-1 admin-text ml-2">{props.Notification_list.content}</p>
                        </Col>
                        <Col xs={4}>
                            <p className="my-1 admin-text ml-1 text-center text-muted">{props.Notification_list.time} Min Ago</p>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default Notifications
