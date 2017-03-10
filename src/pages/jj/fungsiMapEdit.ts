import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController, NavParams, Platform, AlertController,PopoverController } from 'ionic-angular';
import { JaringanJalan } from '../../providers/jaringan-jalan';

import { PopoverEditing } from './PopoverEditing';
import { MapShareService } from '../../providers/mapshareservices';

declare var google:any;
var map:any;
var poly:any;
var flightPath:any;
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
            zoom: minZoomLevel,
            center: pandeglangPoint,
            mapTypeId: google.maps.MapTypeId.ROADMAP
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
            //console.log(drawingmode);
            if(this.drawingmode){
              this.addLatLng(e);
            }
            //conhisole.log(poly.getPath());
            
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


  }
