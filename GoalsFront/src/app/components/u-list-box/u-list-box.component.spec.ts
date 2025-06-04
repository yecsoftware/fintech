import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UListBoxComponent } from './u-list-box.component';

describe('UListBoxComponent', () => {
  let component: UListBoxComponent;
  let fixture: ComponentFixture<UListBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UListBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UListBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
