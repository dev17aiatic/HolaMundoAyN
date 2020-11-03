import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'jquery';
import { interval} from 'rxjs';
import { UserServiceService } from '../services/user-service.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
    { path: '/user', title: 'User Profile',  icon:'pe-7s-user', class: '' },
    { path: '/table', title: 'Table List',  icon:'pe-7s-note2', class: '' },
    { path: '/typography', title: 'Typography',  icon:'pe-7s-news-paper', class: '' },
    { path: '/icons', title: 'Icons',  icon:'pe-7s-science', class: '' },
    { path: '/maps', title: 'Maps',  icon:'pe-7s-map-marker', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'pe-7s-bell', class: '' },
    //{ path: '/upgrade', title: 'Upgrade to PRO',  icon:'pe-7s-rocket', class: 'active-pro' },
];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  public sesion: boolean;

  constructor(private userSvs: UserServiceService, private router : Router) { 
    const cont = interval(1000);
    cont.subscribe((n) => {
      //console.log('segundos', n);
      this.isSesion();
      //this.userService.logout();
    });
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
  isSesion(){
    this.sesion = false;
    if (localStorage.getItem('auth_token')){
      this.sesion = true;      
    }
  }
  salir(){
    console.log("dio clic");
    this.userSvs.logout();
    this.router.navigate(['/login']);
}
}
