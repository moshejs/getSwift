import { Injectable } from '@angular/core';
import { Location} from './models/location.model';

@Injectable()
export class CoordinateDistanceService {

  constructor() { }

  distance(from: Location, to: Location): number {
    const radlat1 = Math.PI * from.latitude / 180;
    const radlat2 = Math.PI * to.latitude / 180;
    const theta = from.longitude - to.longitude;
    const radtheta = Math.PI * theta / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    return dist * 1.609344;
  }

  // distance(from: Location, to: Location) {
  //
  //   return Math.sqrt( Math.pow((from.latitude - to.latitude), 2) + Math.pow((from.longitude-to.longitude), 2) ) * 111;
  //
  //
  // }

}

