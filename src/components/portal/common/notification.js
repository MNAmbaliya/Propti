
import React, { useEffect } from 'react'
import { Col, Row, Image, Tabs, Tab, Table } from 'react-bootstrap'
import axios from 'axios'
import CautionIcon from '../../../assets/images/icons/caution_icon.svg'

export default function Notification(props) {

    // console.log(props);
    const [order, setOrder] =React.useState([]);
    console.log('order');
    console.log(order);

    async function getOrder(){
        const order = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:"getorderfromorderID",
                id:props.notification.orderID
            }
        );
        setOrder(order.data[0]);
    }

    useEffect(
        ()=>{
            getOrder();
        }, []
    )


    return (
        <div>
            <div className="d-flex align-items-center justify-content-between my-2">
                <div className="notification-icon-shape-out">
                    <div className='notification-icon-shape'>
                        <Image src={CautionIcon}></Image>
                    </div>
                </div>
                <p className="my-0 ml-2 notific-text">{order != undefined ? props.notification.text + " " + order.agent : ''}</p>
                <p className="my-0 ml-1 notific-text ">{props.notification.time.substring(0, 10)}</p>
            </div>
        </div>
    )
}
