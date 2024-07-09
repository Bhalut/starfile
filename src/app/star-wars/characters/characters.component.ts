import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwapiService } from '../../services/swapi.service';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.sass',
})
export class CharactersComponent implements OnInit {
  characters: any[] = [];

  constructor(private swapiService: SwapiService) {}

  ngOnInit(): void {
    this.loadCharacters();
  }

  async loadCharacters() {
    this.characters = await this.swapiService.getCharacters();
  }
}
