import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { JaringanJalan } from '../../providers/jaringan-jalan';

@Component({
  selector: 'page-jj',
  //templateUrl: 'jj.html',
  providers:[JaringanJalan],
  template: `
  <ion-navbar *navbar>
      <ion-title>
          Fungsi List
      </ion-title>
  </ion-navbar>
  <ion-content class="fungsi" padding>
  
  
  </ion-content>
  `,
})
export class JaringanJalanFungsiEditPage {
  todo = {};
  public data;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,public jj:JaringanJalan) {
        this.data = {};
        this.data.username = '';
        this.data.response = '';
 
        this.http = http;
  }
  
  

}
