import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ToolbarComponent } from './modules/shared/toolbar/toolbar.component';
import { FooterComponent } from './modules/shared/footer/footer.component';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { CoreModule } from '../app/core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './core/auth.guard';
import { UserComponent } from './modules/user/user.component';
import { UserService } from './core/user.service';
import { MapsService } from './core/maps.service';
import { ScheduleComponent } from './modules/schedule/schedule.component';
import { AgendaComponent } from './modules/agenda/agenda.component';
import { AgendaService } from './core/agenda.service';
import { CommonModule } from '@angular/common';


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
    UserComponent,
    ScheduleComponent,
    AgendaComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    CoreModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAblX1gaIz0ISIt83BW4kndi2iO7o4Xxj8'
    }),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    AuthGuard,
    MapsService,
    UserService,
    AgendaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
