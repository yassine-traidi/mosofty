import { TestBed } from '@angular/core/testing';

import { CandidateResponseService } from './candidate-response.service';

describe('CandidateResponseService', () => {
  let service: CandidateResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidateResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
