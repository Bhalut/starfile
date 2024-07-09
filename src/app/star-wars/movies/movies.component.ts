import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwapiService } from '../../services/swapi.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.sass',
})
export class MoviesComponent implements OnInit {
  movies: any[] = [];

  constructor(private swapiService: SwapiService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  async loadMovies() {
    this.movies = await this.swapiService.getMovies();
  }
}
