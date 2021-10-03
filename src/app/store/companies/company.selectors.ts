import { AppState } from "../app.states";
import { createSelector } from "@ngrx/store";

const selector = (state: AppState) => state.company;

export const selectCompanies = createSelector(
  selector,
  state => state.companies
)

export const selectCompany = createSelector(
  selector,
  state => state.company
)
