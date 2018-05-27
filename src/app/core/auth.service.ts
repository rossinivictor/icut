import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

export interface User {
  uid: string;
  email?: string;
  name?: string;
  phone?: string;
  displayName?: string;
  address?: string;
}

export interface Enterprise {
  uid: string;
  email: string;
  cnpj?: number;
  name?: string;
  phone?: string;
  nameReal?: string;
  address?: string;
}


@Injectable()
export class AuthService {

  user: Observable<User>;
  enterprise: Observable<Enterprise>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {

    afs.firestore.settings({ timestampsInSnapshots: true });
    // pegando a autenticação do usuário;
    this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`usuario/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      });
      this.enterprise = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`estabelecimento/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      });
  }

  // googleLogin() {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   return this.oAuthLogin(provider);
  // }

  // private oAuthLogin(provider) {
  //   return this.afAuth.auth.signInWithPopup(provider)
  //     .then((credential) => {
  //       this.updateUser(credential.user);
  //     });
  // }


  private updateUser(user) {
    // instancia no firestore assim que o usuario logar

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`usuario/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
    };

    return userRef.set(data, { merge: true });

  }

   updateUserData(user, credential) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`usuario/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      name: credential.name,
      phone: credential.phone,
      address: ''
    };
    return userRef.set(data);
  }

  private updateEnterpiseData(user, credential) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`estabelecimento/${user.uid}`);
    const data: Enterprise = {
      uid: user.uid,
      email: user.email,
      cnpj: credential.cnpj,
      name: credential.name,
      nameReal: credential.nameReal,
      phone: credential.phone,
      address: credential.address
    };
    return userRef.set(data);
  }

  emailSignUp(credential, password: string) {

    return this.afAuth.auth.createUserWithEmailAndPassword(credential.email, password)
      .then((user) => {
        if (credential.cnpj) {
          return this.updateEnterpiseData(user, credential);
        } else {
          return this.updateUserData(user, credential);
        }
      }).catch(
        (error) => {
          this.handleError(error);
        }
      );
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        // return this.updateUser(user);
      }).catch(
        (error) => {
          this.handleError(error);
        });
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  private handleError(error: Error) {
    console.log(error);
  }

}
