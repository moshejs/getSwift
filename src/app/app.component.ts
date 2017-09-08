import { Component, OnInit } from '@angular/core';
import { DroneService } from './drone.service';
import { Observable } from 'rxjs/Observable';
import { Drone } from './models/drone.model';
import { Package } from './models/package.model';
import { CoordinateDistanceService } from './coordinate-distance.service';

import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  drones: Observable<Drone[]>;
  packages: Observable<Package[]>;
  results = {};
  depo = {
    'latitude': -37.8165984,
    'longitude': 144.9624498
  };
  availableDrones: Drone[] = [];
  busyDrones: Drone[] = [];

  constructor(private droneService: DroneService,
              private coordinateDistanceService: CoordinateDistanceService) {
    this.drones = droneService.getDrones();
    this.packages = droneService.getPackages();
  }


  getDroneAvailability(drone) {
    let totalDistanceKm = 0;
    if (drone.packages.length !== 0) {
      totalDistanceKm += (this.coordinateDistanceService.distance(drone.location, drone.packages[0].destination))
        + (this.coordinateDistanceService.distance(drone.packages[0].destination, this.depo));
    } else {
      totalDistanceKm += this.coordinateDistanceService.distance(drone.location, this.depo);
    }
    const unixNow = Math.round((new Date()).getTime() / 1000);
    const totalHrs = (totalDistanceKm / 50);
    const unixOffset = totalHrs * 60 * 60;
    const earliestAvailable = unixNow + unixOffset;
    return {droneId: drone.droneId, earliestAvailable: Math.round(earliestAvailable), assigned: false};

  }

  sortDronesbyEagerness(droneA: any, droneB: any) {
    if (droneA.earliestAvailable < droneB.earliestAvailable) {
      return -1;
    }
    if (droneA.earliestAvailable > droneB.earliestAvailable) {
      return 1;
    }
    return 0;

  }

  sortPackagesByShortestDeadline(packageA: Package, packageB: Package) {
    if (packageA.deadline < packageB.deadline) {
      return -1;
    }
    if (packageA.deadline > packageB.deadline) {
      return 1;
    }
    return 0;

  }

  formatUnassignedPackages(packages) {
    return packages.filter(myPackage => myPackage.assigned !== true).map(x => x.packageId);
  }

  dispatch(drones: any, packages: Package[]): any {
    let assigned = [];
    packages.forEach(deliveryPackage => {
      drones.forEach(drone => {
        if (!drone.assigned && !deliveryPackage.assigned) {
          const totalDistanceKm = this.coordinateDistanceService.distance(this.depo, deliveryPackage.destination);
          const totalHours = totalDistanceKm / 50;
          const deliveryTimeForNewPackage = totalHours * 60 * 60;
          const deliveryTime = drone.earliestAvailable + deliveryTimeForNewPackage;

          const difference = ( ( (deliveryTime - deliveryPackage.deadline) / 1000 ) / 60);
          if ( deliveryTime <= deliveryPackage.deadline) {
            assigned.push({droneId: drone.droneId, packageId: deliveryPackage.packageId});
            drone.assigned = true;
            deliveryPackage.assigned = true;
          }
        }
      });
    });

    return {assigned: assigned,
      unassignedPackageIds: this.formatUnassignedPackages(packages)};


  }

  ngOnInit() {
    this.drones.subscribe(res => {
      this.availableDrones = res.filter(drone => drone.packages.length === 0);
      this.busyDrones = res.filter(drone => drone.packages.length !== 0);
    });

    Observable.forkJoin([this.drones, this.packages]).subscribe(data => {
      const unassignedDrones = data[0].map(drone => this.getDroneAvailability(drone)).sort(this.sortDronesbyEagerness);
      const unassignedPackages = data[1].sort(this.sortPackagesByShortestDeadline);

      this.results = this.dispatch(unassignedDrones, unassignedPackages);

      console.log(this.results);
    });
  }
}

