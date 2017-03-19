import { Injectable } from '@angular/core';
import { Network } from 'ionic-native';
import { Platform } from 'ionic-angular';
 
declare var Connection;
 
@Injectable()
export class ConnectivityService {
 
  onDevice: boolean;
  public rootUrl: string;
 
  constructor(public platform: Platform){
    this.onDevice = this.platform.is('cordova');
    this.setUrl('http://localhost:8100/jjpan');
  }

  setUrl(url) {
    this.rootUrl = url;
  }
  getUrl() {
    return this.rootUrl;   
  }
 
  isOnline(): boolean {
    if(this.onDevice && Network.onConnect){
      return Network.type !== Connection.NONE;
    } else {
      return navigator.onLine; 
    }
  }
 
  isOffline(): boolean {
    if(this.onDevice && Network.onConnect){
      return Network.type === Connection.NONE;
    } else {
      return !navigator.onLine;   
    }
  }
}