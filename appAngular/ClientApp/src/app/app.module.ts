import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { MypageComponent } from './mypage/mypage.component';

import { ComponentsComponent } from './components/components.component';
import { LandingComponent } from './examples/landing/landing.component';
import { LoginComponent } from './examples/login/login.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';

import { NavbarComponent } from './shared/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    MypageComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,


    NgbModule,
    BrowserAnimationsModule,
    ComponentsModule,
    ExamplesModule,


    RouterModule.forRoot([

      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'index',                component: ComponentsComponent },
      { path: 'nucleoicons',          component: NucleoiconsComponent },
      { path: 'examples/landing',     component: LandingComponent },
      { path: 'examples/login',       component: LoginComponent },
      { path: 'examples/profile',     component: ProfileComponent },

      /*{ path: '', component: HomeComponent, pathMatch: 'full' },      
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'mypage', component: MypageComponent },*/

      { path: '**', component: HomeComponent, pathMatch: 'full' },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
