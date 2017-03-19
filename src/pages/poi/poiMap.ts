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
    //this.initializeMap();
    console.log(this.data);
    /*this.storage.get('datapoi').then((value) => {
      console.log(value);
    });*/
    
  }

  goBack(){
    //this.navCtrl.pop();
    //this.data.gpsinfo = "apa";
    this.storage.set('datapoi',this.data);
    this.navCtrl.push(PoiPage,{data:this.data});
  }
  getRefresh(){
    console.log('Get Refresh');
    
    //markers.setMap(null);
  }
  getLocate(){
    console.log('Get Locate');
    
    if(Geolocation){
      this.data.gpsinfo = "Mencari Lokasi Peta....";
      Geolocation.getCurrentPosition().then((position) => {
        this.data.x = position.coords.longitude;
        this.data.y = position.coords.latitude;
        this.data.gpsinfo = "latitude :"+this.data.y+" longitude :"+this.data.x;
      }, (err) => {
        console.log(err);
      });
    }
  }

}
