import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { SwapiService } from '../../services/swapi.service';

import { StarshipsComponent } from './starships.component';

describe('StarshipsComponent', () => {
  let component: StarshipsComponent;
  let fixture: ComponentFixture<StarshipsComponent>;
  let mockSwapiService: any;

  beforeEach(async () => {
    mockSwapiService = jasmine.createSpyObj(['getStarships']);
    mockSwapiService.getStarships.and.returnValue(
      Promise.resolve([{ name: 'Millennium Falcon' }])
    );

    await TestBed.configureTestingModule({
      imports: [StarshipsComponent, CommonModule],
      providers: [{ provide: SwapiService, useValue: mockSwapiService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load starships on init', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    expect(component.starships.length).toBeGreaterThan(0);
  });
});
