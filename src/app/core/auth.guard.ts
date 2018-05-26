
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';


import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authService.user
    .take(1)
    .map(user => !! user)
    .do (loggedIn => {
      if (!loggedIn) {
        console.log('denied');
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
