import { createAction, props } from '@ngrx/store';

export const setTitle = createAction(
  '[TITLE] Set title',
  props<{ title: string }>()
);
