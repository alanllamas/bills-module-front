import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionLogDialogComponent } from './production-log-dialog.component';

describe('ProductionLogDialogComponent', () => {
  let component: ProductionLogDialogComponent;
  let fixture: ComponentFixture<ProductionLogDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionLogDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionLogDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
