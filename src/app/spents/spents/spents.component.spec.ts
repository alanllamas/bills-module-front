import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpentsComponent } from './spents.component';

describe('SpentsComponent', () => {
  let component: SpentsComponent;
  let fixture: ComponentFixture<SpentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
