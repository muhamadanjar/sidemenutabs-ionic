import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { JaringanJalan } from '../../providers/jaringan-jalan';
import { JaringanJalanFungsiListPage } from './fungsiList';

@Component({
  selector: 'page-jjFungsiEdit',
  templateUrl: 'fungsiEdit.html',
  providers:[JaringanJalan],
 
})
export class JaringanJalanFungsiEditPage {
  fungsi;
  results: Array<any>;
  public data;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,public jj:JaringanJalan) {
      this.data = {};
      this.data.response = '';
      this.fungsi = navParams.data.fungsi;
      this.data = this.fungsi;
      console.log(this.fungsi);
  }

  Update(id:string){

    let data = JSON.stringify({
        id: this.data.id,
        kode_ruas: this.data.kode_ruas,
        nama:this.data.nama,
        panjang:this.data.panjang,
        lebar:this.data.lebar,
        status:this.data.status,
        keterangan:this.data.keterangan
    });
    this.jj.EditFungsi(id).subscribe(
        data => {
          this.results = data;
          console.log(data);
          if(this.results[0].result =="success")
          {
            this.navCtrl.popTo(JaringanJalanFungsiListPage);
          }
        },
        err => {
          console.log(err);
        },
        () => console.log('Edit Complete')
    );

  }
  
  

}
