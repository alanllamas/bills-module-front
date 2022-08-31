import { TestBed } from '@angular/core/testing';

import { SheetParserService } from './sheet-parser.service';

describe('SheetParserService', () => {
  let service: SheetParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SheetParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
