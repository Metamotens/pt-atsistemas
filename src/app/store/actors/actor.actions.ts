import { createAction, props } from "@ngrx/store";
import { Actor } from "../../core/models/actor";

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
