import React from 'react';
import { Container, Image } from 'react-bootstrap';

// import reasources
import Header from '../components/header';
import Hero from '../components/home/hero';
import BgPattern1 from '../assets/images/bg/pattern/hero_bg_pattern.svg';
import BgPattern2 from '../assets/images/bg/pattern/ourwork_bg_pattern.svg'
import BgPattern3 from '../assets/images/bg/pattern/footer_bg_pattern.svg';
import Brnad from '../components/home/brand';
import AboutUs from '../components/home/aboutus';
import Ourwork from '../components/home/ourwork';
import Partners from '../components/home/partners';
import TestMonial from '../components/home/testmonial';
import Contact from '../components/home/contact';
import Footer from '../components/footer';

function Home() {
    

    return (
        <div className="w-100" style={{position:"relative"}}>
            <Image src={BgPattern1} className="position-absolute w-100 set_hero_bg" ></Image>
            <Container>
                <Header/>
                <Hero/>
                <Brnad/>
                <AboutUs/>
            </Container>
            <Image src={BgPattern2} className="position-absolute w-100" style={{marginTop:'400px'}}></Image>
            <Container>
                <Ourwork/>
                <Partners/>
            </Container>
            <div style={{backgroundColor:'#E8F3FF'}}>
                <Container>
                    <TestMonial/>
                </Container>
            </div>
            <Image src={BgPattern3} className="position-absolute w-100" style={{marginTop:'300px'}}></Image>
            <Container>
                <Contact/>
            </Container>
            <Footer/>
        </div>
    )
    
    
}

export default Home;
