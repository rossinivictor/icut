import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  public prices: any;
  // tslint:disable-next-line:no-inferrable-types
  public popupVisible: boolean = false;
  public id: string;

  constructor(
    private agendaService: AgendaService,
    private userService: UserService,
    private route: Router,
    private afs: AngularFirestore

  ) { }

  ngOnInit() {
    this.getPrice();
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

  saveId(id) {
    this.id = id.toString();
  }

  setSchedule() {
    const name = this.userService.name;
    const phone = this.userService.phone;
    const email = this.userService.email;
    this.agendaService.setSchedule(this.id, name, phone, email)
    .then(
      (res) => {
        console.log(res);
        this.route.navigate(['/dashboard']);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  getPrice() {

    this.afs.collection('estabelecimento').doc(`${this.agendaService.uid}`).collection('precos').valueChanges()
      .subscribe((prices) => {
        console.log(prices[0]);
        this.prices = prices[0];
        console.log(this.prices.barba);
      });
  }

}
