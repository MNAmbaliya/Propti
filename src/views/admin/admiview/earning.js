import React from 'react'
import { Breadcrumb, Navbar, Form, Image, Row, Col, Table, Button, ListGroup, FormCheck } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import SideBar from '../../../components/admin/basic/sidebar'
import AdminNavbar from '../../../components/admin/basic/navbar'
import DownloadButton from '../../../assets/images/icons/admin_download_button_icon.svg'
import Areachart from '../../../components/admin/basic/areachart'
import EditPenIcon from '../../../assets/images/icons/edit_pen_icon.svg'
import DeleteIcon from '../../../assets/images/icons/delete_icon.svg'
import PaymentCardIcon1 from '../../../assets/images/icons/payment_card_icon1.svg'
import PaymentCardIcon2 from '../../../assets/images/icons/payment_card_icon2.svg'
import PaymentCardIcon3 from '../../../assets/images/icons/payment_card_icon3.svg'
import Notifications from '../../../components/admin/basic/notifications'
import Barchart from '../../../components/admin/basic/barchart'
import TrendUPIcon from '../../../assets/images/icons/trend_up_icon.svg'
import TrendDownIcon from '../../../assets/images/icons/trend_down_icon.svg'
import DollorIcon from '../../../assets/images/icons/dollor_icon.svg'
import PulseIcon from '../../../assets/images/icons/pulse_icon.svg'
import BoxIcon from '../../../assets/images/icons/box_icon.svg'

function Earning() {
    return (
        <div>
            <SideBar/>
            <div className="admin-content">
                <AdminNavbar/>
                <Navbar>
                    <Navbar.Brand> 
                        <div>
                            <p className="admin-title m-0 p-0 text-muted">Earning</p>
                            <Breadcrumb className="admin-breadcrumb"> 
                                <Breadcrumb.Item href="/admin" className="my-0 admin-text text-muted">admin</Breadcrumb.Item>
                                <Breadcrumb.Item active className="my-0 admin-text text-primary">Earning</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Form inline className="px-3">
                            <Form.Group>
                                <Form.Control as='select'>
                                    <option>Today: Feb 1</option>
                                    <option>Today: Feb 2</option>
                                    <option>Today: Feb 3</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                        <Image src={DownloadButton}></Image>
                    </Navbar.Collapse>
                </Navbar>
                <div className="w-100 px-3 mx-0">
                    <Row className="mx-0  my-2">
                        {
                            situation_data.map(
                                (item)=>(
                                    <Col md={3} key={item.type} >
                                            <div className="admin-card p-3">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div>
                                                        <p className="admin-text"> <strong>{item.type}</strong></p>
                                                        <p className="admin-title text-primary"> <strong>{item.amount}</strong></p>
                                                        {
                                                            item.progress>0
                                                                ?
                                                                    <p className="admin-text">
                                                                        <span><img src={TrendUPIcon}></img></span> <span className="text-success">{Math.abs(item.progress)}%</span><span className="text-muted"> More than Previous</span>
                                                                    </p>
                                                                :
                                                                    <p className="admin-text">
                                                                        <span><img src={TrendDownIcon}></img></span> <span className="text-danger">{Math.abs(item.progress)}%</span><span className="text-muted"> More than Previous</span>
                                                                    </p>
                                                        }
                                                    </div>
                                                    <Image src={item.icon}></Image>
                                                </div>
                                            </div>
                                    </Col>
                                )
                            )
                        }
                    </Row>
                </div>
                <div className="w-100 px-3 mx-0">
                    <div className='admin-card p-2 w-100'>
                        <div className="d-flex justify-content-between align-items-center px-2 py-2 admin-navbar">
                            <p className="my-0 text-primary admin-text">Earning Trends</p>
                            <Form inline className="px-1">
                                <Form.Group>
                                    <Form.Control as='select'>
                                        <option>This Month</option>
                                        <option>This Week</option>
                                        <option>This Day</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </div>
                        <div className="p-4">
                            <Areachart/>
                        </div>
                    </div>
                    <Row className="mx-0  my-2">
                        <Col md={6} className="px-1">
                            <div className="admin-card">
                                <div className="d-flex justify-content-between align-items-center px-2 py-2 admin-navbar">
                                    <p className="my-0 text-primary admin-text">Recent Orders</p>
                                    <Form inline className="px-1">
                                        <Form.Group>
                                            <Form.Control as='select'>
                                                <option>This Month</option>
                                                <option>This Week</option>
                                                <option>This Day</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form>
                                </div>
                                <div className="mt-4 px-4 table-responsive">
                                    <Table  hover size="lg" className="admin-text">
                                        <thead>
                                            <tr>
                                                <td>ID</td>
                                                <th>Name</th>
                                                <th>Date</th>
                                                <th>Amount</th>
                                                <th className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                recent_order_data.map(
                                                    (item)=>(
                                                        <tr key={item.id}>
                                                            <td>{item.id}</td>
                                                            <td>{item.name}</td>
                                                            <td>{item.date}</td>
                                                            <td>{item.amount}</td>
                                                            <td>
                                                                <div className="d-flex justify-content-center align-items-center">
                                                                    <Image src={EditPenIcon} />
                                                                    <Image className="ml-3" src={DeleteIcon}/>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                )
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </Col>
                        <Col md={3} className="px-1">
                            <div className="admin-card">
                                <div className="d-flex justify-content-between align-items-center px-2 py-3 admin-navbar">
                                    <p className="my-0 text-primary admin-text">Payment method</p>
                                </div>
                                <ListGroup className="border-0 mt-2">
                                    <ListGroup.Item  className="m-1 admin-card p-2">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <Image src={PaymentCardIcon1}/>
                                            <p className="my-0 admin-text">Mater Card</p>
                                            <FormCheck 
                                                id="switchEnabled"
                                                type="switch"
                                                // checked={this.state.settings.enabled}
                                                // onChange={this.toggleEnabled}
                                                // label="Mater Card"
                                            />
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item  className="m-1 admin-card p-2">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <Image src={PaymentCardIcon2}/>
                                            <p className="my-0 admin-text">Mater Card</p>
                                            <FormCheck 
                                                id="switchEnabled"
                                                type="switch"
                                                // checked={this.state.settings.enabled}
                                                // onChange={this.toggleEnabled}
                                                // label="Mater Card"
                                            />
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item  className="m-1 admin-card p-2">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <Image src={PaymentCardIcon3}/>
                                            <p className="my-0 admin-text">Mater Card</p>
                                            <FormCheck 
                                                id="switchEnabled"
                                                type="switch"
                                                // checked={this.state.settings.enabled}
                                                // onChange={this.toggleEnabled}
                                                // label="Mater Card"
                                            />
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item  className="mx-1 mb-2 mt-1 admin-card p-2">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <Image src={PaymentCardIcon1}/>
                                            <p className="my-0 admin-text">Mater Card</p>
                                            <FormCheck 
                                                id="switchEnabled"
                                                type="switch"
                                                // checked={this.state.settings.enabled}
                                                // onChange={this.toggleEnabled}
                                                // label="Mater Card"
                                            />
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>
                            </div>
                        </Col>
                        <Col md={3} className="px-1">
                            <div className="admin-card">
                                <div className="d-flex justify-content-between align-items-center px-2 py-3 admin-navbar">
                                    <p className="my-0 text-primary admin-text">Transactions</p>
                                </div>
                                <div className="mt-3 p-1 mb-2">
                                    {
                                        Notification_list.map(
                                            (item)=>(
                                                <Notifications key={item.id} Notification_list={item}/>
                                            )
                                        )                                    
                                    }
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mx-0  my-2">
                        <Col md={4} className="px-1">
                            <div className="admin-card">
                                <div className="d-flex justify-content-between align-items-center px-2 py-2 admin-navbar">
                                    <p className="my-0 text-primary admin-text">Earnings Trend</p>
                                    <Form inline className="px-1">
                                        <Form.Group>
                                            <Form.Control as='select'>
                                                <option>This Month</option>
                                                <option>This Week</option>
                                                <option>This Day</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form>
                                </div>
                                <div className="px-5 mt-2">
                                    <Barchart/>
                                </div>
                            </div>
                        </Col>
                        <Col md={4} className="px-1">
                            <div className="admin-card">
                                <div className="d-flex justify-content-between align-items-center px-2 py-2 admin-navbar">
                                    <p className="my-0 text-primary admin-text">Paid</p>
                                    <Form inline className="px-1">
                                        <Form.Group>
                                            <Form.Control as='select'>
                                                <option>This Month</option>
                                                <option>This Week</option>
                                                <option>This Day</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form>
                                </div>
                                <div className="px-5 mt-2">
                                    <Barchart/>
                                </div>
                            </div>
                        </Col>
                        <Col md={4} className="px-1">
                            <div className="admin-card">
                                <div className="d-flex justify-content-between align-items-center px-2 py-2 admin-navbar">
                                    <p className="my-0 text-primary admin-text">Income</p>
                                    <Form inline className="px-1">
                                        <Form.Group>
                                            <Form.Control as='select'>
                                                <option>This Month</option>
                                                <option>This Week</option>
                                                <option>This Day</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form>
                                </div>
                                <div className="px-5 mt-2">
                                    <Barchart/>
                                </div>
                            </div>
                        </Col>                        
                    </Row>
                    <div className="admin-card p-1">
                        <div>
                            <div className="d-flex justify-content-between align-items-center px-2 py-3 admin-navbar">
                                <p className="my-0 text-primary admin-text">Active Deposite</p>
                                <a className="my-0 text-primary admin-text  cursor-pointer text-decoration-none"> View all</a>
                            </div>
                            <div className="mt-2">
                                <Table hover>
                                    <thead className='rounded' style={{backgroundColor:'rgba(29, 131, 255, 0.2)'}}>
                                        <tr className="text-center">
                                            <th>PROPERTY</th>
                                            <th>PURCHAGERS</th>
                                            <th>DATE PURCHASED</th>
                                            <th>COST</th>
                                            <th>AGENT</th>
                                            <th>STATUS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                           active_deposite_data.map(
                                               (item)=>(
                                                    <tr className="text-center" key={item.id} style={{boxShadow:'5px 5px 10px rgba(29, 131, 255, 0.07)'}}>
                                                        <td>{item.property}</td>
                                                        <td>{item.perchasers}</td>
                                                        <td>{item.dataperchased}</td>
                                                        <td>{item.cost}</td>
                                                        <td>{item.agent}</td>
                                                        <td>{item.status}</td>
                                                    </tr>
                                               )
                                           ) 
                                        }
                                    </tbody>
                                </Table>
                            </div>
                            <div className="d-flex justify-content-between align-items-center px-2 py-3 admin-navbar">
                                <p className="my-0 text-primary admin-text">Closed Deposite (2)</p>
                                <a className="my-0 text-primary admin-text  cursor-pointer text-decoration-none"> View all</a>
                            </div>
                            <div className="mt-2">
                                <Table hover>
                                    <thead className='rounded' style={{backgroundColor:'rgba(29, 131, 255, 0.2)'}}>
                                        <tr className="text-center">
                                            <th>PROPERTY</th>
                                            <th>PURCHAGERS</th>
                                            <th>DATE PURCHASED</th>
                                            <th>COST</th>
                                            <th>AGENT</th>
                                            <th>STATUS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                           active_deposite_data.map(
                                               (item)=>(
                                                    <tr className="text-center" key={item.id} style={{boxShadow:'5px 5px 10px rgba(29, 131, 255, 0.07)'}}>
                                                        <td>{item.property}</td>
                                                        <td>{item.perchasers}</td>
                                                        <td>{item.dataperchased}</td>
                                                        <td>{item.cost}</td>
                                                        <td>{item.agent}</td>
                                                        <td>{item.status}</td>
                                                    </tr>
                                               )
                                           ) 
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-4 px-2 py-4 d-flex justify-content-between">
                    <p className="admin-text text-muted my-0">Atriangle @2020</p>
                    <p className="admin-text text-muted my-0">Made With Creativity By <Link to= "/" className='admin-link text-decoration-none'>IgnatiusLab </Link></p>
                </div>
            </div>
        </div>
    )
}

const situation_data = [
    {
        type:'Order',
        amount:'15,980',
        progress: 7.3,
        icon:DollorIcon
    },
    {
        type:'Returns',
        amount:'15,980',
        progress: -15.2,
        icon:PulseIcon
    },
    {
        type:'Average Income',
        amount:'15,980',
        progress: 5.4,
        icon:BoxIcon
    },
    {
        type:'Average Spend',
        amount:'15,980',
        progress: -23.5,
        icon:BoxIcon
    },
]

const recent_order_data = [
    {
        id:'3290',
        name:'Sharon Browsers',
        date:'May 23,2020',
        amount:'250',

    },
    {
        id:'3291',
        name:'Sharon Browsers',
        date:'May 23,2020',
        amount:'250',

    },
    {
        id:'3292',
        name:'Sharon Browsers',
        date:'May 23,2020',
        amount:'250',

    },
    {
        id:'3293',
        name:'Sharon Browsers',
        date:'May 23,2020',
        amount:'250',

    },
    {
        id:'3294',
        name:'Sharon Browsers',
        date:'May 23,2020',
        amount:'250',

    }

]

const Notification_list = [
    {
        id:1,
        icon:'note',
        content:'Bhavin updated status Refund #5824 to awaiting customer response.',
        time:10
    },
    {
        id:2,
        icon:'caus',
        content:'Bhavin updated status Refund #5824 to awaiting customer response.',
        time:10
    },
    {
        id:3,
        icon:'avatar',
        content:'Bhavin updated status Refund #5824 to awaiting customer response.',
        time:10
    },
];

const active_deposite_data = [
    {
        id:1,
        property:'5/1 Tba Street...',
        perchasers:6,
        dataperchased:"03/02/2021",
        cost: 275,
        agent:'Sam bender',
        status:'Ordered waiting to be sasained'
    },
    {
        id:2,
        property:'5/1 Tba Street...',
        perchasers:6,
        dataperchased:"03/02/2021",
        cost: 275,
        agent:'Sam bender',
        status:'Ordered waiting to be sasained'
    },
    {
        id:3,
        property:'5/1 Tba Street...',
        perchasers:6,
        dataperchased:"03/02/2021",
        cost: 275,
        agent:'Sam bender',
        status:'Ordered waiting to be sasained'
    }
]
export default Earning
