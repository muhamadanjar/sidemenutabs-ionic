import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController, NavParams, Platform, AlertController,PopoverController } from 'ionic-angular';
import { JaringanJalan } from '../../providers/jaringan-jalan';
import { LocationTracker } from '../../providers/location-tracker';
declare var google:any;
var map:any;
var poly:any;
var drawingmode = true;
var flightPath:any;
@Component({
  selector: 'page-jjFungsiMapEdit',
  templateUrl: 'fungsiMapEdit.html',
  providers:[LocationTracker],
  
})

export class JaringanJalanFungsiMapEditPage {
@ViewChild('popoverContent', { read: ElementRef }) content: ElementRef;
@ViewChild('popoverText', { read: ElementRef }) text: ElementRef;
map: any;
fungsi: any;
polyStore: any;
data: any;
  constructor(
    public navCtrl: NavController,
    public navparams: NavParams, 
    public locationTracker: LocationTracker,
    public platform: Platform,
    public alertCtrl: AlertController,
    public jj: JaringanJalan,
    private popoverCtrl: PopoverController
  ) {
    this.data = {};
    this.fungsi = this.navparams.data.fungsi;
    console.log(JSON.parse(this.fungsi.shape_line).b);
    this.polyStore = JSON.parse(this.fungsi.shape_line).b;
    
  }

  ngAfterViewInit() {
    this.initializeMap();
    

  }
 
  start(){
    drawingmode = true;
  }
 
  stop(){
    drawingmode = false;
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
        //this.FungsiList.ngOnInit();
        //this.loader.dismiss();
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

        var drawingManager = new google.maps.drawing.DrawingManager({
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
              google.maps.drawing.OverlayType.POLYLINE,
            ]
          },
        });
        drawingManager.setMap(map);

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
            console.log(drawingmode);
            if(drawingmode){
              this.addLatLng(e);
            }
            console.log(poly.getPath());
            
        });
        
        
    });
  }

  initPolyline(){
    var polyStore = this.polyStore; 
    
    poly = new google.maps.Polyline({
        path: polyStore,
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
    /*var marker = new google.maps.Marker({
        position: event.latLng,
        title: '#' + path.getLength(),
        map: map
    });*/
  }

  /*presentPopover(ev) {

    let popover = this.popoverCtrl.create(PopoverPage, {
      contentEle: this.content.nativeElement,
      textEle: this.text.nativeElement
    });

    popover.present({
      ev: ev
    });
  }*/


  }
