import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';

import { AuthService, User } from '../../core/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public userForm: FormGroup;
  public enterpriseForm: FormGroup;
  public user: User;

  // tslint:disable-next-line:no-inferrable-types
  public regularUser: boolean = false;
  // tslint:disable-next-line:no-inferrable-types
  public enterpriseUser: boolean = false;
  // tslint:disable-next-line:no-inferrable-types
  public noUser: boolean = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.bildFormUser();
    this.buildFormEnterprise();
  }

  bildFormUser() {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]
      ],
      'name': ['', [
        Validators.required
      ]
      ],
      'phone': ['', [
        Validators.required
      ]
      ]
    });
  }

  buildFormEnterprise() {
    this.enterpriseForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]
      ],
      'name': ['', [
        Validators.required
      ]
      ],
      'phone': ['', [
        Validators.required
      ]
      ],
      'nameReal': ['', [
        Validators.required

      ]
      ],
      'address': ['', [
        Validators.required
      ]
      ],
      'cnpj': ['', [
        Validators.required
      ]
      ]
    });

  }

  regularChoice() {
    this.regularUser = true;
    this.enterpriseUser = false;
    this.noUser = false;
  }

  enterpriseChoice() {
    this.enterpriseUser = true;
    this.regularUser = false;
    this.noUser = false;
  }

  backChoice() {
    this.enterpriseUser = false;
    this.regularUser = false;
    this.noUser = true;
  }

  registerUser() {
    this.authService.emailSignUp(this.userForm.value, this.userForm.value.password).catch(
      (err) => {
        console.log(err.code);
        console.log(err.message);
      }
    );
  }

  registerEnterprise() {
    this.authService.emailSignUp(this.enterpriseForm.value, this.enterpriseForm.value.password)
      .catch(
        (err) => {
          console.log(err.code);
          console.log(err.message);
        }
      );
  }

  // emailPassword(email: string, password: string) {
  //   return this.authService.emailSignUp(email, password).catch(
  //     (err) => {
  //       console.log(err.code);
  //       console.log(err.message);
  //     }
  //   );
  // }

}