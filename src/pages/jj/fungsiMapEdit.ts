import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController, NavParams, Platform, AlertController,PopoverController } from 'ionic-angular';
import { JaringanJalan } from '../../providers/jaringan-jalan';

import { PopoverEditing } from './PopoverEditing';
import { MapShareService } from '../../providers/mapshareservices';
import { MapEditorService } from '../../providers/mapeditorservice';

declare var google:any;
var map:any;
var markers = [];
var path = [];
var polyline;
var id = "points";
@Component({
  selector: 'page-jjFungsiMapEdit',
  templateUrl: 'fungsiMapEdit.html',
  providers:[MapShareService,MapEditorService],
  
})

export class JaringanJalanFungsiMapEditPage {
drawingmode: boolean;
fungsi;
txt;
polylineStore;
id_jalan:any;
  constructor(
    public navCtrl: NavController,
    public navparams: NavParams, 
    public platform: Platform,
    private popoverCtrl: PopoverController,
    public mapshareedit: MapShareService,
    //public polyedit: MapEditorService
  ) {
    
    this.fungsi = this.navparams.data.fungsi;
    this.drawingmode = this.mapshareedit.getdrawing();
    this.id_jalan = this.fungsi.id;
  
    
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
        google.maps.event.addListener(map, 'click', function(event) {
            t.addMarker(event.latLng);
            t.displayMarkers();
        });
     
        
    });
  }

initEditPolyline(map) {
    google.maps.event.addListener(map, 'click', function(event) {
        if(this.drawingmode){
            this.addMarker(event.latLng);
            this.displayMarkers();
        }
    });

}

showPolyline() {
        if (polyline) {
            polyline.setMap(null);
        }
        path = [];
        for (var i = 0; i < markers.length; i++) {
            var latlng = markers[i].getPosition();
            path.push(latlng);
            markers[i].setTitle("#" + i + ": " + latlng.toUrlValue());
        }
        polyline = new google.maps.Polyline({
            map: map,
            path: path,
            strokeColor: "#0000FF",
            strokeOpacity: 0.5,
            strokeWeiight: 8,
        });
}

clearMarkers() {

        this.txt = ''
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        markers = [];
        this.polylineStore = [];
        this.showPolyline();
}

getMarkerIndex(marker) {
        for (var i = 0; i < markers.length; i++) {
            if (marker == markers[i]) {
                return i;
            }
        }
        return -1;
}

addMarker(latlng, i=0) {
        var host = 'http://localhost/';
        var marker = new google.maps.Marker({
            map: map,
            position: latlng,
            draggable: true,
            icon: host+'images/maps/waterpark.png'
        });
        let parent = this;
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
        if (i == null || i >= markers.length) {
            markers.push(marker);
        } else {
            markers.splice(i, 0, marker);
        }
        parent.showPolyline();
        
}
removeMarker(marker) {
        var i = this.getMarkerIndex(marker);
        marker.setMap(null);
        markers.splice(i, 1);
        this.showPolyline();
 }

  

displayMarkers() {
        this.txt = "";
        this.polylineStore = [];
        //this.datapostgis = "";
        var countjson = markers.length;
            var last_index = countjson - 1;
        for (var i = 0; i < markers.length; i++) {
            var latlng = markers[i].getPosition();
            this.txt += latlng.toUrlValue() + ",\n";
            this.polylineStore.push(latlng.toJSON());
        }
}
setMarkers() {
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
        if (markers.length > 0) {
            //map.setCenter(this.markers[0].getPosition());
        }
}

ngAfterViewInit() {
    this.initializeMap();
}

presentPopover(ev) {
    let data = {fungsi:this.fungsi,t:this.txt}
    let popover = this.popoverCtrl.create(PopoverEditing, {
      data:data  
    });
    popover.present({
      ev: ev
    });
}

  


}
