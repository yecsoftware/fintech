import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UPaginationComponent } from './u-pagination.component';

describe('UPaginationComponent', () => {
  let component: UPaginationComponent;
  let fixture: ComponentFixture<UPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UPaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
