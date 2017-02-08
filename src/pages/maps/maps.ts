import { Component, ViewChild, ElementRef } from '@angular/core';

import { NavController, Platform, ModalController, NavParams, ViewController } from 'ionic-angular';
import { Geolocation} from 'ionic-native';
import {ModalContentPage} from './modal';

declare var google:any;

declare var klokantech:any;
var x: number = 5;
var marker: any;
var map:any;
var infoWindow:any;

@Component({
  selector: 'home-map',
  templateUrl: 'maps.html'
})
export class MapsPage {
 
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  mapInitialised: boolean = false;
  apiKey: any;
  rootURL: any;
  marker:any;
  
  
  
  constructor(public navCtrl: NavController, public platform: Platform,public modalCtrl: ModalController) {
    infoWindow = ModalController;
  }
 

  ngAfterViewInit() {
    this.initializeMap();
  }
 
  ionViewLoaded(){
    this.initializeMap();
  }
 
  initializeMap() {
    /*let modal = this.modalCtrl.create(ModalContentPage, {charNum:1});
    modal.present();*/
    //this.openModal({charNum:0});

    this.platform.ready().then(() => {
        
        var minZoomLevel = 12;
        var pandeglangPoint = new google.maps.LatLng(-6.3252738,106.0764884);
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: minZoomLevel,
            center: pandeglangPoint,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var geolocationDiv = document.createElement('div');
        var geolocationControl = this.GeolocationControl(geolocationDiv, map);
        map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(geolocationDiv);
        //var geoloccontrol = new klokantech.GeolocationControl(map, 12);
        var myLatlng = new google.maps.LatLng(-6.452209999,107.040650001);
        
        marker = new google.maps.Marker({
            position: pandeglangPoint,
            title:"Hello World!",
            animation: google.maps.Animation.DROP,
        });

        marker.setMap(map);
        //marker.addListener('click', this.toggleBounce(this.modalCtrl));
        marker.addListener('click',()=>{
          //this.modalCtrl.create(ModalContentPage, {charNum:2}).present();
          this.openModal({charNum:3});
          //this.toggleBounce(this.modalCtrl);
        });
        
    });
  }

  toggleBounce(modal) {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
    this.openModal({charNum:0});
    console.log(modal);
    
   
  }

  GeolocationControl(controlDiv, map) {

      // Set CSS for the control button
      var controlUI = document.createElement('div');
      controlUI.style.backgroundColor = '#444';
      controlUI.style.borderStyle = 'solid';
      controlUI.style.borderWidth = '1px';
      controlUI.style.borderColor = 'white';
      controlUI.style.height = '28px';
      controlUI.style.marginTop = '5px';
      controlUI.style.cursor = 'pointer';
      controlUI.style.textAlign = 'center';
      controlUI.title = 'Click to center map on your location';
      controlDiv.appendChild(controlUI);

      // Set CSS for the control text
      var controlText = document.createElement('div');
      controlText.style.fontFamily = 'Arial,sans-serif';
      controlText.style.fontSize = '10px';
      controlText.style.color = 'white';
      controlText.style.paddingLeft = '10px';
      controlText.style.paddingRight = '10px';
      controlText.style.marginTop = '8px';
      controlText.innerHTML = 'Center map on your location';
      controlUI.appendChild(controlText);

      // Setup the click event listeners to geolocate user
      google.maps.event.addDomListener(controlUI, 'click', this.geolocate);
  }

  geolocate() {
      
      marker.setMap(null);
      Geolocation.getCurrentPosition().then((position) => {
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        
        let markerMylocation = new google.maps.Marker({
            position: latLng,
            title:"Lokasi saya saat ini!",
            animation: google.maps.Animation.DROP,
        });
        
        markerMylocation.setMap(map);
        map.setCenter(latLng);
        /*google.maps.event.addDomListener(markerMylocation, 'click', () =>{

        });*/
        
        

      }, (err) => {
        console.log(err);
      });

      let watch = Geolocation.watchPosition();
      watch.subscribe((data) => {
        // data can be a set of coordinates, or an error (if an error occurred).
        // data.coords.latitude
        // data.coords.longitude
      });
      
  }

  addYourLocationButton (map, marker) {
      let controlDiv = document.createElement('div');

      var firstChild = document.createElement('button');
      firstChild.style.backgroundColor = '#fff';
      firstChild.style.border = 'none';
      firstChild.style.outline = 'none';
      firstChild.style.width = '28px';
      firstChild.style.height = '28px';
      firstChild.style.borderRadius = '2px';
      firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
      firstChild.style.cursor = 'pointer';
      firstChild.style.marginRight = '10px';
      firstChild.style.padding = '0';
      firstChild.title = 'Your Location';
      controlDiv.appendChild(firstChild);

      var secondChild = document.createElement('div');
      secondChild.style.margin = '5px';
      secondChild.style.width = '18px';
      secondChild.style.height = '18px';
      secondChild.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-2x.png)';
      secondChild.style.backgroundSize = '180px 18px';
      secondChild.style.backgroundPosition = '0 0';
      secondChild.style.backgroundRepeat = 'no-repeat';
      firstChild.appendChild(secondChild);

      google.maps.event.addListener(map, 'center_changed', function () {
          secondChild.style['background-position'] = '0 0';
      });

      firstChild.addEventListener('click', function () {
          var imgX = '0',
              animationInterval = setInterval(function () {
                  imgX = imgX === '-18' ? '0' : '-18';
                  secondChild.style['background-position'] = imgX+'px 0';
              }, 500);

          if(navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(function(position) {
                  var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                  map.setCenter(latlng);
                  clearInterval(animationInterval);
                  secondChild.style['background-position'] = '-144px 0';
              });
          } else {
              clearInterval(animationInterval);
              secondChild.style['background-position'] = '0 0';
          }
      });

      //controlDiv.index = 1;
      map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
  }

  addMarker(){
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
  
    let content = "<h4>Information!</h4>";          
  
    this.addInfoWindow(marker, content);
  
  }

  public addInfoWindow(marker, content){
    
    infoWindow = new google.maps.InfoWindow({
      content: content
    });
  
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(map, marker);
    });
  
  }

  createButtonGeo(){
      let script = document.createElement("script");
      script.id = "locationButton";
      script.src = 'https://cdn.klokantech.com/maptilerlayer/v1/index.js';
      
 
      document.head.appendChild(script);
      
  }

  setMarkers(map,locations){
        
        for (var i = 0; i < locations.length; i++){  
          var title = locations[i]['poi_nama'];
          var lat = (locations[i]['y']);
          var long = (locations[i]['x']);
          
			    let latlngset = new google.maps.LatLng(lat, long);
			    let marker = new google.maps.Marker({  
              map: map, title: title,
              position: latlngset
          });
        }
  }

  openModal(characterNum) {

    let modal = this.modalCtrl.create(ModalContentPage, characterNum);
    modal.present();
  }
 
  
}


