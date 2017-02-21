import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { JaringanJalan } from '../../providers/jaringan-jalan';

@Component({
  selector: 'page-jj',
  //templateUrl: 'jj.html',
  providers:[JaringanJalan],
  template: `
  <ion-navbar *navbar>
      <ion-title>
          Fungsi
      </ion-title>
  </ion-navbar>
  <ion-content class="home" padding>
  <ion-list no-lines>
    <form (ngSubmit)="logForm()">
      <ion-item>
        <ion-label>Kode Ruas</ion-label>
        <ion-input type="text" [(ngModel)]="data.kode_ruas" name="kode_ruas"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Nama</ion-label>
        <ion-textarea [(ngModel)]="data.nama" name="nama"></ion-textarea>
      </ion-item>
      <ion-item>
        <ion-label>Panjang</ion-label>
        <ion-textarea [(ngModel)]="data.panjang" name="panjang"></ion-textarea>
      </ion-item>
      <ion-item>
        <ion-label>Lebar</ion-label>
        <ion-textarea [(ngModel)]="data.lebar" name="lebar"></ion-textarea>
      </ion-item>
      <ion-item>
        <ion-label>Status</ion-label>
        <ion-textarea [(ngModel)]="data.status" name="status"></ion-textarea>
      </ion-item>
      <ion-item>
        <ion-label>Keterangan</ion-label>
        <ion-textarea [(ngModel)]="data.keterangan" name="keterangan"></ion-textarea>
      </ion-item>
      <button ion-button type="submit" block>Simpan</button>
    </form>
  </ion-list>
  <button ion-button round block (click)="submit()">Submit to server</button>
  <ion-card>
        <ion-card-header>
            Response
        </ion-card-header>
        
        <ion-card-content>
            <b>{{data.response}}</b>
        </ion-card-content>
  </ion-card>
  </ion-content>
  `,
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
