import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaterializeModule } from 'angular2-materialize';


import { AppComponent } from './app.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ToolbarComponent } from './modules/shared/toolbar/toolbar.component';
import { FooterComponent } from './modules/shared/footer/footer.component';
import { LoginComponent } from './modules/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ToolbarComponent,
    FooterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
        { path: 'dashboard', component: DashboardComponent},
        { path: 'login', component: LoginComponent},
        {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
        {path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
