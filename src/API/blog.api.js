import axios from "axios"
import header from "../components/header";

export const getAllblogs = async() => {
    const blogs = await axios.get(
        "https://proptiapi.ignatiuslab.in/test_api.php?action=getBlogs"
    );
    return blogs;
}

const token = localStorage.getItem("tokens");

export const createBlog = async(body) => {
    
    const data_post = {
        "action": 'createBlog',
        "author": body.author,
        "category": body.category, 
        "date": body.date,
        "content": body.content,
        "readmore": "Read More",
        "tags": body.tags,
        "title": body.title,
        "image": body.image + ".png",
    }
    var headers = {
        "Authorization": "Bearer "+`${token}`,
        "Content-Type": "multipart/form-data"
    };
    const res = await axios.post(
        "https://proptiapi.ignatiuslab.in/test_api.php", data_post, { headers : headers }
    );
    
    return res;
    
}


export const updateBlog = async(body) => {
    console.log(body);
    // const data_post = {
    //     "action": body.action,
    //     "blog_id": body.blog_id,
    //     "author": body.author,
    //     "category": body.category, 
    //     "date": body.date,
    //     "content": body.content,
    //     "readmore": "Read More",
    //     "tags": body.tags,
    //     "title": body.title,
    //     "image": body.image + ".png",
    // }
    // var headers = {
    //     "Authorization": "Bearer "+`${token}`,
    //     "Content-Type": "multipart/form-data"
    // };
    // const res = await axios.post(
    //     "https://proptiapi.ignatiuslab.in/test_api.php", data_post, { headers : headers }
    // );
    // console.log(res);
    //return res;
    
}

export const uploadBlogImage = async(file, fileName) => {
    const data = new FormData();
    data.append("file", file);
    data.append("fileName", fileName );
    data.append("action", 'uploadBlogImage' );
    const res = await axios.post(
        process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
        data,
        {
            "enctype": "multipart/form-data" 
        }
    )

    return res;
}