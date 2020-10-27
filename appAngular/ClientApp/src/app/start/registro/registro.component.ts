import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Iregistro } from '../../interfaces/iregistro';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  errors: string;  
 isRequesting: boolean;
 submitted: boolean = false;
 
 constructor(private userService: UserServiceService,private router: Router) { 
   
 }


  ngOnInit(): void {
  }

  registerUser({ value, valid }: { value: Iregistro, valid: boolean }) {
     this.submitted = true;
     this.isRequesting = true;
     this.errors='';
     if(valid)
     {
         this.userService.registrar(value)
                   .subscribe(
                     result  => {
                       console.log(result);
                     },
                     errors =>  this.errors = errors);
     }      
  }  

}
