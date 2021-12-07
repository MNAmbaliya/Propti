import React, {useEffect} from 'react'
import {Col, Container, Image, Row, Form, Button, Accordion } from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import BgPattern3 from '../assets/images/bg/pattern/footer_bg_pattern.svg'
import DropDownIcon from '../assets/images/icons/navbar_dropdown.svg'
import Header from '../components/header'
import Footer from '../components/footer'
import { getAllblogs } from '../API/blog.api';
import FacebookIcon from '../assets/images/icons/facebook.svg'
import TwiterIcon from '../assets/images/icons/twiter.svg'
import LinkedinIcon from '../assets/images/icons/linkedin.svg'

const BlogThumb = (props) => {
    const hitory = useHistory();
    return <>
        <div className = "my-3">
            <img className = "w-100" src={props.image}/>
            <h5 className = "my-2 blog-history-title" style = {{fontFamily:'poppins', fontWeight:'bold'}}>{props.title}</h5>
            <div className="d-flex align-items-center justify-content-between">
                <p className = "my-1 blog-history-date">{props.date}</p>
                <p 
                    className = "my-1 blog-history-readnow"
                    style = {{cursor:'pointer'}}
                    onClick={
                        ()=>{
                            hitory.push(`/blogdetail/${props.id}`);
                            props.setBlogId(props.id);
                        }
                    }
                >
                    Read Now
                </p>
            </div>
        </div>
    </>
}

function BlogDetail(props) {
    const [blogs, setblogs] = React.useState([]);
    const [blogsfilter, setfilterblogs] = React.useState([]);
    const [blogId, setBlogId] = React.useState(props.match.params.blogId);
    
    useEffect(
        async()=>{
            const blogsData = await getAllblogs();
            setblogs(blogsData.data);
            setfilterblogs(blogsData.data.filter( data => data.blog_id == blogId));
            setBlogId(props.match.params.blogId);
        }, []
    )

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
    };
    return (
        <div>
            <Image src={BgPattern3} className="position-absolute w-100" style={{ marginTop:'100px', zIndex:'-1'}}></Image>
            <Container>
                <Header/>
                <div className="text-center set_page_title">
                    <p className="login-title">Blog</p>
                </div>
                <Row>
                    <Col xl={3} md={4}>
                        <Form>
                            <div className="position-relative d-flex align-items-center">
                                <Button 
                                    className="search-button-small" 
                                    // onClick={()=>Search(searchString)}
                                >
                                    Search
                                </Button>                            
                                <Form.Control 
                                    type='text' 
                                    placeholder='Search here' 
                                    name="search" 
                                    className="serch-box"
                                    // onChange={(e)=>{setSearchString(e.target.value)}}
                                    // value={searchString}
                                />                                
                            </div>  
                        </Form>
                        <Accordion className="blog-category-toggle">
                            <Accordion.Toggle as={Button} variant="link" eventKey="0"  className="toggle-button">
                                <div className="d-flex align-items-center mt-4">
                                    <Image src={DropDownIcon}></Image>
                                    <p className="ml-3 my-0 blog-toggle-title"><b>Category</b></p>
                                </div>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <div className="ml-5">
                                    <p className="my-2"><Link to="#" className="text-decoration-none wall-nav-link app-text">All</Link></p>
                                    <p className="my-2"><Link to="#" className="text-decoration-none wall-nav-link app-text">Marketing</Link></p>
                                    <p className="my-2"><Link to="#" className="text-decoration-none wall-nav-link app-text">Digital Marketing</Link></p>
                                    <p className="my-2"><Link to="#" className="text-decoration-none wall-nav-link app-text">SEO Marketing</Link></p>
                                    <p className="my-2"><Link to="#" className="text-decoration-none wall-nav-link app-text">Travelling Trip</Link></p>
                                    <p className="my-2"><Link to="#" className="text-decoration-none wall-nav-link app-text">Website Design</Link></p>
                                </div>
                            </Accordion.Collapse>
                        </Accordion>
                        <div>
                            <hr/>
                            <Slider className="left-history-silder" {...settings}>
                                {
                                    blogs.map(
                                        (item)=>(
                                            <div key={item.id}>
                                                <BlogThumb
                                                    image = {item.image}
                                                    title = {item.title} 
                                                    date = {item.date}
                                                    id = {item.blog_id}
                                                    setBlogId = {setBlogId}
                                                />
                                            </div>
                                        )
                                    )
                                }
                            </Slider>
                        </div>
                    </Col>
                    <Col xl={9} md={8}>
                        <div className="blog-detail-block">

                            {
                                
                               blogsfilter.map(
                                   (item) => (
                                       <div key={item.id} >
                                            <img 
                                                src ={item.image} className="w-100"
                                                style = {{
                                                    borderRadius:"20px 20px 0px 0px"
                                                }}
                                            />
                                            <h4 className="my-2 single-blog-title">{item.title}</h4>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <p className="single-blog-author my-0 ">{item.author}</p>
                                                <p className="single-blog-date my-0 ">{item.date}</p>
                                            </div>
                                            <p className="single-blog-content">
                                                {item.content}
                                            </p>
                                            <div className="d-flex align-items-center">
                                                <p className="single-blog-share my-0">Share Now :</p>
                                                <img src = {FacebookIcon} className="ml-3"></img>
                                                <img src = {TwiterIcon} className="ml-3"></img>
                                                <img src = {LinkedinIcon} width={20} height={20} className="ml-3"></img>
                                            </div>
                                       </div>
                                   )
                               )
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    )
}

export default BlogDetail
