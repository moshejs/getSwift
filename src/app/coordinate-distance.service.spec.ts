import { TestBed, inject } from '@angular/core/testing';

import { CoordinateDistanceService } from './coordinate-distance.service';

describe('CoordinateDistanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoordinateDistanceService]
    });
  });

  it('should be created', inject([CoordinateDistanceService], (service: CoordinateDistanceService) => {
    expect(service).toBeTruthy();
  }));
});
