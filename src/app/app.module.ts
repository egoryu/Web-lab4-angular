import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { MainComponent } from './components/main/main.component';
import { PointService } from './services/point/point.service';
import { UserService } from './services/user/user.service';
import { httpInterceptorProviders } from './services/http-request-interceptor';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'primeng/accordion';
import { SliderModule } from 'primeng/slider';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

const appRoutes: Routes = [
  {path: "", component:IndexComponent},
  {path: "main", component:MainComponent},
  {path: "**", redirectTo: '/'}
]
@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    AccordionModule,
    SliderModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    TableModule
  ],
  providers: [PointService, UserService, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
