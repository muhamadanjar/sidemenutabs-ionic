import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { JaringanJalanFungsiPage } from './fungsi';



@Component({
  selector: 'page-jj',
  templateUrl: 'jj.html'
})
export class JjPage {

  constructor
  ( public navCtrl: NavController, 
    public navParams: NavParams,
    menu: MenuController
  ){
    menu.enable(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JjPage');
  }

  goToFungsi() {
    
    this.navCtrl.push(JaringanJalanFungsiPage);
  }

  goToStatus(){
    this.navCtrl.push(JaringanJalanFungsiPage);
  }

  

}
