import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UCardComponent } from './u-card.component';

describe('UCardComponent', () => {
  let component: UCardComponent;
  let fixture: ComponentFixture<UCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
