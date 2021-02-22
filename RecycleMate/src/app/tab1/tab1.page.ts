import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  urlBase = 'https://api.recollect.net/api/areas/Regina/services/waste/pages/en/209255.json';
  headers = new HttpHeaders();

 
  constructor(private  http: HttpClient) {
    this.headers.append('Access-Control-Allow-Origin' , '*');
    this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    this.headers.append('Accept','application/json');
    this.headers.append('content-type','application/json');
  }
  getCall() {
   let options = { headers: this.headers};
   this.http.get(this.urlBase, options).toPromise().then( data => {
     console.log(data);
   });
   
  }
}
