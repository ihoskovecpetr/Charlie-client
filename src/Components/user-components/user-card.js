import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { Row, Col, Button, Image, Jumbotron, Glyphicon } from 'react-bootstrap'
import StarRatingComponent from 'react-star-rating-component';
import _ from 'lodash';

import './user-card.css'

//import Instagram from '../img/instagram-icon.png'
//import Youtube from '../img/youtube-icon.png'
//import NoUser from '../img/no-user-white.png'
//import ArrowBack from '../img/arrow-back-white.png'

var ArrowBackV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552106126/wqep6jsjtodqrxuehlhy.png'
var NoUserV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109083/xyty8m0wsw6rxfmgeur7.png'
var InstagramV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109082/wtr8blfjbhm4gqdsxlj0.png'
var FacebookV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109082/kggc0uztnyow0l9tnzk3.png'
var YoutubeV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109084/nffxrc9xgm1mbpmrsgse.png'
  var CharlieLogoV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552431642/bm09b4wncwatscw9gtdg.png'

var roundRating
var CreatorEmV

export default class UserCard extends Component {


    constructor(props) {
    super(props);
    this.state = {
          creatorDetails: '',
          creatorRatingAverage: 0,
          creatorRatingCount: 0,

      }
  }

  componentDidMount(){
    console.log("componntDiMnt user-card.js", this.props)
    console.log(this.props.creatorEmail)
    if (this.props.creatorEmail) {
      console.log("CRT DETAILS MOUNT")
        this.getCreatorDetails(this.props.creatorEmail)
    }
    
  }

  shouldComponentUpdate(nextProps , nextState){
  console.log("shouldComponentUpdate USERcard", this.props.creatorEmail , nextProps.creatorEmail)
  if (this.props.creatorEmail !== nextProps.creatorEmail ) {
    console.log("CRT DETAILS SHOULD")
      this.getCreatorDetails(nextProps.creatorEmail)
  }

  return true
}

getCreatorDetails = (email) => {
  console.log("I am getting Details for: ", this.props.creatorEmail)
     fetch('/api2/get-user-info', {
          method: 'POST',
          mode: "same-origin",
          headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  },
          body: JSON.stringify({
            userEmail: email, 
          }),
            }).then(res => res.json())
        .then(user => {

              var sum = 0;
              //counting final rating out of fetched data
              if (user.data[0].rating.length !== 0) {
            _.map(user.data[0].rating, (rating, index) => {
              sum = sum + rating.ratingCustom
            })
            console.log("RETINGY: length cislo ", user.data[0].rating.length)
             console.log("user.data[0] user-card.js", user.data[0])
                 //travsfer fetched data and counted average into state
                 roundRating = Math.round(sum/user.data[0].rating.length)
          this.setState({ creatorRatingAverage: sum/user.data[0].rating.length, 
                          creatorDetails: user.data[0], 
                          creatorRatingCount: user.data[0].rating.length}, () => {
                             console.log("this.state.creatorRatingAverage AFTER setState", this.state.creatorRatingAverage)
                             
                          })
          }else{
            console.log("RETINGY: length 0? ", user.data[0].rating.length)
            //roundRating = 0;
            roundRating = 0
                      this.setState({ creatorRatingAverage: 0, 
                          creatorDetails: user.data[0], 
                          creatorRatingCount: user.data[0].rating.length}, () => {
                             
                          })
          }
          })
      
}


render(){

  console.log("UserCard RENDER()")
  console.log("UserCard RENDER() - roundRating: ", this.state.creatorRatingAverage)
  roundRating = Math.round(this.state.creatorRatingAverage)



  if (this.state.isLoggedIn === true) {
    return(<Redirect to='/' />) 
  }

	return(
    
   <Col className="user-card" xs={12} md={12}>
       {this.state.creatorDetails !== '' ? <div className="user-card-left">
                                           
                                                <Image className="img-host" src={this.state.creatorDetails.userPicture} />
                                            
                                          </div>
                                          : 
                                          <p> No HOST Details </p>}

        <div className="user-card-right">
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
          {this.state.creatorRatingAverage !== null ? 
                    <div id="star-rating-paragraph">
                      <div id="star-rating-paragraph-wrap">
                        <p>Rating: </p> <p>{Math.round(this.state.creatorRatingAverage*10)/10}</p> <p> from {this.state.creatorRatingCount} votes</p>
                      </div>
                    </div>
                     : 
                     <div id="star-rating-paragraph">
                        <p> 
                        </p>
                     </div>}
        </div>
   </Col>

		)
}

}

