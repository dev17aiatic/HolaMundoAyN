import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigServiceService {
  _apiURI : string;

  constructor() { 
    this._apiURI = 'http://localhost:44393/api';
  }
  getApiURI() {
    return this._apiURI;
}    
}
