import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { ConnectivityService } from './connectivity-service';

export class User {
  name: string;
  username: string;
 
  constructor(name: string, username: string) {
    this.name = name;
    this.username = username;
  }
}

@Injectable()
export class Auth {
  public token: any;
  public url;
  public url_baru;
  currentUser: User;
  constructor(public http: Http, public storage: Storage,public conn:ConnectivityService) {
    this.url = this.conn.rootUrl;
    console.log(this.url);
    this.url_baru ='http://192.168.20.8/api';
  }
  
  checkAuthentication(){
    return new Promise((resolve, reject) => {
        this.storage.get('token').then((value) => {
            this.token = value;
            let headers = new Headers();
            headers.append('Authorization', this.token);
            console.log(this.token);
            
            this.http.get(this.url+'/checklogin', {headers: headers})
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                }); 
 
        });         
 
    });
 
  }

  createAccount(details){
 
    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
 
        this.http.post('https://YOUR_HEROKU_APP.herokuapp.com/api/auth/register', JSON.stringify(details), {headers: headers})
          .subscribe(res => {
 
            let data = res.json();
            this.token = data.token;
            this.storage.set('token', data.token);
            resolve(data);
 
          }, (err) => {
            reject(err);
          });
 
    });
 
  }

  login(credentials){
    if (credentials.username === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post(this.url+'/login', JSON.stringify(credentials), {headers: headers}) .subscribe(res => {
              let data = res.json();
                            
              this.token = data.token;
              this.storage.set('token', data.token);
              //let access = (credentials.password === data.password && credentials.username === data.username);
              //console.log(access);
              console.log(data);
              if(data.data){
                this.currentUser = new User(data.data.name, data.data.email);
                this.storage.set('currentUser', this.currentUser);
              }
              observer.next(data.status);
              observer.complete();
          });
        
        
      });
    }
    /*return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
 
        this.http.post(this.url+'/login', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {
 
            let data = res.json();
            this.token = data.token;
            this.storage.set('token', data.token);
            //console.log(data);
            resolve(data);
            //resolve(res.json());
          
            this.currentUser = new User(data.name, data.email);
            this.storage.set('currentUser', this.currentUser);
          }, (err) => {
            console.log(err);
            
            reject(err);
          });
 
    });*/
 
  }
 
  logout(){
    this.storage.set('token', '');
    this.storage.set('currentUser', '');
    var url = this.url_baru+'/logout';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  gettoken(){
    return this.token;
  }

  settoken(token){
    this.token = token;
  }


  //====================================//
  public login_dua(credentials) {
    if (credentials.username === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        let access = (credentials.password === "pass" && credentials.username === "user");
        this.currentUser = new User('Simon', 'saimon@devdactic.com');
        observer.next(access);
        observer.complete();
      });
    }
  }
 
  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUserInfo() : User {
    return this.currentUser;
  }

  public logout_dua() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

  login_baru(data){
    var url = this.url_baru+'/login';
    var response = this.http.post(url,data).map(res => res.json());
    return response;
  }

  sget(url) {
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

 



}
