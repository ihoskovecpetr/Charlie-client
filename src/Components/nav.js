import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom'
import { Col } from 'react-bootstrap'

import './nav.css'


//var CharlieLogoWhiteV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552643611/xmfppj06l7wcgwsnmvfe.png'
var HomeV = 'https://res.cloudinary.com/party-images-app/image/upload/v1555495981/zweyltxvnf6b73g8uxtx.png'
var CharliePinkV = 'https://res.cloudinary.com/party-images-app/image/upload/v1557794256/ojkgl1hkiljwij69njbb.png'
export default class Nav extends Component {


render(){


	return(
    <div>
      {this.props.isLoggedIn == true ?
         <Col id="col-row-user-line" xs={12} md={12}>
          <NavLink to="/" activeClassName="" className="">
            <div className="home-button">
            <img src={CharliePinkV}/>
            </div>
          </NavLink>
          <div className="grey-back">

              <NavLink to='/create' activeClassName="active">
                <div className="nav-wrap" >
                  <p>CREATE</p>
                </div>
              </NavLink>

              <NavLink to="/map" activeClassName="active">
               <div className="nav-wrap" >
                <p>FIND</p>
               </div>
            </NavLink>

           <NavLink to="/user-profile" activeClassName="active portrait-active" className="portrait-clas">
              <div className="nav-wrap">
               <img id="portrait" src={this.props.picture}/>
              </div>
            </NavLink>
            
           
            </div>

           
         </Col>
       :  
       <Col id="col-row-user-line" xs={12} md={12}>
         <NavLink to="/" activeClassName="" className="">
          <div className="home-button">
          <img src={CharliePinkV}/>
          </div>
          </NavLink>
        <div className="grey-back">

           <NavLink to='/create' activeClassName="active">
              <div className="nav-wrap" >
              <p>CREATE</p>
              </div>
           </NavLink>
           <NavLink to="/map" activeClassName="active">
               <div className="nav-wrap" >
                <p>FIND</p>
               </div>
           </NavLink>

           <NavLink to="/login" activeClassName="active">
             <div className="nav-wrap" >
             <p>LOGIN</p>
             </div>
           </NavLink>

        </div>
       </Col>
          }
    </div>
		)
}

}

