import { TestBed } from '@angular/core/testing';

import { BalanceResolverService } from './balance-resolver.service';

describe('BalanceResolverService', () => {
  let service: BalanceResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BalanceResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
