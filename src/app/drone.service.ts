import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { Drone } from './models/drone.model';
import { Package } from './models/package.model';

@Injectable()
export class DroneService {

  constructor(private apiService: ApiService) {
  }

  getDrones(): Observable<Drone[]> {
    return this.apiService.get('drones').map(drones => drones);
  }

  getPackages(): Observable<Package[]> { // TODO: (refactor): Package.service.ts
    return this.apiService.get('packages').map(packages => packages);
  }


}
