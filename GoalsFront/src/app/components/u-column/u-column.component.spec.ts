import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UColumnComponent } from './u-column.component';

describe('UColumnComponent', () => {
  let component: UColumnComponent;
  let fixture: ComponentFixture<UColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UColumnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
