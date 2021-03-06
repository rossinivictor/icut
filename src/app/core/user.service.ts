import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { AuthService, User, Enterprise } from './auth.service';
import { AuthGuard } from './auth.guard';


@Injectable()
export class UserService {

  public usuario: User;

  public email: string;
  public name: string;
  public phone: string;
  public uid: string;
  public address: string;
  public cnpj: number;
  public number: string;
  public street: string;
  public cep: string;


  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
    private authGuard: AuthGuard
  ) { }


  getUser() {
    if (this.authGuard.normalUser) {
      this.authService.user.subscribe(
        (user) => {
          // console.log(user);
          this.uid = user.uid;
          this.email = user.email;
          this.name = user.name;
          this.phone = user.phone;
        }
      );
    }
    if (this.authGuard.enterpriseUser) {
      this.authService.enterprise.subscribe(
        (enterprise) => {
          // console.log(enterprise);
          this.uid = enterprise.uid;
          this.cnpj = enterprise.cnpj;
          this.email = enterprise.email;
          this.name = enterprise.name;
          this.phone = enterprise.phone;
          this.number = enterprise.number;
          this.street = enterprise.street;
          this.cep = enterprise.cep;
        }
      );
    }
  }

  setUser() {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`usuario/${this.uid}`);
    const data: User = {
      uid: this.uid,
      email: this.email,
      name: this.name,
      phone: this.phone
    };
    return userRef.set(data);
  }

  setEnterprise() {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`estabelecimento/${this.uid}`);
    const data: Enterprise = {
      uid: this.uid,
      email: this.email,
      cnpj: this.cnpj,
      name: this.name,
      phone: this.phone,
      cep: this.cep,
      number: this.number,
      street: this.street
    };
    // to do: atualiza o marker;
    return userRef.update(data);
  }

}
