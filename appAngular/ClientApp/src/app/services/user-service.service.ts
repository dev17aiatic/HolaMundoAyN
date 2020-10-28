import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ilogin } from '../interfaces/ilogin';
import { Iregistro } from '../interfaces/iregistro';
import { ConfigServiceService} from './config-service.service';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private _loggedIn = false;
  public getloggedIn() : Boolean{
    if (localStorage.getItem('auth_token')){
      return true;
    }
    return false;
  }

  constructor(private http: HttpClient, private cfg: ConfigServiceService) { 
    //this._loggedIn = !!localStorage.getItem('auth_token');

  }  

  registrar(usuario : Iregistro){
    var email =usuario.email;
    var password =usuario.password;
    var firstName =usuario.firstName;
    var lastName =usuario.lastName;
    var location = usuario.location;
    let body = JSON.stringify({email, password, firstName, lastName,location });
    console.log(body);
    let headers = {headers: { 'Content-Type': 'application/json' }};
    //let options = new RequestOptions({ headers: headers });
    return this.http.post( this.cfg.getApiURI() + '/accounts', body, headers);
  }
  login(usuario: Ilogin){
    var userName = usuario.email;
    var password = usuario.password;
    let body = JSON.stringify({userName, password});
    console.log(body);
    let headers = {headers: { 'Content-Type': 'application/json' }};

    return this.http.post(this.cfg.getApiURI()+'/auth/login', body, headers);
  }
  logout(){
    localStorage.removeItem('auth_token');
  }
}
