import React, { useEffect } from 'react'
import { Button, Col, Form, Image, Row } from 'react-bootstrap'
import Previews from '../../../components/admin/basic/uploadImage'
import PortalSearchBox from '../common/portalsearchbox'
import UploadImage from '../../../assets/images/icons/upload_image_icon.svg'
import SendingIcon from '../../../assets/images/icons/send_fly_icon.svg'
import EditIcon from '../../../assets/images/icons/edit_pen_icon.svg'
import DeleteIcon from '../../../assets/images/icons/delete_icon.svg'
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import Autocomplete from 'react-google-autocomplete';
function Upload() {
    
    useEffect(
        ()=>{
            getUser();
              
        }, []
    )
    const [userName,setUserName] = React.useState();
    

    const [formData, setFormData] = React.useState({
        action:"uploadReport",
        proaddress:"",
        reportedby:"",
        reportdate:"",
        contactnum:"",
        choosefile:""
    })

    const [imageFile, setImageFile] = React.useState();

    const [getdata, setgetData] = React.useState([]);
    const [getdata1, setgetData1] = React.useState([]);
    
    const [User, setUser] = React.useState([]);

    var minm = 100000000000;
    var maxm = 999999999999;
    var code = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    
    async function uploadSubmit(e){
        e.preventDefault();

        if(imageFile){
            const fileUrl = await uploadReportImage(imageFile, formData.action.replace(/ /g, '_'));       
            formData.choosefile = process.env.REACT_APP_BACKEND_API_URL+ "/" +fileUrl.data.url + ".png";
            

            const res = await axios.post(
                process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
                formData,
            )
            
            setFormData({
                action:"uploadReport",
                proaddress:"",
                reportdate:"",
                contactnum:"",
                choosefile:""
            });
            setImageFile("");
            getReport();
        } 
        else {
           //notify("Set Image!")
        } 

    }

    
    // 
    async function getUser(){
        const UsersData = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:"getUser",
                id:localStorage.getItem('userId')
            }
        )
       
        setUser(UsersData.data[0]);
        
        
        setFormData({
            ...formData,
            reportedby:UsersData.data[0].name
        })
        getReport(UsersData.data[0].name);
    }

    // Get all Report
    async function getReport(uname){
        setUserName(uname);
        const getportal = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:"getPortalByName",
                name:uname
            }
        )
        console.log("report");
        console.log(getportal);
        
        if(getportal != null){
            if(getportal.data != undefined){
                if(getportal.data[0] != "nodata"){
                    setgetData(getportal.data);
                    setgetData1(getportal.data);
                }else{
                    setgetData(getportal.data);
                    setgetData1(getportal.data);
                    
                }
            }
        }

    }
    

    const history = useHistory();
    
    
   


    async function deleteReport(id){
       
        const deletedata = await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:"deleteReport",
                id:id
            }
        )
        getReport();

    }
    

    async function searchRecord(event){
        var updatedList = getdata1;
        if(event.target.value != ""){
            setdisplayUpload("none");
            updatedList = updatedList.filter(function(item){
                
                return item.address.toLowerCase().search(
                    event.target.value.toLowerCase()
                ) !== -1;
            });
            setgetData(updatedList);
            
        }else{
            setdisplayUpload("block");
            setgetData(getdata1);
        }

        
    }

    async function validate(evt) {
        
        var theEvent = evt || window.event;
        
        if (theEvent.type === 'paste') {
            key = window.event.clipboardData.getData('text/plain');
        } else {
            var key = theEvent.keyCode || theEvent.which;
            key = String.fromCharCode(key);
        }
        var regex = /[A-Za-z0-9 ]|\./;
        if( !regex.test(key)) {
            theEvent.returnValue = false;
            if(theEvent.preventDefault) theEvent.preventDefault();
        }
    }


    const [displayUpload, setdisplayUpload] = React.useState("block");

    return (
        <div className="set-order-block">
            <Form>
                <Row className="my-4">
                    <Col md={5} className="portal-search-block" >
                        <Button className="portal-search-button position-absolute">Search</Button>
                        <Form.Control type="text" className="portal-search-box w-100 app-text" placeholder="Enter the address you need a valution for "
                            onKeyPress= {
                                (e)=>validate(e)
                            }

                            onKeyUp={
                                (e)=>searchRecord(e)
                            }

                        ></Form.Control>
                    </Col>
                    <Col md={7} className="d-flex justify-content-end portal-shortby">
                        <Form.Control as="select" className="w-25 portal-search-select app-text">
                            <option>Short By</option>
                            <option>Short By</option>
                        </Form.Control>
                    </Col>
                </Row>
            </Form>
            <div className="upload-report-block" style={{ display:displayUpload }}>
                <p className="my-0 app-text upload-block-title">Upload Report</p>
                <hr/>
                <Row>
                    <Col md={7}>
                        <Form className="flex-wrap d-flex h-100" action="uploadReport" onSubmit={uploadSubmit} encType="multipart/form-data">
                            <div>
                                <Form.Group>
                                    <Form.Label className="my-0 app-text upload-report-title">Property Address</Form.Label>
                                   
                                    <Form.Control as={Autocomplete} types={["address"]} componentRestrictions={{ country: "au" }}  type="text" placeholder="Enter Report Title" name="proaddress" className="my-0 app-text" required
                                    onPlaceSelected={(place) => {
                                        setFormData({
                                            ...formData,
                                            proaddress: place.formatted_address
                                        })
                                    }}
                                   
                                    >
                                    </Form.Control>
                                </Form.Group>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className="my-0 app-text">Reported By</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Author Name" name="reportedby" className="my-0 app-text" required
                                            value={formData.reportedby}
                                            // onChange = {
                                                                
                                            //     (e)=>setFormData({
                                            //         ...formData,
                                            //         reportedby: e.target.value
                                            //     })
                                            // }
                                            ></Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className="my-0 app-text">Report Date</Form.Label>
                                            <Form.Control type="date" placeholder="Enter Date" name="reportdate" className="my-0 app-text" required
                                             value={formData.reportdate}
                                            onChange = {     
                                                (e)=>setFormData({
                                                    ...formData,
                                                    reportdate: e.target.value
                                                })
                                            }
                                            ></Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className="my-0 app-text">Contact Number</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Author Name" name="contactnum" className="my-0 app-text" required
                                             value={formData.contactnum}
                                            onChange = {
                                                                
                                                (e)=>setFormData({
                                                    ...formData,
                                                    contactnum: e.target.value
                                                })
                                            } 
                                            ></Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className="my-0 app-text">Choose File</Form.Label>
                                            
                                            <Previews 
                                                setImageFile = { setImageFile }
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                            <div className="align-self-end upload-report-button">
                                <Button type="submit" className="app-text">Upload Now</Button>
                                <Button className="ml-3 app-text">Reset All</Button>
                            </div>
                        </Form>
                    </Col>
                    <Col md={5}>
                        
                    </Col>
                </Row>

            </div>
            <div className="portal-table w-100 my-5 recent-upload-block">
                    <div className="recent-upload-header">
                        <Form>
                            <Row className="mb-3" style={{borderBottom:'0.5px solid rgba(58, 122, 248, 0.2)'}}>
                                <Col md={5} className="portal-search-block" >
                                <p className="my-2 app-text upload-block-title">Recently Uploads</p> 
                                </Col>
                                <Col md={7} className="d-flex justify-content-end portal-shortby pb-2">
                                    <Form.Control as="select" className="w-25 portal-search-select app-text">
                                        <option>This week</option>
                                        <option>This week</option>
                                    </Form.Control>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <Row className="w-100 mx-0 portal-table-header rounded-lg">
                        <Col xs={5}>
                            <p className="app-text my-2" style={{fontSize:'16px',color:'#2E2E2E'}}>Property Address</p>
                        </Col>
                        <Col xs={2}>
                            <p className="app-text my-2 text-center" style={{fontSize:'16px',color:'#2E2E2E'}}>Reported By</p>
                        </Col>
                        <Col xs={2}>
                            <p className="app-text my-2 text-center" style={{fontSize:'16px',color:'#2E2E2E'}}>Date</p>
                        </Col>
                        <Col xs={3}>
                            <p className="app-text my-2 text-center" style={{fontSize:'16px',color:'#2E2E2E'}}>Action</p>
                        </Col>
                    </Row>
                   {    
                        getdata != '' ?
                        getdata.map(
                            (item)=>( 
                                <Row className="w-100 p-2 mx-0">
                                    <Col xs={5}>
                                        <p className="app-text my-2" style={{color:'#1D83FF'}}>{item.address}</p>
                                    </Col>
                                    <Col xs={2}>
                                        <p className="app-text my-2 text-center">{item.reported_by}</p>
                                    </Col>
                                    <Col xs={2}>
                                        <p className="app-text my-2 text-center">{item.report_date}</p>
                                    </Col>
                                    <Col xs={3}>
                                        <p className="app-text my-2 text-center">
                                            <img className="mx-2" src={SendingIcon}/>
                                            <img className="mx-2" src={EditIcon}/>
                                            <img className="mx-2" src={DeleteIcon} style={{ cursor:"pointer" }}
                                                onClick={
                                                    ()=>deleteReport(item.id)
                                                }
                                            />
                                        </p>
                                    </Col>
                                </Row> 
                             )
                        )
                        : ''
                   }  
                    
                </div>            
        </div>
    )
}

export default Upload


export const uploadReportImage = async(file, fileName) => {
    const data = new FormData();
    data.append("file", file);
    data.append("fileName", fileName );
    data.append("action", 'uploadBlogImage' );
    const res = await axios.post(
        process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
        data,
        {
            "encType": "multipart/form-data" 
        }
    )
    return res;
}