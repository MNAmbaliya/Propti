import {React ,useState,useEffect}  from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import Popup from 'reactjs-popup';
import {Link} from 'react-router-dom';
// import resources
import Avatar1 from '../../../assets/images/avatars/avatar1.svg';
import Avatar2 from '../../../assets/images/avatars/avatar2.svg';
import Avatar3 from '../../../assets/images/avatars/avatar3.svg';
import axios from 'axios'


import Partner1 from './partner1'
import Partner2 from './partner2'
import Partner3 from './partner3'

import FollowIcon from '../../../assets/images/icons/follow_icon.svg';
import YearIcon from '../../../assets/images/icons/year_icon.svg';
import '../../../assets/css/partners.css';

function Partners() {

    const [Users, setUsers] = useState([]);
    useEffect(
        async()=>{
            const users = await axios.get(                
                process.env.REACT_APP_BACKEND_API_URL + "/test_api.php?action=getUsers"
            );
            const data = users.data.reverse();
            setUsers(data);
        }, []
    )


    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    if(modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <div className="partner-root">
            <p className='home-section-title-1'>PARTNERS</p>
            <div className='d-flex justify-content-between align-items-end set_partner_root'>
                <p className='home-section-title'>Partner on Board</p>
                <p className='about-title-content'>
                    <Link to="./service">
                        Check All &gt;
                    </Link>
                </p>
            </div>
            <Row className="mt-3">
                {
                    Users.filter((item, index) => index < 3).map(
                        (item)=>( 
                            <Partner1 name={item.name} agency={item.agency} role={item.role} avatar={item.avatar} addres={item.address} mobile={item.mobile} email={item.email}/>
                        )
                    )
                }
                
                
            </Row>
            
        </div>
    )
}

const Data =[
    {
        id:'partner_1',
        name:'Dr. John Doe',
        content:'Lorem Ipsum is a simply dummy text used in typing industry since 1500s, to get mark.',
        follow: 95,
        year: 4,
        avatar: Avatar1
    },
    {
        id:'partner_2',
        name:'Dr. John Doe',
        content:'Lorem Ipsum is a simply dummy text used in typing industry since 1500s, to get mark.',
        follow: 86,
        year: 4,
        avatar:Avatar2
    },
    {
        id:'partner_3',
        name:'Dr. John Doe',
        content:'Lorem Ipsum is a simply dummy text used in typing industry since 1500s, to get mark.',
        follow: 90,
        year: 4,
        avatar:Avatar3
    },
]; 
export default Partners
