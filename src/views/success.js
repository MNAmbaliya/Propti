import React, {useEffect} from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import Footer from '../components/footer'
import { useLocation } from 'react-router-dom';
import axios from 'axios'

import Header from '../components/header'
import BgPattern3 from '../assets/images/bg/pattern/footer_bg_pattern.svg'
import SuccessImage from '../assets/images/svg/success_image_svg.svg'

function Success() {
    const all_date = useLocation();
    let order = all_date.state.order;

    async function storeCode(){
        // const subreport = await axios.post(
                
        //     process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
        //     {
        //         action:"order_code",
        //         report:all_date.state.order,
        //         code:all_date.state.number,
        //     }
        // );
        // console.log(subreport);
    }

    useEffect(
        ()=>{
            storeCode();       
            window.scrollTo(0,0);
        }, []
    )


    return (
        <div>
            <Image src={BgPattern3} className="position-absolute w-100" style={{ marginTop:'180px', zIndex:'-1'}}></Image>
            <Container>
                <Header/>
                <div className="text-center set_page_title">
                    <p className="login-title">Order {order}</p>
                </div>
                <Row>
                    <Col md={6}>
                        <Image src={SuccessImage} className="" style={{ width:'100%'}}/>
                    </Col>
                    <Col md={6} className="mt-5">
                        <p className="thanks-title text-center">Thank you for<br/> Ordering {order}</p>
                        <div className="my-3">
                            <p className="thanks-text text-center">
                                {all_date.state.text}
                            </p>
                        </div>
                        <div className="my-5">
                            <p className="thanks-id-text text-center">
                                Order Reference ID : <span className="ml-3 text-primary">{all_date.state.number}</span>
                            </p>
                        </div>
                    </Col>
                </Row>
                
            </Container>
            <Footer/>
            
        </div>
    )
}

export default Success
