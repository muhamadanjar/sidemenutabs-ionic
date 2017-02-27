import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams, MenuController,Nav } from 'ionic-angular';
import { JaringanJalanFungsiListPage } from './fungsiList';
import { JaringanJalanFungsiMapTambahPage } from './fungsiMapAdd';
import { JaringanJalanFungsiMapEditPage } from './fungsiMapEdit';


@Component({
  selector: 'page-jaringanjalan',
  templateUrl: 'jj.html'
})
export class JjPage {
  @ViewChild(Nav) nav: Nav;
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
    this.nav.setRoot(page.component);
  }
  goToFungsi() {
    
    this.navCtrl.push(JaringanJalanFungsiListPage);
  }
   goToMapAdd(){
     this.navCtrl.push(JaringanJalanFungsiMapEditPage);
   }

  

}
