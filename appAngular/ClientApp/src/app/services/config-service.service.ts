import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigServiceService {
  _apiURI : string;

  constructor() { 
    this._apiURI = 'https://localhost:44392/api';
  }
  getApiURI() {
    return this._apiURI;
}    
}
