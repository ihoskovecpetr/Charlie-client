import React, { Component, useCallback} from 'react';
import {Alert, Grid, Row, Col, Button, Image, Glyphicon, Modal} from 'react-bootstrap'
import { NavLink, Link, Redirect, withRouter } from 'react-router-dom'
import Dropzone from 'react-dropzone';
import request from 'superagent';
import Gallery from 'react-grid-gallery';
import GeolocationMarker from 'geolocation-marker'
import classnames from 'classnames';
//import history from '../history';
import _ from 'lodash';
import DatetimeRangePicker from 'react-datetime-range-picker';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import './create.css'

import Footer from './footer';
import Nav from './nav';

//import MaterTab from './mater-tab'
//import ArrowBack from '../img/arrow-back-white.png'
//import NoUser from '../img/no-user-white.png'
//import Instagram from '../img/instagram-icon.png'
//import Facebook from '../img/facebook-icon.png'
//import Youtube from '../img/youtube-icon.png'
//import Upload from '../img/upload-logo.png'

  var ArrowBackV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552106126/wqep6jsjtodqrxuehlhy.png'
  var NoUserV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109083/xyty8m0wsw6rxfmgeur7.png'
  var InstagramV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109082/wtr8blfjbhm4gqdsxlj0.png'
  var FacebookV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109082/kggc0uztnyow0l9tnzk3.png'
  var YoutubeV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109084/nffxrc9xgm1mbpmrsgse.png'
  var UploadV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109083/klv4lxeylydrqptnhcav.png'
  var BeerV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109081/wn3b1b5eyiosgciqadb1.png'
  var PeanutV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109083/khbs1jsnfyoxqmxygvjb.png'
  var MealV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552109083/bcpfpb2hqwnljspeeqvc.png'
  var CharlieLogoV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552431642/bm09b4wncwatscw9gtdg.png'
  var EmailV = 'https://res.cloudinary.com/party-images-app/image/upload/v1552979848/hapnjhk6atnytpeczpf7.png'
  var DoneV = 'https://res.cloudinary.com/party-images-app/image/upload/v1553485009/dvnjw7htgrl3wui8kfsu.png'
  var CurLocV = 'https://res.cloudinary.com/party-images-app/image/upload/v1556839182/z9d0c6wyfftzj7e55ipq.png'
  var SpinnerV = 'https://res.cloudinary.com/party-images-app/image/upload/v1558013750/f6miqwq5hs4ipee43rbj.png'

const CLOUDINARY_UPLOAD_PRESET = 'simple-preset-1';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/party-images-app/upload';

var UpdRendered = false
var prevVgate = 120;
var evaluating = false;
var map
var geocoder 
var marker
var smallfile;

class Create extends Component {
      constructor(props){
      var offset = (new Date()).getTimezoneOffset() * 60000
      var nowAndHere = new Date(Date.now()-offset)
      var split = nowAndHere.toISOString().split("T")
      var string = split[0]
      console.log("SPLIIT: ", split)
      var split2 = split[1].split(":")
      var Num = parseInt(split2[0], 10);
      if (Num == 23) {
        var Num = '00'
      } else{
      var Num = Num + 1
      }
      var hours = Num + ':00'

      var startDate = new Date(string + 'T' + hours)

            super(props);

            this.state= {
                display: false,
                displayRedirect: false,
                showModalSuccess: false,
                showModalUpdateStart: false,
                injectDatePickerState: false,
                valueTab: 0,
                redirectToMap: false,
                openPreView: false,
                preViewId: null,
                uploadedFileCloudinaryUrl: [{
                          caption: "No more pictures for this Event",
                          src: "https://res.cloudinary.com/party-images-app/image/upload/v1551339472/m8bb30cuufo4vfzbgg7q.png",
                          thumbnail: "https://res.cloudinary.com/party-images-app/image/upload/v1551339472/m8bb30cuufo4vfzbgg7q.png",
                          thumbnailHeight: 10,
                          thumbnailWidth: 10,
                          }],
                uploadedFile: '',

                updating_id: '',
                name: null,
                address: '',
                addressOffer: '',
                addressCustom: '',
                addrOff: true,
                location: '',
                venueTimeOffset: '',
                workDate: string,
                workTime: hours,
                startDate: startDate,
                startDateSafari: '',
                repeatWeek: '',
                price: 15,
                maxCapacity: 10,
                BYO: true,
                freeSnack: '',
                freeBeer: '',
                freeMeal: '',
                description: '',
                isLoading: false,
                isUploading: false,
                Errors: {     name: 'missing name', 
                              address: 'missing address',
                              location: 'missing location', 
                              startDate: '',
                              price: '',
                              capacity: '',
                              description: 'missing description',
                              timezone: ''},
                ValidForm: {
                              nameValid: undefined,
                              addressValid: false,
                              locationValid: false,
                              startDateValid: true, 
                              priceValid: true, 
                              capacityValid: true,
                              descriptionValid: false,
                              timeZoneValid: true,},
                anyError: true,
              }
            }

  componentDidMount(){
      console.log("CompoenentDidMount create.js")
      //console.log("history create.js: ", history)

      this.injectDatePicker()

      this.initMap()
      if (this.props.isUpdating) {
        this.geocodeLatLng(geocoder, map, this.props.updatingValues.geometry.coordinates[1], this.props.updatingValues.geometry.coordinates[0])
      } else{
        this.geocodeLatLng(geocoder, map, this.props.workingLocationGate[0], this.props.workingLocationGate[1])

      }
      
      var input = document.getElementById("price")
      input.addEventListener("mousewheel", function(evt){ evt.preventDefault(); })

      var input2 = document.getElementById("capacityMax")
      input2.addEventListener("mousewheel", function(evt){ evt.preventDefault(); })


      var offset = (new Date()).getTimezoneOffset() * 60000
      var nowAndHere = new Date(Date.now()-offset)
      var split = nowAndHere.toISOString().split(":")
      var string = split[0] + ':' + split[1]

      // var dateTo = document.getElementById("dateTo")
      // dateTo.min = string
      var dateFrom = document.getElementById("dateFrom")
      dateFrom.min = string;

      //window.addEventListener('scroll', this.props.handleScroll, true);
      }

  componentWillUnmount() {
    console.log("componentWillUnmount create.js")
    //window.removeEventListener('scroll', this.props.handleScroll, true)
    UpdRendered = false
  }

shouldComponentUpdate(nextProps, nextState){
      console.log("shouldComponentUpdate create.js")
      console.log("nextProps" , nextProps)
      console.log("this.props" , this.props)
        console.log("nextState" , nextState)
      console.log("this.state" , this.state)

      if (nextProps.isUpdating == true && this.state.name == null) {
        this.setToChange()
        console.log("NOT-UPDATING COMPONENT")
        return false
      } 
      //   if (nextProps.playIntro !== this.props.playIntro) {
      //   return false
      // } 
      else{
        console.log("UPDATING COMPONENT")
      return true
      }
}


handleTabChange = (event, newValue) => {
  console.log('CHARGED')
  console.log(event)
  console.log(newValue)
  this.setState({valueTab: newValue})
}

injectDatePicker = () => {
  console.log("injectDatePicker document.getElementById(dateFrom): ", document.getElementById("dateFrom").type)

  if (document.getElementById("dateFrom").type == 'text') {
    this.setState({injectDatePickerState: true})
  } else{
    this.setState({injectDatePickerState: false})
  }
}

// handleScroll = () => {


//    var someDiv = document.getElementById('nav-point-roll');
//    console.log("handle SCRL frm gate.js ELM someDiv: ", someDiv)


// if (someDiv) {

//       if (someDiv.getBoundingClientRect().top > 10) {
//         document.getElementById('col-row-user-line').classList.remove('small-nav');
//       document.getElementById('col-row-user-line').classList.remove('white-nav');
//     } else{
//         document.getElementById('col-row-user-line').classList.add('white-nav');
//     }
//       if (document.getElementById('nav-point-roll') && evaluating == false) {
//         evaluating = true
//         setTimeout(function(){evaluating = false}, 300)
//         var nextV = someDiv.getBoundingClientRect().top
//     if (someDiv.getBoundingClientRect().top > 0) {

//     }else{
//         document.getElementById('col-row-user-line').classList.add('white-nav');
//         if (prevVgate > nextV) {
//             document.getElementById('col-row-user-line').classList.add('small-nav');
//         } else{
//            document.getElementById('col-row-user-line').classList.remove('small-nav');  
//       }
//     }
//     prevVgate = nextV    
//     }
//   }
// }


  onImageDrop(files) {

    console.log("onImageDrop FCE files:")
    console.log(files)

    this.setState({
      uploadedFile: files[0],
      isUploading: true,
    });
    files.map((file) => {
      this.handleImageUpload(file)})

  //   const onDrop = useCallback(acceptedFiles => {

  //   const reader = new FileReader()
  //   reader.onabort = () => console.log('file reading was aborted')
  //   reader.onerror = () => console.log('file reading has failed')
  //   reader.onload = () => {
  //     // Do whatever you want with the file contents
  //     const binaryStr = reader.result
  //     console.log("binaryStr")
  //     console.log(binaryStr)
  //   }
  // })
}

    handleImageUpload(file) {

      console.log("SIZE OF file")
      console.log(file)

    const width = 200;
    const height = 100;
    const fileName = file.name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = event => {
        const img = document.createElement("img");
        img.src = event.target.result;
        console.log("img: ", img)
        img.onload = () => {
              console.log("LOADEED")
                const elem = document.createElement('canvas');
                elem.width = width;
                elem.height = height;
                const ctx = elem.getContext('2d');
                // img.width and img.height will contain the original dimensions
                ctx.drawImage(img, 0, 0, width, height);
                ctx.canvas.toBlob((blob) => {
                    smallfile = new File([blob], fileName, {
                        type: 'image/jpeg',
                        lastModified: Date.now()
                    });
                    console.log("END0")
                    this.uploadingOneImg(smallfile, file)
                }, 'image/jpeg', 1);
                console.log("ENDXX")
                  //
            }//,

            reader.onerror = error => console.log(error);
    };

  }

  uploadingOneImg = (imgTumb, imgFull) => {

    var urlTumb

        var divider
    console.log("IMG DIGESTING END smallfile: ", smallfile)
    var upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', imgTumb);
    upload.end((err, response) => {
        if (err) {
          console.error(err);
          window.alert("Problem with uploading your picture..");
        }

        if (response.body.secure_url !== '') {
          console.log("response.body uploaded")
          console.log(response.body)
          urlTumb = response.body.secure_url
        }

        var upload2 = request.post(CLOUDINARY_UPLOAD_URL)
                  .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                  .field('file', imgFull);
              upload2.end((err, response) => {
                  if (err) {
                    console.error(err);
                    window.alert("Problem with uploading your picture..");
                  }
                  if (response.body.secure_url !== '') {
                    console.log("response.body uploaded")
                    console.log(response.body)

                    var uplArr = this.state.uploadedFileCloudinaryUrl
                        uplArr.push({
                        src: response.body.secure_url,
                        thumbnail: urlTumb,
                        thumbnailWidth: response.body.width,
                        scaletwidth: 100,
                        thumbnailHeight: response.body.height,
                        isSelected: false,
                        caption: "After Rain (Jeshu John - designerspics.com)",
                            })

                        this.setState({
                          uploadedFileCloudinaryUrl: uplArr, 
                          display: !this.state.display,
                          isUploading: false,
                        }, () => {
                          console.log("uplArr - " , uplArr)
                        });

                  }


                });


      });

  }
        

forceDisplay = () => {
  this.setState({display: !this.state.display})
}

initMap = () => {

  console.log("initialisation of map props: ", this.props)

var LandL;
var Zoom;

if (this.props.isUpdating) {
  console.log("LandL from isUpdating!!")
  LandL = [ this.props.updatingValues.geometry.coordinates[1], 
            this.props.updatingValues.geometry.coordinates[0]];
} else{
    if (this.props.workingLocationGate[0] == undefined) { //loading this location on  backgrould of Jumbo
    LandL = [-33.81 , 151.2]
    Zoom = 10
  console.log("GENERAL location")
  } else { 
    LandL = [ this.props.workingLocationGate[0], this.props.workingLocationGate[1] ];
    Zoom = 11;
  }
}



    map = new window.google.maps.Map(document.getElementById('map-create'), {
    center: {lat: LandL[0], lng: LandL[1]},
    zoom: Zoom,
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeId: window.google.maps.MapTypeId.ROADMAP,
    clickableIcons: false,
    gestureHandling: "cooperative", 
  });

    geocoder = new window.google.maps.Geocoder;
    var GeoMarker = new window.GeolocationMarker(map);

    var input = document.getElementById('input-location');
    var autocomplete = new window.google.maps.places.Autocomplete(input);
    var infowindow = new window.google.maps.InfoWindow();

    autocomplete.bindTo('bounds', map);

        marker = new window.google.maps.Marker({
          map: map,
          anchorPoint: new window.google.maps.Point(0, -29)
        });

    var here = this

        if (this.state.location[0]) {
          console.log("we do have location")
          marker.setPosition({lat: this.state.location[1], lng: this.state.location[0]});
          marker.setVisible(true);
        } else{
          console.log("we do NOT have location")
        }

  autocomplete.addListener('place_changed', function() {
          console.log('place_changed LISTENER AUTOCOMPL')
          infowindow.close();
          marker.setVisible(false);
          var place = autocomplete.getPlace();
          if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
          }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
          }
          console.log("LOCATION  FORM: ", place.geometry.location)
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);

          var address = '';

          console.log("place.address_components")
          console.log(place)


          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }

          //here.validateField('timezone', place.utc_offset)

          here.setState({ address: address, 
                          addressCustom: document.getElementById('input-location').value, 
                          location: [place.geometry.location.lat(),place.geometry.location.lng()],
                          //venueTimeOffset: place.utc_offset, 
                                    }, () => {
            console.log("VALID from initMap")
            here.validateField('location', here.state.location)
          })
})

    map.addListener("click", (e)=> {
      console.log("CLIKC to MAP")
      
      document.getElementById('input-location').value = ''

      // marker.setVisible(false);
      // marker.setPosition(e.latLng);
      // marker.setVisible(true);
    
      console.log(e.latLng.lat())
      console.log(e.latLng.lng())
      this.setState({ location: [e.latLng.lat(), e.latLng.lng()], 
                      addrOff: false, 
                      address: document.getElementById('input-location').value}, () => {
          this.geocodeLatLng(geocoder, map, e.latLng.lat(), e.latLng.lng())
      
      })
    })


}

geocodeLatLng = (geocoder, map, lat, lng) => {
      console.log("fce geocoder geocodeLatLng ", geocoder, map, lat, lng)
      var here = this
        //var input = {lat: 40.731, lng: 151.2714895};
        //var latlngStr = input.split(',', 2);
        //var latlng = {lat: this.props.workingLocationGate[0], lng: this.props.workingLocationGate[1]};
        var latlng = {lat: lat, lng: lng};
      
        geocoder.geocode({'location': latlng}, function(results, status, error_message) {
          console.log("GEOCODER RESULT: ", results[0])
          var spl = results[0].formatted_address.split(" ")
          var shortAddress = spl[0] + spl[1] + spl[2] + spl[3]
          console.log("GEOCODER RESULT: split: ", spl)
          if (status === 'OK') {
            if (here.state.addressOffer == '') {
                  here.setState({ address: results[0].formatted_address, 
                                  addressOffer: shortAddress,
                                  location: [lat,lng]
                                },
                                  () => {
                                    here.setupMarker()
                                  } )
                } else{
                  here.setState({ address: results[0].formatted_address, 
                                  location: [lat,lng]
                              },
                                () => {
                                  here.setupMarker()
                                } )
                }


          } else {
            window.alert('Geocoder failed due to: ' + status);
            console.log("results: ", results)
            this.setState({addressOffer: "No address in your location"})
          }
        });
      }

setupMarker = () => {
          console.log('setupMarker: value: location.length ', this.state.location)

          this.validateField('address', this.state.address)
          this.validateField('location', this.state.location)
          marker.setPosition({lat: this.state.location[0], lng: this.state.location[1]});
          map.setCenter({lat: this.state.location[0], lng: this.state.location[1]});
          
          if (this.state.location == '' ) {
            marker.setVisible(false);
            map.setZoom(9)
            var objErrors = this.state.Errors
            let objValidForm = this.state.ValidForm;
            objErrors.address = 'Missing Location'
            objValidForm.addressValid = false
            this.setState({Errors: objErrors, ValidForm: objValidForm})
          } else{
            marker.setVisible(true);
            map.setZoom(13)
            var objErrors = this.state.Errors
            let objValidForm = this.state.ValidForm;
            objErrors.address = ''
            objValidForm.addressValid = true
            this.setState({Errors: objErrors, ValidForm: objValidForm})
          }
}

customAddressSet = () => {
  console.log("customAddressSet - FCE")
  this.setState({address: '', location: '', addrOff: false }, () => {
    this.setupMarker()
  })
}

offeredAddressSet = () => {
  console.log("offeredAddressSet - FCE")
  this.setState({addrOff: true, address: this.state.addressOffer, location: this.props.workingLocationGate}, () => {
    this.setupMarker()
  })

}


  scrollTop = () => {
    console.log("scroll on TOP fce")
      document.querySelector('.catch1').scrollIntoView({
      block: "start", 
      inline: "nearest", 
      behavior: 'smooth' 
    });
  }


onSubmit = () => {

var anyError = false

        Object.keys(this.state.ValidForm).map((fieldName, i) => {
        console.log("ValidForm cycle check", fieldName)
      if(this.state.ValidForm[fieldName]){
        console.log("TRUE: ", this.state.ValidForm[fieldName]) 
      } else {
        anyError = true
              }
            })

    if (anyError) {
      console.log("There is some ERROR")
       document.getElementById("error-alert-popup").classList.remove("hideIt");
       this.scrollTop()
    } else{
       this.setState({isLoading: true})

    fetch('/custom-party', {
          method: 'POST',
          mode: "same-origin",
          headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  },
          body: JSON.stringify({
            isUpdating: this.props.isUpdating,
            updating_id: this.state.updating_id,
            name: document.getElementById('input-name').value,
            lng: this.state.location[0], 
            lat: this.state.location[1] , 
            addressGoogle: this.state.address,
            addressCustom: document.getElementById('input-location').value,
            eventType: this.state.valueTab,
            //dateStart: document.getElementById('dateFrom').value,
            //dateEnd: document.getElementById('dateTo').value, 
            dateStart: this.state.startDate,
            //duration: this.state.endDate, 
            
            price: document.getElementById('price').value,
            capacityMax: document.getElementById('capacityMax').value,
            EventGuests: [],
            BYO: this.state.BYO,
            //repeatWeek: document.getElementById('repeat-week').checked,
            // freeSnack: document.getElementById('snack').checked,
            // freeBeer: document.getElementById('beer').checked,
            // freeMeal: document.getElementById('meal').checked,
            imagesArr: this.state.uploadedFileCloudinaryUrl, 
            description: document.getElementById('description').value,
            confirmed: false,
            hide: false,
            creatorEmail: this.props.email,
            creator_id: this.props.user_id,
            creatorName: this.props.name,
            creatorPhoto: this.props.picture,
            userName: "Point",
            userPicture: "None",
            userEmail: "email-point",
            //attendedEventId: ['0'],
            hostedEventId: ['0'],
            rating: [{  guestId : '2342v342f4f4d', 
                  ratedEventId : '2342v342f4f4d' , 
                  ratingCustom : 4,
                  ratingComment : "Great Party Billy" }],
          }),
            }).then(res => {console.log("RES CREATE: ", res)

                    this.sendConfirmMailPetr()

                if (res.status == 200) {
                  console.log("res.status = ", res.status)
                  this.setState({showModalSuccess: true})
                } else{
                  if (res.status == 311) {
                    alert("On this location is one active event, MOVE LOCATION by at least 1 meter");
                    this.setState({isLoading: false})
                  } else{
                    alert("something went wrong");
                  }
                }
                return res.json()
              } 
            )
            .then(resReaded => {
              console.log("Prectena responce po Create: ", resReaded)
              console.log("Event._id -- ", resReaded.data._id)
              var newId = resReaded.data._id
              if (this.props.isUpdating) {
                var newId = this.state.preViewId
              } else{
                var newId = resReaded.data._id
              }

              setTimeout(() => {
                this.setState({showModalSuccess: false, redirectToMap: false, openPreView: true, preViewId: newId })
                this.props.cancelUpdatingGate()
                }, 2000);
          })
        }
      }

checkRedirectLogin = () => {
  if (this.props.isLoggedIn == false && this.state.displayRedirect == false) {
  console.log("FCE checkRedirectLogin()")
  this.setState({displayRedirect: !this.state.displayRedirect})
  }
}

handleChangeInput = (eventTaget) => {
  var nameField = eventTaget.name
  if (eventTaget.type == 'checkbox') {
    console.log("CATCHED CHECKbox")
    var valueField = eventTaget.checked
  } else{
    var valueField = eventTaget.value
  }
  this.validateField(nameField, valueField)
}

handleChangeInputDateLib = (event) => {

  console.log("handleChangeInputDateLib: ", event)

  //check validity startDate
    var nameField = "startDateSafari"
    var valueField = event.start
    this.validateField(nameField, valueField)

  //Just write endDate
    this.setState({endDate: event.end})
}

validateField(fieldName, value) {

  console.log("fieldANAme", fieldName)
   console.log("value", value)

   let objErrors = this.state.Errors;
   let objValidForm = this.state.ValidForm;

  switch(fieldName) {
    case 'name':
      this.setState({name: value})
      console.log("NAME value: fieldName ", value, fieldName)
      var nameValid = value.length >= 4;
      if (nameValid) {
        objValidForm.nameValid = true
        objErrors.name = ''
      } else{
        objValidForm.nameValid = false
        objErrors.name = 'Event name is too short (at least 4 characters)'
      }
      break;
    case 'address':
      this.setState({address: value})
      console.log("NAME value: fieldName ", value, fieldName)
      var addressValid = value.length > 0;
      if (addressValid) {
        objValidForm.addressValid = true
        objErrors.address = ''
      } else{
        objValidForm.addressValid = false
        objErrors.address = 'Address is too short or missing'
      }
      break;
    case 'location':
      console.log("NAME value: fieldName ", value, fieldName)
      console.log("value length ", value.length)
      var locationValid = value.length > 1;
      if (value.length > 1) {
        objValidForm.locationValid = true
        objErrors.location = ''
      } else{
        objValidForm.locationValid = false
        objErrors.location = 'Location has not been provided'
      }
      //let offset = new Date().getTimezoneOffset();
      // if (this.state.addrOff) {
      //   objValidForm.timeZoneValid = true
      //   objErrors.timezone = ''
      // } else{
      //     if (this.state.venueTimeOffset == -offset) {
      //       objValidForm.timeZoneValid = true
      //       objErrors.timezone = ''
      //     } else {
      //       objValidForm.timeZoneValid = false
      //       objErrors.timezone = 'location must be inside of your time-zone'
      //     }
      // }


      break;
    case 'startDate':

      console.log("VALID FORM startDate")
      var valSplit = value.split('-')
      var valSplitTime = this.state.workTime.split(':')

      var today = new Date()
      var todayMongo = new Date()
      todayMongo.setFullYear(valSplit[0])
      todayMongo.setMonth( parseInt(valSplit[1],10)-1 )
      todayMongo.setDate(valSplit[2])
      todayMongo.setHours(valSplitTime[0])
      todayMongo.setMinutes(valSplitTime[1])

      //alert(todayMongo)

      this.setState({startDate: todayMongo, workDate: value}, () => {
        // console.log("startDate: value MOZILA: ", this.state.startDate)
        // console.log("startDate: value MOZILA : new DAte() ", new Date(this.state.startDate))
      })

      var startDateValid = value.length > 0;
      if (startDateValid) {
          console.log(" 1 pass VALID FORM startDate")
        if (todayMongo > today) {
          console.log(" 2 pass VALID FORM startDate")
        objValidForm.startDateValid = true
        objErrors.startDate = ''
        } else{
            objValidForm.startDateValid = false
            objErrors.startDate = 'START date is in PAST fom DATE'
        }
      } else{
        objValidForm.startDateValid = false
        objErrors.startDate = 'START date is missing'
      }
      break;
  case 'startTime':
      // var nmbr = this.state.workDate + 'T' + value
      // console.log("nmbr: ", nmbr)
      // var today = new Date()
      // var evntDate = new Date(nmbr) 
      // console.log("today: je: ", today)
      // console.log("evntDate: je: ", evntDate)

      var valSplit = this.state.workDate.split('-')
      // alert(valSplit[0])
      // alert(parseInt(valSplit[1],10)-1)
      // alert(valSplit[2])
      var valSplitTime = value.split(':')

      var today = new Date()
      var todayMongo = new Date()
      todayMongo.setFullYear(valSplit[0])
      todayMongo.setMonth( parseInt(valSplit[1],10)-1 )
      todayMongo.setDate(valSplit[2])
      todayMongo.setHours(valSplitTime[0])
      todayMongo.setMinutes(valSplitTime[1])

      //alert(todayMongo)

      
      this.setState({startDate: todayMongo, workTime: value}, () => {
        // console.log("startDate: value MOZILA: ", this.state.startDate)
        // console.log("startDate: value MOZILA : new DAte() ", new Date(this.state.startDate))
      })

      var startDateValid = value.length > 0;
      console.log("VALID TIME ZERO PASS", startDateValid)
      if (startDateValid) {
        console.log("VALID TIME FIRST PASS")
        if (todayMongo > today) {
        console.log("VALID TIME SECOND PASS")
        objValidForm.startDateValid = true
        objErrors.startDate = ''
        } else{
            objValidForm.startDateValid = false
            objErrors.startDate = 'START date is in PAST from Time'
        }
      } else{
        objValidForm.startDateValid = false
        objErrors.startDate = 'START date is missing'
      }
      break;
    case 'startDateSafari':
    console.log("CASE: startDateSafari: ", value.length)
      var today = new Date()
      var evntDate = new Date(value) 
      evntDate.setSeconds(0,0)
      var ISOevnt = evntDate.toISOString()
      console.log("CASE: startDateSafari: evntDate.toISOString ", ISOevnt)

      var ISOevntShort = ISOevnt.substring(0, ISOevnt.indexOf(':', ISOevnt.indexOf(':')+1))

      console.log("START SAVED INTO DB safa: ", ISOevntShort)

      this.setState({startDate: evntDate}, () => {
        console.log("startDate: value: ", this.state.startDate)
        console.log("startDate: value: new DAte() ", new Date(this.state.startDate))
      })
      this.setState({startDateSafari: evntDate})

      var startDateValid = value > 0;
      if (startDateValid) {
        console.log("CASE: startDateSafari LENGTH VALID: ", startDateValid)
        if (evntDate > today) {
        console.log("CASE: startDateSafari FUTURE VALID: ", evntDate > today)
        objValidForm.startDateValid = true
        objErrors.startDate = ''
        } else{
            objValidForm.startDateValid = false
            objErrors.startDate = 'START date is in PAST'
        }
      } else{
        objValidForm.startDateValid = false
        objErrors.startDate = 'START date is missing'
      }
      break;
    case 'BYO':
      console.log("BYO value: ", value)
      console.log("BYO state: ", this.state.BYO)
      this.setState({BYO: !this.state.BYO}, () => {
          console.log("BYO state after: ", this.state.BYO)
      })
      
      break;
    // case 'repeat':
    //   this.setState({repeatWeek: value})
    //   break;
    // case 'freeSnack':
    //   this.setState({freeSnack: value})
    //   break;
    // case 'freeBeer':
    //   this.setState({freeBeer: value})
    //   break;
    // case 'freeMeal':
    //   this.setState({freeMeal: value})
    //   break;      
    case 'price':
    console.log("VALIDATING PRICCCCCE value length: ", typeof value)
    var Num = parseInt(value, 10);
      this.setState({price: Num})
      console.log("NAME value, fieldName: ", value , fieldName)
      var priceValid = value.length > 0;
      if (priceValid) {
        console.log("VALID PRICE PASS")
        objValidForm.priceValid = true
        objErrors.price = ''
      } else{
        console.log("VALID PRICE BAN")
        objValidForm.priceValid = false
        objErrors.price = 'price in missing'
      }
      break;
    case 'capacity':
      this.setState({maxCapacity: value})
      console.log("NAME value, fieldName: ", value , fieldName)
      var capacityValid = value.length > 0;
      if (capacityValid) {
        objValidForm.capacityValid = true
        objErrors.capacity = ''
      } else{
        objValidForm.capacityValid = false
        objErrors.capacity = 'capacity in missing'
      }
      break;
    case 'description':
      this.setState({description: value})
      console.log("NAME value, fieldName: ", value , fieldName)
      var descriptionValid = value.length >= 20;
      if (descriptionValid) {
        objValidForm.descriptionValid = true
        objErrors.description = ''
      } else{
        objValidForm.descriptionValid = false
        objErrors.description = 'description in too short'
      }
      break;

    default:
      break;
  }
   this.setState({Errors: objErrors, ValidForm: objValidForm},() => {
    console.log("AFTER VALID SATES: ")
    console.log(this.state.Errors)
    console.log(this.state.ValidForm)
    } 
   )
  //,
  //                 emailValid: emailValid,
  //                 passwordValid: passwordValid
  //               }, this.validateForm);
}

dismissAlert = () => {
 document.getElementById("error-alert-popup").classList.add("hideIt");
}

openCloseModalSuccess = () => {
  this.setState({showModalSuccess: !this.state.showModalSuccess})
}

setToChange = () =>{

  console.log("UPLOAD setting values")

      var offset = (new Date()).getTimezoneOffset() * 60000
      var evnt = new Date(this.props.updatingValues.dateStart)
      var nowAndHere = new Date(evnt - offset)
      console.log("nowAndHere: ", nowAndHere.toISOString())
      var Tsplit = nowAndHere.toISOString().split(/:|T/)
      var timeString = Tsplit[1] + ':' + Tsplit[2]
      var string = Tsplit[0] + 'T' + Tsplit[1] + ':' + Tsplit[2]

  this.setState({ updating_id: this.props.updatingValues._id,
                  preViewId: this.props.updatingValues._id,
                  name: this.props.updatingValues.name,
                  startDate: new Date(string),
                  workDate: Tsplit[0],
                  workTime: timeString,
                  endDate: this.props.updatingValues.dateEnd,
                  price: this.props.updatingValues.price,
                  maxCapacity: this.props.updatingValues.capacityMax, 
                  address: this.props.updatingValues.addressCustom,
                  location: [this.props.updatingValues.geometry.coordinates[1], this.props.updatingValues.geometry.coordinates[0]],
                  BYO: this.props.updatingValues.BYO,
                  //repeatWeek: this.props.updatingValues.repeatWeek, 
                  // freeSnack: this.props.updatingValues.freeSnack, 
                  // freeBeer: this.props.updatingValues.freeBeer, 
                  // freeMeal: this.props.updatingValues.freeMeal, 
                  uploadedFileCloudinaryUrl: this.props.updatingValues.imagesArr,
                  description: this.props.updatingValues.description,
                Errors: {     name: '', 
                              address: '',
                              location: '', 
                              startDate: '',
                              price: '',
                              capacity: '',
                              description: ''},
                ValidForm: {
                              nameValid: true,
                              addressValid: true,
                              locationValid: true,
                              startDateValid: true, 
                              priceValid: true, 
                              capacityValid: true,
                              descriptionValid: true,},

                }, () => {
                    this.initMap()

                    //this.validateAll()
                  })
}


// validateAll = () => {
//   var list = document.getElementsByTagName("input");
//   console.log("validateAll getElementsByTagName: ", list)
//   _.map(list, (inputt) => { console.log("name + value: ", inputt.name, inputt.value) 
//           this.handleChangeInput(inputt)
//     })
//   }

  // isWithinTimeZone = () => {
  //   var offset = new Date().getTimezoneOffset();

  //   if (this.state.venueTimeOffset == -offset) {
  //     return <Glyphicon className="glyphicon glyphicon-ok" ></ Glyphicon>
  //       } else return <Glyphicon className="glyphicon glyphicon-remove" ></ Glyphicon>
    
  // }

    addCountDay = () => {

        var date = new Date(this.state.workDate)
        console.log("Date ++ : ", date)
        date.setDate(date.getDate() + 1)
        
        console.log("toString(10): newTime ", date)
        var split = date.toISOString().split("T")
        console.log('date.toISOString(): ', date.toISOString())
        var newDate = split[0]

        console.log("New Date: ", newDate)
        this.setState({workDate: newDate})
        this.validateField('startDate', newDate)
      }

  minusCountDay = () => {

        var date = new Date(this.state.workDate)
        console.log("Date ++ : ", date)
        date.setDate(date.getDate() - 1)
        
        console.log("toString(10): newTime ", date)
        var split = date.toISOString().split("T")
        console.log('date.toISOString(): ', date.toISOString())
        var newDate = split[0]

        console.log("New Date: ", newDate)
        this.setState({workDate: newDate})
        this.validateField('startDate', newDate)
      }

  addCountHour = () => {

        var nmbr = this.state.workTime.split(":")
        nmbr = parseInt(nmbr[0])
        console.log("TIME ++ adding Hour : ", nmbr)
        if (nmbr == 23) {
          var value = '00'
        } else{
          if (nmbr < 9) {
            var value = nmbr + 1
            value = '0' + value
            value = value.toString(10)
          } else{
          var value = nmbr + 1
          value = value.toString(10)
          }
        }
        
        var newTime = value + ':00'
        console.log("toString(10): newTime ", newTime)
        this.setState({workTime: newTime})
        this.validateField('startTime', newTime)
      }

  minusCountHour = () => {

        var nmbr = this.state.workTime.split(":")
        nmbr = parseInt(nmbr[0])
        console.log("TIME --  : ", nmbr)
        if (nmbr == 0) {
          var value = 23
          value = value.toString(10)
        } else{
          if (nmbr <= 10) {
          var value = "0" + (nmbr - 1)
          value = value.toString(10)
          } else{
          var value = nmbr - 1
          value = value.toString(10)
          }

        } 
        var newTime = value + ':00'
        console.log("toString(10): newTime ", newTime)
        this.setState({workTime: newTime})
        this.validateField('startTime', newTime)
      }

  addCountPrice = () => {

        var nmbr = parseInt(document.getElementById('price').value, 10);
        var value = nmbr + 1
        value = value.toString(10)
        this.validateField('price', value)
      }

  minusCountPrice = () => {
        var nmbr = parseInt(document.getElementById('price').value, 10);
        if (nmbr <= 0) {
          var value = nmbr
        } else{
          var value = nmbr - 1
        }
        
        value = value.toString(10)
        this.validateField('price', value)
      }

  addCountPeople = () => {

        var nmbr = parseInt(document.getElementById('capacityMax').value, 10);
        var value = nmbr + 1
        value = value.toString(10)
        this.validateField('capacity', value)
      }

  minusCountPeople = () => {
        var nmbr = parseInt(document.getElementById('capacityMax').value, 10);
        if (nmbr <= 0) {
          var value = nmbr
        } else{
          var value = nmbr - 1
        }
        
        value = value.toString(10)
        this.validateField('capacity', value)
      }  

  sendConfirmMailPetr = () => {

    var body = "NEW EvenT created NOW: - " + this.props.name

          fetch('/mail/post', {
          method: 'POST',
          mode: "same-origin",
          headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  },
          body: JSON.stringify({
            guestEmail: "ihoskovecpetr@gmail.com",
            question: body,
          })
        })
}  
 

  render() {


    //this.checkRedirectLogin()
    console.log("RENDERING whole Create.js", this.props)
    // console.log("muzu se spolihat na this.props.location.state? ", this.props.location.state)
    // if (this.props.location.state) {
      
    //   console.log("MUZU")
    // } else{
    //   console.log("Nemuzu")
    // }

      // if (this.props.isLoggedIn === false) {
      //   return(<Redirect to='/login' />) 
      // }

      if (this.state.displayRedirect === true) {
        return(<Redirect to='/login' />) 
      }


      if (this.state.redirectToMap === true) {
        return(<Redirect to='/map' />) 
      }

      if (this.state.openPreView === true) {
        var PreViewUrl = `/event/${this.state.preViewId}`
        return(<Redirect to={PreViewUrl} />) 
      }

      if (this.props.isUpdating == true && UpdRendered == false) {
        console.log("PODMINKA RENDER Upd??")
        UpdRendered = true;
        this.setToChange()
      }

      // <Row>
      //   <Nav isLoggedIn={this.props.isLoggedIn} picture={this.props.picture} /> 
      // </Row>

    return (
      <div id="jumbo-create" className={classnames("jumbo-back-all", { 'freez': this.props.EventOrUser })} >
      <div id="nav-point-roll"></div>
      <span className='catch1'></span>
        <Grid id="gridMainPage-create" >

       <Row id="new-Row0" >

        <Col className="col-create-headline animated fadeIn" xs={12} md={12} >
        <div id="main-header">
         <h2>JUST DO IT</h2>
         <h1>NOW</h1>
         </div>
        </Col>

       {this.props.isUpdating ?
      <Col className="col-create-headline-updating" xs={12} md={12} >
        <p>Updating event: <b>{this.state.name}</b></p>
      <div className="buttons-updating">
      <button onClick={this.onSubmit}><Glyphicon className="glyphicon glyphicon-ok" /> SAVE & see preview</button>
      <button onClick={this.props.cancelUpdatingGate}><Glyphicon className="glyphicon glyphicon-remove-sign" /> Cancel</button>
       </div>
      </Col>
      :
      null
       }
      </Row>

        <Row id="row-alert">
          <Alert id="error-alert-popup" className="hideIt" onDismiss={this.dismissAlert} bsStyle="danger">
              <h1>Error</h1>
        {Object.keys(this.state.Errors).map((fieldName, i) => {
          console.log("Errors cycle check")
        if(this.state.Errors[fieldName].length > 0){
          return (
            <p key={i}>{this.state.Errors[fieldName]}</p>
          )        
        } else {
          return '';
                }
              })}
          </Alert>
        </Row>


      <Row id="new-Row01" >

        {!this.props.isLoggedIn ?
        <Col id="col-login" xs={12} md={12} >
          <Link key={56}
                  to={{
                  pathname: `/login`,
                  state: { }}}>
                <Button >Login first to Continue</Button>
          </Link>
        </Col>
        :
        <Col id="new-col-row1-name" xs={12} md={12} >
               <div className={classnames("form-group", { 'has-error': !this.state.ValidForm.nameValid })}>
                  <p>Event Name</p>
                    <input  id="input-name" 
                            type="text"
                            name="name"
                            className='form-control' 
                            placeholder='Animal first party' 
                            value={this.state.name} 
                            onChange={(event) => this.handleChangeInput(event.target)} />
                </div>
        </Col>
            }
        </Row>

        <Row id="new-Row1" >

        <Col id="new-col-row1"   xs={12} md={12} >
               <div className={classnames("form-group", { 'has-error': !this.state.ValidForm.addressValid })}>
                <p>Location</p>
                <label class="container">
                <input type="radio" name="addressOption"
                                    checked={this.state.addrOff} 
                                     onClick={this.offeredAddressSet}
                                     />
                <span class="checkmark">
                    {this.state.addressOffer ? <span>{this.state.addressOffer}</span> : <span>Loading location...</span>}
                    {this.props.workingLocationGate[1] ? <span> - GPS OK</span> : <span> - GPS NA</span>} 
                </span>
                </label>
                <label class="container">
                <input type="radio" name="addressOption" 
                                    checked={!this.state.addrOff} 
                                    onClick={this.customAddressSet}
                                     />
                <span class="checkmark">
                    Search...   
                </span>
              </label>
            <form id="form-location" autocomplete="off" action="">
                <input  id="input-location" 
                    className='form-control' 
                    placeholder={this.state.address}
                    value={this.state.address}
                    name='address' 
                    autocomplete="false" 
                    onChange={(event) => this.handleChangeInput(event.target)}
                    onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}} />
          </form>
      
          <div className={classnames("form-group", { 'has-error': !this.state.ValidForm.locationValid })}>
          <div id="map-create"> </div>
          <div className='current-location-mark-wrap'>
            <img className="current-location-mark" src={CurLocV} onClick={this.offeredAddressSet} />
          </div>
          <div className="map-subscrib"><p>Tap on Map to change location</p></div>
          </div>
          </div>
        </Col>
        <Col xs={12} md={12}>
            
        </Col>
        <Col xs={12} md={12}>
          <AppBar position="static" color="default">
          <Tabs
            value={this.state.valueTab}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="ADD Public Event"  />
            <Tab label="ADD Place for group Booking" />
          </Tabs>
        </AppBar>
              <SwipeableViews
                axis={'x'}
                index={this.state.valueTab}
              >
              <React.Fragment>

              <Col className="explain-moto" xs={12} md={12}>
                <p>Once time event is one time event to which manny guests can join and you will collect fee from anyone joining.</p>
              </Col>

                {this.state.injectDatePickerState ? 
                <React.Fragment>
                <Col id="new-col-row1-date" xs={12} md={12} >
                              <DatetimeRangePicker
                                startDate={this.state.startDateSafari}
                                dateFormat={true}
                                name="DateLibrary"
                                utc={false}
                                closeOnSelect={false}
                                className={"date-range-wrap-create"}
                                onChange={(event) => this.handleChangeInputDateLib(event)} /> 
                </Col>
                </React.Fragment>
                :
                <React.Fragment>
                    <Col id="new-col-row1-date" xs={12} md={12} >
                      
                      <div className={classnames("form-group", { 'has-error': !this.state.ValidForm.startDateValid })}>
                      <p>Date</p>
        
                      <Button className="minus-btn" onClick={this.minusCountDay} ><Glyphicon className="glyphicon glyphicon-chevron-left" /></Button>
                      <input  id="dateFrom" 
                              className='form-control' 
                              name="startDate"
                              value={this.state.workDate}  
                              type="date" 
                              onChange={(event) => this.handleChangeInput(event.target)} />
                      <Button className="plus-btn" onClick={this.addCountDay} ><Glyphicon className="glyphicon glyphicon-chevron-right" /></Button>
                      </div>

                    </Col>
                    <Col id="new-col-row1-time" xs={12} md={12} >
                      
                      <div className={classnames("form-group", { 'has-error': !this.state.ValidForm.startDateValid })}>
                     <p>Time</p>
                    
                     <Button className="minus-btn" onClick={this.minusCountHour} ><Glyphicon className="glyphicon glyphicon-chevron-left" /></Button>
                      <input  id="timeFrom" 
                              className='form-control' 
                              name="startTime"
                              type="time" 
                              value={this.state.workTime}
                              onChange={(event) => this.handleChangeInput(event.target)} />
                      <Button className="plus-btn" onClick={this.addCountHour} ><Glyphicon className="glyphicon glyphicon-chevron-right" /></Button>

                      </div> 
                    </Col>
                  </React.Fragment>
                  }
                  <Col id="col-create-capacity" xs={12} md={12}>
                     <div className={classnames("form-group", { 'has-error': !this.state.ValidForm.capacityValid })}>
                    <p>Capacity</p>
                    <Button className="minus-btn transparent" onClick={this.minusCountPeople} ><Glyphicon className="glyphicon glyphicon-chevron-left" /></Button>
                     <input id="capacityMax"
                            className='form-control'
                            type='number' 
                            name='capacity'
                            min="1" 
                             max="10"
                             step="1"
                            value={this.state.maxCapacity} 
                            placeholder='10'
                            onChange={(event) => this.handleChangeInput(event.target)} />
                      <Button className="plus-btn transparent" onClick={this.addCountPeople} ><Glyphicon className="glyphicon glyphicon-chevron-right" /></Button>
                       </div>
                    </Col>

                    <Col id="new-col-row1-price"  xs={12} md={12} >
                     <div className={classnames("form-group", { 'has-error': !this.state.ValidForm.priceValid })}>
                           <p>Fee per person</p>

                          <Button className="minus-btn" onClick={this.minusCountPrice} ><Glyphicon className="glyphicon glyphicon-chevron-left" /></Button>
                          <input  id="price" 
                                  className='form-control'
                                  name='price' 
                                  type="number"
                                  min="0" 
                                  value={this.state.price}
                                  placeholder='5'
                                  onChange={(event) => this.handleChangeInput(event.target)} />
                          <Button className="plus-btn" onClick={this.addCountPrice} ><Glyphicon className="glyphicon glyphicon-chevron-right" /></Button>
                        </div>
                    </Col>
              </React.Fragment>
              <div className="hideThis">
                <Col className="explain-moto" xs={12} md={12}>
                  <p>Your place will be positioned on map and marked as available for group events. One guest in behalf of whole group will then be able to contact you and confirm booking.</p>
                </Col>


                 <Col id="new-col-row1-time" xs={12} md={12} >
                      
                      <div className={classnames("form-group", { 'has-error': !this.state.ValidForm.startDateValid })}>
                     <p>Time</p>
                    
                     <Button className="minus-btn" onClick={this.minusCountHour} ><Glyphicon className="glyphicon glyphicon-chevron-left" /></Button>
                      <input  id="timeFrom" 
                              className='form-control' 
                              name="startTime"
                              type="time" 
                              value={this.state.workTime}
                              onChange={(event) => this.handleChangeInput(event.target)} />
                      <Button className="plus-btn" onClick={this.addCountHour} ><Glyphicon className="glyphicon glyphicon-chevron-right" /></Button>

                      </div> 
                 </Col>
    
                 <Col id="col-create-capacity" xs={12} md={12}>
                     <div className={classnames("form-group", { 'has-error': !this.state.ValidForm.capacityValid })}>
                    <p>Capacity</p>
                    <Button className="minus-btn transparent" onClick={this.minusCountPeople} ><Glyphicon className="glyphicon glyphicon-chevron-left" /></Button>
                     <input id="capacityMax"
                            className='form-control'
                            type='number' 
                            name='capacity'
                            min="1" 
                             max="10"
                             step="1"
                            value={this.state.maxCapacity} 
                            placeholder='10'
                            onChange={(event) => this.handleChangeInput(event.target)} />
                      <Button className="plus-btn transparent" onClick={this.addCountPeople} ><Glyphicon className="glyphicon glyphicon-chevron-right" /></Button>
                       </div>
                  </Col>

                  <Col id="new-col-row1-price"  xs={12} md={12} >
                     <div className={classnames("form-group", { 'has-error': !this.state.ValidForm.priceValid })}>
                           <p>Fee per person</p>

                          <Button className="minus-btn" onClick={this.minusCountPrice} ><Glyphicon className="glyphicon glyphicon-chevron-left" /></Button>
                          <input  id="price" 
                                  className='form-control'
                                  name='price' 
                                  type="number"
                                  min="0" 
                                  value={this.state.price}
                                  placeholder='5'
                                  onChange={(event) => this.handleChangeInput(event.target)} />
                          <Button className="plus-btn" onClick={this.addCountPrice} ><Glyphicon className="glyphicon glyphicon-chevron-right" /></Button>
                        </div>
                  </Col>
              </div>

              </SwipeableViews>
        </Col>
           
        <Col id="new-col-row1-weekly" className="hideThis" xs={12} md={12}>
        <p>REPEAT weekly (not working yet)</p>
               <label class="switch">
        <input  type="checkbox" 
                id="repeat-week" 
                name="repeat"
                checked={this.state.repeatWeek}
                onChange={(event) => this.handleChangeInput(event.target)}
                 />
        <span class="slider round"></span>
      </label>
       </Col>
                          
    

        <Col id="new-col-row1-upload" xs={12} md={12}>
        <div className="form-group">
        <p>IMAGES</p> 
        <div className="FileUpload"> 
               
         <Dropzone
          onDrop={this.onImageDrop.bind(this)}
          accept="image/*"
          multiple={true}
          disabled={this.state.isUploading}>
            {({getRootProps, getInputProps}) => {
              return (
                <div
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  
                   {this.state.isUploading ? 
                    <Image className="upload-spinner"  src={SpinnerV} />
                    :
                    <Image className="upload-logo"  src={UploadV} />
                   }
                </div>

              )
          }}
        </Dropzone> 
        <div id="white-line"> </div>

        {this.state.display ? <Gallery  images={this.state.uploadedFileCloudinaryUrl} 
                                        rowHeight={100} 
                                        display={this.state.display}
                                        backdropClosesModal={true}/> 
                                        : 
                                        <span> </span>}      
        {this.state.display ? <span> </span>
                              : 
                              <Gallery  images={this.state.uploadedFileCloudinaryUrl} 
                                        rowHeight={100} 
                                        display={this.state.display}
                                        backdropClosesModal={true}/>}      
            {//this.state.uploadedFileCloudinaryUrl.length >= 2 ? <Glyphicon className="glyphicon glyphicon-remove-sign" id="delete-images" onClick={this.forceDisplay}> </ Glyphicon>: <span>  </span>
          }
              </div>
            </div>
        </Col>

         <Col id="new-col-row1-free"  xs={12} md={12} >
         <div className="form-group">
               <p>BYO (is it possible to <b>B</b>ring <b>Y</b>our <b>O</b>wn drink/snack)</p>

              <div className="scoop">
                  <label>
                  <input type="radio" 
                          name="BYO"
                          checked={this.state.BYO}
                          onClick={(event) => this.handleChangeInput(event.target)}
                          />
                  <span class="checkmark">
                  <span>YES</span>
                  </span>
                  </label>

                  <label>
                  <input type="radio" 
                         name="BYO"
                         checked={!this.state.BYO}
                         onClick={(event) => this.handleChangeInput(event.target)}  
                         />
                  <span class="checkmark">
                  <span>NO</span>
                  </span>
                  </label>
              </div>
          </div>

                
        </Col>

        <Col id="new-col-row1" xs={12} md={12} >
         
         <div className={classnames("form-group", { 'has-error': !this.state.ValidForm.descriptionValid })}>
               <p>Description*</p>
          <textarea id="description"
                    className='form-control' 
                    name='description' 
                    rows="4" 
                    cols="50"
                    value={this.state.description} 
                    placeholder='Example: Upon arival you will get welcome drink and some snacks will be ready on the balcony'
                    onChange={(event) => this.handleChangeInput(event.target)} >
          </textarea>
          </div>
        </Col>


      {this.props.isUpdating ?
      <div className="buttons-updating">
        <button  onClick={this.onSubmit}><Glyphicon className="glyphicon glyphicon-ok" />SAVE & see preview</button>
        <button  onClick={this.props.cancelUpdatingGate}>Cancel</button>
        <p id="star-inform" >Fields assigned with <b>* are mandatory</b></p>
       </div>
       :
       <Col id="new-col-row-launch" xs={12} md={12}>
        <p id="star-inform" >Fields assigned with <b>* are mandatory</b></p>
        <Button bsStyle="info" onClick={this.onSubmit} disabled={this.state.isLoading || this.state.isUploading} >
          <p>Preview</p>
        </Button>
        {this.state.isUploading ?
        <p>Please wait to finish uploading images to launch event</p>
        :
        <p></p>
        }
      </Col>
      }

        </Row>

        <Footer />

      </Grid>

  <div className="mod-Alert">        

              <Modal show={this.state.showModalSuccess} >

            <Alert>      
                  Creating preview...
                  <Image className="upload-spinner"  src={SpinnerV} />

                  <div className="btn-creating-event" >
                    <Button onClick={this.openCloseModalSuccess} bsStyle="success">
                     Close
                    </Button>
                  </div>
                       
                      </Alert >
                    </Modal>
                  </div>

      </div>
    );
  }
}

export default withRouter(Create)

 // <Col id="new-col-row1-free"  xs={12} md={12} >
 //               <p>FREE stuff</p>
                  
 //              <div className="check">    <input id="snack" 
 //                                                type="checkbox" 
 //                                                name="freeSnack" 
 //                                                checked={this.state.freeSnack}
 //                                                onChange={(event) => this.handleChangeInput(event.target)} /> 
 //                <p>Snacks</p> <img src={PeanutV}/> 
 //              </div>

 //              <div className="check">    <input id="beer" 
 //                                                type="checkbox" 
 //                                                name="freeBeer" 
 //                                                checked={this.state.freeBeer}
 //                                                onChange={(event) => this.handleChangeInput(event.target)}/> 
 //                <p>Beer</p> <img src={BeerV}/> 
 //              </div>

 //              <div className="check">    <input id="meal" 
 //                                                type="checkbox" 
 //                                                name="freeMeal" 
 //                                                checked={this.state.freeMeal}
 //                                                onChange={(event) => this.handleChangeInput(event.target)}/> 
 //                <p>Meal</p> <img src={MealV}/> 
 //              </div>
                
 //        </Col>


