import React from 'react'
import {Navbar, Form, Button, FormControl, Image} from 'react-bootstrap'
import NotificationIcon from '../../../assets/images/icons/admin_notification_icon.svg'
import Avatar from '../../../assets/images/avatars/avatar1.svg'

function AdminNavbar() {
    return (
        <div>
            <Navbar className='admin-navbar'>
                <Navbar.Brand className='admin-title'>DashBoard</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">                    
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" className="admin-search-box" />
                    </Form>
                    <div className="ml-3">
                        <Image src={NotificationIcon}></Image>
                    </div>
                    <div className="text-center ml-3">
                        <Image src={Avatar} className="admin-avatar"></Image>
                        <p className="admin-text my-0">John Doe</p>
                    </div>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default AdminNavbar
