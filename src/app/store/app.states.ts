import { ActionReducerMap } from "@ngrx/store";
import * as movie from "./movies/movie.reducers";
import { MovieState } from "./movies/movie.reducers";
import * as actor from "./actors/actor.reducers";
import { ActorState } from "./actors/actor.reducers";
import * as company from "./companies/company.reducers";
import { CompanyState } from "./companies/company.reducers";

export interface AppState {
  movie: MovieState,
  actor: ActorState,
  company: CompanyState
}

export const reducers: ActionReducerMap<AppState> = {
  movie: movie.movieReducer,
  actor: actor.actorReducer,
  company: company.companyReducer
}
