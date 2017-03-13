import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { MapShareService } from './mapshareservices';
declare var google: any;

@Injectable()
export class MapEditorService {
    txt:string;
    markers = [];
    polylineStore = [];
    polyline;
    datapostgis;
    id = "points";
    path = [];
    google;
    drawingmode:boolean;
    map:any;
    constructor(public http: Http,public mapshare:MapShareService) {
        this.drawingmode = mapshare.getdrawing();
        this.map = mapshare.getMap();
        
    }
    
    initEditPolyline(map) {
        //var aksieditor = document.getElementById('aksi-editor');
        //map.controls[google.maps.ControlPosition.RIGHT_TOP].push(aksieditor);
        
        google.maps.event.addListener(map, 'click', function(event) {
            if(this.drawingmode){
                this.addMarker(event.latLng);
                this.displayMarkers();
            }
        });
        /*var txt = document.getElementById(this.id);
        if (this.txt !== null) {
            this.setMarkers();
        }*/
    }

    showPolyline() {
        if (this.polyline) {
            this.polyline.setMap(null);
        }
        this.path = [];
        for (var i = 0; i < this.markers.length; i++) {
            var latlng = this.markers[i].getPosition();
            this.path.push(latlng);
            this.markers[i].setTitle("#" + i + ": " + latlng.toUrlValue());
        }
        this.polyline = new google.maps.Polyline({
            map: this.map,
            path: this.path,
            strokeColor: "#0000FF",
            strokeOpacity: 0.5,
            strokeWeiight: 8,
        });
    }

    clearMarkers() {
        /*var txt = document.getElementById(this.id);
        txt.nodeValue = '';*/
        this.txt = ''
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }
        this.markers = [];
        this.polylineStore = [];
        this.showPolyline();
    }

    getMarkerIndex(marker) {
        for (var i = 0; i < this.markers.length; i++) {
            if (marker == this.markers[i]) {
                return i;
            }
        }
        return -1;
    }

    addMarker(latlng, i=0) {
        var host = 'http://localhost/';
        var marker = new google.maps.Marker({
            map: this.map,
            position: latlng,
            draggable: true,
            icon: host+'images/maps/waterpark.png'
        });
        console.log(this.txt);

        /*
        google.maps.event.addListener(marker, 'click', function() {
                var infoWindow = new google.maps.InfoWindow({
                        content: marker.getPosition().toUrlValue(),
                    });
                infoWindow.open(map, marker);
            });
        */

        google.maps.event.addListener(marker, 'dragend', function(event) {
            //if(this.drawingmode){

                this.showPolyline();
                this.displayMarkers();
            //}
        });
        google.maps.event.addListener(marker, 'rightclick', function(event) {
            //if(this.drawingmode){
                this.removeMarker(marker);
                this.showPolyline();
                this.displayMarkers();
            //}
        });
        google.maps.event.addListener(marker, 'dblclick', function(event) {
            //if(this.drawingmode){
                var i = this.getMarkerIndex(marker);
                if (i > 0 && i == this.markers.length - 1) {
                    i--;
                }
                if (i < this.markers.length - 1) {
                    var lat0 = this.markers[i].getPosition().lat();
                    var lng0 = this.markers[i].getPosition().lng();
                    var lat1 = this.markers[i+1].getPosition().lat();
                    var lng1 = this.markers[i+1].getPosition().lng();
                    var latlng = new google.maps.LatLng((lat0+lat1)/2, (lng0+lng1)/2);
                    this.addMarker(latlng, i+1);
                }
            //}
        });
        if (i == null || i >= this.markers.length) {
            this.markers.push(marker);
        } else {
            this.markers.splice(i, 0, marker);
        }
        this.showPolyline();
    }
    removeMarker(marker) {
        var i = this.getMarkerIndex(marker);
        marker.setMap(null);
        this.markers.splice(i, 1);
        this.showPolyline();
    }

    displayMarkers() {
        /*var txt = document.getElementById(this.id);
        txt.nodeValue = "";*/
        //this.txt = "";
        this.polylineStore = [];
        this.datapostgis = "";
        var countjson = this.markers.length;
            var last_index = countjson - 1;
        for (var i = 0; i < this.markers.length; i++) {
            var latlng = this.markers[i].getPosition();
            this.txt += latlng.toUrlValue() + ",\n";
            this.polylineStore.push(latlng.toJSON());
        }
    }

    setMarkers() {
        //var txt = document.getElementById(this.id);

        var lines = this.txt.split(/\n/);
        //console.log(lines);
        this.clearMarkers();
        for (var i in lines) {
            var ps = lines[i].split(/,/);

            if (ps.length >= 2) {
                var latlng = new google.maps.LatLng(ps[0], ps[1]);
                this.addMarker(latlng);
            }
        }
        this.displayMarkers();
        if (this.markers.length > 0) {
            //map.setCenter(this.markers[0].getPosition());
        }
    }
}
