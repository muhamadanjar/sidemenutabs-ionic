import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { JaringanJalanFungsiEditPage } from './fungsiEdit';
import { JaringanJalan } from '../../providers/jaringan-jalan';

@Component({
  selector: 'page-jjFungsiList',
  templateUrl: 'fungsiList.html',
  providers:[JaringanJalan],
  
})
export class JaringanJalanFungsiListPage {
  todo = {};
  public data;
  public fungsis;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,public jj:JaringanJalan) {
        this.data = {};
        this.data.username = '';
        this.data.response = '';
 
        this.http = http;
  }

  ngOnInit(){
      //this.presentLoading();
      this.jj.LoadJalanFungsi().subscribe(
        data => {
          this.fungsis = data;
          console.log(data);
            //this.loader.dismiss();
        },
        err => {
          console.log(err);
        },
        () => console.log('Fungsi Complete')
    );
  }

  search(event, key){
      if(event.target.value.length > 0) {
          this.jj.searchFungsi(event.target.value).subscribe(
              data => {
                  this.data = data;
                  console.log(data);
              },
              err => {
                  console.log(err);
              },
              () => console.log('Data Search Complete')
          );
      }
  }

  Viewfungsi(member){
    this.navCtrl.push(FungsiPage,{person:member});
  }
  View(member){
    this.navCtrl.push(FungsiPage,{person:member});
  }

  Refresh(){
      
      this.jj.LoadJalanFungsi().subscribe(
          data => {
              this.fungsis = data;
              console.log(data);
              //this.loader.dismiss();
          },
          err => {
              console.log(err);
          },
          () => console.log('Load data Complete')
      );
  }

  update(fungsi){
      this.navCtrl.push(JaringanJalanFungsiEditPage,{fungsi:fungsi});
  }

  Delete(id:any){
      //this.presentLoading();
      this.jj.DeleteFungsi(id).subscribe(
          data => {
              this.fungsis = data;
              console.log(data);
              //this.loader.dismiss();
          },
          err => {
              console.log(err);
          },
          () => console.log('Delete Complete')
      );
  }
  
  

}


@Component({
  selector: 'page-viewfungsi',

  template: `
    <ion-header>
      <ion-navbar>
        <button ion-button menuToggle>
          <ion-icon name="menu"></ion-icon>
        </button>
        <ion-title>Jalan Fungsi {{person.nama}} </ion-title>
        
      </ion-navbar>
    </ion-header>
    <ion-content>
      <ion-item>
        <ion-icon name="square" item-left></ion-icon>
        Kode Ruas
        <ion-badge item-right>{{person.kode_ruas}}</ion-badge>
      </ion-item>
      <ion-item>
        <ion-icon name="logo-xbox" item-left></ion-icon>
        Panjang
        <ion-badge item-right>{{person.panjang}}</ion-badge>
      </ion-item>
      <ion-item>
        <ion-icon name="sunny" item-left></ion-icon>
        Lebar
        <ion-badge item-right>{{person.lebar}}</ion-badge>
      </ion-item>
      <ion-item>
        <ion-icon name="stats" item-left></ion-icon>
        Lebar
        <ion-badge item-right>{{person.status}}</ion-badge>
      </ion-item>
        
    </ion-content>
  `,
})

export class FungsiPage {
  person;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams);
    this.person = navParams.data.person;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonPage');
  }

}