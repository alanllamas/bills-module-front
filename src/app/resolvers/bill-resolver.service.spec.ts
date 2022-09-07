import { TestBed } from '@angular/core/testing';
import { BillResolverService } from './bill-resolver.service';

describe('BillResolverService', () => {
  let service: BillResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
