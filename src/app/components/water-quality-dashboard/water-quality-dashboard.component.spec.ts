import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterQualityDashboardComponent } from './water-quality-dashboard.component';

describe('WaterQualityDashboardComponent', () => {
  let component: WaterQualityDashboardComponent;
  let fixture: ComponentFixture<WaterQualityDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaterQualityDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaterQualityDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
