import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
function BlogCard(props) {
    const history = useHistory();
    return (
        <div>
            <Card className="blog-card my-1 blog-card-block">
                <Card.Img src={props.image} variant="top" className="blog-card-image"/>
                <Card.Body>
                    <p className="app-title blog-card-title">{props.title}</p>
                    <div className="d-flex justify-content-between">
                        <p className="my-1 app-text blog-card-author">{props.author}</p>
                        <p className="my-1 app-text blog-card-date">{props.date}</p>
                    </div>
                    <p className="my-1 app-text blog-card-content">{props.content}</p>
                    <div className='d-flex justify-content-center'>
                        <Button 
                            className="app-text px-5 blog-card-readmore" 
                            style={{borderRadius:'1.5rem'}}
                            onClick = {
                                ()=>{
                                    history.push(`/blogdetail/${props.id}`)
                                }
                            }
                        >
                            Read More
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default BlogCard
