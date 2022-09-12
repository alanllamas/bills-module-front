import { TestBed } from '@angular/core/testing';

import { WarehouseResolver } from './warehouse.resolver';

describe('WarehouseResolver', () => {
  let resolver: WarehouseResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(WarehouseResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
