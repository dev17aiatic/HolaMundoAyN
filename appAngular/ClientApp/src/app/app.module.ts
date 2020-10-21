import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

//import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';


import { NavbarComponent } from './shared/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,


    RouterModule.forRoot([

      { path: '', redirectTo: 'index', pathMatch: 'full' },


      /*{ path: '', component: HomeComponent, pathMatch: 'full' },      
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'mypage', component: MypageComponent },*/

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      }, {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
          path: '',
          loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }]},
      {
        path: '**',
        redirectTo: 'dashboard'
      }
      
    ], {useHash:true}),

    NavbarModule,
    FooterModule,
    SidebarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
