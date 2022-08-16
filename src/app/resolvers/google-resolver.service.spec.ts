import { TestBed } from '@angular/core/testing';

import { GoogleResolverService } from './google-resolver.service';

describe('GoogleResolverService', () => {
  let service: GoogleResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
