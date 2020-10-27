import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iregistro } from '../interfaces/iregistro';
import { ConfigServiceService} from './config-service.service';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {


  constructor(private http: HttpClient, private cfg: ConfigServiceService) { }  

  registrar(usuario : Iregistro){
    var email =usuario.email;
    var password =usuario.password;
    var firstName =usuario.firstName;
    var lastName =usuario.lastName;
    var location = usuario.location;
    let body = JSON.stringify({email, password, firstName, lastName,location });
    var body2 = {
      "email": "carlos2@gmail.com",
      "password": "pa55ssword",
      "firstName": "Marko",
      "lastName": "zucaritos",
      "location":"mi casa"
  };
    console.log(body);
    let headers = {headers: { 'Content-Type': 'application/json' }};
    //let options = new RequestOptions({ headers: headers });
    return this.http.post('https://localhost:44392/api/accounts', body, headers);
  }
}
