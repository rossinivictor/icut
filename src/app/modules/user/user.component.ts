import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';

import { UserService } from '../../core/user.service';
import { AuthService, User } from '../../core/auth.service';
import { AuthGuard } from '../../core/auth.guard';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public userForm: FormGroup;
  public enterpriseForm: FormGroup;

  public usuario: User;

  public email: string;
  public name: string;
  public phone: string;
  public uid: string;
  public address: string;

  constructor(
    private userService: UserService,
    private authGuard: AuthGuard,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.userService.getUser();
  }

  ngOnInit() {
    this.bildFormUser();
    this.buildFormEnterprise();
  }

  bildFormUser() {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email,
        Validators.pattern('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'),
      ]
      ],
      'name': ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(35)
      ]
      ],
      'phone': ['', [
        Validators.required,
        Validators.pattern('[0-9]*'),
        Validators.minLength(10),
        Validators.maxLength(10)
      ]
      ],
      'number': ['', [
        Validators.required
      ]
      ],
      'street': ['', [
        Validators.required
      ]
      ]
    });
  }

  buildFormEnterprise() {
    this.enterpriseForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email,
        Validators.pattern('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'),
      ]
      ],
      'cnpj': ['', [
        Validators.pattern('[0-9]*'),
        Validators.minLength(11),
        Validators.maxLength(11)
      ]
      ],
      'name': ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(35)
      ]
      ],
      'phone': ['', [
        Validators.required,
        Validators.pattern('[0-9]*'),
        Validators.minLength(10),
        Validators.maxLength(10)
      ]
      ],
      'number': ['', [
        Validators.pattern('[0-9]*'),
        Validators.required
      ]
      ],
      'street': ['', [
        Validators.required
      ]
      ],
      'cep': ['', [
        Validators.required,
        Validators.pattern('[0-9]*'),
        Validators.minLength(8),
        Validators.maxLength(8)
      ]
      ]
    });

  }

  setUser() {
    if (this.userForm.value.name !== '') {
      this.userService.name = this.userForm.value.name;
    }
    if (this.userForm.value.email !== '') {
      this.userService.email = this.userForm.value.email;
    }
    if (this.userForm.value.phone !== '') {
      this.userService.phone = this.userForm.value.phone;
    }
    if (this.userForm.value.address !== '') {
      this.userService.address = this.userForm.value.address;
    }

    this.userService.setUser();
  }



  // getUser() {
  //   this.authService.user.subscribe(
  //     (user) => {
  //       this.uid = user.uid;
  //       this.usuario.email = user.email;
  //       this.name = user.name;
  //       this.phone = user.phone;
  //     }
  //   );
  // }

}
