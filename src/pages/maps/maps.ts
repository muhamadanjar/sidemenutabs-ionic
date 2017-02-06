import { Component, ViewChild, ElementRef } from '@angular/core';

import { NavController,Platform } from 'ionic-angular';

declare var google:any;
declare var map:any;
var x: number = 5;
var marker: any;
 
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
  markers:any[];
  
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
        var pandeglang = new google.maps.LatLng(-6.3252738,106.0764884);
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: minZoomLevel,
            center: pandeglang,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        var myLatlng = new google.maps.LatLng(-6.452209999,107.040650001);
        
        marker = new google.maps.Marker({
            position: myLatlng,
            title:"Hello World!",
            animation: google.maps.Animation.DROP,
        });

        marker.setMap(map);

        marker.addListener('click', this.toggleBounce);
    });
  }

  toggleBounce() {
    
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
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