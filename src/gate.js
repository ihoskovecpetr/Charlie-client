import React, { Component } from 'react';
import { Button, Nav, Navbar, NavItem, Image, Row, Col, Modal } from 'react-bootstrap'
import { Switch, Route, NavLink, BrowserRouter as Router } from 'react-router-dom'
import StarRatingComponent from 'react-star-rating-component';

import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import MaterialIcon, {colorPalette} from 'material-icons-react';


//import history from './history';
import ScrollTop from './scroll-wrap'

import './gate.css'
import Menu from './Components/menu';
import Map from './map';
import Create from './Components/create';
import Login from './Components/login/login';
import User from './Components/user';
import About from './Components/about';
import Privacy from './Components/privacy';
import ModalEvent from './Components/modal-event';
import UserId from './Components/user-id';


var myCookies = {};
var loadedCookies = {};

var prevVgate = 120;
var evaluating = false;

var CrowdV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109081/cag6qaz1gphb1er3510g.png'
var CharliePinkV = 'https://res.cloudinary.com/party-images-app/image/upload/v1557794256/ojkgl1hkiljwij69njbb.png'

var ImportArr = [{
caption: "No more pictures for this Event",
src: "https://res.cloudinary.com/party-images-app/image/upload/v1551339472/m8bb30cuufo4vfzbgg7q.png",
thumbnail: "https://res.cloudinary.com/party-images-app/image/upload/v1551339472/m8bb30cuufo4vfzbgg7q.png",
thumbnailHeight: 10,
thumbnailWidth: 10,
},
{
caption: "No 2",
src: "https://res.cloudinary.com/party-images-app/image/upload/v1551339472/m8bb30cuufo4vfzbgg7q.png",
thumbnail: "https://res.cloudinary.com/party-images-app/image/upload/v1551339472/m8bb30cuufo4vfzbgg7q.png",
thumbnailHeight: 10,
thumbnailWidth: 10,
},
]


class Gate extends Component {

    constructor(props) {
    super(props);
    //this.changeAllpoints = this.changeAllpoints.bind(this)

    this.state = {
      location: 'map',
      value: 1,
      venuesFromMongo: {docs: [{name: ' ', lat: ''}]},
      workingLocationGate: [],
      scrolledPositioGate: [],
      scrolledZoomGate: 0,
      isLoggedIn: false,
      user_id: '',
      name: '',
      email: '',
      picture: '',
      userDetails: [],
      savedCookie: 'no saved Cookie so far',
      loadedCookie: 'no loaded Cookie',
      //playIntro: false,

      isUpdating: false,
      updatingValues: [],

      showJoined: false,
      showCharged: false,
      rolledUp: false,
      }
  }

    shouldComponentUpdate(nextProps, nextState){
  console.log("shouldComponentUpdate GATE")
  console.log("this.props" , this.props)
  console.log("nextProps" , nextProps)
  console.log("this.state" , this.state)
  console.log("nextState" , nextState)
    return true

}

    componentDidMount(){

   console.log("componentDidMount GATE")
    this.poloha() 
    this.loadCookies()

      document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {edge: 'right'});
  });


}

// playIntroFce = () => {
//   this.setState({playIntro: true})
// }

// playIntroFceShut = () => {
//   this.setState({playIntro: false})
// }

updatingShip = (event) => {
  console.log("GATE - updatingShip: value: ")
  this.setState({ isUpdating: true, 
                  updatingValues: event
                })
}

cancelUpdatingGate = () => {
    this.setState({ isUpdating: false, 
                  updatingValues: []
                })
}


fetchWholeDB(){
  console.log("fce fetchWholeDB")
        fetch('/db', { method: 'get', mode: 'no-cors',  headers: {
                 Accept: 'application/json',
         'Content-Type': 'application/json',
                  }, })
        .then(res => res.json())
        .then(points => {
          this.setState({venuesFromMongo: points}, () =>{
            console.log("Fetch Whole DB -- == -- coffee from GATE")
    
                // if (this.state.Allpoints) {
                //   console.log("Redirecting Allpoints TRUE")
                //   this.setState({AllpointsRender: true})
                // }
            //this.showAway()  // displaying map on the backgroung with atribute undefined as a choosen price
          })}) 
}

saveCookies = (user_idV) => {
  console.log("jsem v saveCookies fci: ", this.state.name, user_idV)
  myCookies['_user_id'] = user_idV
  document.cookie = "";
  var expiresAttrib = (new Date(Date.now() + 60*60*1000*24)).toString()
  console.log(myCookies)
  console.log("document.cookie: ", window.document.cookie)
  var cookieString = ''

  for (var key in myCookies){
    cookieString = key + '=' + myCookies[key] + ';' + expiresAttrib + ';';
    console.log('SAVING TO COOKIE', cookieString )
    document.cookie = cookieString
  }
   console.log("document.cookie AFTER: ", window.document.cookie)
   this.setState({savedCookie: window.document.cookie})
}

loadCookies = () => {
  console.log("COOKIES: ", document.cookie)
  loadedCookies = {};
  var kv = document.cookie.split(';')
  for (var id in kv){
    console.log("LOADING COOKIE: ", kv[id])
    var cookie = kv[id].split('=')  //('=') 
    console.log("LOADING COOKIE after split(): ", cookie)
    loadedCookies[cookie[0].trim()] = cookie[1]
  }

  console.log("loadedCookies: ", loadedCookies)
  if (loadedCookies._user_id !== 'undefined' && loadedCookies._user_id ) {
    console.log("we do have _user_id: ", loadedCookies._user_id)
    //fetch data from mongo o userovi
      this.setState({user_id: loadedCookies._user_id, rolledUp: true, loadedCookie: document.cookie},
        () => {
          this.fetchUserInfoId()
        })
  } else{
        //this.playIntroFce()
  }
}



  poloha(){
        if (navigator.geolocation) {
          console.log("Geolocation is supported FROM GATE");
      navigator.geolocation.getCurrentPosition(this.showPosition.bind(this));

    } else { 
       console.log("Geolocation is not supported by this browser. FROM GATE fetching all points");
       this.fetchWholeDB()
    }
}

  showPosition(position){
    console.log("showPosition fce")
      this.setState(
  { workingLocationGate: [position.coords.latitude, position.coords.longitude ] },
  () => {
    console.log("Current GPS gained --------------------- FROM GATE")
    //       if (this.state.Allpoints) {
    //   this.fetchWholeDB()
    // } 
  } // this callback renders coffees on the map
);
}


setScrolledPosition = (lngLat, zoom) => {
  this.setState({ scrolledPositioGate: [lngLat[0], lngLat[1]],
                  scrolledZoomGate: zoom})
}

// setWorkingTime = ( XsingleD, XsingleDMongo, XsingleDTmr, XsingleDTmrMongo) => {
//   this.setState({ XsingleD: XsingleD,
//                   XsingleDMongo: XsingleDMongo,
//                   XsingleDTmr: XsingleDTmr,
//                   XsingleDTmrMongo: XsingleDTmrMongo})
// }

// handleOpenModalJoinGATE = () => {
//  console.log("FCE handleOpenJoinedGATE")

//       this.setState({showJoined: !this.state.showJoined})
// }


// handleCloseModalGATE = () => {
//  console.log("FCE handleOpenCloseJoinedGATE")

//   if (this.state.showJoined) {
//       this.setState({showJoined: !this.state.showJoined})
//   }

//   if (this.state.showCharged) {
//       this.setState({showCharged: !this.state.showCharged})
//   }
// }

rollUp = () => {
  this.setState({rolledUp: !this.state.rolledUp})
}

setUserFce = (isLoggedIn, user_id, name, email, picture) => {
console.log("setUserFce(isLoggedIn, user_id, name, email, picture): DATA: ", isLoggedIn, user_id, name, email, picture)

this.setState({ 
    isLoggedIn: isLoggedIn,
    name: name,
    email: email,
    picture: picture}, () => {
      console.log("User has been set in GATE")
    })

var userLocation

if (this.state.workingLocationGate[1]) {
  console.log("Working Loc Gate is defined")
  userLocation = this.state.workingLocationGate
} else {
  userLocation = [-25 , 134]
}

    fetch('/add-user', {
          method: 'POST',
          mode: "same-origin",
          headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  },
          body: JSON.stringify({
            name: name,
            lat: userLocation[1],
            lng: userLocation[0],
            dateStart: new Date, 
            // userName: "Albert Einstein",
            // userPicture: "https://res.cloudinary.com/party-images-app/image/upload/v1552728775/h0gyfjfm7fuqmfih9jlj.png",
            // userEmail: 'eim@stein.com',
            userName: name,
            userPicture: picture,
            userEmail: email,
          }),
            }).then(res => res.json())
        .then(antwort => {
            console.log("ANTWORT New user setted - ", antwort.data._id)
            this.setState({user_id: antwort.data._id, userDetails: antwort.data, },
              () => {
                this.saveCookies(antwort.data._id)
              }
               )
              }
           ) 
    .catch((err) => {
      console.log("ERROR FRONTENT: ", err)
    })
}

fetchUserInfoId = () => {
  console.log("fetchUserInfoId HITTING")
      fetch('/api2/user-info-id', {
          method: 'POST',
          mode: "same-origin",
          headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  },
          body: JSON.stringify({
            user_id: this.state.user_id,
          }),
            }).then(res => res.json())
        .then(user => {
            console.log("Fetch UserInfo TRUE ONE", user)
            console.log("Fetch UserInfo user.data[0]", user.data[0])
            if (user.data[0]) {
               this.setState({userDetails: user.data[0], name: user.data[0].userName, email: user.data[0].userEmail, picture: user.data[0].userPicture, isLoggedIn: true}, () => {
            })
            }
           
               }) 
}

resetUser = () => {
  console.log("RESET USER")
  this.setState({isLoggedIn: false, user_id: '', name: '', email: '', picture: '', userDetails: []})
  document.cookie = "_user_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  console.log("RESET USER DONE")
}

handleScroll(){

   var someDiv = document.getElementById('nav-point-roll');

if (someDiv) {

      if (someDiv.getBoundingClientRect().top > 90) {
        document.getElementById('col-row-user-line').classList.remove('small-nav');
      document.getElementById('col-row-user-line').classList.remove('white-nav');
    } else{
        document.getElementById('col-row-user-line').classList.add('white-nav');
    }
      if (document.getElementById('nav-point-roll') && evaluating == false) {
        evaluating = true
        setTimeout(function(){evaluating = false}, 300)
        var nextV = someDiv.getBoundingClientRect().top
    if (someDiv.getBoundingClientRect().top > 0) {

    }else{
        document.getElementById('col-row-user-line').classList.add('white-nav');
        if (prevVgate > nextV) {
            document.getElementById('col-row-user-line').classList.add('small-nav');
        } else{
           document.getElementById('col-row-user-line').classList.remove('small-nav');  
      }
    }
    prevVgate = nextV    
    }
  }
}

  previousLocation = this.props.location;

  componentWillUpdate(nextProps) {
    let { location } = this.props;
    console.log("componentWillUpdate: nextProps: ", nextProps)
    var pathSetUpd = []
    var pathSetUpd = nextProps.location.pathname.split('/')
    console.log("SPLITTED: ", pathSetUpd[1])

    //first render from outside

    // set previousLocation if props.location is not modal
    // if ( nextProps.history.action !== "POP" && (!location.state || !location.state.modal)) 
    //     { this.previousLocation = this.props.location; }



    //going pack from Modal Event

        if (pathSetUpd[1] == "event") {
      console.log("PATH OF event::", pathSetUpd[1])
    } else{
        if (pathSetUpd[1] == "user") {
      console.log("PATH OF user::", pathSetUpd[1])
    } else{
      if (pathSetUpd[1] == "login") {
      console.log("PATH OF user::", pathSetUpd[1])
    } else{
      if (nextProps.location && nextProps.location.state && nextProps.location.state.justGoBack == true) {
      console.log("I just want to go back!!")
    } else{
      console.log("PATH OF NOT user/event, updating History", pathSetUpd[1], nextProps.location.pathname)
      this.previousLocation = nextProps.location;
    }
    }
    }
   }
    console.log("componentWillUpdate: this.previousLocation ", this.previousLocation)


    // set previousLocation if props.location is not modal
    // if (
    //   nextProps.history.action !== "POP" &&
    //   (!location.state || !location.state.modal)
    // ) {
    //   this.previousLocation = this.props.location;
    // }
  }



render(){

    console.log("GATE RENDERING - location OBJ??: ", this.props)
    console.log("SEEk EVENT/USER: loc.state: ", this.props.location.state)


    var EventModal = false
    var UserModal = false
    var LoginModal = false
    var pathSet = this.props.location.pathname.split('/')
    console.log("SPLITTED: ", pathSet[1])
    if (pathSet[1] == "event") {
      EventModal = true
    }
    if (pathSet[1] == "user") {
      UserModal = true
    }
    if (pathSet[1] == "login") {
      LoginModal = true
    }
     let { location } = this.props;
    console.log('location 1: ', location)
    console.log('prev.location 1: ', this.previousLocation)
    var isModal = !!(
      this.previousLocation !== location
    ); // not initial render

     var justGoBack = false
    if (this.props.location && this.props.location.state && this.props.location.state.justGoBack == true) {
        justGoBack = true
         console.log("justGoBack triet") 
    }

    var EventOrUser = false
    if (EventModal || UserModal || LoginModal) {
      EventOrUser = true
      console.log("EVENT OR USER pass: ", pathSet[1] , EventOrUser)

    }

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.addEventListener('gesturestart', function (e) { // prevent zooming in whole document
    e.preventDefault();
});

  console.log("Rendering GATE GATE isModal? ", isModal)
  console.log('location 2: ', location)
  console.log('prev.location 2: ', this.previousLocation)
  console.log('EventOrUser update SWITCH: ', EventOrUser)

	return(
      <div id="container-gate">
      <nav>
        <div className="nav-wrapper">
           <NavLink to="/" className="brand-logo" activeClassName="active">
                 <img src={CharliePinkV} className="logo-nav" />
              </NavLink>
          <a href="#" data-target="mobile-demo" className="right sidenav-trigger">
              <MaterialIcon icon="menu" size='large' color={'#E8045D'} />
          </a>
          <ul className="right hide-on-med-and-down">
          <li>
              <NavLink to="/map" activeClassName="active">
                 <div className="nav-wrap" >
                  <p>Map of events</p>
                 </div>
              </NavLink>
          </li>
          <li><NavLink to='/create' activeClassName="active">
              <div className="nav-wrap" >
                <p>Create event</p>
                </div>
            </NavLink>
          </li>
          <li><NavLink to='/about' activeClassName="active">
              <div className="nav-wrap" >
                <p>About</p>
                </div>
            </NavLink>
          </li>
          <li><NavLink to='/privacy-policy' activeClassName="active">
              <div className="nav-wrap" >
                <p>Privacy Policy</p>
                </div>
            </NavLink>
          </li>
          <li>
            {this.state.isLoggedIn == true ?
            <React.Fragment>
             <NavLink to="/user-profile" activeClassName="active portrait-active" className="portrait-clas">
              <div className="nav-wrap">
               <p>Profile    <img className="portrait-nav" src={this.state.picture}/></p>
              </div>
            </NavLink>
            </React.Fragment>
            :
            <NavLink to="/login" activeClassName="active">
             <div className="nav-wrap" >
             <p>Login</p>
             </div>
           </NavLink>
         }
         </li>
          <li>
            {this.state.isLoggedIn == true ?
            <NavLink to="/" activeClassName="portrait-active" className="portrait-clas">
              <div className="nav-wrap" onClick={this.resetUser}>
              <p> Logout</p>
              </div>
            </NavLink>
            :
            null
         }
         </li>


          </ul>
        </div>
      </nav>

          <ul className="sidenav" id="mobile-demo">
          <li>
              <a className="sidenav-close">
                <NavLink to='/' >
                    <div className="nav-wrap" >
                      <p>HOME</p>
                    </div>
                </NavLink>
              </a>
          </li>
          <li>
              <a className="sidenav-close">
                <NavLink to="/map" >
                   <div className="nav-wrap" >
                    <p>Map of events</p>
                   </div>
                </NavLink>
              </a>
            </li>
            <li>
              <a className="sidenav-close">
                <NavLink to='/create' >
                    <div className="nav-wrap" >
                      <p>Create event</p>
                    </div>
                </NavLink>
              </a>
            </li>


          <li>
            <a className="sidenav-close">
              <NavLink to="/about" >
                 <div className="nav-wrap" >
                  <p>About</p>
                 </div>
              </NavLink>
            </a>
          </li>

          <li>
            <a className="sidenav-close">
              <NavLink to="/privacy-policy" >
                 <div className="nav-wrap" >
                  <p>Privacy Policy</p>
                 </div>
              </NavLink>
            </a>
          </li>
          <li>
              <a className="sidenav-close">
                  {this.state.isLoggedIn == true ?
                  <React.Fragment>
                   <NavLink to="/user-profile" activeClassName="portrait-active" className="portrait-clas">
                    <div className="nav-wrap">
                    <p><img className="portrait-nav" src={this.state.picture}/>   Profile /</p>
                     
                    </div>
                  </NavLink>
                  <NavLink to="/" activeClassName="portrait-active" className="portrait-clas">
                    <div className="nav-wrap" onClick={this.resetUser}>
                    <p> Logout</p>
                    </div>
                  </NavLink>
                  </React.Fragment>
                  :
                  <NavLink to="/login" >
                   <div className="nav-wrap" >
                   <p>Login</p>
                   </div>
                 </NavLink>
               }
              </a>
          </li>
         
      </ul>
        <ScrollTop>
              <Switch location={(EventOrUser || justGoBack) ? this.previousLocation : location} >
               <Route exact path='/' render={() => <Menu
                          key="1"
                          EventOrUser={EventOrUser}
                          handleScroll={this.handleScroll}
                          userInfo={this.userInfo}
                          //playIntroFceShut={this.playIntroFceShut}
                          rollUp={this.rollUp}
                          {...this.state} />} />

                <Route path='/map' render={(props) => <Map 
                          value={1}
                          key="2"
                          handleScroll={this.handleScroll}
                          //location={history.location} 
                          //venuesFromMongo={this.state.venuesFromMongo} 
                          //workingLocationGate={this.state.workingLocationGate} 
                          setScrolledPosition={this.setScrolledPosition}
                          fetchUserInfoId={this.fetchUserInfoId}
                          {...this.state}
                           />} />
                
                <Route path='/create' component={(props) => <Create 
                          key="3" 
                          {...this.state}
                           EventOrUser={EventOrUser}
                          handleScroll={this.handleScroll}
                          cancelUpdatingGate={this.cancelUpdatingGate}
                           />} />
                          }
                <Route path='/login' render={() => <Login 
                          key="4" 
                          handleScroll={this.handleScroll}
                          setUserFce={this.setUserFce}
                          {...this.state} />} />
                <Route exact path='/user-profile' render={() => <User 
                          key="5"
                          updatingShip={this.updatingShip}
                          EventOrUser={EventOrUser}
                          handleScroll={this.handleScroll}
                          resetUser={this.resetUser}
                          userDetails={this.state.userDetails} 
                          fetchUserInfoId={this.fetchUserInfoId}
                          {...this.state} 
                           />} />
                <Route path='/about' render={() => <About 
                          key="6"
                          handleScroll={this.handleScroll}
                          {...this.state}
                           />} />
                <Route path='/privacy-policy' render={() => <Privacy 
                          key="7"
                          handleScroll={this.handleScroll}
                          {...this.state}
                           />} />
                 <Route path='/event/:id' render={() => <ModalEvent 
                          key="18"
                          SS="inside of SWITch"
                          fetchUserInfoId={this.fetchUserInfoId}
                          updatingShip={this.updatingShip}
                          cancelUpdatingGate={this.cancelUpdatingGate}
                          {...this.state}
                           />} />

              </Switch>
              {EventModal ?  <Route path='/event/:id' render={() => <ModalEvent 
                          key="8"
                          SS="outsige of SWITch"
                          fetchUserInfoId={this.fetchUserInfoId}
                          updatingShip={this.updatingShip}
                          {...this.state}
                           />} />
                           : 
                           null}
              {UserModal ?  <Route path='/user/:id' render={() => <UserId 
                          key="9"
                          fetchUserInfoId={this.fetchUserInfoId}
                          updatingShip={this.updatingShip}
                          {...this.state}
                           />} />
                           : 
                           null}
              {LoginModal ?  <Route path='/login' render={() => <Login 
                          key="10" 
                          handleScroll={this.handleScroll}
                          setUserFce={this.setUserFce}
                          {...this.state} />} 
                          /> 
                           : 
                           null}
                                          
          </ScrollTop>



        </div>
		)
}

}


function GateWrap() {
  return (
    <div className="Gate">

      <Router>
        <Route component={Gate} />
      </Router>
    </div>
  );
}

export default GateWrap;


                      // <Modal show={this.state.showJoined || this.state.showCharged} onHide={this.handleCloseModalGATE}>
                      //   <Modal.Header closeButton>
                      //     <Modal.Title>Confirmation has been sent to your email: [jeho@mail.asi]</Modal.Title>
                      //   </Modal.Header>
                      //   <Modal.Body>
                      //     <h4>See ya in there :)</h4>
                      //     <img className="crowded-image" src={CrowdV} />
                      //   </Modal.Body>
                      //   <Modal.Footer>

                      //     <Button bsStyle="primary" onClick={this.handleCloseModalGATE} >Close</Button>
                      //   </Modal.Footer>
                      // </Modal>
