import { ComponentFixture, TestBed } from '@angular/core/testing';

import { URowComponent } from './u-row.component';

describe('URowComponent', () => {
  let component: URowComponent;
  let fixture: ComponentFixture<URowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [URowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(URowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
