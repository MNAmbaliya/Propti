import React, {useEffect} from 'react'
import { Container, Image } from 'react-bootstrap'

import '../assets/css/faqs.css'
import Header from '../components/header'
import Footer from '../components/footer'
import BgPattern3 from '../assets/images/bg/pattern/footer_bg_pattern.svg'
import FaqsItem from '../components/faqs/faqsitem'
import axios from 'axios'

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


function Faqs() {

    const [faqs, setFaqs] = React.useState([]);
    /**
     * Call Faqs API when page is loaded
     */
    useEffect(async () => {
        window.scrollTo(0,0); 
        const res =  await axios.get(process.env.REACT_APP_BACKEND_API_URL + "/test_api.php?action=getAllFaqs");
        setFaqs(res.data); 
        console.log(res);       
    }, [])


    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box p={3}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
    }


    function a11yProps(index) {
        return {
          id: `scrollable-auto-tab-${index}`,
          'aria-controls': `scrollable-auto-tabpanel-${index}`,
        };
    }

    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
          width: '100%',
          backgroundColor: theme.palette.background.paper,
        },
    }));


    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (


        <div>
            <Image src={BgPattern3} className="position-absolute w-100" style={{ marginTop:'100px', zIndex:'-1'}}></Image>
            <Container>
                <Header></Header>

                <div className="text-center set_page_title">
                    <p className="login-title faq-title mb-0">FAQs</p>
                </div>

                <div className={classes.root + " fags-tabs"}>
                    <AppBar position="static" color="default">
                        <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                        >
                        <Tab label="About Propti" {...a11yProps(0)} />
                        <Tab label="General Queries" {...a11yProps(1)} />
                        <Tab label="Contact us" {...a11yProps(2)} />
                        <Tab label="Partner Benefits" {...a11yProps(3)} />
                        <Tab label="Payment Method" {...a11yProps(4)} />
                        <Tab label="Strata Reports" {...a11yProps(5)} />
                        <Tab label="Valuations" {...a11yProps(6)} />
                        <Tab label="Depreciation" {...a11yProps(7)} />
                        <Tab label="Building & Pest Reports" {...a11yProps(8)} />
                        <Tab label="Insurances" {...a11yProps(9)} />
                        <Tab label="the wall" {...a11yProps(10)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <div className="p-md-5">
                            {
                                faqs.filter( item =>{
                                    return item.category == "about-propti";
                                })
                                    .map(
                                        (item)=>(
                                            <FaqsItem key={item.title} title={item.title} content={item.content}/>
                                        )
                                    )
                            }
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div className="p-md-5">
                            {
                                faqs.filter( item =>{
                                    return item.category == "general-queries";
                                })
                                .map(
                                    (item)=>(
                                        <FaqsItem key={item.title} title={item.title} content={item.content}/>
                                    )
                                )
                            }
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <div className="p-md-5">
                            {
                                faqs.filter( item =>{
                                    return item.category == "contact-us";
                                })
                                .map(
                                    (item)=>(
                                        <FaqsItem key={item.title} title={item.title} content={item.content}/>
                                    )
                                )
                            }
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <div className="p-md-5">
                            {
                                faqs.filter( item =>{
                                    return item.category == "benefits-of-joining";
                                })
                                .map(
                                    (item)=>(
                                        <FaqsItem key={item.title} title={item.title} content={item.content}/>
                                    )
                                )
                            }
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <div className="p-md-5">
                            {
                                faqs.filter( item =>{
                                    return item.category == "payment-method";
                                })
                                .map(
                                    (item)=>(
                                        <FaqsItem key={item.title} title={item.title} content={item.content}/>
                                    )
                                )
                            }
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                        <div className="p-md-5">
                            {
                                faqs.filter( item =>{
                                    return item.category == "about-strata-reports";
                                })
                                .map(
                                    (item)=>(
                                        <FaqsItem key={item.title} title={item.title} content={item.content}/>
                                    )
                                )
                            }
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={6}>
                        <div className="p-md-5">
                            {
                                faqs.filter( item =>{
                                    return item.category == "about-valuations";
                                })
                                .map(
                                    (item)=>(
                                        <FaqsItem key={item.title} title={item.title} content={item.content}/>
                                    )
                                )
                            }
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={7}>
                        <div className="p-md-5">
                            {
                                faqs.filter( item =>{
                                    return item.category == "about-depreciation-reports";
                                })
                                .map(
                                    (item)=>(
                                        <FaqsItem key={item.title} title={item.title} content={item.content}/>
                                    )
                                )
                            }
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={8}>
                        <div className="p-md-5">
                            {
                                faqs.filter( item =>{
                                    return item.category == "building-and-pest-reports";
                                })
                                .map(
                                    (item)=>(
                                        <FaqsItem key={item.title} title={item.title} content={item.content}/>
                                    )
                                )
                            }
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={9}>
                        <div className="p-md-5">
                            {
                                faqs.filter( item =>{
                                    return item.category == "about-insurances";
                                })
                                .map(
                                    (item)=>(
                                        <FaqsItem key={item.title} title={item.title} content={item.content}/>
                                    )
                                )
                            }
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={10}>
                        <div className="p-md-5">
                            {
                                faqs.filter( item =>{
                                    return item.category == "about-the-wall";
                                })
                                .map(
                                    (item)=>(
                                        <FaqsItem key={item.title} title={item.title} content={item.content}/>
                                    )
                                )
                            }
                        </div>
                    </TabPanel>
                </div>
            </Container>
            <Footer/>
        </div>






        // <div>
        //     <Image src={BgPattern3} className="position-absolute w-100" style={{ marginTop:'100px', zIndex:'-1'}}></Image>
        //     <Container>
        //         <Header></Header>
        //         <div className="text-center set_page_title">
        //             <p className="login-title faq-title mb-0">FAQs</p>
        //         </div>
        //         <Tabs defaultActiveKey="about" id="uncontrolled-tab-example" className="fags-tabs set-faqs-tab">
        //             <Tab eventKey="about" title="About Propti">
        //                 <div className="p-md-5">
        //                     {
        //                         faqs.filter( item =>{
        //                             return item.category == "about-propti";
        //                         })
        //                             .map(
        //                                 (item)=>(
        //                                     <FaqsItem key={item.title} title={item.title} content={item.content}/>
        //                                 )
        //                             )
        //                     }
        //                 </div>
        //             </Tab>
        //             <Tab eventKey="queries" title="General Queries">
        //                 <div className="p-md-5">
        //                     {
        //                         faqs.filter( item =>{
        //                             return item.category == "general-queries";
        //                         })
        //                         .map(
        //                             (item)=>(
        //                                 <FaqsItem key={item.title} title={item.title} content={item.content}/>
        //                             )
        //                         )
        //                     }
        //                 </div>
        //             </Tab>
        //             <Tab eventKey="contact" title="Contact us">
        //                 <div className="p-md-5">
        //                     {
        //                         faqs.filter( item =>{
        //                             return item.category == "contact-us";
        //                         })
        //                         .map(
        //                             (item)=>(
        //                                 <FaqsItem key={item.title} title={item.title} content={item.content}/>
        //                             )
        //                         )
        //                     }
        //                 </div>



        //             </Tab>
        //             <Tab eventKey="benifits" title="Benefits of joining">
        //                 <div className="p-md-5">
        //                     {
        //                         faqs.filter( item =>{
        //                             return item.category == "benefits-of-joining";
        //                         })
        //                         .map(
        //                             (item)=>(
        //                                 <FaqsItem key={item.title} title={item.title} content={item.content}/>
        //                             )
        //                         )
        //                     }
        //                 </div>
        //             </Tab>
        //             <Tab eventKey="payment" title="Payment Method">
        //                 <div className="p-md-5">
        //                     {
        //                         faqs.filter( item =>{
        //                             return item.category == "payment-method";
        //                         })
        //                         .map(
        //                             (item)=>(
        //                                 <FaqsItem key={item.title} title={item.title} content={item.content}/>
        //                             )
        //                         )
        //                     }
        //                 </div>
        //             </Tab>
        //             <Tab eventKey="reports" title="Strata Reports">
        //                 <div className="p-md-5">
        //                     {
        //                         faqs.filter( item =>{
        //                             return item.category == "about-strata-reports";
        //                         })
        //                         .map(
        //                             (item)=>(
        //                                 <FaqsItem key={item.title} title={item.title} content={item.content}/>
        //                             )
        //                         )
        //                     }
        //                 </div>
        //             </Tab>
        //             <Tab eventKey="valuatoins" title="Valuations">
        //                 <div className="p-md-5">
        //                     {
        //                         faqs.filter( item =>{
        //                             return item.category == "about-valuations";
        //                         })
        //                         .map(
        //                             (item)=>(
        //                                 <FaqsItem key={item.title} title={item.title} content={item.content}/>
        //                             )
        //                         )
        //                     }
        //                 </div>
        //             </Tab>
        //             <Tab eventKey="depreciation" title="Depreciation">
        //                 <div className="p-md-5">
        //                     {
        //                         faqs.filter( item =>{
        //                             return item.category == "about-depreciation-reports";
        //                         })
        //                         .map(
        //                             (item)=>(
        //                                 <FaqsItem key={item.title} title={item.title} content={item.content}/>
        //                             )
        //                         )
        //                     }
        //                 </div>
        //             </Tab>
        //             <Tab eventKey="Building" title="Building & Pest Reports ">
        //                 <div className="p-md-5">
        //                     {
        //                         faqs.filter( item =>{
        //                             return item.category == "building-and-pest-reports";
        //                         })
        //                         .map(
        //                             (item)=>(
        //                                 <FaqsItem key={item.title} title={item.title} content={item.content}/>
        //                             )
        //                         )
        //                     }
        //                 </div>
        //             </Tab>
        //             <Tab eventKey="insurances" title="Insurances">
        //                 <div className="p-md-5">
        //                     {
        //                         faqs.filter( item =>{
        //                             return item.category == "about-insurances";
        //                         })
        //                         .map(
        //                             (item)=>(
        //                                 <FaqsItem key={item.title} title={item.title} content={item.content}/>
        //                             )
        //                         )
        //                     }
        //                 </div>
        //             </Tab>
        //             <Tab eventKey="wall" title="the wall">
        //                 <div className="p-md-5">
        //                     {
        //                         faqs.filter( item =>{
        //                             return item.category == "about-the-wall";
        //                         })
        //                         .map(
        //                             (item)=>(
        //                                 <FaqsItem key={item.title} title={item.title} content={item.content}/>
        //                             )
        //                         )
        //                     }
        //                 </div>
        //             </Tab>
        //         </Tabs>
        //     </Container>
        //     <Footer/>
        // </div>
    )
}
export default Faqs
