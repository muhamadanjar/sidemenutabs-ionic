import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class MapShareService {  

    drawingmode: boolean;
    rootUrl;
    constructor(public http: Http) {
        this.drawingmode = true;
        this.rootUrl = 'http://192.168.20.8:8100/jjpan';
    }
  
    setdrawing(mode) {
        this.drawingmode = mode;    
    }
    getdrawing() {
        return this.drawingmode;   
    }

    LoadJalanFungsi() {
        var url = this.rootUrl+'/jjfungsi';
        var response = this.http.get(url).map(res => res.json());
        return response;
    }

    PostInsertFungsi(data){
        var url = this.rootUrl+'/jjfungsi/insert';
        var response = this.http.post(url,data).map(res => res.json());
        return response;
    }
    PostEditFungsi(id,data){
        var url = this.rootUrl+'/jjfungsi/edit/'+id;
        var response = this.http.post(url,data).map(res => res.json());
        return response;
    }

    DeleteFungsi(id){
        var url = this.rootUrl+'/jjfungsi/delete/'+id;
        var response = this.http.get(url).map(res => res.json());
        return response;

    }

    PostEditMapFungsi(id,data){
        var url = this.rootUrl+'/jjfungsi/editmap/'+id;
        var response = this.http.post(url,data).map(res => res.json());
        return response;
    }

    searchFungsi(search) {
        var url = this.rootUrl+'/searchjjfungsi/'+search ;
        var response = this.http.get(url).map(res => res.json());
        return response;
    }

    
  
}