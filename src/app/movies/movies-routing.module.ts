import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from "./components/movie-list/movie-list.component";
import { MovieDetailComponent } from "./components/movie-detail/movie-detail.component";
import { MovieCreateUpdateComponent } from "./components/movie-create-update/movie-create-update.component";

const routes: Routes = [
  { path: '', component: MovieListComponent },
  { path: 'detail/:id', component: MovieDetailComponent },
  { path: 'create', component: MovieCreateUpdateComponent },
  { path: 'update/:id', component: MovieCreateUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule {
}
