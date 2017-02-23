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

}
