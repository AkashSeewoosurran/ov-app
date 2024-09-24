import { TestBed } from '@angular/core/testing';

import { PubgmDataService } from './pubgm-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('PubgmDataService', () => {
  let service: PubgmDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
    });
    service = TestBed.inject(PubgmDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
