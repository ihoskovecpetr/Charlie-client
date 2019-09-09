import React, { Component } from 'react';
import { Grid, Row, Col, Button, Image, Jumbotron, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import _ from 'lodash';
import classnames from 'classnames';
import dateFormat from'dateformat';
import StarRatingComponent from 'react-star-rating-component';


import './user.css'
//import UserAttend from './user-attend'
//import Social from './social'
import Footer from './footer'
import Nav from './nav'
//import StatsAdmin from './user-components/stats-admin'
import EventCard from './event-card'

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
var SpinnerV = 'https://res.cloudinary.com/party-images-app/image/upload/v1558013750/f6miqwq5hs4ipee43rbj.png'


var arrEvents = []
var arrHostedEvents = [ '' ]
var arrHostEventsFuture = []

var uniqueId = []


var prevV = 100;
var evaluating = false;

export default class User extends Component {


    constructor(props) {
    super(props);
    this.state = {
      userDetails: null,
      rerender: false,
      eventsAtd: true,
      eventsHst: false,
      attEventsState: null,
      arrHostedState: null,
      }
  }

  componentDidMount(){

      if (this.props.isLoggedIn) {
        //this.fetchUserInfo()
        this.fetchEventsHosting()
      }
      this.countRating()
      //window.addEventListener('scroll', this.props.handleScroll, true);
      this.sortAttendingEvents()

    }

  componentWillUnmount() {
    //window.removeEventListener('scroll', this.props.handleScroll, true)
  }



sortAttendingEvents = () => {

  var AttendingEvents = []

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
    this.setState({attEventsState: AttendingEvents})

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
            userEmail: this.props.email, 
          }),
            }).then(res => res.json())
        .then(hosted => {
            console.log("Fetch HOSTED EVENTS#######___#######", hosted)
            //arrHostedEvents = hosted.data
             arrHostedEvents = _.sortBy(hosted.data, function(event) {
              return new Date(event.dateStart);
            }).reverse();
             this.setState({arrHostedState: arrHostedEvents})
             //this.sortAttendingEvents() //just to bring both values hosting and attending on one render
               }
              ) 
}

// fetchEventsArr = (eventsIdArr) => {

//   console.log("Fetch Events Fce Arr")
//         fetch('/events-info-array', {
//           method: 'POST',
//           mode: "same-origin",
//           headers: {
//           Accept: 'application/json',
//                   'Content-Type': 'application/json',
//                   },
//           body: JSON.stringify({
//             eventsIdArr: eventsIdArr, 
//           }),
//             }).then(res => res.json())
//         .then(eventsArr => {
//           console.log("ALL THE EVENTS /events-info-arr => ", eventsArr.data)
//            arrEvents = eventsArr.data
//            arrEvents = _.sortBy(arrEvents, function(event) {
//             return new Date(event.dateStart);
//           }).reverse();

//            arrUpEvents = eventsArr.data
//            this.setState({rerender: !this.state.rerender})

//             })
//                } 

//

switchStateEvents(value){
  console.log("FCE - switchStateEvents()")
  switch(value){
    case '2':
      this.setState({eventsAtd: true, eventsHst: false, printComments: false})
      break;
    case '3':
      this.setState({eventsAtd: false, eventsHst: true, printComments: false})
      break;
    case '4':
      this.setState({eventsAtd: false, eventsHst: false, printComments: true})
      break;

    default:
      break;
  }

}

displayDateNormal = (dateStart) => {
                var todayDate = new Date(Date.now())
              var eventDate = new Date(dateStart);

          if (todayDate < eventDate) {
              return(<p>{dateFormat(eventDate, "mmmm dS, h:MM TT")}</p>)
              }else{
                return(<p>{dateFormat(eventDate, "mmmm dS, h:MM TT")}</p>)
              }
            }

displayDate = (dateStart) => {
                var todayDate = new Date
              var eventDate = new Date(dateStart);
          if (todayDate < eventDate) {
              return(<div className="bubble green"><p>{dateFormat(eventDate, "mmmm dS, h:MM TT")}</p></div>)
              }else{
                return(<div className="bubble grey"><p className="grey">{dateFormat(eventDate, "mmmm dS, h:MM TT")}</p></div>)
              }
            }
//
topLineEvent = (dateStart, eventName) => {
            var todayDate = new Date
          var eventDate = new Date(dateStart);
      if (todayDate < eventDate) {
          return(<Col className="future-white"><h1>{eventName}</h1>
                  {this.displayDateNormal(dateStart)}
                  </Col>)
          }else{
            return(<Col className="future-grey"><h1>{eventName}</h1>
                  {this.displayDateNormal(dateStart)}
                  </Col>)
          }
        }

switchEventsRender = () => {

      if (this.state.eventsAtd) {
    return(
      <span>
        {this.renderAttendedEvents()}
        </span>
       )
  } //
  else{
      if (this.state.eventsHst) {
    return(
      <span>
        <Row id="row-navigate-events">
        </Row>
          {this.renderHostedEvents()}
      </span>
       )
    }
  }
  if (this.state.printComments) {
    console.log("TRIPPLE PRING 4")
        return(
      <span>
        <Row id="row-navigate-events">
        </Row>
          {this.printComments()}
      </span>
       )
  }
}
//

printComments = () => {
  console.log("PRINT COMMENT")

  return(
    _.map(this.props.userDetails.rating, (rating, index) => 
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

renderAttendedEvents = () => {

    console.log("ALL ACT EVNST: ", this.state.attEventsState )

      let styles = {
    // margin: '20px',
    // width: '250px',
    // height: '250px',
    backgroundColor: 'yellow',
    //backgroundImage: 'url(' + imgUrl + ')',
  };

  var youOwner = true
  if (this.state.attEventsState !== null) {

          return( _.map(this.state.attEventsState, (event, index) =>

        // if (event.event_host_email !== this.props.email) {
        //   youOwner = true
        // }  `${event.event_id}` == `${event.event_id}`
      <EventCard location={event} index={index} isLoggedIn={this.props.isLoggedIn} workingLocationGate={this.props.workingLocationGate} />     
    ))
  } else{
    return (<p>loading</p>)
  }

}

renderHostedEvents = () => {

  if (this.state.arrHostedState !== null) {
    return( _.map(this.state.arrHostedState, (event, index) => 
          <Link key={index}
                to={{
                pathname: `/event/${event._id}`,
                state: {  printAttending: true, 
                          youOwner: true, 
                          isLoggedIn: this.props.isLoggedIn,  
                           }}}>
        <Row className="row-hosted">
        {event.confirmed ? <p>CONFIRMED</p> : <p>NOT CONFIRMED</p>}
        {this.topLineEvent(event.dateStart, event.name)}

          <Col className="col-open" xs={12} md={12}>
              <Button> OPEN </Button>
          </Col>
             
        </Row> 
      </Link>
    )
  )
  } else{
    return(<p> LOADING </p>)
  }
}


// renderHostedEvents = () => {
//     return( _.map(arrHostedEvents, (event, index) => <UserAttend  event={event} 
//                                                                   index={index} 
//                                                                   email={this.props.email} 
//                                                                   user_id={this.props.user_id} 
//                                                                   reloadUserData={this.reloadUserData}
//                                                                   updatingShip={this.props.updatingShip}
//                                                                   {...this.state} 
//                                                                   />
//     )
//   )
// }

// renderModal = () => {
//     console.log("USERS _ID: user.js ", this.props.user_id)
//     console.log("arrEvents: ", arrEvents)
//       return( _.map(arrEvents, (event, index) => 
//                   
                      
//                       <p>{event.name}</p>
//                     </Link>
      
//     ))
// }

// reloadUserData = () => {
//       //this.fetchUserInfo()
//       this.props.fetchUserInfoId()
//       this.fetchEventsHosting()
// }

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

              return (<p>{count}</p>)
}

countFutureEventsB = (ArEv) => {
              var todayDate = new Date
              var count = 0
              
              console.log("Jdeme Print Future: ", ArEv)

              _.map(ArEv, (event) => {
                var eventDate = new Date(event.event_dateStart);
                if (todayDate < eventDate) {
                  count++
                }else{
                  console.log("PAST Event")
                }
              })

              return (<p>{count}</p>)
}
//
countRating = () => {
            var sum = 0;

              if (this.props.userDetails.rating && this.props.userDetails.rating.length !== 0) {
            _.map(this.props.userDetails.rating, (rating, index) => {
              sum = sum + rating.ratingCustom
            })
            console.log("RETINGY: length cislo ", this.props.userDetails.rating.length)
             console.log("user.data[0] user-card.js", this.props.userDetails)

                 var roundRating = Math.round(sum/this.props.userDetails.rating.length)
          this.setState({ creatorRatingAverage: sum/this.props.userDetails.rating.length, 
                          creatorDetails: this.props.userDetails, 
                          creatorRatingCount: this.props.userDetails.rating.length}, () => {
                             console.log("this.state.creatorRatingAverage AFTER setState", this.state.creatorRatingAverage)
                             
                          })
          }else{
            console.log("RETINGY: length 0? ", this.props.userDetails.rating)
            
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

        // <Row >
        //     <Nav isLoggedIn={this.props.isLoggedIn} picture={this.props.picture} /> 
        // </Row>
//

render(){

  console.log("RENDER user.js")

	return(
    <div id="wrap-user" className={classnames("jumbo-back-all", { 'freez': this.props.EventOrUser })}>
      <div id="nav-point-roll"></div>
   <Grid id="grid-user" >


          {this.props.isLoggedIn == true ?
            <span>
        <Row id="Row-picture" >
         <Col id="col-picture" xs={12} md={12} className="animated fadeIn">
          <div className="exit-door-wrap">
          <Link to={{ pathname: '/' }} onClick={this.props.resetUser}>
                <div id="exit-door" >LOGOUT</div>
              </Link>
          </div>
           <img src={this.props.picture}/>

           <h1>{this.props.name}</h1>
           <p>{this.props.email}</p>
           {this.returnRating()}
         </Col>
         
      

       <Col className={classnames("col-user-navi", { 'white-colour': this.state.eventsAtd })} 
            onClick={this.switchStateEvents.bind(this, "2")} 
            xs={4} md={4} >
        
        {this.state.attEventsState ? 
          <div id="future-count">
            <p>{this.countFutureEventsB(this.state.attEventsState)}</p>
          </div>
          :
          <div className='spinner-wrap'>
            <img className="loading-spinner-small" src={SpinnerV}/>
          </div>
        }
         <p>ATTENDING</p>
       </Col>


       <Col className={classnames("col-user-navi", { 'white-colour': this.state.eventsHst })} 
            onClick={this.switchStateEvents.bind(this, "3")} 
            xs={4} md={4} >
       {this.state.arrHostedState ? 
            <div id="future-count">
              <p>{this.countFutureEvents(this.state.arrHostedState)}</p>
            </div>
            :
            <div className='spinner-wrap'>
              <img className="loading-spinner-small" src={SpinnerV}/>
            </div>
            }
            
            <p>HOSTING</p>

       </Col>

      <Col  className={classnames("col-user-navi", { 'white-colour': this.state.printComments })} 
            onClick={this.switchStateEvents.bind(this, "4")}
            xs={4} md={4}>
         {this.props.userDetails !== null 
          ? 
          <div id="future-count">
          {this.props.userDetails.rating ? 
                <p>
                {this.props.userDetails.rating.length} 
                </p>
                : 
                <p>
                0
                </p>
              }
          </div>
          : 
          null
          }
         <p>Ratings</p>
       </Col>


       </Row>
        <div className="user-body-wrap">
        {this.switchEventsRender()}
        </div>
       </span>
       : 
        <Row id="row-no-logged" >
       <Link to={{ pathname: '/login' }}>
       <Col id="col-user-no-logged" xs={12} md={12} >
       <img src={NoUserV}/>
       </Col>
       </Link>
       </Row>
          }
          <Footer />
      </Grid>
    </div>
		)
}

}

