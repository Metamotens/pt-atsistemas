import { Movie } from "../../core/models/movie";
import { createReducer, on } from "@ngrx/store";
import {
  getMovieById,
  getMovieByIdFailure,
  getMovieByIdSuccess,
  getMovies,
  getMoviesFailure,
  getMoviesSuccess
} from "./movie.actions";

export interface MovieState {
  movies: Movie[],
  movie: Movie | null,
  loading: boolean,
  error: boolean
}

export const initialState: MovieState = {
  movies: [],
  movie: null,
  loading: false,
  error: false
}

export const movieReducer = createReducer(
  initialState,
  on(getMovies, (state) => {
    return {
      ...state,
      loading: true
    }
  }),
  on(getMoviesSuccess, (state, action) => {
    return {
      ...state,
      movies: action.movies, //todo comprobar si en vez de eso es [...action.movies] para no pisar lo anterior
      loading: false
    }
  }),
  on(getMoviesFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    }
  }),
  on(getMovieById, (state) => {
    return {
      ...state,
      loading: true
    }
  }),
  on(getMovieByIdSuccess, (state, action) => {
    return {
      ...state,
      movie: action.movie, //todo comprobar si en vez de eso es [...action.movies] para no pisar lo anterior
      loading: false
    }
  }),
  on(getMovieByIdFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    }
  }),
)
