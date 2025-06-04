import { ComponentFixture, TestBed } from '@angular/core/testing';

import { USelectComponent } from './u-select.component';

describe('USelectComponent', () => {
  let component: USelectComponent;
  let fixture: ComponentFixture<USelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [USelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(USelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
