import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class NavGuardGuard implements CanActivate{
  constructor( private userSvs: UserServiceService, private router : Router){}
  canActivate(){
      if (this.userSvs.loggedIn){
        this.router.navigate(['/dashboard']);
        return true;
      }
    this.router.navigate(['/login']);
    return false;
  }
  
}
