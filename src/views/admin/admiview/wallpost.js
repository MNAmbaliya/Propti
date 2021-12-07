import React, { useEffect } from 'react'
import { Breadcrumb, Navbar, Form, Image, Row, Col, Button, Accordion, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SideBar from '../../../components/admin/basic/sidebar'
import AdminNavbar from '../../../components/admin/basic/navbar'
import DownloadButton from '../../../assets/images/icons/admin_download_button_icon.svg'
import AvatarImage from '../../../assets/images/avatars/avatar1.svg'
import RightArrowIcon from '../../../assets/images/icons/right_arrow_icon.svg'
import CheckOKIcon from '../../../assets/images/icons/check_ok_icon.svg'
import CheckNoIcon from '../../../assets/images/icons/check_no_icon.svg'
import EditIcon from '../../../assets/images/icons/edit_pen_icon.svg'
import DeleteIcon from '../../../assets/images/icons/delete_icon.svg'
import PhoneIcon from '../../../assets/images/icons/phone_blue_circle_icon.svg'
import EmailIcon from '../../../assets/images/icons/email_blue_circle_icon.svg'
import NoIcon from '../../../assets/images/icons/no_blue_circle_icon.svg'
import axios from 'axios'

/**
 * Get User Name by ID
 * @param {*} param0 
 * @returns 
 */
function GetUserNameById({ id }){
    const [userData, setUserData] = React.useState({});
    var user_id = id;
    useEffect(
        async()=>{
            const user = await axios.post(
                process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
                {
                    action:"getUser",
                    id:id
                }
               // { headers: {"Authorization" : `Bearer ${localStorage.getItem("tokens")}`} }
            )
            setUserData(user.data != undefined ? user.data[0] : '');
        }, []
    )
    return(
        <span className="ml-2">{userData?.name}</span>
    )
}

/**
 * 
 * @returns 
 */

 function GetUserRoleById({ id }){
    const [userData, setUserData] = React.useState({})
    var user_id = id;
    useEffect(
        async()=>{
            const user = await axios.post(
                process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
                {
                    action:"getUser",
                    id:user_id
                }
                //{ headers: {"Authorization" : `Bearer ${localStorage.getItem("tokens")}`} }
            )
            setUserData(user.data != undefined ? user.data[0] : '');
        }, []
    )
    return(
        <span className="ml-2">{userData?.role}</span>
    )
}

function WallPost() {
    /**
     * Declaration the state variable for toggle
     */
    const[toggle, setToggle] = React.useState(false);
    /**
     *  Declaration the state variable for data 
     */
    const[walldata, setWallData] = React.useState([])
    /**
     * Call API to get the wall data
     */

    async function getWalls(){
        const walls = await axios.get(process.env.REACT_APP_BACKEND_API_URL + "/test_api.php?action=getWalls")
        setWallData(walls.data)
        
    }
    /**
     * Get All Wall Post data from API
     */
    useEffect(() => {
        getWalls()
    }, [])

    /**
     * Allow the Wall to show on Website    
     * @param {*} id 
     */
    async function approveWall(id, allowed){
        
        if(allowed == 0){
            allowed = false;
        }else{
            allowed = true;
        }
        
        if(!allowed){
            const res = await axios.post(
                process.env.REACT_APP_BACKEND_API_URL+"/test_api.php",
                {
                    action:'updateWallById',
                    id: id,
                    allowed: true
                }
            )
            getWalls();
            notify("Approved!")
        }
        else{
            notify("This Post Already approved!")
        }
    }
    
    async function getuserMobile(userId){
        var user_id = userId;
        const user = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:"getUser",
                id:user_id
            }
            //{ headers: {"Authorization" : `Bearer ${localStorage.getItem("tokens")}`} }
        )
        window.open('tel:'+user.data[0].mobile);
        
    }
    async function getusermail(userId){
        var user_id = userId;
        const user = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:"getUser",
                id:user_id
            }
            //{ headers: {"Authorization" : `Bearer ${localStorage.getItem("tokens")}`} }
        )
        window.open('mailto:'+user.data[0].email);
        
    }


    async function editUserReply(reply_id){
    }

    async function deleteUserReply(reply_id){
        const res = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL+"/test_api.php",
            {
                action:'deleteReply',
                id: reply_id,
            }
        );
        getWalls();
    }

    /**
     * Reject the Wall to Hide on Website
     */
     async function rejectWall(id, allowed){
        if(allowed == 0){
            allowed = false;
        }else{
            allowed = true;
        }
        if(allowed){
            await axios.post(
                process.env.REACT_APP_BACKEND_API_URL+"/test_api.php",
                {
                    action:'updateWallById',
                    id: id,
                    allowed: false
                }
            )
            getWalls();
            notify("Rejected!")
        }
        else{
            notify("This Post Already Rejected!")
        }
    }
    /**
     * Notification 
    */
    const notify = (message) => toast(message);
    /**
     * Rendering View
     */
    return (
        <div>
            <SideBar/>
            <div className="admin-content">
                <AdminNavbar/>
                <Navbar>
                    <Navbar.Brand> 
                        <div>
                            <p className="admin-title m-0 p-0 text-muted">Wall Post</p>
                            <Breadcrumb className="admin-breadcrumb"> 
                                <Breadcrumb.Item href="/admin" className="my-0 admin-text text-muted">admin</Breadcrumb.Item>
                                <Breadcrumb.Item active className="my-0 admin-text text-primary">Wall Post</Breadcrumb.Item>
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
                <div className="px-3 mt-2">
                    <div className="admin-card p-3">
                        <Row>
                            <Col md={10}>
                                <div className="d-flex align-items-center">                            
                                    <Image src={AvatarImage} className="small-avatar"></Image>
                                    <p className="my-0 ml-3 admin-text text-muted">David Pipaliya</p>
                                </div>
                                <p className="admin-title text-muted my-2">What is Your Question?</p>
                            </Col>
                            <Col md={2} className="d-flex align-items-end justify-content-center">
                                <Button style={{borderRadius:"3rem"}}><b>Ask Question</b></Button>
                            </Col>
                        </Row>
                    </div>
                    <div className="mt-3">
                        <p className="text-primary admin-text"><b>Answers to Approve</b></p>
                        {
                            walldata.map(
                                (wall) => (
                                    <Accordion className="my-1" key = {wall.wall_id}>
                                        <Card className='admin-card'>
                                            <Card.Header className="bg-white border-0">
                                                <Accordion.Toggle 
                                                    as={"div"} 
                                                    variant="link" 
                                                    eventKey="0" 
                                                    className="text-decoration-none w-100 py-1" 
                                                    style={{cursor:'pointer'}}  
                                                    onClick={()=>{setToggle(!toggle)}}
                                                >
                                                    <div className="d-flex justify-content-between">
                                                        <div className = "d-flex">
                                                            <span className="text-muted admin-text-1"><b>{ wall.question }</b></span>
                                                            <p className=" ml-3 admin-text text-muted my-1">
                                                                { 
                                                                    wall.allowed == 0 ? wall.allowed = false : wall.allowed = true,
                                                                        
                                                                    wall.allowed? 
                                                                        <span className="text-primary">Approved</span> 
                                                                    : 
                                                                        <span className="text-danger">No Approved</span>
                                                                }
                                                            </p>
                                                        </div>
                                                        <Image src={RightArrowIcon} style={{transform:toggle?'rotate(90deg)':'rotate(0deg)'}}></Image>
                                                    </div>
                                                </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body>
                                                    <Row>
                                                        <Col md={8}>
                                                            <div className="admin-card py-2 px-4">
                                                                <Row className="border-bottom">
                                                                    <Col md={10}>
                                                                            <p className="admin-text-1 my-2"><b>{ wall.question }</b></p>
                                                                            <div className="d-flex">
                                                                                <p className="admin-text text-muted my-1">
                                                                                    Asked By:{ <GetUserNameById id={wall.user_id}></GetUserNameById>  }
                                                                                </p>
                                                                                <p className=" ml-3 admin-text text-muted my-1">Date : { wall.date }</p>
                                                                                <p className=" ml-3 admin-text text-muted my-1">
                                                                                    { wall.allowed? 
                                                                                            <span className="text-primary">Approved</span> 
                                                                                        : 
                                                                                            <span className="text-danger">No Approved</span>
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                    </Col>
                                                                    <Col md={2}>
                                                                        <div className="d-flex mt-3 ">
                                                                            <Image 
                                                                                src={CheckOKIcon}
                                                                                style = {{cursor: " pointer"}} 
                                                                                onClick = {() => {
                                                                                    approveWall(wall.wall_id, wall.allowed)
                                                                                }}
                                                                            />
                                                                            <Image 
                                                                                className="ml-4" 
                                                                                src={CheckNoIcon}
                                                                                style = {{cursor: " pointer"}}
                                                                                onClick = {() =>{
                                                                                    rejectWall(wall.wall_id, wall.allowed)
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                {
                                                                    wall.reply.map(
                                                                        (reply)=>(
                                                                            <div key = {reply.id}>
                                                                                <div className="d-flex my-3 justify-content-between align-items-center">
                                                                                    <div className="d-flex my-1 justify-content-beween align-items-center">
                                                                                        <Image src={AvatarImage} width={60}></Image>
                                                                                        <div className="ml-3">
                                                                                            <p className="my-3 admin-text-1"><b><GetUserNameById id={reply.user_id}/></b></p>
                                                                                            <p className="my-3 admin-text"> <GetUserRoleById id={reply.user_id}/></p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div>
                                                                                        <div className="d-flex align-items-center">
                                                                                            <div 
                                                                                                className="admin-text text-primary p-2" 
                                                                                                style={{backgroundColor:"#ECF2FF", borderRadius:'20px'}}
                                                                                            >
                                                                                                Mark as Spam
                                                                                            </div>
                                                                                            <Image className="mx-2" src={EditIcon}
                                                                                                onClick = {
                                                                                                    ()=>editUserReply(reply)
                                                                                                }
                                                                                                style = {{cursor:'pointer'}}
                                                                                            ></Image>
                                                                                            <Image className="mx-2" src={DeleteIcon}
                                                                                                onClick = {
                                                                                                    ()=>deleteUserReply(reply)
                                                                                                }
                                                                                                style = {{cursor:'pointer'}}
                                                                                            ></Image>
                                                                                        </div>
                                                                                        <p className="my-3 mx-2 admin-text-1"><b>Date:<span className="text-muted">{reply.date}</span></b></p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="ml-md-5 pl-md-5">
                                                                                    <p className="admin-text-1 text-muted my-1">
                                                                                        { reply.answer }
                                                                                    </p>                                                    
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    )
                                                                }
                                                            </div>
                                                        </Col>
                                                        <Col md={4}>
                                                            <p className="admin-text-1 text-primary"><b>People who have answered this Question</b></p>
                                                            {
                                                                wall.reply.map(
                                                                    (reply) => (
                                                                        <div className="admin-card p-2 my-1" key ={reply.reply_id} >
                                                                            <Row>
                                                                                <Col md={8}>
                                                                                    <div className="d-flex align-items-center">
                                                                                        <Image src={AvatarImage} className="small-avatar"></Image>
                                                                                        <div className="ml-3">
                                                                                            <p className="my-1 admin-text-1"><b><GetUserNameById id={reply.user_id}/></b></p>
                                                                                            <p className="my-1 admin-text"><GetUserRoleById id={reply.user_id} /></p>
                                                                                        </div>
                                                                                    </div>
                                                                                </Col>
                                                                                <Col md={4}>
                                                                                    <div className="d-flex justify-content-between align-items-center mt-2">
                                                                                        
                                                                                            <Image src={PhoneIcon}
                                                                                                onClick = {
                                                                                                    ()=>getuserMobile(reply.user_id)
                                                                                                }
                                                                                                style = {{cursor:'pointer'}}
                                                                                            ></Image>
                                                                                        
                                                                                        <Image src={EmailIcon}
                                                                                            onClick = {
                                                                                                ()=>getusermail(reply.user_id)
                                                                                            }
                                                                                            style = {{cursor:'pointer'}}
                                                                                        ></Image>
                                                                                        <Image src={NoIcon}></Image>
                                                                                    </div>
                                                                                </Col>
                                                                            </Row>
                                                                        </div>
                                                                    )
                                                                )
                                                            }
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                )
                            )
                        }
                    </div>
                    <ToastContainer 
                        toastClassName = "border border-grey"
                    />
                </div>
                <div className="mx-4 px-2 py-4 d-flex justify-content-between align-items-center">
                    <p className="admin-text text-muted my-0">Atriangle @2020</p>
                    <p className="admin-text text-muted my-0">Made With Creativity By <Link to= "/" className='admin-link text-decoration-none'>IgnatiusLab </Link></p>
                </div>
            </div>
        </div>
    )
}

export default WallPost
