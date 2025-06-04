import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UDatepickerComponent } from './u-datepicker.component';

describe('UDatepickerComponent', () => {
  let component: UDatepickerComponent;
  let fixture: ComponentFixture<UDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UDatepickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
