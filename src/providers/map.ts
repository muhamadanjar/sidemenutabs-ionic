import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Map provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Map {
  rootUrl;
  constructor(public http: Http) {
    console.log('Hello Map Provider');
    this.rootUrl = 'http://localhost:8000/api';
  }

  LoadMarker() {
    var url = this.rootUrl+'/map/getmarker';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

}
