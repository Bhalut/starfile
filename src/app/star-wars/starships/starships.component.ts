import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwapiService } from '../../services/swapi.service';

@Component({
  selector: 'app-starships',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './starships.component.html',
  styleUrl: './starships.component.sass',
})
export class StarshipsComponent implements OnInit {
  starships: any[] = [];

  constructor(private swapiService: SwapiService) {}

  ngOnInit(): void {
    this.loadStarships();
  }

  async loadStarships() {
    this.starships = await this.swapiService.getStarships();
  }
}
