import { ActionReducerMap } from "@ngrx/store";
import * as movie from "./movies/movie.reducers";
import { MovieState } from "./movies/movie.reducers";

export interface AppState {
  movie: MovieState
}

export const reducers: ActionReducerMap<AppState> = {
  movie: movie.movieReducer
}
