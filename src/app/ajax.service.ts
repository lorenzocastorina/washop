import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AjaxService {

  baseUrl = 'https://zerottanta.com/api/v2/utils/';
  appId = 723;
  
  url = this.baseUrl + this.appId + '/';

  resourceUrl = 'https://zerottanta.com/';


  constructor(
    private http: HttpClient
  ) { }

  get(path) {
    return this.http.get(this.url + path)
  }

  post(path, obj, isResourceUrl?) {   // non è obbligatorio passare il parametro

    const url = isResourceUrl ? this.resourceUrl + path : this.url + path;
    
    return this.http.post(url, obj);
  }
  
}
