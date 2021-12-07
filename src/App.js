import React, { useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import {
    HashRouter as Router,
    Switch,
    Route, 
    useHistory, 
    Redirect,
} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { autosignin } from './app/api/auth/actions'
import axios from 'axios';


// import reasources
import Home from './views/home';
import ComingSoon from './views/comingSoon';
import PageNotFound from './views/404';
import AboutUs from './views/aboutus';
import Login from './views/login';
import SignUp from './views/signup';
import Faqs from './views/faqs';
import FaqTest from './views/faqtest';
import Order from './views/order';
import Service from './views/service';
import Wall from './views/wall';
import Blog from './views/blog';
import Admin from './views/admin';
import Testapi from './views/testapi';
import Purchase from './views/purchase';
import Payment from './views/payment'
import OrderValuation from './views/valuation/order';
import OrderBuilding from './views/depreciation/order';
import OrderInspection from './views/inspection/order';
import PropertyInsurance from './views/propertyInsurance';
import Success from './views/success'
import Portal from './views/portals'
import BlogDetail from './views/blogDetail';
import AuthorityDocument from './views/authorityDocument';
import StrataInsurance from './views/strataInsurance';
import PrivacyPolicy from './views/privacypolicy';
import TermUse from './views/term-use';
import resetPassword from './components/portal/common/password';


import Contact from './components/home/contact/contact';
import { getDomainApiAcccessToken } from './API/domain.api';
require('dotenv').config();

function App() {
    /**
     * Auto Login
     */
    const history = useHistory()
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();    
    // useEffect(
    //     async ()=>{
    //         //auto login 
    //         if(localStorage.getItem('tokens') !== null){
    //             axios.post(
    //                 `${process.env.REACT_APP_BACKEND_API_URL}/v1/auth/auto-login`,
    //                 {
    //                     tokens: JSON.parse(localStorage.getItem('tokens'))?.refresh.token
    //                 }
    //             ).then(res =>{
    //                     dispatch( 
    //                         autosignin
    //                         (
    //                             res.data
    //                         )
    //                     )
    //                     localStorage.setItem('tokens', JSON.stringify(res.data.tokens));
    //                     console.log("Logged in automatically, user=>", res)
    //                 }
    //             ).catch(
    //                 err => {
    //                     localStorage.removeItem('tokens');
    //                     console.log(err);
    //                 }
    //             )                
    //         }
    //         //Domain API access token
    //         const res = await getDomainApiAcccessToken();
    //         console.log("Domain API token=>", res);
            
    //     }, []
    // )
    //Rendering View
    return (
        <div className="w-100">
            <Router>
                <Switch>
                    
                    <Route  exact  path="/">
                        <Home/>
                        {/* <ComingSoon/> */}
                    </Route>
                    <Route exact path="/about">
                        <AboutUs/>
                    </Route>
                    <Route exact path="/login">
                        <Login/>
                    </Route>
                    <Route exact path="/test">
                        <Testapi/>
                    </Route>
                    
                    <Route exact path="/signup">
                        <SignUp/>
                    </Route>
                    <Route exact path="/faqs">
                        <Faqs/>
                    </Route>
                    <Route exact path="/faqtest">
                        <FaqTest/>
                    </Route>
                    <Route exact path="/search/:type">
                        <Order/>
                    </Route>
                    <Route exact path="/service">
                        <Service/>
                    </Route>
                    <Route exact path="/property-insurance">
                        <PropertyInsurance/>
                    </Route>   
                    <Route exact path="/wall">
                        <Wall/>
                    </Route>
                    <Route exact path="/blog">
                        <Blog/>
                    </Route>
                    <Route exact path="/blogdetail/:blogId" component = {BlogDetail}>
                    </Route>
                    <Route exact path="/purchase">
                        <Purchase/>
                    </Route>
                    <Route exact path="/payment">
                        <Payment />
                    </Route>
                    <Route exact path="/valuation">
                        <OrderValuation/>
                    </Route>
                    <Route exact path="/depreciation">
                        <OrderBuilding/>
                    </Route>
                    <Route exact path="/inspection">
                        <OrderInspection/>
                    </Route>
                    <Route exact path="/success">
                        <Success/>
                    </Route>
                    <Route exact path="/resetpassword">
                        <resetPassword/>
                    </Route>
                    <Route exact path="/authority-document">
                        <AuthorityDocument/>
                    </Route>
                    <Route exact path="/strata-insurance">
                        <StrataInsurance/>
                    </Route>
                    <Route exact path="/privacy-policy">
                        <PrivacyPolicy/>
                    </Route>    
                    <Route exact path="/term-use">
                        <TermUse/>
                    </Route>                                      
                    {/* <Route path="/contact">
                        <Contact/>
                    </Route> */}
                    <PrivateRoute path="/portal">
                        <Portal/>
                    </PrivateRoute>
                    <PrivateRoute path="/admin">
                        <Admin />
                    </PrivateRoute>
                    
                </Switch>
            </Router>
        
        </div>
    );
}


// priviate route
function PrivateRoute({ children, ...rest }) {
    let auth = (localStorage.getItem('tokens') !== null);
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
}

export default App;
