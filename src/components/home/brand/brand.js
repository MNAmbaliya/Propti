import React from 'react';
import { Col, Row, Image } from 'react-bootstrap';

// import reasources
import '../../../assets/css/brand.css'
import Brand1 from '../../../assets/images/logo/brands/brampton.svg';
import Brand2 from '../../../assets/images/logo/brands/npv.svg';
import Brand3 from '../../../assets/images/logo/brands/assurity.svg';

function Brand() {
    return (
        <div className="brand-root">
           <Row>
               <Col className="d-flex justify-content-center">
                    <Image src={Brand1} className="brand-logo"></Image>
               </Col>
               <Col className="d-flex justify-content-center">
                    <Image src={Brand2} className="brand-logo"></Image>
               </Col>
               <Col className="d-flex justify-content-center">
                    <Image src={Brand3} className="brand-logo"></Image>
               </Col>
           </Row>
        </div>
    )
}

export default Brand
