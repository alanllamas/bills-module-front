import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionInputDialogComponent } from './production-input-dialog.component';

describe('ProductionInputDialogComponent', () => {
  let component: ProductionInputDialogComponent;
  let fixture: ComponentFixture<ProductionInputDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionInputDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionInputDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
