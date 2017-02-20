import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the JaringanJalan provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class JaringanJalan {
  rootUrl;
  constructor(public http: Http) {
    this.rootUrl = 'http://192.168.20.26:8100/jjpan';
    console.log('Hello JaringanJalan Provider');
  }

}
