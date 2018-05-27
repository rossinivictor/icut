
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';


import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  public normalUser: boolean;
  public enterpriseUser: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

    this.normalUser = false;
    this.enterpriseUser = false;

    this.authService.user.subscribe(
      (user) => {
        if (user !== null) {
          this.normalUser = true;
          this.enterpriseUser = false;
        }
      }
    );

    this.authService.enterprise.subscribe(
      (enterprise) => {
        if (enterprise !== null) {
          this.enterpriseUser = true;
          this.normalUser = false;
        }
      }
    );
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.normalUser) {
      return this.authService.user
        .take(1)
        .map(user => !!user)
        .do(loggedIn => {
          if (!loggedIn) {
            console.log('denied');
            this.router.navigate(['/dashboard']);
          }
        });
    }
    if (this.enterpriseUser) {
      return this.authService.enterprise
        .take(1)
        .map(user => !!user)
        .do(loggedIn => {
          if (!loggedIn) {
            console.log('denied');
            this.router.navigate(['/dashboard']);
          }
        });
    }
  }

}
