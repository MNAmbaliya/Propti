import React from 'react';
import {Link} from "react-router-dom";
import { Navbar,Col, Container, Form, Image, Row, Button, Accordion, Card, NavItem } from 'react-bootstrap'
import Header from '../components/header'
import Logo from '../assets/images/logo/logo.png';
import Footer from '../components/footer'
import '../assets/css/privacy-policy.css'
import BgPattern1 from '../assets/images/bg/pattern/hero_bg_pattern.svg'

function privacypolicy(props) {
    window.scrollTo(0,0);   

    return (
        <div className="d-flex flex-wrap" style={{minHeight: "100vh"}}>
            <Image src={BgPattern1} className="position-absolute w-100" style={{ zIndex:'-1'}}></Image>
            <Container>
            {/* <Header/>  */}
            <Navbar className="justify-content-between">
                <Link to="/"><Navbar.Brand><Image src={Logo} className="logo-image"></Image></Navbar.Brand></Link>
                <div className="navbar-desktop-menu w-100">
                    <Row className="justify-content-end">
                        <Col md={3} className="text-right">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="19" viewBox="0 0 22 19" fill="none">
                                <path d="M3 1.89368H19C20.1 1.89368 21 2.79702 21 3.90111V15.9457C21 17.0498 20.1 17.9532 19 17.9532H3C1.9 17.9532 1 17.0498 1 15.9457V3.90111C1 2.79702 1.9 1.89368 3 1.89368Z" fill="#1D83FF" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M21 3.90112L11 10.9271L1 3.90112" fill="#1D83FF"/>
                                <path d="M21 3.90112L11 10.9271L1 3.90112" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span className="ml-2">jake@propti.com.au</span>
                        </Col>
                        <Col md={3} className="text-right">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                <path d="M19.8881 15.0945V18.1056C19.8892 18.3852 19.8321 18.6618 19.7206 18.918C19.609 19.1741 19.4454 19.404 19.2401 19.593C19.0349 19.782 18.7926 19.9258 18.5288 20.0154C18.265 20.1049 17.9854 20.1382 17.7081 20.1131C14.6309 19.7774 11.6751 18.722 9.07809 17.0316C6.66192 15.4906 4.61344 13.4345 3.07811 11.0093C1.38809 8.39084 0.336359 5.40958 0.00811668 2.3071C-0.0168727 2.02954 0.0159916 1.74979 0.104617 1.48568C0.193242 1.22157 0.335687 0.978868 0.522881 0.773037C0.710076 0.567207 0.937919 0.402754 1.1919 0.29015C1.44589 0.177545 1.72045 0.119256 1.99811 0.118994H4.9981C5.48341 0.1142 5.95389 0.286694 6.32186 0.604324C6.68983 0.921955 6.93017 1.36305 6.9981 1.84539C7.12472 2.80902 7.35954 3.75519 7.69809 4.66583C7.83264 5.02509 7.86176 5.41553 7.782 5.79088C7.70224 6.16624 7.51696 6.51078 7.24809 6.78368L5.9781 8.0584C7.40165 10.5713 9.47454 12.6519 11.9781 14.0807L13.2481 12.806C13.52 12.5361 13.8632 12.3501 14.2372 12.2701C14.6112 12.19 15.0001 12.2193 15.3581 12.3543C16.2653 12.6941 17.208 12.9298 18.1681 13.0569C18.6538 13.1257 19.0975 13.3713 19.4146 13.747C19.7317 14.1226 19.9002 14.6022 19.8881 15.0945Z" fill="#1D83FF"/>
                            </svg>
                            <span className="ml-2">+61 410 602 156</span>
                        </Col>
                        
                    </Row>
                </div>
            </Navbar>
                 <div className="text-center set_page_title">
                    <p className="login-title">Terms & Conditions</p>
                </div>
                <div className="policy-content">
                    <p className="policy-text">These terms and conditions (the "Terms and Conditions") govern the use of www.propti.com.au (the "Site"). This Site is owned and operated by Propti Pty Ltd. This Site is an ecommerce website.</p> 
                    <p className="policy-text">By using this Site, you indicate that you have read and understand these Terms and Conditions and agree to abide by them at all times.
                    </p>
                    <br />
                    <h3 className="policy-title">Intellectual Property </h3>
                     {/* <p className="effective-date">Effective May25. 2018</p> */}
                    <p className="policy-text">All content published and made available on our Site is the property of Propti Pty Ltd and the Site's creators. This includes, but is not limited to images, text, logos, documents, downloadable files and anything that contributes to the composition of our Site. 
                    </p>
                    <h4 className="policy-second-title">User Contributions </h4>
                    <p className="policy-text">Users may post the following information on our Site: </p>
                    <ul>
                       <li className="policy-text">Public comments. </li>
                    </ul>
                    <p className="policy-text">By posting publicly on our Site, you agree not to act illegally or violate these Terms and Conditions.</p>
                    <br />
                    <h3 className="policy-title">Accounts</h3>
                    <p className="policy-text">When you create an account on our Site, you agree to the following:</p>
                    <ol>
                        <li className="policy-text">You are solely responsible for your account and the security and privacy of your account, including passwords or sensitive information attached to that account; and </li>
                        <li className="policy-text">All personal information you provide to us through your account is up to date, accurate, and truthful and that you will update your personal information if it changes.</li>
                    </ol>
                    <p className="policy-text">
                    We reserve the right to suspend or terminate your account if you are using our Site illegally or if you violate these Terms and Conditions.
                    </p>
                    <br />
                    <h3 className="policy-title">Sale of Service</h3>
                    <p className="policy-text">The following services are available on our Site: </p>
                    <ul>
                       <li className="policy-text">Strata Reports.</li>
                       <li className="policy-text">Building and Pest Inspection Reports. </li>
                       <li className="policy-text">Depreciation Reports. </li>
                       <li className="policy-text">Valuations.</li>
                       <li className="policy-text">Strata and Building Insurance. </li>
                    </ul>
                    <p className="policy-text">The services will be paid for in full when the services are ordered.</p>
                    <p className="policy-text">These Terms and Conditions apply to all the services that are displayed on our Site at the time you access it. All information, descriptions, or images that we provide about our services are as accurate as possible. However, we are not legally bound by such information, descriptions, or images as we cannot guarantee the accuracy of all services we provide. You agree to purchase services from our Site at your own risk.</p>
                    <p className="policy-text">We reserve the right to modify, reject or cancel your order whenever it becomes necessary. If we cancel your order and have already processed your payment, we will give you a refund equal to the amount you paid. You agree that it is your responsibility to monitor your payment instrument to verify receipt of any refund. </p>
                    <br />
                    <h3 className="policy-title">Third Party Goods and Services </h3>
                    <p className="policy-text">Our Site may offer goods and services from third parties. We cannot guarantee the quality or accuracy of goods and services made available by third parties on our Site.</p>
                    <br />
                    <h3 className="policy-title">User Goods and Services</h3>
                    <p className="policy-text">Our Site allows users to sell goods and services. We do not assume any responsibility for the goods and services users sell on our Site. We cannot guarantee the quality or accuracy of any goods and services sold by users on our Site. However, if we are made aware that a user is violating these Terms and Conditions, we reserve the right to suspend or prohibit the user from selling goods and services on our Site. 
                    </p>
                    <br />
                    <h3 className="policy-title">Payments </h3>
                    <p className="policy-text">We accept the following payment methods on our Site: </p>
                    <ul>
                       <li className="policy-text">Credit Card.</li>
                       <li className="policy-text">PayPal. </li>
                       <li className="policy-text">Debit. </li>
                       <li className="policy-text">Direct Debit.</li>
                    </ul>   
                    <p className="policy-text"><p className="policy-text">When you provide us with your payment information, you authorise our use of and access to the payment instrument you have chosen to use. By providing us with your payment information, you authorise us to charge the amount due to this payment instrument.</p>
                    </p>
                    <p className="policy-text">If we believe your payment has violated any law or these Terms and Conditions, we reserve the right to cancel or reverse your transaction.</p>
                    <br />
                    <h3 className="policy-title">Consumer Protection Law </h3>
                    <p className="policy-text">Where the Australian Consumer Law, Schedule 2 of the Competition and Consumer Act 2010, or any other consumer protection legislation in your jurisdiction applies and cannot be excluded, these Terms and Conditions will not limit your legal rights and remedies under that legislation. These Terms and Conditions will be read subject to the mandatory provisions of that legislation. If there is a conflict between these Terms and Conditions and that legislation, the mandatory provisions of the legislation will apply.</p> 
                    <br />
                    <h3 className="policy-title">Links to Other Websites</h3>
                    <p className="policy-text">Our Site contains links to third party websites or services that we do not own or control. We are not responsible for the content, policies, or practices of any third party website or service linked to on our Site. It is your responsibility to read the terms and conditions and privacy policies of these third party websites before using these sites.</p> 
                    <br />
                    <h3 className="policy-title">Limitation of Liability  </h3>
                    <p className="policy-text">Propti Pty Ltd and our directors, officers, agents, employees, subsidiaries, and affiliates will not be liable for any actions, claims, losses, damages, liabilities and expenses including legal fees from your use of the Site. </p> 
                    <br />
                    <h3 className="policy-title">Indemnity </h3>
                    <p className="policy-text">Except where prohibited by law, by using this Site you indemnify and hold harmless Propti Pty Ltd and our directors, officers, agents, employees, subsidiaries, and affiliates from any actions, claims, losses, damages, liabilities and expenses including legal fees arising out of your use of our Site or your violation of these Terms and Conditions.</p> 
                    <br />
                    <h3 className="policy-title">Applicable Law  </h3>
                    <p className="policy-text">These Terms and Conditions are governed by the laws of the State of New South Wales. </p> 
                    <br />
                    <h3 className="policy-title">Severability</h3>
                    <p className="policy-text">If at any time any of the provisions set forth in these Terms and Conditions are found to be inconsistent or invalid under applicable laws, those provisions will be deemed void and will be removed from these Terms and Conditions. All other provisions will not be affected by the removal and the rest of these Terms and Conditions will still be considered valid.</p> 
                    <br />
                    <h3 className="policy-title">Changes</h3>
                    <p className="policy-text">These Terms and Conditions may be amended from time to time in order to maintain compliance with the law and to reflect any changes to the way we operate our Site and the way we expect users to behave on our Site. We will notify users by email of changes to these Terms and Conditions or post a notice on our Site. 
                    </p>   
                    <br />
                    <h3 className="policy-title">Contact Details </h3>
                    <Link to="mailto:contact@propti.com.au" className="policy-text text-primary">contact@propti.com.au </Link>
                    <p className="policy-text">45 Denison Street, NSW, 2022</p>
                    <p className="policy-text">You can also contact us through the feedback form available on our Site. </p>
                    <p className="effective-date">Effective Date: 21st day of April, 2021</p>
                    {/* effective-date */}
                </div>
            </Container>
            {/* <Footer/> */}
            <div className="w-100 footer-bottom-line mt-5 comingfooter">
                <Container>
                    <Row>
                        <Col md={6} className="text-left">
                            <p>@2021 propti</p>
                        </Col>
                        <Col md={6} className="text-right">
                            <p><a href="./#/privacy-policy">Privacy Policy</a> | <a href="./#/term-use">T&C</a></p>
                        </Col>
                    </Row>
                </Container>
            </div> 
        </div>
    );
}

export default privacypolicy;