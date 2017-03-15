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
    menu: MenuController,
    //public jFungsi: JaringanJalanFungsiMapTambahPage
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
