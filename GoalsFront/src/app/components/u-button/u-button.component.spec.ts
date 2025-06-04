import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UButtonComponent } from './u-button.component';

describe('UButtonComponent', () => {
  let component: UButtonComponent;
  let fixture: ComponentFixture<UButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
