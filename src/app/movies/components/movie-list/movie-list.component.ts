import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.states";
import { Observable } from "rxjs";
import { getMovies } from "../../../store/movies/movie.actions";
import { selectMovies } from "../../../store/movies/movie.selectors";
import { Movie } from "../../../core/models/movie";
import { Router } from "@angular/router";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  movies$!: Observable<Movie[]>

  constructor(private store$: Store<AppState>,
              private router: Router) {
  }

  ngOnInit(): void {
    this.store$.dispatch(getMovies());
    this.movies$ = this.store$.select(selectMovies);
  }

  goToCreate() {
    this.router.navigate(['/movies/create'])
  }
}
