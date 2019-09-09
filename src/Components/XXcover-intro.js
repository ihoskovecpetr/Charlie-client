import React, { Component } from 'react';
import {Grid, Row, Col, Button, Image, Jumbotron, Glyphicon } from 'react-bootstrap'
import './cover-intro.scss'
import classnames from 'classnames';

  var PlusV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552298084/trbnespstinargzzisiz.png'
  var FullScreenV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552298039/hbp7tyn9elerehse8fci.png'
  var FakeMapV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552202048/bkqmwu3jmqlpsipmegzw.png'
  var ArrowBackV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552106126/wqep6jsjtodqrxuehlhy.png'
  var ArrowRightV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552378632/rxmuq5qwbvfb8fhaqplj.png'


export default class Login extends Component {


    constructor(props) {
    super(props);
    this.state = {
          hide: false,

      }
  }

  componentDidMount(){ 

   //     document.getElementById('cover-wrap-id').ontouchmove = function(e){ 
   //      e.preventDefault(); 
   // }


  setTimeout(() => {
//document.getElementById("cover-wrap-id").classList.add("fadeOut")
this.setState({hide: true})
this.props.playIntroFceShut()
}, 11000 )
  }

  componentWillUnmount() {
    
  }

      shouldComponentUpdate(nextProps, nextState){

        console.log("shouldComponentUpdate next, this props: " , nextProps, this.props)
if (nextProps.isLoggedIn !== this.props.isLoggedIn && nextProps.isLoggedIn == true) {
          this.setState({hide: true})

}

if (nextProps.isLoggedIn !== this.props.isLoggedIn && nextProps.isLoggedIn == true) {
          this.setState({hide: true})

}

return true
}



handleHide = () =>{

  this.setState({hide: true})
  this.props.playIntroFceShut()
}

render(){

console.log("this.props from cover-intro: ", this.props)

// just for fake User login

	return(
    <span>
    {this.props.playIntro ? 
    <div id="cover-wrap-id" className={classnames("cover-wrap animated fadeIn", { 'go-away': this.state.hide })}>
   <Grid id="grid-cover" >

        <Row className="row-cover" >
        <div id="arrow-right" onClick={this.handleHide} ><img src={ArrowRightV} /></div>
          <Col className="col-cover" xs={12} md={12}>
          <p>Welcome to Charlie!</p> 
          <p>Just 2 things...</p>
          <p>Click HERE to find party's </p>
          <p>Click HERE to create party's </p>
          <p>Enjoy</p>
          </Col>
      </Row>
            <Row id="Row1" >
        <Col id="col-row1"  xs={8} md={8} >

            <div className="button-one anim" >
               <img src={FakeMapV} />
               <img src={FullScreenV} />
            </div>

        </Col>
        <Col id="col-row1-new" className="anim2" xs={4} md={4}>
        <a>
            <div className="button-two" >
               <img src={PlusV} />
            </div>
        </a>

        </Col>
      </Row>

      </Grid>
      </div>
      :
      <div id="cover-wrap-id"> </div>}
      </span>
		)
}

}

