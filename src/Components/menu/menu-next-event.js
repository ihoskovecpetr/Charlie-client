import React, { Component } from 'react';
import { Row, Col, Button, Image, Jumbotron, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import _ from 'lodash';
import dateFormat from'dateformat';
import './menu-next-event.css'
import mapSetup from '../settings-export/map';
import EventCard from '../event-card'

var SpinnerV = 'https://res.cloudinary.com/party-images-app/image/upload/v1558013750/f6miqwq5hs4ipee43rbj.png'
var upcommingEvent = null

export default class MenuNextEvent extends Component {


    constructor(props) {
    super(props);
    this.state = {
      userDetails: null,
      arrUpEvents: null,
      upcommingEvent: null,
      isLoggedIn: this.props.isLoggedIn,
      rerender: false,
      dataFetched: false,
      }
  }
  _isMounted = false

  shouldComponentUpdate(nextProps, nextState){
  console.log("shouldComponentUpdate menu-next-event.js")
  console.log("this.props.userDetails" , this.props.userDetails)
  console.log("nextProps.userDetails" , nextProps.userDetails)



  if (this.props.userDetails !== nextProps.userDetails) {
    console.log("THIS is your event, can not rate: ", this.props.name)
    //this.fetchUserInfo(nextProps.email)
    this.fetchEventsArr(nextProps.userDetails.attendedEventId)
    return true
  } else{
    return true
  }

return true

}



componentDidMount(){

  console.log("componentDidMount next ENVT ", this.props.userDetails)


  this._isMounted = true
  if (this.state.upcommingEvent !== null && this.props.isLoggedIn == true) {
  this.initMap()
}



if (this.props.userDetails) {
  console.log("componentDidMount next ENVT: if pdm..: ", this.props.userDetails)
  this.fetchEventsArr(this.props.userDetails.attendedEventId)
}
console.log("componentDidMount from nest-event.js _isMounted: ", this._isMounted)
}

  componentWillUnmount() {
  this._isMounted = false
}

//   fetchUserInfo = (email) => {
//     console.log("fetchUserInfo: email: NEXT EVENT ", email)

//       fetch('/user-info', {
//           method: 'POST',
//           mode: "same-origin",
//           headers: {
//           Accept: 'application/json',
//                   'Content-Type': 'application/json',
//                   },
//           body: JSON.stringify({
//             userEmail: email, 
//           }),
//             }).then( res => res.json()
//             // (res) => {
//             //   if (this._isMounted) {
//             //     console.log("first .then true")
//             //     return res.json()
//             //   } else{
//             //     console.log("first .then false")
//             //   }
//             // }
//             )
//         .then(user => {
//           if (this._isMounted) {
//             console.log("Fetch UserInfomenu.next-event.js", user)
//             this.setState({userDetails: user.data[0]}, () => {
//             this.fetchEventsArr(this.state.userDetails.attendedEventId)
//             })
//           }
//                }) 
// }




fetchEventsArr = (eventsIdArr) => {

  console.log("Fetch Events Fce Arr")
        fetch('/api2/events-info-array', {
          method: 'POST',
          mode: "same-origin",
          headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  },
          body: JSON.stringify({
            eventsIdArr: eventsIdArr, 
          }),
            }).then(res => res.json())
        .then(eventsArr => {
          if (this._isMounted) {
          console.log("ALL THE EVENTS /events-info-arr => ", eventsArr.data)
           var arrEvents = eventsArr.data

           // SORT Active events
          // var ActiveEvents
          // _.map(arrEvents, (event) => {
          //   if (!event.event_guestCancelled && !event.event_hostDeleted) {
          //     console.log("TOHLE JE ACTIV EVENT: ", event.event_name)
          //     ActiveEvents.push(event)
          //   }
            
          // })
           arrEvents = _.sortBy(arrEvents, function(event) {
            return new Date(event.dateStart);
          });
          console.log("arrEvents sorted 1st time", arrEvents)
          var exArr = arrEvents.filter(function(date){
            return new Date(date.dateStart) >= new Date();
          })

          if (exArr.length > 0 && this.props.isLoggedIn) { 
          console.log("callback from NEW EVENT chce setState") 
          console.log("upcommingEvent= ", exArr)
          if (true) {} 
          upcommingEvent = exArr    
           this.setState({upcommingEvent: upcommingEvent}, () => {
            this.initMap()
           })
          } else{
            this.setState({dataFetched: true})
          }

        }

            })
               } 

initMap = () => {
  console.log("initialisation of map for EVNT: ", this.state.upcommingEvent[0])

  var LandL = {lat:  this.state.upcommingEvent[0].geometry.coordinates[1], lng:  this.state.upcommingEvent[0].geometry.coordinates[0]}
    var map = new window.google.maps.Map(document.getElementById('map-next-event'), {
    center: LandL,
    zoom: 12,
    disableDefaultUI: true,
    mapTypeId: window.google.maps.MapTypeId.ROADMAP,
    clickableIcons: false,
    gestureHandling: 'none',
    styles: mapSetup,
  });

    var marker = new window.google.maps.Marker({
          map: map,
          //anchorPoint: new window.google.maps.Point(0, -29)
        });
          marker.setPosition(LandL);
          marker.setVisible(true);
}


printGuestsPhoto = () => {
  console.log("this.state.upcommingEvent[0].EventGuests.guest_photo: ", this.state.upcommingEvent[0].EventGuests)

   return( _.map(this.state.upcommingEvent[0].EventGuests, (guest, index) => 
              <img className='img-guest' src={guest.guest_photo} />  
    ))
}


render(){

console.log("RENdERING MENU-NEXT-EVENT component")
console.log("NEXT-EVENT props: ", this.props)
console.log("upcommingEvent: ", upcommingEvent)

	return(
    <React.Fragment>

          {this.props.isLoggedIn ?

              <span>{ this.state.upcommingEvent !== null ?
                <React.Fragment>
                  <EventCard location={this.state.upcommingEvent[0]} index={1} isLoggedIn={this.props.isLoggedIn} workingLocationGate={this.props.workingLocationGate} />
            
                <Link className="hideThis"
                      key={1}
                      to={{
                      pathname: `/event/${ this.state.upcommingEvent[0]._id}`,
                      state: {  printAttending: true, 
                                youOwner: false, 
                                isLoggedIn: this.props.isLoggedIn,  
                }}}>
                      <Row id="row-next-evnt" className="animated fadeIn delay-0.5s">
                        <Col id="col-next-evnt-paragraph" xs={12} md={12}>
                          
                          <p>{ this.state.upcommingEvent[0].name}</p>

                           </Col>
                            <Col className="col-left-block">
                            <p>when: </p>
                            <p>guests:</p>
                            <p>by: </p>
                            </Col>
                           { this.state.upcommingEvent !== null ?
                            <Col className="col-middle-block">
                                
                                  <div className="date-next">
                                   <p>{dateFormat(new Date( this.state.upcommingEvent[0].dateStart), "mmmm dS, h:MM TT")}</p>
                                  </div>
                                  <div className="middle-line">
                                  
                                    <div className="bottom-photos">
                                    {this.printGuestsPhoto()}
                                    </div>
                                    
                                      <p>
                                         { this.state.upcommingEvent[0].EventGuests.length} 
                                      </p>
                                    
                                  </div>
                                <div className="last-line">
                                  <p>{ this.state.upcommingEvent[0].creatorName}</p>
                                </div>
                            </Col>
                            : 
                            null
                            }
                          <Col id="col-next-evnt">
                              { this.state.upcommingEvent !== null ? 

                                <div id="map-next-event"> </div>
                              :
                          <p> loading </p>}
                          </Col>
                      </Row>
                  </Link>
                  </React.Fragment>
                  : 
                  <Row className="row-next-evnt-small" >
                        {this.state.dataFetched ?
                          <p>
                          No upcomming event
                          </p>
                        :
                        <div className="waiting-data-next">
                          <p>Waiting for Data </p>
                          <img className="loading-spinner" src={SpinnerV}/>
                        </div>
                        }
                  </Row>
                  } 
                  </span>
              : 
              <Row className="row-next-evnt-small" >
              <Link key={11}
                      to={{
                      pathname: `/login`,
                      }}>
                <Col className="col-next-message" xs={12} md={12}>
                    <p>Please Login first</p>
                </Col>
                </Link>
              </Row>
            }
    </React.Fragment>
 
		)
}

}

