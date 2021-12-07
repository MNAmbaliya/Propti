import {React ,useState,useRef,useEffect } from 'react'
import { Button, Card } from 'react-bootstrap'

import Avatar from '../../assets/images/avatars/default.png'
import location from '../../assets/images/svg/location.svg';
import address from '../../assets/images/svg/address.svg';
import mobile from '../../assets/images/svg/mobile.svg';
import mail from '../../assets/images/svg/mail.svg';
import close from '../../assets/images/svg/close.svg';
import PartnerBg from '../../assets/images/bg/pattern/partner.png';
import axios from 'axios'
function ServiceCard(props) {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
        setIsComponentVisible(true);
        if(modal){
            document.body.style.overflow = "";
        }else{
            document.body.style.overflow = "hidden";
        }
    };

    if(modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const [isComponentVisible, setIsComponentVisible] = useState(true);
    const modalRef = useRef(null);
    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setIsComponentVisible(false);
            setModal(false);
            document.body.style.overflow = "";
        }
        
    };


    // User extra information
    const [user, setUser] = useState([]);
    console.log('user');
    console.log(user);
    async function getUserInfo(){
        const users = await axios.post(
                
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:"GetRegisterInfo",
                id:props.id
            }
        );
        
        if(users.data[0] != undefined){
            // console.log(users.data[0]);
            setUser(users.data[0]);
        }
        
    }


    useEffect(
        ()=>{           
            getUserInfo();
            document.addEventListener('click', handleClickOutside, true);
            return () => {
                document.removeEventListener('click', handleClickOutside, true);
            }; 
        }, []
    )

    return (
        <>
            
            <div>
                <Card className="service-card my-1 set_service_card">
                    <div className="d-flex justify-content-center">
                        <Card.Img className="service-avatar" src={
                            user.avatar != undefined ? 
                                user.avatar != '' ?
                                    user.avatar
                                : Avatar
                            : Avatar
                        
                        }/>
                    </div>
                    <Card.Body className="px-2 service_card_body">
                        <Card.Title className="app-title text-center service-title">
                            {user.fname != undefined ? user.fname + " " + user.lname
                            : props.title
                            }
                        </Card.Title>
                        <Card.Text className="app-text text-center">
                            {props.text}
                        </Card.Text>
                        <div className="d-flex justify-content-center p-2 mt-4">
                            <Button className="app-title app-button f_service_btn"
                                onClick={toggleModal}
                            >Contact</Button>
                        </div>
                    </Card.Body>
                </Card>
                {modal && (
                    
                    <div ref={modalRef}>
                        <div onClick={toggleModal} className="overlay1"></div>
                        {isComponentVisible && (

                            <div className="modal1">
                            <div className="bg_img">
                                <img className="partner_background" src={PartnerBg}></img>
                            </div>

                            <div className="modal1-content">
                                <img src={
                                    user.avatar != undefined || user.avatar != null ? 
                                            user.avatar != '' ?
                                                user.avatar
                                            : Avatar
                                        : Avatar
                                    } 
                                className="card-partner-avatar my-3"></img>
                                <h2 className='client_text'> 
                                    {
                                        user.fname != undefined 
                                        ? 
                                            user.fname + " " + user.lname
                                        :
                                            props.title
                                    }
                                </h2>
                                <h5 className='silent_text'>Client</h5>
                                <div className="private_details">
                                    <div className="location">
                                        <div className="icon"><img src={location}></img></div>
                                        <div className="cnt">{props.text}</div>
                                    </div>
                                    <div className="address">
                                        <div className="icon"><img src={address}></img></div>
                                        <div className="cnt">    
                                            {
                                                user.address != undefined 
                                                ? 
                                                    user.address 
                                                :
                                                    '109 Manhattan Street Sydney'
                                            }
                                        </div>
                                    </div>
                                    <div className="email">
                                        <div className="icon"><img src={mail}></img></div>
                                        <div className="cnt">
                                            {
                                                user.email != undefined 
                                                ? 
                                                    user.email 
                                                :
                                                    'admin@admin.com'
                                            }
                                        </div>
                                    </div>
                                    <div className="mobile">
                                        <div className="icon"><img src={mobile}></img></div>
                                        <div className="cnt">
                                            
                                            {
                                                user.number != undefined 
                                                ? 
                                                    user.number 
                                                :
                                                    '000000000'
                                            }

                                        </div>
                                    </div>
                                
                                </div>
                                <img className="close_toggle" onClick={toggleModal} src={close}></img>
                            </div>
                            </div>
                            
                        )}
                        
                    </div>
                )}
            </div>
        </>
    )
}

export default ServiceCard
