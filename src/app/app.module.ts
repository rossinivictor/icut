import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {HttpClientModule, HttpClient} from '@angular/common/http';

import { MaterializeModule } from 'angular2-materialize';

import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ToolbarComponent } from './modules/shared/toolbar/toolbar.component';
import { FooterComponent } from './modules/shared/footer/footer.component';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { CoreModule } from '../app/core/core.module';


export const firebaseConfig = {
  apiKey: 'AIzaSyAblX1gaIz0ISIt83BW4kndi2iO7o4Xxj8',
  authDomain: 'teste-d89e4.firebaseapp.com',
  databaseURL: 'https://teste-d89e4.firebaseio.com',
  projectId: 'teste-d89e4',
  storageBucket: 'teste-d89e4.appspot.com',
  messagingSenderId: '716284863422'
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ToolbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot([
        { path: 'dashboard', component: DashboardComponent},
        { path: 'login', component: LoginComponent},
        { path: 'register', component: RegisterComponent},
        {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
        {path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
