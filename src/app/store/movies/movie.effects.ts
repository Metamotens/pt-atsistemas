import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  getMovieById,
  getMovieByIdFailure,
  getMovieByIdSuccess,
  getMovies,
  getMoviesFailure,
  getMoviesSuccess
} from "./movie.actions";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { MovieService } from "../../core/services/movie.service";
import { of } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable()
export class MovieEffect {

  constructor(private actions$: Actions,
              private movieSvc: MovieService,
              private spinner: NgxSpinnerService) {
  }

  getMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getMovies),
      tap(() => this.spinner.show()),
      switchMap(() =>
        this.movieSvc.getMovies().pipe(
          map(movies => getMoviesSuccess({ movies })),
          tap(() => this.spinner.hide()),
          catchError(error => of(getMoviesFailure({ error: error.error })))
        )
      )
    )
  )

  getMovieById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getMovieById),
      tap(() => this.spinner.show()),
      switchMap(({ id }) =>
        this.movieSvc.getMovieById(id).pipe(
          map(movie => getMovieByIdSuccess({ movie })),
          tap(() => this.spinner.hide()),
          catchError(error => of(getMovieByIdFailure({ error: error.error })))
        )
      )
    )
  )
}
