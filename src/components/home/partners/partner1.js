
import {React ,useState}  from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

import { useLocation } from 'react-router-dom';

import DefaultAvatar from '../../../assets/images/avatars/default.png';
import Avatar1 from '../../../assets/images/avatars/avatar1.svg';
import Avatar2 from '../../../assets/images/avatars/avatar2.svg';
import Avatar3 from '../../../assets/images/avatars/avatar3.svg';
import PartnerBg from '../../../assets/images/bg/pattern/partner.png';
import location from '../../../assets/images/svg/location.svg';
import Role from '../../../assets/images/svg/role.png';
import address from '../../../assets/images/svg/address.svg';
import mobile from '../../../assets/images/svg/mobile.svg';
import mail from '../../../assets/images/svg/mail.svg';
import close from '../../../assets/images/svg/close.svg';
import FollowIcon from '../../../assets/images/icons/follow_icon.svg';
import YearIcon from '../../../assets/images/icons/year_icon.svg';

function Partner1(props){
    const all_date = useLocation();
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);

        if(modal){
            document.body.style.overflow = "";
        }else{
            document.body.style.overflow = "hidden";
        }

    };

    if(modal) {
        document.body.classList.add('active-modal');
        
    } else {
        document.body.classList.remove('active-modal');
    }

    return (
        <>
        
            <Col key='partner_1' style={{borderLeft:'0.3px dashed rgba(0, 0, 0, 0.1)'}}>
                <Card className="partner-card">
                    <Card.Body>
                        <Card.Img src={ props.avatar != "" ? props.avatar.substring(1, 5) == "https" ? props.avatar + ".png" : props.avatar : DefaultAvatar} className="partner-avatar my-3"></Card.Img>
                        <Card.Title className="partner-card-title">
                           {props.name}
                        </Card.Title>
                        <Card.Text className="partner-card-text">
                            Lorem Ipsum is a simply dummy text used in typing industry since 1500s, to get mark.
                        </Card.Text>
                        <div className="d-flex align-items-center">
                            <div className="d-flex align-items-center">
                                <img src={Role}></img>
                                <p className='my-0  ml-3 partner-card-text year_text'>{props.role.replaceAll("_"," ")}</p>
                            </div>
                            <div className="d-flex ml-5 ">
                                <img src={YearIcon}></img>
                                <p className='my-0  ml-3 partner-card-text year_text'>{props.agency}</p>
                            </div>
                        </div>
                        <Card.Link>
                            <Button variant="primary"  className='mt-2 partner-card-link'
                                onClick={toggleModal}
                            >Contact</Button>
                            
                        </Card.Link>
                    </Card.Body>
                </Card>
            </Col>
            {modal && (

                <div>
                   
                    <div onClick={toggleModal} className="overlay1"></div>
                    <div className="modal1">
                        <div className="bg_img">
                            <img className="partner_background" src={PartnerBg}></img>
                        </div>
                        
                        <div className="modal1-content">
                            <img src={ props.avatar != "" ? props.avatar.substring(1, 5) == "https" ? props.avatar + ".png" : props.avatar : DefaultAvatar} className="card-partner-avatar my-3"></img>
                            <h2 className='client_text'>{props.name}</h2>
                            <h5 className='silent_text'>{props.role.replaceAll("_"," ")}</h5>
                            <div className="private_details">
                                <div className="location">
                                    <div className="icon"><img src={location}></img></div>
                                    <div className="cnt">{props.role.replaceAll("_"," ")}</div>
                                </div>
                                <div className="address">
                                    <div className="icon"><img src={address}></img></div>
                                    <div className="cnt">{props.addres}</div>
                                </div>
                                <div className="mobile">
                                    <div className="icon"><img src={mobile}></img></div>
                                    <div className="cnt">{props.mobile}</div>
                                </div>
                                <div className="email">
                                    <div className="icon"><img src={mail}></img></div>
                                    <div className="cnt">{props.email}</div>
                                </div>
                            </div>
                            <img className="close_toggle" onClick={toggleModal} src={close}></img>
                        </div>
                    </div>

                </div>
            )}
        </>
    )
}

export default Partner1