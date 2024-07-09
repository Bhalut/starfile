import { TestBed } from '@angular/core/testing';
import { SwapiService } from './swapi.service';
import axios from 'axios';

describe('SwapiService', () => {
  let service: SwapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch movies', async () => {
    const mockMovies = { data: { results: [{ title: 'A New Hope' }] } };
    spyOn(axios, 'get').and.returnValue(Promise.resolve(mockMovies));

    const movies = await service.getMovies();
    expect(movies).toEqual(mockMovies.data.results);
  });

  it('should fetch characters', async () => {
    const mockCharacters = { data: { results: [{ name: 'Luke Skywalker' }] } };
    spyOn(axios, 'get').and.returnValue(Promise.resolve(mockCharacters));

    const characters = await service.getCharacters();
    expect(characters).toEqual(mockCharacters.data.results);
  });

  it('should fetch starships', async () => {
    const mockStarships = {
      data: { results: [{ name: 'Millennium Falcon' }] },
    };
    spyOn(axios, 'get').and.returnValue(Promise.resolve(mockStarships));

    const starships = await service.getStarships();
    expect(starships).toEqual(mockStarships.data.results);
  });

  it('should fetch vehicles', async () => {
    const mockVehicles = { data: { results: [{ name: 'Speeder' }] } };
    spyOn(axios, 'get').and.returnValue(Promise.resolve(mockVehicles));

    const vehicles = await service.getVehicles();
    expect(vehicles).toEqual(mockVehicles.data.results);
  });

  it('should fetch species', async () => {
    const mockSpecies = { data: { results: [{ name: 'Human' }] } };
    spyOn(axios, 'get').and.returnValue(Promise.resolve(mockSpecies));

    const species = await service.getSpecies();
    expect(species).toEqual(mockSpecies.data.results);
  });
});
