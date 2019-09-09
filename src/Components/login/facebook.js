import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
//import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Redirect } from 'react-router-dom'

export default class Facebook extends Component {

  state = {
    // isLoggedIn: false,
    // userID: '',
    // name: '',
    // email: '',
    // picture: '',
    displayRedirect: false,
  }

  componentClicked = () => {
    console.log("clicked")

  }

  responseFacebook = (response) => {
    console.log("Facebook response ", response)

    this.setState({displayRedirect: true})

    this.props.setUserFce(true, response.id, response.name, response.email, response.picture.data.url)

//     this.setState({
//       isLoggedIn: true,
//       userID: response.id,
//       name: response.name,
//       email: response.email,
//       picture: response.picture.data.url,
//     }, () => {
//       this.props.setUserFce(true, response.id, response.name, response.email, response.picture.data.url)
//     })

  }


  render() {

  if (this.state.displayRedirect === true) {
    //return(<Redirect to='/' />) 
   // this.props.history.goBack()
  }


    let fbContent;

    if (this.props.isLoggedIn) {
          fbContent = (
            <div>
            <p> Logged In </p>
            <img src={this.state.picture} />
            <h1> Welcome {this.state.name} </h1>
            </div>)
    }else{
        fbContent = (<FacebookLogin
                              appId="1931064006992061"
                              autoLoad={false}
                              fields="name,email,picture"
                              scope="public_profile,email"
                              size="metro"
                              redirectUri="https://www.charlieparty.club/login"
                              disableMobileRedirect={true}
                              isMobile={true}
                              onClick={this.componentClicked}
                              callback={this.responseFacebook}
                            />
                            )
    }

    return (
      <div>
      {fbContent}
      </div>
    );
  }
}

// <FacebookLogin
//   appId="1931064006992061"
//   autoLoad={false}
//   fields="name,email,picture"
//   callback={this.responseFacebook}
//   render={renderProps => (
//     <button onClick={renderProps.onClick}>This is my custom FB button</button>
//   )}
// />


// <FacebookLogin
//     appId="1931064006992061"
//     autoLoad={true}
//     fields="name,email,picture"
//     onClick={this.componentClicked}
//     redirectUri="https://www.charlieparty.club/"
//     callback={this.responseFacebook} />

