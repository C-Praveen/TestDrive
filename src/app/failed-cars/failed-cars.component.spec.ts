import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedCarsComponent } from './failed-cars.component';

describe('FailedCarsComponent', () => {
  let component: FailedCarsComponent;
  let fixture: ComponentFixture<FailedCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FailedCarsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FailedCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
