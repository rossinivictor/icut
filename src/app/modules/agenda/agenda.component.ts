import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

import { AgendaService } from '../../core/agenda.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  public schedule: any[];

  constructor(
    private afs: AngularFirestore,
    private agendaService: AgendaService

  ) { }

  ngOnInit() {
    this.getAgenda();
  }


  getAgenda() {

  }

}
