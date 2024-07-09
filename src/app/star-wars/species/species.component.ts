import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwapiService } from '../../services/swapi.service';

@Component({
  selector: 'app-species',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './species.component.html',
  styleUrl: './species.component.sass',
})
export class SpeciesComponent implements OnInit {
  species: any[] = [];

  constructor(private swapiService: SwapiService) {}

  ngOnInit(): void {
    this.loadSpecies();
  }

  async loadSpecies() {
    this.species = await this.swapiService.getSpecies();
  }
}
