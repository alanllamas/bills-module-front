import { TestBed } from '@angular/core/testing';

import { SpentsResolverService } from './spents-resolver.service';

describe('SpentsResolverService', () => {
  let service: SpentsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpentsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
