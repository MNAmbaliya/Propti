import React,{ useEffect } from 'react'
import { Breadcrumb, Navbar, Form, Image, Row, Col, Button, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Pagination from 'react-responsive-pagination';
import axios from "axios"

import SideBar from '../../../components/admin/basic/sidebar'
import AdminNavbar from '../../../components/admin/basic/navbar'
import DownloadButton from '../../../assets/images/icons/admin_download_button_icon.svg'
import TileViewIcon from '../../../assets/images/icons/tile_view_icon.svg'
import ListViewIcon from '../../../assets/images/icons/list_view_icon.svg'
import AvatarImage from '../../../assets/images/avatars/avatar1.svg'
import NetGridImage from '../../../assets/images/svg/net_grid.svg'
import LocationIcon from '../../../assets/images/icons/location_icon.svg'
import AdressIcon from '../../../assets/images/icons/phone_icon.svg'
import EmailIcon from '../../../assets/images/icons/email_blue_icon.svg'
import PhoneIcon from '../../../assets/images/icons/phone_icon.svg'

function Database() {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [users, setUsers] = React.useState([]);


    async function getAllUser(){
        const user = await axios.get(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php?action=getUsers"
        );
        setUsers(user.data);
        console.log(user.data);
    }

    useEffect(
        async() => {
            getAllUser();
        }, []
    )

    const totalPages = 5;
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
                                <Breadcrumb.Item active className="my-0 admin-text text-primary">DataBase</Breadcrumb.Item>
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
                <div className="w-100">
                    <Row className="mx-0 py-2">
                        <Col md={8}>
                            <div className="px-3">
                                <Row>
                                    <Col lg={3} className="my-2">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <p className="admin-text my-0 text-muted">Type</p>
                                            <select className="px-3 py-1 border rounded" >
                                                <option>All</option>
                                            </select>
                                        </div>
                                    </Col>
                                    <Col lg={3} className="my-2">
                                        <input className="px-3 py-1 border rounded" type="text" placeholder="name..."></input>
                                    </Col>
                                    <Col lg={3} className="my-2">
                                        <input className="px-3 py-1 border rounded" type="text" placeholder="Email..."></input>
                                    </Col>
                                    <Col lg={3} className="my-2">
                                        <Button className="admin-text py-1">Apply</Button>
                                        <Image className="ml-3" src={TileViewIcon}></Image>
                                        <Image className="ml-3" src={ListViewIcon}></Image>
                                    </Col>
                                </Row>
                                <div className="table-responsive">  
                                    <ListGroup variant="flush" className="mt-3">
                                        {
                                            users.map(
                                                (item)=>(
                                                    <ListGroup.Item className="database-list-item my-2" key={item.user_id}>
                                                        <div className="d-flex justify-content-between align-items-center">                                                
                                                            <Image src={item.avatar != '' ? item.avatar : AvatarImage} className="small-avatar mx-2"></Image>
                                                            <p className="admin-text text-muted my-1 mx-3">{item.role}</p>
                                                            <p className="admin-text text-muted my-1 mx-3">{item.name}</p>
                                                            <p className="admin-text text-muted my-1 mx-3">{item.email}</p>
                                                            <p className="admin-text text-muted my-1 mx-3">{item.mobile}</p>
                                                            <div className="text-center mx-3">
                                                                <a href="#"><p className="admin-text text-primary my-1">Edit</p></a>
                                                                <a href="#"><p className="admin-text text-primary my-1">Change Password</p></a>
                                                            </div>
                                                        </div>
                                                    </ListGroup.Item>
                                                )
                                            )                                            
                                        }
                                        
                                    </ListGroup>
                                    <div className="mt-5">
                                        <Pagination
                                            current={currentPage}
                                            total={totalPages}
                                            onPageChange={setCurrentPage}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4} style={{boxShadow:"5px 5px 30px rgba(58, 122, 248, 0.08)"}}>
                            <div className="p-3 position-relative mt-5" >
                                <Image className="w-100" src={NetGridImage}/>
                                <div className="text-center position-absolute top-0" style={{bottom:'20px', left:'calc(50% - 50px)'}}>  
                                    <div className="p-1 bg-white shadow-sm rounded-circle position-relative">
                                        <Image width={100} height={100} src={AvatarImage}/>
                                        <div className="position-absolute rounded-circle p-2 border border-white shadow" style={{bottom:'10px', right:'10px', backgroundColor:'#19E281'}}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-3">
                                <p className="admin-title my-2"><strong>Smith Sindol</strong></p> 
                                <p className="admin-text text-muted">Client</p>    
                                <Row>
                                    <Col md={6}>
                                        <div className="text-center">
                                            <Image src={LocationIcon}/> 
                                            <p className="admin-text mt-3"><strong>301 Silverstone Arcade<br/> New Your</strong></p> 
                                        </div>
                                        <div className="text-center">
                                            <Image src={PhoneIcon}/>  
                                            <p className="admin-text mt-3"><strong>0400 000 000</strong></p> 
                                        </div>                             
                                    </Col>
                                    <Col md={6}>
                                        <div className="text-center">
                                            <Image src={AdressIcon}/> 
                                            <p className="admin-text mt-3"><strong>109 Manhattan Street<br/> Sydney</strong></p> 
                                        </div>
                                        <div className="text-center">
                                            <Image src={EmailIcon}/>
                                            <p className="admin-text mt-3"><strong>admin@admin.com</strong></p>   
                                        </div>  
                                    </Col>
                                </Row>                         
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="mx-4 px-2 py-4 d-flex justify-content-between align-items-center">
                    <p className="admin-text text-muted my-0">Atriangle @2020</p>
                    <p className="admin-text text-muted my-0">Made With Creativity By <Link to= "/" className='admin-link text-decoration-none'>IgnatiusLab </Link></p>
                </div>
            </div>
        </div>
    )
}

const user_data = [
    {
        user_id:1,
        user_type:'Client',
        user_name:'Smith',
        email:'admin@admin.com',
        phone:'0400 000 000',
    },
    {
        user_id:2,
        user_type:'Client',
        user_name:'Smith',
        email:'admin@admin.com',
        phone:'0400 000 000',
    },
    {
        user_id:3,
        user_type:'Client',
        user_name:'Smith',
        email:'admin@admin.com',
        phone:'0400 000 000',
    },
    {
        user_id:4,
        user_type:'Client',
        user_name:'Smith',
        email:'admin@admin.com',
        phone:'0400 000 000',
    },
    {
        user_id:5,
        user_type:'Client',
        user_name:'Smith',
        email:'admin@admin.com',
        phone:'0400 000 000',
    },
    {
        user_id:6,
        user_type:'Client',
        user_name:'Smith',
        email:'admin@admin.com',
        phone:'0400 000 000',
    },
]

export default Database
