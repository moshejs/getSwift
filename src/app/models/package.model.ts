import { Location } from './location.model';

export class Package {
  destination: Location;
  packageId: number;
  deadline: number;
  assigned: boolean;
}
