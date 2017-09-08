import { Package } from './package.model';
import { Location } from './location.model';


export class Drone {
  droneId: number;
  assigned: boolean;
  location: Location;
  packages: Package[];
  maxSpeed: number; // km/h
  }
