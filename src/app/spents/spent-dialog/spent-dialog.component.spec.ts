import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpentDialogComponent } from './spent-dialog.component';

describe('SpentDialogComponent', () => {
  let component: SpentDialogComponent;
  let fixture: ComponentFixture<SpentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpentDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
