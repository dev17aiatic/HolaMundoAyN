import { Component, OnInit } from '@angular/core';
import { UserServiceService} from '../services/user-service.service';

import { Iregistro } from '../interfaces/iregistro';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public nombre;
  public apellido;
  public email;
  public direccion;
  public isRequesting: boolean;
  public cargando = true;

  constructor(private userSvs: UserServiceService) { }

  ngOnInit() {
    this.userSvs.profile().subscribe(x =>{
      
      console.log(x);
      this.nombre =x[0].Identity.FirstName;
      this.apellido = x[0].Identity.LastName;
      this.email = x[0].Identity.Email;
      this.direccion = x[0].Location;
      this.cargando = false;
    });
  }
  editar({ value, valid }: { value: Iregistro, valid: boolean }){
    this.cargando = true;
    value.email = this.email;
    var changeP = false;
    if (!value.password || value.password == "" || value.password == null){
      value.password = "nochange";
      changeP = false;
    }else{
      changeP = true;
    }
    this.isRequesting = true;     
     if(valid)
     {
         this.userSvs.editar(value)
                   .subscribe(
                     result  => {
                       this.cargando = false;
                       alert("Cambios relizados satisfactoriamente");
                       console.log(result);
                       //timeout(4500);     
                       if (changeP){
                         this.userSvs.logout();
                       }   
                       window.location.reload();
                     },
                     errors => console.log('Error-> ', errors));
     }      
  }

}
