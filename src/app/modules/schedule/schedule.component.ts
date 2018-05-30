import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from '@firebase/util';

import { AuthService } from '../../core/auth.service';



@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  public estabelecimento: Observable<any>;
  public uid: string;
  public schedule: any[];

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
  ) {
    this.authService.enterprise.subscribe(
      (ent) => {
        // console.log(ent);
        this.uid = ent.uid;
        const query = `${'estabelecimento/' + ent.uid + '/agenda'}`;
        const estabelecimento = this.afs.collection('estabelecimento').doc(ent.uid).collection('agenda').valueChanges();
        // const estabelecimento[] = this.afs.doc<any>(query).valueChanges();
        estabelecimento.subscribe(
          res => console.log(res)
        );
        // estabelecimento.subscribe(
        //   res => {
        //     console.log(res);
        //   }
        // );
      }
    );

  }

  ngOnInit() {


  }

}
