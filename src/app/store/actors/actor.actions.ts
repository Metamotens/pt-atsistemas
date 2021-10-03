import { createAction, props } from "@ngrx/store";
import { Actor } from "../../core/models/actor";

export const getActors = createAction(
  '[ACTORS] Get actors'
)

export const getActorsSuccess = createAction(
  '[ACTORS] Get actors success',
  props<{ actors: Actor[] }>()
)

export const getActorsFailure = createAction(
  '[ACTORS] Get actors failure',
  props<{ error: any }>()
)

export const getActorsByIds = createAction(
  '[ACTORS] Get actors by ids',
  props<{ ids: number[] }>()
)

export const getActorsByIdsSuccess = createAction(
  '[ACTORS] Get actors by ids success',
  props<{ actors: Actor[] }>()
)

export const getActorsByIdsFailure = createAction(
  '[ACTORS] Get actors by ids failure',
  props<{ error: any }>()
)
