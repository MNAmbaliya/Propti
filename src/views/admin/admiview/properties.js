import React,{ useEffect } from 'react'
import {Navbar, Breadcrumb, Form, Image, Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from "axios"

import SideBar from '../../../components/admin/basic/sidebar'
import AdminNavbar from '../../../components/admin/basic/navbar'
import DownloadButton from '../../../assets/images/icons/admin_download_button_icon.svg'
import PropertyImage from '../../../assets/images/svg/blog_card_image.png'
import AvatarImage from '../../../assets/images/avatars/avatar1.svg'

function Properties() {

    const [properties_data, setproperties_data] = React.useState([]);

    const getAllProperties = async() => {
        const blogs = await axios.get(
            "https://proptiapi.ignatiuslab.in/test_api.php?action=getAllReport"
        );
        return blogs;
    }


    useEffect(
        async() => {
            const blogsData =await getAllProperties();
            setproperties_data(blogsData.data);
        }, []
    )

    return (
        <div>
            <SideBar/>
            <div className="admin-content">
                <AdminNavbar/>
                <Navbar>
                    <Navbar.Brand> 
                        <div>
                            <p className="admin-title m-0 p-0 text-muted">Properties</p>
                            <Breadcrumb className="admin-breadcrumb"> 
                                <Breadcrumb.Item href="/admin" className="my-0 admin-text text-muted">admin</Breadcrumb.Item>
                                <Breadcrumb.Item active className="my-0 admin-text text-primary">Properties</Breadcrumb.Item>
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
                <div className="px-4">
                    <div className="d-flex align-items-center">
                        <p className="my-0 admin-text text-muted">Show:</p>
                        <select className="mx-3 border border-1 px-3 py-1 rounded">
                            <option>All Properties</option>
                        </select>
                        <p className="my-0 admin-text text-muted">Shord by:</p>
                        <select className="mx-3 border border-1 px-3 py-1 rounded">
                            <option>Location</option>
                        </select>
                    </div>
                    <Row className="mx-0 mt-4">
                        {
                            properties_data.map(
                                (item)=>(
                                    <Col key={item.id} md={3}>
                                        <div  className="shadow-sm rounded">
                                            <Image className="w-100 rounded" src={item.file}></Image>
                                            <div className="px-3 mt-2">
                                                <p className="admin-title text-primary"><b>{item.address}</b></p>
                                                <p className="admin-text text-muted mt-3">{item.reported_by}</p>
                                                <div className="d-flex justify-content-between my-3">
                                                    <Image className="small-avatar" src={AvatarImage}></Image>
                                                    <div className="mx-3">
                                                        <p className="admin-text my-1"><strong>{item.reported_by}</strong></p>
                                                        <p className="admin-text my-1">$295</p>
                                                    </div>
                                                    <button className="admin-text admin-properties-custom-buttom mb-5">Paid</button>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                )
                            )
                        }
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



export default Properties