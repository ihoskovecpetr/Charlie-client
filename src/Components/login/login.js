import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom'
import {Grid, Row, Col, Button, Image, Jumbotron, Glyphicon } from 'react-bootstrap'
import './login.css'

import Facebook from './facebook'
import Google from './google-login'
import Social from '../social'
import Nav from '../nav'

//import Instagram from '../img/instagram-icon.png'
//import Youtube from '../img/youtube-icon.png'
//import NoUser from '../img/no-user-white.png'
//import ArrowBack from '../img/arrow-back-white.png'

var ArrowBackV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552106126/wqep6jsjtodqrxuehlhy.png'
var NoUserV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109083/xyty8m0wsw6rxfmgeur7.png'
var InstagramV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109082/wtr8blfjbhm4gqdsxlj0.png'
var FacebookV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109082/kggc0uztnyow0l9tnzk3.png'
var YoutubeV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109084/nffxrc9xgm1mbpmrsgse.png'
var CharlieLogoV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552431642/bm09b4wncwatscw9gtdg.png'
var CloseV = 'https://res.cloudinary.com/party-images-app/image/upload/v1556016923/jgslo16gy9mcrnqtbziv.png'



class Login extends Component {

    constructor(props) {
    super(props);
    this.state = {
          isLoggedIn: false

      }
  }


  componentDidMount(){
    console.log("componntDiMnt login.js")
  }

  componentWillUnmount() {

  }


handleFakeUser = () => {
this.props.setUserFce(true, '5c8cc3c3807558057c88ab18' , "Charlie Einstein" , "charliepartyapp@gmail.com", "https://res.cloudinary.com/party-images-app/image/upload/v1552728775/h0gyfjfm7fuqmfih9jlj.png" )
//this.setState({isLoggedIn: true})
}

goBackHandle = () => {
  console.log("goBackHandle FCE")
   this.props.history.goBack()
}

render(){

    if (this.props.isLoggedIn === true) {
        this.goBackHandle()
  }

// just for fake User login

	return(
    <div id="login-wrap" className="jumbo-back-all">

    <div className="gps-out-wrap small-gone">
        <div className="gps-arrow-wrap"> 
          <img src={CloseV} className="event-close-corner" onClick={this.goBackHandle} />
        </div>
      </div>

       <Grid id="grid-login" >

            <img src={CloseV} className="event-close-corner" id="close-cross" onClick={this.goBackHandle} />

            <Row id="Row0-login" >
              <Col id="col-row0-login" xs={12} md={12} >
                <h1>Login</h1>
                <p onClick={this.handleFakeUser}>with</p>
                <Facebook setUserFce={this.props.setUserFce} />
                <Google setUserFce={this.props.setUserFce} />
                <Button className="btn-fake-albert hideIt" onClick={this.handleFakeUser}>Fake user Albert </Button>
              </Col>
            </Row>
          </Grid>
      </div>
		)
  }
}

export default withRouter(Login)

    // <Row >
    //   <Nav isLoggedIn={this.props.isLoggedIn} picture={this.props.picture} />
    // </Row>
