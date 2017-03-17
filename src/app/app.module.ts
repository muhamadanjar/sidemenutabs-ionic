import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Storage } from '@ionic/storage';


import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage,PersonPage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { AccountPage } from '../pages/account/account';
import { MapsPage } from '../pages/maps/maps';



import { LoginPage } from '../pages/login/login';

import { JjPage } from '../pages/jj/jj';
import { JaringanJalanFungsiListPage,FungsiPage } from '../pages/jj/fungsiList';
import { JaringanJalanFungsiTambahPage } from '../pages/jj/fungsiTambah';
import { JaringanJalanFungsiEditPage } from '../pages/jj/fungsiEdit';
import { JaringanJalanFungsiMapTambahPage } from '../pages/jj/fungsiMapAdd';
import { JaringanJalanFungsiMapEditPage} from '../pages/jj/fungsiMapEdit';
import { PopoverEditing } from '../pages/jj/PopoverEditing';

import { PoiPage } from '../pages/poi/poi';

import { BasicPage as ModalBasicPage,ModalContentPage } from '../pages/home/pages';
import { ModalContentPage as MapModal } from '../pages/maps/modal';


import { ConnectivityService } from '../providers/connectivity-service';
import { Auth } from '../providers/auth';
import { DataFasilitas } from '../providers/fasilitas';
import { Map as MapService } from '../providers/map';
import { JaringanJalan as JaringanJalanService } from '../providers/jaringan-jalan';


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
    
    
    JjPage,

    JaringanJalanFungsiListPage,
    JaringanJalanFungsiTambahPage,
    JaringanJalanFungsiEditPage,
    FungsiPage,
    JaringanJalanFungsiMapTambahPage,
    JaringanJalanFungsiMapEditPage,
    PopoverEditing,

    PoiPage,

    LoginPage,

    ModalBasicPage,
    ModalContentPage,
    MapModal

    
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    
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
    
    LoginPage,

    JjPage,

    JaringanJalanFungsiListPage,
    JaringanJalanFungsiTambahPage,
    JaringanJalanFungsiEditPage,
    FungsiPage,
    JaringanJalanFungsiMapTambahPage,
    JaringanJalanFungsiMapEditPage,
    PopoverEditing,

    PoiPage,

    ModalBasicPage,
    ModalContentPage,
    MapModal

    
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},DataFasilitas,MapService,JaringanJalanService,Auth,Storage]
})
export class AppModule {}
