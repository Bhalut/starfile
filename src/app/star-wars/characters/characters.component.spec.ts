import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { SwapiService } from '../../services/swapi.service';

import { CharactersComponent } from './characters.component';

describe('CharactersComponent', () => {
  let component: CharactersComponent;
  let fixture: ComponentFixture<CharactersComponent>;
  let mockSwapiService: any;

  beforeEach(async () => {
    mockSwapiService = jasmine.createSpyObj(['getCharacters']);
    mockSwapiService.getCharacters.and.returnValue(
      Promise.resolve([{ name: 'Luke Skywalker' }])
    );

    await TestBed.configureTestingModule({
      imports: [CharactersComponent, CommonModule],
      providers: [{ provide: SwapiService, useValue: mockSwapiService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load characters on init', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    expect(component.characters.length).toBeGreaterThan(0);
  });
});
