import { createReducer, on } from '@ngrx/store';
import { setTitle } from './title.actions';

export interface TitleState {
  title: string;
}

export const initialState: TitleState = {
  title: ''
};

export const titleReducer = createReducer(
  initialState,
  on(setTitle, (state, action) => {
    return {
      ...state,
      title: action.title
    };
  }),
);
