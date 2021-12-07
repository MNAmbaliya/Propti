import React from 'react'
import { Accordion, Image, ListGroup, ListGroupItem, Button, Card } from 'react-bootstrap'
import {Link} from 'react-router-dom'

import Logo from '../../../assets/images/logo/logo.svg'
import HomeIcon from '../../../assets/images/icons/admin_home_icon.svg'
import PaymentIcon from '../../../assets/images/icons/admin_payment_icon.svg'
import DownloadIcon from '../../../assets/images/icons/admin_download_icon.svg'
import OrderIcon from '../../../assets/images/icons/admin_order_icon.svg'
import DatabaseIcon from '../../../assets/images/icons/admin_database_icon.svg'

function SideBar() {
    return (
        <div>
            <div className="side-bar-desktop">
                <div className="d-flex justify-content-center py-4">
                    <Image src={Logo} className="admin-logo"/>
                </div>
                <div className="mt-5 d-flex justify-content-center">
                    <ListGroup>
                        {
                            list_item.map(
                                (item)=>(
                                    <ListGroupItem key={item.name} className="border-0">
                                        <div className="d-flex align-items-center">
                                            <Image src={item.icon}/>
                                            <Link to={item.link} className="text-decoration-none text-dark admin-sidebar-link my-0 ml-3 admin-text">
                                               {item.name}
                                            </Link>
                                        </div>
                                    </ListGroupItem>
                                )
                            )
                        }
                    </ListGroup>
                </div>
                <div className="px-5  position-absolute" style={{bottom:'0'}}>
                    <div className="d-flex">
                        <a href="#" className="text-decoration-none px-2 py-1 admin-text text-primary">Privacy policy</a>
                        <a href="#" className="text-decoration-none px-2 py-1 admin-text text-primary">Terms & Conditions</a>
                    </div>
                    <p className="admin-text px-2 py-1 admin-text text-primary text-muted">Atriangle @2020</p>
                </div>
            </div>
            <div className="side-bar-mobile">
                <div>
                    <Accordion>
                        <Card>
                            <Card.Header className="border-0 bg-white">
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                    <div className="d-flex justify-content-between">
                                        <Image src={Logo} className="admin-logo"/>
                                    </div>
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <ListGroup>
                                        {
                                            list_item.map(
                                                (item)=>(
                                                    <ListGroupItem key={item.name} className="border-0">
                                                        <div className="d-flex align-items-center">
                                                            <Image src={item.icon}/>
                                                            <Link to={item.link} className="text-decoration-none text-dark admin-sidebar-link my-0 ml-3 admin-text">
                                                                {item.name}
                                                            </Link>
                                                        </div>
                                                    </ListGroupItem>
                                                )
                                            )
                                        }
                                    </ListGroup>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </div>
            </div>
        </div>
    )
}

const list_item = [
    {
        icon: HomeIcon,
        name:'Dashboard',
        link:'/admin'
    },
    {
        icon: PaymentIcon,
        name:'Payment & Earnings',
        link:'/admin/earning'
    },
    {
        icon: DatabaseIcon,
        name:'Database',
        link:'/admin/database'
    },
    {
        icon: HomeIcon,
        name:'Properties',
        link:'/admin/properties'
    },
    {
        icon: OrderIcon,
        name:'Orders',
        link:'/admin/orders'
    },
    {
        icon: DownloadIcon,
        name:'Downloads',
        link:'/admin/download'
    },
    {
        icon: OrderIcon,
        name:'Wall Post',
        link:'/admin/wallpost'
    },
    {
        icon: DownloadIcon,
        name:'Input Blog',
        link:'/admin/inputblog'
    },
    
]
export default SideBar
