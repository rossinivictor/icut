import { Component, OnInit, NgZone } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';

import { AngularFirestore } from 'angularfire2/firestore';

import { AuthService } from './../../core/auth.service';
import { MapsService } from './../../core/maps.service';
import { AgendaService } from './../../core/agenda.service';

declare const google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public searchForm: FormGroup;

  public user: boolean;
  public markers: any[];
  // tslint:disable-next-line:no-inferrable-types
  public search: boolean = true;
  public uid: any;
  public name: string;
  public rating: any;
  public map: any;

  constructor(
    private mapService: MapsService,
    private agendaService: AgendaService,
    private auth: AuthService,
    private _zone: NgZone,
    private afs: AngularFirestore,
    private fb: FormBuilder

  ) {
    this.buildForm();
    const markers = this.afs.collection('estabelecimento').valueChanges();

    markers.subscribe(
      (res) => {
        this.markers = res;
      }
    );
  }

  ngOnInit() {
  }

  authCondition() {
    if (this.auth.enterprise) {
      this.user = true;
    }
    if (this.auth.user) {
      this.user = true;
    }
  }



  buildForm() {
    this.searchForm = this.fb.group({
      'address': ['', [
        Validators.required
      ]]
    });
  }


  searchEnt() {
    const end = `${this.searchForm.value.address + ', Rio de Janeiro, RJ'}`;
    this.mapService.getGeocoding(end).subscribe(
      (res) => {
        this._zone.run(() => {
          this.mapService.lat = res.lat();
          this.mapService.lng = res.lng();
        });
      }, (error) => console.log(error)
      // () => console.log('Geocoding completo!!')
    );
    this.search = false;
  }


  mapReady(event: any) {
    this.map = event;
    const back = document.createElement('button');
    back.className = 'btn';
    back.style.color = 'rgb(25,25,25)';
    back.style.fontFamily = 'Roboto,Arial,sans-serif';
    back.style.fontSize = '16px';
    back.style.lineHeight = '38px';
    back.style.paddingLeft = '5px';
    back.style.paddingRight = '5px';
    back.innerHTML = 'Voltar';
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(back);
    back.addEventListener('click', () => {
      this.search = true;
    });
  }

  markerClick(uid) {
    this.agendaService.uid = uid;
  }

}
