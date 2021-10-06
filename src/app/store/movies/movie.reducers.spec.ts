import * as fromReducer from "../movies/movie.reducers";
import { MovieState } from "../movies/movie.reducers";
import {
  deleteMovie,
  deleteMovieFailure,
  deleteMovieSuccess,
  getMovieById,
  getMovieByIdFailure,
  getMovieByIdSuccess,
  getMovies,
  getMoviesFailure,
  getMoviesSuccess,
  updateMovie,
  updateMovieFailure
} from "./movie.actions";
import { Movie } from "../../core/models/movie";

describe('Movie reducers', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.movieReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('getMovies action', () => {
    it('should set loading to true', () => {
      const { initialState } = fromReducer;
      const newState: MovieState = {
        movies: [],
        movie: null,
        moviePartial: null,
        loading: true,
        error: false
      }

      const action = getMovies();
      const state = fromReducer.movieReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('getMoviesSuccess action', () => {
    it('should retrieve list of movies successfully', () => {
      const { initialState } = fromReducer;
      const newState: MovieState = {
        movies: [{
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
          }],
        movie: null,
        moviePartial: null,
        loading: false,
        error: false
      }

      const action = getMoviesSuccess({ movies: newState.movies });
      const state = fromReducer.movieReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
      expect(state.movies[0].id).toEqual(1)
    });
  });

  describe('getMoviesFailure action', () => {
    it('should set error to true', () => {
      const { initialState } = fromReducer;
      const newState: MovieState = {
        movies: [],
        movie: null,
        moviePartial: null,
        loading: false,
        error: true
      }

      const action = getMoviesFailure({ error: true });
      const state = fromReducer.movieReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
      expect(state.error).toBe(true);
    });
  });

  describe('getMovieById action', () => {
    it('should set loading to true', () => {
      const id = 1;
      const { initialState } = fromReducer;
      const newState: MovieState = {
        movies: [],
        movie: null,
        moviePartial: null,
        loading: true,
        error: false
      }

      const action = getMovieById({ id });
      const state = fromReducer.movieReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
      expect(state.loading).toBe(true);
    });
  });

  describe('getMovieByIdSuccess action', () => {
    it('should retrieve movie successfully', () => {
      const { initialState } = fromReducer;
      const newState: MovieState = {
        movies: [],
        movie: {
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
        moviePartial: null,
        loading: false,
        error: false
      }

      const action = getMovieByIdSuccess({ movie: newState.movie as any });
      const state = fromReducer.movieReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
      expect(state.movie?.id).toBe(1);
    });
  });

  describe('getMovieByIdFailure action', () => {
    it('should set error to true', () => {
      const { initialState } = fromReducer;
      const newState: MovieState = {
        movies: [],
        movie: null,
        moviePartial: null,
        loading: false,
        error: true
      }

      const action = getMovieByIdFailure({ error: true });
      const state = fromReducer.movieReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state.error).toBe(true);
    });
  });

  describe('updateMovie action', () => {
    const moviePartial: Partial<Movie> = {
      title: 'title',
      poster: 'poster',
      company: 1,
      year: 2021,
      duration: 123,
      imdbRating: 8, 'genre': ['Horror', 'Thriller'],
      actors: [5, 6]
    };

    it('should set loading to true', () => {
      const { initialState } = fromReducer;
      const newState: MovieState = {
        movies: [],
        movie: null,
        moviePartial: moviePartial,
        loading: true,
        error: false
      }

      const action = updateMovie({ moviePartial });
      const state = fromReducer.movieReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('updateMovieSuccess action', () => {
    it('should set error to false', () => {
      const { initialState } = fromReducer;
      const newState: MovieState = {
        movies: [],
        movie: null,
        moviePartial: null,
        loading: false,
        error: false
      }

      const action = getMoviesSuccess({ movies: newState.movies });
      const state = fromReducer.movieReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
      expect(state.loading).toBe(false)
    });
  });

  describe('updateMovieFailure action', () => {
    it('should set error to true', () => {
      const { initialState } = fromReducer;
      const newState: MovieState = {
        movies: [],
        movie: null,
        moviePartial: null,
        loading: false,
        error: true
      }

      const action = updateMovieFailure({ error: true });
      const state = fromReducer.movieReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
      expect(state.error).toBe(true);
    });
  });

  describe('deleteMovie action', () => {
    it('should set loading to true', () => {
      const id = 1;
      const { initialState } = fromReducer;
      const newState: MovieState = {
        movies: [],
        movie: null,
        moviePartial: null,
        loading: true,
        error: false
      }

      const action = deleteMovie({id});
      const state = fromReducer.movieReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('deleteMovieSuccess action', () => {
    it('should set loading to false', () => {
      const { initialState } = fromReducer;
      const newState: MovieState = {
        movies: [],
        movie: null,
        moviePartial: null,
        loading: false,
        error: false
      }

      const action = deleteMovieSuccess();
      const state = fromReducer.movieReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('deleteMoviesFailure action', () => {
    it('should set error to true', () => {
      const { initialState } = fromReducer;
      const newState: MovieState = {
        movies: [],
        movie: null,
        moviePartial: null,
        loading: false,
        error: true
      }

      const action = deleteMovieFailure({ error: true });
      const state = fromReducer.movieReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
      expect(state.error).toBe(true);
    });
  });
});
