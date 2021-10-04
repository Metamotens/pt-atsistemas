import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  createMovie,
  createMovieFailure,
  createMovieSuccess,
  deleteMovie,
  deleteMovieFailure,
  deleteMovieSuccess,
  getMovieById,
  getMovieByIdFailure,
  getMovieByIdSuccess,
  getMovies,
  getMoviesFailure,
  getMoviesSuccess,
  updateMovie,
  updateMovieSuccess
} from "./movie.actions";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { MovieService } from "../../core/services/movie.service";
import { of } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";

@Injectable()
export class MovieEffect {

  constructor(private actions$: Actions,
              private movieSvc: MovieService,
              private spinnerSvc: NgxSpinnerService,
              private toastrSvc: ToastrService,
              private translateSvc: TranslateService,
              private router: Router) {
  }

  getMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getMovies),
      tap(() => this.spinnerSvc.show()),
      switchMap(() =>
        this.movieSvc.getMovies().pipe(
          map(movies => getMoviesSuccess({ movies })),
          catchError(error => {
            this.toastrSvc.error(this.translateSvc.instant('errors.movies'));
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
            this.toastrSvc.error(this.translateSvc.instant('errors.movie'));
            return of(getMovieByIdFailure({ error: error.message }));
          }),
          tap(() => this.spinnerSvc.hide())
        )
      )
    )
  )

  createMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createMovie),
      tap(() => this.spinnerSvc.show()),
      switchMap(({ moviePartial }) =>
        this.movieSvc.createMovie(moviePartial).pipe(
          map(createMovieSuccess),
          catchError(error => {
            this.toastrSvc.error(this.translateSvc.instant('errors.movie-create'));
            return of(createMovieFailure({ error: error.message }));
          }),
          tap(() => {
            this.router.navigateByUrl('/movies');
            this.toastrSvc.info(this.translateSvc.instant('movies.create-update.create-success'));
            this.spinnerSvc.hide();
          })
        )
      )
    )
  )

  updateMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateMovie),
      tap(() => this.spinnerSvc.show()),
      switchMap(({ moviePartial }) =>
        this.movieSvc.updateMovie(moviePartial).pipe(
          map(updateMovieSuccess),
          catchError(error => {
            this.toastrSvc.error(this.translateSvc.instant('errors.movie-update'));
            return of(getMovieByIdFailure({ error: error.message }));
          }),
          tap(() => {
            this.router.navigateByUrl('/movies');
            this.toastrSvc.info(this.translateSvc.instant('movies.create-update.update-success'));
            this.spinnerSvc.hide();
          })
        )
      )
    )
  )

  deleteMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteMovie),
      tap(() => this.spinnerSvc.show()),
      switchMap(({ id }) =>
        this.movieSvc.deleteMovie(id).pipe(
          map(deleteMovieSuccess),
          catchError(error => {
            this.toastrSvc.error(this.translateSvc.instant('errors.movie-delete'));
            return of(deleteMovieFailure({ error: error.message }));
          }),
          tap(() => {
            this.router.navigate(['/movies']);
            this.toastrSvc.info(this.translateSvc.instant('movies.create-update.delete-success'));
            this.spinnerSvc.hide();
          })
        )
      )
    )
  )
}
