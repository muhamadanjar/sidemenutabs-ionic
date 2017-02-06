import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { AccountPage } from '../pages/account/account';
import { MapsPage } from '../pages/maps/maps';
import { MapPage } from '../pages/map/map';
import { ConnectivityService } from '../providers/connectivity-service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SettingsPage,
    AccountPage,
    MapsPage,
    MapPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AccountPage,
    SettingsPage,
    MapsPage,
    MapPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},ConnectivityService]
})
export class AppModule {}
