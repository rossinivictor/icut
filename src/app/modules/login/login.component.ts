import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';

import {AuthService} from '../../core/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 public userForm: FormGroup;
 public passwordReset: FormGroup;

 // tslint:disable-next-line:no-inferrable-types
 public reset: boolean = false;


  constructor(
    private auth: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildUserForm();
    this.buildEmailForm();
  }

  login() {
    this.auth.emailLogin(this.userForm.value['email'], this.userForm.value['password']);
  }

  buildUserForm() {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email,
      ]],
      'password': ['', [
        Validators.pattern ('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(4),
        Validators.maxLength(20)
      ]]
    });
  }

  buildEmailForm() {
    this.passwordReset = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email,
      ]]
    });
  }
tradeForm() {
this.reset ? this.reset = false : this.reset = true;
}

resetPassword() {
  this.auth.resetPassword(this.passwordReset.value.email);
}

}
