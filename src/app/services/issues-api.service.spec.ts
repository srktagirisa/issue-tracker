import { TestBed } from '@angular/core/testing';

import { IssuesApiService } from './issues-api.service';

describe('IssuesApiService', () => {
  let service: IssuesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssuesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
