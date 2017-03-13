import { Component,NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { JaringanJalan } from '../../providers/jaringan-jalan';
import { LocationTracker } from '../../providers/location-tracker';
@Component({
  selector: 'page-jjFungsiMapTambah',
  templateUrl: 'fungsiMapAdd.html',
  providers:[LocationTracker],
  
})
export class JaringanJalanFungsiMapTambahPage {
  constructor(public navCtrl: NavController, public locationTracker: LocationTracker) {
 
  }
 
  start(){
    this.locationTracker.startTracking();
  }
 
  stop(){
    this.locationTracker.stopTracking();
  }
  /* 
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

        this.initPolyline();
        //this.initLoadData();

        map.addListener('click', (e)=>{
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
           
            
        });
        
        
    });
  }

  initPolyline(){
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
  }

  presentPopover(ev) {

    let popover = this.popoverCtrl.create(PopoverEditing, {
      data:this.data,
    });

    popover.present({
      ev: ev
    });
  }
  
  */

}
