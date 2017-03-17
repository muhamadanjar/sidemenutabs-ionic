import { Component } from '@angular/core';
import { JaringanJalanFungsiMapEditPage } from './fungsiMapEdit';
import { PopoverController,ViewController,NavController, NavParams } from 'ionic-angular';
import { MapShareService } from '../../providers/mapshareservices';
@Component({
  template: `
    <ion-list>
      <button ion-item (click)="start()">Mulai Edit</button>
      <button ion-item (click)="stop()">Berhenti Edit</button>
      <button ion-item (click)="save()">Simpan</button>
    </ion-list>
  `,
  providers:[MapShareService],
})
export class PopoverMap {
  data:any;
  fungsi:any;
  constructor(
    private navParams: NavParams,
    public mapEdit: MapShareService,
    public navCtrl: NavController
  ) {
    console.log(this.navParams.data.data.fungsi);
    if (this.navParams.data) {
      this.data  = this.navParams.data.data
      //this.fungsi  = this.navParams.data.fungsi; 
    }
    
    this.mapEdit.getdrawing();
    
  }

  start(){
    this.mapEdit.setdrawing(true);
    console.log(this.mapEdit.drawingmode);
  }
 
  stop(){
    this.mapEdit.setdrawing(false);
    console.log(this.mapEdit.drawingmode);
  }
  save(){
    let id = this.data.fungsi.id;
    let poly = this.data.poly;
    let data = {shapeline:JSON.stringify(poly) };
    
    this.mapEdit.PostEditMapFungsi(id,data).subscribe(data => {
        this.data = data;
        if(this.data[0].result =="success"){
          
          this.navCtrl.popToRoot();
        }

    }, error => {
      console.log("Oooops!");
    });
  }
}