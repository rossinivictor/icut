import { Component, OnInit, NgZone } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';

import { AngularFirestore } from 'angularfire2/firestore';

import { AuthService } from './../../core/auth.service';
import { MapsService } from './../../core/maps.service';

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

  public map: any;

  constructor(
    private mapService: MapsService,
    private auth: AuthService,
    private _zone: NgZone,
    private afs: AngularFirestore,
    private fb: FormBuilder

  ) {
    this.buildForm();
    const markers =  this.afs.collection('local').valueChanges();

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
      }, (error) => console.log(error),
      () => console.log('Geocoding completo!!')
    );
    this.search = false;

  }

}
