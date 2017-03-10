import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController, NavParams, Platform, AlertController,PopoverController } from 'ionic-angular';
import { JaringanJalan } from '../../providers/jaringan-jalan';

import { PopoverEditing } from './PopoverEditing';
import { MapShareService } from '../../providers/mapshareservices';

declare var google:any;
var map:any;
var poly:any;
var flightPath:any;
var id = "points";
@Component({
  selector: 'page-jjFungsiMapEdit',
  templateUrl: 'fungsiMapEdit.html',
  providers:[MapShareService],
  
})

export class JaringanJalanFungsiMapEditPage {

map: any;
fungsi: any;
polyStore: any;
drawingmode: boolean;
data: any;
path = [];
polyline;datapostgis;

markers = [];
polylineStore = [];

  constructor(
    public navCtrl: NavController,
    public navparams: NavParams, 
    
    public platform: Platform,
    public alertCtrl: AlertController,
    public jj: JaringanJalan,
    private popoverCtrl: PopoverController,
    public mapedit: MapShareService
  ) {
    this.data = {};
    this.fungsi = this.navparams.data.fungsi;
    this.drawingmode = this.mapedit.getdrawing();
    //console.log(JSON.parse(this.fungsi.shape_line).b);
    //this.polyStore = JSON.parse(this.fungsi.shape_line).b;
    
  }

  ngAfterViewInit() {
    this.initializeMap();
    

  }
 
  

  save(id){
    console.log(poly.getPath());
    this.data.shapeline = poly.getPath();
    let data = JSON.stringify({
        id: this.data.id,
        shapeline:JSON.stringify(this.data.shapeline)
    });
    this.jj.PostEditMapFungsi(id,data).subscribe(data => {
        this.data = data;
        if(this.data[0].result =="success"){
          this.navCtrl.popToRoot();
        }

    }, error => {
      console.log("Oooops!");
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

       google.maps.event.addListener(map, 'click', function(event) {
            if(this.drawingmode){
                this.addMarker(event.latLng);
                this.displayMarkers();
            }
        });
        //this.initPolyline();
        //this.initLoadData();

        /*map.addListener('click', (e)=>{
            if (poly === undefined) { 
                let alert = this.alertCtrl.create({
                  title: 'Info!',
                  subTitle: 'Variable poly is undefined!',
                  buttons: ['OK']
                });
                alert.present();
                this.initPolyline();
            }
            
            if(this.drawingmode){
              this.addLatLng(e);
            }
           
            
        });*/
        
        
    });
  }

  /*initPolyline(){
    //var polyStore = this.polyStore; 
    
    poly = new google.maps.Polyline({
        //path: polyStore,
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 3,
        //editable: true
    });
    poly.setMap(map);

  }

  initLoadData(){
    let data = this.polyStore;
    var path = poly.getPath();
    for (var j = 0; j < data.length; j++){
      console.log(data[j]);
    }
  }
  addLatLng(event) {
    var path = poly.getPath();
    path.push(event.latLng);

  }*/

  addMarker(latlng, i) {
      var host = 'http://localhost/';
      var marker = new google.maps.Marker({
          map: map,
          position: latlng,
          draggable: true,
          icon: host+'images/maps/waterpark.png'
      });

      /*
      google.maps.event.addListener(marker, 'click', function() {
              var infoWindow = new google.maps.InfoWindow({
                      content: marker.getPosition().toUrlValue(),
                  });
              infoWindow.open(map, marker);
          });
      */

      google.maps.event.addListener(marker, 'dragend', function(event) {
          if(this.drawingmode){

              this.showPolyline();
              this.displayMarkers();
          }
      });
      google.maps.event.addListener(marker, 'rightclick', function(event) {
          if(this.drawingmode){
              this.removeMarker(marker);
              this.showPolyline();
              this.displayMarkers();
          }
      });
      google.maps.event.addListener(marker, 'dblclick', function(event) {
          if(this.drawingmode){
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
          }
      });
      if (i == null || i >= this.markers.length) {
          this.markers.push(marker);
      } else {
          this.markers.splice(i, 0, marker);
      }
      this.showPolyline();
  }

  displayMarkers() {
      var txt = document.getElementById(id);
      
      txt.nodeValue = "";
      this.polylineStore = [];
      this.datapostgis = "";
      var countjson = this.markers.length;
      var last_index = countjson - 1;
      for (var i = 0; i < this.markers.length; i++) {
          var latlng = this.markers[i].getPosition();
          txt.nodeValue += latlng.toUrlValue() + ",\n";
          /*console.log(markers[i]);
          var comma = (i == last_index) ? "" : ",\n" ;
          datapostgis += markers[i].lng+" "+markers[i].lat+""+comma;*/
          this.polylineStore.push(latlng.toJSON());
          //console.log(polylineStore);
      }
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
          map: map,
          path: this.path,
          strokeColor: "#0000FF",
          strokeOpacity: 0.5,
          strokeWeight: 8,
      });
  }

  presentPopover(ev) {

    let popover = this.popoverCtrl.create(PopoverEditing, {
      data:this.data,
    });

    popover.present({
      ev: ev
    });
  }


  }
