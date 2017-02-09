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
        () => console.log('Movie Search Complete')
    );
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

  
  
  

}


