import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOrnek1Component } from './service-ornek-1.component';

describe('ServiceOrnek1Component', () => {
  let component: ServiceOrnek1Component;
  let fixture: ComponentFixture<ServiceOrnek1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceOrnek1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceOrnek1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
