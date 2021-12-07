import React,{ useEffect }  from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import axios from "axios";
import CardIamge1 from  '../../../assets/images/svg/no-image-icon-23480.jpg';
import Cookies from 'universal-cookie';


export default function Propertie(props) {
    const history = useHistory();
    const cookies = new Cookies();
    const [agent,setAgent] = React.useState([]);
    async function purchaseReport(addr,file){
        history.push({
            pathname: '/purchase',
            state: { 
                address:addr,
                image:file,
                number:props.code,
                inspection:props.inspection,
                agent:agent
            }
        });

    }

    const [properties,setProperties] = React.useState([]);
    async function getPropertie(){

        const res = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:'getUserByName',
                agent:props.reportedBy
            }            
        )
        console.log(res);
        setAgent(res.data[0]);

        // var token = cookies.get("tokens");
        // console.log(props.id);
        // var config = {
        //     method: 'get',
        //     url: 'https://api.domain.com.au/v1/properties/'+props.id,
        //     headers: { 
        //       'Authorization': 'Bearer '+token,               
        //     }
        //   };
          
        //   axios(config)
        //   .then(function (response) {
        //     setProperties(response.data);
        //     console.log(response.data);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
    }

    
    React.useEffect(() => {
        getPropertie(); 
    }, []);


    return (
        <Col md={6}>
            <Card className="ourwork-card ">
                {/* <Card.Img variant='top' src={properties != '' ? properties.photos != "" ? properties.photos[0].fullUrl : CardIamge1 : ''} style={{height: "270px"}}  style={{borderRadius:'15px',height:'408px'}}></Card.Img> */}
                <Card.Img variant='top' src={props.file} style={{height: "270px"}}  style={{borderRadius:'15px',height:'408px'}}></Card.Img>
                <Card.Body>
                    <Card.Title className="ourwork-card-title">{props.address}</Card.Title>
                    <a onClick={
                        // ()=>purchaseReport(props.address, properties != '' ? properties.photos != "" ? properties.photos[0].fullUrl : CardIamge1 : '')
                        ()=>purchaseReport(props.address, props.file)
                    } className="ourwork-card-text">Purchase Now </a>
                </Card.Body>
            </Card>
        </Col> 
    )
}
