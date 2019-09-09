import React from 'react';
import {Grid, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './footer.css'

  var YoutubeWhiteV = 'https://res.cloudinary.com/party-images-app/image/upload/v1559961502/cuevkjbesbg73mygr98c.png'
  var InstagramWhiteV = 'https://res.cloudinary.com/party-images-app/image/upload/v1559961502/emcr2vjfu25erawddsos.png'
  var TwitterWhiteV = 'https://res.cloudinary.com/party-images-app/image/upload/v1559961502/puu0djcyugdhiz33nqbi.png'
  var YoutubeBlackV = 'https://res.cloudinary.com/party-images-app/image/upload/v1559961502/pxk8bsjaaiczvoevcogh.png'
  var InstagramBlackV = 'https://res.cloudinary.com/party-images-app/image/upload/v1559961502/tuflrdipm1jppebas6zu.png'
  var TwitterBlackV = 'https://res.cloudinary.com/party-images-app/image/upload/v1559961502/chgo0r53alhnnxdawunt.png'
 var GetInTouchV = 'https://res.cloudinary.com/party-images-app/image/upload/v1559960064/uvic6vretl0zabrk570z.png'


const Footer = () => 

        <Row className="row-get-in-touch">
          <Col className="col-in-touch-top" xs={12} md={12}>
          <h1>GET IN TOUCH</h1>
          <p>Sydney NSW, Australia</p>
          <p>charliepartyapp@gmail.com</p>
          <p>0435-388-698</p>
          <div className="touch-icons">
          	<a href="https://www.instagram.com/charliepartyapp/" target="_blank">
            	<img src={InstagramWhiteV} />
            </a>
            <a href="https://www.instagram.com/charliepartyapp/" target="_blank">
            	<img src={YoutubeWhiteV} />
            </a>
            <a href="https://www.instagram.com/charliepartyapp/" target="_blank">
            	<img src={TwitterWhiteV} />
            </a>
          </div>
          <img src={GetInTouchV} />
          </Col>
          <Col className="col-in-touch-bottom" xs={12} md={12}>
          <div className="touch-icons">
          	<a href="https://www.instagram.com/charliepartyapp/" target="_blank" >
            	<img src={InstagramBlackV} />
            </a>
            <a href="https://www.instagram.com/charliepartyapp/" target="_blank" >
            	<img src={YoutubeBlackV} />
            </a>
            <a href="https://www.instagram.com/charliepartyapp/" target="_blank" >
            	<img src={TwitterBlackV} />
            </a>
          </div>
          <Link to={{ pathname: '/privacy-policy' }}>
            <p>PRIVACY POLICY</p>
            </Link>
          <Link to={{ pathname: '/about' }}>
            <p>F.A.Q.</p>
            </Link>
            <p>&copy; by PROJECT CHARLIE 2019</p>
          </Col>
        </Row>

export default (Footer)