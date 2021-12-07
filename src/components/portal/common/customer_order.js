import React, { useEffect } from 'react'
import { Col, Row, Image, Tabs, Tab, Table } from 'react-bootstrap'
import CheckOkIcon from '../../../assets/images/icons/check_no_icon.svg'
import CheckNoIcon from '../../../assets/images/icons/check_ok_icon.svg'
import axios from 'axios'



export default function Customer_order(props) {
    
    console.log(props);

    async function CreateOrder(){
    
        const user = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:"OrderUpdate",
                id:props.id,
                status:'progress'
            }
        );

        var d = new Date();
        const notification = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:"addNotification",
                text:'Activate new order from ',
                time:d,
                id:props.id,
            }
        );

        const mail = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:"orderinprogressemail",
                email:props.allDetail.email,
                mobile:props.allDetail.mobile,
                file:props.allDetail.file,
                name:props.allDetail.name,
                address:props.allDetail.address,
                forWhat:props.allDetail.forWhat,
                agent:props.allDetail.agent,
                reporter:props.allDetail.reporter,
                date:props.allDetail.date
            }
        );

        var data = [
            {
                action:"addCalander",
                id:props.id,
                title: props.address,
                start_date: new Date(props.date.substring(0,10)) ,
                end_date:  new Date(props.date.substring(0,10)) ,
                a_id:localStorage.getItem("userId")
            }
        ];

        // Calander Date add
        const addCalander = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:"addCalander",
                id:props.id,
                title: props.address,
                start_date:  new Date(props.date.substring(0,10)) ,
                end_date:  new Date(props.date.substring(0,10)) ,
                a_id:localStorage.getItem("userId")
            }
        );

        // Create Report
        // const timeElapsed = Date.now();
        // const today = new Date(timeElapsed);
        // const date = today.toLocaleDateString(); 

        // const addReport = await axios.post(
        //     process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
        //     {
        //         action:"uploadReport",
        //         proaddress:props.formatedAddress,
        //         reportedby:props.agent,
        //         reportdate:date,
        //         contactnum:'',
        //         choosefile:props.file
        //     }
        // );
        // console.log(addReport);
        

        window.location.reload();
    }

    async function completedOrder(){
        const user = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:"OrderUpdate",
                id:props.id,
                status:'activate'
            }
        );

        var d = new Date();
        const notification = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:"addNotification",
                text:'Completed a Order from ',
                time:d,
                id:props.id,
            }
        );

        // Send mail to agent to admin
        const mail = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:"orderincompletedemail",
                email:props.allDetail.email,
                mobile:props.allDetail.mobile,
                file:props.allDetail.file,
                name:props.allDetail.name,
                address:props.allDetail.address,
                forWhat:props.allDetail.forWhat,
                agent:props.allDetail.agent,
                reporter:props.allDetail.reporter,
                date:props.allDetail.date
            }
        );
            
        window.location.reload();
    }
    
    return (
        <tr>
            <td className="faqs-text">{props.name}</td>
            <td className="faqs-text">{props.address} </td>
            <td className="faqs-text">{props.agent}</td>
            <td className="faqs-text">{props.date}	</td>
            <td>
                {
                    props.orderStatus != undefined ?
                        props.orderStatus == "completed" ?
                            ''
                        : 
                            props.orderStatus == "progress" ?
                                <>
                                    <Image src={CheckOkIcon}/>
                                    <Image style={{ cursor:"pointer" }} className="ml-3" src={CheckNoIcon}
                                        onClick={
                                            ()=>completedOrder()
                                        }
                                    />
                                </>
                            :
                                <>
                                    <Image src={CheckOkIcon}/>
                                    <Image style={{ cursor:"pointer" }} className="ml-3" src={CheckNoIcon}
                                        onClick={
                                            ()=>CreateOrder()
                                        }
                                    />
                                </>
                    :
                    <>
                        <Image src={CheckOkIcon}/>
                        <Image style={{ cursor:"pointer" }} className="ml-3" src={CheckNoIcon}
                            onClick={
                                ()=>CreateOrder()
                            }
                        />
                    </>
                }

                
            </td>
        </tr>
    )
}
