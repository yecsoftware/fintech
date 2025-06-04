import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UCheckboxComponent } from './u-checkbox.component';

describe('UCheckboxComponent', () => {
  let component: UCheckboxComponent;
  let fixture: ComponentFixture<UCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UCheckboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
