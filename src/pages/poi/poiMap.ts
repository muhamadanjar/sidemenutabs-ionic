import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation, Geoposition } from 'ionic-native';
import { PoiPage } from './poi';
import { Storage } from '@ionic/storage';
declare var google:any;
var map:any;
var markers = [];
@Component({
  selector: 'page-PoiMap',
  templateUrl: 'PoiMap.html',
  
})

export class PoiMapPage {
  public data:any;
  constructor(
    public navparams: NavParams,
    public navCtrl : NavController,
    public storage: Storage,
    public platform: Platform) {
      this.data = navparams.data.data;

      let latlngset = new google.maps.LatLng(this.data.y, this.data.x);
			let marker = new google.maps.Marker({  
        map: map, title: 'Lokasi Disini',
        position: latlngset
      });
    }

  initializeMap() {
    this.platform.ready().then(() => {
        var infowindow = new google.maps.InfoWindow();
        var minZoomLevel = 12;
        var pandeglangPoint = new google.maps.LatLng(-6.3252738,106.0764884);
        
        map = new google.maps.Map(document.getElementById('map'), {
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: pandeglangPoint,
            zoom: minZoomLevel,
            mapTypeControl: false,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.TOP_CENTER
            },
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.TOP_LEFT
            },
            scaleControl: false,
            streetViewControl: true,
            streetViewControlOptions: {
                position: google.maps.ControlPosition.LEFT_TOP
            },
            fullscreenControl: true
        });
        
    });
  }
  ngAfterViewInit() {
    this.initializeMap();
    console.log(this.data);
  
  }

  goBack(){
    this.storage.set('datapoi',this.data);
    this.navCtrl.setRoot(PoiPage,{data:this.data});
  }
  getRefresh(){
    console.log('Get Refresh');
    
  }
  getLocate(){
    console.log('Get Locate');
    
    if(Geolocation){
      this.data.gpsinfo = "Mencari Lokasi Peta....";
      Geolocation.getCurrentPosition().then((position) => {
        this.data.x = position.coords.longitude;
        this.data.y = position.coords.latitude;
        this.data.gpsinfo = "latitude :"+this.data.y+" longitude :"+this.data.x;
        let latlngset = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			  let marker = new google.maps.Marker({  
            map: map, title: 'Lokasi Disini',
            position: latlngset
        });
      }, (err) => {
        console.log(err);
      });
    }
  }

}

declare var google:any;
var map:any;
var markers = [];
@Component({
  selector: 'page-PinPoint',
  //templateUrl: 'PoiMap.html',
  template:`<ion-content>
    <div #map id="map"></div>
  </ion-content>
  <ion-footer>
    <ion-grid text-center class="button-group">
        <ion-row>
          <ion-col class="col"><button ion-button icon-left block (click)="getSend()" type="button"> Kirim</button></ion-col>
          <ion-col class="col"><button ion-button icon-left block (click)="getCancel()" type="button"> Batal</button></ion-col>
        </ion-row>
    </ion-grid>
  </ion-footer>
  `
  
})

export class PinPointMapPage{
   data:any;

   constructor(
      public storage: Storage,
      public platform: Platform,
      public navparams: NavParams,
      public navCtrl:NavController
   ){
     this.data = navparams.data.data;
     //google.maps.event.addDomListener(window, 'load', initialize);
   }
   ngAfterViewInit() {
     this.initializeMap();
   }
   initializeMap() {
    this.platform.ready().then(() => {
        var infowindow = new google.maps.InfoWindow();
        var minZoomLevel = 12;
        var pandeglangPoint = new google.maps.LatLng(-6.3252738,106.0764884);
        
        map = new google.maps.Map(document.getElementById('map'), {
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: pandeglangPoint,
            zoom: minZoomLevel,
            mapTypeControl: false,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.TOP_CENTER
            },
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.TOP_LEFT
            },
            scaleControl: false,
            streetViewControl: true,
            streetViewControlOptions: {
                position: google.maps.ControlPosition.LEFT_TOP
            },
            fullscreenControl: true
        });

        let t = this;
        google.maps.event.addListener(map, 'click', (event) => {
            t.addMarker(event.latLng);
        });

        
        
    });
   }
   addMarker(latlng, i=0) {
     this.clearMarkers();
     var host = 'http://localhost/';
     var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        draggable: true,
        icon: host+'images/maps/waterpark.png'
     });
     this.data.x = latlng.lng();
     this.data.y = latlng.lat();
     markers.push(marker);
   }
   // Sets the map on all markers in the array.
   setMapOnAll(map) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
   }
   // Removes the markers from the map, but keeps them in the array.
   clearMarkers() {
      this.setMapOnAll(null);
   }
   // Shows any markers currently in the array.
   showMarkers() {
      this.setMapOnAll(map);
   }
   // Deletes all markers in the array by removing references to them.
   deleteMarkers() {
      this.clearMarkers();
      markers = [];
   }
   getSend(){
      this.navCtrl.setRoot(PoiPage,{data:this.data});
   }
   getCancel(){
      this.navCtrl.pop();
   }
}
