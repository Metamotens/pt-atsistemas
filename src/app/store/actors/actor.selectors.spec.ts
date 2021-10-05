import * as fromSelectors from "../actors/actor.selectors";
import { ActorState } from "./actor.reducers";

describe('Actor selectors', () => {
  const initialState: ActorState = {
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

  it('should get list of actors', () => {
    const result = fromSelectors.selectActors.projector(initialState);
    expect(result.length).toEqual(2);
  });
});
