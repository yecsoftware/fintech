import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UTextboxComponent } from './u-textbox.component';

describe('UTextboxComponent', () => {
  let component: UTextboxComponent;
  let fixture: ComponentFixture<UTextboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UTextboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
