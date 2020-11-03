import { Component, OnDestroy, OnInit} from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { UserServiceService } from './services/user-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  //title = 'app';

    constructor(public location: Location, private userSvs: UserServiceService) {}
  ngOnDestroy(): void {
    alert("Sesion cerrada");
    this.userSvs.logout();
    throw new Error('Method not implemented.');
  }
    ngOnInit() {
    }
    
    isMap(path){
        var titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.slice( 1 );
        if(path == titlee){
          return false;
        }
        else {
          return true;
        }
      }
}
