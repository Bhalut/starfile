import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { SwapiService } from '../../services/swapi.service';

import { MoviesComponent } from './movies.component';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let mockSwapiService: any;

  beforeEach(async () => {
    mockSwapiService = jasmine.createSpyObj(['getMovies']);
    mockSwapiService.getMovies.and.returnValue(
      Promise.resolve([{ title: 'A New Hope' }])
    );

    await TestBed.configureTestingModule({
      imports: [MoviesComponent, CommonModule],
      providers: [{ provide: SwapiService, useValue: mockSwapiService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load movies on init', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    expect(component.movies.length).toBeGreaterThan(0);
  });
});
