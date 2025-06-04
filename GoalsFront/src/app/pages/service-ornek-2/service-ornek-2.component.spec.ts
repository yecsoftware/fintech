import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOrnek2Component } from './service-ornek-2.component';

describe('ServiceOrnek2Component', () => {
  let component: ServiceOrnek2Component;
  let fixture: ComponentFixture<ServiceOrnek2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceOrnek2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceOrnek2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
