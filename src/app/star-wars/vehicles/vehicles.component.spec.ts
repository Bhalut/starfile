import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { SwapiService } from '../../services/swapi.service';

import { VehiclesComponent } from './vehicles.component';

describe('VehiclesComponent', () => {
  let component: VehiclesComponent;
  let fixture: ComponentFixture<VehiclesComponent>;
  let mockSwapiService: any;

  beforeEach(async () => {
    mockSwapiService = jasmine.createSpyObj(['getVehicles']);
    mockSwapiService.getVehicles.and.returnValue(
      Promise.resolve([{ name: 'Speeder' }])
    );

    await TestBed.configureTestingModule({
      imports: [VehiclesComponent, CommonModule],
      providers: [{ provide: SwapiService, useValue: mockSwapiService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load vehicles on init', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    expect(component.vehicles.length).toBeGreaterThan(0);
  });
});
