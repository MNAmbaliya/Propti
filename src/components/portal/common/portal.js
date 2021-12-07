import React, { useEffect } from 'react'
import { Col, Row, Image, Tabs, Tab, Table } from 'react-bootstrap'
import axios from 'axios'
import Customer_order from "./customer_order";
import Notification from "./notification";

import Areachart from '../../basic/areachart'
import Donut from '../../basic/donut'
import CautionIcon from '../../../assets/images/icons/caution_icon.svg'
import AlarmStopIcon  from '../../../assets/images/icons/alarm_stop_icon.svg'
import ClockIcon from '../../../assets/images/icons/clock_icon.svg'
import AvatarImage from '../../../assets/images/avatars/avatar1.svg'
import CheckOkIcon from '../../../assets/images/icons/check_no_icon.svg'
import CheckNoIcon from '../../../assets/images/icons/check_ok_icon.svg'

import { Calendar, momentLocalizer } from 'react-big-calendar';

import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';



function PortalSection() {
    const localizer = momentLocalizer(moment)
    const [customerOrder, setCustomerOrder] =React.useState([]);
    const [completedOrder, setcompletedOrder] =React.useState([]);
    const [notification, setnotification] =React.useState([]);
    

    

    async function getCustomer(){  

        if(localStorage.getItem('userId') != undefined){
            const user = await axios.post(
                process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
                {
                    action:"getUser",
                    id:localStorage.getItem('userId')
                }
            );
            const res = await axios.post(
                process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
                {
                    action:"customerOrder",
                    agent:user.data[0].name
                }
            )

            if(res.data != undefined){
                setCustomerOrder(res.data);
            }else{
                var data = {
                    name:"",
                    agent:"",
                    address:"",
                    date:""
                }
                setCustomerOrder(data);
            }

            

            //Completed orders
            const competedRes = await axios.post(
                process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
                {
                    action:"completedOrders",
                    agent:user.data[0].name
                }
            )
            console.log('competedRes');
            console.log(competedRes);
            setcompletedOrder(competedRes.data);
            

        }

        
    }
  
    const [event,setEvent] = React.useState([]);
    
    const event1 = [        
        {
            id: 1,
            title: 'Scout Hall, 123 Kitchener St, Garran ACT 2605, Australia',
            start: new Date('2021-09-20'),
            end: new Date('2021-09-21'),
        },
    ];
    
    async function getEvents(){
        const calander = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:"getCalander",
                a_id:localStorage.getItem('userId')
            }
        );
        setEvent(calander.data);
    }

    async function getNotification(){
        const notifi = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:"getNotification"
            }
        );
        console.log('notifi');
        console.log(notifi);
        setnotification(notifi.data);
    }

    const [pandingReport,setpandingReport] = React.useState(0);
    const [completedReport,setcompletedReport] = React.useState(0);
    async function getPer() {
        const pandingReports = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:"getpandingReport"
            }
        );
           
        setpandingReport(pandingReports.data.length);
        


        const completedReports = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:"getcompletedReport"
            }
        );
      
        setcompletedReport(completedReports.data.length);
    }

    useEffect(
        ()=>{
            getCustomer();
            getPer();
            getEvents();
            getNotification();
        }, []
    )

    return (
        <div className="profile-portal-block">
            {/* <Areachart/> */}
            <Row className="mt-3">
                <Col md={12} className="px-0" >
                    <Calendar
                        localizer={localizer}
                        events={event}
                        startAccessor="start"
                        endAccessor="end"
                        views={['month']} 
                        defaultView='month'
                        style={{border: "0.3px solid rgba(58, 122, 248, 0.5) ",borderRadius:"10px", padding:"20px",height:"500px" }}
                    />
                </Col>
            </Row>
            
            <Row className="mt-3">
                <Col md={6} className="px-0">
                    <Row>
                        <Col md={6} className="text-center">
                            <div className="admin-card portal-card">
                                <p className="portal-card-title">Live Stats</p>
                                <p className="portal-card-text">{completedReport + pandingReport} Total Orders</p>
                                <Donut completedReport={completedReport} pandingReport={pandingReport}/>
                            </div>
                        </Col>
                        <Col md={6} className="text-center">
                            <div className="admin-card portal-card">
                                <p className="portal-card-title">Estimated Turn</p>
                                <p className="portal-card-text">Around Time</p>
                                <Donut completedReport={completedReport} pandingReport={pandingReport}/>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col md={6}  className="px-0">
                    <div className="admin-card ml-md-4">
                        <div className="set-notific border-bottom">
                            <div className="my-2 notifica-title app-text">Notification</div>
                        </div>
                        <div className="set-notific-block">
                            {
                                notification.filter((item, index) => index < 4).map(
                                    (item)=>(
                                        <Notification notification={item} />
                                    )
                                )
                                        
                            }
                            
                            {/* <div className="d-flex align-items-center justify-content-between my-2">
                                <div className="notification-icon-shape-out">
                                    <div className='notification-icon-shape'>
                                        <Image src={AlarmStopIcon}></Image>
                                    </div>
                                </div>
                                <p className="my-0 ml-2 notific-text">Bhavin updated status Refund #5824 to awaiting<br/> customer response.</p>
                                <p className="my-0 ml-1 notific-text ">10 Min Ago</p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between my-2">
                                <div className="notification-icon-shape-out">
                                    <div className='notification-icon-shape'>
                                        <Image src={AvatarImage} className="w-100"></Image>
                                    </div>
                                </div>
                                <p className="my-0 ml-2 notific-text">Bhavin updated status Refund #5824 to awaiting<br/> customer response.</p>
                                <p className="my-0 ml-1 notific-text ">10 Min Ago</p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between my-2">
                                <div className="notification-icon-shape-out">
                                    <div className='notification-icon-shape'>
                                        <Image src={ClockIcon}></Image>
                                    </div>
                                </div>
                                <p className="my-0 ml-2 notific-text">Bhavin updated status Refund #5824 to awaiting<br/> customer response.</p>
                                <p className="my-0 ml-1 notific-text">10 Min Ago</p>
                            </div> */}
                        </div>
                    </div>
                </Col>
                <div className="admin-card mt-3 protal-details-table mx-0 w-100">
                    <Tabs defaultActiveKey="Leads" id="uncontrolled-tab-example" className="portal-detail-tabs">
                        <Tab eventKey="Leads" title="Leads">
                            <div className="table-responsive">
                                <Table hover className="mt-3 ">
                                    <thead>
                                        <tr className="portal-details-header" style={{backgroundColor:'rgba(29, 131, 255, 0.2)'}}>
                                            <th  className="app-text rounded-left">Customer Name</th>
                                            <th  className="app-text">Address</th>
                                            <th  className="app-text">Agent Name</th>
                                            <th  className="app-text">Data & Time</th>
                                            <th  className="app-text rounded-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="portal-detail-row">

                                        {
                                            customerOrder.filter(task => task.admin_approve != 'false').map(
                                                (item)=>(
                                                    <Customer_order allDetail={item} name={item.name} address={item.address} agent={item.agent} date={item.date} id={item.order_id} file={item.file} formatedAddress={item.formatedAddress} />
                                                )
                                            )
                                        }

                                       
                                    </tbody>
                                </Table>
                            </div>
                        </Tab>
                        <Tab eventKey="Active Clients" className="mt-3" title="Active Clients">
                            This is Order In Procss for reporter
                        </Tab>
                        <Tab eventKey="Pending" className="mt-3" title="Pending">
                            <div className="table-responsive">
                                <Table hover className="mt-3 ">
                                    <thead>
                                        <tr className="portal-details-header" style={{backgroundColor:'rgba(29, 131, 255, 0.2)'}}>
                                            <th  className="app-text rounded-left">Customer Name</th>
                                            <th  className="app-text">Address</th>
                                            <th  className="app-text">Agent Name</th>
                                            <th  className="app-text">Data & Time</th>
                                            <th  className="app-text rounded-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="portal-detail-row">

                                        {
                                            completedOrder.filter(task => task.status == 'progress').map(
                                                (item)=>(
                                                    <Customer_order allDetail={item} orderStatus={"progress"} name={item.name} address={item.address} agent={item.agent} date={item.date} id={item.order_id} />
                                                )
                                            )
                                        }

                                       
                                    </tbody>
                                </Table>
                            </div>
                        </Tab>
                        <Tab eventKey="Completed" className="mt-3" title="Completed">
                            <div className="table-responsive">
                                <Table hover className="mt-3 ">
                                    <thead>
                                        <tr className="portal-details-header" style={{backgroundColor:'rgba(29, 131, 255, 0.2)'}}>
                                            <th  className="app-text rounded-left">Customer Name</th>
                                            <th  className="app-text">Address</th>
                                            <th  className="app-text">Agent Name</th>
                                            <th  className="app-text">Data & Time</th>
                                            <th  className="app-text rounded-right"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="portal-detail-row">

                                        {
                                            completedOrder.filter(task => task.status == 'activate').map(
                                                (item)=>(
                                                    <Customer_order orderStatus={"completed"} name={item.name} address={item.address} agent={item.agent} date={item.date} id={item.order_id} allDetail={item} />
                                                )
                                            )
                                        }

                                       
                                    </tbody>
                                </Table>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </Row>
        </div>
    )
}

export default PortalSection
