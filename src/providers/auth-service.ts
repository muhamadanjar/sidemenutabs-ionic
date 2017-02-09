import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {
  rootUrl;
  constructor(public http: Http) {
    console.log('Hello AuthService Provider');
    this.rootUrl = 'http://localhost:8000/api';
  }

  Login() {
    var url = this.rootUrl+'/login';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

}
