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
    RouterModule.forRoot(appRoutes)
  ],
  providers: [PointService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
