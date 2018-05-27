import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../app/core/auth.guard';
import { DashboardComponent } from '../app/modules/dashboard/dashboard.component';
import { LoginComponent } from '../app/modules/login/login.component';
import { RegisterComponent } from '../app/modules/register/register.component';
import { UserComponent } from '../app/modules/user/user.component';


const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'profile', component: UserComponent, canActivate: [AuthGuard] },
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
  })
  export class AppRoutingModule {}
