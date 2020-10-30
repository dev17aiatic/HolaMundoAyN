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

  constructor(private userSvs: UserServiceService) { }

  ngOnInit() {
    this.userSvs.profile().subscribe(x =>{
      console.log(x);
      this.nombre =x[0].Identity.FirstName;
      this.apellido = x[0].Identity.LastName;
      this.email = x[0].Identity.Email;
      this.direccion = x[0].Location;
    });
  }
  editar({ value, valid }: { value: Iregistro, valid: boolean }){
    value.email = this.email;
    value.password = "blablabla";
    this.isRequesting = true;     
     if(valid)
     {
         this.userSvs.editar(value)
                   .subscribe(
                     result  => {
                       alert("Cambios relizados satisfactoriamente");
                       console.log(result);
                       //timeout(4500);        
                       window.location.reload();
                     },
                     errors => console.log('Error-> ', errors));
     }      
  }

}
