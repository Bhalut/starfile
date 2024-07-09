import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { MoviesComponent } from './star-wars/movies/movies.component';
import { CharactersComponent } from './star-wars/characters/characters.component';
import { SpeciesComponent } from './star-wars/species/species.component';
import { StarshipsComponent } from './star-wars/starships/starships.component';
import { VehiclesComponent } from './star-wars/vehicles/vehicles.component';

import { FileUploadComponent } from './file-management/file-upload/file-upload.component';

const routes: Routes = [
  { path: 'movies', component: MoviesComponent },
  { path: 'characters', component: CharactersComponent },
  { path: 'species', component: SpeciesComponent },
  { path: 'starships', component: StarshipsComponent },
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'file-upload', component: FileUploadComponent },
];

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot(routes),
        AppComponent,
        MoviesComponent,
        CharactersComponent,
        SpeciesComponent,
        StarshipsComponent,
        VehiclesComponent,
        FileUploadComponent,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'StarFile'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('StarFile');
  });

  it('should render title in a navbar link', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('nav ul li a').textContent).toContain(
      'Movies'
    );
  });
});
