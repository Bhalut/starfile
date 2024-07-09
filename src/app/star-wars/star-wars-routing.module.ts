import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { CharactersComponent } from './characters/characters.component';
import { StarshipsComponent } from './starships/starships.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { SpeciesComponent } from './species/species.component';

const routes: Routes = [
  { path: 'movies', component: MoviesComponent },
  { path: 'characters', component: CharactersComponent },
  { path: 'starships', component: StarshipsComponent },
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'species', component: SpeciesComponent },
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MoviesComponent,
    CharactersComponent,
    StarshipsComponent,
    VehiclesComponent,
    SpeciesComponent,
  ],
  exports: [RouterModule],
})
export class StarWarsRoutingModule {}
