import { TestBed } from '@angular/core/testing';

import { SpentsService } from './spents.service';

describe('SpentsService', () => {
  let service: SpentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
