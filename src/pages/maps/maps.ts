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
  rootURL: any;
 
  constructor(public navCtrl: NavController, public platform: Platform) {
    
  }

  ngAfterViewInit() {
    this.initializeMap();
  }
 
  ionViewLoaded(){
    this.initializeMap();
  }
 
  initializeMap() {
    let markers = [];
    this.platform.ready().then(() => {
        
        var minZoomLevel = 12;

        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: minZoomLevel,
            center: new google.maps.LatLng(38.50, -90.50),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        this.setMarkers(this.map,[]);
    });
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
 
  
}