import { TestBed } from '@angular/core/testing';

import { HearingaidService } from './hearingaid.service';

describe('HearingaidService', () => {
  let service: HearingaidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HearingaidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
