import React, { Component } from 'react';
import { NavLink, Link, withRouter, Redirect } from 'react-router-dom'
import {Row, Col, Button, Glyphicon, Modal, Alert } from 'react-bootstrap'
import StarRatingComponent from 'react-star-rating-component';
import './user-buttons.css'
import _ from 'lodash';


var value = "Value from Button XXXXXXXXXXXX"
var DoneV = 'https://res.cloudinary.com/party-images-app/image/upload/v1553485009/dvnjw7htgrl3wui8kfsu.png'
var BinV = 'https://res.cloudinary.com/party-images-app/image/upload/v1553503374/tdxlrtp1rfrpsaw4btsv.png'
var EmailV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552979848/hapnjhk6atnytpeczpf7.png'
var SpinnerV = 'https://res.cloudinary.com/party-images-app/image/upload/v1558013750/f6miqwq5hs4ipee43rbj.png'

class UserButtons extends Component {

    constructor(props) {
    super(props);
    this.state = {
        showConfirm: false,
        confirmedPressed: false,

       showMailAlert: '',
       showMailSent: false,
       showJoinedAlert: '',
       showJoinedAlertConfirm: '',

        showModalCancel: false,
        showModalDelete: false,
        showModalRating: false,
        showModalThanksRating: false,

        disableConfirmButton: false,

        redirectToMap: false,
        rating: null,
        ratingComment: '',
        ableToRate: false,

        inquiry: '',
        userLocalEmail: this.props.email,
      }
  }

shouldComponentUpdate(nextProps, nextState){
  // console.log("shouldComponentUpdate APP")
  // console.log("nextProps" , nextProps.creatorDetails)
  // console.log("this.props" , this.props.creatorDetails)

  if (this.props.email == this.props.eventData.creatorEmail) {
    // console.log("THIS is your event, can not rate: ", this.props.eventData.name)
  } else{
        if (nextProps.creatorDetails !== this.props.creatorDetails) {
          //console.log("Check Eligibility only once for this event: ", this.props.eventData.name)

          this.canYouRate(nextProps)
        }
  }


return true
}

//cancel attendance of guest
cancelEventHandle = () => {
this.setState({showModalCancel: !this.state.showModalCancel})
}

handleCancel = () => {
  this.setState({showModalCancel: false})
  this.props.handleSendingRequest() //Just open window Modal/Alert
  this.props.cancelAttending()
}



deleteModalPopup = () => {
  this.setState({showModalDelete: !this.state.showModalDelete})
}

hnadleDelete = () => {
  this.deleteModalPopup()
  this.props.deleteEvent(this.props.eventData._id) 
}

handleRating = () => {

}

closeOpenModalRating = () => {
  this.setState({showModalRating: !this.state.showModalRating})
}

closeOpenModalThanksRating = () => {
  this.setState({showModalThanksRating: !this.state.showModalThanksRating})  
}

onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue}, () => {
    });
  }

onWriteComment(event){
  this.setState({ratingComment: event.value})
}

sendRatingHandle = () => {
  console.log("this.props.userDetails usr-btn ", this.props.name, this.props.picture)
  this.props.sendRating(this.state.rating, this.state.ratingComment, this.props.name, this.props.picture)
   this.setState({ableToRate: false, showModalRating: !this.state.showModalRating, showModalThanksRating: !this.state.showModalThanksRating})
   setTimeout( this.closeOpenModalThanksRating , 1000);
}

canYouRate = (nextProps) => {

  var eligible = true

  if (this.props.nextProps !== null) {
     _.map(nextProps.creatorDetails.rating, (ratingSeshion, index) => {

       if (ratingSeshion.guestId == this.props.user_id && ratingSeshion.ratedEventId == this.props.eventData._id) {
         eligible = false
      } else{

      }
    })
  }

  if (eligible == true) {
  //  console.log("RESULT eligible - USER_BUTTONS: ", eligible)
      this.setState({ableToRate: true})
  } else{
   }
}

handleUpdateShip = () => {
 // console.log("USR BTN: this.props: ", this.props)
  this.props.updatingShip(this.props.eventData)
}

confirmEventCreation = () => {

this.setState({disableConfirmButton: true})

console.log("confirmEventCreation FCE")

fetch('/confirm-event', {
          method: 'POST',
          mode: "same-origin",
          headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  },
          body: JSON.stringify({
            event_id: this.props.eventData._id,
          }),
            }).then((res) => {
              console.log("RESPONSE from /confirm-event", res)
              if (res.status == 200) {

                  
                setTimeout( () => {
                    this.setState({redirectToMap: true}) }, 1000)
                alert("Success, confirmed and finished")

              } else{
                alert("event confirm FAIL")
              }
            })
}

handleOpenCloseConfirm = (event) => {
  console.log("FCE: handleOpenCloseConfirm")
  this.setState({showConfirm: !this.state.showConfirm, confirmedPressed: false})
}

handleOpenModalJoinMAP = () => {
    console.log("FCE handleOpenJoinedGATE")
    this.setState({showMailAlert: true, showJoinedAlert: false})
}

handleShowMailSent = () => {
  this.setState({showMailSent: true}, () => {
    this.closeLaterMail()
  })
}

handleCloseAlertMail = () => {
 console.log("FCE handleOpenCloseJoinedMAP")
  this.setState({showMailAlert: false}, () => {
    window.AppHistory.push('/map' , {rerenderPlease: true })
  })   
}


handleCloseAlertJoined = () => {
 console.log("FCE handleOpenCloseJoinedMAP")
  this.setState({showJoinedAlert: false})   
}

closeLaterMail = () => {
            setTimeout(() => { 
            this.setState({showMailAlert: false, showMailSent: false})
            var string = '/map'
            window.AppHistory.push('/map' , {rerenderPlease: true })
                      }, 3000)
}

handleShowJoinedAlertConfirm = () => {
  this.setState({showJoinedAlertConfirm: true}, () => {
    this.closeLaterJoined()
  })
}

closeLaterJoined = () => {
            setTimeout(() => { 
            this.setState({showJoinedAlert: false, showJoinedAlertConfirm: false}) }, 3000)
}

// redirectMapLater = () => {
//             setTimeout(() => { 
//             window.AppHistory.push('/map') }, 3000)
// }


AttendAndRedirectMap = () => {

console.log("AttendAndRedirectMap FCE: ")

if (!this.state.userLocalEmail) {
  document.getElementById("inquiry-error").classList.remove("hideThis");
  document.getElementById("inquiry-success").classList.add("hideThis");
}
else{
  document.getElementById("inquiry-error").classList.add("hideThis");
  document.getElementById("inquiry-success").classList.remove("hideThis");
}

    this.setState({confirmedPressed: true}, () => {
      this.handleOpenModalJoinMAP() //show secont modal - 2 alerts mail and DB
      this.handleOpenCloseConfirm() //close pre confirmation
    }
  )

    var leng = this.props.eventData.imagesArr.length

    fetch('/api2/add-attend', {
        method: 'POST',
        mode: "same-origin",
        headers: {
        Accept: 'application/json',
                'Content-Type': 'application/json',
                },
        body: JSON.stringify({
          inquiry: this.state.inquiry,
          event_id: this.props.eventData._id,
          event_name: this.props.eventData.name,
          event_price: this.props.eventData.price,
          event_photo: this.props.eventData.imagesArr[leng - 1].thumbnail,
          event_host: this.props.eventData.creatorName,
          event_host_email: this.props.eventData.creatorEmail,
          event_host_photo: this.props.eventData.creatorPhoto,
          event_dateStart: this.props.eventData.dateStart,
          user_id: this.props.user_id,
          user_name: this.props.name,
          user_email: this.state.userLocalEmail,
          user_photo: this.props.picture,

        }),
          }).then((res) => {
          console.log("RESPONSE ATTEND: " , res)
          if (res.status == 200) {
                //mail to guest right away
                //this.sendConfirmMail()
                this.sendInquiryToHost()
                this.sendInquiryToGuest()
                this.handleShowJoinedAlertConfirm()
                // this.props.forceRerender()
                //this.redirectMapLater()
                this.props.fetchUserInfoId()

              }      
            }
          )
 }

 sendInquiryToHost = () => {
          fetch('/mail/inquiry-to-host', {
          method: 'POST',
          mode: "same-origin",
          headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  },
          body: JSON.stringify({
            guest_email: this.state.userLocalEmail,
            guest_name: this.props.name,
            guest_picture: this.props.picture,
            guest_inquiry: this.state.inquiry,
            creatorEmail: this.props.eventData.creatorEmail,
            event: this.props.eventData,
            event_name: this.props.eventData.name,
          }),
            }).then((res) => {
              console.log("RESPONSE EMAIL: " , res)
              console.log("res.RESPONSE: " , res.status)
              if (res.status == 200) {
                this.handleShowMailSent()
                //alert('inquiry has been successfully sent to host')
                  //this.handleShowMailSent()
                    //redirect to

              }
        })
 }

sendInquiryToGuest = () => {

  console.log("sendInquiryToGuest")
          fetch('/mail/inquiry-to-guest', {
          method: 'POST',
          mode: "same-origin",
          headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  },
          body: JSON.stringify({
            guest_email: this.state.userLocalEmail,
            guest_name: this.props.name,
            guest_picture: this.props.picture,
            guest_inquiry: this.state.inquiry,
            creatorEmail: this.props.eventData.creatorEmail,
            event: this.props.eventData,
          }),
            }).then((res) => {
              console.log("RESPONSE EMAIL: " , res)
              console.log("res.RESPONSE: " , res.status)
              if (res.status == 200) {
                //this.handleShowMailSent()
                //alert('inquiry has been successfully sent to host')
                  //this.handleShowMailSent()
                    //redirect to

              }
        })
 }

 sendConfirmMail = () => {

        fetch('/mail/post', {
          method: 'POST',
          mode: "same-origin",
          headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  },
          body: JSON.stringify({
            user_email: this.props.email,
            user_name: this.props.name,
            creatorEmail: this.props.eventData.creatorEmail,
            event: this.props.eventData

          }),
            }).then((res) => {
              console.log("RESPONSE EMAIL: " , res)
              console.log("res.RESPONSE: " , res.status)
              if (res.status == 200) {
                  this.handleShowMailSent()
                    //redirect to

              }
        })
}

saveInquiryToState = (target) => {
  this.setState({inquiry: target.value})
  console.log("SAVE TEXTAREA")

}

fillEmail = (target) => {
  this.setState({userLocalEmail: target.value})
}




render(){

  console.log("USER BUTTONS render this.props", this.props)
  var today = new Date
  var eventDate = new Date(this.props.eventData.dateStart)

  if (this.state.redirectToMap === true) {
        return(<Redirect to='/map' />) 
      }

	return(


        <React.Fragment>

          {this.props.isLoggedIn ?
                null
               :
                <Col className="col-user-buttons" xs={12} md={12}>
                  {today <= eventDate ? 
                    <Button className="btn-alone" bsStyle="info">
                    <Glyphicon className="glyphicon glyphicon-log-out" />   Logged OUT - Open App
                    </Button>
                    : 
                   <Button className="btn-alone" bsStyle="info" >
                      <Glyphicon className="glyphicon glyphicon-log-out" />   Logged OUT - Open App
                   </Button>
                  } 
               </Col>
            }

          {this.props.isLoggedIn && !this.props.eventData.confirmed ?
                <Col className="col-user-buttons" xs={12} md={12}>
                    <Link     to={{ pathname: `/create` }} 
                              activeClassName="">
                      <Button className="btn-couple" bsStyle="info" onClick={this.handleUpdateShip}>
                        <Glyphicon className="glyphicon glyphicon-pencil" />  Back to Edit
                      </Button>
                    </Link>

                    <Button className="btn-couple" 
                            bsStyle="info" 
                            onClick={this.confirmEventCreation}
                            disabled={this.state.disableConfirmButton}>

                        <Glyphicon className="glyphicon glyphicon-ok" />
                        {this.state.disableConfirmButton ? 
                            <img className="upload-spinner"  src={SpinnerV} /> 
                            : 
                            <React.Fragment>  Confirm</React.Fragment>
                          }
                    </Button>
                </Col>
               :
                null
            }

    {this.props.eventData.confirmed ? 
            <React.Fragment>
            {this.props.isLoggedIn && this.props.isAttending && this.props.isOwner ?
               <Col className="col-user-buttons" xs={12} md={12}>
                  {today <= eventDate ? 
                    <span>
                      <Button className="btn-couple" bsStyle="danger" onClick={this.deleteModalPopup} >
                          <Glyphicon className="glyphicon glyphicon-trash" /> Delete event
                      </Button>
                      <Button className="btn-couple" bsStyle="danger" onClick={this.cancelEventHandle} >
                            <Glyphicon className="glyphicon glyphicon-remove" /> Cancel att.
                      </Button>
                    </span>
                    : 
                   <Button className="btn-alone" bsStyle="dark"  >
                        <Glyphicon className="glyphicon glyphicon-time" /> your PAST EVENT
                   </Button>
                } 
               </Col>
               :
                <span>
                </span>
            }

            {this.props.isLoggedIn && this.props.isAttending && this.props.isOwner == false ?
               <Col className="col-user-buttons" xs={12} md={12}>
                  {today <= eventDate ? 
                    <Button className="btn-alone" bsStyle="danger" onClick={this.cancelEventHandle} >
                      <Glyphicon className="glyphicon glyphicon-remove" /> Cancel your attendance
                    </Button>
                    : 
                    <span>
                    <Button className="btn-couple" bsStyle="dark">
                        <Glyphicon className="glyphicon glyphicon-time" /> Past event
                    </Button>
                    {this.state.ableToRate ? 
                           <Button className="btn-couple" bsStyle="success" onClick={this.closeOpenModalRating}>
                              <Glyphicon className="glyphicon glyphicon-star-empty" />   Rate event
                           </Button>
                           :
                           <Button className="btn-couple" bsStyle="success" disabled>
                              <Glyphicon className="glyphicon glyphicon-star-empty" />   Rating sent
                           </Button>
                    }

                    </span>
                } 
               </Col>
               :
                <span>
                </span>
            }


            {this.props.isLoggedIn && this.props.isAttending == false && this.props.isOwner ?
               <Col className="col-user-buttons" xs={12} md={12}>
                  {today <= eventDate ? 
                    <span>
                    <Button className="btn-couple" bsStyle="success" onClick={this.handleOpenCloseConfirm}>
                        <Glyphicon className="glyphicon glyphicon-ok" />   Join
                    </Button>
                    <Button className="btn-couple" bsStyle="danger" onClick={this.deleteModalPopup} >
                      <Glyphicon className="glyphicon glyphicon-trash" />  Delete
                    </Button>
                    </span>
                    : 
                 <Button className="btn-alone" bsStyle="dark" >
                  <Glyphicon className="glyphicon glyphicon-time" />   Past (did not attend)
                  </Button>
                } 
               </Col>
               :
                <span>
                </span>
            }


            {this.props.isLoggedIn && this.props.isAttending == false && this.props.isOwner == false ?
               <Col className="col-user-buttons" xs={12} md={12}>
                  {today <= eventDate ? 
                    <Button className="btn-alone" bsStyle="success" onClick={this.handleOpenCloseConfirm}>
                      Future event, lets join
                    </Button>
                    : 
                   <Button className="btn-alone" >
                      <Glyphicon className="glyphicon glyphicon-time" bsStyle="dark" />   Past (did not attend)
                   </Button>
                } 
               </Col>
               :
                <span>
                </span>
            }
            </React.Fragment>
            :
            null
          }
         

              <Modal show={this.state.showConfirm} onHide={this.handleOpenCloseConfirm}>
                      <Alert className="alert-inquiry" show={true} bsStyle="success">

                      <div  className="inquiry-error hideThis" 
                            id="inquiry-error">
                        <p>Fill out your email for communication</p>
                      </div>

                      <div  className="inquiry-success hideThis" 
                            id="inquiry-success">
                        <p>Success</p>
                      </div>

                      

                      <ul>
                      <li><h1><b>Ask for submission</b></h1></li>
                      <li><p><b>Host</b></p></li>
                      <li><img className="profile-pic-ask" src={this.props.eventData.creatorPhoto} ></img></li>
                      <li><p>{this.props.eventData.creatorName}</p></li>
                      <li><p><b>Your message</b></p></li>
                      </ul>
                        <textarea id="guest-inquiry"
                                  className='form-control' 
                                  name='description' 
                                  rows="4" 
                                  cols="50"
                                  value={this.state.inquiry}
                                  placeholder='Hi Charlie please let me in thank you'
                                  onChange={(event) => this.saveInquiryToState(event.target)}>
                        </textarea>
                         <ul>
                         <li><p>(this message will see only host of this event)</p></li>
                         <li><p> </p></li>
                          <li><p><b>Your email for communication</b></p></li>
                          <li>
                              <input value={this.state.userLocalEmail} onChange={(event) => this.fillEmail(event.target)}/>
                          </li>
                        </ul>
                          {this.state.confirmedPressed ? 
                                <div className="dismis-btn" >
                                 <Button bsStyle="success" disabled >inquiry being send</Button>
                                 <Button bsStyle="alert" disabled >Back</Button>
                                </div>
                               :
                               <div className="dismis-btn" >
                                <Button bsStyle="outline-success" onClick={this.AttendAndRedirectMap} ><Glyphicon glyph="glyphicon glyphicon-ok" /> Send</Button>
                                <Button bsStyle="outline-warning" onClick={this.handleOpenCloseConfirm} > Back</Button>
                               </div>
                              
                            }
                      </Alert>
                  </Modal>

          <div className="mod-Alert">        

            <Modal show={this.state.showMailAlert || this.state.showJoinedAlert} >
                  {this.state.showMailAlert ? 
                          <Alert bsStyle="info" className="email-sending-alert" >
                                {this.state.showMailSent ? 
                                  <React.Fragment>
                                       <p>Delivered</p>
                                      <p>to</p>
                                       <div className="alert-profile-img-wrap">
                                          <img className="profile-pic-ask" src={this.props.eventData.creatorPhoto} />
                                       </div>
                                       <p>{this.props.eventData.creatorName}</p>
                                       <div className="send-mail-wrap">
                                          <img className="send-mail" src={EmailV} />
                                       </div>
                                  </React.Fragment>
                                     :
                                  <React.Fragment>
                                      <p>Delivering your inquiry</p>
                                      <p>to</p>
                                       <div className="alert-profile-img-wrap">
                                          <img className="profile-pic-ask" src={this.props.eventData.creatorPhoto} />
                                       </div>
                                       <p>{this.props.eventData.creatorName}</p>
                                      <div className="send-mail-wrap">
                                          <img className="send-mail-stopped" src={EmailV} />
                                      </div>
                                  </React.Fragment>
                                  }
                                <div className="close-line-btn" >
                                  <Button onClick={this.handleCloseAlertMail} bsStyle="outline-success">
                                    Close
                                  </Button>
                                </div>
                          </Alert >
                          :
                          null
                      }


            </Modal>
            </div>


           <Modal show={this.state.showModalCancel} onHide={this.cancelEventHandle}>
                        <Alert bsStyle="danger">
                        <h1>Cancel your attendance</h1>
                        <div className="dismis-btn" >
                          <Button bsStyle="danger" disabled={this.props.sendingRequest}  onClick={this.handleCancel}>
                              <Glyphicon className="glyphicon glyphicon-remove" /> Confirm Cancel
                          </Button>
                          <Button bsStyle="primary" onClick={this.cancelEventHandle} >
                              Back
                          </Button>
                        </div>
                        </Alert>
                      
                        </Modal>


              <div className="mod-Alert">        

        <Modal show={this.props.confirmedCancel} >
       
            <Alert bsStyle="danger">
                  <div className="dismis-btn-actions" >
                  <Button onClick={this.handleCloseAlertMail} bsStyle="outline-success">
                  Close
                </Button>
                  </div>
                  {this.props.sendingRequest ? 
                    <p>
                    Cancelling...
                       <div className="send-mail-wrap">
                          <img className="send-mail-stopped" src={DoneV} />
                       </div>
                    </p>
                    :
                    <p>
                    CANCELED
                       <div className="send-mail-wrap">
                          <img className="send-mail" src={DoneV} />
                       </div>
                    </p>
                  }
            </Alert >
        </Modal>


                  </div>

                      <Modal show={this.state.showModalDelete} onHide={this.deleteModalPopup}>
                        <Modal.Header closeButton>
                          <Modal.Title>Confirmation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <h4>Are you sure you want to DELETE this Event?</h4>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button bsStyle="danger" onClick={this.hnadleDelete}>Confirm DELETE <Glyphicon className="glyphicon glyphicon-trash" /></Button>
                          <Button bsStyle="primary" onClick={this.deleteModalPopup} >Back</Button>
                        </Modal.Footer>
                      </Modal>


              <div className="mod-Alert">        

              <Modal show={this.props.deleting} >
       
            <Alert bsStyle="success">
                  <div className="dismis-btn-actions" >
                  <Button onClick={this.handleCloseDeleting} bsStyle="outline-success">
                  Close
                </Button>
                  </div>
                  {this.props.deletingProgress ? 
                    <p>
                    Deleting...
                       <div className="send-mail-wrap">
                          <img className="send-mail-stopped" src={BinV} />
                       </div>
                    </p>
                    :
                    <p>
                    Deleted
                       <div className="send-mail-wrap">
                          <img className="send-mail" src={BinV} />
                       </div>
                    </p>
                  }
                       
                 
                </Alert >
                

                      </Modal>
                  </div>


                      <Modal show={this.state.showModalRating} onHide={this.closeOpenModalRating}>
                       <Alert className="alert-rating" show={true} bsStyle="success">
                        <p>RATE HOST with comment</p>
                        <div className="host-rated">
                        <img src={this.props.eventData.creatorPhoto} />
                        <h2>{this.props.eventData.creatorName}</h2>
                        </div>
                          <p>RATING*</p>
                          <div className="star-modal-wrap">
                          <StarRatingComponent 
                              name="rating-modal" 
                              starCount={5}
                              value={this.state.rating}
                              onStarClick={this.onStarClick.bind(this)}
                            />
                          </div>
                          <p>COMMENT*</p>

                          <textarea id="ratingComment"
                                    className='form-control' 
                                    name='description' 
                                    rows="3" 
                                    cols="50"
                                    value={this.state.description} 
                                    placeholder='Great party, thank you :) oxox'
                                    onChange={(event) => this.onWriteComment(event.target)} >
                          </textarea>
                          { this.state.rating !== null ? 
                                <Button id="send-rating-button" 
                                        bsStyle="success" 
                                        onClick={this.sendRatingHandle} >
                                        SEND RATING {this.state.rating} STARS
                                        </Button>
                                        :
                                        <Button id="send-rating-button" 
                                        bsStyle="success" 
                                         disabled>
                                        SEND RATING {this.state.rating} STARS
                                        </Button>
                                      }
                           <Button bsStyle="warning" onClick={this.closeOpenModalRating} >CANCEL</Button>
                        </Alert>
                      </Modal>

                      <Modal show={this.state.showModalThanksRating} onHide={this.closeOpenModalThanksRating}>
                        <Modal.Header closeButton>
                          <Modal.Title>Success</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <h4>Thank you for your RATING</h4>
                             
                        </Modal.Body>
                        <Modal.Footer>
                          <Button bsStyle="primary" onClick={this.closeOpenModalThanksRating} > CLOSE </Button>
                        </Modal.Footer>
                      </Modal>
      </React.Fragment>

		)
}

}

export default withRouter(UserButtons)


                      // <Alert show={this.state.showJoinedAlert} bsStyle="success">
                      //     <div className="dismis-btn-actions" >
                      //       <Button onClick={this.handleCloseAlertJoined}  bsStyle="outline-success">
                      //         Close
                      //       </Button>
                      //     </div>
                      //     {this.state.showJoinedAlertConfirm ?
                      //         <p>
                      //           UPDATED
                      //              <div className="send-mail-wrap">
                      //                <img className="send-mail" src={DoneV} />
                      //              </div>
                      //         </p>
                      //         :
                      //        <p>
                      //           UPDATING DATABASE
                      //             <div className="send-mail-wrap">
                      //                 <img className="send-mail-stopped" src={DoneV} />
                      //              </div>
                      //         </p>
                      //       }
                      // </Alert>


                      // <Modal show={this.state.showModalRating} onHide={this.closeOpenModalRating}>
                      //  <Alert className="alert-rating" show={true} bsStyle="success">
                      //   <p>RATE HOST with comment</p>
                      //   <div className="host-rated">
                      //   <img src={this.props.eventData.creatorPhoto} />
                      //   <h2>{this.props.eventData.creatorName}</h2>
                      //   </div>
                      //     <p>RATING*</p>
                      //     <div className="star-modal-wrap">
                      //     <StarRatingComponent 
                      //         name="rating-modal" 
                      //         starCount={5}
                      //         value={this.state.rating}
                      //         onStarClick={this.onStarClick.bind(this)}
                      //       />
                      //     </div>
                      //     <p>COMMENT*</p>

                      //     <textarea id="ratingComment"
                      //               className='form-control' 
                      //               name='description' 
                      //               rows="3" 
                      //               cols="50"
                      //               value={this.state.description} 
                      //               placeholder='Great party, thank you :) oxox'
                      //               onChange={(event) => this.onWriteComment(event.target)} >
                      //     </textarea>
                      //     { this.state.rating !== null ? 
                      //           <Button id="send-rating-button" 
                      //                   bsStyle="success" 
                      //                   onClick={this.sendRatingHandle} >
                      //                   SEND RATING {this.state.rating} STARS
                      //                   </Button>
                      //                   :
                      //                   <Button id="send-rating-button" 
                      //                   bsStyle="success" 
                      //                    disabled>
                      //                   SEND RATING {this.state.rating} STARS
                      //                   </Button>
                      //                 }
                      //      <Button bsStyle="warning" onClick={this.closeOpenModalRating} >CANCEL</Button>
                      //   </Alert>
                      // </Modal>


//old buttons

          // {!this.props.location.state.youOwner ?
          //    <Col className="col-user-buttons" xs={12} md={12}> --------
          //       {today <= eventDate ? 
          //         <Button className="btn-alone" bsStyle="danger" onClick={this.cancelEventHandle} >
          //             Cancel attending  
          //             <Glyphicon className="glyphicon glyphicon-log-out" />
          //         </Button>
          //         : 
          //         <span>
          //           <Button className="btn-couple" disabled >
          //               PAST EVENT
          //           </Button>
          //           {this.state.ableToRate ? 
          //             <Button bsStyle="danger" className="btn-couple" onClick={this.closeOpenModalRating} >
          //               <p>RATE {this.props.eventData.creatorName}</p>
          //               <p><Glyphicon className="glyphicon glyphicon-star" /></p>
          //             </Button>
          //             :
          //             <Button className="btn-couple" disabled> 
          //               UNABLE TO RATE
          //             </Button>
          //           }
          //             </span>
          //       } 
          //    </Col>
          //     :  
          //    <Col className="col-user-buttons" xs={12} md={12}> --------
          //         {today <= eventDate ? 
          //               <span>
          //                 <Button className="btn-couple" bsStyle="danger" onClick={this.deleteModalPopup} >
          //                     <Glyphicon className="glyphicon glyphicon-remove" />
          //                     Delete
          //                 </Button>

          //                  <Link     to={{
          //                             pathname: `/create`,
          //                             state: {  eventData: this.props.eventData }}} 
          //                             activeClassName="">
          //                     <Button className="btn-couple" bsStyle="info" onClick={this.handleUpdateShip}>
          //                         <Glyphicon className="glyphicon glyphicon-pencil" />
          //                         Edit
          //                     </Button>
          //                   </Link>
          //                       </span>  
          //               : 
          //               <span>
          //             <Button className="btn-alone" disabled > PAST EVENT </Button>
          //               </span>
          //           } 
          //    </Col>
          // }
