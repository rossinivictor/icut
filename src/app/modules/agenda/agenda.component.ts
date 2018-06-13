import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

import { AgendaService } from '../../core/agenda.service';
import { UserService } from '../../core/user.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  public schedule: any[];

  constructor(
    private afs: AngularFirestore,
    private agendaService: AgendaService,
    private userService: UserService

  ) { }

  ngOnInit() {
    this.getAgenda();
    this.userService.getUser();
  }


  getAgenda() {
    this.agendaService.getAgenda().subscribe(
      (schedule) => {
        this.schedule = schedule;
      }
    );
  }

  // Mudar para 'Horario' ao invés de ser 'nome', fazer a tela do dashboard fazer com que seja cadastrado o uid ou colocar o id no document
  setSchedule(id) {

    const name = this.userService.name;
    const phone = this.userService.phone;
    const email = this.userService.email;

    console.log(name, phone, email);

    this.agendaService.setSchedule(id, name, phone, email)
    .then(
      (res) => {
        console.log(res);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

}
