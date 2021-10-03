import { createAction, props } from "@ngrx/store";
import { Movie } from "../../core/models/movie";

export const getMovies = createAction(
  '[MOVIES] Get movies'
)

export const getMoviesSuccess = createAction(
  '[MOVIES] Get movies success',
  props<{ movies: Movie[] }>()
)

export const getMoviesFailure = createAction(
  '[MOVIES] Get movies failure',
  props<{ error: any }>()
)

export const getMovieById = createAction(
  '[MOVIES] Get movie by id',
  props<{ id: number }>()
)

export const getMovieByIdSuccess = createAction(
  '[MOVIES] Get movie by id success',
  props<{ movie: Movie }>()
)

export const getMovieByIdFailure = createAction(
  '[MOVIES] Get movie by id failure',
  props<{ error: any }>()
)

export const deleteMovie = createAction(
  '[MOVIES] Delete movie',
  props<{ id: number }>()
)

export const deleteMovieSuccess = createAction(
  '[MOVIES] Delete movie success'
)

export const deleteMovieFailure = createAction(
  '[MOVIES] Delete movie failure',
  props<{ error: any }>()
)

