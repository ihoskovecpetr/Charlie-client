import React from 'react';
import { Link } from 'react-router-dom'
import {Grid, Col, Button, Glyphicon, Image, Modal} from 'react-bootstrap';
import Gallery from 'react-grid-gallery';
import StarRatingComponent from 'react-star-rating-component';
import dateFormat from'dateformat';
import _ from 'lodash';

import './infowindow.css';
import UserButtons from './user-components/user-buttons'
import UserCard from './user-components/user-card'

  var CapacityLogoV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109081/rqxhxqzi4d6ncv6xqujb.png'
  var FreeV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109082/au4m3mw2wegudtwzesbu.png'
  var LocationV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109082/pmit1mrvcmhte9zhyi4t.png'
  var ClockV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109081/kmvlmqqtele0hcfgtslg.png'
  var HouseV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109082/itp6fjpabimo98fejomu.png'
  var HashtagV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109082/gyims66ssldvxsbiaae6.png'
  var MoneyV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109083/m38xsmjrhnshmidakjxx.png'
  var CrowdV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109081/cag6qaz1gphb1er3510g.png'
  var GpsBlueV = 'https://res.cloudinary.com/party-images-app/image/upload/v1555839645/kvbvi4idqbes0fjhmksr.png'
  var display = false;


export default class InfoWindow extends React.Component {
 
    constructor(props) {
    super(props);
        this.state = {
          showConfirm: false,
          showForceLogin: false,
          confirmedPressed: false,
      }
  }

shouldComponentUpdate(nextState, nextProps){
  console.log("shouldComponentUpdate APP")
  console.log(nextState)
  console.log(this.state)
return true
}


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

tripleActionLogo = () => {

  var today = new Date()
  var eventDate = new Date(this.props.location.dateStart)
  if (today > eventDate) {
    return <Button classsName="disabled" >PAST <Glyphicon className="glyphicon glyphicon-minus-sign" /> {this.props.location.dateStart ? <p>{dateFormat(new Date(this.props.location.dateStart), "mmmm dS, h:MM TT")}</p>  : <p></p>}</Button>
  } else{
//
       var alreadyAttending = false

      console.log("tripleActionLogo - this.props.location.EventGuests: ", this.props.location.EventGuests)
      _.map(this.props.location.EventGuests, (guest) => {
        console.log("guest.guest_id: ", guest)
        console.log("If podminka: ", guest.guest_email == this.props.email)
        if (guest.guest_email == this.props.email) {
          console.log("YOU are already INN")
            alreadyAttending = true
        }
      })

        if (this.props.email == '') {
          return <Button onClick={this.handleRedirectLogin} bsStyle="warning" ><Glyphicon glyph="glyphicon glyphicon-user" /></Button>
        } else{
//
          console.log("TRIPPLE att var: ", alreadyAttending)
          if (alreadyAttending !== true) {
            if (this.props.location.EventGuests.length/this.props.location.capacityMax == 1) {
                  return <Button bsStyle="danger" disabled ><img className="crowded-image" src={CrowdV} /><Glyphicon glyph="glyphicon glyphicon-minus-sign" /></Button>
            }

            return <Button bsStyle="success" onClick={this.handleOpenCloseConfirm} ><Glyphicon glyph="glyphicon glyphicon-plus" />{this.props.location.dateStart ? <p>{dateFormat(new Date(this.props.location.dateStart), "mmmm dS, h:MM TT")}</p>  : <p> </p>}</Button>
          } else {
            return <Button bsStyle="info" disabled ><Glyphicon glyph="glyphicon glyphicon-ok" />{this.props.location.dateStart ? <p>{dateFormat(new Date(this.props.location.dateStart), "mmmm dS, h:MM TT")}</p>  : <p> </p>}</Button>
          } 
        }


  }

 
}


handleOpenMap = (event) => {
  event.stopPropagation()
  var lat = this.props.lng
  var lng = this.props.lat
var url = new URL("https://www.google.com/maps/search/?api=1&");
var latLng = lng + ',' + lat
url.searchParams.append('query', latLng);
window.open(url, '_blank');
}

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


  render() {
//

console.log("render IMGAS infowindow: ", this.props)

//
    console.log("RENDER $$$$___________________________ z Infowindow")
    console.log(this.props.location)
  return (
    <div className="black">
    <Grid className="grid-infowindow">

      <div id="top-half" onClick={this.openGalleryHandle}>
    {display ? <Gallery images={this.props.location.imagesArr} rowHeight={60} /> : <span> </span>}
    {!display ? <Gallery images={this.props.location.imagesArr} rowHeight={60} /> : <span> </span>}
      </div>


        <div className="white-line-infobubble"> </div>

    <div className="lg-btn-wrap">
      {this.tripleActionLogo()}
      </div>
    <div className="nadpis-wrap">
    <Col className='nadpisInfo' xs={12} md={12}>
      <p>{this.props.location.name}</p>
    </Col>
    </div>

       
    <div className="bottom-half">
    <Col className="infow-nadpis" xs={12} md={12}>
      <p>DESCRIPTION</p>
    </Col>
    <Col xs={12} md={12}>
        <p>{this.props.location.description}</p>
    </Col>

    <div className="black-line-infobubble"> </div>

    <Col className="infow-nadpis" xs={12} md={12}>
      <p>ATTENDEES ({this.props.location.EventGuests.length} / {this.props.location.capacityMax})</p>
    </Col>

    <Col className="infow-col-guests" xs={12} md={12}>
      <div className="guests-wrap-infow">
          {this.printGuests()}
      </div>
    </Col>

    <div className="black-line-infobubble"> </div>

    <Col className="infow-nadpis" xs={12} md={12}>
      <p>PRICE</p>
    </Col>

    <Col className="priceInfo" xs={12} md={12}>
        <p>{this.props.location.price} $</p>
    </Col>

  <div className="black-line-infobubble"> </div>

    <Col className="infow-nadpis" xs={12} md={12}>
      <p>FREE_STUFF</p>
    </Col>

    <Col className="col-free-stuff" xs={12} md={12}>
        {this.props.location.freeSnack ? <p> Free Snack </p> : <span></span>}
        {this.props.location.freeBeer ? <p> Free Beer </p> : <span></span>}
        {this.props.location.freeMeal ? <p> Free Meal </p> : <span></span>}
        {!this.props.location.freeMeal && !this.props.location.freeBeer && !this.props.location.freeSnack ? <p>No free food/drink</p> : <span></span>}
    </Col>

    <div className="black-line-infobubble"> </div>


    <Col className="infow-nadpis" xs={12} md={12}>
      <p>NAVIGATE ME THERE</p>
    </Col>

    <Col className="adressInfo" onClick={this.handleOpenMap} xs={12} md={12}>
        <div>
          {this.displayAdress()}
        </div>
      </Col>

      <div className="black-line-infobubble"> </div>

    <Col className="infow-nadpis" xs={12} md={12}>
      <p>HOST</p>
    </Col>

      <Col className="right-col col-host-card" xs={12} md={12}>
          <UserCard creatorEmail={this.props.location.creatorEmail} />
      </Col>

    <div className="lg-btn-wrap">
      {this.tripleActionLogo()}
      </div>
      </div>
    </Grid>




                      <Modal show={this.state.showForceLogin} onHide={this.handleCloseForce}>
                        <Modal.Header closeButton>
                          <Modal.Title>Message</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <h4>Please LOGIN first</h4>
                        </Modal.Body>
                        <Modal.Footer>
                           <Link to={{ pathname: '/login' }}> <Button  >LOGIN</Button> </ Link>
                          <Button bsStyle="primary" onClick={this.handleCloseForce} >Back</Button>
                        </Modal.Footer>
                      </Modal>

    </div>
  );
  }
}
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
