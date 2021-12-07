import React, { useEffect,useState  } from 'react'
import { Card, Col, Image, Row, Button, Form } from 'react-bootstrap'
import AvatarImage from '../../assets/images/avatars/avatar2.svg'
import {Link} from 'react-router-dom'
import axios from 'axios';
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'

function Subreply(props) {
    


    const [subreply, setsubreply] = React.useState("");
    const [sreply, setsreply] = React.useState([]);
    const [reply, setReply] = React.useState(true);
    const [modal2, setModal2] = React.useState(false);
    const [sub_Reply, set_subreply] = React.useState([]);
    const [replyText, setReplyText] = React.useState();
  


    const toggleModal2 = () => {
        setModal2(!modal2);
    };

    if(modal2) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    async function handleSendSubReply(reply_id){
        const reply = document.getElementById("reply").value
        
        if(reply !== ""){
            
            
            setModal2(false);
            let userId = localStorage.getItem("userId");
            const user = await axios.post(
                
                process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
                {
                    action:"addSubReply",
                    reply_id:reply_id,
                    user_id:userId,
                    reply:replyText
                }
            );

            notify("Sent message");
            window.location.reload(true);
        }else{

        }
    }
    const notify = (message) => toast(message);
    
    useEffect(
        async()=>{
            
            var user_id = localStorage.getItem("userId");
            
            if(localStorage.getItem("tokens") === "" || localStorage.getItem("tokens") === null){
                setReply(false);                
            }
            else {
                setReply(true);
                set_subreply(props.subReply);
                let array = props.subReply.filter( data => data.reply_id == props.reply_id)

                setsreply(array);
            }

            
        }, []
    )

    return (
        <div>
            <p><strong>A.</strong> {props.answer} 
                <div className="sub-reply">
                   {
                        sreply.map(
                            (item)=><p>A. {item.answer}</p>
                        )    
                    }
                </div>
                {
                    reply ? 
                        <Link className="text-decoration-none" to="#">
                            <p className="subreply wall-answer-text font-color" onClick={toggleModal2}>Reply</p>
                        </Link>

                    :
                        <p className="text-decoration-none wall-reply app-text" style={{cursor: "not-allowed"}}> Reply</p>
                }
                
            </p>
            {modal2 && (
                <div className="position-relative d-flex align-items-center sub-reply-input">
                    <Button 
                        className = "search-button-small ans-reply-send"
                        onClick = {
                            () => handleSendSubReply(props.reply_id)
                        }
                    >
                        Sent
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
            )}
            <ToastContainer toastClassName = "border border-grey" />
        </div>
        
    )
}

export default Subreply
