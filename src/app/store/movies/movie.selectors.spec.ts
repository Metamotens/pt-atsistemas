import { MovieState } from "../movies/movie.reducers";
import * as fromSelectors from "../movies/movie.selectors";

describe('Movie selectors', () => {
  const initialState: MovieState = {
    movies: [
      {
        "id": 1,
        "title": "Dancing Lady",
        "poster": "http://dummyimage.com/400x600.png/cc0000/ffffff",
        "genre": [
          "Comedy",
          "Musical",
          "Romance"
        ],
        "year": 2006,
        "duration": 161,
        "imdbRating": 8.27,
        "actors": [
          4,
          5,
          6
        ],
        "company": 1
      },
      {
        "id": 2,
        "title": "Mooring, The",
        "poster": "http://dummyimage.com/400x600.png/dddddd/000000",
        "genre": [
          "Horror",
          "Thriller"
        ],
        "year": 1987,
        "duration": 187,
        "imdbRating": 1.99,
        "actors": [
          5,
          6
        ],
        "company": 2
      }
    ],
    movie: {
      "id": 2,
      "title": "Mooring, The",
      "poster": "http://dummyimage.com/400x600.png/dddddd/000000",
      "genre": [
        "Horror",
        "Thriller"
      ],
      "year": 1987,
      "duration": 187,
      "imdbRating": 1.99,
      "actors": [
        5,
        6
      ],
      "company": 2
    },
    moviePartial: null,
    loading: true,
    error: false
  }

  it('should get list of movies', () => {
    const result = fromSelectors.selectMovies.projector(initialState);
    expect(result.length).toEqual(2);
    expect(result[1].id).toEqual(2);
  });

  it('should get movie by id', () => {
    const result = fromSelectors.selectMovie.projector(initialState);
    expect(result?.id).toEqual(2);
  });

  it('should get loading true', () => {
    const result = fromSelectors.selectIsLoadingMovies.projector(initialState);
    expect(result).toBe(true);
  });
});
