import { TestBed } from '@angular/core/testing';

import { SpentResolverService } from './spent-resolver.service';

describe('SpentResolverService', () => {
  let service: SpentResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpentResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
