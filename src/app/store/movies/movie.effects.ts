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
import { ToastrService } from "ngx-toastr";

@Injectable()
export class MovieEffect {

  constructor(private actions$: Actions,
              private movieSvc: MovieService,
              private spinnerSvc: NgxSpinnerService,
              private toastrSvc: ToastrService) {
  }

  getMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getMovies),
      tap(() => this.spinnerSvc.show()),
      switchMap(() =>
        this.movieSvc.getMovies().pipe(
          map(movies => getMoviesSuccess({ movies })),
          catchError(error => {
            this.toastrSvc.error('Error al obtener listado de peliculas');
            return of(getMoviesFailure({ error: error.message }));
          }),
          tap(() => this.spinnerSvc.hide())
        )
      )
    )
  )

  getMovieById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getMovieById),
      tap(() => this.spinnerSvc.show()),
      switchMap(({ id }) =>
        this.movieSvc.getMovieById(id).pipe(
          map(movie => getMovieByIdSuccess({ movie })),
          catchError(error => {
            this.toastrSvc.error(error.message);
            return of(getMovieByIdFailure({ error: error.message }));
          }),
          tap(() => this.spinnerSvc.hide())
        )
      )
    )
  )
}
