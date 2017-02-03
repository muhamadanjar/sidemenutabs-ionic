import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import {
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapsLatLng,
 CameraPosition,
 GoogleMapsMarkerOptions,
 GoogleMapsMarker,
 Geolocation
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

	ngAfterViewInit() {
		this.loadMap();
	}
 
    loadMap(){

		let location = new GoogleMapsLatLng(-6.319814, 106.117515);

		this.map = new GoogleMap('map', {
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
		});

		this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
			console.log('Map is ready!');
		});

	}

	loadMapversidua() {
		// make sure to create following structure in your view.html file
		// and add a height (for example 100%) to it, else the map won't be visible
		// <ion-content>
		//  <div #map id="map" style="height:100%;"></div>
		// </ion-content>

		// create a new map by passing HTMLElement
		let element: HTMLElement = document.getElementById('map');

		let map = new GoogleMap(element);

		// listen to MAP_READY event
		map.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready!'));

		// create LatLng object
		/*let ionic: GoogleMapsLatLng = new GoogleMapsLatLng(-6.319814, 106.117515);

		// create CameraPosition
		let position: CameraPosition = {
			target: ionic,
			zoom: 18,
			tilt: 30
		};

		// move the map's camera to position
		map.moveCamera(position);

		// create new marker
		let markerOptions: GoogleMapsMarkerOptions = {
			position: ionic,
			title: 'Ionic'
		};

		map.addMarker(markerOptions)
		.then((marker: GoogleMapsMarker) => {
			marker.showInfoWindow();
			});*/
	}

	getlLocation(){
		Geolocation.getCurrentPosition().then((resp) => {
		// resp.coords.latitude
		// resp.coords.longitude
		}).catch((error) => {
		console.log('Error getting location', error);
		});

		let watch = Geolocation.watchPosition();
		watch.subscribe((data) => {
		// data can be a set of coordinates, or an error (if an error occurred).
		// data.coords.latitude
		// data.coords.longitude
		});
	}

		
}