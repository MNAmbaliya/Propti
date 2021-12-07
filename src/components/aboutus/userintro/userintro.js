import React from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'


function Userinfo(props) {
    const history = useHistory();

    async function homeTop(){
        history.push({
            pathname: props.to,
            state: { 
                scroll:"top"
            },
            
        });
        window.scrollTo(0,0)

    }
    
    return (
        <div className="user_intro">
            <div className="aboutus-userinfo-card">
                <p className="aboutus-title curious_card_title">{props.title}</p>
                <p className="aboutus-text" >{props.content}</p>
                <p className="aboutus-link aboutus_create_ac curious_card_link" onClick={
                    ()=>homeTop()
                }>{props.link}</p>
            </div>
        </div>
    )
}

export default Userinfo
