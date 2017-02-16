import { Component, ViewChild, ElementRef } from '@angular/core';

import { NavController, Platform, ModalController, NavParams, ViewController } from 'ionic-angular';
import { Map as MapService } from "../../providers/map";

@Component({
  template: `
<ion-header>
  <ion-toolbar color="primary">
    <ion-title>
      Info
    </ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <span ion-text color="primary" showWhen="ios">Cancel</span>
        <ion-icon name="md-close" showWhen="android,windows"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content>
  <ion-list>
      <ion-item>
        <ion-avatar item-left>
          <img src="/asset/img/">
        </ion-avatar>
        <h2>A</h2>
        <p>{{firstParam}}</p>
      </ion-item>

      <ion-item>
        {{character.name}}
        <ion-note item-right>
          {{character.qoute}}
        </ion-note>
      </ion-item>
      
     

      

  </ion-list>
</ion-content>
`
})
export class ModalContentPage {
  firstParam;
  character;
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public ms:MapService
  ) {

    this.firstParam = params.get("num");
    this.character = params.get("character");
    /*this.ms.LoadPoi().subscribe(
        data => {
          this.characters = data;
        },
        err => {
          console.log(err);
        },
    );*/

  }

  
  dismiss() {
    this.viewCtrl.dismiss();
  }
}