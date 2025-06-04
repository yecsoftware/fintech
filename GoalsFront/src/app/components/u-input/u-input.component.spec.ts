import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UInputComponent } from './u-input.component';

describe('UInputComponent', () => {
  let component: UInputComponent;
  let fixture: ComponentFixture<UInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
