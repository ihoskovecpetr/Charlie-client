import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import _ from 'lodash';
import dateFormat from'dateformat';
import classnames from 'classnames'
import './event-card.css'


var mapIcon = 'https://res.cloudinary.com/party-images-app/image/upload/v1560561308/d26rn1jtjgb6gcazcm1d.png'
var confirmGuestsNr = 0
export default class EventCard extends Component {

distance = (geometry) => {
  console.log("geometry: ", geometry)
  if (geometry) {
    if (this.props.workingLocationGate[1]) {
      var x = new window.google.maps.LatLng(this.props.workingLocationGate[0], this.props.workingLocationGate[1])
      var y = new window.google.maps.LatLng(geometry.coordinates[1], geometry.coordinates[0])
      var distance = window.google.maps.geometry.spherical.computeDistanceBetween(x,y)
      distance = Math.round(distance/1000) 
      return(<p>{distance} km</p>)
        }
      }
    }
//
  printGuestsPhoto = (EventGuests) => {

confirmGuestsNr = 0


  _.map(EventGuests, (guest, index) => {
    if (guest.guest_confirmed) {
      confirmGuestsNr = confirmGuestsNr + 1
    }
  })

 
   return( _.map(EventGuests, (guest, index) => 
            <div className={classnames("img-guest-wrap", { 'hideThis': (!guest.guest_confirmed) })}>
              <img className='img-guest' src={guest.guest_photo} />  
            </div>
        ))
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

render(){
//
  console.log("this.props from eventCard:", this.props)

  var url = 'login'
  
  if (this.props.isLoggedIn && this.props.location.imagesArr) {
    url = `/event/${this.props.location._id}`
  }

//
	return(
<span>
   {this.props.location.imagesArr ? 
             <Link key={this.props.index}
                to={{
                pathname: url,
                state: {  isLoggedIn: this.props.isLoggedIn, 
                           }}}>
                  <div className="slider-location">

                    <div className="slider-location-body">

                    
                    <div className="location-img" style={{  backgroundImage: "url(" + this.props.location.imagesArr[this.props.location.imagesArr.length - 1].thumbnail + ")",
                                                            backgroundPosition: 'center',
                                                            backgroundSize: 'cover',
                                                            backgroundRepeat: 'no-repeat'
                                                          }}>
                          </div>
                        

                          <div className="zero-img-profile-wrapper">
                          <img className="zero-img-profile" src={this.props.location.creatorPhoto} />
                          </div>
                        <div className="line-uno">
                          {this.distance(this.props.location.geometry)}
                          {this.displayDateNormal(this.props.location.dateStart)} 
                        </div>
                        <div className="line-dos">
                        <h1>{this.props.location.name}</h1>
                        </div>
                        <div className="line-tres">
                        <h2>{this.props.location.addressGoogle}</h2>
                        </div>
                        <div className="line-quatro">
                        <div className="guests-wrap">
                        {this.printGuestsPhoto(this.props.location.EventGuests)}
                        </div>
                        <div className="att-wrap">
                        <p>{confirmGuestsNr} Attendees </p>
                        </div>
                        <img className='open-map-mark' src={mapIcon} />
                        </div>
                    </div>
                  </div>
              </Link>
              :
              <Link key={this.props.index}
                to={{
                pathname: `/event/${this.props.location.event_id}`,
                }}>
                  <div className="slider-location">
                    <div className="slider-location-body">
                    <div className="location-img" style={{  backgroundImage: "url(" + this.props.location.event_photo + ")",
                                                            backgroundPosition: 'center',
                                                            backgroundSize: 'cover',
                                                            backgroundRepeat: 'no-repeat'
                                                          }}>
                          </div>
                          
                        

                          <div className="zero-img-profile-wrapper">
                          <img className="zero-img-profile" src={this.props.location.event_host_photo} />
                          </div>
                        <div className="line-uno">
                          {this.distance(this.props.location.geometry)}
                          {this.displayDateNormal(this.props.location.event_dateStart)} 
                        </div>
                        <div className="line-dos">
                        <h1>{this.props.location.event_name}</h1>
                        </div>
                        <div className="line-tres">
                        <h2>{this.props.location.addressGoogle ? <span>this.props.location.addressGoogle</span> : <span> -- </span>}</h2>
                        </div>
                        <div className="line-quatro">
                        <div className="guests-wrap">
                        {this.printGuestsPhoto(this.props.location.EventGuests)}
                        </div>
                        <img className='open-map-mark' src={mapIcon} />
                        </div>
                    </div>
                  </div>
              </Link>
            }
            </span>
		)
  }
}

