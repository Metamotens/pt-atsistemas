import { Movie } from "../../core/models/movie";
import { createReducer, on } from "@ngrx/store";
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
  updateMovieFailure,
  updateMovieSuccess
} from "./movie.actions";

export interface MovieState {
  movies: Movie[],
  movie: Movie | null,
  moviePartial: Partial<Movie> | null,
  loading: boolean,
  error: boolean
}

export const initialState: MovieState = {
  movies: [],
  movie: null,
  moviePartial: null,
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
      movies: action.movies,
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
      movie: action.movie,
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
  on(createMovie, (state, action) => {
    return {
      ...state,
      moviePartial: action.moviePartial,
      loading: true
    }
  }),
  on(createMovieSuccess, (state) => {
    return {
      ...state,
      loading: false
    }
  }),
  on(createMovieFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    }
  }),
  on(updateMovie, (state, action) => {
    return {
      ...state,
      moviePartial: action.moviePartial,
      loading: true
    }
  }),
  on(updateMovieSuccess, (state) => {
    return {
      ...state,
      loading: false
    }
  }),
  on(updateMovieFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    }
  }),
  on(deleteMovie, (state, action) => {
    return {
      ...state,
      loading: true
    }
  }),
  on(deleteMovieSuccess, (state) => {
    return {
      ...state,
      loading: false
    }
  }),
  on(deleteMovieFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    }
  }),
)
