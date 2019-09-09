import React from 'react';
import { Link } from 'react-router-dom'
import {Grid, Col, Button, Glyphicon, Image, Modal} from 'react-bootstrap';
import Gallery from 'react-grid-gallery';
import StarRatingComponent from 'react-star-rating-component';
import dateFormat from'dateformat';
import _ from 'lodash';

import './infowindow.css';
//import UserButtons from './user-components/user-buttons'
import UserCard from './user-components/user-card'

 // var CapacityLogoV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109081/rqxhxqzi4d6ncv6xqujb.png'
 // var FreeV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109082/au4m3mw2wegudtwzesbu.png'
 // var LocationV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109082/pmit1mrvcmhte9zhyi4t.png'
 // var ClockV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109081/kmvlmqqtele0hcfgtslg.png'
 // var HouseV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109082/itp6fjpabimo98fejomu.png'
 // var HashtagV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109082/gyims66ssldvxsbiaae6.png'
 // var MoneyV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109083/m38xsmjrhnshmidakjxx.png'
 // var CrowdV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109081/cag6qaz1gphb1er3510g.png'
  var GpsBlueV = 'https://res.cloudinary.com/party-images-app/image/upload/v1555839645/kvbvi4idqbes0fjhmksr.png'
  //var display = false;

var alreadyAttending = false

export default class InfoWindow extends React.Component {
 
    constructor(props) {
    super(props);
        this.state = {
          showConfirm: false,
          showForceLogin: false,
          confirmedPressed: false,
      }
  }

// shouldComponentUpdate(nextState, nextProps){
//   console.log("shouldComponentUpdate APP")
//   console.log(nextState)
//   console.log(this.state)
// return true
// }


// handleOpenMap = (event) => {
//   event.stopPropagation()
//   var lat = this.props.lng
//   var lng = this.props.lat
// var url = new URL("https://www.google.com/maps/search/?api=1&");
// var latLng = lng + ',' + lat
// url.searchParams.append('query', latLng);
// window.open(url, '_blank');
// }

// attendEvent = () => {

//   this.setState({confirmedPressed: true}, () => {
//     this.props.handleOpenModalJoinMAP()
//     this.handleOpenCloseConfirm()
//   }
//   )

//       fetch('/mail/post', {
//           method: 'POST',
//           mode: "same-origin",
//           headers: {
//           Accept: 'application/json',
//                   'Content-Type': 'application/json',
//                   },
//           body: JSON.stringify({
//             user_email: this.props.email,
//             user_name: this.props.name,
//             creatorEmail: this.props.location.creatorEmail,
//             event: this.props.location

//           }),
//             }).then((res) => {
//               console.log("RESPONSE EMAIL: " , res)
//               console.log("res.RESPONSE: " , res.status)
//               if (res.status == 200) {
//                   this.props.handleShowMailSent()
//               }
//             })

//       fetch('/api2/add-attend', {
//           method: 'POST',
//           mode: "same-origin",
//           headers: {
//           Accept: 'application/json',
//                   'Content-Type': 'application/json',
//                   },
//           body: JSON.stringify({
//             event_id: this.props.location._id,
//             event_name: this.props.location.name,
//             event_price: this.props.location.price,
//             event_photo: " url photo of event",
//             event_dateStart: this.props.location.dateStart,
//             user_id: this.props.user_id,
//             user_name: this.props.name,
//             user_email: this.props.email,
//             user_photo: this.props.picture,
//           }),
//             }).then((res) => {
//             console.log("RESPONSE ATTEND: " , res)
//             if (res.status == 200) {
//                   this.props.handleShowJoinedAlertConfirm()
//                   this.props.forceRerender()
//             }      
//             }
//             )
// }

// handleOpenCloseConfirm = (event) => {
//   console.log("FCE: handleOpenCloseConfirm")
//   this.setState({showConfirm: !this.state.showConfirm})
// }

handleOpenCloseConfirm = () => {
  this.props.AttendingLocationHandler(this.props.location)
}

handleCloseForce = () => {
  this.setState({showForceLogin: false})
}

handleRedirectLogin = (event) => {
  this.props.redirectLogin()
}

displayAdress(){

  if (this.props.location.addressGoogle) {
    return(<p>{this.props.location.addressGoogle}  <img id="gps-img" src={GpsBlueV} /></p>)
  } else{
      return( <p>{this.props.location.addressCustom}  <img id="gps-img" src={GpsBlueV} /></p>)
  }
}
//

infowBody = () => {
  return(<React.Fragment>
          <div className="poster-background" style={{  backgroundImage: "url(" + this.props.location.imagesArr[this.props.location.imagesArr.length - 1].thumbnail + ")",
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat'
                                                  }}>
        </div>

    <div className='nadpisInfo' xs={12} md={12}>
      <p>{this.props.location.name}</p>
    </div>

    <div className='creator-portrait-wrap'>
          <img className="creator-portrait" src={this.props.location.creatorPhoto} />
    </div>

    <div className='priceInfo-wrap'>
      <div className="priceInfo">
          <p>{this.props.location.price}$</p>
      </div>
    </div>
    </React.Fragment>)

}
//
tripleActionLogo = () => {

    console.log("tripleActionLogo - this.props.location: ", this.props.location)
    alreadyAttending = false
      _.map(this.props.location.EventGuests, (guest) => {
        console.log("guest.guest_id: ", guest)
        console.log("If podminka: ", guest.guest_email == this.props.email)
        if (guest.guest_email == this.props.email && guest.guest_confirmed == true) {
          console.log("YOU are already INN")
            alreadyAttending = true
        }
      })

  var today = new Date()
  var eventDate = new Date(this.props.location.dateStart)


        if (this.props.isLoggedIn == false) {
          return  <div className="lg-btn-wrap" onClick={this.openModalLogin}>
                  {this.infowBody()}
                  <div className="joint-btn-wrap">
                  {this.props.location.dateStart ? <p>{dateFormat(new Date(this.props.location.dateStart), "dS, h:MM TT")}</p>  : <p> </p>}
                  <Button onClick={this.openModalLogin} >
                  OPEN (login first)
                  </Button>
                 </div>
                 </div>
        }   else{
                  if (today > eventDate) {
                return <div className="lg-btn-wrap" onClick={this.openModalEvent}>
                        {this.infowBody()}
                          <div className="joint-btn-wrap">
                          {this.props.location.dateStart ? <p>{dateFormat(new Date(this.props.location.dateStart), "dS, h:MM TT")}</p>  : <p> </p>}
                            <Button onClick={this.openModalEvent} >
                              OPEN (past event)
                            </Button>
                         </div>
                       </div>
              } else{
                  console.log("TRIPPLE att var: ", alreadyAttending)
                  if (alreadyAttending !== true) {
                    if (this.props.location.EventGuests.length/this.props.location.capacityMax == 1) {
                          return <div className="lg-btn-wrap" onClick={this.openModalEvent}>
                                    {this.infowBody()}
                                    <div className="joint-btn-wrap">
                                    {this.props.location.dateStart ? <p>{dateFormat(new Date(this.props.location.dateStart), "dS, h:MM TT")}</p>  : <p> </p>}
                                      <Button>
                                        OPEN
                                      </Button>
                                    </div>
                                  </div>
                    }

                    return <div className="lg-btn-wrap" onClick={this.openModalEvent}>
                              {this.infowBody()}
                              <div className="joint-btn-wrap">
                              {this.props.location.dateStart ? <p>{dateFormat(new Date(this.props.location.dateStart), "dS, h:MM TT")}</p>  : <p> </p>}
                              <Button onClick={this.openModalEvent} >
                              OPEN EVENT
                              </Button>
                             </div>
                           </div>
                  } else {
                    return   <div className="lg-btn-wrap" onClick={this.openModalEvent}>
                                {this.infowBody()}
                                <div className="joint-btn-wrap">
                                {this.props.location.dateStart ? <p>{dateFormat(new Date(this.props.location.dateStart), "dS, h:MM TT")}</p>  : <p> </p>}
                                <Button  onClick={this.openModalEvent} >
                                OPEN (attending)
                                </Button>
                                </div>
                              </div>
                  } 
      }
  }

 
}
//

printGuests = () => {
  console.log("PRINT GUESTS: ", this.props)
        return( _.map(this.props.location.EventGuests , (guest, index) => <div className="guest-infowindow" id={index} ><img src={guest.guest_photo} /></div>    
          )
        )
}

openGalleryHandle = () => {
  console.log("window.google.event", window.google.maps.event)
  this.props.openGalleryMap(this.props.location.imagesArr)
}
//
openModalEvent = () => {

var youOwnerVar = false

    if (this.props.location.creatorEmail == this.props.email) {
    console.log("You are the OWNER!")
    youOwnerVar = true
  } else{
    console.log("You are NOT the owner!")
  }
  console.log("Event _id: ", this.props.location._id)
  var string = '/event/' + this.props.location._id
  console.log("correct string: ", string)
  
  window.AppHistory.push(string, {printAttending: alreadyAttending, 
                                  youOwner: youOwnerVar, 
                                  isLoggedIn: this.props.isLoggedIn
                                }
                              )
}

openModalLogin = () => {

var youOwnerVar = false

    if (this.props.location.creatorEmail == this.props.email) {
    console.log("You are the OWNER!")
    youOwnerVar = true
  } else{
    console.log("You are NOT the owner!")
  }

  window.AppHistory.push("/login", {printAttending: alreadyAttending, 
                                  youOwner: youOwnerVar, 
                                  isLoggedIn: this.props.isLoggedIn
                                }
                              )
}

  render() {


console.log("render Infowindow: ", this.props)


//
    console.log("RENDER $$$$___________________________ z Infowindow")
    console.log(this.props.location)
  return (
    <div className="black">
    <Grid className="grid-infowindow">
 
    <div className="lg-btn-wrap">
      {this.tripleActionLogo()}
      </div>
    </Grid>




    </div>
  );
  }
}

    // <Col className="col-description" xs={12} md={12}>
    //     <p>{this.props.location.description}</p>
    // </Col>


                      // <Modal show={this.state.showForceLogin} onHide={this.handleCloseForce}>
                      //   <Modal.Header closeButton>
                      //     <Modal.Title>Message</Modal.Title>
                      //   </Modal.Header>
                      //   <Modal.Body>
                      //     <h4>Please LOGIN first</h4>
                      //   </Modal.Body>
                      //   <Modal.Footer>
                      //      <Link to={{ pathname: '/login' }}> <Button  >LOGIN</Button> </ Link>
                      //     <Button bsStyle="primary" onClick={this.handleCloseForce} >Back</Button>
                      //   </Modal.Footer>
                      // </Modal>




                      //   <Modal show={this.state.showConfirm} onHide={this.handleOpenCloseConfirm}>
                      //   <Modal.Header closeButton>
                      //     <Modal.Title>Confirmation</Modal.Title>
                      //   </Modal.Header>
                      //   <Modal.Body>
                      //     <h4>You are going to attend: <b>{this.props.location.name}</b></h4>
                      //   </Modal.Body>
                      //   <Modal.Footer>
                      //   {this.state.confirmedPressed ? 
                      //     <span>
                      //      <Button bsStyle="success" disabled >Confirm</Button>
                      //      <Button bsStyle="alert" disabled >Cancel</Button>
                      //     </span>
                      //      :
                      //      <span>
                      //       <Button bsStyle="success" onClick={this.attendEvent} >Confirm</Button>
                      //       <Button bsStyle="warning" onClick={this.handleOpenCloseConfirm} >Cancel</Button>
                      //      </span>
                      //   }
                           
                      //   </Modal.Footer>
                      // </Modal>
