import React,{useState} from 'react'
import { Col, Container, Form, Image, Row, Button, Accordion, Card, NavItem } from 'react-bootstrap'
import AvatarImage from '../../assets/images/avatars/default.png'
import PartnerBg from '../../assets/images/bg/pattern/partner.png';
import location from '../../assets/images/svg/location.svg';
import address from '../../assets/images/svg/address.svg';
import mobile from '../../assets/images/svg/mobile.svg';
import mail from '../../assets/images/svg/mail.svg';
import close from '../../assets/images/svg/close.svg';
import Avatar1 from '../../assets/images/avatars/avatar1.svg';


export default function Expert(item) {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
        // setIsComponentVisible(true);
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
    
    return (
        <div>
            
             <div className="d-flex align-items-center py-2" key={item.name} style={{cursor:'pointer',position:'static'}} onClick={toggleModal}>
                <Image src={item.avatar != '' ? item.avatar : AvatarImage} className="small-avatar"></Image>
                <div>
                    <p className="my-0 wall-answer-text px-3 text-dark">{item.name}</p>
                    <p className="my-0 wall-answer-text px-3">{item.role.replaceAll("_"," ")}</p>
                </div>
            </div>
            
            {modal && (
                <div >
                     <div onClick={toggleModal} className="overlay1"></div>
                    <div className="modal1">
                       
                        
                        <div className="bg_img">
                            <img className="partner_background" src={PartnerBg}></img>
                        </div>
                        
                        <div className="modal1-content">
                            <img src={item.avatar != '' ? item.avatar : AvatarImage} className="card-partner-avatar my-3"></img>
                            <h2 className='client_text'>{item.name}</h2>
                            <h5 className='silent_text'>{item.role.replaceAll("_"," ")}</h5>
                            <div className="private_details">
                                <div className="location">
                                    <div className="icon"><img src={location}></img></div>
                                    <div className="cnt">301 Silverstone <br /> Arcade New Your</div>
                                </div>
                                <div className="address">
                                    <div className="icon"><img src={address}></img></div>
                                    <div className="cnt">109 Manhattan  <br /> Street Sydney</div>
                                </div>
                                <div className="mobile">
                                    <div className="icon"><img src={mobile}></img></div>
                                    <div className="cnt">0400 000 000</div>
                                </div>
                                <div className="email">
                                    <div className="icon"><img src={mail}></img></div>
                                    <div className="cnt">admin@admin.com</div>
                                </div>
                            </div>
                            <img className="close_toggle" onClick={toggleModal} src={close}></img>
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}
