import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import {Row, Col } from 'react-bootstrap'
import './social.css'


//import Instagram from '../img/instagram-icon.png'
//import Youtube from '../img/youtube-icon.png'
//import NoUser from '../img/no-user-white.png'
//import ArrowBack from '../img/arrow-back-white.png'

var InstagramV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109082/wtr8blfjbhm4gqdsxlj0.png'
var FacebookV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109082/kggc0uztnyow0l9tnzk3.png'
var YoutubeV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109084/nffxrc9xgm1mbpmrsgse.png'
//var FootTopV = 'https://res.cloudinary.com/party-images-app/image/upload/v1557066043/udgibe1x6si4hdmwcimc.png'
var FootTopV = 'https://res.cloudinary.com/party-images-app/image/upload/v1558049922/fjqscofbqv8zuebk9net.png'

export default class Social extends Component {

    constructor(props) {
    super(props);
    this.state = {
          isLoggedIn: false
      }
  }

render(){

	return(
        <span>
        <Row className='Row-social-rounded'>
        <img className="rounded-top" src={FootTopV} />
        </Row>
        <Row id='Row3-social'>
        <Col id="col-row3"  xs={12} md={12}>
            <div id="main-header">
             <h2>PROJECT</h2>
             <h1>CHARLIE</h1>
           </div>
        </Col>
        </Row>
        <Row className='Row3-social-menu'>
          <div className="last-col">
          <Link to={{ pathname: '/about' }}>
          <p>CHARLIE</p>
          </Link>
          <Link to={{ pathname: '/about' }}>
          <p>F.A.Q.</p>
          </Link>
          <Link to={{ pathname: '/about' }}>
          <p>CONTACT</p>
          </Link>
          <Link to={{ pathname: '/privacy-policy' }}>
            <p>PRIVACY POLICY</p>
            </Link>
          </div>
          </Row>
          <Row id='Row3-social'>
          <Col id="col-row3"  xs={12} md={12}>
            <div id="social-line"> </div>
          </Col>
        </Row>

        <Row className="row-social-img">

            <Col className="social-img-col" xs={12} md={12}>
              <div className="same-width">
                <a href="https://www.instagram.com/charliepartyapp/" target="_blank" className="social-icon"> 
                  <img id="" src={InstagramV} /> 
                </a>
                <a href="https://www.instagram.com/charliepartyapp/" target="_blank" className="social-icon"> 
                  <img id="" src={YoutubeV} /> 
                </a>
                <a href="https://www.instagram.com/charliepartyapp/" target="_blank" className="social-icon"> 
                  <img id="" src={FacebookV} /> 
                </a>
              </div>
            </Col>

        </Row>
        </span>
                    
             
             
		)
}

}

