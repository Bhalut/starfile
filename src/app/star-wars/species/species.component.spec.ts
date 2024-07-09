import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { SwapiService } from '../../services/swapi.service';

import { SpeciesComponent } from './species.component';

describe('SpeciesComponent', () => {
  let component: SpeciesComponent;
  let fixture: ComponentFixture<SpeciesComponent>;
  let mockSwapiService: any;

  beforeEach(async () => {
    mockSwapiService = jasmine.createSpyObj(['getSpecies']);
    mockSwapiService.getSpecies.and.returnValue(
      Promise.resolve([{ name: 'Human' }])
    );

    await TestBed.configureTestingModule({
      imports: [SpeciesComponent, CommonModule],
      providers: [{ provide: SwapiService, useValue: mockSwapiService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load species on init', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    expect(component.species.length).toBeGreaterThan(0);
  });
});
