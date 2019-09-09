import React, { Component } from 'react';
import {Grid, Row, Col, Button, Image, Jumbotron, Glyphicon, Carousel, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './menu.css'
import classnames from 'classnames'
import VideoCover from 'react-video-cover'

import Nav from './nav';
import MenuNextEvent from './menu/menu-next-event';
import Footer from './footer';
import UpcomingEvents from './menu/upcoming-events';

//import Social from './social';

//import CoverIntro from './cover-intro';

//import Divide from '../img/divide-design.png'
//import Instagram from '../img/instagram-icon.png'
//import Facebook from '../img/facebook-icon.png'
//import Youtube from '../img/youtube-icon.png'
//import VideoFake from '../img/video-fake.png'
//import NoUser from '../img/no-user-white.png'
//import Map from '../img/map-white.png'
//import Slide1 from '../img/slide1.png'
//import Slide2 from '../img/slide2.png'
//import Slide3 from '../img/slide3.png'
//import Slide4 from '../img/slide4.png'
//import YellowMarker from '../img/yellow-marker.png'
//import FullScreen from '../img/full-screen.png'
//import Plus from '../img/plus.png'


  //var PlusV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552298084/trbnespstinargzzisiz.png'
  //var FullScreenV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552298039/hbp7tyn9elerehse8fci.png'
  var NoUserBlackV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552431068/ydaysd8jbztc8jsgxoy5.png'
  var DivideV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109082/lfqkm8uqrzjme4nleago.png'
  var InstagramV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109082/wtr8blfjbhm4gqdsxlj0.png'
  var FacebookV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109082/kggc0uztnyow0l9tnzk3.png'
  var YoutubeV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109084/nffxrc9xgm1mbpmrsgse.png'
  var VideoFakeV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109084/b9ehcxar798vkmpztli5.png'
  var MapV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109082/ftt7xrix8nwxlcbfu3xd.png'
  var Slide1V = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109084/mvhifir6avwrersogiov.png'
  var Slide2V = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109084/kif6z7znemsn8uh7ovr2.png'
  var Slide3V = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109084/fbfbdfo8eiuowxmko7dd.png'
  var Slide4V = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109084/go38nslubly49jdagxyk.png'
  var YellowMarkerV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552424974/edmnntz0djycbbmornbl.png'
  //var FakeMapV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552202048/bkqmwu3jmqlpsipmegzw.png'
  //var CharlieLogoV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552431642/bm09b4wncwatscw9gtdg.png'
  //var PhoneLogoV = 'https://res.cloudinary.com/party-images-app/image/upload/v1553074403/lvogp5bg3yi9bhgqjicb.png'
  //var RollArrV = 'https://res.cloudinary.com/party-images-app/image/upload/v1553509401/o4qjgxqi2whjcv8ltrgt.png'
  var RandomProfileV = "https://res.cloudinary.com/party-images-app/image/upload/v1553553202/eredff7zmlr65fm3bbue.png"
  var RandomWomanV = "https://res.cloudinary.com/party-images-app/image/upload/v1553557168/cgnjfgxcbegttvftwbox.png"
  var SydViewV = 'https://res.cloudinary.com/party-images-app/image/upload/v1553554542/ixgdwwuaasm5f49cfhpb.png'
  var BbcV = 'https://res.cloudinary.com/party-images-app/image/upload/v1553554542/ukwkr5wraaezjeipbrgr.png'
  var BeerCoronaV = 'https://res.cloudinary.com/party-images-app/image/upload/v1553559427/xbugpqhcehvfatnpdrxi.png'
  var Feast1V = 'https://res.cloudinary.com/party-images-app/image/upload/v1553558709/hdyqsmvfmye0abxbmo6v.png'
  var Feast2V = 'https://res.cloudinary.com/party-images-app/image/upload/v1553558710/kuh7whsezyjnbbtlphg2.png'
  var Feast3V = 'https://res.cloudinary.com/party-images-app/image/upload/v1553558710/fh4mqii1zzgtd2sircza.png'
  var Feast4V = 'https://res.cloudinary.com/party-images-app/image/upload/v1553558712/wvnsmbwukl7jswflphli.png'
  var JackUserV = 'https://res.cloudinary.com/party-images-app/image/upload/v1555136792/qcb1xwjgfb1ozhhgmajg.jpg'
  var lux1V = 'https://res.cloudinary.com/party-images-app/image/upload/v1555137923/hp9x1b6w6hxx7ipk9nyw.png'
  var lux2V = 'https://res.cloudinary.com/party-images-app/image/upload/v1555137919/k74xwqzb3ssmh0mezqg5.png'
  var lux3V = 'https://res.cloudinary.com/party-images-app/image/upload/v1555137918/ozocoqfkuouyaomybh4u.png'
  var CharliePinkV = 'https://res.cloudinary.com/party-images-app/image/upload/v1557794256/ojkgl1hkiljwij69njbb.png'
  var DubaiCutV = 'https://res.cloudinary.com/party-images-app/image/upload/v1561628664/gwztargtbcyjjwmpz3tw.png'
  var CreateV = 'https://res.cloudinary.com/party-images-app/image/upload/v1559976554/hq5izrhpstxap5gm60lo.png'
  var SydneyLocationV = 'https://res.cloudinary.com/party-images-app/image/upload/v1559973402/xy9ekmzvknbgipnidxuu.png'
  var AnchorV = 'https://res.cloudinary.com/party-images-app/image/upload/v1559973431/cmmohs5u8ctn0a1cqwww.png'
  var AffilWristbandV = 'https://res.cloudinary.com/party-images-app/image/upload/v1560158417/lq4xb3azhfdgeik8skln.jpg'
  var AffillightV = 'https://res.cloudinary.com/party-images-app/image/upload/v1560157892/nlbncnesbe06muyuveig.jpg'
  var AffilPongV = 'https://res.cloudinary.com/party-images-app/image/upload/v1560158099/pi4jhkaipcd0nhtzggys.jpg'
  var AffiSpeakerV = 'https://res.cloudinary.com/party-images-app/image/upload/v1560240313/lmvxuwvqfcfjek5bdh0u.jpg'
export default class Menu extends Component {

    constructor(props) {
    super(props);
    this.state = {
    	ShowTriggerValue: 0,
    	ShowClicked: false,
      }
  }

  componentDidMount(){
    // var video = document.getElementById("myVideo");
    // video.play()
    console.log("componntDiMnt menu.js")
    //window.addEventListener('scroll', this.props.handleScroll, true);

  }

  componentWillUnmount() {

    //window.removeEventListener('scroll', this.props.handleScroll, true)
  }



render(){

    //   const videoOptions = {
    //   src: 'https://res.cloudinary.com/party-images-app/video/upload/v1558604987/Fireworks_Display.mp4',
    //   ref: videoRef => {
    //     this.videoRef = videoRef;
    //   },
    //   onClick: () => {
    //     if (this.videoRef && this.videoRef.paused) {
    //       this.videoRef.play();
    //     } else if (this.videoRef) {
    //       this.videoRef.pause();
    //     }
    //   },
    //   title: 'click to play/pause',
    // };

      // <div className="video-wrapper">
      //   <video playsinline='true' loop='true' autoplay='true' muted='true' id="myVideo">
      //       <source src="https://res.cloudinary.com/party-images-app/video/upload/v1558608196/fire-and-ice.mp4" type="video/mp4" />
      //     </video>
      // </div>


      // <Row id="nav-row" >
      //       <Nav isLoggedIn={this.props.isLoggedIn} picture={this.props.picture} />
      // </Row>

  console.log("Jsem v render Menu this.props")
  console.log(this)

	return(
		<div id='jumbo' className={classnames("jumbo-back-all", { 'freez': (this.props.EventOrUser || this.props.justGoBack ) })}>

   <Grid id="gridMainPage"  >

    <Row className="Row-first-0 hideThis">
    </Row>
    <Row className="Row-first-0b hideThis">
    <Col className="col-rount-top" xs={12} md={12} >
    </Col>
    </Row>





       <Row id="Row0" className="animated fadeIn" >
           <div id="nav-point-roll"></div>
           <Col id="col-row0" xs={12} md={12} >
           <div id="main-header">
           <h2>PROJECT</h2>
           <h1>CHARLIE</h1>
           </div>
           <div className="animated fadeIn delay-1s">
              <img className='main-logo' src={CharliePinkV} />
           </div>
           <div className="top-buttons">
            <div className="top-but">
              <Link to={{ pathname: '/map', state: {value: 1}}}>
                  MAP of events
              </Link>
            </div>
            <div className="top-but">
              <Link to={{ pathname: '/create'}}>
                  CREATE event
              </Link>
            </div>
            </div>
           
           </Col>
      </Row>



        <Row className="row-yellow-message hideThis">
          <Col className="col-yellow-body">
               <h1>CREATE</h1><h2> OR </h2><h1>FIND HOUSE-PARTY</h1><h2> IN </h2><h1>SYDNEY</h1>
          </Col>
        </Row>

      <Row className="row-moto">
        <Col className="col-moto" xs={12} md={12}>

                   <img src={DubaiCutV} />
                   <p>“Have you ever seen house on the beach or flat in a skyscraper and wonder how would it be to enjoy a drink in there?”</p>
        </Col>
      </Row> 


      <Row id="row-blog-sticker">
        <Col className="col-blog-sticker">
             <h1>YOUR</h1> <h2>UPCOMING</h2> <h1>EVENT</h1>
        </Col>
      </Row> 

      <MenuNextEvent name={this.props.name} 
                      isLoggedIn={this.props.isLoggedIn} 
                      email={this.props.email}
                      userDetails={this.props.userDetails}
                      workingLocationGate={this.props.workingLocationGate}
                      />

      <Row id="row-blog-sticker">
        <Col className="col-blog-sticker">
             <h1>UPCOMING</h1> <h2>EVENTS IN</h2> <h1>SYDNEY</h1>
        </Col>
      </Row> 

      <UpcomingEvents workingLocationGate={this.props.workingLocationGate}  />

      <Row id="row-blog-sticker">
        <Col className="col-blog-sticker">
              <h2>MAIN</h2> <h1> <br/>MISSION</h1>
        </Col>
      </Row>
      <Row className="row-main-mission">
        <Col className='col-main-mission-paragraph' xs={12} md={12}>
          <p>
              Charlie is here to connect owners or renters of miscelanous 
              places with guest for a joyfull evening 
          </p>
        </Col>

        <Col className='col-main-mission'  xs={12} md={12}>
          
          <p><b>Sydney, NSW Australia </b></p>
          <img src={SydneyLocationV} />
        </Col>
      </Row>


      <Row id="row-blog-sticker">
        <Col className="col-blog-sticker">
              <h2>CHARLIE</h2> <h1> <br/>INTRODUCTION</h1>
        </Col>
      </Row>

      <Row>
      <Col>
        <iframe src="https://www.youtube.com/embed/PogfNxsugF0" 
                frameborder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen></iframe>
      </Col>
      </Row>

      <Row id="row-blog-sticker">
        <Col className="col-blog-sticker">
              <h2>HOW TO</h2> <h1> <br/>CREATE PARTY</h1>
        </Col>
      </Row>

      <Row>
      <Col>
      <iframe src="https://www.youtube.com/embed/YS6urAd9oZI" 
                frameborder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen></iframe>
      </Col>
      </Row>

      <Row id="row-blog-sticker">
        <Col className="col-blog-sticker">
              <h2>HOW TO</h2> <h1> <br/>JOIN PARTY</h1>
        </Col>
      </Row>

      <Row>
      <Col>
      <iframe src="https://www.youtube.com/embed/paUA9ZxZ4MU" 
                frameborder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen></iframe>
      </Col>

      </Row>

      <Row id="row-blog-sticker">
        <Col className="col-blog-sticker">
              <h2>SUMMARY OF</h2> <h1><br/>KEY FEATURES</h1>
        </Col>
      </Row>

      <Row className='row-key-features'>
      <Link to={{ pathname: '/map'}}>
        <Col className='col-key-features' xs={12} md={12}>
        <img src={AnchorV} />
          <h1>DISCOVER</h1>
          <p> Find your favourite event in Sydney and enjoy evening</p>
          <div className="points-80-wrap">
          <ul>
            <li>JOIN event</li>
            <li>Bring your own drinks</li>
            <li>ENJOY evening</li>
          </ul>
          </div>
        </Col>
      </Link>

      <Link to={{ pathname: '/create'}}>
        <Col className='col-key-features' xs={12} md={12}>
        <img src={CreateV} />
          <h1>CREATE</h1>
          <p> Create your first CHARLIE event and start earning</p>
          <div className="points-80-wrap">
          <ul>
          <li>CREATE event</li>
          <li>Welcomme guests</li>
          <li>EARN entry fee</li>
          </ul>
          </div>
        </Col>
        </Link>
      </Row>

      <Row id="row-blog-sticker">
        <Col className="col-blog-sticker">
              <h2>CREATOR</h2>  <h1>  <br/> PACKAGE</h1>
        </Col>
      </Row>

      <Row className="row-affiliate">
        <a href='https://amzn.to/2Wp6t8N' target="_blank">
          <Col className="col-affiliate" xs={12} md={12}>
            <img src={AffilWristbandV} />
            <p>Wristbands for events</p>
          </Col>
        </a>
        <a href='https://amzn.to/2Wr3c92' target="_blank">
          <Col className="col-affiliate" xs={12} md={12}>
            <img src={AffillightV} />
            <p>Party Light</p>
          </Col>
        </a>
        <a href='https://amzn.to/2WrwODh' target="_blank">
          <Col className="col-affiliate" xs={12} md={12}>
            <img src={AffilPongV} />
            <p>Beer Pong</p>
          </Col>
        </a>
        
        <a href='https://amzn.to/2wOhLt3' target="_blank">
          <Col className="col-affiliate" xs={12} md={12}>
            <img src={AffiSpeakerV} />
            <p>Bluetooth Speaker</p>
          </Col>
        </a>

      </Row>

      <Row id="row-blog-sticker">
        <Col className="col-blog-sticker">
              <h2>CHARLIE</h2> <h1>BLOG</h1>
        </Col>
      </Row>

            <Row id="row-blog-top-name">
        <Col>
             <img id="portrait-bloger" src={RandomProfileV}/>
             <h4>Joe (31)</h4>
        </Col>
        <Col>
          <p>‘Its all about the view from my balcony’</p>
        </Col>
      </Row>

      <Row id="Row0B-carousel" className="animated fadeInRight" >
       <Col id="col-row0B" xs={12} md={12} >
       <Carousel>
          <Carousel.Item>
            <img
              className="d-block-w-100"
              src={SydViewV}
              alt="First slide"
            />
            <Carousel.Caption>

            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block-w-100"
              src={BbcV}
              alt="Third slide"
            />
            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block-w-100"
              src={BeerCoronaV}
              alt="Third slide"
            />
            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
       </Col>
      </Row>

      <Row id="row-blog-body">
        <Col>
          <p>I do have nice flat in the Sydney and I love to share this place with other people via Charlie. I do offer bbq nights twice a week and it alone can pay my rent in this beautiful place</p>
        </Col>
      </Row>

      <Row id="row-blog-sticker">
        <Col className="col-blog-sticker">
              <h2>CHARLIE</h2> <h1>BLOG</h1>
        </Col>
      </Row>

            <Row id="row-blog-top-name">
        <Col>
             <img id="portrait-bloger" src={RandomWomanV}/>
             <h4>Julie (28)</h4>
        </Col>
        <Col>
          <p>‘People like my food’</p>
        </Col>
      </Row>

      <Row id="Row0B-carousel" className="animated fadeInRight" >
       <Col id="col-row0B" xs={12} md={12} >
       <Carousel>
          <Carousel.Item>
            <img
              className="d-block-w-100"
              src={Feast1V}
              alt="First slide"
            />
            <Carousel.Caption>

            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block-w-100"
              src={Feast2V}
              alt="Third slide"
            />
            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block-w-100"
              src={Feast3V}
              alt="Third slide"
            />
            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block-w-100"
              src={Feast4V}
              alt="Third slide"
            />
            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
       </Col>
      </Row>

      <Row id="row-blog-body">
        <Col>
          <p>I do not have the best flat with view on the bay, but I know how to make delicious food which make all the guests happy and they love to come again and again.</p>
        </Col>
      </Row>


      <Row id="row-blog-sticker">
        <Col className="col-blog-sticker">
              <h2>CHARLIE</h2> <h1>BLOG</h1>
        </Col>
      </Row>

     <Row id="row-blog-top-name">
        <Col>
             <img id="portrait-bloger" src={JackUserV}/>
             <h4>Jack (44)</h4>
        </Col>
        <Col>
          <p>‘I love to share my great flat with others’</p>
        </Col>
      </Row>

      <Row id="Row0B-carousel" className="animated fadeInRight" >
       <Col id="col-row0B" xs={12} md={12} >
       <Carousel>
          <Carousel.Item>
            <img
              className="d-block-w-100"
              src={lux1V}
              alt="First slide"
            />
            <Carousel.Caption>

            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block-w-100"
              src={lux2V}
              alt="Third slide"
            />
            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block-w-100"
              src={lux3V}
              alt="Third slide"
            />
            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
       </Col>
      </Row>

      <Row id="row-blog-body">
        <Col>
          <p>Come to hang out in my flat, it is pretty neat place. I do love this energy from young people. I use it as a motivation in my life and my business.</p>
        </Col>
      </Row>

      <Row id="row-blog-sticker">
        <Col className="col-blog-sticker">
              <h1>WHAT ARE YOU </h1> <h2>WAITING FOR?</h2>
        </Col>
      </Row>
      <Row className="row-kick-action">
        <Col className="col-kick-action" xs={12} md={12}>
              <p>Take advantage of CHARLIE right NOW</p>
               <Link to={{ pathname: '/map'}}>
              <div className="large-btn pink">MAP of events</div>
              </Link>
              <Link to={{ pathname: '/create'}}>
              <div className="large-btn">CREATE event</div>
              </Link>
              <Link to={{ pathname: '/'}}>
              <div className="large-btn">become PROPERTY partner</div>
              </Link>
        </Col>
      </Row>

      <Row id="row-blog-sticker">
        <Col className="col-blog-sticker">
              <h1>CONTACT</h1> <h2>US</h2>
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

      
        <Row id="Row2" className="hideThis" >
                <Col id="col-row2" xs={12} md={12}>
            <div className="divide-design-class">
               <Image id="design-divide" src={DivideV} height='100px' />
            </div>
        </Col>
        </Row>

        <Row id="Row3" className="hideThis">
        <Image id="video-fake" src={VideoFakeV} />
        </Row>
      </Grid>

    </div>
		)
}

}
//<CoverIntro {...this.props} />
