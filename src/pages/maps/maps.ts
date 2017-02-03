import { Component, ViewChild, ElementRef } from '@angular/core';

import { NavController,Platform } from 'ionic-angular';

declare var google;
 
@Component({
  selector: 'home-map',
  templateUrl: 'maps.html'
})
export class MapsPage {
 
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  mapInitialised: boolean = false;
  apiKey: any;
 
  constructor(public navCtrl: NavController, public platform: Platform) {
 
  }

  ngAfterViewInit() {
    this.initializeMap();
  }
 
  ionViewLoaded(){
    this.initializeMap();
  }
 
  initializeMap() {

    this.platform.ready().then(() => {
        var minZoomLevel = 12;

        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: minZoomLevel,
            center: new google.maps.LatLng(38.50, -90.50),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    });
  }
 
  
}