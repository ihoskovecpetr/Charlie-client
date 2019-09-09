import React, { Component } from 'react';
import { Button, Glyphicon, Dropdown, MenuItem } from 'react-bootstrap'
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
//import moment from 'moment';
//import './map-slider-panel.scss'
import dateFormat from'dateformat';

import DatetimeRangePicker from 'react-datetime-range-picker';

//import BackArrow from '../img/back-arrow-white.png'
//import Calendar from '../img/calendar-white.png'

var ArrowBackEasyV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109081/unzzwcyhckz1lb7d6mmv.png'
var CalendarV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109081/t7n2inl7nhw4fjm26cdc.png'


var startD
var endD

export default class SlidePanel extends Component {

  constructor(props) {

        super(props);
        this.state = {
            isPaneOpen: false,
            switchDrop: 4,
        };
    }
 
    componentDidMount() {
        Modal.setAppElement(this.el);
    }

    handler = (date) => {
        console.log("Handler pickeru DATE: ", date)
        //this.setState({start: date.start, end: date.end})
        console.log("PICKED: ", date.start)
        console.log("TODAY: ", startD)
        startD = date.start;
        endD = date.end
    }

    applyRange = () => {
        var startHelper = this.props.startD
        //startHelper.setHours(0, 0, 0, 0)

        var endHelper = this.props.endD
        endHelper.setHours(23, 59, 0, 0)

        console.log("StartD var: ", startD)
        console.log("StartD state: ", startHelper)

        if (startD == startHelper && endD == endHelper) {
            console.log("NO data change, no re-render")
        } else{
            console.log("Apply Range FCE - CLOSING MON CHANCE")
            this.props.changeDateRange(startD, endD)
            this.setState({ isPaneOpen: false })
        }

    }

setStateSwitch(value){
    if (value == 1) {
        startD = new Date(Date.now())
        endD = new Date(startD.setHours(23, 59, 0, 0))
        console.log("StartD & endD value 1: ", startD, endD)
        this.props.changeDateRange(startD, endD)
    }
    if (value == 2) {
        startD = new Date(Date.now())
    var startDhelper = new Date(Date.now())
        endD = new Date(startDhelper.setDate(startD.getDate() + 1))
        endD = new Date(endD.setHours(23, 59, 0, 0))
        console.log("StartD & endD value 2: ", startD, endD)
        this.props.changeDateRange(startD, endD)
    }
    if (value == 3) {
      var resultDateFri = new Date(Date.now())
      var resultDateSat = new Date(Date.now())
      var date = new Date(Date.now())
      console.log("new Date(Date.now()): ", date)
      //var resultDate = new Date(date.getTime());
      //console.log("new Date(date.getTime()): ", resultDate)
      resultDateFri.setDate(date.getDate() + (7 + 5 - date.getDay()) % 7);
      resultDateSat.setDate((date.getDate() + (7 + 5 - date.getDay()) % 7)+ 1);
      console.log("resultDate 5 : ", resultDateFri)
      console.log("resultDate 6 : ", resultDateSat)
      startD = new Date(resultDateFri.setHours(0, 0, 0, 0))
      endD = new Date(resultDateSat.setHours(23, 59, 0, 0))
      console.log("startD : ", startD)
      console.log("endD : ", endD)
      this.props.changeDateRange(startD, endD)
    }
    if (value == 4) {
        this.setState({switchDrop: value, isPaneOpen: true})
    } else{
        this.setState({switchDrop: value})
    }
}



    dropLabelSwitch = (value) => {

              switch(value) {
    case 1 :
        
        console.log("SIWTCH - startD: ", startD)
        return (<span>Today {dateFormat(startD, "dS")} - {dateFormat(endD, "dS")} </span>)
      break;

    case 2 :
      return (<span>Today&Tmr {dateFormat(startD, "dS")}-{dateFormat(endD, "dS")} </span>)
      break;

    case 3 :
      return (<span>Fri & Sat {dateFormat(startD, "dS")} - {dateFormat(endD, "dS")} </span>)
      break;

    case 4 :
    console.log("Jsme v case 4 SWITCH")
       
      return (<p>Custom {dateFormat(startD, "dS")} - {dateFormat(endD, "dS")}</p>)

      break;
    default:
      break;
    }
}
 
    render() {

        startD = this.props.startD
        //startD.setHours(0, 0, 0, 0)
        endD = this.props.endD
        console.log("endD", endD.setHours(23, 59, 0, 0))

        return <div className="slider-wrap" ref={ref => this.el = ref} >
                       <Dropdown>
                          <Dropdown.Toggle id="dropdown-label">
                                   <p>{this.dropLabelSwitch(this.state.switchDrop)}</p>
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                                  <MenuItem onClick={this.setStateSwitch.bind(this, 1)}><p>Today</p></MenuItem>
                                  <MenuItem onClick={this.setStateSwitch.bind(this, 2)}><p>Today & Tmr</p></MenuItem>
                                  <MenuItem onClick={this.setStateSwitch.bind(this, 3)}><p>Fri & Sat</p></MenuItem>
                                  <MenuItem >
                                     <div onClick={this.setStateSwitch.bind(this, 4)}>
                                        <div className="open-slider-btn-dorpdown">
                                           <p>Custom</p>
                                        </div>
                                    </div>
                                  </MenuItem>
                          </Dropdown.Menu>
                        </Dropdown>


                    <SlidingPane
                        className='some-custom-class'
                        overlayClassName='map-slider-class'
                        isOpen={ this.state.isPaneOpen }
                        title='Customise'
                        subtitle='Charlie map'
                        onRequestClose={ () => {
                            this.applyRange()
                            this.setState({ isPaneOpen: false });
                        }}>
                              <DatetimeRangePicker
                                startDate={startD}
                                endDate={endD}
                                dateFormat={true}
                                closeOnSelect={false}
                                className={"date-range-wrap"}
                                onChange={this.handler} /> 
                                <Button bsStyle="success" onClick={this.applyRange}> Apply </Button> 
                    </SlidingPane>
                </div>;
    }

}

