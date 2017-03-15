import { Component, ViewChild, ElementRef, Injectable } from '@angular/core';

import { NavController, Platform, ModalController, NavParams, ViewController } from 'ionic-angular';
import { Geolocation} from 'ionic-native';
import { ModalContentPage } from './modal';
import { Map } from "../../providers/map";
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Rx';

declare var google:any;

var x: number = 5;
var marker: any;
let items:any;
var map:any;
var infoWindow:any;
var _poipandeglang:any;
var markers: Array<any>;
var modalMap;
var mapMinZoom = 12;
var mapMaxZoom = 18;
//Geolocation
var secondChild;
var animationInterval;

Injectable()
@Component({
  selector: 'home-map',
  templateUrl: 'maps.html'
})

export class MapsPage {
  mapservice: Array<any>;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  mapInitialised: boolean = false;
  apiKey: any;
  rootURL: any;
  marker:any;
  public poipandeglang;
  

  constructor(
    public navCtrl: NavController, public platform: Platform,
    public modalCtrl: ModalController,
    public ms:Map,
    public http:Http
    
  ) {
      
      modalMap = modalCtrl;
  }


  ngAfterViewInit() {
    this.initializeMap();
    
  }

  LoadFasilitas(){
      this.ms.LoadMarker().subscribe(
        data => {
          this.mapservice = data;           
        },
        err => {
          console.log(err);
        },
        () => console.log('Fasilitas Loaded')
      );
      
  }

  LoadPoiPandeglang(){
      this.ms.LoadPoi().subscribe(
        data => {
          this.poipandeglang = data;
          
          let pandeglangPoint = [];
          let marker=[];let image = [];
          let infowindow = new google.maps.InfoWindow();
          for (var j = 0; j < data.length; j++){
            
            image[j] = 'assets/maps/woodshed.png';
            pandeglangPoint[j] = new google.maps.LatLng(data[j].y,data[j].x);
            marker[j] = new google.maps.Marker({
                position: pandeglangPoint[j],
                title: data[j].name,
                icon: image[j],
                animation: google.maps.Animation.DROP,
                id:j,
                store_id: j,
                data: data[j],
                html:j,
            });
            marker[j].metadata = {type: "point", id: j};
            marker[j].setMap(map);
            
            /*marker[j].addListener('click',(e)=>{    
              console.log(e);
              //this.openModal(marker[j].store_id);

            });*/

            google.maps.event.addListener(marker[j], "click", function () {
                infowindow.setContent(this.store_id.toString());
                infowindow.open(map, this);
                let modal = modalMap.create(ModalContentPage, {num:0,character:data[this.store_id]});
                modal.present();
                //this.openModal(this.store_id.toString());
            });

            /*google.maps.event.addListener(marker[j], 'click', (marker, j) => {
                console.log(marker);
                //this.openModal(i);
                
            });*/

          }
          
        },
        err => {
          console.log(err);
        },
        () => console.log('LoadPoiPandeglang')
      );
      
  }
 
  ionViewLoaded(){
    
    this.initializeMap();
  }


 
  initializeMap() {



    this.platform.ready().then(() => {
        var infowindow = new google.maps.InfoWindow();
        var minZoomLevel = 12;
        var pandeglangPoint = new google.maps.LatLng(-6.3252738,106.0764884);
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: minZoomLevel,
            center: pandeglangPoint,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.TOP_CENTER
            },
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_TOP
            },
            scaleControl: false,
            streetViewControl: false,
            streetViewControlOptions: {
                position: google.maps.ControlPosition.LEFT_TOP
            },
            fullscreenControl: false
        });

        this.initGelocation();

        
        
        
        //this.LoadFasilitas();
        //this.LoadPoiPandeglang();

        
        
    });
  }

  toggleBounce(modal) {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
    
    console.log(modal);
    
   
  }


  

  

  addMarker(){
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
  
    let content = "<h4>Information!</h4>";          
  
    this.addInfoWindow(marker, content);
  
  }

  addInfoWindow(marker, content){
    
    infoWindow = new google.maps.InfoWindow({
      content: content
    });
  
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(map, marker);
    });
  
  }

  WMSGetTileUrl(tile, zoom) {
      var projection = map.getProjection();
      var zpow = Math.pow(2, zoom);
      var ul = new google.maps.Point(tile.x * 256.0 / zpow, (tile.y + 1) * 256.0 / zpow);
      var lr = new google.maps.Point((tile.x + 1) * 256.0 / zpow, (tile.y) * 256.0 / zpow);
      var ulw = projection.fromPointToLatLng(ul);
      var lrw = projection.fromPointToLatLng(lr);
      //The user will enter the address to the public WMS layer here.  The data must be in WGS84
      var baseURL = "http://sampleserver1.arcgisonline.com/arcgis/services/Specialty/ESRI_StatesCitiesRivers_USA/MapServer/WMSServer?&REQUEST=GetMap&SERVICE=WMS&VERSION=1.3&LAYERS="; //begining of the WMS URL ending with a "?" or a "&".
      var format = "image%2Fjpeg"; //type of image returned  or image/jpeg
      //The layer ID.  Can be found when using the layers properties tool in ArcMap
      var layers = "0";
      var srs = "EPSG:4326"; //projection to display. This is the projection of google map. Don't change unless you know what you are doing.
      var bbox = ulw.lat() + "," + ulw.lng() + "," + lrw.lat() + "," + lrw.lng();
      //Add the components of the URL together
      var url = baseURL + layers + "&Styles=default" + "&SRS=" + srs + "&BBOX=" + bbox + "&width=256" + "&height=256" + "&format=" + format + "&BGCOLOR=0xFFFFFF&TRANSPARENT=true" + "&reaspect=false" + "&CRS=EPSG:4326";
      return url;
  }

  WMSGetTileUrl2(tile, zoom) {
      var projection = map.getProjection();
      var zpow = Math.pow(2, zoom);
      var ul = new google.maps.Point(tile.x * 256.0 / zpow, (tile.y + 1) * 256.0 / zpow);
      var lr = new google.maps.Point((tile.x + 1) * 256.0 / zpow, (tile.y) * 256.0 / zpow);
      var ulw = projection.fromPointToLatLng(ul);
      var lrw = projection.fromPointToLatLng(lr);
      //The user will enter the address to the public WMS layer here.  The data must be in WGS84
      var baseURL = "http://demo.cubewerx.com/cubewerx/cubeserv.cgi?";
      var version = "1.3.0";
      var request = "GetMap";
      var format = "image%2Fjpeg"; //type of image returned  or image/jpeg
      //The layer ID.  Can be found when using the layers properties tool in ArcMap or from the WMS settings 
      var layers = "Foundation.GTOPO30";
      //projection to display. This is the projection of google map. Don't change unless you know what you are doing.  
      //Different from other WMS servers that the projection information is called by crs, instead of srs
      var crs = "EPSG:4326";
      //With the 1.3.0 version the coordinates are read in LatLon, as opposed to LonLat in previous versions
      var bbox = ulw.lat() + "," + ulw.lng() + "," + lrw.lat() + "," + lrw.lng();
      var service = "WMS";
      //the size of the tile, must be 256x256
      var width = "256";
      var height = "256";
      //Some WMS come with named styles.  The user can set to default.
      var styles = "default";
      //Establish the baseURL.  Several elements, including &EXCEPTIONS=INIMAGE and &Service are unique to openLayers addresses.
      var url = baseURL + "Layers=" + layers + "&version=" + version + "&EXCEPTIONS=INIMAGE" + "&Service=" + service + "&request=" + request + "&Styles=" + styles + "&format=" + format + "&CRS=" + crs + "&BBOX=" + bbox + "&width=" + width + "&height=" + height;
      return url;
  }


  WMSGetTileUrl4(tile, zoom) {
      var projection = map.getProjection();
      var zpow = Math.pow(2, zoom);
      var ul = new google.maps.Point(tile.x * 256.0 / zpow, (tile.y + 1) * 256.0 / zpow);
      var lr = new google.maps.Point((tile.x + 1) * 256.0 / zpow, (tile.y) * 256.0 / zpow);
      var ulw = projection.fromPointToLatLng(ul);
      var lrw = projection.fromPointToLatLng(lr);
      //The user will enter the address to the public WMS layer here.  The data must be in WGS84
      var baseURL = "http://sampleserver1.arcgisonline.com/arcgis/services/Specialty/ESRI_StateCityHighway_USA/MapServer/WMSServer?&REQUEST=GetMap&SERVICE=WMS&VERSION=1.3&LAYERS="; //begining of the WMS URL ending with a "?" or a "&".
      var format = "image/png"; //type of image returned  or image/jpeg
      //The layer ID.  Can be found when using the layers properties tool in ArcMap
      var layers = "0";
      var srs = "EPSG:4326"; //projection to display. This is the projection of google map. Don't change unless you know what you are doing.
      var bbox = ulw.lat() + "," + ulw.lng() + "," + lrw.lat() + "," + lrw.lng();
      //Add the components of the URL together
      var url = baseURL + layers + "&Styles=default" + "&SRS=" + srs + "&BBOX=" + bbox + "&width=256" + "&height=256" + "&format=" + format + 
         "&BGCOLOR=0xFFFFFF&TRANSPARENT=true" + "&reaspect=false" + "&CRS=EPSG:4326";
      return url;
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

  initGelocation(){
    var controlDiv = document.createElement('div');

    var firstChild = document.createElement('button');
    firstChild.style.backgroundColor = '#fff';
    firstChild.style.border = 'none';
    firstChild.style.outline = 'none';
    firstChild.style.width = '28px';
    firstChild.style.height = '28px';
    firstChild.style.borderRadius = '2px';
    firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
    firstChild.style.cursor = 'pointer';
    firstChild.style.marginRight = '10px';
    firstChild.style.marginLeft = '10px';
    firstChild.style.padding = '0';
    firstChild.title = 'Your Location';
    controlDiv.appendChild(firstChild);

    secondChild = document.createElement('div');
    secondChild.style.margin = '5px';
    secondChild.style.width = '18px';
    secondChild.style.height = '18px';
    secondChild.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-2x.png)';
    secondChild.style.backgroundSize = '180px 18px';
    secondChild.style.backgroundPosition = '0 0';
    secondChild.style.backgroundRepeat = 'no-repeat';
    firstChild.appendChild(secondChild);

    google.maps.event.addListener(map, 'center_changed', function () {
        secondChild.style['background-position'] = '0 0';
    });
    let par = this;
    firstChild.addEventListener('click', function () {
        var imgX = '0';
        animationInterval = setInterval(function () {
                imgX = imgX === '-18' ? '0' : '-18';
                secondChild.style['background-position'] = imgX+'px 0';
            }, 500);

        par.geolocate();

    });

    //controlDiv.index = 1;
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(controlDiv);
  }

  geolocate() {
      
      //markerMylocation.setMap(null);
      if(Geolocation){
      Geolocation.getCurrentPosition().then((position) => {
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        
        let markerMylocation = new google.maps.Marker({
            position: latLng,
            title:"Lokasi saya saat ini!",
            icon: 'assets/maps/you-are-here-2.png',
            animation: google.maps.Animation.DROP,
        });
        
        markerMylocation.setMap(map);
        map.setCenter(latLng);
        /*google.maps.event.addDomListener(markerMylocation, 'click', () =>{

        });*/
      
      }, (err) => {
        console.log(err);
      });

      let watch = Geolocation.watchPosition();
      watch.subscribe((data) => {
        console.log(data);
        // data can be a set of coordinates, or an error (if an error occurred).
        // data.coords.latitude
        // data.coords.longitude
      });
      }
      
  }



  openModal(id) {
    var characters = 
      {
        name: 'Gollum',
        quote: 'Sneaky little hobbitses!',
        image: 'assets/img/avatar-gollum.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'River Folk' },
          { title: 'Alter Ego', note: 'Smeagol' }
        ]
      };

    this.ms.LoadPoi().subscribe(
        data => {
          this.poipandeglang = data;
          let modal = this.modalCtrl.create(ModalContentPage, {num:0,character:data[id]});
          modal.present();
        },
        err => {
          console.log(err);
        },
        () => console.log('LoadPoiPandeglang')
      );
    
  }
 
  
}


