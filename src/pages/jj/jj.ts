import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams, MenuController,Nav } from 'ionic-angular';
import { JaringanJalanFungsiListPage } from './fungsiList';
import { JaringanJalanFungsiTambahPage } from './fungsiTambah';
import { JaringanJalanFungsiEditPage } from './fungsiEdit';



@Component({
  selector: 'page-jj',
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

  

}
