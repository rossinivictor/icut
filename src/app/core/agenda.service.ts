import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AgendaService {

  public uid: any;
  public schedule: any[];

  // date
  public today: string;
  public day: string;
  public month: string;
  public year: string;

  constructor(
    private afs: AngularFirestore
  ) { }

  getAgenda(): Observable<any[]> {
    this.today = this.dataAtualFormatada();
    return this.afs.collection('estabelecimento').doc(`${this.uid}`).collection('agenda').doc(`${this.today}`).collection('horario')
      .valueChanges();
  }

  setSchedule(id, name: string, phone: string, email: string) {
    // tslint:disable-next-line:max-line-length
    const newSchedule: AngularFirestoreDocument<any> = this.afs.collection('estabelecimento').doc(`${this.uid}`).collection('agenda').doc(`${this.today}`).collection(`horario`).doc(id);
    const data = {
        name: name,
        phone: phone,
        email: email,
        marked: true
    };

    return newSchedule.update(data);
  }

  // transforming the date to dd-MM-yyyy
  dataAtualFormatada() {
    const data = new Date();
    const dia = data.getDate();
    if (dia.toString().length === 1) {
      this.day = '0' + dia;
    } else {
      this.day = dia.toString();
    }
    const mes = data.getMonth() + 1;
    if (mes.toString().length === 1) {
      this.month = '0' + mes;
    } else {
      this.month = mes.toString();
    }
    this.year = data.getFullYear().toString();

    const date = this.day + '-' + this.month + '-' + this.year;
    return date;
  }

}
