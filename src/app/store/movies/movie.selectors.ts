import { createSelector } from "@ngrx/store";
import { AppState } from "../app.states";

const selector = (state: AppState) => state.movie;

export const selectMovies = createSelector(
  selector,
  state => state.movies
)
