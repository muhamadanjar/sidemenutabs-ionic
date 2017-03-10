import { Component } from '@angular/core';
import { 
  NavController, NavParams, 
  AlertController, ModalController,
  ViewController, Platform,
  LoadingController 
} 
from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {DataFasilitas} from "../../providers/fasilitas";
import {ContactPage} from "../contact/contact";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  fasilitas: Array<any>;
  posts: any;
  loader: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public data:DataFasilitas
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  ngOnInit(){
      /*this.presentLoading();
      this.data.LoadFasilitas().subscribe(
        data => {
          this.fasilitas = data;
          console.log(data);
            this.loader.dismiss();
        },
        err => {
          console.log(err);
        },
        () => console.log('Movie Search Complete')
      );*/
  }

  Refresh(){
      this.presentLoading();
      this.data.LoadFasilitas().subscribe(
          data => {
              this.fasilitas = data;
              console.log(data);
              this.loader.dismiss();
          },
          err => {
              console.log(err);
          },
          () => console.log('Load data Complete')
      );
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'New Friend!',
      subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: ['OK']
    });
    alert.present();
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    this.loader.present();
  }

  search(event, key){
      if(event.target.value.length > 0) {
          this.data.searchFasilitas(event.target.value).subscribe(
              data => {
                  this.fasilitas = data;
                  console.log(data);
              },
              err => {
                  console.log(err);
              },
              () => console.log('Data Search Complete')
          );
      }
  }

  Viewperson(member){
    this.navCtrl.push(PersonPage,{member:member});
  }
  View(member){
    this.navCtrl.push(PersonPage,{member:member});
  }

  navigatePage(){
    this.navCtrl.push(ContactPage,{
            firstPassed: "value 1",
            secondPassed: "value 2"
          });
  }

  

}

@Component({
  selector: 'page-viewfungsi',
  //templateUrl: 'jj.html',
  
  template: `
    <ion-header>
      <button ion-button menuToggle>
        <ion-icon name="menu"></ion-icon>
      </button>
      <ion-navbar color="appbase">
        <ion-title>{{person.name}}</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content>
        <ion-card>
            <img src="assets/icon/avatar04.png"/>
            <ion-card-content>
              <ion-card-title>
                  <h2>{{person.nama}}</h2>
              </ion-card-title>
              <ion-list>
                  <button ion-item>
                  <ion-icon name="mail" item-left></ion-icon>
                  {{person.nama_jalan}}
                  </button>

                  <button ion-item>
                  <ion-icon name="call" item-left></ion-icon>
                  {{person.fasilitas}}
                  </button>
              </ion-list>
            </ion-card-content>
        </ion-card>
    </ion-content>
  `,
})

export class PersonPage {
  person;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.person = navParams.data.member;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonPage');
  }

}


