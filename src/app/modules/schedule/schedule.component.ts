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
        horario: '00:00 a 01:00',
        selected: false,
        id: 1
      }, {
        horario: '01:00 a 02:00',
        selected: false,
        id: 2
      }, {
        horario: '02:00 a 03:00',
        selected: false,

        id: 3
      }, {
        horario: '03:00 a 04:00',
        selected: false,

        id: 4
      }, {
        horario: '04:00 a 05:00',
        selected: false,
        id: 5
      }, {
        horario: '05:00 a 06:00',
        selected: false,
        id: 6
      }, {
        horario: '06:00 a 07:00',
        selected: false,
        id: 7
      }, {
        horario: '07:00 a 08:00',
        selected: false,
        id: 8
      }, {
        horario: '08:00 a 09:00',
        selected: false,
        id: 9
      }, {
        horario: '09:00 a 10:00',
        selected: false,
        id: 10
      }, {
        horario: '10:00 a 11:00',
        selected: false,
        id: 11
      }, {
        horario: '11:00 a 12:00',
        selected: false,
        id: 12
      }, {
        horario: '12:00 a 13:00',
        selected: false,
        id: 13
      }, {
        horario: '13:00 a 14:00',
        selected: false,
        id: 14
      }, {
        horario: '14:00 a 15:00',
        selected: false,
        id: 15
      }, {
        horario: '15:00 a 16:00',
        selected: false,
        id: 16
      }, {
        horario: '16:00 a 17:00',
        selected: false,
        id: 17
      }, {
        horario: '17:00 a 18:00',
        selected: false,
        id: 18
      }, {
        horario: '18:00 a 19:00',
        selected: false,
        id: 19
      }, {
        horario: '19:00 a 20:00',
        selected: false,
        id: 20
      }, {
        horario: '20:00 a 21:00',
        selected: false,
        id: 21
      }, {
        horario: '21:00 a 22:00',
        selected: false,
        id: 22
      }, {
        horario: '22:00 a 23:00',
        selected: false,
        id: 23
      }, {
        horario: '23:00 a 00:00',
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
        if (ent.uid) {
          this.uid = ent.uid;
        }
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
            horario: this.schedule.agenda[i].horario,
            selected: selected
          };
      })
    });
    formValue.agenda.forEach(
      (data) => {
        if (data.selected === true) {
          const horario = {
            id: data.id,
            horario: data.horario,
            marked: false
          };
          return this.todaySchedule.doc(data.id.toString()).set(horario);
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
