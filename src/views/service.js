import React,{useEffect} from 'react'
import { Col, Container, Row, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import axios from 'axios'
import Footer from '../components/footer'
import Header from '../components/header'
import BgPattern1 from '../assets/images/bg/pattern/hero_bg_pattern.svg';
import BgPattern2 from '../assets/images/bg/pattern/ourwork_bg_pattern.svg'
import BgPattern3 from '../assets/images/bg/pattern/footer_bg_pattern.svg';
import '../assets/css/service.css'
import ServiceCard from '../components/service/servicecard';

function Service() {
    var sortby = "all";
    const [userRole, setUserRole] = React.useState([])
    window.scrollTo(0, 0);
    // let filtered_data = userRole.filter(Data=>Data.user_type==sortby)

    
    
   

    // if(sortby=="All"){filtered_data = Data}
    
    async function getExpert(){
        const users = await axios.post(
                
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:"getUserRole",
                role:sortby
            }
        );
        setUserRole(users.data);
    }

    async function clickFetch(role){
        sortby = role;
        getExpert();
    }

    useEffect(
        ()=>{
            getExpert();
        }, []
    )

    return (
        <div style={{position:"relative"}}>
            
            <Image src={BgPattern1} className="position-absolute w-100" ></Image>
            <Container>
                <Header></Header>
                <div className="text-center set_page_title">
                    <p className="app-title">Find a Service</p>
                </div>
                <Row className="service_section">
                    <Col md={3}>
                        <p className="app-title sorting_block">Short By</p>
                        <div className={`${sortby=="All"?"service-active":""} service-select-category my-1`} onClick={()=>{clickFetch("all")}} >
                            <Link  to="#"><p className="app-text my-2">All </p></Link>
                            {/* <Link  to="#"><p className="app-text my-2">All ({userRole.length}) </p></Link> */}
                        </div>
                        {/* <div className={`${sortby=="Reporter"?"service-active":""} service-select-category my-1`} onClick={()=>{setSortby('Reporter')}} >
                            <Link  to="#"><p className="app-text my-2">Reporters ({Data.filter(Data=>Data.user_type=="Reporter").length}) </p></Link>
                        </div> */}
                        <div className={`${sortby=="Real Estate Agent"?"service-active":""} service-select-category my-1`} onClick={()=>{clickFetch("real_estate_agent")}}>                            
                            <Link  to="#"><p className="app-text my-2">Real Estate Agents</p></Link>
                            {/* <Link  to="#"><p className="app-text my-2">Real Estate Agents ({userRole.filter(Data=>Data.role=="real_estate_agent").length})</p></Link> */}
                        </div>
                        <div className={`${sortby=="Solicicitor"?"service-active":""} service-select-category my-1`} onClick={
                            ()=>{clickFetch("conveyancer")}}>
                            <Link  to="#"><p className="app-text my-2">Solicicitors</p></Link>
                            {/* <Link  to="#"><p className="app-text my-2">Solicicitors ({userRole.filter(Data=>Data.role=="administator").length})</p></Link> */}
                        </div>
                        <div className={`${sortby=="Buyer’s Agent"?"service-active":""} service-select-category my-1`} onClick={()=>{clickFetch("buyer_agent")}}>
                            <Link  to="#"><p className="app-text my-2">Buyer’s Agents</p></Link>
                            {/* <Link  to="#"><p className="app-text my-2">Buyer’s Agents ({userRole.filter(Data=>Data.role=="buyer_agent").length})</p></Link> */}
                        </div>
                    </Col>
                    <Col md={9} style={{position:"static"}}>
                        <Row>
                            {
                                userRole.map(
                                    (item)=>(
                                        <Col key={item.id} xl={4} md={6} style={{position:"static"}}><ServiceCard id={item.user_id} title={item.name} text={item.role.replaceAll("_"," ")}></ServiceCard></Col>
                                    )
                                )
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    )
}

const Data = [
    {
        id:'1',
        name:'Dr. Mathew Wadonal',
        user_type:'Real Estate Agent'
    },
    {
        id:'2',
        name:'Dr. Mathew Wadonal',
        user_type:'Reporter'
    },
    {
        id:'3',
        name:'Dr. Mathew Wadonal',
        user_type:'Real Estate Agent'
    },
    {
        id:'4',
        name:'Dr. Mathew Wadonal',
        user_type:'Solicicitor'
    },
    {
        id:'5',
        name:'Dr. Mathew Wadonal',
        user_type:'Real Estate Agent'
    },
    {
        id:'6',
        name:'Dr. Mathew Wadonal',
        user_type:'Buyer’s Agent'
    },
    {
        id:'7',
        name:'Dr. Mathew Wadonal',
        user_type:'Real Estate Agent'
    },
    {
        id:'8',
        name:'Dr. Mathew Wadonal',
        user_type:'Solicicitor'
    },
    {
        id:'9',
        name:'Dr. Mathew Wadonal',
        user_type:'Real Estate Agent'
    },
    {
        id:'10',
        name:'Dr. Mathew Wadonal',
        user_type:'Buyer’s Agent'
    },
]
export default Service
