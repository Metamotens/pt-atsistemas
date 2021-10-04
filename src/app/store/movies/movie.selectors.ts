import { createSelector } from "@ngrx/store";
import { AppState } from "../app.states";

const selector = (state: AppState) => state.movie;

export const selectMovies = createSelector(
  selector,
  state => state.movies
)

export const selectMovie = createSelector(
  selector,
  state => state.movie
)

export const selectIsLoadingMovies = createSelector(
  selector,
  state => state.loading
)
