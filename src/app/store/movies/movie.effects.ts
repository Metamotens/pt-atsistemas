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
import { catchError, map, switchMap } from "rxjs/operators";
import { MovieService } from "../../core/services/movie.service";
import { of } from "rxjs";

@Injectable()
export class MovieEffect {

  constructor(private actions$: Actions,
              private movieSvc: MovieService) {
  }

  getMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getMovies),
      switchMap(() =>
        this.movieSvc.getMovies().pipe(
          map(movies => getMoviesSuccess({ movies })),
          catchError(error => of(getMoviesFailure({ error: error.error })))
        )
      )
    )
  )

  getMovieById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getMovieById),
      switchMap(({ id }) =>
        this.movieSvc.getMovieById(id).pipe(
          map(movie => getMovieByIdSuccess({ movie })),
          catchError(error => of(getMovieByIdFailure({ error: error.error })))
        )
      )
    )
  )
}
