import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
function CreateWallModal(props) {
    /**
     * Declaration the State variables
     */
    const [show, setShow] = useState(false);
    const [message, setmessage] = useState ('')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    /**
     * Post the new wall question
     */
    async function handlePost(){
        const question = document.getElementById("question").value
        const detail = document.getElementById("detail").value
        const current = new Date();
        const date = (current.getMonth()+1).toString() + "/" + current.getDate().toString() +"/"+ current.getFullYear().toString()

        if((detail !== "")&&(question !== "")){
            const res = await axios.post(
                process.env.REACT_APP_BACKEND_API_URL + "/v1/wall/create",
                {
                    allowed: false,
                    question: question,
                    detail: detail,
                    userId: localStorage.getItem("userId"),
                    date: date,
                    reply:[]
                }
            ).then(
                ()=>{
                    setmessage("Please wait until the wall post is approved")
                    props.getWalls()
                }
            )
            .catch(
                err =>{
                    setmessage("Error occoured (Maybe This question is arleady taken, please consider the posts)")
                }
            )
        }
        else {
            setmessage("Please fill the all fields!")
        }
    }
    
    /**
     * Rendering View
     */
    return (
        <>
        {/* <Button variant="primary" className="search-button-small" onClick={handleShow}>
            Ask Question
        </Button> */}

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title  className="login-title">Ask Question</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="app-text">What do you want to know!</p>
                <Form>
                    <Form.Group>
                        <Form.Label className="login-title">Question</Form.Label>
                        <Form.Control
                            type = "text"
                            className="app-text"
                            placeholder="Question"
                            id = "question"
                            required
                        />
                    </Form.Group>
                    <textarea 
                        row={3}
                        className = "w-100 rounded border-grey border app-text p-2"
                        placeholder="detail"
                        id = "detail"
                        required
                    />
                </Form>
                <p className="app-text text-danger">{message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" className="app-text" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" className="app-text" onClick={handlePost}>
                    Post Question
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default CreateWallModal
