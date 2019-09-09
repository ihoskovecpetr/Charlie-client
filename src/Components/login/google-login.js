import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom'
import './google-login.css'

var GoogleV = 'https://res.cloudinary.com/party-images-app/image/upload/v1557462915/vgvduspc6s8j368y1ras.png'

export default class Google extends Component {

  state = {
    isLoggedIn: false,
    userID: '',
    name: '',
    email: '',
    picture: '',
    displayRedirect: false
  }

  componentClicked = () => {
    console.log("clicked")
  }

  responseGoogle = (response) => {
    console.log("Google response ", response.w3)

    this.setState({
      isLoggedIn: true,
      userID: response.w3.ig,
      name: response.w3.ofa,
      email: response.w3.U3,
      picture: response.w3.Paa,
    }, () => {
      this.props.setUserFce(true, response.w3.ig, response.w3.ofa, response.w3.U3, response.w3.Paa)
    })
  }


  render() {

  if (this.state.isLoggedIn === true) {
   // return(<Redirect to='/' />) 
  }

    let GoogleContent;
    if (this.state.isLoggedIn) {
          GoogleContent = (
            <div>
            <p> Logged In </p>
            <img src={this.state.picture} />
            <h1> Welcome {this.state.name} </h1>
            </div>)
    }else{
        GoogleContent = (
    <GoogleLogin
    clientId="119981354324-7sj8o5l3dk03s56paf6d4fd0fbr9vuu6.apps.googleusercontent.com"
    render={renderProps => (
      <button className="google-btn" onClick={renderProps.onClick} disabled={renderProps.disabled}><img className="google-icon" src={GoogleV} /><p>Login with GOOGLE</p></button>
    )}
    buttonText="Login"
    onSuccess={this.responseGoogle}
    onFailure={this.responseGoogle}
    cookiePolicy={'single_host_origin'}
  />

  )
    }

    return (
      <div>
      {GoogleContent}
      </div>
    );
  }
}

