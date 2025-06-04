import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UFormSectionComponent } from './u-form-section.component';

describe('UFormSectionComponent', () => {
  let component: UFormSectionComponent;
  let fixture: ComponentFixture<UFormSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UFormSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UFormSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
