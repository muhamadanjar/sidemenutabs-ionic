import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import {
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapsLatLng,
 CameraPosition,
 GoogleMapsMarkerOptions,
 GoogleMapsMarker

} from 'ionic-native';

@Component({
  selector: 'map-page',
  templateUrl: 'map.html'
})

export class MapPage {
 
    map: GoogleMap;
 
    constructor(public navCtrl: NavController, public platform: Platform) {
        platform.ready().then(() => {
            this.loadMap();
        });
    }


    loadMap(){

		//let location = new GoogleMapsLatLng(-6.319814, 106.117515);
		/*this.map = new GoogleMap('map', {
			'backgroundColor': 'white',
			'controls': {
				'compass': true,
				'myLocationButton': true,
				'indoorPicker': true,
				'zoom': true
			},
			'gestures': {
				'scroll': true,
				'tilt': true,
				'rotate': true,
				'zoom': true
			},
			'camera': {
				'latLng': location,
				'tilt': 30,
				'zoom': 12,
				'bearing': 50
			}
		});*/

		let element: HTMLElement = document.getElementById('map');
 		let map = new GoogleMap(element);
		
		map.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready!'));
		/*this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
				console.log('Map is ready!');
		});*/
		let ionic: GoogleMapsLatLng = new GoogleMapsLatLng(-6.452209999,107.040650001);
		let position: CameraPosition = {
			target: ionic,
			zoom: 12,
			tilt: 30
		};
		
		map.moveCamera(position);

		let markerOptions: GoogleMapsMarkerOptions = {
			position: ionic,
			title: 'Ionic'
		};
		map.addMarker(markerOptions)
		.then((marker: GoogleMapsMarker) => {
			marker.showInfoWindow();
		});
	}

	
	
}