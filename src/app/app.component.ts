import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { MapsPage } from '../pages/maps/maps';
import { LoginPage } from '../pages/login/login';
import { JjPage } from '../pages/jj/jj';
import { PoiPage } from '../pages/poi/poi';
import { Auth } from '../providers/auth';
 

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,public auth:Auth) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Beranda', component: TabsPage },
      { title: 'Jaringan Jalan', component: JjPage },
      { title: 'POI', component: PoiPage }
    ];

  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  logout() {
    //this.auth.logout();
    this.auth.logout().subscribe(
        data => {
          console.log(data);
          if(data.login == 0){
            this.nav.setRoot(LoginPage);
          }
        },
        err => {
          console.log(err);
        }
    );
  }
}
