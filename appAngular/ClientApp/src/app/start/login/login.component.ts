import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';


import { Router, ActivatedRoute } from '@angular/router';

import { Ilogin } from '../../interfaces/ilogin';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private subscription: Subscription;

  brandNew: boolean;
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;
  credentials: Ilogin = { email: '', password: '' };

  constructor(private userService: UserServiceService, private router: Router,private activatedRoute: ActivatedRoute) { }

    ngOnInit() {

    // subscribe to router event
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (param: any) => {
         this.brandNew = param['brandNew'];   
         this.credentials.email = param['email'];         
      });      
  }

   ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.subscription.unsubscribe();
  }

  login({ value, valid }: { value: Ilogin, valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors='';
    if (valid) {
      this.userService.login(value)
        .subscribe(
        result => {    
          this.isRequesting=false;     
          //console.log(result.toString());
          if (result) {
            console.log(result);
            if (result.toString()== "DENEGADO"){
              this.errors = "Usuario o Contraseña incorrectos";
            }else{ 
             var token = result.auth_token;
             var id = result.id;
            localStorage.setItem('auth_token', token);
            localStorage.setItem('id', id);

            //this.userService.loggedIn = true;

            console.log(this.userService.getloggedIn());
            console.log(localStorage.getItem('auth_token'));
            console.log(localStorage.getItem('id'));

            this.router.navigate(['/dashboard']);             
            }
          }
        },
        errors => {
          this.isRequesting=false;
          this.errors = errors; 
          console.log(errors);});
    }
  }

}

