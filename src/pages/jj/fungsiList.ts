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
          Fungsi List
      </ion-title>
  </ion-navbar>
  <ion-content class="fungsi" padding>

  <ion-searchbar color="appbase" (input)="search($event, searchKey)">
  </ion-searchbar>
  <ion-list>
    <ion-item-sliding *ngFor="let fungsi of fungsis">
      <ion-item (click)="Viewperson(fungsi)">
        <ion-avatar item-left>
          <img src="assets/img/avatar-frodo.jpg">
        </ion-avatar>
        <h2>{{fungsi.nama}}</h2>
        <p>{{fungsi.fasilitas}}</p>
      </ion-item>
      <ion-item-options side="left" >
        <button ion-button color="primary" (click)="View(fungsi)">
          <ion-icon name="eye"></ion-icon>
          View
        </button>
        <button ion-button color="secondary" (click)="update(fungsi)">
          <ion-icon name="open"></ion-icon>
          Edit
        </button>
      </ion-item-options>
      <ion-item-options side="right">
        <button ion-button color="danger" (click)="Delete(fungsi.mem_mid)">
          <ion-icon name="trash"></ion-icon>
          Delete
        </button>
      </ion-item-options>
    </ion-item-sliding>
  </ion-list>
  
  
  </ion-content>
  `,
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
        () => console.log('Movie Search Complete')
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

  Viewperson(member){
    this.navCtrl.push(FungsiPage,{member:member});
  }
  View(member){
    this.navCtrl.push(FungsiPage,{member:member});
  }
  
  

}


@Component({
  selector: 'page-viewfungsi',
  //templateUrl: 'jj.html',
  providers:[JaringanJalan],
  template: `
    <ion-header>
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
                {{person.kode_ruas}}
                </button>

                <button ion-item>
                <ion-icon name="call" item-left></ion-icon>
                {{person.panjang}}
                </button>

                <button ion-item>
                <ion-icon name="home" item-left></ion-icon>
                {{person.lebar}}
                </button>

                <button ion-item>
                <ion-icon name="stats" item-left></ion-icon>
                {{person.status}}
                </button>

                <button ion-item>
                <ion-icon name="beer" item-left></ion-icon>
                {{person.keterangan}}
                </button>

            </ion-list>
            </ion-card-content>
        </ion-card>
    </ion-content>
  `,
})

export class FungsiPage {
  person;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.person = navParams.data.member;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonPage');
  }

}