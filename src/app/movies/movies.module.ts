import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { TranslateModule } from "@ngx-translate/core";
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { SharedModule } from "../shared/shared.module";


@NgModule({
  declarations: [
    MovieListComponent,
    MovieCardComponent,
    MovieDetailComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    TranslateModule,
    SharedModule
  ]
})
export class MoviesModule {
}
