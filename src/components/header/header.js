import React, { useEffect } from 'react'
import {Button, Image, ListGroup, ListGroupItem, Nav, Navbar, Dropdown, Accordion, Card} from 'react-bootstrap';
import {
    Link,
    useHistory,
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'; 
// import reasources
import axios from 'axios'
import Logo from '../../assets/images/logo/logo.png';
import '../../assets/css/header.css';
import { signout } from '../../app/api/auth/actions';

import DefaultAvatar from '../../assets/images/avatars/default.png';
import UserIcon from '../../assets/images/icons/user_icon.svg';
import EmailIcon from '../../assets/images/icons/email_icon.svg';
import RoleIcon from '../../assets/images/icons/user_role_icon.svg'
import test from '../../views/depreciation/order'

function Header() {
    /**
     * toggler
     */
    console.log(localStorage.getItem('userId'));
    const [toggler, setToggler] = React.useState(false);
    /**
     * redux dispatch
     */
    const [User, setUser] = React.useState([]);
    const [UserInfo, setUserInfo] = React.useState([]);
    const dispatch = useDispatch();
    /**
     * set useHistroy of React-Redux
     */
    let history = useHistory();
    const user = useSelector((state) => state.auth.user);
   
    /**
     * set Mobile view or desktop view
     */
    const [openDrawer, setOpenDrawer] = React.useState(false);

    /**
     * identify login or logout
     */
    const [isLogin, setLogin] = React.useState(localStorage.getItem('tokens') !== null)
    /**
     * if the user click logout button this function will be run 
     */
    function handleLogOut(){
        setLogin(false);
        localStorage.clear();
        dispatch(
            signout()
        )
        history.push("/login")
    }

    async function getUser(){

        if(localStorage.getItem('userId') != undefined){
            const user = await axios.post(
                
                process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
                {
                    action:"getUser",
                    id:localStorage.getItem('userId')
                }
            );    
            setUser(user.data[0]);
            const data = await axios.post(
                
                process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
                {
                    action:"GetRegisterInfo",
                    id:localStorage.getItem('userId')
                }
            ); 
            setUserInfo(data.data[0]);

            if(data != null){
                if(data.data != undefined){
                    if(data.data[0].avatar == ""){
                        setUserInfo({
                            ...UserInfo,
                            avatar:DefaultAvatar
                        });
                    }
                    
                }
            }
        }

        
    }


    useEffect(
        ()=>{
            getUser();
        }, []
    )

    /**
     * rendering view
     */
    return (
        <div>
            <Navbar className="justify-content-between">
                <Link to="/"><Navbar.Brand><Image src={Logo} className="logo-image"></Image></Navbar.Brand></Link>
                <div className="navbar-desktop-menu w-100">
                    <Nav className="mr-auto justify-content-between align-items-center nav_theme">
                        <Link to={link_item[0].link} className={link_item[0].className}>{link_item[0].name}</Link>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic" className={link_item[1].className}>
                                {link_item[1].name}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as="div" className="navbar-desktop-link">
                                    <Link to={"/search/strata"}  className={link_item[1].className}>
                                        Strata Report
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item as="div" className="navbar-desktop-link">                                    
                                    <Link to={"/Inspection"}  className={link_item[1].className}>
                                        Building & Pest<br/> Inspection
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item as="div" className="navbar-desktop-link">
                                    <Link to={"/valuation"}  className={link_item[1].className}>
                                        Valuation
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item as="div" className="navbar-desktop-link">                                    
                                    <Link to={"/depreciation"}  className={link_item[1].className}>
                                        Depreciation<br/> Report
                                    </Link>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Link to={link_item[2].link} className={link_item[2].className}>{link_item[2].name}</Link>
                        <Link to={link_item[3].link} className={link_item[3].className}>{link_item[3].name}</Link>
                        {/* <Link to={link_item[4].link} className={link_item[4].className}>{link_item[4].name}</Link> */}
                        <Dropdown className="insurance-dropdown">
                            <Dropdown.Toggle variant="primary" id="dropdown-basic" className={link_item[1].className}>
                                {link_item[4].name}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as="div" className="navbar-desktop-link">
                                    <Link to={"./strata-insurance"}  className={link_item[1].className}>
                                    Strata Insurance
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item as="div" className="navbar-desktop-link">                                    
                                    <Link to={"./property-insurance"}  className={link_item[1].className}>
                                    Property Insurance
                                    </Link>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        
                        {
                            localStorage.getItem('userId') != null  ? 
                                <Link to={link_item[5].link} className={link_item[5].className}>{link_item[5].name}</Link>
                            :''
                        }
                        <Link to={link_item[6].link} className={link_item[6].className}>{link_item[6].name}</Link>
                        {
                            isLogin
                            ?
                                
                                <Dropdown>
                                    <Dropdown.Toggle 
                                        className="login-profile-dropdown"
                                        variant="primary" 
                                        id="dropdown-basic" 
                                        as="div"         
                                    >
                                        <img src = {UserInfo.avatar} width={42} height={42}/>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <div className="app-text profile-dropdown">
                                            <div className="d-flex my-2 align-items-center">
                                                <img src={UserIcon}  width={24}/>
                                                <span className="ml-3">{
                                                UserInfo.fname + " " + UserInfo.lname }</span>
                                            </div>
                                            <div className="d-flex my-2 align-items-center">
                                                <img src={EmailIcon} width={24} height={26}/>
                                                <span className="ml-3">{User.email}</span>
                                            </div>
                                            <div className="d-flex my-2 align-items-center">
                                                <img src={RoleIcon} width={24}/>
                                                <span className="ml-3">{User.role}</span>
                                            </div>
                                        </div>
                                        
                                        <Dropdown.Item
                                            className="navbar-desktop-link"
                                            as="div"
                                        >
                                            {
                                                User.role == "real_estate_agent" ? 
                                                    <Link to="/portal/reporter" className="text-decoration-none text-dark">Portal</Link>
                                                :
                                                    User.role == "reporter" ?
                                                        <Link to="/portal/reporter" className="text-decoration-none text-dark">Portal</Link>
                                                    :
                                                        User.role == "buyers_agent" ?
                                                            <Link to="/portal/buyer" className="text-decoration-none text-dark">Portal</Link>
                                                        : ''
                                            }

                                            
                                        </Dropdown.Item>
                                        <Dropdown.Item 
                                            className="navbar-desktop-link text-dark"
                                            onClick = {()=> handleLogOut() }
                                        >                                    
                                            Log out
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            :
                                <Link 
                                    to={link_item[7].link} 
                                    className={link_item[7].className}
                                >
                                        {link_item[7].name }
                                </Link>
                        }            
                    </Nav>
                </div>
                <div className="navbar-mobile-menu">
                    <Button onClick={()=>{setOpenDrawer(!openDrawer)}} className="navbar-mobile-menu-button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">                            
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                    </Button>
                </div>
            </Navbar> 
            {
                openDrawer &&
                    <div className="navbar-mobile-side-menu">
                        <ListGroup>
                            <Link to={link_item[0].link}>
                                <ListGroupItem onClick={()=>{setOpenDrawer(false)}}  className="navbar-mobile-side-menu-item  text-muted" >{link_item[0].name}</ListGroupItem>
                            </Link>                           
                            <ListGroupItem  className="navbar-mobile-side-menu-item text-muted" >
                                <Accordion>
                                    <Card className="border-0 px-0 bg-transparent">
                                        <Card.Header className='border-0 bg-transparent px-0 py-1'>
                                            <Accordion.Toggle as={"div"} variant="link" eventKey="0">
                                                {link_item[1].name}
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                <Link to={"#"} className="text-decoration-none text-muted" onClick={()=>{setOpenDrawer(false)}} ><p>Strata Report</p></Link>
                                                <Link to={"#"} className="text-decoration-none text-muted" onClick={()=>{setOpenDrawer(false)}} ><p>Building & Pest<br/>Inspection</p></Link>
                                                <Link to={"/valuation"} className="text-decoration-none text-muted" onClick={()=>{setOpenDrawer(false)}} ><p>Valuation</p></Link>
                                                <Link to={"#"} className="text-decoration-none text-muted" onClick={()=>{setOpenDrawer(false)}} ><p>Depreciation<br/>Report</p></Link>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>                                   
                            </ListGroupItem>                           
                            <Link to={link_item[2].link}>
                                <ListGroupItem onClick={()=>{setOpenDrawer(false)}}  className="navbar-mobile-side-menu-item text-muted" >{link_item[2].name}</ListGroupItem>
                            </Link>
                            <Link to={link_item[3].link}>
                                <ListGroupItem onClick={()=>{setOpenDrawer(false)}}  className="navbar-mobile-side-menu-item text-muted" >{link_item[3].name}</ListGroupItem>
                            </Link>
                            {/* <Link to={link_item[4].link}>
                                <ListGroupItem onClick={()=>{setOpenDrawer(false)}}  className="navbar-mobile-side-menu-item text-muted" >{link_item[4].name}</ListGroupItem>
                            </Link> */}
                            <ListGroupItem  className="navbar-mobile-side-menu-item text-muted" >
                                <Accordion>
                                    <Card className="border-0 px-0 bg-transparent">
                                        <Card.Header className='border-0 bg-transparent px-0 py-1'>
                                            <Accordion.Toggle as={"div"} variant="link" eventKey="0">
                                                {link_item[4].name}
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                <Link to={"./strata-insurance"} className="text-decoration-none text-muted" onClick={()=>{setOpenDrawer(false)}} ><p>Strata Insurance</p></Link>
                                                <Link to={"./property-insurance"} className="text-decoration-none text-muted" onClick={()=>{setOpenDrawer(false)}} ><p>Property Insurance</p></Link>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>                                   
                            </ListGroupItem>
                            {
                                localStorage.getItem('userId') != null  ? 
                                    <Link to={link_item[5].link}>
                                        <ListGroupItem onClick={()=>{setOpenDrawer(false)}}  className="navbar-mobile-side-menu-item text-muted" >{link_item[5].name}</ListGroupItem>
                                    </Link>
                                :
                                ''
                            }
                            <Link to={link_item[6].link}>
                                <ListGroupItem onClick={()=>{setOpenDrawer(false)}}  className="navbar-mobile-side-menu-item text-muted" >{link_item[6].name}</ListGroupItem>
                            </Link>
                           
                            <Link to={link_item[7].link}>
                                <ListGroupItem onClick={()=>{setOpenDrawer(false)}}  className="navbar-mobile-side-menu-item text-muted" >{link_item[7].name}</ListGroupItem>
                            </Link>
                        </ListGroup>
                    </div>                   
            }          
        </div>
    )
}


const link_item = [
    {
        name:'Home',
        link:'/',
        className: 'navbar-desktop-link'
    },
    {
        name:'Order Report',
        link:'/search',
        className: 'navbar-desktop-link btn-primary-nav bg-transparent' 
    },
    {
        name:'About Us',
        link:'/about',
        className: 'navbar-desktop-link'
    },
    {
        name:'Find an Agent',
        link:'/service',
        className: 'navbar-desktop-link'
    },
    {
        name:'Insurance',
        link:'/#',
        className: 'navbar-desktop-link'
    },
    {
        name:'Wall',
        link:'/wall',
        className: 'navbar-desktop-link'
    },
    {
        name:'Latest Articles',
        link:'/blog',
        className: 'navbar-desktop-link'
    },
    {
        name:'Login',
        link:'/login',
        className: 'navbar-desktop-link-login'
    },
]
export default Header
