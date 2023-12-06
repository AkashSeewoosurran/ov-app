import { TestBed } from '@angular/core/testing';

import { PubgmDataService } from './pubgm-data.service';

describe('PubgmDataService', () => {
  let service: PubgmDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PubgmDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
