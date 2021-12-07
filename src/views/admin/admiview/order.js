import React, { useEffect } from 'react'
import {Navbar, Breadcrumb, Form, Image, InputGroup, FormControl, Table} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Pagination from 'react-responsive-pagination';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SideBar from '../../../components/admin/basic/sidebar'
import AdminNavbar from '../../../components/admin/basic/navbar'
import DownloadButton from '../../../assets/images/icons/admin_download_button_icon.svg'
import SearchIcon from '../../../assets/images/icons/search_icon.svg'
import SearchBUttonIcon from '../../../assets/images/icons/search_button_icon.svg'
import CheckOkIcon from '../../../assets/images/icons/check_no_icon.svg'
import CheckNoIcon from '../../../assets/images/icons/check_ok_icon.svg'

export default function Orders() {
    const [currentPage, setCurrentPage] = React.useState(1);

    const [customerOrder, setCustomerOrder] = React.useState([]);
    const [inspectionDate, setInspectionDate] = React.useState("");

    /**
     * Notification 
    */
     const notify = (message) => toast(message);

    async function getOrders(){
        const user = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:"getcustomerOrderByAproove"
            }
        );
        setCustomerOrder(user.data);
    }

    // no actopm
    async function noAction(){
        notify("This Action Already assign");
    }

    // on approve
    async function approve(id,orderId,email,name,mobile,file){
        console.log(inspectionDate);
        if(inspectionDate != "" && inspectionDate != null && inspectionDate != undefined){
            const user = await axios.post(
                process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
                {
                    action:"orderAproove",
                    inspection:inspectionDate,
                    id:id
                }
            );
            
            // Send mail to Agent
            const mail = await axios.post(
                process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
                {
                    action:"getordermail",
                    id:orderId,
                    email:email,
                    mobile:mobile,
                    file:file,
                    name:name
                }
            );

            // Add notification
            var d = new Date();
            const notification = await axios.post(
                process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
                {
                    action:"addNotification",
                    text:'Assign new order to ',
                    time:d,
                    id:orderId,
                }
            );

            getOrders();
        }else{
            notify("Please Select Inspection Date");
        }
    }

    // on disapprove
    async function disapprove(id){
        const user = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:"orderCansal",
                id:id
            }
        );
        getOrders();
    }
    
    useEffect(() => {
        getOrders();
    }, []);
    
    

    const totalPages = 5;
    return (
        <div>
            <SideBar/>
            <div className="admin-content">
                <AdminNavbar/>
                <Navbar>
                    <Navbar.Brand> 
                        <div>
                            <p className="admin-title m-0 p-0 text-muted">Orders</p>
                            <Breadcrumb className="admin-breadcrumb"> 
                                <Breadcrumb.Item href="/admin" className="my-0 admin-text text-muted">admin</Breadcrumb.Item>
                                <Breadcrumb.Item active className="my-0 admin-text text-primary">orders</Breadcrumb.Item>
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
                                            <th>Address</th>
                                            <th>Purchasers</th>
                                            <th>Data Inspection</th>
                                            <th>Reporter</th>
                                            <th>Approve</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                           customerOrder.map(
                                               (item)=>(
                                                    <tr key={item.id} className="text-center border-bottom ">
                                                        <td className="">{item.address}</td>
                                                        <td>{item.name}</td>
                                                        <td> <input type="date" class="inspecteDate" value={inspectionDate!= '' ? inspectionDate : item.date != '' ? item.date : inspectionDate} name="inspectionDate" id="" onChange={
                                                            (e)=>{
                                                                setInspectionDate(e.target.value)
                                                            }
                                                        } />  </td>
                                                        <td>{item.agent}</td>
                                                        <td>
                                                            <Image src={CheckOkIcon} style={{ cursor:"pointer" }} onClick={item.admin_approve == 'false' ? (e)=>{disapprove(item.id)} : (e)=>{noAction()}} />
                                                            <Image style={{ cursor:"pointer" }} onClick={item.admin_approve != 'true' ? (e)=>{approve(item.id,item.order_id,item.email,item.name,item.mobile,item.file)} : (e)=>{noAction()} } className="ml-3" src={CheckNoIcon} />
                                                        </td>
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
            <ToastContainer 
                toastClassName = "border border-grey"
            />
        </div>
    )
}

const data_list = [
    {
        id:1,
        street:'1 Tba Street, Sydney',
        purchasers:'Tim Payne',
        datauploaded:'12/03/2021',
        reporter:'Section 108'
    },
    {
        id:2,
        street:'1 Tba Street, Sydney',
        purchasers:'Tim Payne',
        datauploaded:'12/03/2021',
        reporter:'Section 108'
    },
    {
        id:3,
        street:'1 Tba Street, Sydney',
        purchasers:'Tim Payne',
        datauploaded:'12/03/2021',
        reporter:'Section 108'
    },
    {
        id:4,
        street:'1 Tba Street, Sydney',
        purchasers:'Tim Payne',
        datauploaded:'12/03/2021',
        reporter:'Section 108'
    },
    {
        id:5,
        street:'1 Tba Street, Sydney',
        purchasers:'Tim Payne',
        datauploaded:'12/03/2021',
        reporter:'Section 108'
    },
    {
        id:6,
        street:'1 Tba Street, Sydney',
        purchasers:'Tim Payne',
        datauploaded:'12/03/2021',
        reporter:'Section 108'
    },
    {
        id:7,
        street:'1 Tba Street, Sydney',
        purchasers:'Tim Payne',
        datauploaded:'12/03/2021',
        reporter:'Section 108'
    },
    {
        id:8,
        street:'1 Tba Street, Sydney',
        purchasers:'Tim Payne',
        datauploaded:'12/03/2021',
        reporter:'Section 108'
    },
]


