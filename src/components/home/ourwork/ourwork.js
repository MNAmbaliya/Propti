import React,{ useEffect }  from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
// import resources
import '../../../assets/css/ourwork.css';
import CardIamge1 from  '../../../assets/images/svg/ourwork_img_1.png';
import CardIamge2 from  '../../../assets/images/svg/ourwork_img_2.png';
import axios from 'axios'
import Propertie from './propertie-card'
import { useHistory } from 'react-router-dom'

var qs = require('qs');
function Ourwork() {
    var minm = 100000000000;
    const cookies = new Cookies();
    var maxm = 999999999999;
    var code = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    
    const [getdata, setgetData] = React.useState([]);
    async function getReport(){
        
        const getportal = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:"getPortal"
            }
        )


        setgetData(getportal.data);
    }

    

    const [token, setToken] = React.useState("");

    async function getToken(){
        
        console.log("0");
        if(cookies.get("tokens") == "" || cookies.get("tokens") == undefined || cookies.get("tokens") == null){
            localStorage.setItem("tokens1", '');
            console.log("1");
            if(localStorage.getItem('tokens1') == "" || localStorage.getItem('tokens1') == undefined || localStorage.getItem('tokens1') == null){
                console.log("2");
                var data = qs.stringify({
                    'client_id': 'client_4f363bc816d8d1a65e65e6cdbf032256',
                    'client_secret': 'secret_9c5900c75a8fb3bb5764280ed74a5120',
                    'scope': 'api_agencies_read api_listings_read api_properties_read',
                    'grant_type': 'client_credentials' 
                  });
                  var config = {
                    method: 'post',
                    url: 'https://auth.domain.com.au/v1/connect/token',
                    headers: { 
                      'grant_type': '', 
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data : data
                  };
                  
                  axios(config)
                  .then(function (response) {
                    
                    var responces = response.data;
                    setToken(responces.access_token);
                    cookies.set('tokens', responces.access_token, { path: '/' , maxAge:43200 });
                    
                    localStorage.setItem("tokens1", responces.access_token);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
            }
        }

       
    }

    async function get_properties(){
        // var token = cookies.get("tokens");
        // var getaddress = '  VIC '+ (Math.floor(Math.random() * 10000) + 10000).toString().substring(2) +', Australia';
        // var config = {
        //     method: 'get',
        //     url: 'https://api.domain.com.au/v1/properties/_suggest?terms='+getaddress,
        //     headers: { 
        //         'Authorization': 'Bearer '+token,               
        //     }
        // };
            
        // axios(config)
        // .then(function (response) {
        //     console.log(response.data);
        //     // setgetData(response.data);
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });


        // reports get
        const res = await axios.get(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php?action=getAllReport"            
        )
        setgetData(res.data);
        console.log(res.data);

        
    }

    React.useEffect(() => {
        getToken();
        get_properties();
        // getReport();
    }, []);
    
    // useEffect(() => {
        
    // });
    
    const history = useHistory();

    return (
        <div className="ourwork-root">
            <p className='home-section-title-1'>OUR WORK</p>
            <div className='d-flex justify-content-between align-items-end set_partner_root'>
                <p className='home-section-title'>Recently Reported</p>
                {/* <p className='about-title-content'>
                    Check All &gt;
                </p> */}
            </div>

            <Row>
                {
                    getdata.reverse().filter((item, index) => index < 4).map(
                        (item)=>( 
                             <Propertie 
                                address = {item.address}
                                id = {item.id}
                                code = {code}
                                file = {item.file}
                                inspection = {item.report_date}
                                reportedBy= {item.reported_by}
                             />
                         )
                    )
                } 
            </Row>

            {/* <Row>
                <Col md={6}>
                    <Card className='ourwork-card ourwork-card-one'>
                        <Card.Img variant='top' src={CardIamge1} style={{borderRadius:'15px'}}></Card.Img>
                        <Card.Body>
                            <Card.Title className="ourwork-card-title">{data[0].streetName}</Card.Title>
                            <Card.Text className="ourwork-card-text">{data[0].content}</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className='ourwork-card ourwork-card-two'>
                        <Card.Img variant='top' src={CardIamge2} style={{borderRadius:'15px'}}></Card.Img>
                        <Card.Body>
                            <Card.Title className="ourwork-card-title">{data[1].streetName}</Card.Title>
                            <Card.Text  className="ourwork-card-text">{data[1].content}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className='ourwork-card ourwork-card-three'>
                        <Card.Img variant='top' src={CardIamge2} style={{borderRadius:'15px'}}></Card.Img>
                        <Card.Body>
                            <Card.Title className="ourwork-card-title">{data[2].streetName}</Card.Title>
                            <Card.Text className="ourwork-card-text">{data[2].content}</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className='ourwork-card ourwork-card-four'>
                        <Card.Img variant='top' src={CardIamge1} style={{borderRadius:'15px'}}></Card.Img>
                        <Card.Body>
                            <Card.Title className="ourwork-card-title">{data[3].streetName}</Card.Title>
                            <Card.Text className="ourwork-card-text">{data[3].content}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>  */}
        </div>
    )
}


const data = [
    {
        streetName:'Lorem Ipsum Report',
        content:'We take care of your social media profiles and our staffs stay 24/7.',
        lat: 23.123,
        lang: -124.12,
        imagewidth: 234,
    },
    {
        streetName:'Lorem Ipsum Report',
        content:'We take care of your social media profiles and our staffs stay 24/7.',
        lat: 23.123,
        lang: -124.12,
        imagewidth: 234,
    },
    {
        streetName:'Lorem Ipsum Report',
        content:'We take care of your social media profiles and our staffs stay 24/7.',
        lat: 23.123,
        lang: -124.12,
        imagewidth: 234,
    },
    {
        streetName:'Lorem Ipsum Report',
        content:'We take care of your social media profiles and our staffs stay 24/7.',
        lat: 23.123,
        lang: -124.12,
        imagewidth: 234,
    }
]
export default Ourwork