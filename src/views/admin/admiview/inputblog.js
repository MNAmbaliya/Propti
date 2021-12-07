import React, { useEffect } from 'react'
import {Navbar, Breadcrumb, Form, Image, Row, Col, Button, Table} from 'react-bootstrap'
import axios from "axios"
import { Link } from 'react-router-dom'

import SideBar from '../../../components/admin/basic/sidebar'
import AdminNavbar from '../../../components/admin/basic/navbar'
import DownloadButton from '../../../assets/images/icons/admin_download_button_icon.svg'
import Previews from '../../../components/admin/basic/uploadImage'
import { createBlog, getAllblogs, uploadBlogImage, updateBlog } from '../../../API/blog.api'
import EyeIcon from '../../../assets/images/icons/view_eye_icon.svg'
import EditIcon from '../../../assets/images/icons/edit_pen_icon.svg'
import DeleteIcon from '../../../assets/images/icons/delete_icon.svg'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function InputBlog() {
    /**
     * State varable for Blogs
     */
    const [blogData, setBlogData] = React.useState( 
        {
            action: 'createBlog',
            title: '',
            author: '',
            date: '',
            category: '',
            tags: '', 
            content: '',
            image:'',
        }
    )
    const [updateblogdata, setupdateBlog] = React.useState( 
        {
            action: 'createBlog',
            title: '',
            author: '',
            date: '',
            category: '',
            tags: '',
            content: '',
            image:'',
        }
    )
    const [blogs, setBlogs] = React.useState([]);
    const [imageFile, setImageFile] = React.useState();
    const [button, setbutton] = React.useState(<Button className="admin-text" type ="submit" style={{borderRadius:"0.8rem"}}>Post Blog</Button>);


    /**
     * Notification 
     * @param {*} message 
     * @returns 
     */
    const notify = (message) => toast(message);
    
    /**
     * Get All Blogs when the page is loading
     */
    useEffect(
        async() => {
            const blogsData =await getAllblogs();
            setBlogs(blogsData.data);
        }, []
    )

    /**
     * Create New blog 
     * @param {*} e 
     */
    async function onClickPost(e){
        e.preventDefault(); 
        if(imageFile){
            const fileUrl = await uploadBlogImage(imageFile, blogData.title.replace(/ /g, '_'));       
            blogData.image = process.env.REACT_APP_BACKEND_API_URL+ "/" +fileUrl.data.url;
            
            const res = await createBlog(blogData);
            const blogsData =await getAllblogs();
            
        } 
        else {
            notify("Set Image!")
        } 
        // const res = await createBlog(blogData)
        const blogsData =await getAllblogs();
        setBlogs(blogsData.data);
       
    }

    // async function updateblog(blog){
    //     blog.action = "updateBlogById";
    //     updateBlog(blog);
    // }

    async function updatemyblog(blog){
        var day = blog.date.substr(0, 2);
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var month = blog.date.replace(/[0-9]/g, '').trim();
        var onth1 = months.indexOf(month) + 1;
        onth1 = onth1 > 9 ? "" + onth1: "0" + onth1;
        var year = blog.date.substring(blog.date.length - 4);
        blog.date = year +"-"+ onth1 +"-"+ day;
        setBlogData(blog);
        setImageFile(blog.image);

        setbutton(<Button className="admin-text" type ="button" style={{borderRadius:"0.8rem"}} onClick = { ()=>updateBlog(updateblogdata) }>Update Blog</Button>);

    }

    async function deletemyblog(id){
        const res = await axios.get(
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php?action=deleteBlogById&blog_id="+id,
        );
        const blogsData =await getAllblogs();
        setBlogs(blogsData.data);
        notify(res.data);
    }

    /**
     * Clear All fields
     */
    function onClickClear(){
        setBlogData(
            {
                title: '',
                author: '',
                date: '',
                category: '',
                tags: '',
                content: '',
                image:''
            }
        )
        setbutton(<Button className="admin-text" type ="submit" style={{borderRadius:"0.8rem"}}  >Post Blog</Button>)
    }

    /**
     * Rendering View
     */

    return (
        <div>
            <SideBar/>
            <div className="admin-content">
                <AdminNavbar/>
                <Navbar>
                    <Navbar.Brand> 
                        <div>
                            <p className="admin-title m-0 p-0 text-muted">Earning</p>
                            <Breadcrumb className="admin-breadcrumb"> 
                                <Breadcrumb.Item href="/admin" className="my-0 admin-text text-muted">admin</Breadcrumb.Item>
                                <Breadcrumb.Item active className="my-0 admin-text text-primary">Input Blog</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Form inline className="px-3">
                            <Form.Group>
                                <Form.Control as='select'>
                                    <option>Today: Feb 1</option>
                                    <option>Today: Feb 2</option>
                                    <option>Today: Feb 3</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                        <Image src={DownloadButton}></Image>
                    </Navbar.Collapse>
                </Navbar>
                <div className="px-3 mt-3 ">
                    <div className="admin-card p-3">
                        <div className='border-bottom'>
                            <p className="my-3 admin-text-1 text-primary"><b>Blog Posting</b></p>
                        </div>
                        <Row className="mt-5">
                            <Col md={6}>
                                <Form onSubmit = {onClickPost}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label className="admin-text-1"><b>Blog Title</b></Form.Label>
                                        <Form.Control 
                                            className="admin-text" 
                                            type="text" 
                                            placeholder="Enter Blog Title" 
                                            name="title" 
                                            value = {blogData.title} 
                                            onChange = {
                                                (e)=>setupdateBlog({
                                                    ...updateblogdata,
                                                    title: e.target.value
                                                }),
                                                (e)=>setBlogData({
                                                    ...blogData,
                                                    title: e.target.value
                                                })
                                            }
                                            required
                                        />
                                    </Form.Group>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label className="admin-text-1"><b>Author</b></Form.Label>
                                                <Form.Control 
                                                    className="admin-text" 
                                                    type="text" 
                                                    placeholder="Enter Author Name" 
                                                    name="author" 
                                                    value={blogData.author} 
                                                    onChange = {
                                                        (e)=>setupdateBlog({
                                                            ...updateblogdata,
                                                            author: e.target.value
                                                        }),
                                                        (e) => setBlogData({
                                                            ...blogData,
                                                            author: e.target.value
                                                        })
                                                    }
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label className="admin-text-1"><b>Category</b></Form.Label>
                                                <Form.Control 
                                                    className="admin-text" 
                                                    type="text" 
                                                    placeholder="Enter Category" 
                                                    name="category" 
                                                    value={blogData.category} 
                                                    onChange = {
                                                        (e) => setBlogData({
                                                            ...blogData,
                                                            category: e.target.value
                                                        })
                                                    }
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label className="admin-text-1"><b>Date</b></Form.Label>
                                                <Form.Control 
                                                    className="admin-text" 
                                                    type="text" 
                                                    placeholder="Enter Date" 
                                                    name="date" 
                                                    value={blogData.date} 
                                                    onChange = {
                                                        (e) => setBlogData({
                                                            ...blogData,
                                                            date: e.target.value
                                                        })
                                                    }
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label className="admin-text-1"><b>Tags</b></Form.Label>
                                                <Form.Control 
                                                    className="admin-text" 
                                                    type="text" 
                                                    placeholder="Mention Tags" 
                                                    name="tags" 
                                                    value={blogData.tags} 
                                                    onChange = {
                                                        (e) => setBlogData({
                                                            ...blogData,
                                                            tags: e.target.value
                                                        })
                                                    }
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label className="admin-text-1">Content</Form.Label>
                                        <Form.Control 
                                            as="textarea" 
                                            placeholder='Enter your Content Here' 
                                            rows={4} 
                                            name="content" 
                                            value={blogData.content}
                                            onChange = {
                                                (e) => setBlogData({
                                                    ...blogData,
                                                    content: e.target.value
                                                })
                                            } 
                                            required
                                        />
                                    </Form.Group>
                                    {button}
                                    
                                    <Button 
                                        className="ml-2 admin-text"  
                                        style={{borderRadius:'0.8rem'}}
                                        onClick = {
                                            ()=>onClickClear()
                                        }
                                    >
                                        Clear All Data
                                    </Button>
                                </Form>
                            </Col>
                            <Col md={6}>
                                <div className="p-2 h-100 w-100">
                                    <Previews 
                                        setImageFile = { setImageFile }
                                    />
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className = "admin-card my-3">
                        <div className="d-flex justify-content-between align-items-center px-2 py-2 admin-navbar">
                            <p className="my-0 text-primary ml-3 admin-text">Recently Posted</p>
                            <Form inline className="px-1">
                                <Form.Group>
                                    <Form.Control as='select' className="admin-text">
                                        <option>Strata Report</option>
                                        <option>This Week</option>
                                        <option>This Day</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </div>
                        <Table hover className = "admin-text">
                            <thead style={{background: "rgba(29, 131, 255, 0.2)"}}>
                                <tr className="text-center">
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Categories</th>
                                    <th>Tags</th>   
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    blogs.map(
                                        (blog) => (
                                            <tr key={blog.id} className="text-center border-bottom">
                                               <td>{blog.title}</td>
                                               <td>{blog.author}</td>
                                               <td>{blog.category}</td>
                                               <td>{blog.tags}</td>
                                               <td>{blog.date}</td>
                                               <td>
                                                   <div className="d-flex align-items-center justify-content-center">
                                                       <Link to={"/blogdetail/"+ blog.blog_id }>
                                                            <img className="mx-2" src = {EyeIcon}  />
                                                       </Link>
                                                       <img className="mx-2" src = {EditIcon}
                                                            onClick = {
                                                                ()=>updatemyblog(blog)
                                                            }
                                                            style = {{cursor:'pointer'}}
                                                       />
                                                       <img className="mx-2" src = {DeleteIcon}   
                                                            onClick = {
                                                                ()=>deletemyblog(blog.blog_id)
                                                            }
                                                            style = {{cursor:'pointer'}}
                                                        />
                                                   </div>
                                               </td>
                                            </tr>
                                        )
                                    )
                                }
                            </tbody>
                        </Table>
                        <ToastContainer 
                            toastClassName = "border border-grey"
                        />
                    </div>
                </div>
            </div>            
        </div>
    )
}

export default InputBlog
