import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col, Button, Image, Tooltip, OverlayTrigger, Glyphicon, Modal, Alert } from 'react-bootstrap'
import GeolocationMarker from 'geolocation-marker'
import { Link , NavLink , Redirect , withRouter } from 'react-router-dom'
//import {polygon} from 'polygon-tools';
import _ from 'lodash';
import Gallery from 'react-grid-gallery';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import dateFormat from'dateformat';

import history from './history';
import './map.css';
import mapSetup from './Components/settings-export/map';
//import Nav from './Components/nav';
import InfoWindow from './Components/infowindow';
import EventCard from './Components/event-card'
//import SlidePanel from './Components/map-slider-panel';

//import NoUser from './img/no-user-white.png'

var NoUserV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109083/xyty8m0wsw6rxfmgeur7.png'
var CrowdV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109081/cag6qaz1gphb1er3510g.png'
var EmailV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552979848/hapnjhk6atnytpeczpf7.png'
var DoneV = 'https://res.cloudinary.com/party-images-app/image/upload/v1553485009/dvnjw7htgrl3wui8kfsu.png'
var HomeV = 'https://res.cloudinary.com/party-images-app/image/upload/v1555495981/zweyltxvnf6b73g8uxtx.png'
//var SpinnerV = 'https://res.cloudinary.com/party-images-app/image/upload/v1557737068/iphyq459yzdditwr3dla.png'
var SpinnerV = 'https://res.cloudinary.com/party-images-app/image/upload/v1558013750/f6miqwq5hs4ipee43rbj.png'
//var DoneSpinV = 'https://res.cloudinary.com/party-images-app/image/upload/v1557738021/qnmkideexhfipehof6ac.png'
var DoneSpinV = 'https://res.cloudinary.com/party-images-app/image/upload/v1558013750/z7wpupaxyus7aznokx7l.png'
var CurLocV = 'https://res.cloudinary.com/party-images-app/image/upload/v1557737697/lsq8qt4wl4h3sxap1aym.png'
var CurLocBlueV = 'https://res.cloudinary.com/party-images-app/image/upload/v1557739002/euz2tlhqgdwypyonkcrn.png'

var map;
var infoBubble;
var InfoBevent = false;
var previousMarker;
var uniqueArrayOfId = [{'_id': '1'}];
var CurLocObj;
//var displayedVenues = [];

var offset = (new Date()).getTimezoneOffset() * 60000
var todayDefault = new Date()
var trueToday = new Date(new Date(todayDefault).valueOf() - offset)


var split = trueToday.toISOString().split("T")
console.log("SPLIT TODAY DEFAULT SEARCH: ", split)
var tmr = new Date(new Date(todayDefault).valueOf() - offset)
tmr.setDate(tmr.getDate() + 1)
var splitTmr = tmr.toISOString().split("T")
console.log("SPLIT TODAY DEFAULT SEARCH: ", splitTmr)
// var oneWeek = new Date()
// oneWeek.setDate(today.getDate() + 7); 

var tmr00 = new Date(splitTmr[0])
console.log("tmr vs tmr00: ", tmr )
console.log("tmr vs tmr00: ", tmr00 )

      console.log("singleDOff EASY: ", new Date(new Date(todayDefault).valueOf() + offset))
      console.log("singleDTmrOff EASY: ", new Date(new Date(tmr00).valueOf() + offset))

        var dateTmr = new Date(split[0])
        dateTmr.setDate(dateTmr.getDate() + 1)
        console.log("singleDTmrOff EASY: ", new Date(new Date(dateTmr).valueOf() + offset))

class Map extends Component {
    constructor(props) {
    super(props);
    this.displayMap = this.displayMap.bind(this)
    this.state = {
      venues: [],
      venuesAll: [],
      displVenues: [],
      ClickedPosition: [],
      workingZoom: '',  // Not using right now (problem with re-rendering)
      workingPrice: '', // Price choosen for rendering
      fetchingLocations: false,
      fetchStatus: 'start',
      displVenuesState: undefined,
      redirectLogin: false,
     startD: todayDefault,
     scoopSmall: false,
//   endD: oneWeek,
     singleD: split[0],
     singleDTmr: splitTmr[0],
     singleDMongo: new Date(new Date(todayDefault).valueOf()),
     singleDTmrMongo:  new Date(new Date(dateTmr).valueOf() + offset),

     // singleD: {this.props.XsingleD ? this.props.XsingleD : split[0]},
     // singleDTmr: {this.props.XsingleDTmr ? this.props.XsingleDTmr : splitTmr[0]},
     // singleDMongo: {this.props.singleDMongo ? this.props.singleDMongo : new Date(new Date(todayDefault).valueOf())},
     // singleDTmrMongo: {this.props.singleDTmrMongo ? this.props.singleDTmrMongo : new Date(new Date(dateTmr).valueOf() + offset)}, 

     isPaneOpen: false,

     //joinedEmail: '',
     showMailAlert: '',
     showMailSent: false,
     showJoinedAlert: '',
     showJoinedAlertConfirm: '',
     //show confirm Attend states
     showConfirm: false,
     confirmedPressed: false,
     eventImagesArr: undefined,

      }
  }


  componentDidMount(){

    uniqueArrayOfId = []
    console.log("componentDidMount map.js this: ", this)
    console.log("todat DATE: ", split)

    var lastTouchEnd = 0;
    document.getElementById('chevron').addEventListener('touchend', function (event) {
    console.log('TOUCHED CHEVRON')
    var now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
        event.stopPropagation()
        alert('PREVERT')
    }
    lastTouchEnd = now;
    }, false);
    var lastTouchEndB = 0;
    document.getElementById('chevron-btn').addEventListener('touchend', function (event) {
    var now = (new Date()).getTime();
    if (now - lastTouchEndB <= 300) {
        event.preventDefault();
        event.stopPropagation()
        alert('did not stopped propagating')
    }
    lastTouchEnd = now;
    }, false);

if (!window.AppHistory) {
    window.AppHistory = this.props.history;
}
    this.displayMap()
    this.fetchAllSingle()
}



shouldComponentUpdate(nextProps, nextState){
  console.log("shouldComponentUpdate MAP SPANITA")
  console.log(nextState)
  console.log(this.state)
if (nextState == this.state) {
  console.log("STATES THE SAME")
} else{
  console.log("STATES DIFFERENT")
}
  console.log("PROPS")
  console.log(nextProps)
  console.log(this.props)

if (nextProps == this.props) {
  console.log("PORPS THE SAME")
} else{
  console.log("PROPS DIFFERENT")
}

if (nextProps.location.state == this.props.location.state) {
  console.log("PORPS LOCATION THE SAME")
} else{
  //this.forceRerender()
  console.log("PROPS LOCATION DIFFERENT")
}

return true
}

forceRerender = () => {
  uniqueArrayOfId = [{'_id': '1'}];
  this.displayMap()
  if (this.props.isLoggedIn) {
      this.props.fetchUserInfoId()
  }
  this.fetchAllSingle()

}

displayMap(){

  if (this.props.workingLocationGate[1]) {
        this.fetchNearVenues()
  }

console.log("this.props.workingLocationGate")
console.log(this.props.workingLocationGate[0])

     var LandL;
      var Zoom;
  if (this.props.scrolledPositioGate[0] && this.props.scrolledZoomGate !== 0) {
        console.log("there is SCROLLED POSITION!!")
        LandL = [this.props.scrolledPositioGate[0] , this.props.scrolledPositioGate[1]]
        Zoom = this.props.scrolledZoomGate
    } else{
        console.log("SCROLLed NOO")
        if (this.props.workingLocationGate[0] == undefined) { //loading this location on  backgrould of Jumbo
          LandL = [-33.89 , 151.27];
          Zoom = 10
        } else { 
          LandL = [ this.props.workingLocationGate[0], this.props.workingLocationGate[1] ];
          Zoom = 12;
        }

    }


    map = new window.google.maps.Map(document.getElementById('map'), {
    center: {lat: LandL[0], lng: LandL[1]},
    zoom: Zoom,
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeId: window.google.maps.MapTypeId.ROADMAP,
    clickableIcons: false,
    gestureHandling: "greedy", 
    styles: mapSetup, //exported from outside this js
  });

    var opt = { minZoom: 5, maxZoom: 20 };
    map.setOptions(opt);  

this.renderAwayMap()

}



renderAwayMap = (displayedVenues) => {


  var GeoMarker = new window.GeolocationMarker(map);
  var bounds = new window.google.maps.LatLngBounds()
  console.log("BEFORE PRING TNFB: window.cislo: ", window.cislo)
  infoBubble = new window.InfoBubble({
          //content: `<div id="infoWindow"> </div>`, 
          content: `<div id="infoWindow"> </div>`, 
          shadowStyle: 1,
          padding: 0,
          backgroundColor: "#242323",
          borderRadius: 0,
          arrowSize: 10,
          borderWidth: 0,
          borderColor: "#ffffff",
          disableAutoPan: true,
          hideCloseButton: true,
          arrowPosition: 50,
          backgroundClassName: 'nonused',
          enableEventPropagation: false,
          arrowStyle: 0,
          minWidth: 200,
          minHeight: 220,
        })
    
var here = this;

      infoBubble.addListener('click', event => {

        console.log("infoBubble.addListener('click' FIRST: window.google.maps.event: ", window.google.maps.event)
    // event.stop();
    // event.cancelBubble = true;
    // if (event.stopPropagation) {
    //     event.stopPropagation();
    // }
    // if (event.preventDefault) {
    //     event.preventDefault(); 
    // } else {
    //     event.returnValue = false;  
    // }
     })

// var infB = document.getElementById('infoWindow')

//       var aListener = window.google.maps.event.addListener(infoBubble , 'click', function(event) {
//     // Try to prevent event propagation to the map
//     console.log("infoBubble.addListener('click' SECOND")
//     InfoBevent = true
//     event.stop();
//     event.cancelBubble = true;
//     if (event.stopPropagation) {
//         event.stopPropagation();
//     }
//     if (event.preventDefault) {
//         event.preventDefault(); 
//     } else {
//         event.returnValue = false;  
//     }
// });


  map.addListener('click', function(event) { 

    console.log("Listener from MAP CLICK")
    console.log("previousMarker")
    console.log(previousMarker)

    here.setState({confirmedPressed: false})
           
          if (previousMarker && !InfoBevent){  //close the last new location marker and window on click on map
                console.log("EVENT from Map previousMarker && !InfoBevent")
                infoBubble.close();
                setTimeout(() => {
                  if (document.getElementById('infoWindow')) {
                        ReactDOM.unmountComponentAtNode(document.getElementById('infoWindow'))
                  }  
              }, 10) 
                //infoBubble.setMap(null);
                previousMarker = undefined;
          }  
          if (previousMarker) {
            console.log("EVENT from Map outside Infobubble")
            infoBubble.close();
            previousMarker = undefined;
          }   
        
    
  });


        //   var SumPoly = [[[0,0], [1,0], [1,1], [1,2], [0,1]], [[0,0], [1,0], [1,1], [0,1]]]

        //       var POLY_A = [
        //   [0, 0],
        //   [100, 0],
        //   [100, 100],
        //   [0, 100]
        // ];

        map.addListener('idle', function() {
                  console.log("Maapa IDL__E___E___E")
                 // console.log("SumPoly", SumPoly)
                  var bounds =  map.getBounds();
                  var center = map.getCenter();

                  console.log("ZOOOM: ", map.getZoom())
                  var ne = bounds.getNorthEast();
                  var sw = bounds.getSouthWest();
                  // console.log(ne)
                  // console.log(sw)
                  // console.log(JSON.stringify(ne.lng()), JSON.stringify(ne.lat()), JSON.stringify(sw.lng()) , JSON.stringify(sw.lat()))
                  //  var ne1 = new Number(JSON.stringify(ne.lng()))
                  //  var ne2 = new Number(JSON.stringify(ne.lat()))
                  //  var sw1 = new Number(JSON.stringify(sw.lng()))
                  //  var sw2 = new Number(JSON.stringify(sw.lat()))
                    
    // var newPoly0 = [[sw1, sw2], [ne1, sw2], [ne1, ne2], [sw1, ne2]]  
    // var newPoly = [[sw1, sw2], [ne1, sw2], [ne1, ne2], [sw1, -33.8]]
    // var newPoly2 = [[sw1, sw2], [ne1, sw2], [ne1, ne2], [sw1, -33.9]]
    // console.log("newPoly", newPoly)

    // var SumPolyWork = SumPoly

    // console.log("...SumPolyWork")
    // console.log(...SumPolyWork)

    // SumPoly = polygon.union(...SumPolyWork , POLY_A);
    // console.log("SumPoly", SumPoly)
    here.props.setScrolledPosition([center.lat(), center.lng()], map.getZoom())
    here.fetchBoundariesSingle(ne,sw)

     })

    }

changeDateRange = (startD, endD) => {
  console.log("MAP.js changeDateRange()", startD, endD)
  this.setState({startD: startD, endD: endD}, () => {
    this.forceRerender()

  })
}

// fetchBoundaries = (ne, sw) => {
//   this.setState({fetchingLocations: true, fetchStatus: 'LOADING...'})
//         console.log("fetchBoundaries from APP")
//           fetch('/api2/boundaries', {
//           method: 'POST',
//           mode: "same-origin",
//           headers: {
//           Accept: 'application/json',
//                   'Content-Type': 'application/json',
//                   },
//           body: JSON.stringify({ne1: JSON.stringify(ne.lng()), 
//                                 ne2: JSON.stringify(ne.lat()),  
//                                 sw1: JSON.stringify(sw.lng()), 
//                                 sw2: JSON.stringify(sw.lat()),
//                                 startD: this.state.startD,
//                                 endD: this.state.endD,
//                                  }),
//             }).then(res => res.json())
//         .then(points => {
//           this.setState({venues: points.docs, fetchingLocations: false, fetchStatus: 'LOADED'}, () => {
//               this.justPrintMarker(points.docs)
//                console.log("Points from MONGO")
//                console.log(points.docs)
//           })
//         }
//       )
//     }

fetchAllSingle = () => {

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
                                singleD: this.state.singleDMongo,
                                singleDTmr: this.state.singleDTmrMongo,
                                 }),
            }).then(res => res.json())
        .then(points => {
          this.setState({venuesAll: points.docs, fetchingLocations: false, fetchStatus: 'LOADED'}, () => {
              this.justPrintMarker(points.docs)
               console.log("Points from MONGO")
               console.log(points.docs)
          })
        }
      )
    }


fetchBoundariesSingle = (ne, sw) => {

  this.setState({fetchingLocations: true, fetchStatus: 'LOADING...'})
        console.log("fetchBoundaries from APP")
          fetch('/api2/boundariesSingle', {
          method: 'POST',
          mode: "same-origin",
          headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  },
          body: JSON.stringify({ne1: JSON.stringify(ne.lng()), 
                                ne2: JSON.stringify(ne.lat()),  
                                sw1: JSON.stringify(sw.lng()), 
                                sw2: JSON.stringify(sw.lat()),
                                singleD: this.state.singleDMongo,
                                singleDTmr: this.state.singleDTmrMongo,
                               
                                 }),
            }).then(res => res.json())
        .then(points => {
          this.setState({venues: points.docs, fetchingLocations: false, fetchStatus: 'LOADED'}, () => {
              this.justPrintMarker(points.docs)
               console.log("Points from MONGO")
               console.log(points.docs)
          })
        }
      )
    }

    fetchNearVenues = () => {
console.log("RESPONCE FETCH NEAR: before")
                fetch('/api2/nearVenues', {
          method: 'POST',
          mode: "same-origin",
          headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  },
          body: JSON.stringify({workingLocationGate: this.props.workingLocationGate,
                                singleD: this.state.singleDMongo,
                                singleDTmr: this.state.singleDTmrMongo,
                               
                                 }),
            }).then(res =>{
              console.log("fetch Near status: ", res.status)
              if (res.status == 200) {
                    return res.json()
              }
            } )
              .then(points => {
                  console.log("RESPONCE FETCH NEAR:", points)
              }
            )
    }

justPrintMarker(displayedVenues){ 

console.log("justPrintMarker v APP") 
console.log("displayedVenues") 
console.log(displayedVenues) 

var UniqArr = []

 for(var i=0; i<displayedVenues.length; i++) {

  if (displayedVenues[i].IsThisUser == true ) {
    console.log("This is not party but USER", displayedVenues[i].userName)
  }
    if (uniqueArrayOfId.indexOf(displayedVenues[i]._id) == -1 && displayedVenues[i].IsThisUser !== true &&  displayedVenues[i].confirmed == true) {
      uniqueArrayOfId.push(displayedVenues[i]._id)
      UniqArr.push(displayedVenues[i]) 
    } else{
    }
 }
    var here = this


var AllMarkersArr = UniqArr.map((location, i) => {

      var urlNA = "https://res.cloudinary.com/party-images-app/image/upload/v1557626853/j4fot5g2fvldzh88h9u4.png"
      //var urlAttend = "https://res.cloudinary.com/party-images-app/image/upload/v1557648350/caacy89b65efjmwjiho8.png"
      var urlAttend = 'https://res.cloudinary.com/party-images-app/image/upload/v1558048597/lo7digag5hz5alymniwz.png' 
      var url = urlNA

      _.map(location.EventGuests, (guest, index) => {
       
        if (here.props.email.indexOf(guest.guest_email) !== -1 && guest.guest_confirmed == true) {
          url = urlAttend
        }
      })

    var image = {
        url: url,
        size: new window.google.maps.Size(48, 48),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(24, 48),
        scaledSize: new window.google.maps.Size(48, 48)
      };


    var marker = new window.google.maps.Marker({
      position: {lat: location.geometry.coordinates[1],
                 lng: location.geometry.coordinates[0]}, 
      map: map,
      icon: image,
      animation: window.google.maps.Animation.DROP,
      title: location.name,
    })



     // Listener on the Location marker
    marker.addListener('click', function() {

        console.log("Marker click listener PREV MARKER: ", previousMarker)
        window.activeLocation_id = location._id

      if (previousMarker) {
            infoBubble.close()
            previousMarker = undefined
      } else{
          infoBubble.addListener('domready', e => {
              setTimeout(() => {
                console.log("PRING INFOW...")
          ReactDOM.render(<InfoWindow  
                                      lat={location.geometry.coordinates[1]} 
                                      lng={location.geometry.coordinates[0]} 
                                      id={location._id} 
                                      {...here.props}
                                      location={location} 
                                      redirectLogin={here.redirectLogin} 
                                      forceRerender={here.forceRerender}
                                      handleOpenModalJoinMAP={here.handleOpenModalJoinMAP}
                                      handleShowJoinedAlertConfirm={here.handleShowJoinedAlertConfirm}
                                      handleShowMailSent={here.handleShowMailSent}
                                      AttendingLocationHandler={here.AttendingLocationHandler}
                                      openGalleryMap={here.openGalleryMap}
                                       /> 
                                      , document.getElementById('infoWindow'))}, 100 ) 
            })
      infoBubble.open(map, marker);
      previousMarker = location;
      }   
    })
    console.log("marker === konec printingu")

    console.log("Mame active location??..BEFORE..", window.activeLocation_id)
    console.log("..BEFORE..")

    if (window.activeLocation_id == location._id) {

          infoBubble.open(map, marker);

              setTimeout(() => {
                console.log("Mame active location??...", window.activeLocation_id)
          ReactDOM.render(<InfoWindow  
                                      lat={location.geometry.coordinates[1]} 
                                      lng={location.geometry.coordinates[0]} 
                                      id={location._id} 
                                      {...here.props}
                                      location={location} 
                                      redirectLogin={here.redirectLogin} 
                                      forceRerender={here.forceRerender}
                                      handleOpenModalJoinMAP={here.handleOpenModalJoinMAP}
                                      handleShowJoinedAlertConfirm={here.handleShowJoinedAlertConfirm}
                                      handleShowMailSent={here.handleShowMailSent}
                                      AttendingLocationHandler={here.AttendingLocationHandler}
                                      openGalleryMap={here.openGalleryMap}
                                       /> 
                                      , document.getElementById('infoWindow'))}, 100 ) 

    }


  return marker  //important to make array from markersJS
})


var mcOptions = {
  minimumClusterSize: 15,
  styles: [{
      anchor:[0,0],
      textColor: 'black',
      textSize: 18,
      height: 56,
      width: 56,
      url: "https://res.cloudinary.com/party-images-app/image/upload/v1552174078/flxo0n4o6uvchmvmumlp.png",
             }]}

  var markerCluster = new window.MarkerClusterer(map, AllMarkersArr, mcOptions);





 
console.log("uniqueArrayOfId AFTER") 
console.log(uniqueArrayOfId)

}


redirectLogin = () => {
  console.log("redirect Login fce from map.js")
  setTimeout(() => { this.setState({redirectLogin: true}) }, 3000);
}

handleOpenCloseConfirm = (event) => {
  console.log("FCE: handleOpenCloseConfirm")
  this.setState({showConfirm: !this.state.showConfirm, confirmedPressed: false})
}

handleCloseAlertMail = () => {
 console.log("FCE handleOpenCloseJoinedMAP")
  this.setState({showMailAlert: false})   
}

handleCloseAlertJoined = () => {
 console.log("FCE handleOpenCloseJoinedMAP")
  this.setState({showJoinedAlert: false})   
}

handleOpenModalJoinMAP = () => {
    console.log("FCE handleOpenJoinedGATE")
    this.setState({joinedEmail: this.props.email , showMailAlert: true, showJoinedAlert: true})
}

handleShowMailSent = () => {
  this.setState({showMailSent: true}, () => {
    this.closeLaterMail()
  })
}

closeLaterMail = () => {
            setTimeout(() => { 
            this.setState({showMailAlert: false, showMailSent: false}) }, 3000)
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

AttendingLocationHandler = (location) => {
  this.setState({AttendingLocation: location, showConfirm: true})
}

attendEvent = () => {

  this.setState({confirmedPressed: true}, () => {
    this.handleOpenModalJoinMAP()
    this.handleOpenCloseConfirm()
  }
  )

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
            creatorEmail: this.state.AttendingLocation.creatorEmail,
            event: this.state.AttendingLocation

          }),
            }).then((res) => {
              console.log("RESPONSE EMAIL: " , res)
              console.log("res.RESPONSE: " , res.status)
              if (res.status == 200) {
                  this.handleShowMailSent()
              }
            })

      fetch('/api2/add-attend', {
          method: 'POST',
          mode: "same-origin",
          headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  },
          body: JSON.stringify({
            event_id: this.state.AttendingLocation._id,
            event_name: this.state.AttendingLocation.name,
            event_price: this.state.AttendingLocation.price,
            event_photo: " url photo of event",
            event_dateStart: this.state.AttendingLocation.dateStart,
            user_id: this.props.user_id,
            user_name: this.props.name,
            user_email: this.props.email,
            user_photo: this.props.picture,
          }),
            }).then((res) => {
            console.log("RESPONSE ATTEND: " , res)
            if (res.status == 200) {
                  this.handleShowJoinedAlertConfirm()
                  this.forceRerender()
            }      
            }
            )
}

openGalleryMap = (ImagesArr) => {
  console.log("openGalleryMap ==>>>")
  this.setState({eventImagesArr: ImagesArr})
}

closingGallery = () => {
  console.log("closingGallery FCE", document.getElementById('gallery-overlay'))
  //document.getElementById('gallery-overlay').classList.add('gone')
  this.setState({eventImagesArr: undefined}, () => {
    console.log("closingGallery FCE DONE")
  })
}

zoomOnUser = () => {

  console.log("zoomOnUser: ", this.props.workingLocationGate)
  map.panTo({lat: this.props.workingLocationGate[0], lng: this.props.workingLocationGate[1]})
  map.setZoom(13)
  let opt = {
    zoom: 13,
    center: {lat: this.props.workingLocationGate[0], lng: this.props.workingLocationGate[1]},
  }
  //map.setOptions(opt); 
}

addCountDay = () => {

        var date = new Date(this.state.singleD)
        var dateTmr = new Date(this.state.singleD)
        var offset = (new Date()).getTimezoneOffset() * 60000
        // var nowAndHere = new Date(Date.now()-offset)
        // console.log("Date ++ : ", date)
        date.setDate(date.getDate() + 1)
        dateTmr.setDate(dateTmr.getDate() + 2)
        //console.log("OFFSET: ", offset)
        // console.log("Date -->", Date)
        // console.log("dateTmr -->", new Date(dateTmr).valueOf())
        // console.log("dateTmr -->", new Date(date).valueOf())
        // var TodayOff = new Date(date).valueOf() + offset
        // var TmrOff = new Date(dateTmr).valueOf() + offset

        // console.log("TodayOff: ", TodayOff)
        // console.log("TmrOff: ", TmrOff)

        console.log("singleDOff EASY: ", new Date(new Date(date).valueOf() + offset))
        console.log("singleDTmrOff EASY: ", new Date(new Date(dateTmr).valueOf() + offset))

        //just for input value
        var split = date.toISOString().split("T")
        var splitTmr = dateTmr.toISOString().split("T")
        // var newDate = split[0]
        // var newDateTmr = splitTmr[0]

        this.setState({ singleD: split[0], 
                        singleDTmr: splitTmr[0], 
                        singleDMongo: new Date(new Date(date).valueOf() + offset) , 
                        singleDTmrMongo: new Date(new Date(dateTmr).valueOf() + offset)
                      }, () => {
          this.forceRerender()
          this.fetchAllSingle()
        })
      }

minusCountDay = () => {

      var date = new Date(this.state.singleD)
      var dateTmr = new Date(this.state.singleD)
      date.setDate(date.getDate() - 1)
      dateTmr.setDate(dateTmr.getDate())
      var offset = (new Date()).getTimezoneOffset() * 60000

      console.log("singleDOff EASY: ", new Date(new Date(date).valueOf() + offset))
      console.log("singleDTmrOff EASY: ", new Date(new Date(dateTmr).valueOf() + offset))

      var split = date.toISOString().split("T")
      var splitTmr = dateTmr.toISOString().split("T")
      var newDate = split[0]
      var newDateTmr = splitTmr[0]

      // this.props.setWorkingTime(newDate, 
      //                           new Date(new Date(date).valueOf() + offset), 
      //                           newDateTmr,     
      //                           new Date(new Date(dateTmr).valueOf() + offset))

      this.setState({ singleD: newDate, 
                      singleDMongo: new Date(new Date(date).valueOf() + offset) ,
                      singleDTmr: newDateTmr,
                       
                      singleDTmrMongo: new Date(new Date(dateTmr).valueOf() + offset)
                    }, () => {
         this.forceRerender()
         this.fetchAllSingle()
        })
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

printGuestsPhoto = (EventGuests) => {
 
   return( _.map(EventGuests, (guest, index) => 
              <img className='img-guest' src={guest.guest_photo} />  
        ))
}
//
distance = (geometry) => {
  if (this.props.workingLocationGate[1]) {}
      var x = new window.google.maps.LatLng(this.props.workingLocationGate[0], this.props.workingLocationGate[1])
      var y = new window.google.maps.LatLng(geometry.coordinates[1], geometry.coordinates[0])
      var distance = window.google.maps.geometry.spherical.computeDistanceBetween(x,y)
      distance = Math.round(distance/1000) 
      return(<p>{distance} km</p>)
     }

//

  toggleSlidePanel = () => {
    this.setState({ isPaneOpen: !this.state.isPaneOpen})
  }
  
  printSlider = () => {
   
if (!this.state.fetchingLocations) {

  if (this.state.venues.length) {

     console.log("this.state.venues are there:??: pass ", this.state.venues)
    return(_.map(this.state.venues, (location, index) =>
              <EventCard location={location} index={index} isLoggedIn={this.props.isLoggedIn} workingLocationGate={this.props.workingLocationGate} />
          ))     
    
  }else{

    return(
      <div className="slider-location">
                    <div className="slider-location-top">
                      <p>No events found</p>
                    </div>

                    <div className="slider-location-body">
                      <div className="location-img-wrapper">
                        
                      </div>
                      <p>resize area or change date</p>
                    </div>
                  </div>)         
        }
      } else{
            return(
            <div className="slider-location">
                          <div className="slider-location-top">
                            <p>Loading...</p>
                          </div>

                          <div className="slider-location-body">
                            <div className="location-img-wrapper">

                            </div>
                            <div className="spinner-wrap-slider">
                                <img className="loading-spinner" src={SpinnerV}/> 
                            </div>
                            
                          </div>
                </div>
                        )
      }


  }
//

    printSliderAll = () => {
   
if (!this.state.fetchingLocations) {

  if (this.state.venuesAll.length) {

     console.log("this.state.venues are there:??: pass ", this.state.venuesAll)
    return(_.map(this.state.venuesAll, (location, index) =>
              <EventCard location={location} index={index} isLoggedIn={this.props.isLoggedIn} workingLocationGate={this.props.workingLocationGate} />
          ))     
    
  }else{

    return(
      <div className="slider-location">
                    <div className="slider-location-top">
                      <p>No events found</p>
                    </div>

                    <div className="slider-location-body">
                      <div className="location-img-wrapper">
                        
                      </div>
                      <p>resize area or change date</p>
                    </div>
                  </div>)         
        }
      } else{
            return(
            <div className="slider-location">
                          <div className="slider-location-top">
                            <p>Loading...</p>
                          </div>

                          <div className="slider-location-body">
                            <div className="location-img-wrapper">

                            </div>
                            <div className="spinner-wrap-slider">
                                <img className="loading-spinner" src={SpinnerV}/> 
                            </div>
                            
                          </div>
                </div>
                        )
      }


  }

  changeScoop = (e) => {
    console.log("Event SCOOP:")
    console.log(e)
    this.setState({scoopSmall: !this.state.scoopSmall})
    }

//

  render() {
const navbar = { backgroundColor: 'transparent' };

console.log("rendering map.js window OBJ: ", window)
console.log("this.state.startD render()")
console.log(this.state.startD)

      if (this.state.redirectLogin === true) {
    return(<Redirect to='/login' />) 
  }

  // if (this.props.location.state) {
  //   console.log("DEFINED STATE AND CAN to reed")
  //   console.log(this.props.location.state)
  //   //this.forceRerender()
  // }

      // <Row id="nav-row" >
      //       <Nav isLoggedIn={this.props.isLoggedIn} picture={this.props.picture} />
      // </Row>

    return (

      <div className="Main">
      <Grid id="grid-map">
        
                    <SlidingPane
                        className='slider-main-class'
                        overlayClassName='overlay-slider-class'
                        isOpen={ this.state.isPaneOpen }
                        title='Events within your location'
                        
                        onRequestClose={ () => {
                            //this.applyRange()
                            this.setState({ isPaneOpen: false });
                        }}>
                          
                          <div className="future-date slider-picker disable-dbl-tap-zoom">
                          <div className="range-block-slider">
                            <button className="minus-btn" onClick={this.minusCountDay} >
                            <Glyphicon className="glyphicon glyphicon-minus" />
                            </button>
                              <div className="from-input-wrapper">
                                <input  id="dateFrom" 
                                        className='form-control' 
                                        name="startDate"
                                        value={this.state.singleD}  
                                        type="date" 
                                         />
                              </div>
                            <button className="plus-btn" onClick={this.addCountDay} >
                              <Glyphicon className="glyphicon glyphicon-plus" />
                            </button>
                          </div>
                          <div className="scoop">
                          <label>
                          <input type="radio" 
                                  name="gender"
                                  checked={this.state.scoopSmall}
                                  onClick={this.changeScoop} 
                                  value="true"/>
                          <span class="checkmark">
                          <span>zoomed Area {this.state.venues ? <span>{this.state.venues.length}</span> : <span>0</span>}</span>
                          </span>
                          </label>

                          <label>
                          <input type="radio" 
                                 name="gender"
                                 checked={!this.state.scoopSmall}
                                 onClick={this.changeScoop}  
                                 value="false"/>
                          <span class="checkmark">
                          <span>All {this.state.venuesAll ? <span>{this.state.venuesAll.length}</span> : <span>0</span>}</span>
                          </span>
                          </label>

                          </div>
                          </div> 
                          {this.state.scoopSmall ?
                          <span>{this.printSlider()}</span>
                          :
                          <span>{this.printSliderAll()}</span>
                        }
                    </SlidingPane>

          <Button className="toggle-slider-btn" onClick={this.toggleSlidePanel} >
           <Glyphicon className="glyphicon glyphicon-chevron-left" />
           </Button> 

    </Grid>

      <div id="map">
      </div>
      <div className="white-under-nav">
      </div>

       <div className="bottom-line-wrap disable-dbl-tap-zoom">
         <div className="future-date disable-dbl-tap-zoom" >
            <img src={CurLocBlueV} onClick={this.zoomOnUser} />

            <div className="range-block">
              <button className="minus-btn" 
                      id="chevron-btn" 
                      onClick={this.minusCountDay} 
                      disabled={this.state.fetchingLocations} >
                <Glyphicon className="glyphicon glyphicon-minus" id="chevron" />
              </button>
                <div className="from-input-wrapper">
                  <input  id="dateFrom" 
                          className='form-control' 
                          name="startDate"
                          value={this.state.singleD}  
                          type="date" 
                           />
                </div>
              <button className="plus-btn disable-dbl-tap-zoom" 
                      id="chevron-btn" 
                      onClick={this.addCountDay} 
                      disabled={this.state.fetchingLocations} >
                <Glyphicon className="glyphicon glyphicon-plus disable-dbl-tap-zoom" id="plus-chevron" />
              </button>
            </div>
          </div>
          <div className="spinner-map">
            {this.state.fetchingLocations ? 
              <img className="loading-spinner" src={SpinnerV}/> 
              : <img src={DoneSpinV}/>}
          </div>
       </div>

              <div className="mod-Alert">        

              <Modal show={this.state.showMailAlert || this.state.showJoinedAlert} className="floating-modal1" >
                  {this.state.showMailAlert ? 
                          <Alert bsStyle="info">
                                <div className="dismis-btn-actions" >
                                <Button onClick={this.handleCloseAlertMail} bsStyle="outline-success">
                                Close
                              </Button>
                                </div>
                                {this.state.showMailSent ? 
                                  <p>
                                  E-mail has been sent
                                     <div className="send-mail-wrap">
                                        <img className="send-mail" src={EmailV} />
                                     </div>
                                  </p>
                                     :
                                  <p>
                                  E-mail waiting to be send
                                   <div className="send-mail-wrap">
                                        <img className="send-mail-stopped" src={EmailV} />
                                     </div>
                                  </p>
                                }
                            </Alert >
                            :
                      <span> </span>
                      }
                  {this.state.showJoinedAlert ? 
                      <Alert show={this.state.showJoinedAlert} bsStyle="success">
                          <div className="dismis-btn-actions" >
                            <Button onClick={this.handleCloseAlertJoined}  bsStyle="outline-success">
                              Close
                            </Button>
                          </div>
                          {this.state.showJoinedAlertConfirm ?
                              <p>
                                Database updated
                                   <div className="send-mail-wrap">
                                     <img className="send-mail" src={DoneV} />
                                   </div>
                              </p>
                              :
                             <p>
                                Database is being updated
                                  <div className="send-mail-wrap">
                                      <img className="send-mail-stopped" src={DoneV} />
                                   </div>
                              </p>
                            }
                      </Alert>
                      :
                      <span> 
                      </span>
                  }
                  </Modal>
                  <Modal show={this.state.showConfirm} onHide={this.handleOpenCloseConfirm}>
                      <Alert className="alert-attend" show={true} bsStyle="success">
                        <h1>Confirm your attendance</h1>
                          {this.state.confirmedPressed ? 
                              
                                <div className="dismis-btn" >
                                 <Button bsStyle="success" disabled >Confirm</Button>
                                 <Button bsStyle="alert" disabled >Cancel</Button>
                                </div>
                              
                               :
                               
                               <div className="dismis-btn" >
                                <Button bsStyle="outline-success" onClick={this.attendEvent} ><Glyphicon glyph="glyphicon glyphicon-ok" />  Confirm</Button>
                                <Button bsStyle="outline-warning" onClick={this.handleOpenCloseConfirm} ><Glyphicon glyph="glyphicon glyphicon-remove" />  Cancel</Button>
                                </div>
                              
                            }
                      </Alert>
                  </Modal>

                  </div>

                    <Modal show={this.state.eventImagesArr} onHide={this.handleOpenCloseConfirm}>
                        <Alert className="alert-attend" show={true} bsStyle="success">
                        <h1>Gallery</h1>
                            <div className="gallery-overlay" id="gallery-overlay">
                            {this.state.eventImagesArr ? <Gallery images={this.state.eventImagesArr} 
                                                  isOpen={true}
                                                  backdropClosesModal={true} 
                                                  currentImage={this.state.eventImagesArr.length - 1}
                                                  lightboxWillClose={this.closingGallery}
                                                  rowHeight={0} /> : <span></span>}
                              </div>
                </Alert>
                      </Modal>


      </div>
    );
  }
}

export default withRouter(Map)


// function loadScript(url){
//   var index = window.document.getElementsByTagName("script")[0]
//   var script = window.document.createElement('script')
//   script.scr = url
//   script.async = true
//   script.defer = true
//   index.parentNode.insertBefore(script, index) 
// }


      // <div className="top-picker hideThis">
      //        <SlidePanel changeDateRange={this.changeDateRange} 
      //                                   startD={this.state.startD}
      //                                   endD={this.state.endD}
      //                                                />
      // </div>

