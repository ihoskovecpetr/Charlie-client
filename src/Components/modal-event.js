import React from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import {Button, Grid, Row, Col, Image, Glyphicon, Alert, Modal} from 'react-bootstrap'
import dateFormat from'dateformat';
import _ from 'lodash';
import Gallery from 'react-grid-gallery';

import './modal-event.css'
import mapSetup from './settings-export/map';
import UserButtons from './user-components/user-buttons'
import UserCard from './user-components/user-card'
import Nav from './nav'

var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var gpsArrow = 'https://res.cloudinary.com/party-images-app/image/upload/v1554871963/bfvpqsak6aqtzw1npiom.png'
  var CloseV = 'https://res.cloudinary.com/party-images-app/image/upload/v1556016923/jgslo16gy9mcrnqtbziv.png'
  var SpinnerV = 'https://res.cloudinary.com/party-images-app/image/upload/v1558013750/f6miqwq5hs4ipee43rbj.png'
  var DoneV = 'https://res.cloudinary.com/party-images-app/image/upload/v1553485009/dvnjw7htgrl3wui8kfsu.png'

  var rotateValue;
  var roundRating;
  var switchMe = true;

class ModalEvent extends React.Component {

      constructor(props) {
    super(props);
    this.state = {
      userDetails: null,
      creatorDetails: null,
      creatorRatingAverage: null,
      creatorRatingCount: null,
      sendingRequest: false,
      confirmedCancel: false,
      acceptingGuestPopup: false,
      confirmedAccept: false,
      deleting: false,
      deletingProgress: false,
      dataFetched: false,
      dataEmpty: false,
      eventData: null,
      redirectUser: false,
      isAttending: false,
      isOwner: false,
      guestToDecline: [],
      showAlertDecline: false,
      }
  }

    componentDidMount(){
        this.dataFetch()
  }

  componentWillUnmount() {
    console.log("componentWillUnmount MODAL EVENT")
  }



dataFetch(){

  console.log("NEW DATA EVENT FETCH")

        fetch('/api2/event-info', {
          method: 'POST',
          mode: "same-origin",
          headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  },
          body: JSON.stringify({
          eventId: this.props.match.params.id
          }),
            }).then(res => {
          
             if (res.status == 311) {
              window.alert("No details for this EVENT");
                this.setState({dataEmpty: true, dataFetched: true})
             } else{
              return res.json().then(eventsArr => {
           this.setState({dataFetched: true, eventData: eventsArr.data},
            () => {
              window.activeLocation_id = this.state.eventData._id
              this.getCreatorDetails()
              this.initMap()
              this.checkOwnAtt()
            }
           )
          });
         }
        }
        )
}

checkOwnAtt = () => {

  let own = false
  let attend = false

  if (this.state.eventData.creatorEmail == this.props.email) {
    console.log("checkOwnAtt - You are the OWNER!")
    own = true
  } else{
    console.log("checkOwnAtt - You are NOT the owner!")
  }

  // alreadyAttending = false
      _.map(this.state.eventData.EventGuests, (guest) => {
        console.log("guest.guest_id: ", guest)
        console.log("If podminka: ", guest.guest_id == this.props.user_id)
        if (guest.guest_id == this.props.user_id) {
          console.log("YOU are already INN")
            attend = true
        }
      })

      this.setState({ isOwner: own,
                      isAttending: attend,
                      })
}


initMap = () => {
  
  //var LandL = {lat:  this.state.upcommingEvent[0].geometry.coordinates[1], lng:  this.state.upcommingEvent[0].geometry.coordinates[0]}
    var LandL = {lat: this.state.eventData.geometry.coordinates[1], lng: this.state.eventData.geometry.coordinates[0]}
    var map = new window.google.maps.Map(document.getElementById('map-event'), {
    center: LandL,
    zoom: 12,
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeId: window.google.maps.MapTypeId.ROADMAP,
    clickableIcons: false,
    gestureHandling: 'cooperative',
    styles: mapSetup,
  });

    // var marker = new window.google.maps.Marker({
    //       map: map,
    //       //anchorPoint: new window.google.maps.Point(0, -29)
    //     });

    var urlAttend = 'https://res.cloudinary.com/party-images-app/image/upload/v1558048597/lo7digag5hz5alymniwz.png'
         
        var image = {
        url: urlAttend,
        size: new window.google.maps.Size(48, 48),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(24, 48),
        scaledSize: new window.google.maps.Size(48, 48)
      };


     var marker = new window.google.maps.Marker({
      position: {lat: this.state.eventData.geometry.coordinates[1],
                 lng: this.state.eventData.geometry.coordinates[0]}, 
      map: map,
      icon: image,
      animation: window.google.maps.Animation.DROP,
      //title: location.name,
    })

               marker.setPosition(LandL);
          marker.setVisible(true);



}

goBackHandle = () => {
  console.log("goBackHandle FCE")
   this.props.history.goBack()
}


displayAdress(){
  if (this.state.eventData.addressGoogle) {
    return(<p>{this.state.eventData.addressGoogle}</p>)
  } else{
      return( <p>{this.state.eventData.addressCustom}</p>)
  }
}
//

handleOpenMap = () => {
  var lat = this.state.eventData.geometry.coordinates[1]
  var lng = this.state.eventData.geometry.coordinates[0]
  var url = new URL("https://www.google.com/maps/search/?api=1&");
  var latLng = lat + ',' + lng
  url.searchParams.append('query', latLng);
  window.open(url, '_blank');
}

displayDateNormal = () => {
                var todayDate = new Date(Date.now())
              var eventDate = new Date(this.state.eventData.dateStart);

          if (todayDate < eventDate) {
              return(<p>{dateFormat(eventDate, "mmmm dS, h:MM TT")}</p>)
              }else{
                return(<p>{dateFormat(eventDate, "mmmm dS, h:MM TT")}</p>)
              }
            }



displayDate = () => {
                var todayDate = new Date
              var eventDate = new Date(this.state.eventData.dateStart);
          if (todayDate < eventDate) {
              return(<div className="bubble green"><p>{dateFormat(eventDate, "mmmm dS, h:MM TT")}</p></div>)
              }else{
                return(<div className="bubble grey"><p>{dateFormat(eventDate, "mmmm dS, h:MM TT")} - (PAST)</p></div>)
              }
            }
//
printGuests = () => {

    var today = new Date


        return( _.map(this.state.eventData.EventGuests , (guest, index) =>
            <React.Fragment>
                {!guest.guest_pending ? 
                      <div className="single-guest-wrap"> 
                            <Link key={index}
                              to={{
                              pathname: `/user/${guest.guest_id}`,
                              state: {  printAttending: true, 
                                        youOwner: true,  
                                         }}}>
                            <div className="modal-guest" id={index} >
                                <img src={guest.guest_photo} />
                            </div>    
                          </Link>
                          {this.state.isOwner && (new Date(this.state.eventData.dateStart) > today && guest.guest_pending == false) ?
                              <img  className="modal-guest-close-img" 
                                    src={CloseV} 
                                    onClick={this.declineGuestHandler.bind(this , this.state.eventData._id, guest.guest_email, guest.guest_id)} 
                                    />
                                :
                                null
                          }
                      </div>
                      :
                      null
                 }
            </React.Fragment>
             )
        )
}


printPending = () => {

    var today = new Date


        return( _.map(this.state.eventData.EventGuests , (guest, index) =>
                <div className="single-guest-pending-wrap"> 
                {this.state.isOwner && (new Date(this.state.eventData.dateStart) > today && guest.guest_pending == true) ?
                      <React.Fragment>
                      <p>
                          {guest.guest_name}
                        </p>    
                        //                  
                       <Link key={index}
                          to={{
                          pathname: `/user/${guest.guest_id}`,
                          state: {  printAttending: true, 
                                    youOwner: true,  
                                     }}}
                          className="modal-guest-pending" >
                        <div id={index} >
                            <img src={guest.guest_photo} />
                        </div>    
                      </Link>
                      <div className="pending-inquiry-box">
                        <p>
                          {guest.guest_inquiry}
                        </p>
                      </div>
                      <div className="social-profiles">
                        <Link key={index}
                          to={{
                          pathname: `/user/${guest.guest_id}`,
                          state: {  printAttending: true, 
                                    youOwner: true,  
                                     }}}>
                          <p>profile</p>  
                        </Link>
                      </div>
                      <div className="pending-buttons">
                      <Button  
                              bsStyle="info"
                              onClick={this.acceptGuest.bind(this, guest.guest_id, guest.guest_email, guest.guest_name)} >
                           <Glyphicon className="glyphicon glyphicon-ok" />  Accept 
                      </Button> 
                      <Button  
                              bsStyle="danger"
                              onClick={this.declineGuestHandler.bind(this , this.state.eventData._id, guest.guest_email, guest.guest_id)} >
                           <Glyphicon className="glyphicon glyphicon-remove" />  Decline         
                      </Button>         
                      </div>
                      </React.Fragment>
                      :
                      null
                    }
                </div>  //
             )
        )
}

acceptGuest = (guest_id, guest_email, guest_name) => {


    this.setState({acceptingGuestPopup: !this.state.acceptingGuestPopup})


  console.log('FIRING -- acceptGuest')

      fetch('/api2/accept-guest', {
          method: 'POST',
          mode: "same-origin",
          headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  },
          body: JSON.stringify({
            eventId: this.state.eventData._id,
            eventName: this.state.eventData.name,
            guest_id: guest_id,
          }),
            }).then(res => {
              console.log("sendAccessGranted: ", res)
              if (res.status == 200) {
                console.log("res.status OK")
                    this.sendAccessGranted(guest_email, guest_name)

                this.setState({acceptingGuestPopup: false }, () => {
                  this.dataFetch()
                  this.props.fetchUserInfoId()
                })
              } else(
                  alert("Something went wrong, try again")
                )
              return res.json()
            })
}

//

 sendAccessGranted = (guest_email, guest_name) => {
          fetch('/mail/access-granted', {
          method: 'POST',
          mode: "same-origin",
          headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  },
          body: JSON.stringify({
            guest_email: guest_email,
            guest_name: guest_name,
            event_name: this.state.eventData.name,
            creatorEmail: this.state.eventData.creatorEmail,
            event: this.state.eventData,
          }),
            }).then((res) => {
              console.log("RESPONSE EMAIL: " , res)
              console.log("res.RESPONSE: " , res.status)
              if (res.status == 200) {
                //alert('inquiry has been successfully sent to host')
              } else{
                alert('soething went wrong while sending email')
              }
        })
 }



cancelAttending = () =>{

           fetch('/api2/cancel-guest', {
          method: 'POST',
          mode: "same-origin",
          headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  },
          body: JSON.stringify({
            eventId: this.state.eventData._id,
            userEmail: this.props.email, 
            user_id: this.props.user_id
          }),
            }).then(res => res.json())
        .then(user => {

                     setTimeout( () => {
            this.setState({redirectUser: true}) }, 3000)
          

            this.setState({userDetails: user.data }, () => {
              this.handleSendingRequest() //start animation rolling
              this.props.fetchUserInfoId()
            })
          }) 
}

declineGuestHandler(eventId, userEmail, user_id){
  this.setState({guestToDecline: [eventId, userEmail, user_id],
                  showAlertDecline: true})
}

closeOpenAlertDecline = () =>{
  this.setState({showAlertDecline: !this.state.showAlertDecline})
}

closeOpenAlertAccepting = () =>{
  this.setState({acceptingGuestPopup: !this.state.acceptingGuestPopup})
  this.dataFetch()
  //this.props.fetchUserInfoId()
}

declineGuest = () =>{

  console.log("declineGuest FCE")

           fetch('/api2/cancel-guest', {
          method: 'POST',
          mode: "same-origin",
          headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  },
          body: JSON.stringify({
            eventId: this.state.guestToDecline[0],
            userEmail: this.state.guestToDecline[1], 
            user_id: this.state.guestToDecline[2]
          }),
            }).then(res => res.json())
        .then(user => {
          
           // setTimeout( () => {
           //  this.props.history.push('/' , {justGoBack: true })
           //  }, 3000)

            this.setState({userDetails: user.data, }, () => {
              //this.handleSendingRequest() //start animation rolling
              //this.props.fetchUserInfoId()
              this.dataFetch()
              this.props.fetchUserInfoId()
              this.closeOpenAlertDecline()
            })
               }) 
}

handleSendingRequest = () => {
    this.setState({sendingRequest: !this.state.sendingRequest})
    if (this.state.confirmedCancel) {
      setTimeout( () => {
          this.setState({confirmedCancel: !this.state.confirmedCancel}) }, 2000)
    }else{
         this.setState({confirmedCancel: !this.state.confirmedCancel})
    }
  }



getCreatorDetails = () => {
        fetch('/user-info', {
          method: 'POST',
          mode: "same-origin",
          headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  },
          body: JSON.stringify({
            userEmail: this.state.eventData.creatorEmail, 
          }),
            }).then(res => res.json())
        .then(user => {
        
              var sum = 0;
              //counting final rating out of fetched data
              if (user.data[0] !== null) {
            _.map(user.data[0].rating, (rating, index) => {
              sum = sum + rating.ratingCustom
            })

              
                  //travsfer fetched data and counted average into state
          this.setState({ creatorRatingAverage: sum/user.data[0].rating.length, 
                          creatorDetails: user.data[0], 
                          creatorRatingCount: user.data[0].rating.length}, () => {
                              })
          }
      
      }) 
}

sendRating = (rating, ratingComment, guestName, guestPicture) => {
             fetch('/api2/rating', {
          method: 'POST',
          mode: "same-origin",
          headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  },
          body: JSON.stringify({
            creatorId: this.state.creatorDetails._id, 
            guestId: this.props.user_id,
            guestName: guestName,
            guestPicture: guestPicture,
            eventId: this.state.eventData._id,
            rating: rating,
            ratingComment: ratingComment,
          }),
            }).then(res => res.json())
              .then(data => {
                console.log("Rated!", data)
                this.getCreatorDetails()
                this.dataFetch()
               }) 
}

handleCloseDeleting = () => {
  this.setState({deleting: !this.state.deleting})
}

closeDeletingLater = () => {
  setTimeout( () => { this.setState({deleting: false})}, 3000 )
}

deleteEvent = (eventIdToDelete) => {

  this.setState({deleting: true, deletingProgress: true})

      fetch('/delete-event', {
                  method: 'POST',
                  mode: "same-origin",
                  headers: {
                  Accept: 'application/json',
                          'Content-Type': 'application/json',
                          },
          body: JSON.stringify({
            eventId: this.state.eventData._id,
            userEmail: this.props.email, 
            user_id: this.props.user_id
          }),
            }).then(res => res.json())
        .then(resp => {
            console.log("Claaback Event DELETED - response", resp.data)
            if (resp.data.ok == 1) {
              console.log("SUCCESS: 1?: ", resp.data.ok)
              this.setState({deletingProgress: false})
              this.closeDeletingLater()
            } else{
              console.log("unsuccessfull deleting: ", resp.data.ok)
              }
              setTimeout( () => {
              this.setState({redirectUser: true}) }, 2000) 

              //this.props.fetchUserInfoId()
          }) 
}

// canYouRate = () => {

//   var todayDate = new Date()
//   var eventDate = new Date(this.state.eventData.dateStart);

//   if (todayDate > eventDate) {
//   var voted = false
//   if (this.state.eventData.creatorEmail !== this.props.email) {
//         if (this.state.creatorDetails !== null) {
//             _.map(this.state.creatorDetails.rating, (ratingSeshion, index) => {
//              if (ratingSeshion.guestId == this.props.user_id && ratingSeshion.ratedEventId == this.state.eventData._id) {
//               console.log("YOU ALREADY RATED THIS IN THE PAST event: " , this.state.eventData.name)
//               voted = true
//             } else{
//               console.log("NOT RATED YET")
//             }
//           })

//         if (voted) {
//           return <p> Rating has been sent</p>
//         } else{
//           return <p> You can rate this past event</p>
//          }
//         } else{
//           return <p> No info yet </p>
//           }
//         }else{
//           return <p>You are host of this event</p>
//         }
//    } 
//   else{
//     return <p> Upcomming event (No rating yet) </p>
//   }
// }
//

countAttendance = () => {
  var ConfirmedGuests = 0
  _.map(this.state.eventData.EventGuests , (guest, index) =>{
    if (guest.guest_confirmed) {
      ConfirmedGuests = ConfirmedGuests + 1
    }
  })
return (<React.Fragment>{ConfirmedGuests} / {this.state.eventData.capacityMax}</React.Fragment>)
}

//

handleUpdatingShip = () => {
  console.log("LAUNGE - handleUpdatingShip")
    this.props.updatingShip(this.state.eventData)
    //this.goBackHandle()
}


render() {

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh2', `${vh}px`);

  // if (document.getElementById('close-cross')) {
  //    document.getElementById('close-cross').addEventListener('click', alert("Event listener click"));
  // }


 console.log("MODAL EVENT loc.props.state", this.props)

roundRating = Math.round(this.state.creatorRatingAverage)

      if (this.state.redirectUser === true) {
    //return(<Redirect to='/' />) 
    var string = '/map'
  console.log("correct string: ", string)
  this.props.history.push(string)
  }


  return (
    <Grid id="grid-modal-event">
    <div className="no-size">
          <img src={CloseV} className="event-close-corner" onClick={this.goBackHandle} />
    </div>

   {(this.state.dataFetched && !this.state.dataEmpty) ? 
    <Row className="user-event-list-row">

          <div className="bottom-line-modal">

          {this.props.isLoggedIn ?
                  <UserButtons  {...this.props} 
                                {...this.state}
                                cancelAttending={this.cancelAttending} 
                                handleSendingRequest={this.handleSendingRequest}
                                sendRating={this.sendRating}
                                dataFetch={this.dataFetch} 
                                deleteEvent={this.deleteEvent}
                                handleCloseDeleting={this.handleCloseDeleting}
                                fetchUserInfoId={this.props.fetchUserInfoId}
                                />
                    :
                    <Link to={{ pathname: '/map'}}>
                    <Col className="col-user-buttons" xs={12} md={12}>
                      <Button className="btn-alone" bsStyle="info" >
   
                           OPEN Event in App
                        
                      </Button>
                      </Col>
                    </Link>
            }
                </div>

        <div className="modal-top-line">
              <Link  to={{  pathname: `/`,
                          state: {  justGoBack: true
                                     }}}>
                    <img src={CloseV} className="event-close-corner" id="close-cross"/>
              </Link>
        </div>

       <div className="out-wrap">


        <Col className="event-name-full" xs={12} md={12}>
            <p>{this.state.eventData.name}</p>
        </Col>

        <Col className="right-col" xs={12} md={12}>
            <p>{this.state.eventData.description}</p>
        </Col>

        <Col className="right-col modal-gallery" xs={12} md={12} >
          <div>
            {switchMe ? <Gallery images={this.state.eventData.imagesArr} rowHeight={100} backdropClosesModal={true} /> : <span> </span>}
            {!switchMe ? <Gallery images={this.state.eventData.imagesArr} rowHeight={100} backdropClosesModal={true} /> : <span> </span>}
          </div>
        </Col>

        <Col className="left-col" xs={12} md={12}>
            <p>DATE</p>
        </Col>
        <Col className="right-col" xs={12} md={12}>
             <p>{this.displayDate(this.state.eventData.dateStart)}</p>
        </Col>

        <Col className="left-col" xs={12} md={12}>
            <p>BYO</p>
            <p>(Guests can bring their own drink/snack)</p>
        </Col>
        <Col className="right-col" xs={12} md={12}>
            {this.state.eventData.BYO ? <p>YES</p> : <p>NO</p>}
        </Col>
        

         <Col className="left-col" xs={12} md={12}>
            <p>FEE</p>
        </Col>
        <Col className="right-col" xs={12} md={12}>
            <p>{this.state.eventData.price} $</p>
        </Col>

     
        <Col className="left-col" xs={12} md={12}>

            <p>ATTENDEES ({this.countAttendance()})</p>    
        </Col>

        <Col className="right-col" xs={12} md={12}>
            <div className="guests-wrap">

            <div className="modal-guest-wraper">
            {this.printGuests()}
            </div>
            </div>
        </Col>

        {this.state.isOwner ? 
        <React.Fragment>
          <Col className="left-col" xs={12} md={12}>
            <p>PENDING</p>    
          </Col>
          <Col className="right-col" xs={12} md={12}>
              <div className="guests-pending-wrap">
              
              {this.printPending()}
              
              </div>
          </Col>
        </React.Fragment>
        :
        null
        }

        <Col className="left-col" xs={12} md={12}>
            <p>HOST</p>
        </Col>

        <Link
          to={{
          pathname: `/user/${this.state.eventData.creator_id}`,
          state: {  printAttending: true, 
                    youOwner: true, 
                    isLoggedIn: this.props.isLoggedIn 
                     }}}>
            <UserCard creatorEmail={this.state.eventData.creatorEmail}  />
        </Link>

        <Col className="left-col" xs={12} md={12}>
            <p>MAP</p>
        </Col>
        <div id="map-event"></div>
        <img src={gpsArrow} className="gps-arrow white-arr" onClick={this.handleOpenMap} />


        <Col className="left-col" xs={12} md={12}>
            <p>ADDRESS</p>
        </Col>
        
        <Col className="right-col" xs={12} md={12} onClick={this.handleOpenMap}>
            <div id="address-user-attend">
              {this.displayAdress()}
            </div>
        </Col>
        <Col className="col-empty-space" xs={12} md={12}>
        </Col>
      </div> 
    </Row>
    :
    <Row className="user-event-list-row">
        <div className="modal-top-line">
              <Link  to={{  pathname: `/`,
                          state: {  justGoBack: true
                                     }}}>
                    <img src={CloseV} className="event-close-corner" id="close-cross"/>
              </Link>
        </div>
      <div className="out-wrap">

        <Col className="left-col" xs={12} md={12}>
            <p> </p>
        </Col>

        <Col className="event-name-full" xs={12} md={12}>
           <p>Waiting for data...</p>
          <img className="loading-spinner-modal" src={SpinnerV}/>
        </Col>
      </div>
    </Row>
    }

        <Modal show={this.state.showAlertDecline} onHide={this.closeOpenAlertDecline}>
                      <Alert className="alert-decline" show={true} bsStyle="danger">
                        <h1>Cancel booking of this guest</h1>

                                <div className="decline-conf-btn" >
                                 <Button bsStyle="success" onClick={this.declineGuest} ><Glyphicon className="glyphicon glyphicon-ok" /> CONFIRM</Button>
                                 <Button bsStyle="alert" onClick={this.closeOpenAlertDecline} >CANCEL</Button>
                                </div>             
                      </Alert>
      </Modal>

        <Modal show={this.state.acceptingGuestPopup} >
              <Alert bsStyle="info">
                  <div className="dismis-btn-actions" >
                  <Button onClick={this.closeOpenAlertAccepting} bsStyle="outline-success">
                  Close
                </Button>
                  </div>
                  {this.state.acceptingGuestPopup ? 
                    <p>
                    Accepting... from modal
                       <div className="send-mail-wrap">
                          <img className="send-mail-stopped" src={DoneV} />
                       </div>
                    </p>
                    :
                    <p>
                    Accepted
                       <div className="send-mail-wrap">
                          <img className="send-mail" src={DoneV} />
                       </div>
                    </p>
                  }
              </Alert >
          </Modal>

    </Grid>
  );
  }
}

export default withRouter(ModalEvent)


