import { Actor } from "../../core/models/actor";
import { createReducer, on } from "@ngrx/store";
import {
  getActors,
  getActorsByIds,
  getActorsByIdsFailure,
  getActorsByIdsSuccess,
  getActorsFailure,
  getActorsSuccess
} from "./actor.actions";

export interface ActorState {
  actors: Actor[],
  loading: boolean,
  error: boolean
}

export const initialState: ActorState = {
  actors: [],
  loading: false,
  error: false
}

export const actorReducer = createReducer(
  initialState,
  on(getActors, (state) => {
    return {
      ...state,
      loading: true
    }
  }),
  on(getActorsSuccess, (state, action) => {
    return {
      ...state,
      actors: action.actors,
      loading: false
    }
  }),
  on(getActorsFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    }
  }),
  on(getActorsByIds, (state) => {
    return {
      ...state,
      loading: true
    }
  }),
  on(getActorsByIdsSuccess, (state, action) => {
    return {
      ...state,
      actors: action.actors,
      loading: false
    }
  }),
  on(getActorsByIdsFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    }
  })
)
