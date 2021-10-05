import * as fromReducer from './actor.reducers';
import { ActorState } from './actor.reducers';
import {
  getActors,
  getActorsByIds,
  getActorsByIdsFailure,
  getActorsByIdsSuccess,
  getActorsFailure,
  getActorsSuccess
} from "./actor.actions";

describe('Actor reducers', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.actorReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('getActors action', () => {
    it('should set loading to true', () => {
      const { initialState } = fromReducer;
      const newState: ActorState = {
        actors: [],
        loading: true,
        error: false
      }

      const action = getActors();
      const state = fromReducer.actorReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('getActorsSuccess action', () => {
    it('should retrieve list of actors successfully', () => {
      const { initialState } = fromReducer;
      const newState: ActorState = {
        actors: [
          {
            "id": 1,
            "fullName": "Isaak McQuode",
            "gender": "Male",
            "bornCity": "Ciduren",
            "birthdate": "24/12/1957",
            "img": "http://dummyimage.com/600x400.png/dddddd/000000",
            "rating": 2.03,
            "movies": [
              3,
              7
            ]
          },
          {
            "id": 2,
            "fullName": "Rory Chanders",
            "gender": "Male",
            "bornCity": "Cijengkol",
            "birthdate": "19/04/1975",
            "img": "http://dummyimage.com/600x400.png/5fa2dd/000000",
            "rating": 2.43,
            "movies": []
          }
        ],
        loading: false,
        error: false
      }

      const action = getActorsSuccess({ actors: newState.actors });
      const state = fromReducer.actorReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('getActorsFailure action', () => {
    it('should set error to true', () => {
      const { initialState } = fromReducer;
      const newState: ActorState = {
        actors: [],
        loading: false,
        error: true
      }

      const action = getActorsFailure({ error: true });
      const state = fromReducer.actorReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('getActorsById action', () => {
    it('should set loading to true', () => {
      const ids = [1, 2];
      const { initialState } = fromReducer;
      const newState: ActorState = {
        actors: [],
        loading: true,
        error: false
      }

      const action = getActorsByIds({ ids });
      const state = fromReducer.actorReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('getActorsByIdSuccess action', () => {
    it('should retrieve list of actors successfully', () => {
      const { initialState } = fromReducer;
      const newState: ActorState = {
        actors: [
          {
            "id": 1,
            "fullName": "Isaak McQuode",
            "gender": "Male",
            "bornCity": "Ciduren",
            "birthdate": "24/12/1957",
            "img": "http://dummyimage.com/600x400.png/dddddd/000000",
            "rating": 2.03,
            "movies": [
              3,
              7
            ]
          },
          {
            "id": 2,
            "fullName": "Rory Chanders",
            "gender": "Male",
            "bornCity": "Cijengkol",
            "birthdate": "19/04/1975",
            "img": "http://dummyimage.com/600x400.png/5fa2dd/000000",
            "rating": 2.43,
            "movies": []
          }
        ],
        loading: false,
        error: false
      }

      const action = getActorsByIdsSuccess({ actors: newState.actors });
      const state = fromReducer.actorReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('getActorsByIdFailure action', () => {
    it('should set error to true', () => {
      const { initialState } = fromReducer;
      const newState: ActorState = {
        actors: [],
        loading: false,
        error: true
      }

      const action = getActorsByIdsFailure({ error: true });
      const state = fromReducer.actorReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });
});
