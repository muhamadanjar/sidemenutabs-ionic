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
  LoadJalanFungsi() {
    var url = this.rootUrl+'/jjfungsi';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  InserFungsi(kode_ruas,nama,panjang,lebar,status,keterangan){
    var url = this.rootUrl+'/jjfungsi/insert?kode_ruas='+kode_ruas+'&nama='+nama+'&panjang='+panjang+'&lebar='+lebar+'&status='+status+'&keterangan='+keterangan;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  DeleteFungsi(id){
    var url = this.rootUrl+'/jjfungsi/delete/'+id;
    var response = this.http.get(url).map(res => res.json());
    return response;

  }

  EditFungsi(id){
    var url = this.rootUrl+'/jjfungsi/edit/'+id;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }
  searchFungsi(search) {
    var url = this.rootUrl+'/searchjjfungsi/'+search ;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

}
