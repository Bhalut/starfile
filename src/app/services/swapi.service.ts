import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  private baseURL = 'https://swapi.dev/api';

  async getMovies() {
    const response = await axios.get(`${this.baseURL}/films/`);
    return response.data.results;
  }

  async getCharacters() {
    const response = await axios.get(`${this.baseURL}/people/`);
    return response.data.results;
  }

  async getStarships() {
    const response = await axios.get(`${this.baseURL}/starships/`);
    return response.data.results;
  }

  async getVehicles() {
    const response = await axios.get(`${this.baseURL}/vehicles/`);
    return response.data.results;
  }

  async getSpecies() {
    const response = await axios.get(`${this.baseURL}/species/`);
    return response.data.results;
  }
}
