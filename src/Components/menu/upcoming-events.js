import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import {Row, Col, Carousel } from 'react-bootstrap'
import _ from 'lodash';
import dateFormat from'dateformat';
import EventCard from '../event-card'
import './upcoming-events.css'

var mapIcon = 'https://res.cloudinary.com/party-images-app/image/upload/v1560561308/d26rn1jtjgb6gcazcm1d.png'
var Slide1V = 'https://res.cloudinary.com/party-images-app/image/upload/v1560655225/ixjkpubucrzmhv7lq9ix.png'
  var Slide2V = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109084/kif6z7znemsn8uh7ovr2.png'
  var Slide3V = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109084/fbfbdfo8eiuowxmko7dd.png'
  

export default class UpcomingEvents extends Component {

      constructor(props) {
    super(props);
    this.state = {
      venuesAll: [],
      fetched: false
      }
  }

  componentDidMount(){
     console.log("did mount from UPCOMING EVENTS: date: ", Date())
     console.log(Date())
     var today = new Date().getDate()
     var tmr = new Date().setDate(today + 1)
     var transfer = new Date(tmr)
      console.log("tmr: ", transfer)
    this.fetchAllSingle()
  }

  fetchAllSingle = () => {

    var today = new Date().getDate()
     var tmr = new Date().setDate(today + 3)
     var transfer = new Date(tmr)

    this.setState({fetchingLocations: true, fetchStatus: 'LOADING...'})
          console.log("fetch ALL venues MAP.js")
            fetch('/api2/all-venues', {
            method: 'POST',
            mode: "same-origin",
            headers: {
            Accept: 'application/json',
                    'Content-Type': 'application/json',
                    },
            body: JSON.stringify({
                                  singleD: Date(),
                                  singleDTmr: transfer
                                   }),
              }).then(res => res.json())
          .then(points => {
            this.setState({venuesAll: points.docs, fetchingLocations: false, fetchStatus: 'LOADED', fetched: true }, () => {
                
                 console.log("Points from MONGO UPCOMING EVENTS")
                 console.log(points.docs)
            })
          }
        )
      }

      printItems = () => {
        console.log("this.state.venuesAll: ", this.state.venuesAll.length)
          if (this.state.fetched) {
            console.log("FERTCHED DONE")
            return(
              _.map(this.state.venuesAll, (location, index) => 
                 <Carousel.Item>
             <EventCard location={location} index={index} workingLocationGate={this.props.workingLocationGate} />
            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>
                 
                
             )
               )
          } else{
            console.log("FERTCHED NOT")
          }
         
      } 


render(){

  console.log("this.props from UPCOMING EVENTS:", this.props)

	return(
     <Row className="row-carousel-sydney-events animated fadeInRight" >
       <Col className="col-carousel-sydney-events" xs={12} md={12} >
       <Carousel>

            {this.printItems()}
          <Carousel.Item>
            <img
              className="carousel-upcoming-img"
              src={Slide1V}
              alt="Third slide"
            />
            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>
          
        </Carousel>
       </Col>
      </Row>
		)
  }
}

