import { AppState } from '../app.states';
import { createSelector } from '@ngrx/store';

const selector = (state: AppState) => state.title;

export const selectTitle = createSelector(
  selector,
  state => state.title
)
