import React from 'react'
import { Container, Image } from 'react-bootstrap'
import Footer from '../../components/footer'
import Header from '../../components/header'
import BgPattern3 from '../../assets/images/bg/pattern/footer_bg_pattern.svg'
import { Route, Switch } from 'react-router-dom'

import ReporterPortal from './reporter'
import BuyerPortal from './buyer'
import AgentPortal from './agent'
import '../../assets/css/portal.css'



function Portal() {
    return (
        <div>
            <Image src={BgPattern3} className="position-absolute w-100" style={{ marginTop:'100px', zIndex:'-1'}}></Image>
            <Container>
                <Header/>
                <div className="text-center set_page_title">
                    <p className="login-title mb-0">Portal</p>
                </div>
                <Switch>
                    <Route exact path="/portal/reporter">
                        <ReporterPortal/>
                    </Route>
                    <Route path="/portal/agent">
                        <AgentPortal/>
                    </Route>
                    <Route path="/portal/buyer">
                        <BuyerPortal/>
                    </Route>
                </Switch>
            </Container>
            <Footer/>
        </div>
        
    )
}

export default Portal
