import React, { Component } from 'react';
import {Grid, Row, Col, Button, Image, Jumbotron, Glyphicon } from 'react-bootstrap'
import { Link, Redirect, withRouter } from 'react-router-dom'
import _ from 'lodash';
import classnames from 'classnames';
import dateFormat from'dateformat';
import StarRatingComponent from 'react-star-rating-component';

import './user-id.css'
//import UserAttend from './user-attend'
import Nav from './nav'
import StatsAdmin from './user-components/stats-admin'

//import NoUser from '../img/no-user.png'
//import ArrowBack from '../img/arrow-back-white.png'
//import Logout from '../img/logout-white.png'
import Plus from '../img/plus.png'

var PlusV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552298084/trbnespstinargzzisiz.png'
var LogoutV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109082/wppzchkheymdrdsnifo5.png'
var ArrowBackV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552106126/wqep6jsjtodqrxuehlhy.png'
var NoUserV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109083/xyty8m0wsw6rxfmgeur7.png'
var FullScreenV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552298039/hbp7tyn9elerehse8fci.png'
var FutureCheckV = 'https://res.cloudinary.com/party-images-app/image/upload/v1555567287/op8emtoe2xdi7ab8e4ag.png'
var PastCheckV = 'https://res.cloudinary.com/party-images-app/image/upload/v1555569544/wi89seij7qtukggaf5yy.png'

var CloseV = 'https://res.cloudinary.com/party-images-app/image/upload/v1556016923/jgslo16gy9mcrnqtbziv.png'

var arrEvents = []
var arrHostedEvents = [ '' ]
var arrHostEventsFuture = []

var uniqueId = []


var AttendingEvents = []

var prevV = 100;
var evaluating = false;

class UserId extends Component {


    constructor(props) {
    super(props);
    this.state = {
      userDetails: null,
      comments: true,
      eventsDisplay: true,
      userInfo: [],
      redirectMenu: false,
      evnHosted: [],
      }
  }

  componentDidMount(){

    this.fetchUserInfo()
    window.addEventListener('scroll', this.props.handleScroll, true);
    }

  componentWillUnmount() {
     arrHostedEvents = [ '' ]
    window.removeEventListener('scroll', this.props.handleScroll, true)
  }


sortAttendingEvents = () => {
  console.log("sortAttendingEvents: ", this.props.userDetails.attendedEventId)
    _.map(this.props.userDetails.attendedEventId, (evnt, inx) => {
      if (evnt.event_guestCancelled || evnt.event_hostDeleted) {
          console.log("NOT Activ evnt")
          console.log(evnt.event_guestCancelled, evnt.event_hostDeleted)

          //count FUTURE Events
          if (evnt.event_dateStart ) {}
         
      } else {
          console.log("ACTIVE evnt")
          AttendingEvents.push(evnt)
          console.log(evnt.event_guestCancelled, evnt.event_hostDeleted)
      }
    }
    )



console.log("ACTIVE ATT EVENTS: ", AttendingEvents)

AttendingEvents = _.sortBy(AttendingEvents, function(event) {
              return new Date(event.event_dateStart);
            }).reverse()

console.log("ACTIVE ATT EVENTS sorter DATE: ", AttendingEvents)



}




fetchUserInfo= () => {
  console.log("fetchUserInfo FCE!!! start: ", this.props.match.params.id)
        fetch('/api2/user-info-id', {
          method: 'POST',
          mode: "same-origin",
          headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  },
          body: JSON.stringify({
            user_id: this.props.match.params.id, 
          }),
            }).then(res => res.json())
        .then(userInfo => {
                console.log("Fetch UserInfo#######___#######", userInfo)
                this.setState({userInfo: userInfo.data[0]}, () => {
                  this.fetchEventsHosting()
                  this.countRating()
                })
               }
              ) 
}

fetchEventsHosting= () => {
        fetch('/user-hosted', {
          method: 'POST',
          mode: "same-origin",
          headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  },
          body: JSON.stringify({
            userEmail: this.state.userInfo.userEmail, 
          }),
            }).then(res => res.json())
        .then(hosted => {
            console.log("Fetch HOSTED EVENTS#######___#######", hosted)
            arrHostedEvents = hosted.data
             arrHostedEvents = _.sortBy(arrHostedEvents, function(event) {
              return new Date(event.dateStart);
            }).reverse();
              this.setState({evnHosted: arrHostedEvents})
               }
              ) 
}

countFutureEvents = (ArEv) => {
              var todayDate = new Date
              var count = 0
              
              console.log("Jdeme Print Future: ", ArEv)

              _.map(ArEv, (event) => {
                var eventDate = new Date(event.dateStart);
                if (todayDate < eventDate) {
                  count++
                }else{
                  console.log("PAST Event")
                }
              })

              return (<i>{count}</i>)
}

switchStateEvents(value){
  switch(value){
    case '2':
      this.setState({comments: true, eventsDisplay: false})
      break;
    case '3':
      this.setState({comments: false, eventsDisplay: true})
      break;

    default:
      break;
  }

}

displayDateNormal = (dateStart) => {

  if (dateStart) {
                var todayDate = new Date(Date.now())
              var eventDate = new Date(dateStart);

          if (todayDate < eventDate) {
              return(<p>{dateFormat(eventDate, "mmmm dS, h:MM TT")}</p>)
              }else{
                return(<p>{dateFormat(eventDate, "mmmm dS, h:MM TT")}</p>)
                }
              }
            }

displayDate = (dateStart) => {
  if (dateStart) {
              var todayDate = new Date
              var eventDate = new Date(dateStart);
              if (todayDate < eventDate) {
                    return(<div className="bubble green">
                              <p>{dateFormat(eventDate, "mmmm dS, h:MM TT")}
                              </p>
                            </div>)
              }else{
                return(<div className="bubble grey">
                            <p className="grey">
                                {dateFormat(eventDate, "mmmm dS, h:MM TT")}
                            </p>
                       </div>)
              }
  }
            }
//
topLineEvent = (dateStart, eventName) => {
            var todayDate = new Date
          var eventDate = new Date(dateStart);
      if (todayDate < eventDate) {
          return(<Col className="future-green"><h1>{eventName}</h1></Col>)
          }else{
            return(<Col className="future-grey"><h1>{eventName}</h1></Col>)
          }
        }

//

printComments = () => {
  console.log("this.state.userInfo.rating: ", this.state.userInfo.rating)
  return( _.map(this.state.userInfo.rating, (rating, index) => 
    <div className="single-comment">
    <div className="single-comment-left">
    <img className="userid-guest-img" src={rating.guestPicture} />
    <div className="triangle"></div>
    </div>
    <div className="single-comment-right">
    <div className="single-comment-right-top">
    <p>{rating.guestName}</p>
    <StarRatingComponent
                  name={String} /* name of the radio input, it is required */
                  value={rating.ratingCustom} /* number of selected icon (`0` - none, `1` - first) */
                  starCount={5} /* number of icons in rating, default `5` */
                  starColor={"#FDDC27"} /* color of selected icons, default `#ffb400` */
                  emptyStarColor={"#999"} /* color of non-selected icons, default `#333` */
                  editing={true} /* is component available for editing, default `true` */
              />
      </div>
      <p>{rating.ratingComment} </p>
        </div>
      </div>
  )
  )

}

      // <Link key={index}
      //           to={{
      //           pathname: `/event/${event._id}`,
      //           state: {  printAttending: true, 
      //                     youOwner: true, 
      //                     isLoggedIn: this.props.isLoggedIn, 
      //                      }}}>
      //  </Link>


printHostedEvents = () => {
    return( _.map(this.state.evnHosted, (event, index) => 

        <div className="single-event-wrap">
            {this.topLineEvent(event.dateStart, event.name)
            }
          <Col className="left-col" xs={4} md={4}>
              <p>DATE</p>
          </Col>
          <Col className="col-right-user-id" xs={8} md={8}>
            <div className="user-id-bubble">
               {this.displayDateNormal(event.dateStart)}
            </div>
          </Col>
            </div>

    )
  )
}

countRating = () => {
            var sum = 0;

              if (this.state.userInfo.rating && this.state.userInfo.rating.length !== 0) {
            _.map(this.state.userInfo.rating, (rating, index) => {
              sum = sum + rating.ratingCustom
            })
            console.log("RETINGY: length cislo ", this.state.userInfo.rating.length)
             console.log("user.data[0] user-card.js", this.state.userInfo)

                 var roundRating = Math.round(sum/this.state.userInfo.rating.length)
          this.setState({ creatorRatingAverage: sum/this.state.userInfo.rating.length, 
                          creatorDetails: this.state.userInfo, 
                          creatorRatingCount: this.state.userInfo.rating.length}, () => {
                             console.log("this.state.creatorRatingAverage AFTER setState", this.state.creatorRatingAverage)
                             
                          })
          }else{
            console.log("RETINGY: length 0? ", this.state.userInfo.rating)
            
            roundRating = 0
                      this.setState({ creatorRatingAverage: 0,  
                                      creatorRatingCount: 0}, () => {
                             
                          })
          }
}

returnRating = () => {
             
  return(
        <div id="star-rating-stars">
          <StarRatingComponent
              name={String} /* name of the radio input, it is required */
              value={this.state.creatorRatingAverage} /* number of selected icon (`0` - none, `1` - first) */
              starCount={5} /* number of icons in rating, default `5` */
              starColor={"#FDDC27"} /* color of selected icons, default `#ffb400` */
              emptyStarColor={"#999"} /* color of non-selected icons, default `#333` */
              editing={true} /* is component available for editing, default `true` */
          />
        </div> 
    )
}


goBackHandle = () => {

    if (this.props.history) {
      //this.props.history.push('/' , {justGoBack: true })
      this.props.history.goBack()
    } else{
    if (window.AppHistory) {
      window.AppHistory.goBack()
      } else{
        this.setState({redirectMenu: true})
    }
    
  }

}

render(){

  console.log("USER:ID this.props: ", this.props)


  if (this.state.redirectMenu === true) {
    alert("HARD REDIRECT")
    return(<Redirect to={{
                      pathname: `/`,
                      state: {  printAttending: true, 
                                youOwner: true, 
                                isLoggedIn: this.props.isLoggedIn, 
                                 }}} />) 
  }

      let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh3', `${vh}px`);

  console.log("RENDER user.js: ", this)
AttendingEvents = []
this.sortAttendingEvents()

	return(
 
   <Grid id="grid-user-id" >
     <div className="no-size">

       <img src={CloseV} className="event-close-corner" onClick={this.goBackHandle} />
      </div>

       <div id="nav-point-roll"></div>
       <div className="wrap-big-user-id">
            <div className="close-user-id-wrap">   
              <img src={CloseV} className="event-close-corner" onClick={this.goBackHandle} />
              <p>{this.state.userInfo.userName}</p>
            </div>
            <div className="wrap-user-id">
          <Row id="Row-picture-id" >
           {this.state.userInfo.length == 0 ?
            <Col id="userid-col-picture" xs={12} md={12} className="">
              <h1> Loading... </h1>
            </Col>
            :
            <span>
            <Col id="userid-col-picture" xs={12} md={12} className="">
                 <img src={this.state.userInfo.userPicture}/>
                 <p>{this.state.userInfo.userEmail}</p>
                  {this.returnRating()}
            </Col>


               <Col  xs={6} md={6} >
               {arrHostedEvents[0] !== '' ? 
                <button  className={classnames("user-id-rounded-buttons",{ 'active-button': this.state.eventsDisplay })} 
                      onClick={this.switchStateEvents.bind(this, "3")}>
                    <div className="user-id-future-count">
                      <p>{this.countFutureEvents(arrHostedEvents)}</p>
                    </div>
                    Events {arrHostedEvents.length} 
                   </button>
                  :
                 <button className="user-id-rounded-buttons">
                    Loading...   <Glyphicon className="loading-arrow" glyph="glyphicon glyphicon-repeat" />
                 </button>
                }
                </Col>

              <Col xs={6} md={6}>
                <button  className={classnames("user-id-rounded-buttons",{ 'active-button': this.state.comments })}  
                      onClick={this.switchStateEvents.bind(this, "2")}>
                   Comments
                </button>
               </Col>
                </span>
              }

            </Row>
            {this.state.comments ?
            <Row className="row-comments">
              <Col className="userid-events-nadpis" xs={12} md={12}>
                Comments & Rating
              </Col>
                {this.printComments()}
            </Row>
            :
            <span>
            </span>
            }

            {this.state.eventsDisplay ?
              <span>
            <Row className="row-user-id-events">
              <Col className="userid-events-nadpis" xs={12} md={12}>
               Events created by {this.state.userInfo.userName}
              </Col>
            </Row>
            <Row className="row-events-body" >
              {this.printHostedEvents()}
            </Row>
            </span>
            :
            <Row className="row-user-id-events">
              <Col className="userid-events-nadpis" xs={12} md={12}>
              
              </Col>
            </Row>
            }
 
          </div>
        </div>
    </Grid>
		)
}

}

export default withRouter(UserId)

