import React, { useEffect,useState  } from 'react'
import { Card, Col, Image, Row, Button, Form } from 'react-bootstrap'
import AvatarImage from '../../assets/images/avatars/avatar2.svg'
import {Link} from 'react-router-dom'
import axios from 'axios';
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import Subreply from './subreply'

function Wallcard(props) {
    /**
     * get user info for redux
     */
     const [modal, setModal] = useState(false);
     
     const toggleModal = () => {


        setModal(!modal);
     };
    

     if(modal) {
         document.body.classList.add('active-modal')
     } else {
         document.body.classList.remove('active-modal')
     }
    
    

    const user = useSelector((state) => state.auth.user);
    const [userData, serUserData] = React.useState("");
    /**
     *  Set state variable for toggler
     */
    const [toggle, setToggle] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState({});
    const [subReply, setsubreply] = React.useState({});
    const [userWall, setUserWall] = React.useState({});
    console.log('userWall');
    console.log(userWall);
    const [reply, setReply] = React.useState(true);
    const [replyText, setReplyText] = React.useState();
    const notify = (message) => toast(message);
    /**
     *  Get userinfo from Database
     */
    useEffect(
        async()=>{
            var user_id = localStorage.getItem("userId");
            serUserData(user);
            getUser();
            if(localStorage.getItem("tokens") === "" || localStorage.getItem("tokens") === null){
                setReply(false);
                
            }
            else {
                setReply(true);
                
                const user = await axios.post(
                    process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
                    {
                        action:"getUser",
                        id:user_id
                    }
                    //{ headers: {"Authorization" : `Bearer ${localStorage.getItem("tokens")}`} }
                );
                setUserInfo(user.data);
                

                if(props.wall_data.user_id == localStorage.getItem("userId")){
                    setReply(false)
                }
            }

           
        }, []
    )

    async function getUser(){
        const user = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:"getUser",
                id:props.userID
            }
            //{ headers: {"Authorization" : `Bearer ${localStorage.getItem("tokens")}`} }
        );
        // console.log(user);
        setUserWall(user.data[0])
    }

    /**
     * send reply
     */
    async function handleSendReply(){
        const reply = document.getElementById("reply").value
        if(reply !== ""){
            
            
            setToggle(false);
            let userId = localStorage.getItem("userId");
            const user = await axios.post(
                
                process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
                {
                    action:"addReply",
                    user_id:userId,
                    wall_id:props.wall_data.wall_id,
                    reply:replyText
                }
                //{ headers: {"Authorization" : `Bearer ${localStorage.getItem("tokens")}`} }
            );
            // const res = await axios.post(
            //     process.env.REACT_APP_BACKEND_API_URL+"/v1/wall/update", 
            //     {
            //         id: props.wall_data.id,
            //         allowed: true,
            //         reply: props.wall_data.reply
            //     }
            // );
        }else{

        }
    }

    async function handleSendSubReply(){
    }

    /**
     * Rendering View
     */
    return (
        <div>
            <Card className="card-layout my-4 apporved-card">
                <Card.Body>
                    <p className="wall-question-title">Q. {props.question_title}</p>
                    <Row>
                        <Col md={1}>
                            <Image src={AvatarImage} className="small-avatar"></Image>
                        </Col>
                        <Col md={11}>
                            <p className="my-0 wall-answer-text px-3"><strong>A.</strong> {props.question_content}</p>
                            <div className="d-flex justify-content-between px-3 pt-3">
                                {
                                    reply ? 
                                        <Link 
                                            onClick={()=>{setToggle(!toggle)}} 
                                            className="text-decoration-none" to="#"
                                        >
                                                <p className="app-text text-primary wall-reply my-0">Reply</p>
                                        </Link> 
                                        :
                                        <p className="text-decoration-none wall-reply app-text" style={{cursor: "not-allowed"}}> Reply</p>
                                }
                                <p className="wall-ans-date my-0"><i>{props.date}</i></p>
                            </div>
                        </Col>
                    </Row>
                    {
                        toggle&&<>
                            <div className="p-3">
                                <div className="d-flex align-items-center py-2">
                                    <Image src={userWall.avatar != '' ? userWall.avatar : AvatarImage} className="small-avatar"></Image>
                                    <div>
                                        <p className="my-0 app-text px-3 text-dark">{userInfo.name}</p>
                                        <p className="my-0 app-text px-3">{userInfo.role}</p>
                                    </div>
                                </div>
                                <Form>
                                    <div className="position-relative d-flex align-items-center">
                                        <Button 
                                            className = "search-button-small ans-reply-send"
                                            onClick = {
                                                () => handleSendReply()
                                            }
                                        >
                                            Send
                                        </Button>                            
                                        <textarea 
                                            id = "reply"
                                            type = 'text' 
                                            placeholder = 'Please Enter your Answer here' 
                                            name = "send" 
                                            row = {2}
                                            className = "w-100 ans-reply-input"
                                        
                                            onChange = {      
                                                (e)=>setReplyText(e.target.value)
                                            }
                                        />
                                    </div>  
                                </Form>
                            </div>
                        </>
                    }
                    
                    <div className="d-flex justify-content-between wall-ans-footer">
                        <p className="wall-answer-text ">
                            <span className="mr-2">
                                <b>{props.similar_question_num}</b>
                            </span> 
                            More Answer to this Quation 
                        </p>
                        <Link className="text-decoration-none" to="#"><p className="wall-answer-text font-color" onClick={toggleModal}>View All </p></Link>
                        
                    </div>
                    {modal && (
                        <div>
                            <div className="all_que">
                                {
                                    props.reply.map(
                                        (items)=>(
                                            <>
                                                <Subreply answer={items.answer} reply_id={items.reply_id} subReply={props.subReply} />
                                            </>
                                            
                                        )
                                    )
                                }
                                 
                            </div>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </div>
    )
}

export default Wallcard
