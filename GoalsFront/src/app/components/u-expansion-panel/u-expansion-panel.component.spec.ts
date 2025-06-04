import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UExpansionPanelComponent } from './u-expansion-panel.component';

describe('UExpansionPanelComponent', () => {
  let component: UExpansionPanelComponent;
  let fixture: ComponentFixture<UExpansionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UExpansionPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
