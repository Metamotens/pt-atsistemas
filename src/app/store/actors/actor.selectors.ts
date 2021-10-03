import { createSelector } from "@ngrx/store";
import { AppState } from "../app.states";

const selector = (state: AppState) => state.actor;

export const selectActors = createSelector(
  selector,
  state => state.actors
)
