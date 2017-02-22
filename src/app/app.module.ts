import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage,PersonPage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { AccountPage } from '../pages/account/account';
import { MapsPage } from '../pages/maps/maps';
import { MapPage } from '../pages/map/map';


import { LoginPage } from '../pages/login/login';
import { JjPage } from '../pages/jj/jj';
import { JaringanJalanFungsiListPage,FungsiPage } from '../pages/jj/fungsiList';
import { JaringanJalanFungsiTambahPage } from '../pages/jj/fungsiTambah';
import { JaringanJalanFungsiEditPage } from '../pages/jj/fungsiEdit';


import { BasicPage as ModalBasicPage,ModalContentPage } from '../pages/home/pages';
import { ModalContentPage as MapModal } from '../pages/maps/modal';


import { ConnectivityService } from '../providers/connectivity-service';
import { DataFasilitas } from '../providers/fasilitas';
import { Map as MapService } from '../providers/map';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    PersonPage,

    TabsPage,
    SettingsPage,
    AccountPage,
    MapsPage,
    MapPage,
    
    JjPage,

    JaringanJalanFungsiListPage,
    JaringanJalanFungsiTambahPage,
    JaringanJalanFungsiEditPage,
    FungsiPage,
    
    LoginPage,

    ModalBasicPage,
    ModalContentPage,
    MapModal

    
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
    PersonPage,
    
    TabsPage,
    AccountPage,
    SettingsPage,
    MapsPage,
    MapPage,
    LoginPage,

    JjPage,

    JaringanJalanFungsiListPage,
    JaringanJalanFungsiTambahPage,
    JaringanJalanFungsiEditPage,
    FungsiPage,

    ModalBasicPage,
    ModalContentPage,
    MapModal

    
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},DataFasilitas,MapService]
})
export class AppModule {}
