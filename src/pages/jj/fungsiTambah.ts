import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { JaringanJalan } from '../../providers/jaringan-jalan';
import { HomePage } from '../home/home';
import { JaringanJalanFungsiListPage } from './fungsiList';

@Component({
  selector: 'page-jjFungsiTambah',
  templateUrl: 'fungsiTambah.html',
  providers:[JaringanJalan],
  
})
export class JaringanJalanFungsiTambahPage {
  todo = {};
  public data;
  results: Array<any>;
  loader: any;
  FungsiList;
  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public http:Http,public jj:JaringanJalan,
    public loadingCtrl:LoadingController
  ) {
        this.data = {};
        this.http = http;
        this.FungsiList = JaringanJalanFungsiListPage;
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad JaringanJalanFungsi');
  }

  logForm() {
    console.log(this.data)
  }

  goBack() {
    this.navCtrl.pop();
  }

  submit() {
    this.presentLoading();
        
        let data = JSON.stringify({
          kode_ruas: this.data.kode_ruas,
          nama:this.data.nama,
          panjang:this.data.panjang,
          lebar:this.data.lebar,
          status:this.data.status,
          keterangan:this.data.keterangan
        });
        
        this.jj.PostInserFungsi(data).subscribe(data => {
          this.results = data;
          console.log(data);
          if(this.results[0].result =="success"){
            this.navCtrl.popToRoot();
            //this.goBack();
          }
          //this.FungsiList.ngOnInit();
          this.loader.dismiss();
         
        }, error => {
            console.log("Oooops!");
        });
  }

  presentLoading() {
        this.loader = this.loadingCtrl.create({
            content: "Loading..."
        });
        this.loader.present();
  }

}
