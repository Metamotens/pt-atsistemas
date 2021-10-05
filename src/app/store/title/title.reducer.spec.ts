import * as fromReducer from './title.reducers';
import { TitleState } from './title.reducers';
import { setTitle } from "./title.actions";

describe('Title reducers', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.titleReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('setTitle action', () => {
    it('should set title', () => {
      const { initialState } = fromReducer;
      const newState: TitleState = {
        title: 'Test'
      }
      const action = setTitle({ title: 'Test' });
      const state = fromReducer.titleReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });
});
