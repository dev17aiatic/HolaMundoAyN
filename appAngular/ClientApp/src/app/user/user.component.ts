import { Component, OnInit } from '@angular/core';
import { UserServiceService} from '../services/user-service.service';

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

}
