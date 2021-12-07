import React from 'react'
import {Tab, Tabs} from 'react-bootstrap'

import PortalSection from '../../components/portal/common/portal'
import AccountDetail from '../../components/portal/common/accountdetail'
import NewOrder from '../../components/portal/common/neworder'
import ContactUs from '../../components/portal/common/contactus'
import OrderinProcess from '../../components/portal/common/orderinprocess'
import ClientOrder from '../../components/portal/common/clientorder'
import History from '../../components/portal/common/history'
import Download from '../../components/portal/common/download'
import Upload from '../../components/portal/reporter/upload'
import Password from '../../components/portal/common/password'

function ReporterPortal() {
    return (
        <div className="portal-tabs">
             <Tabs defaultActiveKey="portal" id="uncontrolled-tab-example" className="fags-tabs">
                 <Tab eventKey="portal" title="Portal">
                     <PortalSection/>
                 </Tab>
                 <Tab eventKey="neworder" title="New Orders">
                     <NewOrder/>
                 </Tab>
                 <Tab eventKey="orderinprocess" title="Awaiting Inspections">
                     <OrderinProcess/>
                 </Tab>
                 {/* <Tab eventKey="clientorder" title="Client Order">
                     <ClientOrder/>
                 </Tab> */}
                 <Tab eventKey="upload" title="Uploads" className="uploads-block">
                     <Upload/>
                 </Tab>
                 <Tab eventKey="completed" title="Completed">
                     <OrderinProcess/>
                 </Tab>
                 <Tab eventKey="download" title="Downloads">
                     <Download/>
                 </Tab>
                 <Tab eventKey="acountdetail" title="Acount Details" className="portal-account-details">
                     <AccountDetail/>
                 </Tab>
                 {/* <Tab eventKey="password" title="Reset Password" className="portal-account-details">
                     <Password/>
                 </Tab> */}
                 <Tab eventKey="history" title="History">
                    <History/>
                 </Tab>
                 <Tab eventKey="contactus" title="Contact Us" className="portal-contact-form">
                     <ContactUs/>
                 </Tab>
             </Tabs>
        </div>
    )
}

export default ReporterPortal
