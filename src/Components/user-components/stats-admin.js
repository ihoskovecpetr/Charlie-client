import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { Col, Button, Image, Jumbotron, Glyphicon } from 'react-bootstrap'
import StarRatingComponent from 'react-star-rating-component';
import _ from 'lodash';

var roundRating

export default class StatsAdmin extends Component {


    constructor(props) {
    super(props);
    this.state = {
         data: '',
         fatched: false,
      }
  }

  componentDidMount(){
    console.log("componntDiMnt stats-admin.js")

        this.fetchStats()
  }

  fetchStats = () => {
  console.log("INF STATS")
        fetch('/api2/info-stats', { method: 'get', mode: 'no-cors',  headers: {
                 Accept: 'application/json',
         'Content-Type': 'application/json',
                  }, })
        .then(res => res.json())
        .then(data => {
          this.setState({data: data.data, fetched: true}, () =>{
           })}) 
}

renderData = () => {
  var NrOfUsers = 0

_.map(this.state.data, (event, index) =>{

             if (event.IsThisUser) { 
              NrOfUsers = NrOfUsers + 1}
            }
            )


      return( 
               <p>Number of Users: {NrOfUsers}</p>
            ) 
}


render(){


	return(
    
   <Col className="col-stats" xs={6} md={6}>
      STATISTICS:
      {this.state.fetched ? <span>{this.renderData()}</span> : <span> </span>}
   </Col>

		)
}

}

