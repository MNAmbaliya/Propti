import React, { useEffect } from 'react'
import { Col, Container, Form, Image, Row, Button, Accordion, Card, NavItem } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import axios from 'axios'

import '../assets/css/wall.css'
import Header from '../components/header'
import Footer from '../components/footer'
import Wallcard from '../components/wall/wallcard'
import Expert from '../components/wall/expert'
import BgPattern1 from '../assets/images/bg/pattern/hero_bg_pattern.svg'
import DropDownIcon from '../assets/images/icons/navbar_dropdown.svg'
import AvatarImage from '../assets/images/avatars/avatar2.svg'
import CreateWallModal from '../components/wall/createwallmodal'

function Wall() {
    /**
     * Declaration the state variable for search and filtered data
     */
    const [data, setData] =React.useState([]);
    const [roleUser, setRoleUser] =React.useState([]);
    const [walldata, setwallData] = React.useState(
        {
            question:""
        }
    )
    const [filteredData, setFilteredData] = React.useState(data);
    console.log(filteredData);
    const [searchString, setSearchString] = React.useState('');
    const [subreply, setsubreply] = React.useState({});
    
    /**
     * Search function is implemented here
     * @param {*} string 
     */
    function Search(string){
        let filter_string=string.trim().toLowerCase();
        if(filter_string.length > 0){
            setFilteredData(
                data.filter(
                    function(i){
                        return i.question.toLowerCase().match( filter_string );
                    }
                )
            )
        }
        if(filter_string.length == 0){
            setFilteredData(data)
        }
    }

    /**
     * Call API to get wall Data 
     */
     
    async function addQuestion(e){
        e.preventDefault(); 
        const data = {
            action:"createWall",
            user_id:localStorage.getItem("userId"),
            question:walldata.question,
            allowed:0,
        }
        

        const res = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            data
        )
    }

    async function getWalls(){
        const res = await axios.get(process.env.REACT_APP_BACKEND_API_URL + "/test_api.php?action=getWalls");
        
        setData(res.data.filter( data => data.allowed === true));
        setFilteredData(res.data.filter( data => data.allowed == 1));
        
    }

    async function getSub(){
        const subreport = await axios.post(
                
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:"getSubReply"
            }
        );
        setsubreply(subreport.data);
        
    }

    async function getExpert(){
        const users = await axios.post(
                
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:"getUserRole",
                role:'real_estate_agent'
            }
        );
        setRoleUser(users.data);
    }
    
    

    
    /**
     * Call API when this page load
     */

    useEffect(
        ()=>{
            if(localStorage.getItem("userId") == null){
                document.getElementById("ask_que_btn").disabled = true;
            }
            getWalls();
            getExpert();
            getSub();
            
        }, []
    )
    /**
     * Rendering Views
     */
    return (
        <div style={{position: 'relative'}}>
            <Image src={BgPattern1} className="position-absolute w-100" style={{ marginTop:'100px', zIndex:'-1'}}></Image>
            <Container>
                <Header/>
                <div className="text-center set_page_title">
                    <p className="login-title">Wall</p>
                </div>
                <Row className="wall-root">
                    <Col xl={3} md={12} >
                        <Form>
                            <div className="position-relative d-flex align-items-center search-blog">
                                <Button className="search-button-small" onClick={()=>Search(searchString)}>Search</Button>
                                <Form.Control
                                    type='text'
                                    placeholder='Search here'
                                    name="search"
                                    className="serch-box"
                                    onChange={(e)=>{setSearchString(e.target.value)}}
                                    value={searchString}
                                />                                
                            </div>
                        </Form>
                        <Accordion className="blog-category-toggle">
                            <Accordion.Toggle as={Button} variant="link" eventKey="0"  className="toggle-button">
                                <div className="d-flex align-items-center mt-4">
                                    <Image src={DropDownIcon}></Image>
                                    <p className="ml-3 my-0 app-text blog-toggle-title"><b>Category</b></p>
                                </div>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <div className="ml-5">
                                    <p className="my-2"><Link to="#" className="text-decoration-none wall-nav-link app-text">All</Link></p>
                                    <p className="my-2"><Link to="#" className="text-decoration-none wall-nav-link app-text">ABC Report</Link></p>
                                    <p className="my-2"><Link to="#" className="text-decoration-none wall-nav-link app-text">Lorem Ipsum Page</Link></p>
                                    <p className="my-2"><Link to="#" className="text-decoration-none wall-nav-link app-text">Study Regarding</Link></p>
                                    <p className="my-2"><Link to="#" className="text-decoration-none wall-nav-link app-text">Travelling Trip</Link></p>
                                    <p className="my-2"><Link to="#" className="text-decoration-none wall-nav-link app-text">Real Estate Agent</Link></p>
                                </div>
                            </Accordion.Collapse>
                        </Accordion>
                    </Col>
                    <Col xl={6} md={12}>
                        <Card className="card-layout wall_card">
                            <Card.Body>
                                <div className="d-flex align-items-center">
                                    <Image src={AvatarImage} className="small-avatar"></Image>
                                    <p className="my-0 app-text px-3">{localStorage.getItem('userName')}</p>
                                </div>
                                <div className="wall_sec">
                                    <Form onSubmit={addQuestion}>
                                        <div className="whats_q">
                                                <Form.Group controlid="Question">
                                                    <Form.Control
                                                        type="text"
                                                        placeholder='What is Your Question?'
                                                        name="question"
                                                        className="set-question-wall"
                                                        required
                                                        value={walldata.question}
                                                        onChange = {
                                                            (e) => setwallData({
                                                                ...walldata,
                                                                question: e.target.value
                                                            })
                                                        }
                                                    />
                                                </Form.Group>
                                                {/* <p className="app-title wall-ques-title">What is your questions?</p> */}
                                        </div>
                                        <div className="ask_question">
                                                <Button type="submit" id="ask_que_btn" className="search-button-small ask_question_btn">Ask Question</Button>
                                                <CreateWallModal getWalls = {()=> getWalls() }/>
                                        </div>
                                    </Form>
                                </div>
                            </Card.Body>
                        </Card>
                        {
                            filteredData.map(
                                (item)=>(
                                    <Wallcard
                                        key={item.id}
                                        question_title = {item.question}
                                        question_content = {item.reply != '' ? item.reply[0].answer : "" }
                                        similar_question_num = {item.reply.length}
                                        date={item.date}
                                        wall_data = {item}
                                        reply = {item.reply}
                                        subReply = {subreply}
                                        userID = {item.user_id}
                                    />
                                )
                            )
                            
                        }
                    </Col>
                    <Col xl={3} md={12} className="expert_on_board" style={{position:'static'}}>
                        <Card className="card-layout" style={{position:'static'}}>
                            <Card.Body style={{position:'static'}}>
                                <p className='wall-question-title'>Expert on Board</p>
                                {

                                    roleUser.filter((item, index) => index < 4).map(
                                        (item)=>( 
                                           <Expert name={item.name} role={item.role} avatar={item.avatar}/>
                                        )
                                    )
                                }
                                <div className="d-flex justify-content-center mt-1 view_all_button">
                                    <Link className="btn btn-primary" style={{borderRadius:"40px"}} to='./service'>
                                        View All
                                    </Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    )
}
const Data_partner = [
    {
        name: "Dr. John Doe",
        user_type:"Client"
    },
    {
        name: "Dr. John Doe",
        user_type:"Client"
    },
    {
        name: "Dr. John Doe",
        user_type:"Client"
    },
    {
        name: "Dr. John Doe",
        user_type:"Client"
    }
]

export default Wall
