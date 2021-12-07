import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,  
} from "react-router-dom";
import axios from 'axios'

import AdminDashboard from './admiview/dashboard'
import Earning from './admiview/earning'
import Database from './admiview/database'
import Properties from './admiview/properties'
import Download from './admiview/download'
import Orders from './admiview/order'
import WallPost from './admiview/wallpost'
import InputBlog from './admiview/inputblog'

import { useLocation, useHistory } from 'react-router-dom';

function Admin() {
    const history = useHistory();
    async function getUser(){
        const user = await axios.post(                
            process.env.REACT_APP_BACKEND_API_URL + "/test_api.php",
            {
                action:"getUser",
                id:localStorage.getItem('userId')
            }
        )
        
        if(user.data != undefined || user.data != null || user.data != ''){
            if(user.data[0].role != "admin"){
                history.push("/")
            }
        }
    }

    useEffect(
        async()=>{

            getUser();

        }, []
    )

    return (
        <div>          
            <Switch>
                <Route exact path="/admin">
                    <AdminDashboard/>
                </Route>
                <Route path="/admin/earning">
                    <Earning/>
                </Route>
                <Route path="/admin/database">
                    <Database/>
                </Route>
                <Route path="/admin/properties">
                    <Properties/>
                </Route>
                <Route path="/admin/download">
                    <Download/>
                </Route>
                <Route path="/admin/orders">
                    <Orders/>
                </Route>
                <Route path="/admin/wallpost">
                    <WallPost/>
                </Route>
                <Route path="/admin/inputblog">
                    <InputBlog/>
                </Route>
            </Switch>              
        </div>
    )
}

export default Admin
