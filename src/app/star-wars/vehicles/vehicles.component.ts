import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwapiService } from '../../services/swapi.service';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.sass',
})
export class VehiclesComponent implements OnInit {
  vehicles: any[] = [];

  constructor(private swapiService: SwapiService) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  async loadVehicles() {
    this.vehicles = await this.swapiService.getVehicles();
  }
}
