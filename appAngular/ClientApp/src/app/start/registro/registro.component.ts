import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Iregistro } from '../../interfaces/iregistro';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
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
         this.userService.register(value.email,value.password,value.firstName,value.lastName,value.location)
                   .finally(() => this.isRequesting = false)
                   .subscribe(
                     result  => {if(result){
                         this.router.navigate(['/login'],{queryParams: {brandNew: true,email:value.email}});                         
                     }},
                     errors =>  this.errors = errors);
     }      
  }  

}
