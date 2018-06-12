import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { AuthService } from '../../core/auth.service';
import { AgendaService } from '../../core/agenda.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {


  public name: string;
  public todaySchedule: AngularFirestoreCollection<any>;
  public hours: any[];
  public scheduleForm: FormGroup;
  public uid: string;
  public schedule = {
    agenda: [
      {
        nome: '00:00 a 01:00',
        selected: false,
        id: 1
      }, {
        nome: '01:00 a 02:00',
        selected: false,
        id: 2
      }, {
        nome: '02:00 a 03:00',
        selected: false,

        id: 3
      }, {
        nome: '03:00 a 04:00',
        selected: false,

        id: 4
      }, {
        nome: '04:00 a 05:00',
        selected: false,
        id: 5
      }, {
        nome: '05:00 a 06:00',
        selected: false,
        id: 6
      }, {
        nome: '06:00 a 07:00',
        selected: false,
        id: 7
      }, {
        nome: '07:00 a 08:00',
        selected: false,
        id: 8
      }, {
        nome: '08:00 a 09:00',
        selected: false,
        id: 9
      }, {
        nome: '09:00 a 10:00',
        selected: false,
        id: 10
      }, {
        nome: '10:00 a 11:00',
        selected: false,
        id: 11
      }, {
        nome: '11:00 a 12:00',
        selected: false,
        id: 12
      }, {
        nome: '12:00 a 13:00',
        selected: false,
        id: 13
      }, {
        nome: '13:00 a 14:00',
        selected: false,
        id: 14
      }, {
        nome: '14:00 a 15:00',
        selected: false,
        id: 15
      }, {
        nome: '15:00 a 16:00',
        selected: false,
        id: 16
      }, {
        nome: '16:00 a 17:00',
        selected: false,
        id: 17
      }, {
        nome: '17:00 a 18:00',
        selected: false,
        id: 18
      }, {
        nome: '18:00 a 19:00',
        selected: false,
        id: 19
      }, {
        nome: '19:00 a 20:00',
        selected: false,
        id: 20
      }, {
        nome: '20:00 a 21:00',
        selected: false,
        id: 21
      }, {
        nome: '21:00 a 22:00',
        selected: false,
        id: 22
      }, {
        nome: '22:00 a 23:00',
        selected: false,
        id: 23
      }, {
        nome: '23:00 a 00:00',
        selected: false,
        id: 24
      }]
  };

  // date
  public today: string;
  public day: string;
  public month: string;
  public year: string;

  constructor(
    private afs: AngularFirestore,
    private fb: FormBuilder,
    private authService: AuthService,
    private agendaService: AgendaService
  ) {
    this.formBuilder();
  }

  ngOnInit() {
        // get the shedule from firebase
    this.authService.enterprise.subscribe(
      (ent) => {
        this.uid = ent.uid;
        this.today = this.agendaService.dataAtualFormatada();
        this.todaySchedule = this.afs.collection('estabelecimento').doc(ent.uid).collection('agenda').doc(this.today).collection('horario');
        const schedule = this.todaySchedule.valueChanges();
        schedule.subscribe(
          (agenda) => {
            if (agenda !== null && agenda.length) {
              this.hours = agenda;
              this.hours.forEach(
                (res) => { this.schedule.agenda = this.schedule.agenda.filter((hour) => res.id !== hour.id); }
              );
              this.formBuilder();
            }
          }
        );
      }
    );
  }

  scheduleSelect(value) {
    const formValue = Object.assign({}, value, {
      agenda: value.agenda.map((selected, i) => {
          return {
            id: this.schedule.agenda[i].id,
            nome: this.schedule.agenda[i].nome,
            selected: selected
          };
      })
    });
    formValue.agenda.forEach(
      (data) => {
        if (data.selected === true) {
          const horario = {
            id: data.id,
            nome: data.nome
          };
          return this.todaySchedule.add(horario);
        }
      }
    );
  }


  get agenda(): FormArray {
    return this.scheduleForm.get('agenda') as FormArray;
  }

  buildAgenda() {
    const data = this.schedule.agenda.map(
      (res) => {
        return this.fb.control(res.selected);
      });
    return this.fb.array(data);
  }

  formBuilder() {
    this.scheduleForm = this.fb.group({
      agenda: this.buildAgenda()
    });
  }



}
