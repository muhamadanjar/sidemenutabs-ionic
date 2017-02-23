import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { JaringanJalan } from '../../providers/jaringan-jalan';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-jjFungsiEdit',
  templateUrl: 'fungsiEdit.html',
  providers:[JaringanJalan],
 
})
export class JaringanJalanFungsiEditPage {
  fungsi;
  results: Array<any>;
  public data;
  loader: any;
  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public http:Http,public jj:JaringanJalan,public loadingCtrl:LoadingController
  ) {
      this.data = {};
      this.data.response = '';
      this.fungsi = navParams.data.fungsi;
      this.data = this.fungsi;
      console.log(this.fungsi);
  }

  Update(id:string){
    this.presentLoading();
    var link = 'http://192.168.20.26:8100/jjpan/jjfungsi/edit/'+id;
    let data = JSON.stringify({
        id: this.data.id,
        kode_ruas: this.data.kode_ruas,
        nama:this.data.nama,
        panjang:this.data.panjang,
        lebar:this.data.lebar,
        status:this.data.status,
        keterangan:this.data.keterangan
    });
    this.jj.PostEditFungsi(id,data).subscribe(data => {
      this.data = data;
        if(this.data[0].result =="success"){
          this.navCtrl.pop();
        }
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
