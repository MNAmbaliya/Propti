import React from 'react'
import {Navbar, Breadcrumb, Form, Image, InputGroup, FormControl, Table} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Pagination from 'react-responsive-pagination';

import SideBar from '../../../components/admin/basic/sidebar'
import AdminNavbar from '../../../components/admin/basic/navbar'
import DownloadButton from '../../../assets/images/icons/admin_download_button_icon.svg'
import SearchIcon from '../../../assets/images/icons/search_icon.svg'
import SearchBUttonIcon from '../../../assets/images/icons/search_button_icon.svg'

function Download() {
    const [currentPage, setCurrentPage] = React.useState(1);

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
                                <Breadcrumb.Item active className="my-0 admin-text text-primary">Download</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Form inline className="px-3">
                            <Form.Group>
                                <Form.Control as='select' className="bg-white">
                                    <option>Today: Feb 1</option>
                                    <option>Today: Feb 2</option>
                                    <option>Today: Feb 3</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                        <Image src={DownloadButton}></Image>
                    </Navbar.Collapse>
                </Navbar>
                <div className="px-3">
                    <InputGroup className="mb-3 w-25">
                        <FormControl
                            placeholder="Type here..."
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            className="border-right-0"
                        />
                        <InputGroup.Append>
                            <InputGroup.Text id="basic-addon2"  className="bg-white">
                                <Image className="mr-3" src={SearchIcon} width={15}/>
                                <Image src={SearchBUttonIcon} width={26}/>
                            </InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                    <div>
                        <div className="admin-card">
                            <div className="d-flex justify-content-between align-items-center px-2 py-2 admin-navbar">
                                <p className="my-0 text-primary ml-3 admin-text">Recent Orders</p>
                                <Form inline className="px-1">
                                    <Form.Group>
                                        <Form.Control as='select' className="admin-text">
                                            <option>Strata Report</option>
                                            <option>This Week</option>
                                            <option>This Day</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form>
                            </div>
                            <div className="p-2 table-responsive">
                                <Table hover className="admin-text">
                                    <thead style={{background: "rgba(29, 131, 255, 0.2)"}}>
                                        <tr className="text-center">
                                            <th>Street</th>
                                            <th>Purchasers</th>
                                            <th>Data Uploaded</th>
                                            <th>Downloads</th>   
                                            <th>Cost</th>
                                            <th>Reporter</th>
                                            <th>Download</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                           data_list.map(
                                               (item)=>(
                                                    <tr key={item.id} className="text-center border-bottom ">
                                                        <td className="">{item.street}</td>
                                                        <td>{item.purchasers}</td>
                                                        <td>{item.datauploaded}</td>
                                                        <td>{item.downloads}</td>
                                                        <td>{item.Cost}</td>
                                                        <td>{item.reporter}</td>
                                                        <td><Image src={DownloadButton} height={40}></Image></td>
                                                    </tr>
                                               )
                                           ) 
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <Pagination
                            current={currentPage}
                            total={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
                <div className="mx-4 px-2 py-4 d-flex justify-content-between align-items-center">
                    <p className="admin-text text-muted my-0">Atriangle @2020</p>
                    <p className="admin-text text-muted my-0">Made With Creativity By <Link to= "/" className='admin-link text-decoration-none'>IgnatiusLab </Link></p>
                </div>
            </div>
        </div>
    )
}

const data_list = [
    {
        id:1,
        street:'1 Tba Street, Sydney',
        purchasers:'Tim Payne',
        datauploaded:'12/03/2021',
        downloads:5,
        Cost:250,
        reporter:'Section 108'
    },
    {
        id:2,
        street:'1 Tba Street, Sydney',
        purchasers:'Tim Payne',
        datauploaded:'12/03/2021',
        downloads:5,
        Cost:250,
        reporter:'Section 108'
    },
    {
        id:3,
        street:'1 Tba Street, Sydney',
        purchasers:'Tim Payne',
        datauploaded:'12/03/2021',
        downloads:5,
        Cost:250,
        reporter:'Section 108'
    },
    {
        id:4,
        street:'1 Tba Street, Sydney',
        purchasers:'Tim Payne',
        datauploaded:'12/03/2021',
        downloads:5,
        Cost:250,
        reporter:'Section 108'
    },
    {
        id:5,
        street:'1 Tba Street, Sydney',
        purchasers:'Tim Payne',
        datauploaded:'12/03/2021',
        downloads:5,
        Cost:250,
        reporter:'Section 108'
    },
    {
        id:6,
        street:'1 Tba Street, Sydney',
        purchasers:'Tim Payne',
        datauploaded:'12/03/2021',
        downloads:5,
        Cost:250,
        reporter:'Section 108'
    },
    {
        id:7,
        street:'1 Tba Street, Sydney',
        purchasers:'Tim Payne',
        datauploaded:'12/03/2021',
        downloads:5,
        Cost:250,
        reporter:'Section 108'
    },
    {
        id:8,
        street:'1 Tba Street, Sydney',
        purchasers:'Tim Payne',
        datauploaded:'12/03/2021',
        downloads:5,
        Cost:250,
        reporter:'Section 108'
    },
]

export default Download
