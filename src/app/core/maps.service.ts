import { Injectable, NgZone } from '@angular/core';

import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { Observable } from 'rxjs/Observable';

import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

declare var google: any;

@Injectable()
export class MapsService {

  public lat: number;
  public lng: number;
  public markers: Observable<any>;


  constructor(
    private __loader: MapsAPILoader,
    private _zone: NgZone,
    private afs: AngularFirestore
  ) { }


  getAdress(address: string) {
  this.getGeocoding(`${address + ' , Rio de Janeiro, RJ'}`).subscribe(
      (result) => {
        this._zone.run(() => {
          this.lat = result.lat();
          this.lng = result.lng();
        });
      }, (error) => console.log(error),
      () => console.log('Geocoding completo!!')
    );
  }

  getGeocoding(address: string) {
    return Observable.create(observer => {
      try {
        this.__loader.load().then(() => {
          // tslint:disable-next-line:prefer-const
          let geocoder = new google.maps.Geocoder();
          geocoder.geocode({ address }, (results, status) => {

            if (status === google.maps.GeocoderStatus.OK) {
              const place = results[0].geometry.location;
              observer.next(place);
              observer.complete();
            } else {
              console.error('Error - ', results, ' & Status - ', status);
              if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
                observer.error('Address not found!');
              } else {
                observer.error(status);
              }
              observer.complete();
            }
          });
        });
      } catch (error) {
        observer.error('error getGeocoding' + error);
        observer.complete();
      }
    });
  }

  updateMarkers(user) {
    const markersRef: AngularFirestoreDocument<any> = this.afs.doc(`estabelecimento/${user.uid}`);
    const markers = {
      lat: this.lat,
      lng: this.lng,
      uid: user.uid
    };
    return markersRef.update(markers);
  }

}
