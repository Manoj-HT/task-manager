import { TestBed } from '@angular/core/testing';

import { NetowrkDetectionService } from './netowrk-detection.service';

describe('NetowrkDetectionService', () => {
  let service: NetowrkDetectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetowrkDetectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
