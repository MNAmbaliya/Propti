import React, {useEffect} from 'react'
import {Col, Container, Image, Row, Form, Button, Accordion } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Pagination from "react-js-pagination";

import '../assets/css/blog.css'
import Header from '../components/header'
import Footer from '../components/footer'
import BgPattern3 from '../assets/images/bg/pattern/hero_bg_pattern.svg'
import DropDownIcon from '../assets/images/icons/navbar_dropdown.svg'
import BlogCard from '../components/blog/blogcard'
import { getAllblogs } from '../API/blog.api';

function Blog() {
    /**
     * Declaration State Variable 
     */
    const [blogs, setBlogs] = React.useState([]);
    const [filteredData, setFilteredData] = React.useState(blogs);
    const [searchString, setSearchString] = React.useState('');
    const[activePage, setactivePage] = React.useState(1);
    const[countPerPage, setCountPerPage] = React.useState(10)

    /**
     * Get intitial Data form backend API
     * @param {*} string 
     */
    useEffect(
        async()=>{
            const blogs = await getAllblogs();
            setBlogs(blogs.data);
            setFilteredData(blogs.data);
            setactivePage(blogs.data.page);
            setCountPerPage(blogs.data.limit)
        }, []
    )

    /**
     * Search function
     * @param {*} string 
     */
    function Search(string){
        let filter_string=string.trim().toLowerCase();
        if(filter_string.length > 0){
            setFilteredData(
                blogs.filter(
                    function(i){
                        return i.title.toLowerCase().match( filter_string );
                    }
                )
            )
        }
        if(filter_string.length == 0){
            setFilteredData(blogs)
        }
    }

    /**
     * Pagenation handle change
     * @param {*} pageNumber 
     */
    function handlePageChange(pageNumber) {
        setactivePage(activePage)
    }

    /**
     * Rendering views
     */
    return (
        <div>
            <Image src={BgPattern3} className="position-absolute w-100" style={{ zIndex:'-1'}}></Image>
            <Container>
                <Header/>
                <div className="text-center set_page_title">
                    <p className="login-title">Blog</p>
                </div>
                <Row>
                    <Col md={3}>
                        <Form>
                            <div className="position-relative d-flex align-items-center search-blog">
                                <Button 
                                    className="search-button-small" 
                                    onClick={()=>Search(searchString)}
                                >
                                    Search
                                </Button>                            
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
                                    <p className="my-2"><Link to="#" className="text-decoration-none wall-nav-link app-text">Marketing</Link></p>
                                    <p className="my-2"><Link to="#" className="text-decoration-none wall-nav-link app-text">Digital Marketing</Link></p>
                                    <p className="my-2"><Link to="#" className="text-decoration-none wall-nav-link app-text">SEO Marketing</Link></p>
                                    <p className="my-2"><Link to="#" className="text-decoration-none wall-nav-link app-text">Travelling Trip</Link></p>
                                    <p className="my-2"><Link to="#" className="text-decoration-none wall-nav-link app-text">Website Design</Link></p>
                                </div>
                            </Accordion.Collapse>
                        </Accordion>
                    </Col>
                    <Col md={9}>
                        <Row>
                            {
                                filteredData.map(
                                    (item)=>(
                                        <Col md={6} key={item.id}>
                                            <BlogCard 
                                                title={item.title}
                                                author={item.author}
                                                date={item.date}
                                                content={item.content.substr(0,97) + "..."}
                                                image = {item.image}
                                                id = {item.blog_id}
                                            />
                                        </Col>
                                    )
                                )
                            }
                        </Row>
                        <div className="test d-flex justify-content-center app-text blog-pagenation mt-5">
                            <Pagination
                                activePage = {activePage}
                                itemsCountPerPage = {countPerPage}
                                totalItemsCount = {filteredData.length}
                                pageRangeDisplayed={5}
                                hideFirstLastPages = {true}
                                onChange = {(e) => handlePageChange(e)}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    )
}

export default Blog
