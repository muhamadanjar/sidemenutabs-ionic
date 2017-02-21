import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { JaringanJalanFungsiListPage } from './fungsiList';
import { JaringanJalanFungsiTambahPage } from './fungsiTambah';
import { JaringanJalanFungsiEditPage } from './fungsiEdit';



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

  gotoPage(page){
    this.navCtrl.push(page);
  }
  goToFungsi() {
    
    this.navCtrl.push(JaringanJalanFungsiListPage);
  }

  

}
