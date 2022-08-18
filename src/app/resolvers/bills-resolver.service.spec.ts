import { TestBed } from '@angular/core/testing';
import { BillsResolverService } from './bills-resolver.service';

describe('BillsResolverService', () => {
  let service: BillsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
