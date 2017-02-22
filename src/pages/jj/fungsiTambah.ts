import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { JaringanJalan } from '../../providers/jaringan-jalan';

@Component({
  selector: 'page-jjFungsiTambah',
  templateUrl: 'fungsiTambah.html',
  providers:[JaringanJalan],
  
})
export class JaringanJalanFungsiTambahPage {
  todo = {};
  public data;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,public jj:JaringanJalan) {
        this.data = {};
        this.data.username = '';
        this.data.response = '';
 
        this.http = http;
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
        var link = 'http://192.168.20.26:8100/jjpan/jjfungsi/insert';
        let data = JSON.stringify({
          kode_ruas: this.data.kode_ruas,
          nama:this.data.nama,
          panjang:this.data.panjang,
          lebar:this.data.lebar,
          status:this.data.status,
          keterangan:this.data.keterangan
        });
        
        /*this.jj.InserFungsi(this.data.kode_ruas,this.data.nama,this.data.panjang,this.data.lebar,this.data.status,this.data.keterangan).subscribe(data => {
          console.log(data);
         this.data.response = data;
        }, error => {
            console.log("Oooops!");
        });*/
        this.http.post(link,data)
        .subscribe(data => {
          console.log(data);
         this.data.response = data;
        }, error => {
            console.log("Oooops!");
        });
  }

}
