import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link, Redirect } from 'react-router-dom'
import {Grid, Row, Col, Button, Image, Jumbotron, Glyphicon, Modal, Alert } from 'react-bootstrap'

import classnames from 'classnames';
import './about.css'

import Footer from './footer'

import Nav from './nav'


var ArrowBackV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552106126/wqep6jsjtodqrxuehlhy.png'
var NoUserV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109083/xyty8m0wsw6rxfmgeur7.png'
var CharlieLogoV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552431642/bm09b4wncwatscw9gtdg.png'
var EmailV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552979848/hapnjhk6atnytpeczpf7.png'


// var prevV = 100;
// var evaluating = false;

class About extends Component {


    constructor(props) {
    super(props);
    this.state = {
          textareaValid: true,
          guestEmailValid: true,
          sendingEmail: false,
          EmailSent: false,
      }
  }


  componentDidMount(){

  console.log("componentDidMount ABOUT props: ", this.props)
  //window.addEventListener('scroll', this.props.handleScroll, true);

  }

  componentWillUnmount() {
  //window.removeEventListener('scroll', this.props.handleScroll, true)
  }


  submitForm = () => {

    console.log("fce submitForm: question ", document.getElementById('form-question').value)
    console.log("fce submitForm: email ", document.getElementById('form-email').value)


this.setState({sendingEmail: true}, () => {

          fetch('/mail/postquestion', {
          method: 'POST',
          mode: "same-origin",
          headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  },
          body: JSON.stringify({
            guestEmail: document.getElementById('form-email').value,
            question: document.getElementById('form-question').value
          }),
            }).then((res) => {
              console.log("RESPONSE EMAIL: " , res)
              console.log("res.RESPONSE: " , res.status)
              if (res.status == 200) {
                  this.setState({EmailSent: true})
                setTimeout(() => { this.setState({sendingEmail: false}) }, 3000);
              }
            })

    })

  }

forceCloseEmail = () => {
  this.setState({sendingEmail: false})
}

      // <Row>
      //     <Nav isLoggedIn={this.props.isLoggedIn} picture={this.props.picture} />
      // </Row>


render(){



	return(
    <div id="about-wrap" className="jumbo-back-all">
    <div id="nav-point-roll"></div>
   <Grid className="grid-about" >

      <Row id="row-blog-sticker">
        <Col className="col-blog-sticker">
              <h2>MAIN</h2> <h1> <br/>MISSION</h1>
        </Col>
      </Row>

            <Row className="row-about-content">
              <Col className="col-content"  xs={12} md={12}>   
                  <h3>Charlie - rutine</h3>
                  <p>
                  Have you ever seen house on the beach or flat in a skyscraper and wonder how would it be to enjoy a drink in there?
                  Then this is your chance, dont go to that same old bar you know already good enought, just have a look and join some event in your neighbourhood.
                  </p>
              </Col>
            </Row>

      <Row id="row-blog-sticker">
        <Col className="col-blog-sticker">
              <h1>F.A.Q.</h1>
        </Col>
      </Row>

            <Row className="row-about-content">
              <Col className="col-content"  xs={12} md={12}>   
                  <h3>How to start?</h3>
                  <p>
                  Go to create section of Charlie, fill up short form with all the important questinos and press PREVIEW > Confirm, you will get notification on your email anytime you gained some guest. Easy! 
                  </p>
              </Col>
            </Row>

            <Row className="row-about-content">
              <Col className="col-content"  xs={12} md={12}>   
                  <h3>How to colect the admission fee?</h3>
                  <p>
                  At this stage of Charlie development you will collect fee from your guests by yourself.
                  </p>
              </Col>
            </Row>

            <Row className="row-about-content">
              <Col className="col-content"  xs={12} md={12}>   
                  <h3>Is my place good enought to host Charlie event?</h3>
                  <p>
                  It is only up to you how much time/efford/money will you invest into creating event or improving your place and how much you want to earn per each guest.. only guests will decide :)
                  </p>
              </Col>
            </Row>


      <Row id="row-blog-sticker">
        <Col className="col-blog-sticker">
              <h2>CONTACT</h2> <h1><br/>US</h1>
        </Col>
      </Row>

        <Row id="new-Row01-about" >
          <Col className="new-col-row1-name-about" xs={12} md={12} >
                 <div>
                 <p>Your email</p>
                      <input id="form-email" 
                            type="text"
                            name="form-email"
                            className='form-control' 
                            placeholder='me@email.com' />
                  </div>
          </Col>

         <Col className="new-col-row1-about" xs={12} md={12} >
         <div>
               <p>Question</p>
            <textarea id="form-question"
                      className='form-control' 
                      name='form-question' 
                      rows="4" 
                      cols="50"
                      placeholder='Hi Charlie, I would like to ask you something...'>
                      
            </textarea>
          </div>
          </Col>
      <Col id="new-col-row-launch" xs={12} md={12}>
        <Button onClick={this.submitForm} ><p> Send Question </p></Button>
      </Col>
        </Row>

        <Footer />
       
      </Grid>

        <Modal show={this.state.sendingEmail} className="" >
            <Alert bsStyle="info">
                  <div className="dismis-btn-actions" >
                  <Button onClick={this.forceCloseEmail} bsStyle="outline-success">
                  Close
                </Button>
                  </div>
                  {this.state.EmailSent ? 
                    <p>
                    done...
                       <div className="send-mail-wrap">
                          <img className="send-mail" src={EmailV} />
                       </div>
                    </p>
                       :
                    <p>
                    Sending your question...
                     <div className="send-mail-wrap">
                          <img className="send-mail-stopped" src={EmailV} />
                       </div>
                    </p>
                  }

                 
                </Alert >
                </Modal>
      </div>
		)
}

}

export default withRouter(About)

