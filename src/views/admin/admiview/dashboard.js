import React from 'react'
import { Breadcrumb, Navbar, Form, Image, Row, Col, Table, Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import '../../../assets/css/admin.css'
import DownloadButton from '../../../assets/images/icons/admin_download_button_icon.svg'
import SideBar from '../../../components/admin/basic/sidebar'
import AdminNavbar from '../../../components/admin/basic/navbar'
import StatusCard from '../../../components/admin/dashboard/statuscard'
import Areachart from '../../../components/admin/basic/areachart'
import Donut from '../../../components/admin/basic/donut'
import PurchaseIcon1 from '../../../assets/images/icons/admin_recently_purchase_icon_1.svg'
import PurchaseIcon4 from '../../../assets/images/icons/admin_recently_purchase_icon_4.svg'
import Notifications from '../../../components/admin/basic/notifications'
import GraphIcon1 from '../../../assets/images/icons/graph_icon_blue.svg'
import GraphIcon2 from '../../../assets/images/icons/graph_icon_cyan.svg'
import GraphIcon3 from '../../../assets/images/icons/graph_icon_red.svg'

function AdminDashboard() {
    return (
        <div>
            <SideBar/>
            <div className="admin-content">
                <AdminNavbar/>             
                <Navbar>
                    <Navbar.Brand> 
                        <div>
                            <p className="admin-title m-0 p-0 text-muted">Analytics</p>
                            <Breadcrumb className="admin-breadcrumb"> 
                                <Breadcrumb.Item href="/admin" className="my-0 admin-text text-muted">admin</Breadcrumb.Item>
                                <Breadcrumb.Item active className="my-0 admin-text text-primary">Dashboard</Breadcrumb.Item>
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
                <Row className="w-100 mx-0 px-2">
                    <Col md={3}>
                        <div className="px-2">
                            <p className="admin-title my-0 text-muted ">Things to Do</p>
                            <p className="admin-text my-1  text-muted">Contract Date</p>
                            <p className="admin-text my-1 text-muted">Estimated COE</p>
                            <p className="admin-text my-1 text-muted">Purchage Price</p>
                        </div>
                    </Col>
                    <Col md={9}>
                        <Row>
                            <Col md={6}>
                                <Row>
                                    <Col lg={6}>
                                        <StatusCard data={StatusCard_list[0]}/>
                                    </Col>
                                    <Col lg={6}>
                                        <StatusCard data={StatusCard_list[1]}/>
                                    </Col>
                                </Row>
                            </Col> 
                            <Col md={6}>
                                <Row>
                                    <Col lg={6}>
                                        <StatusCard data={StatusCard_list[2]}/>
                                    </Col>
                                    <Col lg={6}>
                                        <StatusCard data={StatusCard_list[3]}/>
                                    </Col>
                                </Row>
                            </Col>                         
                        </Row>
                    </Col>
                </Row>
                <div className="w-100">
                    <Row className=" mx-0 px-4 my-2">
                        <Col lg={9} className='pr-lg-3 p-0'>
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
                        </Col>
                        <Col lg={3} className='admin-card p-2'>
                            <div className="d-flex justify-content-between align-items-center px-2 py-2 admin-navbar">
                                <p className="my-0 text-primary admin-text">Pie Chart</p>
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
                            <div className="px-5">
                                <Donut/>
                            </div>
                            <div className="pt-2">
                                <Table  hover size="sm" className="admin-text ">
                                    <thead>
                                        <tr>
                                            <th>Type</th>
                                            <th>Audiance</th>
                                            <th>Day</th>
                                            <th>Week</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Strata Report</td>
                                            <td>1540</td>
                                            <td>3</td>
                                            <td>12</td>
                                        </tr>
                                        <tr>
                                            <td>Bulding & Pest Insprection</td>
                                            <td>943</td>
                                            <td>5</td>
                                            <td>2</td>
                                        </tr>
                                        <tr>
                                            <td>Valuation</td>
                                            <td>5490</td>
                                            <td>8</td>
                                            <td>5</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                </div> 
                <div className="w-100">
                    <Row className='mx-0 px-2'>                        
                        <Col md={8}>
                            <Row>
                                <Col md={6}>
                                    <div className="admin-card">
                                        <div className="d-flex justify-content-between align-items-center px-2 py-1 admin-navbar">
                                            <p className="my-0 text-primary admin-text">Recently Purchase</p>
                                            <Button variant="outline-primary">View All</Button>
                                        </div>
                                        <ListGroup className="p-1">
                                            {
                                                Recent_purchase_list.map(
                                                    (item)=>(
                                                        <ListGroupItem key={item.id} className="border-0 py-0">
                                                            <div className="justify-content-between d-flex align-items-center admin-navbar py-2">
                                                                <div className="justify-content-between d-flex align-items-center">
                                                                    <Image src={item.icon} ></Image>
                                                                    <div>
                                                                        <p className="my-0 admin-text">{item.address}</p>
                                                                        <p className="my-0 admin-text text-muted">Reporter: {item.reporter}</p>
                                                                    </div>
                                                                </div>
                                                                <Link to="#" className="admin-text text-decoration-none">Details</Link>
                                                            </div>
                                                        </ListGroupItem>
                                                    )
                                                )
                                            }
                                        </ListGroup>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="admin-card">
                                        <div className="d-flex justify-content-between align-items-center px-2 py-3 admin-navbar">
                                            <p className="my-0 text-primary admin-text">Team Members</p>
                                            <p className="my-0 text-primary admin-text">Todays Task</p>
                                            <p className="my-0 text-primary admin-text">Todays Meeting</p>
                                        </div>
                                    </div>
                                    <ListGroup>
                                        
                                    </ListGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={4}>
                            <div className="admin-card">
                                <div className="d-flex justify-content-between align-items-center px-2 py-3 admin-navbar">
                                    <p className="my-0 text-primary admin-text">Notifications</p>
                                </div>
                                <div className="py-1 mt-2">
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
                </div>
                <div className="w-100 my-2">
                    <Row className="mx-0 px-2">
                        {Type_status.map(
                            (item)=>(
                                <Col md={4} key={item.type}>
                                <div className="admin-card p-3">
                                        <p className="admin-title text-primary">{item.number}</p>
                                        <Row>
                                            <Col md={9}>
                                                <p className="admin-text-1 text-dark"> <strong>{item.type}</strong></p>
                                                <p className="admin-text text-muted">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. .</p>
                                            </Col>
                                            <Col md={3}>
                                                <Image src={item.icon}/>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            )
                        )}
                    </Row>
                    <div className="mx-4 px-2 py-4 d-flex justify-content-between">
                        <p className="admin-text text-muted my-0">Atriangle @2020</p>
                        <p className="admin-text text-muted my-0">Made With Creativity By <Link to= "/" className='admin-link text-decoration-none'>IgnatiusLab </Link></p>
                    </div>
                </div>                
            </div>
        </div>
    )
}
const StatusCard_list = [
    {
        name:'Contracts',
        progress: 68,
        task:3,
        icon:'ContractIcon'
    },
    {
        name:'Incoming Orders',
        progress: 68,
        task:14,
        icon:'IncomingIcon'
    },
    {
        name:'Report Due',
        progress: 18,
        task:23,
        icon:'ReportDueIcon'
    },
    {
        name:'Report Completed',
        progress: 68,
        task:22,
        icon:'ReportCompletedIcon'
    }
];

const Recent_purchase_list = [
    {
        id:'1',
        icon:PurchaseIcon1,
        address:'26 Lee Street, Haymarket NSW, Australia',
        reporter:'Aman Depth',
    },
    {
        id:'2',
        icon:PurchaseIcon4,
        address:'426 Sydney Road, Coburg VIC, Australia',
        reporter:'Helen Smith',
    },
    {
        id:'3',
        icon:PurchaseIcon1,
        address:'33 Rose Lane, Melbourne VIC, Australia',
        reporter:'Oner Doll',
    },
    {
        id:'4',
        icon:PurchaseIcon4,
        address:'26 Lee Street, Haymarket NSW, Australia',
        reporter:'Jake Leach',
    },
    {
        id:'5',
        icon:PurchaseIcon1,
        address:'426 Sydney Road, Coburg VIC, Australia',
        reporter:'Andrew Symonds',
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
    {
        id:4,
        icon:'caus',
        content:'Bhavin updated status Refund #5824 to awaiting customer response.',
        time:10
    },
    {
        id:5,
        icon:'caus',
        content:'Bhavin updated status Refund #5824 to awaiting customer response.',
        time:10
    }
]

const Type_status = [
    {
        number: 3509,
        icon:GraphIcon1,
        type: 'Strata Report',
        content:'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.'
    },
    {
        number: 4109,
        icon:GraphIcon2,
        type: 'Building & Pest Inspection',
        content:'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.'
    },
    {
        number: 9238,
        icon:GraphIcon3,
        type: 'Valuation',
        content:'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.'
    },

]
export default AdminDashboard
