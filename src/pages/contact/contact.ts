import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Contact page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  public firstParam:any;
  public secondParam:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.firstParam = navParams.get("firstPassed");
      this.secondParam = navParams.get("secondPassed");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

}
