import { Component } from '@angular/core';
import { JaringanJalanFungsiMapEditPage } from './fungsiMapEdit';
import { PopoverController,ViewController,NavController, NavParams } from 'ionic-angular';
import { MapShareService } from '../../providers/mapshareservices';
@Component({
  template: `
    <ion-list>
      <button ion-item (click)="start()" *ngIf="this.mapEdit.drawingmode" class="disabled">Mulai Edit</button>
      <button ion-item (click)="stop()" *ngIf="this.mapEdit.drawingmode" class="disabled">Berhenti Edit</button>
      <button ion-item (click)="save()">Simpan</button>
    </ion-list>
  `,
  providers:[MapShareService],
})
export class PopoverEditing {
  
  data:any;
  constructor(private navParams: NavParams,public mapEdit: MapShareService,public navCtrl: NavController) {
    //console.log(this.mapEdit.drawingmode);
    if (this.navParams.data) {
      this.data  = this.navParams.data 
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
    console.log(this.data);
    
    /*this.mapEdit.PostEditMapFungsi(id,data).subscribe(data => {
        this.data = data;
        if(this.data[0].result =="success"){
          
          this.navCtrl.popToRoot();
        }
            
    }, error => {
      console.log("Oooops!");
    });*/
  }
}