import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import axios from "axios";
import CardIamge1 from  '../../assets/images/svg/notfound.png';
import Cookies from 'universal-cookie';


function OrderPropertyCard(props) {
    const history = useHistory();
    const cookies = new Cookies();
    const [properties,setProperties] = React.useState([]);
    let tmp = 1;
    console.log("props");
    console.log(props);
    const [agent, setAgent] = React.useState([]);
    const onClickOrder = async () => {
        
        history.push({
            pathname: '/purchase',
            state: { 
                address: props.streetname,
                formated_address:props.formatted_address,
                report_by: props.reportType == "existing" ? '' : '',
                number: props.number,
                image: props.reportType == "noFound" ? props.image : props.reportType == 'existing' ? props.image : properties != '' ? properties.photos != "" ? properties.photos[0].fullUrl : CardIamge1 : '',
                report:props.report,
                inspection: props.reportType == "existing" ? props.date : properties != '' ? 'TBC' : 'TBC',
                method: props.reportType == "existing" ? "existing" : props.reportType == "noFound" ? 'newReport' : 'independed' ,
                report:props.strataReport != undefined || props.strataReport != null || props.strataReport != "" ? props.strataReport : '',
                agent:props.reportType == "existing" ? agent : undefined,
                typeOfReport: props.reportType
            }
        });
    }

    

    async function getPropertie(){
        var token = cookies.get("tokens");

        if(tmp == 1){
            

            if(props.reportType == 'moreNew'){
                tmp = 0;
            }
            
            if(props.reportType == 'existing'){
                const data = {
                    images: props.image,
                    descrition: props.descrition
                }

                const res = await axios.post(
                    process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
                    {
                        action:'getUserByName',
                        agent: props.reportby
                    }
                )
                console.log("user")
                console.log(props.reportby)
                setAgent(res.data[0]);
                tmp = 0;
            }else{    
                if(props.id != undefined){
                    var config = {
                        method: 'get',
                        url: 'https://api.domain.com.au/v1/properties/'+props.id,
                        headers: { 
                        'Authorization': 'Bearer '+token,               
                        }
                    };
                    
                    axios(config)
                    .then(function (response) {
                        setProperties(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                    tmp = 0;
                }
            }
        }

        
    }

    
    useEffect(
        ()=>{           
            getPropertie(); 
        }, []
    )

    return (
        <div>
            <div className="p-2 report_card" style={{textAlign:"center"}}>
                {
                    props.reportType == "noFound" ? 
                        <h3 className='report_title'>New Report</h3>
                    :
                    props.reportType == 'existing' ? 
                        <h3 className='report_title'>Existing Report</h3>
                    :
                        <h3 className='report_title'>New Independant Report</h3>
                }   
                
                <img variant="top" src={props.reportType == "noFound" ? props.image : props.reportType == 'existing' ? props.image : properties != '' ? properties.photos != "" ? properties.photos[0].fullUrl : CardIamge1 : ''} style={{height: "270px"}} ></img>
                <div className="report_detail">
                    <h2>{props.streetname}</h2>
                    {
                        props.reportType == 'existing' ?
                            <>
                                <p className="app-text"> {props.descrition} </p>
                                <p className="price-text">$50</p>
                            </>
                        :
                            props.reportType == 'moreNew' ?
                                <>
                                    <p className="app-text"> {props.descrition} </p>
                                    <p className="price-text">$295</p>
                                </>
                            : 
                            <>
                                <p className="app-text"> {props.descrition} </p>
                                <p className="price-text">$295</p>
                            </>
                    }
                    
                    <div className="btn btn-primary ordernow_btn" onClick = {onClickOrder}>Order Now</div>
                </div>
            </div>
        </div>
    )
}

export default OrderPropertyCard
